import { Button } from "@/shared-components";
import { Menu } from "lucide-react";
import Image from "next/image";

const TopBar = ({ onClick }: { onClick: () => void }) => {
  return (
    <section className="flex w-full items-center justify-between">
      <Image
        src="shwapno-logo.svg"
        alt="Shwapno Logo"
        width={80}
        height={20}
        className="m-4"
      />
      <Button variant="text" onClick={onClick}>
        <Menu />
      </Button>
    </section>
  );
};

export default TopBar;
