import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('User Info:', result.user);
      alert('Logged in successfully!');
      navigate('/students');
    } catch (error) {
      console.error('Error during Google Sign-In:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-lg">
        <h1 className="text-xl font-bold mb-6 text-center">Login</h1>
        <button
          onClick={handleGoogleSignIn}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
