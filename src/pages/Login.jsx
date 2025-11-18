import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';

const Login = () => {
   
      const handleGoogleSignIn = () => {
  googleSignIn()
    .then((result) => {
     setUser(result.user);

      toast.success("Logged in with Google!");
      navigate("/");
    })
    .catch((err) => toast.error(err.message));
};


    const [error, setError]= useState("");
   const {signIn, googleSignIn, setUser}= use(AuthContext);
   const location = useLocation();
   const navigate = useNavigate();
   //console.log(location)
    const handleLogin =(e)=>{
     e.preventDefault();
     const form = e.target;
     const email= form.email.value;
     const password= form.password.value;
     //console.log({email, password});

     signIn(email, password)
     .then(result=>{
        const user =result.user;
        //console.log(user);
        navigate(`${location.state? location.state : "/"}`)

     })
     .catch((error) => {
    const errorCode = error.code;
    // const errorMessage = error.message;
    // alert(errorCode, errorMessage);
    setError(errorCode);
  });

    };
    return (
        <div>
            <Header></Header>
            <div className='flex justify-center min-h-screen items-center'>
            
             <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-2xl text-center text-cyan-700'>Login your account</h2>

      <form onSubmit={handleLogin} className="card-body">
        <fieldset className="fieldset">
            {/* email */}
          <label className="label">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" required/>

          {/* password */}
          <label className="label">Password</label>
          <input name='password' type="password" className="input" placeholder="Password" required/>

          <div><a className="link link-hover">Forgot password?</a></div>

          {error && <p className='text-red-500 text-xs'>{error}</p>}

          <button type='submit' className="btn btn-neutral mt-4">Login</button>
          
          <div className="divider">or</div>
<button
  onClick={handleGoogleSignIn}
  type="button"
  className="btn btn-outline w-full"
>
  <img src="/google-icon.png" alt="" className="w-5 h-5 mr-2" />
  Continue with Google
</button>

          <p className='font-semibold text-center py-3'>Don't Have An Account ?<Link className='text-pink-700' to="/signup"> SignUp</Link></p>
        </fieldset>
      </form>
    </div>
        </div>
        </div>
    );
};

export default Login;