async function checkIntaSend() {
  const checkoutId = '25179296-7793-43da-a6ad-9f1e8c6878bb';
  
  // 1. Check the checkout status endpoint
  try {
    const res = await fetch(`https://payment.intasend.com/api/v1/checkout/${checkoutId}/`);
    const data = await res.json();
    console.log("Checkout API Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.log("Checkout API failed:", err.message);
  }

  // 2. Check the express checkout status endpoint (sometimes used for tracking)
  try {
    const res = await fetch(`https://payment.intasend.com/api/v1/checkout/${checkoutId}/status/`);
    const data = await res.text();
    console.log("Status API Response:", data.substring(0, 500));
  } catch (err) {
    console.log("Status API failed:", err.message);
  }
}

checkIntaSend();
