import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaNewspaper, FaUser, FaSignOutAlt, FaHome, FaChartBar, FaUsers, FaFolder, FaHistory, FaTags } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout, isAdmin, isStaff, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:text-blue-200 transition-colors">
            <FaNewspaper size={24} />
            <span>FU News</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <FaHome size={18} />
              <span>Home</span>
            </Link>

            {isAuthenticated() && (
              <>
                {isAdmin() && (
                  <>
                    <Link to="/admin/accounts" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                      <FaUsers size={18} />
                      <span>Accounts</span>
                    </Link>
                    <Link to="/admin/statistics" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                      <FaChartBar size={18} />
                      <span>Statistics</span>
                    </Link>
                  </>
                )}

                {isStaff() && (
                  <>
                    <Link to="/staff/categories" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                      <FaFolder size={18} />
                      <span>Categories</span>
                    </Link>
                    <Link to="/staff/tags" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                      <FaTags size={18} />
                      <span>Tags</span>
                    </Link>
                    <Link to="/staff/news" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                      <FaNewspaper size={18} />
                      <span>News</span>
                    </Link>
                    <Link to="/staff/news-history" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                      <FaHistory size={18} />
                      <span>My News</span>
                    </Link>
                  </>
                )}

                <Link to="/profile" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                  <FaUser size={18} />
                  <span>{user?.userName}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-blue-200 transition-colors"
                >
                  <FaSignOutAlt size={18} />
                  <span>Logout</span>
                </button>
              </>
            )}

            {!isAuthenticated() && (
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
