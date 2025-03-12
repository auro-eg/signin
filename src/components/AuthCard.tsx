import React from "react";
import { motion } from "framer-motion";
interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}
const AuthCard = ({
  children,
  title
}: AuthCardProps) => {
  return <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className={`
          w-full max-w-md 
          bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-black/80 
          backdrop-blur-xl 
          rounded-2xl 
          shadow-[0_0_30px_rgba(139,92,246,0.1)] 
          border border-purple-500/10 
          p-8 
          space-y-6
        `}>
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <div className="text-gray-200">{children}</div>
      </motion.div>
    </div>;
};
export default AuthCard;