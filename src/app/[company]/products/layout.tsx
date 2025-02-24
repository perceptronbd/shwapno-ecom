import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Shwapno",
  description: "Browse our products catalog",
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="products-layout">
      <header>Product Page Header</header>
      <main className="products-main">{children}</main>
    </div>
  );
}
