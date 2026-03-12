import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

// This endpoint is called by Vercel Cron to keep Supabase database active
// Prevents automatic pausing on free tier (pauses after 7 days of inactivity)
export async function GET(request: Request) {
  // Verify the request is from Vercel Cron (security check)
  const authHeader = request.headers.get("authorization")
  
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const supabase = createAdminClient()
    
    // Simple query to keep the database active
    const { data, error } = await supabase
      .from("contract_customers")
      .select("count")
      .limit(1)

    if (error) {
      console.error("[Keep-Alive] Database ping failed:", error.message)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    const timestamp = new Date().toISOString()
    console.log(`[Keep-Alive] Database pinged successfully at ${timestamp}`)

    return NextResponse.json({
      success: true,
      message: "Database keep-alive ping successful",
      timestamp,
    })
  } catch (error) {
    console.error("[Keep-Alive] Unexpected error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
