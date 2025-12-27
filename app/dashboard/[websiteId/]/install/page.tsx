import { redirect } from "next/navigation"
import { db } from "@/app/configs/db"
import { websitesTable } from "@/app/configs/schema"
import { eq } from "drizzle-orm"
import { currentUser } from "@clerk/nextjs/server"
import { InstallScriptContent } from "../../_components/InstallScriptContent"

export default async function InstallScriptPage({
  params,
}: {
  params: { websiteId: string }
}) {
  const user = await currentUser()
  
  console.log("Install page - websiteId:", params.websiteId)
  console.log("Install page - user:", user?.emailAddresses[0]?.emailAddress)

  if (!user?.emailAddresses[0]?.emailAddress) {
    redirect("/sign-in")
  }

  const userEmail = user.emailAddresses[0].emailAddress

  try {
    // Fetch the website
    const websites = await db
      .select()
      .from(websitesTable)
      .where(eq(websitesTable.websiteId, params.websiteId))

    console.log("Websites found:", websites)

    const website = websites[0]

    if (!website) {
      console.error("Website not found for websiteId:", params.websiteId)
      redirect("/dashboard")
    }

    // Verify ownership
    if (website.userEmail !== userEmail) {
      console.error("Unauthorized access - user email mismatch")
      redirect("/dashboard")
    }

    return (
      <InstallScriptContent
        websiteId={website.websiteId}
        domain={website.domain}
      />
    )
  } catch (error) {
    console.error("Error in InstallScriptPage:", error)
    redirect("/dashboard")
  }
}
