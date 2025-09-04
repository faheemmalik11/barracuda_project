# Barracuda

A React-based payment management platform built with TypeScript and modern web technologies.

## Features

- **Multi-entity Management**: Handle payments, merchants, customers, orders, refunds, disputes, and more
- **Advanced Filtering**: Comprehensive filter system with URL-based state persistence
- **Data Tables**: Responsive tables with sorting, pagination, and bulk actions
- **Real-time Updates**: Live data synchronization and status tracking
- **Authentication**: Secure authentication with 2FA and passkey support
- **Analytics**: Payment analytics and reporting dashboards
- **Responsive Design**: Mobile-first design with desktop optimization

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Project Structure

```
src/
├── features/           # Feature-based modules
│   ├── payments/       # Payment management
│   ├── merchants/      # Merchant management
│   ├── customers/      # Customer management
│   └── ...            # Other entity modules
├── shared/            # Shared utilities and components
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
└── styles/            # Global CSS styles
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run build:check` - TypeScript check and build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm start` - Start preview server on port 3000

## Docker Support

Run the application using Docker:

```bash
docker-compose up
```

This starts the application in production mode with nginx serving the built files.

## Development

### Code Organization

The project follows a feature-based architecture where each business domain (payments, merchants, etc.) is organized into self-contained modules with their own components, hooks, types, and utilities.

### Adding New Features

1. Create a new feature directory in `src/features/`
2. Implement components, hooks, and types within the feature
3. Export the public API through `index.ts`
4. Add routing configuration if needed

### Filter System

The application uses a centralized filter system that supports:
- URL-based state persistence
- Type-safe filter configurations
- Multiple entity types
- Custom filter components

### Entity List Pages

Most entity pages use the standardized `EntityListPage` component which provides:
- Consistent header and navigation
- Status-based filtering
- Data tables with pagination
- Bulk actions and selection
- Sheet overlays for detailed views

## Contributing

1. Follow the existing code style and conventions
2. Use TypeScript for all new code
3. Implement responsive designs using Tailwind CSS
4. Add appropriate type definitions
5. Test your changes thoroughly

## Architecture

The application is built with modularity and maintainability in mind:

- **Feature-based organization** keeps related code together
- **Shared infrastructure** prevents code duplication
- **Type-safe configurations** ensure consistency
- **URL-based state** enables bookmarkable filter states
- **Generic components** reduce development overhead

## License

Private - All rights reserved