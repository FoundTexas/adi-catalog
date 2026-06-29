// src/components/ProductsCatalog.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import type { Product } from "../config/pricing";
import ProductCard from "./ProductCard";
import SizeChartModal from "./modals/SizeChartModal";

type Props = {
  products: Product[];
};

export default function ProductsCatalog({ products }: Props) {
  const [sizeOpen, setSizeOpen] = useState(false);
  const [sizeProductId, setSizeProductId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

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

  const scrollMobileCarousel = useCallback((direction: "left" | "right") => {
    const track = carouselRef.current;
    if (!track) return;

    const slides = Array.from(
      track.querySelectorAll<HTMLElement>(".products-mobile-slide")
    );

    if (!slides.length) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;

    const currentIndex = slides.reduce((closestIndex, slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;

      const closestSlide = slides[closestIndex];
      const closestCenter =
        closestSlide.offsetLeft + closestSlide.offsetWidth / 2;

      return Math.abs(slideCenter - trackCenter) <
        Math.abs(closestCenter - trackCenter)
        ? index
        : closestIndex;
    }, 0);

    const nextIndex =
      direction === "right"
        ? (currentIndex + 1) % slides.length
        : (currentIndex - 1 + slides.length) % slides.length;

    const nextSlide = slides[nextIndex];

    const nextScrollLeft =
      nextSlide.offsetLeft - (track.clientWidth - nextSlide.offsetWidth) / 2;

    track.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="products-catalog-carousel">
        <button
          type="button"
          className="catalog-mobile-arrow catalog-mobile-arrow-left d-md-none"
          aria-label="Producto anterior"
          onClick={() => scrollMobileCarousel("left")}
        >
          ‹
        </button>

        <div ref={carouselRef} className="row g-3 justify-content-center align-items-stretch products-mobile-track">
          {products.map((product) => (
            <div
              key={product.id}
              className="col-md-6 col-lg-4 products-mobile-slide"
            >
              <ProductCard product={product} onOpenSize={openSizeFor} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="catalog-mobile-arrow catalog-mobile-arrow-right d-md-none"
          aria-label="Siguiente producto"
          onClick={() => scrollMobileCarousel("right")}
        >
          ›
        </button>
      </div>

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