import { BrowserRouter, HashRouter , Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import AnimatedBackground from "./components/AnimatedBackground";
export function App() {
  return <HashRouter>
      <div className="relative w-full min-h-screen bg-black">
        <AnimatedBackground />
        <div className="relative z-10 w-full min-h-screen">
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        </div>
      </div>
    </HashRouter>;
}