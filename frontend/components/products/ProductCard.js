"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../../lib/helpers";
import { useCart } from "../../contexts/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [feedback, setFeedback] = useState("");
  const image = product.images?.find((img) => img.isPrimary) || product.images?.[0];
  const variantList = product.variants || [];
  const hasVariants = variantList.length > 0;
  const totalStock = hasVariants
    ? variantList.reduce((sum, variant) => sum + (variant.stock || 0), 0)
    : product.stock || 0;
  const isOutOfStock = product.status === "out_of_stock" || totalStock <= 0;
  const lowStock = totalStock > 0 && totalStock <= 10;
  const primaryVariant = hasVariants
    ? variantList.find((variant) => variant.stock > 0) || variantList[0] || null
    : null;
  const variantStock = primaryVariant ? primaryVariant.stock : null;
  const cannotPurchase = isOutOfStock || (variantStock !== null && variantStock <= 0);

  const handleAddToCart = () => {
    if (cannotPurchase) {
      setFeedback("Out of stock.");
      return;
    }

    addItem({
      productId: product.id,
      variantId: primaryVariant?.id || null,
      name: product.name,
      variantLabel: primaryVariant?.sku || null,
      price: primaryVariant?.price ?? product.basePrice,
      quantity: 1,
      image: image ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}${image.url}` : null
    });
    setFeedback("Added to cart.");
  };

  return (
    <div className="glass-card group flex h-full flex-col gap-4 rounded-3xl p-5">
      <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-mist">
        {image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}${image.url}`}
            alt={image.alt || product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-pine">{product.category?.name}</p>
          <h3 className="text-xl text-ink">{product.name}</h3>
          {isOutOfStock ? (
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-rose">Out of stock</p>
          ) : lowStock ? (
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-pine">Only {totalStock} left</p>
          ) : null}
        </div>
        <p className="text-sm text-pine">{product.description.slice(0, 80)}...</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <span className="text-lg text-rose">{formatPrice(product.basePrice)}</span>
          <div className="flex items-center gap-3">
            <button className="btn-outline" onClick={handleAddToCart} disabled={cannotPurchase}>
              {cannotPurchase ? "Unavailable" : "Add to Cart"}
            </button>
            <Link href={`/products/${product.id}`} className="btn-outline">
              View
            </Link>
          </div>
        </div>
        {feedback ? <p className="text-xs uppercase tracking-[0.3em] text-pine">{feedback}</p> : null}
      </div>
    </div>
  );
}
