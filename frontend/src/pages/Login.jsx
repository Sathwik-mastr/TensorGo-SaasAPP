import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

export default function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(setUser(data));
      navigate('/home');
      toast.success('Logged In Successfully', {
        style: {
          background: 'green',
          color: 'white',
        },
      });
    } else {
      toast.error('Login Failed', {
        style: {
          background: 'brown',
          color: 'white',
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* 👇 Register Link */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
