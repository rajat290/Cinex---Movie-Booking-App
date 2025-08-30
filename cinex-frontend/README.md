# CineX - Movie Booking Frontend

A modern React + TypeScript + Vite application for movie booking and streaming.

## Environment Setup

### Available Environment Files

- `.env.example` - Template with all required environment variables
- `.env.development` - Development-specific configuration (auto-loaded when NODE_ENV=development)
- `.env.production` - Production-specific configuration (auto-loaded when NODE_ENV=production)

### Quick Start

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Update the values in `.env` for your local development:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=CineX
   VITE_ENABLE_DEBUG=true
   ```

3. **Environment variables are automatically loaded based on NODE_ENV:**
   - Development: `.env.development`, `.env.development.local`, `.env`
   - Production: `.env.production`, `.env.production.local`, `.env`

### Available Environment Variables

- `VITE_API_URL` - Backend API base URL (default: http://localhost:5000/api)
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version
- `VITE_ENABLE_DEBUG` - Enable debug mode (true/false)
- `VITE_ENABLE_ANALYTICS` - Enable analytics (true/false)
- `VITE_DEV_MODE` - Development mode flag
- `VITE_LOG_LEVEL` - Log level (debug, info, warn, error)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Vite Configuration

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
