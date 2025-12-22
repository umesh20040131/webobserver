import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
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
  const profile = await upsertCurrentUser();

  return (
    <div>
      <h2>dashboard page</h2>
      <p>Welcome, {profile.name} ({profile.email})</p>
    </div>
  );
}
