// Escapes HTML special characters so user-supplied text can be safely
// interpolated into HTML email templates (contact form, support tickets, etc).
// Without this, a submitted name/message containing "<", ">", "&", or quotes
// is inserted verbatim into the outgoing HTML email, which can break the
// layout, forge extra content, or (in mail clients that render HTML loosely)
// execute markup that was never intended to run.
export function escapeHtml(value: string | null | undefined): string {
  if (!value) return ""
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
