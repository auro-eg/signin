import { Fragment } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}
const StepIndicator = ({
  currentStep,
  totalSteps
}: StepIndicatorProps) => {
  return <div className="relative mb-8">
      <div className="flex justify-between items-center">
        {[...Array(totalSteps)].map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        return <Fragment key={stepNumber}>
              {index > 0 && <div className="flex-1 h-0.5 bg-gray-700">
                  <motion.div className="h-full bg-purple-500" initial={{
              width: "0%"
            }} animate={{
              width: isCompleted ? "100%" : "0%"
            }} transition={{
              duration: 0.5,
              ease: "easeInOut"
            }} />
                </div>}
              <div className="relative">
                <motion.div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${isCompleted ? "bg-purple-500 text-white" : isCurrent ? "bg-purple-100 text-purple-500 border-2 border-purple-500" : "bg-gray-700 text-gray-400"}`} initial={false} animate={{
              scale: isCurrent ? 1.1 : 1,
              transition: {
                duration: 0.3,
                ease: "easeInOut"
              }
            }}>
                  <motion.div initial={false} animate={{
                opacity: isCompleted ? 1 : 0,
                scale: isCompleted ? 1 : 0
              }} transition={{
                duration: 0.2
              }}>
                    {isCompleted ? <CheckIcon className="h-4 w-4" /> : null}
                  </motion.div>
                  <motion.div initial={false} animate={{
                opacity: !isCompleted ? 1 : 0,
                scale: !isCompleted ? 1 : 0
              }} transition={{
                duration: 0.2
              }}>
                    {!isCompleted ? stepNumber : null}
                  </motion.div>
                </motion.div>
              </div>
            </Fragment>;
      })}
      </div>
    </div>;
};
export default StepIndicator;