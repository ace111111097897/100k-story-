"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Sparkles, Zap, Shield, User, Mail, Lock } from "lucide-react";

export function SignUpForm() {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setSubmitting(true);
    const formDataObj = new FormData();
    formDataObj.set("email", formData.email);
    formDataObj.set("password", formData.password);
    formDataObj.set("flow", "signUp");
    
    try {
      await signIn("password", formDataObj);
    } catch (error: any) {
      let toastTitle = "";
      if (error.message.includes("Invalid password")) {
        toastTitle = "Invalid password. Please try again.";
      } else {
        toastTitle = "Could not sign up. Please try again.";
      }
      toast.error(toastTitle);
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Floating background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/4 -right-10 w-20 h-20 bg-gradient-to-br from-green-400/15 to-emerald-500/15 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-orange-400/15 to-red-500/15 rounded-full blur-2xl"
        />
      </div>

             {/* Main floating card */}
       <motion.div
         initial={{ opacity: 0, y: 50, scale: 0.9 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         transition={{ duration: 0.6, ease: "easeOut" }}
         className="relative floating"
       >
         {/* Glowing border effect */}
         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-xl pulse-glow" />
        
                  <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl glow-effect">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mr-3"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Join the Future
              </h2>
            </div>
            <p className="text-white/70 text-sm">
              Create your account and unlock unlimited possibilities
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Email field */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password field */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2" />
                {submitting ? "Creating Account..." : "Create Account"}
              </div>
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-white/60 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                onClick={() => {
                  // Handle navigation to sign in
                  toast.info("Sign in functionality would be implemented here");
                }}
              >
                Sign in
              </button>
            </p>
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{
                x: [0, 60, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4
              }}
              className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
              className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-60"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
} 