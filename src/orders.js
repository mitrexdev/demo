// Order total calculation.
import { add } from "./index.js";

/**
 * Compute the subtotal for a list of order items.
 *
 * @param {Array<{price: number, qty: number}>} items - Array of items where each item has a `price` and `qty`.
 * @returns {number} The sum of `price * qty` for all items.
 */
export function calculateSubtotal(items) {
  let subtotal = 0;
  for (const item of items) {
    subtotal = add(subtotal, item.price * item.qty);
  }
  return subtotal;
}

/**
 * Apply a percentage discount to a subtotal.
 *
 * @param {number} subtotal - The initial amount to discount.
 * @param {number} percent - Discount percentage to apply (0–100).
 * @returns {number} The subtotal after applying the discount.
 * @throws {RangeError} If `percent` is less than 0 or greater than 100.
 */
export function applyDiscount(subtotal, percent) {
  if (percent < 0 || percent > 100) {
    throw new RangeError(
      `discount percent must be between 0 and 100, got ${percent}`,
    );
  }
  return subtotal - (subtotal * percent) / 100;
}

/**
 * Compute the final order total after applying a percentage discount and then tax.
 *
 * @param {Array<{price: number, qty: number}>} items - Line items; each object must include `price` (unit price) and `qty` (quantity).
 * @param {number} discountPercent - Discount percentage to apply to the subtotal (0–100).
 * @param {number} taxPercent - Tax percentage applied to the discounted subtotal.
 * @returns {number} The total amount (discounted subtotal plus tax).
 */
export function calculateTotal(items, discountPercent, taxPercent) {
  const subtotal = calculateSubtotal(items);
  const discounted = applyDiscount(subtotal, discountPercent);
  const tax = (discounted * taxPercent) / 100;
  return discounted + tax;
}
