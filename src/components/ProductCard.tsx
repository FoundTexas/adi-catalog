// ProductCard.tsx
import React, { useMemo, useState } from "react";
import type { Product } from "../config/pricing";
import SizeChartModal from "./modals/SizeChartModal";

export default function ProductCard({ product }: { product: Product }) {
  const [colorKey, setColorKey] = useState(product.colors[0]?.key ?? "");
  const [specOpen, setSpecOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);

  const selected = useMemo(
    () => product.colors.find((c) => c.key === colorKey) ?? product.colors[0],
    [product.colors, colorKey]
  );

  return (
    <div className="adi-card h-100">
      {/* overflow-hidden SOLO aquí (para que la imagen no se salga),
          pero que el modal no sea recortado */}
      <div className="product-media overflow-hidden">
        <img
          src={selected?.image}
          alt={`${product.name} - ${selected?.label ?? ""}`}
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <h3 className="h5 fw-bold mb-1">{product.name}</h3>
            <p className="adi-soft mb-0">{product.description}</p>
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-3" />

        <div className="mb-3">
          <div className="text-uppercase small fw-semibold adi-soft mb-2">Color</div>
          <div className="swatches">
            {product.colors.map((c) => (
              <button
                key={c.key}
                type="button"
                className={`swatch ${c.key === colorKey ? "is-active" : ""}`}
                onClick={() => setColorKey(c.key)}
                aria-label={c.label}
                title={c.label}
              >
                <span className="swatch-dot" style={{ background: c.hex ?? "transparent" }} />
              </button>
            ))}
          </div>
          <div className="adi-soft small mt-2">{selected?.label}</div>
        </div>

        <div className="d-flex flex-wrap gap-2">

          {product.sizeChart ? (
            <button className="btn btn-outline-light" onClick={() => setSizeOpen(true)}>
              Tabla de tallas
            </button>
          ) : (
            <a className="btn btn-outline-light" href="#cotizar" title="Solicitar tabla">
              Solicitar tallas
            </a>
          )}

          <a className="btn btn-primary ms-auto" href="#cotizar">
            Cotizar
          </a>
        </div>
      </div>

      {product.sizeChart ? (
        <SizeChartModal open={sizeOpen} onClose={() => setSizeOpen(false)} chart={product.sizeChart} />
      ) : null}
    </div>
  );
}