import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUser, setFilteredUser] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/user/all?role=user');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  // Delete a user by ID
  const handleRemoveUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('User deleted');
        fetchUsers();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  // Search for a user by email
  const handleSearch = () => {
    const found = users.find((u) => u.email === search);
    if (found) {
      setFilteredUser(found);
    } else {
      toast.error('User not found');
      setFilteredUser(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Manage Users</h2>

      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Search
        </button>

        {/* Display searched user */}
        {filteredUser && (
          <div className="mt-4 p-4 border rounded bg-white shadow">
            <h3 className="text-lg font-semibold mb-2">User Details</h3>
            <p><strong>Email:</strong> {filteredUser.email}</p>
            <p><strong>Plan:</strong> {filteredUser.plan || 'Not set'}</p>
            <p><strong>Role:</strong> {filteredUser.role}</p>
            <p><strong>User ID:</strong> {filteredUser._id}</p>
          </div>
        )}
      </div>

      {/* User List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-4 bg-white border rounded shadow-sm flex flex-col justify-between"
          >
            <div className="mb-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Plan:</strong> {user.plan || 'Not set'}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Recharge Date:</strong> {new Date(user.date).toLocaleDateString()}</p>

            </div>
            <button
              onClick={() => handleRemoveUser(user._id)}
              className="text-red-600 hover:text-red-800 self-end"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
