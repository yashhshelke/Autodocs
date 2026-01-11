# AutoDocs Frontend (React + Vite)

Modern React frontend for the AutoDocs AI-powered document automation platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Button.jsx
│   │   ├── Badge.jsx
│   │   ├── Card.jsx
│   │   ├── ProgressBar.jsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── LandingPage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── WorkspacePage.jsx
│   ├── styles/             # CSS modules and global styles
│   │   └── globals.css
│   ├── utils/              # Utility functions
│   ├── assets/             # Static assets
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Pages

### 1. Landing Page (`/`)
- Hero section with animated gradient background
- "How It Works" timeline with 4 steps
- Features grid showcasing transparency and trust
- Call-to-action sections

### 2. Authentication Portal (`/auth`)
- Tabbed interface (Sign In / Sign Up)
- Password strength indicator
- Social login options (Google, GitHub)
- Security badges and trust indicators

### 3. Dashboard (`/dashboard`)
- Stats overview cards
- Active missions grid
- Filter tabs (All, In Progress, Completed, Pending)
- Search functionality
- Mission cards with progress bars

### 4. Live Agent Workspace (`/workspace`)
Three-column layout:
- **Left**: Plan Tree with step-by-step progress
- **Center**: Real-Time Activity Feed with AI reasoning
- **Right**: Document Tray with file previews

## 🎨 Design System

All design tokens are defined in `src/styles/globals.css`:

- **Colors**: HSL-based color palette with primary, secondary, success, warning, danger
- **Typography**: Inter (UI) and JetBrains Mono (code)
- **Spacing**: Consistent spacing scale (xs to 3xl)
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Technologies

- **React 18**: UI library
- **React Router**: Client-side routing
- **Vite**: Build tool and dev server
- **CSS Variables**: Design system
- **ES6+ JavaScript**: Modern JavaScript features

## 📦 Components

Create reusable components in `src/components/`:

```jsx
// Example: Button.jsx
export default function Button({ children, variant = 'primary', ...props }) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  )
}
```

## 🌐 API Integration

The frontend is configured to proxy API requests to the Django backend:

```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true
  }
}
```

## 📝 Next Steps

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Create page components in `src/pages/`
4. Build reusable components in `src/components/`
5. Connect to Django backend API

## 🎯 Features to Implement

- [ ] Complete all page components
- [ ] Add state management (Context API or Zustand)
- [ ] Implement real-time WebSocket connection
- [ ] Add form validation
- [ ] Implement authentication flow
- [ ] Add loading states and error handling
- [ ] Create responsive layouts
- [ ] Add unit tests

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
