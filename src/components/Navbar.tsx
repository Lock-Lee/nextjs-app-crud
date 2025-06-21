"use client";

import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="h-16 bg-[#243831] flex items-center px-4">
      <div className="ml-auto">
        <button
          onClick={handleSignOut}
          className="bg-[#49a569] text-white  py-1.5 px-4 rounded hover:bg-[#3d8d59] transition"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
