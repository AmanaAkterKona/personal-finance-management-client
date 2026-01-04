import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import useTheme from '../pages/useTheme';
import { FaGoogle, FaEnvelope, FaLock, FaUserShield, FaUser } from 'react-icons/fa';

const Login = () => {
  const { theme } = useTheme();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, googleSignIn, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Demo Credential Handler
  const fillDemoCredentials = (email, password) => {
    const emailField = document.querySelector('input[name="email"]');
    const passwordField = document.querySelector('input[name="password"]');
    emailField.value = email;
    passwordField.value = password;
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in with Google!");
        navigate(location.state || "/");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(result => {
        toast.success("Welcome back!");
        navigate(location.state || "/");
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.");
        toast.error("Login failed!");
        setLoading(false);
      });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-all duration-500 ${
      theme === "dark" ? "bg-gray-950" : "bg-gray-50"
    }`}>
      <div className={`w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border ${
        theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
      }`}>
        
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-black mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Welcome Back
            </h2>
            <p className="text-gray-500">Enter your details to access your dashboard</p>
          </div>

          {/* Requirement: Demo Credential Buttons */}
          <div className="flex gap-3 mb-8">
            <button 
              onClick={() => fillDemoCredentials("admin@test.com", "123456")}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-xl border border-amber-500 text-amber-500 hover:bg-amber-50 transition-colors"
            >
              <FaUserShield /> Admin Demo
            </button>
            <button 
              onClick={() => fillDemoCredentials("user@test.com", "123456")}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-xl border border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FaUser /> User Demo
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2">
                <FaEnvelope size={12}/> Email Address
              </label>
              <input
                name='email'
                type="email"
                className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 ring-blue-500/20 transition-all ${
                  theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                }`}
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2">
                <FaLock size={12}/> Password
              </label>
              <input
                name='password'
                type="password"
                className={`w-full p-4 rounded-2xl border outline-none focus:ring-2 ring-blue-500/20 transition-all ${
                  theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                }`}
                placeholder="••••••••"
                required
              />
              <div className="text-right">
                <button type="button" className="text-sm font-bold text-blue-600 hover:underline">Forgot password?</button>
              </div>
            </div>

            {error && <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">{error}</div>}

            <button 
              type='submit' 
              disabled={loading}
              className="w-full py-4 bg-gray-900 dark:bg-blue-600 text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-800"></div></div>
            <div className="relative flex justify-center text-sm uppercase"><span className={`px-2 ${theme === "dark" ? "bg-gray-900 text-gray-500" : "bg-white text-gray-400"}`}>Or continue with</span></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className={`w-full py-4 border rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${
              theme === "dark" ? "border-gray-700 text-white" : "border-gray-200 text-gray-700"
            }`}
          >
            <FaGoogle className="text-red-500" />
            Sign in with Google
          </button>

          <p className={`mt-8 text-center font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            New here? <Link className='text-blue-600 font-bold hover:underline' to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;