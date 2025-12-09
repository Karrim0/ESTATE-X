// src/utils/validation.js

import { VALIDATION } from "../data/constants";

// ==================== EMAIL VALIDATION ====================

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {Object} Validation result
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Invalid email format" };
  }

  return { isValid: true };
};

// ==================== PASSWORD VALIDATION ====================

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {Object} Validation result with strength
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      error: "Password is required",
      strength: "none",
    };
  }

  if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`,
      strength: "weak",
    };
  }

  if (password.length > VALIDATION.MAX_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: `Password must be less than ${VALIDATION.MAX_PASSWORD_LENGTH} characters`,
      strength: "weak",
    };
  }

  // Calculate strength
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  const strengthLevels = [
    "weak",
    "weak",
    "fair",
    "good",
    "strong",
    "very strong",
  ];
  const strengthLabel = strengthLevels[Math.min(strength, 5)];

  return {
    isValid: true,
    strength: strengthLabel,
    score: strength,
  };
};

/**
 * Validate password confirmation
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirm password
 * @returns {Object} Validation result
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, error: "Please confirm your password" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }

  return { isValid: true };
};

// ==================== USERNAME VALIDATION ====================

/**
 * Validate username
 * @param {string} username - Username
 * @returns {Object} Validation result
 */
export const validateUsername = (username) => {
  if (!username) {
    return { isValid: false, error: "Username is required" };
  }

  if (username.length < VALIDATION.MIN_USERNAME_LENGTH) {
    return {
      isValid: false,
      error: `Username must be at least ${VALIDATION.MIN_USERNAME_LENGTH} characters`,
    };
  }

  if (username.length > VALIDATION.MAX_USERNAME_LENGTH) {
    return {
      isValid: false,
      error: `Username must be less than ${VALIDATION.MAX_USERNAME_LENGTH} characters`,
    };
  }

  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      error:
        "Username can only contain letters, numbers, hyphens, and underscores",
    };
  }

  return { isValid: true };
};

// ==================== PHONE VALIDATION ====================

/**
 * Validate phone number
 * @param {string} phone - Phone number
 * @returns {Object} Validation result
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, error: "Phone number is required" };
  }

  // Remove spaces, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");

  // Check if it starts with + and has 10-15 digits
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;

  if (!phoneRegex.test(cleaned)) {
    return {
      isValid: false,
      error: "Invalid phone number format",
    };
  }

  return { isValid: true, formatted: cleaned };
};

// ==================== NAME VALIDATION ====================

/**
 * Validate name
 * @param {string} name - Name
 * @param {string} field - Field name for error message
 * @returns {Object} Validation result
 */
export const validateName = (name, field = "Name") => {
  if (!name) {
    return { isValid: false, error: `${field} is required` };
  }

  if (name.length < 2) {
    return { isValid: false, error: `${field} must be at least 2 characters` };
  }

  if (name.length > 50) {
    return {
      isValid: false,
      error: `${field} must be less than 50 characters`,
    };
  }

  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name)) {
    return {
      isValid: false,
      error: `${field} can only contain letters, spaces, hyphens, and apostrophes`,
    };
  }

  return { isValid: true };
};

// ==================== PRICE VALIDATION ====================

/**
 * Validate price
 * @param {number|string} price - Price
 * @returns {Object} Validation result
 */
export const validatePrice = (price) => {
  if (!price && price !== 0) {
    return { isValid: false, error: "Price is required" };
  }

  const numPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numPrice)) {
    return { isValid: false, error: "Price must be a number" };
  }

  if (numPrice < 0) {
    return { isValid: false, error: "Price cannot be negative" };
  }

  if (numPrice > 1000000000) {
    return { isValid: false, error: "Price is too high" };
  }

  return { isValid: true, value: numPrice };
};

// ==================== URL VALIDATION ====================

/**
 * Validate URL
 * @param {string} url - URL
 * @returns {Object} Validation result
 */
export const validateUrl = (url) => {
  if (!url) {
    return { isValid: false, error: "URL is required" };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: "Invalid URL format" };
  }
};

// ==================== FILE VALIDATION ====================

/**
 * Validate image file
 * @param {File} file - File object
 * @returns {Object} Validation result
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { isValid: false, error: "No file selected" };
  }

  if (!VALIDATION.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid file type. Please upload JPEG, PNG, or WebP images",
    };
  }

  if (file.size > VALIDATION.MAX_IMAGE_SIZE) {
    return {
      isValid: false,
      error: `File size must be less than ${
        VALIDATION.MAX_IMAGE_SIZE / (1024 * 1024)
      }MB`,
    };
  }

  return { isValid: true };
};

/**
 * Validate document file
 * @param {File} file - File object
 * @returns {Object} Validation result
 */
export const validateDocumentFile = (file) => {
  if (!file) {
    return { isValid: false, error: "No file selected" };
  }

  if (!VALIDATION.ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid file type. Please upload PDF or Word documents",
    };
  }

  if (file.size > VALIDATION.MAX_DOCUMENT_SIZE) {
    return {
      isValid: false,
      error: `File size must be less than ${
        VALIDATION.MAX_DOCUMENT_SIZE / (1024 * 1024)
      }MB`,
    };
  }

  return { isValid: true };
};

// ==================== FORM VALIDATION ====================

/**
 * Validate registration form
 * @param {Object} formData - Form data
 * @returns {Object} Validation result with errors
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};

  // First Name
  const firstNameValidation = validateName(formData.firstName, "First name");
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.error;
  }

  // Last Name
  const lastNameValidation = validateName(formData.lastName, "Last name");
  if (!lastNameValidation.isValid) {
    errors.lastName = lastNameValidation.error;
  }

  // Email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  // Password
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  // Confirm Password
  const confirmPasswordValidation = validatePasswordConfirmation(
    formData.password,
    formData.confirmPassword
  );
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.error;
  }

  // Phone
  if (formData.phone) {
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate login form
 * @param {Object} formData - Form data
 * @returns {Object} Validation result with errors
 */
export const validateLoginForm = (formData) => {
  const errors = {};

  // Email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  // Password
  if (!formData.password) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate property form
 * @param {Object} formData - Form data
 * @returns {Object} Validation result with errors
 */
export const validatePropertyForm = (formData) => {
  const errors = {};

  // Title
  if (!formData.title || formData.title.length < 10) {
    errors.title = "Title must be at least 10 characters";
  }

  // Price
  const priceValidation = validatePrice(formData.price);
  if (!priceValidation.isValid) {
    errors.price = priceValidation.error;
  }

  // Beds
  if (!formData.beds || formData.beds < 0) {
    errors.beds = "Please specify number of bedrooms";
  }

  // Baths
  if (!formData.baths || formData.baths < 0) {
    errors.baths = "Please specify number of bathrooms";
  }

  // Square feet
  if (!formData.sqft || formData.sqft < 100) {
    errors.sqft = "Square feet must be at least 100";
  }

  // Location
  if (!formData.location) {
    errors.location = "Location is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateUsername,
  validatePhone,
  validateName,
  validatePrice,
  validateUrl,
  validateImageFile,
  validateDocumentFile,
  validateRegistrationForm,
  validateLoginForm,
  validatePropertyForm,
};
