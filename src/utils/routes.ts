export const ROOT = "/";

const COMPANY = "/shwapno-nurerchala";

export const ROUTES = {
  ROOT,
  COMPANY,
  HOME: `${COMPANY}`,
  CART: `${COMPANY}/carts`,
  CHECKOUT: `${COMPANY}/carts/checkout`,
  ORDERS: `${COMPANY}/orders`,
} as const;

export type AppRoutes = typeof ROUTES;
export type RouteKeys = keyof AppRoutes;
