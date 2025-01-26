import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import Login from './pages/Login';
import Students from './pages/Students';
import SignupPage from './Pages/Register';

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
    </Router>
  );
}

export default App;

