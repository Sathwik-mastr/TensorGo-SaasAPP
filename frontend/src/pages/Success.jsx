import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const PaymentSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
   const User = useSelector((state) => state.user.user);
      const UserId=User.userId;
      console.log(id)

      const handleSubmit = async () => {
        try {
          const res = await fetch(`http://localhost:5000/user/update-plan/${UserId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              plan: id, // Update plan
              order: {
                planName: id,
                amount: id == "standard" ? 4999 : 39990,
                date: new Date().toISOString(),
                status: 'completed'
              },
              date: new Date().toISOString(),
            }),
          });
      
          const data = await res.json(); // <-- moved outside fetch call
      
          if (res.ok) {
            toast.success(`Plan upgraded to ${id}`, {
              duration: 3000,
            });
            navigate('/dashboard');
          } else {
            toast.error('Failed to update plan');
          }
        } catch (error) {
          console.error('API error:', error);
          toast.error('Something went wrong while upgrading the plan');
        }
      };
      

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center p-6">
      <CheckCircleIcon className="w-24 h-24 text-green-600 mb-4" />
      <h1 className="text-3xl font-bold text-green-700">Payment Successful!</h1>
      <p className="mt-2 text-lg text-green-800">
        Your subscription has been upgraded. You can now enjoy the new features of your plan.
      </p>

      <button
        onClick={handleSubmit}
        className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
