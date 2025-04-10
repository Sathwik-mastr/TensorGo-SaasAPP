import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const User = useSelector((state) => state.user.user);
  const UserEmail = User?.user?.email;
  const UserRole = User?.user?.role;
  const cart = useSelector(state => state.cart.items);

  const plans = [
    {
      name: 'Basic',
      price: 'Free for 14 Days',
      users: '1 user',
      bg: 'bg-gray-200'
    },
    {
      name: 'Standard',
      price: '₹4999/year',
      users: 'Up to 5 users',
      bg: 'bg-blue-200'
    },
    {
      name: 'Plus',
      price: '₹3999/year per user (10+)',
      users: '10+ users',
      bg: 'bg-green-200'
    }
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleAddToCart = (plan) => {
    dispatch(addToCart(plan));
    toast.success(`${plan.name} plan added to cart`);
  };

  const isInCart = (planName) => {
    return cart.some(item => item.name === planName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between">
        <div className="space-x-4 flex flex-row-reverse">
          {UserRole === 'user' && (
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-semibold">
              🛒 Cart ({cart.length})
            </Link>
          )}
        </div>
      </nav>

      {/* Plans Section */}
      <div className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">Choose Your Plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {plans.map((plan, index) => {
            const added = isInCart(plan.name);
            return (
              <div key={index} className={`rounded-lg p-6 shadow ${plan.bg}`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="mb-1">{plan.price}</p>
                <p className="mb-4">{plan.users}</p>

                {UserRole === 'user' && (
                  <button
                    onClick={() => !added && handleAddToCart(plan)}
                    className={`px-4 py-2 rounded text-white transition 
                      ${added ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={added}
                  >
                    {added ? 'Already in Cart' : 'Add to Cart'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
