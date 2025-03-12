import { motion } from "framer-motion";
interface ErrorMessageProps {
  message: string;
  className?: string;
}
const ErrorMessage = ({
  message,
  className = ""
}: ErrorMessageProps) => {
  return <motion.div initial={{
    opacity: 0,
    y: -10
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -10
  }} className={`
        p-4 
        rounded-lg 
        bg-red-500/10
        backdrop-blur-sm 
        border border-red-500/20
        shadow-[0_0_15px_rgba(239,68,68,0.1)]
        ${className}
      `}>
      <p className="text-sm text-red-400/90">{message}</p>
    </motion.div>;
};
export default ErrorMessage;