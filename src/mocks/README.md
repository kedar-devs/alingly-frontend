# Mocks Directory

This directory contains mock data for development and testing purposes.

## Dashboard Mock Data

The `dashboard.mock.ts` file contains sample dashboard data that matches the `DashboardData` interface structure.

## Usage

To use mock data instead of API calls, set the following environment variables in your `.env` file:

```env
# Use mock data globally
VITE_USE_MOCK_DATA=true

# Or use mock data only for dashboard
VITE_DASHBOARD_USE_MOCK=true
```

## Configuration

The mock data is controlled by the configuration in `src/core/config/app.config.ts`. The handler in `src/components/project_home/store/handlers/dashboard.handler.ts` automatically switches between mock data and real API calls based on these environment variables.

## Environment Variables

- `VITE_USE_MOCK_DATA`: Set to `'true'` or `'1'` to use mock data globally
- `VITE_DASHBOARD_USE_MOCK`: Set to `'true'` or `'1'` to use mock data for dashboard only
- `VITE_API_BASE_URL`: The base URL for the API (default: `http://localhost:8000/v1`)

## Notes

- Mock data includes a simulated delay (500ms) to mimic API behavior
- In development mode, if the API fails, the handler will automatically fall back to mock data
- In production mode, API errors will be thrown instead of falling back to mock data
