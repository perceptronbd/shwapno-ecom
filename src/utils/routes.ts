export const ROOT = "/";

const COMPANY = "/shwapno-nurerchala";

export const ROUTES = {
  ROOT,
  COMPANY,
  HOME: `${COMPANY}`,
  CART: `${COMPANY}/carts`,
  CHECKOUT: `${COMPANY}/carts/checkout`,
  ORDERS: `${COMPANY}/orders`,
  ORDER_DETAILS: (id: string) => `${COMPANY}/orders/${id}`,
  ORDER_TRACK: (id: string) => `${COMPANY}/orders/track/${id}`,
} as const;

export type AppRoutes = typeof ROUTES;
export type RouteKeys = keyof AppRoutes;
