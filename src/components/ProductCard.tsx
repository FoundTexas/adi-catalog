import React, { useMemo, useState } from "react";
import type { Product } from "../config/pricing";
import SizeChartModal from "./modals/SizeChartModal";

export default function ProductCard({ product }: { product: Product }) {
  const [colorKey, setColorKey] = useState(product.colors[0]?.key ?? "");
  const [priceId, setPriceId] = useState(product.prices?.[0]?.id ?? "");
  const [sizeOpen, setSizeOpen] = useState(false);

  const selectedColor = useMemo(
    () => product.colors.find((c) => c.key === colorKey) ?? product.colors[0],
    [product.colors, colorKey]
  );

  const selectedPrice = useMemo(
    () => product.prices.find((p) => p.id === priceId) ?? product.prices?.[0],
    [product.prices, priceId]
  );

  return (
    <div className="adi-card">
      {/* IMAGE */}
      <div className="product-media overflow-hidden">
        <img
          src={selectedColor?.image}
          alt={`${product.name} - ${selectedColor?.label ?? ""}`}
          loading="lazy"
        />
      </div>

      <div className="p-4">
        {/* TITLE */}
        <div className="mb-2">
          <h3 className="h5 fw-bold mb-1">{product.name}</h3>
          <p className="adi-soft mb-0">{product.description}</p>
        </div>

        {/* 💰 PRICE */}
        {selectedPrice && (
          <div className="mb-3">
            <span className="adi-price fw-bold fs-5">
              ${selectedPrice.retail}
            </span>
            <span className="adi-soft small ms-2">
              {selectedPrice.label}
            </span>
          </div>
        )}

        <hr className="border-secondary opacity-25 my-3" />

        {/* 🎯 VARIANT SELECTOR */}
        {product.prices.length > 1 && (
          <div className="mb-3">
            <div className="text-uppercase small fw-semibold adi-soft mb-2">
              Tipo
            </div>
            <div className="d-flex flex-wrap gap-2">
              {product.prices.map((p) => (
                <button
                  key={p.id}
                  className={`adi-chip ${p.id === priceId ? "is-active" : ""}`}
                  onClick={() => setPriceId(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 🎨 COLOR */}
        <div className="mb-3">
          <div className="text-uppercase small fw-semibold adi-soft mb-2">
            Color
          </div>

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
                <span
                  className="swatch-dot"
                  style={{ background: c.hex ?? "transparent" }}
                />
              </button>
            ))}
          </div>

          <div className="adi-soft small mt-2">
            {selectedColor?.label}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="d-flex flex-wrap gap-2">
          {product.sizeChart ? (
            <button
              className="btn btn-outline-light"
              onClick={() => setSizeOpen(true)}
            >
              Tabla de tallas
            </button>
          ) : (
            <a
              className="btn btn-outline-light"
              href="#cotizar"
              title="Solicitar tabla"
            >
              Solicitar tallas
            </a>
          )}

          <a className="btn btn-primary ms-auto" href="#cotizar">
            Cotizar
          </a>
        </div>
      </div>

      {/* MODAL */}
      {product.sizeChart && (
        <SizeChartModal
          open={sizeOpen}
          onClose={() => setSizeOpen(false)}
          chart={product.sizeChart}
        />
      )}

      {/* EXTRA STYLES (chips) */}
      <style jsx>{`
        .adi-chip {
          border: 1px solid rgba(120, 90, 160, 0.2);
          background: rgba(255, 255, 255, 0.7);
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .adi-chip:hover {
          background: rgba(180, 108, 255, 0.1);
        }

        .adi-chip.is-active {
          background: linear-gradient(135deg, #b46cff, #8e5bff);
          color: #fff;
          box-shadow: 0 8px 20px rgba(180, 108, 255, 0.25);
        }
      `}</style>
    </div>
  );
}