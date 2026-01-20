// Helper function to format numbers with commas
export const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };
  
  // Helper function to format percentage change
  export const formatPercentageChange = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(0)}%`;
  };
  
  // Helper function to calculate circular progress
  export const calculateCircularProgress = (percentage: number): { dashArray: number; dashOffset: number } => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const dashArray = circumference;
    const dashOffset = circumference - (percentage / 100) * circumference;
    return { dashArray, dashOffset };
  };