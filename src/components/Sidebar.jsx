import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/students" className="hover:underline">
              Students Page
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

