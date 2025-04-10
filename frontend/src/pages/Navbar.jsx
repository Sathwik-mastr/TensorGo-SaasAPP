import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.user.user);
  const UserRole = User?.user?.role;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const renderDashboardLink = () => {
    if (UserRole === 'superadmin') {
      return (
        <Link
          to="/superadmin"
          className="text-gray-700 font-semibold hover:text-blue-600"
        >
          Super Admin Panel
        </Link>
      );
    } else if (UserRole === 'admin') {
      return (
        <Link
          to="/admin"
          className="text-gray-700 font-semibold hover:text-blue-600"
        >
          Admin Panel
        </Link>
      );
    } else if (UserRole === 'user') {
      return (
        <Link
          to="/dashboard"
          className="text-gray-700 font-semibold hover:text-blue-600"
        >
          Dashboard
        </Link>
      );
    } else {
      return null;
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-800">
        Saas
      </Link>

      <div className="space-x-4 flex items-center">
        <Link
          to="/home"
          className="text-gray-700 font-semibold hover:text-blue-600"
        >
          Home
        </Link>

        {renderDashboardLink()}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
