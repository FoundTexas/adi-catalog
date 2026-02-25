import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import type { SizeRow } from "../../config/pricing";

type Props = {
  open: boolean;
  onClose: () => void;
  chart: { title: string; rows: SizeRow[] };
  subtitle?: string; // nombre del producto
};

export default function SizeChartModal({ open, onClose, chart, subtitle }: Props) {
  useEffect(() => {
    if (!open) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onEsc);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  const node = (
    <div className="adi-modal-backdrop" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="adi-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="adi-modal-head">
          <div>
            <h4 className="m-0">{chart.title}</h4>
            {subtitle ? <div className="adi-soft small mt-1">{subtitle}</div> : null}
          </div>

          <button className="adi-icon-btn" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="adi-modal-body">
          <div className="adi-table-wrap">
            <table className="adi-size-table">
              <thead>
                <tr>
                  <th>Talla</th>
                  <th>Ancho (cm)</th>
                  <th>Largo (cm)</th>
                </tr>
              </thead>
              <tbody>
                {chart.rows.map((r) => (
                  <tr key={r.size}>
                    <td>{r.size}</td>
                    <td>{r.widthCm}</td>
                    <td>{r.lengthCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="adi-soft small mb-0">* Medidas aproximadas. Puede variar por lote.</p>
        </div>

        <div className="adi-modal-foot">
          <button className="btn btn-primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}