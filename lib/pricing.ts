export interface DiscountResult {
  price: number;
  percent: number;
  final: number;
}

/**
 * Applies a percentage discount to a price.
 * @param price   original price
 * @param percent discount percentage (0–100)
 */
export function applyDiscount(price: number, percent: number): number {
  const discount = (price * percent) / 100;
  return price - discount;
}

export function formatPrice(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currenc",
    currency,
  }).format(value);
}
