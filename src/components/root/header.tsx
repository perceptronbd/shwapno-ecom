"use client";

import { navLinks } from "@/lib/navlinks";
import { Sidebar } from "@/shared-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import TopBar from "./top-bar";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const currentPath = usePathname();
  return (
    <main>
      <TopBar onClick={handleOpen} />
      <Sidebar
        NavLinks={{
          topLinks: navLinks.topLinks,
          bottomLinks: navLinks.bottomLinks,
        }}
        isOpen={isOpen}
        onClose={handleClose}
        currentPath={currentPath}
        LinkComponent={Link}
        Logo={
          <Image
            src="/shwapno-logo.svg"
            alt="Shwapno Logo"
            width={80}
            height={20}
          />
        }
        direction="right"
      />
    </main>
  );
};

export default Header;
