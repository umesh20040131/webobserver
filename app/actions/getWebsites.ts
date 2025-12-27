"use server"

import { db } from "@/app/configs/db"
import { websitesTable } from "@/app/configs/schema"
import { currentUser } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export async function getWebsites() {
  try {
    const user = await currentUser()
    const userEmail = user?.emailAddresses[0]?.emailAddress

    if (!userEmail) {
      return {
        success: false,
        websites: [],
        error: "User not found",
      }
    }

    const websites = await db
      .select()
      .from(websitesTable)
      .where(eq(websitesTable.userEmail, userEmail))

    return {
      success: true,
      websites,
    }
  } catch (error) {
    console.error("Error fetching websites:", error)
    return {
      success: false,
      websites: [],
      error: "Failed to fetch websites",
    }
  }
}
