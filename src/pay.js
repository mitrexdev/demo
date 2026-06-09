// pay.js

const API_BASE_URL = "http://localhost:5000/api";

const plans = {
  monthly: {
    name: "Monthly Plan",
    price: 499,
  },
  yearly: {
    name: "Yearly Plan",
    price: 4999,
  },
};

async function startPayment(planType) {
  try {
    if (!plans[planType]) {
      alert("Invalid plan selected");
      return;
    }

    const selectedPlan = plans[planType];

    const response = await fetch(`${API_BASE_URL}/payment/create-checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planType,
        planName: selectedPlan.name,
        amount: selectedPlan.price,
        currency: "INR",
        userId: "demo-user-123",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Payment checkout failed");
    }

    // Backend se checkoutUrl aayega
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      alert("Checkout URL not found");
    }
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Payment start nahi ho paya. Console check karo.");
  }
}

// Button events
document.addEventListener("DOMContentLoaded", () => {
  const monthlyBtn = document.getElementById("monthly-pay-btn");
  const yearlyBtn = document.getElementById("yearly-pay-btn");

  if (monthlyBtn) {
    monthlyBtn.addEventListener("click", () => startPayment("monthly"));
  }

  if (yearlyBtn) {
    yearlyBtn.addEventListener("click", () => startPayment("yearly"));
  }
});
