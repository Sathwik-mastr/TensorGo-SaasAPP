import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const currUser = user.user;
  const UserId = user.userId;
  const navigate = useNavigate();

  const [plan, setPlan] = useState('');
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/user/${UserId}`);
        const data = await res.json();
        console.log(data)
        setPlan(data.plan);
        setOrders(data.orders || []);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    if (UserId) fetchUser();
  }, [UserId]);

  const toggleOrders = () => {
    setShowOrders((prev) => !prev);
  };

  const handleDeleteOrder = async (index) => {
    try {
      const res = await fetch(`http://localhost:5000/user/delete-order/${UserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index }), // index of the order to remove
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Order deleted');
        setOrders(data.orders); // update with new orders list
      } else {
        toast.error('Failed to delete order');
      }
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {user?.user.email}</h1>
        <p className="text-gray-600 mb-6">
          Current Plan:{' '}
          <span className="font-medium text-blue-600">{plan || 'Basic'}</span>
        </p>

        <button
          onClick={toggleOrders}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {showOrders ? 'Hide Orders' : 'Show Orders'}
        </button>

        {showOrders && (
          <div className="mt-4 bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Your Orders</h2>
            {orders && orders.length > 0 ? (
              <ul className="space-y-3">
                {orders.map((order, index) => (
                  <li
                    key={index}
                    className="bg-white rounded shadow p-3 border flex flex-col sm:flex-row sm:justify-between sm:items-center"
                  >
                    <div>
                      <p className="font-semibold">Plan: {order.planName}</p>
                      <p className="text-sm text-gray-600">
                        Date: {new Date(order.date).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Amount: ₹{order.amount}</p>
                      {/* <p className="text-sm text-green-600">Status: {order.status}</p> */}
                    </div>
                    <button
                      onClick={() => handleDeleteOrder(index)}
                      className="mt-3 sm:mt-0 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No orders yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
