import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import StepIndicator from "../components/StepIndicator";
import { validateEmail, validatePassword, validateConfirmPassword, validateName, validatePhone, validateOTP } from "../utils/validation";
import { ChevronRightIcon, ArrowLeftIcon } from "lucide-react";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  otp: string;
}
const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState<FormData>({
    firstName: "sd",
    lastName: "sd",
    email: "asa@df.com",
    phone: "2323232323233",
    password: "Aa12345678#",
    confirmPassword: "Aa12345678#"
  });
  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === "firstName") {
      setErrors({
        ...errors,
        firstName: validateName(value, "First name")
      });
    } else if (name === "lastName") {
      setErrors({
        ...errors,
        lastName: validateName(value, "Last name")
      });
    } else if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value)
      });
    } else if (name === "phone") {
      setErrors({
        ...errors,
        phone: validatePhone(value)
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value),
        confirmPassword: formData.confirmPassword ? validateConfirmPassword(value, formData.confirmPassword) : ""
      });
    } else if (name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPassword: validateConfirmPassword(formData.password, value)
      });
    }
  };
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      value
    } = e.target;
    setOtp(value);
    setErrors({ ...errors, otp: validateOTP(value),});
  };
  const validateStep = (currentStep: number): boolean => {
    let isValid = true;
    const newErrors = {
      ...errors
    };
    if (currentStep === 1) {
      const firstNameError = validateName(formData.firstName, "First name");
      const lastNameError = validateName(formData.lastName, "Last name");
      if (firstNameError) {
        newErrors.firstName = firstNameError;
        isValid = false;
      }
      if (lastNameError) {
        newErrors.lastName = lastNameError;
        isValid = false;
      }
    } else if (currentStep === 2) {
      const emailError = validateEmail(formData.email);
      const phoneError = validatePhone(formData.phone);
      if (emailError) {
        newErrors.email = emailError;
        isValid = false;
      }
      if (phoneError) {
        newErrors.phone = phoneError;
        isValid = false;
      }
    } else if (currentStep === 3) {
      const passwordError = validatePassword(formData.password);
      const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
      if (passwordError) {
        newErrors.password = passwordError;
        isValid = false;
      }
      if (confirmPasswordError) {
        newErrors.confirmPassword = confirmPasswordError;
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  // Send signup form to the backend [fucn name: sendSignUp ]
  const sendSignUp = async () => {
    try {
      // Check email existence
      const emailResponse = await axios.post('/api/v1/check-email-existence', { email: formData.email });
      console.log(emailResponse.data);
      
      // Proceed with signup
      const signupResponse = await axios.post('/api/v1/signup', formData);
      console.log(signupResponse.data);
    } catch (error: unknown) {
      console.error("Error:", (error as any)?.response?.data?.message || error);
    }
  };
  
  // Send signup form to the backend [fucn name: verifyOTP ]
  const verifyOTP = async () => {
    console.log("Your OTP:", otp);
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/v1/verifyOTP', { otp });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      setIsSubmitting(false);
      setErrors({ ...errors, otp: error?.response?.data?.message || "An error occurred" });
      throw error;
    }
  };

  
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      if(step === 3){
        console.log(formData);
        sendSignUp();
      }
    }
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 4) {
      if (!otp) {
        setErrors({ ...errors, otp: "Please enter the verification code"});
        return;
      }
      setIsSubmitting(true);
      setTimeout(async () => {
        await verifyOTP();
        navigate("/signin");
      }, 1500);
    } else if (validateStep(step)) {
      nextStep();
    }
  };


  return <AuthCard title="Create an Account">
      <div className="relative mb-8">
        <StepIndicator currentStep={step} totalSteps={4} />
      </div>
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && <motion.div key="step1" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} transition={{
          duration: 0.3
        }}>
              <FormInput label="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} placeholder="John" autoComplete="given-name" />
              <FormInput label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} placeholder="Doe" autoComplete="family-name" />
            </motion.div>}
          {step === 2 && <motion.div key="step2" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} transition={{
          duration: 0.3
        }}>
              <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="john.doe@example.com" autoComplete="email" />
              <FormInput label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="(123) 456-7890" autoComplete="tel" />
            </motion.div>}
          {step === 3 && <motion.div key="step3" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} transition={{
          duration: 0.3
        }}>
              <FormInput label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} placeholder="••••••••" autoComplete="new-password" />
              <FormInput label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="••••••••" autoComplete="new-password" />
              <div className="text-xs text-gray-500 mt-2">
                Password must contain at least 8 characters, including
                uppercase, lowercase, number and special character.
              </div>
            </motion.div>}
          {step === 4 && <motion.div key="step4" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} transition={{
          duration: 0.3
        }}>
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-2">
                  We've sent a verification code to
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {formData.email}
                </p>
              </div>
              <FormInput label="Verification Code" type="text" name="otp" value={otp} onChange={handleOtpChange} error={errors.otp} placeholder="Enter 6-digit code" autoComplete="off" />
            </motion.div>}
        </AnimatePresence>
        <div className="mt-6 flex justify-between">
          {step > 1 && <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </Button>}
          <div className={step === 1 ? "ml-auto" : ""}>
            <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
              {step < 4 ? <>
                  Next
                  <ChevronRightIcon className="w-4 h-4 ml-2" />
                </> : isSubmitting ? "Verifying..." : "Complete Sign Up"}
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </AuthCard>;
};
export default SignUp;