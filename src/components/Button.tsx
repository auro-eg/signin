import React from "react";
import { motion } from "framer-motion";
interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  isLoading?: boolean;
}
const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  fullWidth = false,
  isLoading = false
}: ButtonProps) => {
  const baseClasses = "px-4 py-2.5 rounded-lg font-medium focus:outline-none transition-all duration-200 ease-in-out text-sm backdrop-blur-sm";
  const variantClasses = {
    primary: "bg-purple-500/90 text-white hover:bg-purple-600/90 active:bg-purple-700/90 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]",
    secondary: "bg-gray-800/80 text-gray-200 hover:bg-gray-700/80 active:bg-gray-600/80",
    outline: "bg-transparent text-purple-400 border border-purple-500/50 hover:bg-purple-500/10 active:bg-purple-500/20"
  };
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  return <motion.button type={type} onClick={onClick} disabled={disabled || isLoading} className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass} flex items-center justify-center`} whileTap={{
    scale: disabled ? 1 : 0.98
  }}>
      {isLoading ? <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> : null}
      {children}
    </motion.button>;
};
export default Button;