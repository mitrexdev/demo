// Order total calculation.
import { add } from "./index.js";

export function calculateSubtotal(items) {
  let subtotal = 0;
  for (const item of items) {
    subtotal = add(subtotal, item.price * item.qty);
  }
  return subtotal;
}

export function applyDiscount(subtotal, percent) {
  // BUG: no validation that percent is between 0 and 100
  return subtotal - (subtotal * percent) / 100;
}

export function calculateTotal(items, discountPercent, taxPercent) {
  const subtotal = calculateSubtotal(items);
  const discounted = applyDiscount(subtotal, discountPercent);
  const tax = (discounted * taxPercent) / 100;
  return discounted + tax;
}
