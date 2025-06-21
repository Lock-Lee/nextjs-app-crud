"use client";

import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  onSelect?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (path: string) => {
    router.push(path);
    if (onSelect) onSelect();
  };

  return (
    <aside className="w-64 p-6 space-y-4">
      <nav className="space-y-4 text-black">
        <div
          className={`flex items-center space-x-2 cursor-pointer px-2 py-1 rounded ${
            pathname === "/" ? "text-green-700 font-semibold" : ""
          }`}
          onClick={() => handleClick("/")}
        >
          <Image src="/asset/home.svg" alt="Home Icon" width={20} height={20} />
          <span>Home</span>
        </div>

        <div
          className={`flex items-center space-x-2 cursor-pointer px-2 py-1 rounded ${
            pathname === "/ourblog" ? "text-green-700 font-semibold" : ""
          }`}
          onClick={() => handleClick("/ourblog")}
        >
          <Image src="/asset/blog.svg" alt="Blog Icon" width={20} height={20} />
          <span>Our Blog</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
