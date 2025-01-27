import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Login from './Pages/Login';
import Students from './Pages/Students';
import SignupPage from './Pages/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={user ? <Navigate to="/students" /> : <Login />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Protected Route */}
        <Route
          path="/students"
          element={user ? <Students /> : <Navigate to="/" />}
        />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer className= 'z-99999999999' position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    </Router>
  );
}

export default App;

