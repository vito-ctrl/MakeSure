import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { Mail } from 'lucide-react';
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  
  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const userData = {
        ...data,
        role: data.email.includes("admin") ? "admin" : "user"
      };
      
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      
      const result = await res.json();
      if (res.ok) {
        // Store token and redirect to login
        localStorage.setItem("authToken", result.token);
        alert("Registration successful!");
        navigate('/login');
      } else {
        setRegisterError(result.message || "Registration failed. Please try again.");
        console.error('Request error:', result);
      }
    } catch (error) {
      setRegisterError("An error occurred. Please try again.");
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 border border-green-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative w-full max-w-md">
        <h2 className="text-3xl text-white font-bold text-center mb-6">📝 Register</h2>
        
        {registerError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {registerError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative my-4">
            <input
              type="text"
              id="user"
              {...register("user", { required: "Username is required" })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
            />
            <label htmlFor="username" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Name
            </label>
            <BiUser className="absolute top-4 right-4 text-white" />
            {errors.user && <p className="text-red-500 text-sm">{errors.user.message}</p>}
          </div>

          <div className="relative my-4">
            <input
              type="number"
              id="phone"
              {...register("phone", { required: "Phone number is required" })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
            />
            <label htmlFor="phone" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone
            </label>
            <BiUser className="absolute top-4 right-4 text-white" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div className="relative my-4">
            <input
              type="email"
              id="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address"
                }
              })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
            />
            <label htmlFor="email" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email
            </label>
            <Mail className="absolute w-4 top-4 right-4 text-gray-200" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <p className="text-xs text-gray-400 mt-1">Hint: Include "admin" in email for admin access (for demo purposes)</p>
          </div>

          <div className="relative my-4">
            <input
              type="password"
              id="password"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                validate: {
                  hasUpperCase: value => 
                    /[A-Z]/.test(value) || 
                    "Password must contain at least one uppercase letter",
                  hasLowerCase: value => 
                    /[a-z]/.test(value) || 
                    "Password must contain at least one lowercase letter",
                  hasNumber: value => 
                    /[0-9]/.test(value) || 
                    "Password must contain at least one number",
                  hasSpecialChar: value => 
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) || 
                    "Password must contain at least one special character"
                }
              })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
            />
            <label htmlFor="password" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
            <AiOutlineLock className="absolute top-4 right-4 text-white" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="relative my-4">
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", { 
                required: "Password confirmation is required",
                validate: value => 
                  value === password || "Passwords do not match"
              })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-green-500 peer"
            />
            <label htmlFor="confirmPassword" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirm Password
            </label>
            <AiOutlineLock className="absolute top-4 right-4 text-white" />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full mt-6 mb-4 rounded-full bg-green-600 text-white hover:bg-green-700 py-2 transition-colors duration-300"
          >
            Register
          </button>

          <div className="text-center text-white text-sm">
            <span>Already have an account? </span>
            <Link className="text-green-500" to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
};

export default RegisterPage;