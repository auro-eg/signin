import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { validateEmail } from "../utils/validation";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleInputFocus = () => {
      setErrors({
        email: "",
        password: "",
        form: ""
      });
    };
    window.addEventListener("inputFocus", handleInputFocus);
    return () => window.removeEventListener("inputFocus", handleInputFocus);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    if (name in errors) {
      setErrors({
        ...errors,
        [name]: "",
        form: ""
      });
    }
  };

  // Send signin form to the backend [fucn name: handleSubmit ]
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = formData.password ? "" : "Password is required";
    
    if (emailError || passwordError) {
      setErrors({
        ...errors,
        email: emailError,
        password: passwordError
      });
      return;
    }
    
    setIsSubmitting(true);
    console.log(formData);

    try {
      const response = await axios.post('/api/v1/signin', formData);
      console.log(response.data);
      setErrors({ email: "", password: "", form: "" });
      navigate("/");      
    } catch (error: any) {
      setIsSubmitting(false);
      setErrors(prevErrors => ({
        ...prevErrors,
        form: error?.response?.data?.message || "Something went wrong"
      }));
    }
  };

  return (
    <AuthCard title="Welcome Back">
      <form onSubmit={handleSubmit}>
        {errors.form && <ErrorMessage message={errors.form} className="mb-6" />}
        <FormInput 
          label="Email" 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          error={errors.email} 
          placeholder="your.email@example.com" 
          autoComplete="email" 
        />
        <FormInput 
          label="Password" 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          error={errors.password} 
          placeholder="••••••••" 
          autoComplete="current-password" 
        />
        <div className="flex items-center justify-between mt-6 mb-6">
          <div className="flex items-center">
            <input 
              id="rememberMe" 
              name="rememberMe" 
              type="checkbox" 
              checked={formData.rememberMe} 
              onChange={handleChange} 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default SignIn;
