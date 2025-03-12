import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { validateEmail } from "../utils/validation";
import { MailIcon } from "lucide-react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  // reset pass using email to the backend [fucn name: handleSubmit ]
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("reset email: ", email);
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }
    setIsSubmitting(true);
    try{
      const response = await axios.post('/api/v1/reset-password', { email: email })
      console.log(response.data);
      setIsSubmitted(false);
    }catch(error: unknown){
      setIsSubmitted(false);
      setIsSubmitting(true);
      setEmailError((error as any)?.response?.data?.message || "Something went wrong");
    }
  };

  return <AuthCard title="Reset Password">
      <AnimatePresence mode="wait">
        {!isSubmitted ? <motion.div key="form" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }}>
            <p className="text-gray-400 text-sm mb-6">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit}>
              <FormInput label="Email" type="email" name="email" value={email} onChange={handleEmailChange} error={emailError} placeholder="your.email@example.com" autoComplete="email" />
              <div className="mt-6">
                <Button type="submit" fullWidth isLoading={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </div>
            </form>
          </motion.div> : <motion.div key="success" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-500/10 mb-4 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <MailIcon className="h-6 w-6 text-purple-400" />
            </div>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }}>
              <h3 className="text-lg font-medium bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-3">
                Check your email
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                If this email is registered with us, a reset link will be sent.
              </p>
              <p className="text-sm text-gray-500">
                Please check your inbox and spam folder.
              </p>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          <Link to="/signin" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Back to Sign in
          </Link>
        </p>
      </div>
    </AuthCard>;
};
export default ForgotPassword;