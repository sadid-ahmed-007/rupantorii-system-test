"use client";

import { useMemo, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { formatPrice } from "../../lib/helpers";
import VariantSelector from "./VariantSelector";

export default function ProductDetailsClient({ product }) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.find((variant) => variant.stock > 0) || product.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");

  const price = selectedVariant?.price ?? product.basePrice;
  const variantList = product.variants || [];
  const hasVariants = variantList.length > 0;
  const totalStock = hasVariants
    ? variantList.reduce((sum, variant) => sum + (variant.stock || 0), 0)
    : product.stock || 0;
  const isOutOfStock = product.status === "out_of_stock" || totalStock <= 0;
  const lowStock = totalStock > 0 && totalStock <= 10;
  const variantStock = selectedVariant ? selectedVariant.stock : null;
  const cannotPurchase = isOutOfStock || (variantStock !== null && variantStock <= 0);
  const variantLabel = useMemo(() => {
    if (!selectedVariant) return null;
    return [selectedVariant.size, selectedVariant.color, selectedVariant.material]
      .filter(Boolean)
      .join(" - ");
  }, [selectedVariant]);

  const handleAddToCart = () => {
    if (cannotPurchase) {
      setFeedback("This product is currently out of stock.");
      return;
    }

    addItem({
      productId: product.id,
      variantId: selectedVariant?.id || null,
      name: product.name,
      variantLabel,
      price,
      quantity,
      image: product.primaryImage
    });
    setFeedback("Added to cart.");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-pine">{product.category?.name}</p>
        <h1 className="text-3xl text-ink">{product.name}</h1>
        <p className="mt-3 text-sm text-pine">{product.description}</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-2xl text-rose">{formatPrice(price)}</span>
        {hasVariants ? (
          selectedVariant && selectedVariant.stock <= 10 ? (
            <span className="text-xs uppercase tracking-[0.3em] text-pine">
              Stock: {selectedVariant.stock}
            </span>
          ) : null
        ) : totalStock <= 10 ? (
          <span className="text-xs uppercase tracking-[0.3em] text-pine">
            Stock: {totalStock}
          </span>
        ) : null}
        {isOutOfStock ? (
          <span className="text-xs uppercase tracking-[0.3em] text-rose">Out of stock</span>
        ) : lowStock ? (
          <span className="text-xs uppercase tracking-[0.3em] text-pine">Only {totalStock} left</span>
        ) : null}
      </div>

      <VariantSelector
        variants={product.variants}
        selectedId={selectedVariant?.id}
        onChange={setSelectedVariant}
      />

      <div className="flex items-center gap-4">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          className="w-20 rounded-full border border-mist bg-white/80 px-4 py-3 text-center text-sm"
        />
        <button className="btn-primary" onClick={handleAddToCart} disabled={cannotPurchase}>
          {cannotPurchase ? "Unavailable" : "Add to Cart"}
        </button>
      </div>
      {feedback ? <p className="text-xs uppercase tracking-[0.3em] text-pine">{feedback}</p> : null}
    </div>
  );
}

