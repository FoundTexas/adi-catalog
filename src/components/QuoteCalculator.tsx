// src/components/QuoteCalculator.tsx
import React, { useMemo, useState } from "react";
import { PRICING, PRODUCTS } from "../config/pricing";

type Delivery = "metro" | "national";

const PRICE_BY_PRODUCT: Record<
  string,
  { label: string; retail: number; wholesale: number }[]
> = {
  "tshirt-basic": [{ label: "DTF / Estándar", retail: 199, wholesale: 149 }],
  "hoodie-premium": [{ label: "DTF / Estándar", retail: 499, wholesale: 399 }],
};

export default function QuoteCalculator() {
  const availableProducts = PRODUCTS ?? [];
  const first = availableProducts[0];

  if (!first) {
    return (
      <div className="card adi-card">
        <div className="card-body p-4">
          <h2 className="h5 mb-2">Cotizador</h2>
          <p className="text-muted mb-0">No hay productos configurados aún.</p>
        </div>
      </div>
    );
  }

  const [productId, setProductId] = useState(first.id);
  const [qty, setQty] = useState(5);
  const [delivery, setDelivery] = useState<Delivery>("national");
  const [notes, setNotes] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);

  const product = useMemo(() => {
    return availableProducts.find((p) => p.id === productId) ?? first;
  }, [availableProducts, productId, first]);

  const options = useMemo(() => {
    return PRICE_BY_PRODUCT[product.id] ?? [{ label: "Estándar", retail: 0, wholesale: 0 }];
  }, [product.id]);

  // si cambia producto, resetea opción al índice 0
  React.useEffect(() => {
    setOptionIndex(0);
  }, [product.id]);

  const option = options[Math.min(optionIndex, options.length - 1)];

  const isWholesale = qty >= PRICING.wholesaleThreshold;
  const unitPrice = isWholesale ? option.wholesale : option.retail;
  const subtotal = unitPrice * qty;

  const shipping = useMemo(() => {
    const ship = PRICING.shipping ?? {};
    const metroCdmx = ship.metroCdmx ?? 0;
    const nationalRetail = ship.nationalRetail ?? 100;
    const nationalWholesale = ship.nationalWholesale ?? 0;

    if (delivery === "metro") return metroCdmx;
    return isWholesale ? nationalWholesale : nationalRetail;
  }, [delivery, isWholesale]);

  const total = subtotal + shipping;

  const summary = useMemo(() => {
    const tier = isWholesale
      ? `Mayoreo (${PRICING.wholesaleThreshold}+ )`
      : `Menudeo (1–${PRICING.wholesaleThreshold - 1})`;

    const deliveryText =
      delivery === "metro" ? "Entrega Metro CDMX (a coordinar)" : "Envío nacional";

    return [
      "Hola, quiero solicitar una cotización:",
      "",
      `Producto: ${product.name}`,
      `Opción: ${option.label}`,
      `Cantidad: ${qty} (${tier})`,
      `Precio unitario: $${unitPrice}`,
      `Entrega: ${deliveryText}`,
      `Costo envío: $${shipping}`,
      `Total estimado: $${total}`,
      "",
      "Notas:",
      notes || "—",
      "",
      "Quedo atento.",
    ].join("\n");
  }, [delivery, isWholesale, notes, option.label, product.name, qty, shipping, total, unitPrice]);

  function copySummary() {
    navigator.clipboard.writeText(summary);
    alert("Resumen copiado ✅");
  }

  function mailTo() {
    const subject = encodeURIComponent(`Cotización ADI – ${product.name}`);
    const body = encodeURIComponent(summary);
    window.location.href = `mailto:${PRICING.contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="card adi-card">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge badge-soft">Cotizador</span>
              <span className="text-muted small">
                Mayoreo desde {PRICING.wholesaleThreshold}+
              </span>
            </div>
            <h2 className="h5 mb-0">Cotiza en segundos</h2>
            <div className="text-muted small">
              {(PRICING.notes?.vat ?? "Precios en MXN.")} {(PRICING.notes?.shipping ?? "Envío no incluido.")}
            </div>
          </div>
        </div>

        <div className="row g-3 mt-3">
          <div className="col-md-6">
            <label className="form-label">Producto</label>
            <select
              className="form-select adi-pill"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            >
              {availableProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="form-text">{product.description}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Tipo</label>
            <select
              className="form-select adi-pill"
              value={String(optionIndex)}
              onChange={(e) => setOptionIndex(Number(e.target.value))}
            >
              {options.map((o, idx) => (
                <option key={`${o.label}-${idx}`} value={String(idx)}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Cantidad</label>
            <input
              className="form-control adi-pill"
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            />
            <div className="form-text">
              {isWholesale ? "Aplicando mayoreo ✅" : `Menudeo (1–${PRICING.wholesaleThreshold - 1})`}
            </div>
          </div>

          <div className="col-md-8">
            <label className="form-label">Entrega</label>
            <div className="d-flex gap-2 flex-wrap">
              <button
                type="button"
                className={`btn ${delivery === "national" ? "btn-dark" : "btn-outline-dark"} adi-pill`}
                onClick={() => setDelivery("national")}
              >
                Envío nacional
              </button>
              <button
                type="button"
                className={`btn ${delivery === "metro" ? "btn-dark" : "btn-outline-dark"} adi-pill`}
                onClick={() => setDelivery("metro")}
              >
                Metro CDMX (a coordinar)
              </button>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label">Notas (opcional)</label>
            <textarea
              className="form-control"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: tallas, colores, fecha límite, referencias…"
            />
          </div>

          <div className="col-12">
            <label className="form-label">Adjuntos (opcional)</label>
            <input className="form-control" type="file" multiple accept="image/*,.pdf,.svg,.ai,.psd" />
            <div className="form-text">Logo, referencias o idea visual.</div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3">
          <div>
            <div className="text-muted small">Precio unitario</div>
            <div className="h4 mb-2">${unitPrice}</div>

            <div className="text-muted small">Subtotal</div>
            <div className="h5 mb-2">${subtotal}</div>

            <div className="text-muted small">Envío</div>
            <div className="h6 mb-0">${shipping}</div>
          </div>

          <div className="text-end">
            <div className="text-muted small">Total estimado</div>
            <div className="display-6 fw-semibold mb-2">${total}</div>

            <div className="d-flex gap-2 justify-content-end flex-wrap">
              <button className="btn btn-outline-secondary adi-pill" onClick={copySummary}>
                Copiar resumen
              </button>
              <button className="btn btn-dark adi-pill" onClick={mailTo}>
                Enviar por correo
              </button>
              <a
                className="btn btn-outline-dark adi-pill"
                href={PRICING.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
