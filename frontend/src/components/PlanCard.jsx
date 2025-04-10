import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlanCard({ plan }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 shadow rounded-xl text-center">
      <h2 className="text-xl font-bold">{plan.name}</h2>
      <p className="text-gray-700">{plan.price}</p>
      <p className="text-sm mt-2">Users Allowed: {plan.users}</p>
      <button
        onClick={() => navigate('/checkout', { state: plan })}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Subscribe
      </button>
    </div>
  );
}
