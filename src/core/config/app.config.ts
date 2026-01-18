/**
 * Application Configuration
 * 
 * This file manages configuration settings for the application.
 * Environment variables can be set in .env file or through Vite's import.meta.env
 */

// Feature flags and configuration
export const appConfig = {
  // Use mock data instead of API calls
  // Set to true to use mock data, false to use real API
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true' || import.meta.env.VITE_USE_MOCK_DATA === '1',
  
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/v1',
  
  // Feature flags
  enableDebugMode: import.meta.env.VITE_DEBUG === 'true' || import.meta.env.DEV,

  
} as const;

// Helper function to check if mock data should be used for a specific feature
export const shouldUseMockData = (): boolean => {
  return appConfig.useMockData;
};
