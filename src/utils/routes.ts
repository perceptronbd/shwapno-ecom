export const ROOT = "/";

const COMPANY = "/shwapno-nurerchala";

export const ROUTES = {
  ROOT,
  COMPANY,
  HOME: `${COMPANY}`,
  CART: `${COMPANY}/carts`,
  ORDERS: `${COMPANY}/order`,
} as const;

export type AppRoutes = typeof ROUTES;
export type RouteKeys = keyof AppRoutes;
