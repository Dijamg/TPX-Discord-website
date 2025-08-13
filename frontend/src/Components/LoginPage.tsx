import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormData } from '../types';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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
      const response = await login(formData);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error: any) {
      if(error.response && error.response.data) {
        console.log("Login failed", error.response.data.error);
        setErrorMsg(error.response.data.error);
      } else {
        console.log("Unknown error", error);
        setErrorMsg("Something went wrong. Try again later.");
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
        <div className="h-18 flex items-center">
          <img
            src="/assets/navbar_banner.PNG"
            alt="TPX Banner"
            className="h-full w-auto m-0 p-0 cursor-pointer"
            onClick={handleBackClick}
          />
        </div>
      </nav>
      <img src={'../assets/tpx_logo.webp'} alt="Logo" className="w-16 h-16 mb-8" />
      <div className="bg-transparent px-8 py-10 rounded-lg flex flex-col items-center w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-200 mb-8 text-center">
          Sign in to your account
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
            Sign in
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-400">Not a member? </span>
          <Link to="/register" className="text-purple-500 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
