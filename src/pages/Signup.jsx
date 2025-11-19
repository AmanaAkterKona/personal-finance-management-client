import React, { useState, use } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import useTheme from '../pages/useTheme';

const Signup = () => {
  const { createUser, setUser, updateUser, googleSignIn } = use(AuthContext);
  const [nameError, setNameError] = useState("");
  const { theme } = useTheme(); // ⬅ dark/light mode
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };

        setUser(user);
        toast.success("Logged in with Google!");
        navigate("/");

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => console.log("data after user save", data));
      })
      .catch((err) => toast.error(err.message));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Validations
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else setNameError("");

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must have at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must have at least one lowercase letter");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Registration successful!");
            navigate("/");
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"} min-h-screen transition-colors duration-500`}>
      <Header />

      <div className="flex justify-center min-h-screen items-center">
        <div className={`card w-full max-w-sm shrink-0 shadow-2xl py-5 transition-colors duration-500
          ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <h2 className={`font-semibold text-2xl text-center mb-4 ${theme === "dark" ? "text-cyan-400" : "text-cyan-700"}`}>
            SignUp your account
          </h2>

          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset space-y-3">
              {/* Name */}
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className={`input ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : ""}`}
                placeholder="Your Name"
                required
              />
              {nameError && <p className="text-xs text-error">{nameError}</p>}

              {/* Photo */}
              <label className="label">Photo URL</label>
              <input
                name="photo"
                type="text"
                className={`input ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : ""}`}
                placeholder="Photo URL"
                required
              />

              {/* Email */}
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className={`input ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : ""}`}
                placeholder="Email"
                required
              />

              {/* Password */}
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className={`input ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : ""}`}
                placeholder="Password"
                required
              />

              <button type="submit" className="btn btn-neutral mt-4 w-full">
                SignUp
              </button>

              <div className={`divider ${theme === "dark" ? "before:bg-gray-600 after:bg-gray-600" : ""}`}>or</div>

              <button
                onClick={handleGoogleSignIn}
                type="button"
                className={`btn btn-outline w-full flex items-center justify-center gap-2 ${theme === "dark" ? "text-gray-200 border-gray-600 hover:border-gray-400" : ""}`}
              >
                <img src="/google-icon.png" alt="" className="w-5 h-5" />
                Continue with Google
              </button>

              <p className="font-semibold text-center py-3">
                Already Have An Account ?
                <Link className="text-pink-700" to="/login"> Login</Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
