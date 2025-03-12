export const validateEmail = (email: string): string => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};
export const validatePassword = (password: string): string => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  if (!hasUpperCase) return "Password must contain at least one uppercase letter";
  if (!hasLowerCase) return "Password must contain at least one lowercase letter";
  if (!hasNumber) return "Password must contain at least one number";
  if (!hasSpecialChar) return "Password must contain at least one special character";
  return "";
};
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
};
export const validateName = (name: string, fieldName: string): string => {
  if (!name) return `${fieldName} is required`;
  if (name.length < 2) return `${fieldName} must be at least 2 characters`;
  return "";
};
export const validatePhone = (phone: string): string => {
  if (!phone) return "Phone number is required";
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneRegex.test(phone.replace(/[^0-9]/g, ""))) {
    return "Please enter a valid phone number";
  }
  return "";
};
export const validateOTP = (otp: string): string => {
  if (!otp) return "OTP is required";
  if (otp.length !== 6) return "OTP must be 6 digits";
  if (!/^\d+$/.test(otp)) return "OTP must contain only digits";
  return "";
};