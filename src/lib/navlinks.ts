import { ROUTES } from "@/utils/routes";
import { Home, ShoppingCart, Package } from "lucide-react";

export const getNavLinks = (branchName: string) => ({
  topLinks: [
    {
      name: "Home",
      href: ROUTES.HOME(branchName),
      Icon: Home,
    },
    {
      name: "Cart",
      href: ROUTES.CART(branchName),
      Icon: ShoppingCart,
    },
    {
      name: "Orders",
      href: ROUTES.ORDERS(branchName),
      Icon: Package,
    },
  ],
  bottomLinks: [],
});
