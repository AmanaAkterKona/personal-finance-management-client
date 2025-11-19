import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import useTheme from '../pages/useTheme';

const Login = () => {
  const { theme } = useTheme(); // ⬅ dark/light mode
  const [error, setError] = useState("");
  const { signIn, googleSignIn, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(result => {
        const user = result.user;
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"} min-h-screen`}>
      <Header />

      <div className="flex justify-center items-center min-h-screen px-4">
        <div className={`card w-full max-w-sm shrink-0 shadow-2xl py-5 transition-colors duration-500
          ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-base-100 text-gray-800"}`}
        >
          <h2 className='font-semibold text-2xl text-center text-cyan-700 mb-4'>Login your account</h2>

          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="space-y-4">
              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  name='email'
                  type="email"
                  className={`input w-full ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : ""}`}
                  placeholder="Email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="label">Password</label>
                <input
                  name='password'
                  type="password"
                  className={`input w-full ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : ""}`}
                  placeholder="Password"
                  required
                />
              </div>

              <div><a className="link link-hover">Forgot password?</a></div>

              {error && <p className='text-red-500 text-xs'>{error}</p>}

              <button type='submit' className="btn btn-neutral w-full mt-4">Login</button>

              <div className="divider">or</div>

              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="btn btn-outline w-full flex items-center justify-center"
              >
                <img src="/google-icon.png" alt="" className="w-5 h-5 mr-2" />
                Continue with Google
              </button>

              <p className='font-semibold text-center py-3'>
                Don't Have An Account? <Link className='text-pink-700' to="/signup">SignUp</Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
