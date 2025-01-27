import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useState } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(''); // Track active item manually

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
    setActiveItem('logout'); // Set activeItem to logout
  };

  return (
    <div className="h-screen w-1/5 bg-white text-black p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `block w-full rounded-lg py-2 px-3 ${
                  isActive ? 'bg-blue-200' : ''
                } hover:bg-blue-50`
              }
              onClick={() => setActiveItem('students')}
            >
              Students Page
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className={` w-full rounded-lg py-2 px-3 ${
                activeItem === 'logout' ? 'bg-red-200' : ''
              } hover:bg-red-50`}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
