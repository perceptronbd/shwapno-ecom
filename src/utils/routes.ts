export const ROOT = "/";

export const ROUTES = {
  ROOT,
  COMPANY: (branchName: string) => `/${branchName}`,
  HOME: (branchName: string) => ROUTES.COMPANY(branchName),
  CART: (branchName: string) => `${ROUTES.COMPANY(branchName)}/carts`,
  CHECKOUT: (branchName: string) => `${ROUTES.CART(branchName)}/checkout`,
  ORDERS: (branchName: string) => `${ROUTES.COMPANY(branchName)}/orders`,
  ORDER_DETAILS: (branchName: string, id: string) =>
    `${ROUTES.ORDERS(branchName)}/${id}`,
  ORDER_TRACK: (branchName: string, id: string) =>
    `${ROUTES.ORDERS(branchName)}/track/${id}`,
} as const;
