# Dashboard Store & Handlers

This directory contains the store, handlers, and API logic for the dashboard feature.

## Structure

```
store/
├── api/
│   └── dashboard.api.tsx      # React Query hooks for dashboard
├── handlers/
│   └── dashboard.handler.ts    # Handler that switches between mock/API
└── dashboard.store.ts          # Zustand store (optional)
```

## Components

### 1. Dashboard Handler (`handlers/dashboard.handler.ts`)

The handler manages the switch between mock data and real API calls. It:
- Checks environment variables to determine data source
- Returns mock data if `VITE_USE_MOCK_DATA` or `VITE_DASHBOARD_USE_MOCK` is enabled
- Falls back to mock data in development if API fails
- Throws errors in production if API fails

### 2. Dashboard API (`api/dashboard.api.tsx`)

React Query hooks for fetching dashboard data. Uses the handler internally.

**Usage:**
```tsx
import { useGetDashboardDataQuery } from '../store/api/dashboard.api';

function DashboardComponent() {
  const { data, isLoading, error } = useGetDashboardDataQuery(projectId);
  // ...
}
```

### 3. Dashboard Store (`dashboard.store.ts`)

Optional Zustand store for managing dashboard state. Can be used alongside React Query or independently.

**Usage:**
```tsx
import { useDashboardStore } from '../store/dashboard.store';

function DashboardComponent() {
  const { dashboardData, fetchDashboardData, isLoading } = useDashboardStore();
  
  useEffect(() => {
    fetchDashboardData(projectId);
  }, [projectId]);
}
```

## Configuration

Set these environment variables in your `.env` file:

```env
# Use mock data globally
VITE_USE_MOCK_DATA=true

# Or use mock data only for dashboard
VITE_DASHBOARD_USE_MOCK=true
```

## Data Flow

1. Component calls `useGetDashboardDataQuery(projectId)` or `fetchDashboardData(projectId)`
2. Handler checks environment variables
3. If mock enabled → returns mock data from `src/mocks/dashboard.mock.ts`
4. If API enabled → fetches from `/project/{projectId}/dashboard`
5. Data is returned to component
