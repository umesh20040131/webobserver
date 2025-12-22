import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Image
            src="/logo.svg"
            alt="WebObserver logo"
            width={32}
            height={32}
          />
          <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>
            WebObserver
          </span>
        </div>
        <UserButton afterSignOutUrl="/sign-in" />
      </header>
      <main style={{ padding: "1rem" }}>{children}</main>
    </div>
  );
}
