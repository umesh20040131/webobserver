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
    
    const errorMessage = error instanceof Error ? error.message : "";
    
    // Check for duplicate domain error
    if (errorMessage.includes("duplicate key") || errorMessage.includes("unique")) {
      return {
        success: false,
        error: "This website domain already exists. Please use a different domain.",
      };
    }
    
    return {
      success: false,
      error: "Failed to create website. Please try again.",
    };
  }
}
