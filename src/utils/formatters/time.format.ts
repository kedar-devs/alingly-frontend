import { formatDistanceToNow } from "date-fns"
// Helper function to format relative time
export const formatRelativeTime = (timestamp: string|Date): string => {
    return formatDistanceToNow(new Date(timestamp),{
      addSuffix:true
    })
  };
  