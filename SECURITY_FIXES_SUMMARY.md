# Ardent Prime Website — Security Review & Fixes

Full code review of `github.com/adminapius/ardentprime-website`, following up on the
HTTP Observatory / SecurityHeaders / SSL Labs scans. Applied fixes are in
`ardentprime-security-fixes.patch` — review and `git apply` it, or copy the changed
files in manually.

## Fixed in this pass

### 1. CSP `unsafe-inline` / `unsafe-eval` (the −20 point issue)
- Added `middleware.ts`: generates a fresh nonce per request and issues a strict CSP
  with no `unsafe-inline`/`unsafe-eval`.
- `next.config.mjs`: removed the old CSP header (superseded by middleware), added
  `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy: same-origin`.
- `app/layout.tsx`, `components/structured-data.tsx`, `components/faq-schema.tsx`,
  and the 3 static service pages now thread the nonce through to the Google
  Analytics `<Script>` tags and JSON-LD `<script>` tags.
- `app/news/[id]/`, `app/partners/[slug]/`, and `app/support-center/` are Client
  Components and can't call `headers()` directly, so their JSON-LD (`ArticleSchema`,
  `VideoSchema`, `FAQSchema`) would otherwise have been silently blocked by the new
  CSP. Fixed by extracting each route's data (`articles-data.ts`, `partners-data.ts`,
  `faqs-data.ts`) into a shared module, and adding/updating a server-side
  `layout.tsx` per route that reads the nonce and renders the schema, while the
  client page keeps all the interactive logic. Every page on the site now renders
  its structured data with a real per-request nonce — none of it relies on
  `unsafe-inline` anymore.
- Verified with `tsc --noEmit` across the whole project: **zero type errors**. A
  full `next build` couldn't finish in this environment only because it tries to
  fetch the Inter font from Google Fonts and that domain isn't reachable from this
  sandbox — that's an environment limitation, not a code issue. Run `pnpm build`
  yourself before deploying to be certain, but the type-check gives strong
  confidence everything wires together correctly.

### 2. PostgREST filter injection in the contact form
`app/actions/contact.tsx` was building a duplicate-check query like:
```
.or(`email.eq.${formData.email},phone.eq.${formData.phone},full_name.eq.${formData.fullName}`)
```
Since `.or()` uses commas/periods as filter separators, a submitted name or message
containing those characters could inject extra filter clauses into the query. Not
classic SQL injection (it goes through PostgREST's parser, not raw SQL), but a real
bug — worst case it could be used to manipulate which duplicate-check results come
back. Replaced with three separate, properly parameterized `.eq()` queries.

### 3. HTML injection in outbound emails
`contact.tsx` and `support.tsx` interpolated user-submitted name/message/subject
fields directly into HTML emails sent to sales@/support@ and back to the customer,
with no escaping. Added `lib/sanitize.ts` (`escapeHtml`) and applied it to every
user-controlled field in both templates. Also stripped `\r\n` from subject lines
(defense-in-depth against email header injection) and used `encodeURIComponent` in
`mailto:`/`tel:` links.

### 4. No rate limiting on the support ticket form
Unlike the contact form (2/day + duplicate check), `submitSupportTicket` had zero
throttling — and each submission triggers a DNS lookup plus two outbound emails, so
it's both a spam vector and a way to run up your Resend/DNS usage. Added
`checkSupportRateLimit` (3/IP/day) plus `scripts/004_add_support_tickets_ip_address.sql`
to add the needed `ip_address` column — **run this migration in Supabase before
deploying**, same as you did for `add-ip-address-column.sql` on `contact_submissions`.

## Other things worth doing (not code changes)

- **`package.json` has a pre-existing dependency conflict**: `react`/`react-dom` are
  pinned to `^19`, but `next@14.2.35`'s peer dependency wants `^18.2.0`. A plain
  `npm install` fails outright on this (`ERESOLVE`); it only works with
  `--legacy-peer-deps` or via `pnpm`'s more lenient resolution (which is why it's
  worked fine on Vercel so far). Not a security issue, but worth pinning
  intentionally — either downgrade `react`/`react-dom` to `^18` to match Next 14,
  or move ahead with the Next.js upgrade below (Next 15+ supports React 19
  natively).
- **Next.js is on 14.2.35 — the final patch for an End-of-Life major version**
  (14.x EOL'd Oct 2025). You're not exposed to any currently-known unpatched CVE at
  this version, but you won't get fixes for anything discovered from here on. Plan
  a move to 15.5.18+ or 16.x when you have a maintenance window.
- **DNS CAA record** — add one restricting which CAs can issue certs for
  `ardentprime.com` (quick win, not a code change).
- **Subresource Integrity** — still not implemented; low priority since your scripts
  load from trusted origins, but worth doing if you want a perfect score.
- **`contract_customers` company-name lookup** — the support form's "company not
  found" error confirms/denies whether a given company name is a customer. Minor
  enumeration risk; the new rate limit helps, but consider a generic error message
  if this ever becomes a concern.
- **Wildcard CORS** — now scoped to `/api/:path*` only in `next.config.mjs` rather
  than left as a platform-wide default; verify this doesn't need loosening for any
  legitimate cross-origin caller you have.
