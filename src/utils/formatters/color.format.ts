
// Helper function to get status color
export const getStatusColor = (status: 'Aligned' | 'Needs Attention' | 'At Risk'): string => {
    switch (status) {
      case 'Aligned':
        return 'bg-status-green/10 text-status-green';
      case 'Needs Attention':
        return 'bg-status-amber/10 text-status-amber';
      case 'At Risk':
        return 'bg-status-red/10 text-status-red';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };
  
  // Helper function to get progress bar color
  export const getProgressColor = (status: 'Aligned' | 'Needs Attention' | 'At Risk'): string => {
    switch (status) {
      case 'Aligned':
        return 'bg-status-green';
      case 'Needs Attention':
        return 'bg-status-amber';
      case 'At Risk':
        return 'bg-status-red';
      default:
        return 'bg-slate-400';
    }
  };