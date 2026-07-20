"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import KYCGate from "./KYCGate";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <KYCGate />
      <div className="pt-20">
        {children}
      </div>
    </>
  );
}