import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b border-border bg-card shadow-sm">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="WebObserver logo"
            width={32}
            height={32}
          />
          <span className="font-semibold text-xl text-foreground">
            WebObserver
          </span>
        </div>
        <UserButton afterSignOutUrl="/sign-in" />
      </header>
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
