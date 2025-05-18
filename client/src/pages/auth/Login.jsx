import { useForm } from "react-hook-form";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (res.ok) {
        // Store token and user info
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userRole", result.user.role);
        localStorage.setItem("userData", JSON.stringify(result.user));
        
        // Redirect based on user role
        if (result.user.role === "admin") {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        setLoginError(result.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      setLoginError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 border border-green-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Login</h1>

        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="relative my-4">
            <input
              type="email"
              id="login-email"
              {...register("email", { required: "Email is required" })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
              placeholder=" "
            />
            <label htmlFor="login-email" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Your Email
            </label>
            <BiUser className="absolute top-4 right-4 text-white" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="relative my-4">
            <input
              type="password"
              id="login-password"
              {...register("password", { required: "Password is required" })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
              placeholder=" "
            />
            <label htmlFor="login-password" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Your Password
            </label>
            <AiOutlineLock className="absolute top-4 right-4 text-white" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button 
            className="w-full mt-6 mb-4 rounded-full bg-green-600 text-white hover:bg-green-700 py-2 transition-colors duration-300" 
            type="submit"
          >
            Login
          </button>
          
          {/* Link to Register Page */}
          <div className="text-center">
            <span className="text-white text-sm">New here? <Link className="text-green-500" to="/register">Create an Account</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;