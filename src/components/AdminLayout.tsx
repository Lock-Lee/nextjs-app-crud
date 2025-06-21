"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[#243831] text-white overflow-hidden">
      <div className="h-16 flex-shrink-0 flex items-center px-4 md:px-6 bg-[#243831] justify-between gap-4">
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
        <div className="text-white font-bold text-lg">aBoard</div>
        <div className="ml-auto hidden md:block">
          <Navbar />
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div
          className={`fixed md:static top-0 left-0 z-50 w-64 h-full bg-[#ffff] text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:block`}
        >
          <Sidebar onSelect={() => setSidebarOpen(false)} />
        </div>
        <main className="flex-1 overflow-y-auto p-4 bg-white text-black z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
