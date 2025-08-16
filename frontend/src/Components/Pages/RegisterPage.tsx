import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../Services/auth';
import { FormData } from '../../types';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const response = await register(formData);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log('Register failed', error.response.data.error);
        setErrorMsg(error.response.data.error);
      } else {
        console.log('Unknown error', error);
        setErrorMsg('Something went wrong. Try again later.');
      }
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0A192F]">
      {/* Simple navbar bar - same styling as main navbar but no content */}
      <nav
        className="top-0 w-full bg-[#0A192F] shadow-md z-50"
        style={{ position: 'fixed', height: '4.5rem' }}
      >
        <div className="h-18 flex items-center px-4">
          <button
            onClick={handleBackClick}
            className="flex items-center justify-center w-12 h-12 text-purple-500 hover:text-purple-400 hover:scale-110 transition-all duration-200 cursor-pointer"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </button>
        </div>
      </nav>
      <img src={'../assets/tpx_logo.webp'} alt="Logo" className="w-16 h-16 mb-8" />
      <div className="bg-transparent px-8 py-10 rounded-lg flex flex-col items-center w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-200 mb-8 text-center">
          Create an account
        </h2>
        {errorMsg && (
          <div className="mb-4 text-center text-red-400 font-semibold">{errorMsg}</div>
        )}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 bg-gray-700 border border-transparent placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 bg-gray-700 border border-transparent placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1]"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-200 bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1]"
          >
            Create account
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-400">Already have an account? </span>
          <Link to="/login" className="text-purple-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
