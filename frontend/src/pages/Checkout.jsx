import React from 'react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart } = useCart();

  const handleCheckout = async () => {
    const res = await fetch('/api/stripe/checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart })
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert('Failed to create session');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Confirm & Pay</h2>
      <ul className="mb-4 space-y-2">
        {cart.map((item, i) => (
          <li key={i}>{item.name} - {item.price}</li>
        ))}
      </ul>
      <button onClick={handleCheckout} className="bg-green-600 text-white px-4 py-2 rounded">
        Pay with Stripe
      </button>
    </div>
  );
}
