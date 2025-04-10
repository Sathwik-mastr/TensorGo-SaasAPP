import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const user = useSelector(state => state.user.user);

  const handleRemove = (plan) => {
    dispatch(removeFromCart(plan));
    toast.success("Removed from cart");
  };

  const handleClear = () => {
    dispatch(clearCart());
    toast("Cart cleared");
  };

  const handleUpgrade = async (planName) => {
    try {
      const res = await fetch('http://localhost:5000/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ planId: planName.toLowerCase(), user: user.user }),
      });

      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error('Upgrade failed', err);
      toast.error("Upgrade failed");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500 italic">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {cart.map((item, idx) => (
              <li key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border p-3 rounded bg-white shadow-sm">
                <div className="mb-2 sm:mb-0">
                  <span className="font-medium">{item.name}</span> - {item.price}
                </div>
                <div className="flex gap-3">
                  {item.name.toLowerCase() === 'standard' && (
                    <button
                      onClick={() => handleUpgrade('standard')}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Upgrade to Standard
                    </button>
                  )}
                  {item.name.toLowerCase() === 'plus' && (
                    <button
                      onClick={() => handleUpgrade('plus')}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Upgrade to Plus
                    </button>
                  )}
                  {item.name.toLowerCase() === 'basic' && (
                    <span className="text-sm text-gray-600 italic">Basic plan - No upgrade</span>
                  )}
                  <button
                    onClick={() => handleRemove(item)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleClear}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
