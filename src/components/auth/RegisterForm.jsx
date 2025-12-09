// src/components/auth/RegisterForm.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Briefcase,
  AlertCircle,
  Check,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  validateRegistrationForm,
  validatePassword,
} from "../../utils/validation";
import { USER_ROLES } from "../../data/constants";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: USER_ROLES.BUYER,
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setServerError("");

    // Check password strength
    if (name === "password") {
      const strength = validatePassword(value);
      setPasswordStrength(strength);
    }
  };

  // Move to next step
  const handleNextStep = () => {
    // Validate current step
    const stepErrors = {};

    if (step === 1) {
      if (!formData.firstName) stepErrors.firstName = "First name is required";
      if (!formData.lastName) stepErrors.lastName = "Last name is required";
      if (!formData.email) stepErrors.email = "Email is required";
      if (!formData.phone) stepErrors.phone = "Phone is required";
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setStep(2);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validation = validateRegistrationForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (!formData.acceptTerms) {
      setErrors({ acceptTerms: "You must accept the terms and conditions" });
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      });

      if (result.success) {
        // Redirect after successful registration
        navigate("/dashboard");
      } else {
        setServerError(
          result.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get password strength color
  const getStrengthColor = () => {
    if (!passwordStrength) return "";

    switch (passwordStrength.strength) {
      case "weak":
        return "bg-red-500";
      case "fair":
        return "bg-orange-500";
      case "good":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      case "very strong":
        return "bg-green-600";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h1>
        <p className="text-gray-600">Join Estate PRO and start your journey</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {step > 1 ? <Check size={20} /> : "1"}
          </div>
          <span
            className={`text-sm font-semibold ${
              step >= 1 ? "text-blue-600" : "text-gray-600"
            }`}
          >
            Basic Info
          </span>
        </div>

        <div
          className={`w-16 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
        ></div>

        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
          <span
            className={`text-sm font-semibold ${
              step >= 2 ? "text-blue-600" : "text-gray-600"
            }`}
          >
            Security
          </span>
        </div>
      </div>

      {/* Server Error */}
      {serverError && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 font-medium">{serverError}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-5 animate-in slide-in-from-right duration-300">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Smith"
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={20} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    value: USER_ROLES.BUYER,
                    label: "Buyer",
                    icon: "🏠",
                    desc: "Looking to buy",
                  },
                  {
                    value: USER_ROLES.SELLER,
                    label: "Seller",
                    icon: "💼",
                    desc: "Selling property",
                  },
                  {
                    value: USER_ROLES.AGENT,
                    label: "Agent",
                    icon: "👔",
                    desc: "Real estate agent",
                  },
                  {
                    value: USER_ROLES.DEVELOPER,
                    label: "Developer",
                    icon: "🏗️",
                    desc: "Property developer",
                  },
                ].map((role) => (
                  <label
                    key={role.value}
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.role === role.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-2xl">{role.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {role.label}
                      </div>
                      <div className="text-xs text-gray-600">{role.desc}</div>
                    </div>
                    {formData.role === role.value && (
                      <Check size={20} className="text-blue-600" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Security */}
        {step === 2 && (
          <div className="space-y-5 animate-in slide-in-from-right duration-300">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {passwordStrength && formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i <= (passwordStrength.score || 0)
                            ? getStrengthColor()
                            : "bg-gray-200"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p
                    className={`text-xs font-semibold ${
                      passwordStrength.strength === "weak"
                        ? "text-red-600"
                        : passwordStrength.strength === "fair"
                        ? "text-orange-600"
                        : passwordStrength.strength === "good"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    Password strength: {passwordStrength.strength}
                  </p>
                </div>
              )}

              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className={`mt-1 w-5 h-5 text-blue-600 border-2 rounded focus:ring-blue-500 ${
                    errors.acceptTerms ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <span className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.acceptTerms}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isLoading}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Sign in instead
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
