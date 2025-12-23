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
    <main style={{ paddingTop: "2rem" }}>
      {/* Top row: heading and primary button on the right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>My Website</h1>
        <button
          style={{
            padding: "0.5rem 1.25rem",
            borderRadius: "0.5rem",
            border: "none",
            backgroundColor: "#1d4ed8",
            color: "white",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          + Website
        </button>
      </div>

      {/* Main card area */}
      <section
        style={{
          border: "2px dashed #e5e7eb",
          borderRadius: "0.75rem",
          padding: "3rem 1rem",
          maxWidth: "960px",
          margin: "0 auto",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Top-right button inside the card */}
        <button
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            padding: "0.5rem 1.25rem",
            borderRadius: "0.5rem",
            border: "none",
            backgroundColor: "#1d4ed8",
            color: "white",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          + Website
        </button>

        {/* Center content */}
        <div style={{ marginBottom: "1.5rem" }}>
          <Image src="/www.png" alt="Website preview" width={120} height={120} />
        </div>
        <p
          style={{
            fontSize: "1rem",
            marginBottom: "1.5rem",
            color: "#4b5563",
          }}
        >
          You don&apos;t have any website added for tracking!
        </p>
        <button
          style={{
            padding: "0.6rem 1.75rem",
            borderRadius: "9999px",
            border: "none",
            backgroundColor: "#1d4ed8",
            color: "white",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          + Website
        </button>
      </section>
    </main>
  );
}
