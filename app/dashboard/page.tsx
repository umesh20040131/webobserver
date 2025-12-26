import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { db } from "../configs/db";
import { usersTable } from "../configs/schema";

async function upsertCurrentUser() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const email =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    "";

  if (!email) {
    throw new Error("Signed-in Clerk user is missing an email address.");
  }

  const name = user.fullName || user.username || "Anonymous";

  await db
    .insert(usersTable)
    .values({
      name,
      email,
    })
    .onConflictDoUpdate({
      target: usersTable.email,
      set: { name },
    });

  return { name, email };
}

export default async function Page() {
  await upsertCurrentUser();

  return (
    <div>
      {/* Top row: heading and primary button on the right */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">My Websites</h1>
        <a href="/dashboard/new">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 font-medium transition-opacity">
            + Add Website
          </button>
        </a>
      </div>

      {/* Main card area */}
      <section className="border-2 border-dashed border-border rounded-xl p-12 max-w-4xl mx-auto text-center bg-card">
        {/* Center content */}
        <div className="mb-6">
          <Image src="/www.png" alt="Website preview" width={120} height={120} className="mx-auto" />
        </div>
        <p className="text-lg mb-6 text-muted-foreground">
          You don&apos;t have any website added for tracking!
        </p>
        <a href="/dashboard/new">
          <button className="px-7 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 font-medium transition-opacity">
            + Add Website
          </button>
        </a>
      </section>
    </div>
  );
}
