import { ROUTES } from "@/utils/routes";
import { Home, ShoppingCart, Package } from "lucide-react";

export const navLinks = {
  topLinks: [
    {
      name: "Home",
      href: ROUTES.HOME,
      Icon: Home,
    },
    {
      name: "Cart",
      href: ROUTES.CART,
      Icon: ShoppingCart,
    },
    {
      name: "Orders",
      href: ROUTES.ORDERS,
      Icon: Package,
    },
  ],
  bottomLinks: [],
};
