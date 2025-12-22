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
  await upsertCurrentUser();

  return (
    <main
      style={{
        paddingTop: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>My Website</h1>
      <button
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "9999px",
          border: "none",
          backgroundColor: "#111827",
          color: "white",
          fontSize: "0.875rem",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        + Website
      </button>
    </main>
  );
}
