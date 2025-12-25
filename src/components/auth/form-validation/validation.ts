// Validation rule types
export type ValidationRule = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
  
  export type ValidationRules = {
    [key: string]: ValidationRule;
  };
  
  export type ValidationErrors = {
    [key: string]: string;
  };
  
  // Common validation patterns
  export const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/, // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    name: /^[a-zA-Z\s]{2,}$/, // At least 2 characters, letters and spaces only
  };
  
  // Default validation rules
  export const defaultRules: ValidationRules = {
    logo: {
      required: false,
    },
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: patterns.name,
      custom: (value: string) => {
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        return null;
      },
    },
    
    email: {
      required: true,
      pattern: patterns.email,
      custom: (value: string) => {
        if (!patterns.email.test(value)) {
          return 'Please enter a valid email address';
        }
        return null;
      },
    },
    password: {
      required: true,
      minLength: 8,
      pattern: patterns.password,
      custom: (value: string) => {
        if (value.length < 8) {
          return 'Password must be at least 8 characters';
        }
        if (!/(?=.*[a-z])/.test(value)) {
          return 'Password must contain at least one lowercase letter';
        }
        if (!/(?=.*[A-Z])/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/(?=.*\d)/.test(value)) {
          return 'Password must contain at least one number';
        }
        return null;
      },
    },
  };
  
  // Validate a single field
  export const validateField = (
    fieldName: string,
    value: string,
    rules: ValidationRule
  ): string | null => {
    // Check required
    if (rules.required && (!value || value.trim() === '')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
  
    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') {
      return null;
    }
  
    // Check minLength
    if (rules.minLength && value.length < rules.minLength) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rules.minLength} characters`;
    }
  
    // Check maxLength
    if (rules.maxLength && value.length > rules.maxLength) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be no more than ${rules.maxLength} characters`;
    }
  
    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
      // Pattern validation error will be handled by custom validator if provided
    }
  
    // Check custom validator
    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        return customError;
      }
    }
  
    return null;
  };
  
  // Validate entire form
  export const validateForm = (
    formData: { [key: string]: string },
    rules: ValidationRules
  ): ValidationErrors => {
    const errors: ValidationErrors = {};
  
    Object.keys(rules).forEach((fieldName) => {
      const fieldValue = formData[fieldName] || '';
      const fieldRules = rules[fieldName];
      const error = validateField(fieldName, fieldValue, fieldRules);
      
      if (error) {
        errors[fieldName] = error;
      }
    });
  
    return errors;
  };
  
  // Check if form is valid
  export const isFormValid = (errors: ValidationErrors): boolean => {
    return Object.keys(errors).length === 0;
  };
  
  // Create validation rules for specific forms
  export const createValidationRules = (fields: string[]): ValidationRules => {
    const rules: ValidationRules = {};
    
    fields.forEach((field) => {
      if (defaultRules[field]) {
        rules[field] = defaultRules[field];
      }
    });
    
    return rules;
  };
  
  // Pre-configured validation rules for common forms
  export const formValidationRules = {
    login: createValidationRules(['email', 'password']),
    register: createValidationRules(['name', 'email', 'password']),
    createOrganization: createValidationRules(['name', 'logo']),
  };
  