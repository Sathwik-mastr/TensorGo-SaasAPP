import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showAdmins, setShowAdmins] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/user');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Admin deleted successfully');
        fetchUsers(); // refresh list
      } else {
        toast.error('Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast.error('An error occurred');
    }
  };

  const groupedUserPlans = users
    .filter((user) => user.role === 'user')
    .reduce((acc, user) => {
      const plan = user.plan || 'No Plan';
      if (!acc[plan]) acc[plan] = [];
      acc[plan].push(user);
      return acc;
    }, {});

  const admins = users.filter((user) => user.role === 'admin');

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Admin Dashboard - User Plan Overview</h2>

      {/* Toggle Admins */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAdmins(!showAdmins)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
        >
          {showAdmins ? 'Hide Admins' : 'Show Admins'}
        </button>
      </div>

      {/* Admin List */}
      {showAdmins && (
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-red-600 mb-4">Admins</h3>
          {admins.length === 0 ? (
            <p className="text-gray-600">No admins found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Email</th>
                    <th className="py-2 px-4 border-b text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{admin.email}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleDeleteAdmin(admin._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* User Plan Groups */}
      {Object.keys(groupedUserPlans).length === 0 ? (
        <p className="text-center text-gray-600">No user data available.</p>
      ) : (
        Object.keys(groupedUserPlans).map((plan) => (
          <div key={plan} className="mb-10">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">{plan} Plan Users</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Email</th>
                    <th className="py-2 px-4 border-b text-left">Recharge Date</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedUserPlans[plan].map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{user.email}</td>
                      <td className="py-2 px-4 border-b">
                        {user.date ? new Date(user.date).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
