import React, { useState } from "react";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}
const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  autoComplete
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === "password";
  const handleFocus = () => {
    setIsFocused(true);
    window.dispatchEvent(new CustomEvent("inputFocus", {
      detail: name
    }));
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input type={isPassword ? showPassword ? "text" : "password" : type} id={name} name={name} value={value} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur} placeholder={placeholder} autoComplete={autoComplete} className={`
            w-full px-4 py-2.5 
            ${isFocused ? "bg-gray-900/70" : "bg-gray-900/50"}
            border ${error && !isFocused ? "border-red-500/50" : isFocused ? "border-purple-500/70" : "border-gray-700/50"}
            text-gray-100 
            placeholder-gray-500
            rounded-lg 
            shadow-sm 
            backdrop-blur-sm
            focus:outline-none 
            focus:ring-2 
            focus:ring-purple-500/30 
            focus:border-purple-500/70
            transition-all 
            duration-300
            ${isFocused ? "shadow-[0_0_15px_rgba(139,92,246,0.1)]" : ""}
          `} />
        {isPassword && <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors">
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>}
      </div>
      <AnimatePresence>
        {error && !isFocused && <motion.p initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -10
      }} transition={{
        duration: 0.2
      }} className="mt-1.5 text-sm text-red-400/90">
            {error}
          </motion.p>}
      </AnimatePresence>
    </div>;
};
export default FormInput;