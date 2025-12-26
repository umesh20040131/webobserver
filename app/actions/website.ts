"use server";

import { db } from "@/app/configs/db";
import { websitesTable } from "@/app/configs/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";

export async function createWebsite(formData: {
  domain: string;
  timezone: string;
  enableLocalhostTracking: boolean;
}) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // Get user email from Clerk
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    if (!userEmail) {
      return {
        success: false,
        error: "User email not found",
      };
    }

    const websiteId = uuidv4();

    const result = await db.insert(websitesTable).values({
      websiteId,
      domain: formData.domain,
      timezone: formData.timezone,
      enablelocalhostTracling: formData.enableLocalhostTracking,
      userEmail,
    });

    return {
      success: true,
      data: { websiteId },
    };
  } catch (error) {
    console.error("Error creating website:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create website",
    };
  }
}
