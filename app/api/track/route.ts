import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Console log the tracking data
    console.log("=== Website Tracking Data ===")
    console.log("Timestamp:", new Date().toISOString())
    console.log("Body Data:", JSON.stringify(body, null, 2))
    console.log("============================")

    return NextResponse.json(
      {
        success: true,
        message: "Tracking data received successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing tracking request:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process tracking data",
      },
      { status: 400 }
    )
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: "Track API endpoint. Use POST to send tracking data.",
    },
    { status: 200 }
  )
}
