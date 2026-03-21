// src/components/ProductsCatalog.tsx
import React, { useCallback, useMemo, useState } from "react";
import type { Product } from "../config/pricing";
import ProductCard from "./ProductCard";
import SizeChartModal from "./modals/SizeChartModal";

type Props = {
  products: Product[];
};

export default function ProductsCatalog({ products }: Props) {
  const [sizeOpen, setSizeOpen] = useState(false);
  const [sizeProductId, setSizeProductId] = useState<string | null>(null);

  const selectedProduct = useMemo(() => {
    if (!sizeProductId) return null;
    return products.find((p) => p.id === sizeProductId) ?? null;
  }, [products, sizeProductId]);

  const openSizeFor = useCallback((product: Product) => {
    if (!product.sizeChart) return;
    setSizeProductId(product.id);
    setSizeOpen(true);
  }, []);

  const closeSize = useCallback(() => {
    setSizeOpen(false);
  }, []);

  return (
    <>
      <div className="row g-3 justify-content-center align-items-start">
        {products.map((p) => (
          <div key={p.id} className="col-md-6 col-lg-4">
            <ProductCard product={p} onOpenSize={openSizeFor} />
          </div>
        ))}
      </div>

      {/* ✅ ONE GLOBAL SIZE MODAL */}
      {selectedProduct?.sizeChart ? (
        <SizeChartModal
          open={sizeOpen}
          onClose={closeSize}
          chart={selectedProduct.sizeChart}
          subtitle={selectedProduct.name}
        />
      ) : null}
    </>
  );
}