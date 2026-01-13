# AutoDocs Frontend

A sophisticated React-based "Process Monitor" interface for the AutoDocs AI-powered document automation platform. Built with transparency and user trust as core principles.

## 🎯 Overview

AutoDocs Frontend is a professional, data-driven web application that provides complete visibility into AI agent operations. Users can monitor, control, and track automated document processing tasks in real-time.

## 🏗️ Architecture

### Technology Stack

- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Routing**: React Router DOM 6.21
- **HTTP Client**: Axios 1.6
- **Styling**: Pure CSS with custom design system
- **Fonts**: Inter (UI), JetBrains Mono (Code)

### Design Philosophy

- **Deep Navy & Slate Color Palette**: Professional, authority-evoking aesthetic
- **Glassmorphism Effects**: Modern, premium visual design
- **Micro-animations**: Enhanced user engagement
- **Skeleton Loaders**: Smooth loading states
- **Toast Notifications**: Non-intrusive status updates

## 📄 Core Pages

### 1. Landing Page (`/`)
**Purpose**: Information hub and entry point

**Features**:
- Animated "How it Works" timeline (4 steps)
- Hero section with stats (10K+ documents, 99.8% success rate)
- Features grid showcasing platform capabilities
- Bold "Start New Process" CTA

**Key Components**:
- Auto-rotating timeline steps (3s interval)
- Floating animations on feature icons
- Gradient backgrounds with grid overlay
- Responsive stats display

### 2. Authentication Portal (`/auth`)
**Purpose**: Secure login and signup

**Features**:
- Toggle between Login/Signup modes
- Enterprise security badge
- Social authentication (Google, GitHub)
- Trust indicators (256-bit encryption, GDPR, SOC 2)

**Key Components**:
- Glassmorphism card design
- Form validation
- Loading states with spinner
- Animated background glows

### 3. Main Command Dashboard (`/dashboard`)
**Purpose**: Mission control center

**Features**:
- Stats overview (Total, Completed, In Progress, Pending)
- Active missions grid with cards
- Real-time progress bars
- "Last Action Taken" snippets
- Filter buttons (All, In Progress, Completed)

**Key Components**:
- Mission cards with priority indicators
- Progress tracking with shimmer effect
- Status badges (Info, Success, Warning, Error)
- New mission modal

**Mission Card Data**:
- Title and type
- Status and progress percentage
- Last action with timestamp
- Estimated completion time
- Priority level (high, medium, low)

### 4. Live Agent Workspace (`/workspace/:missionId`)
**Purpose**: Real-time AI monitoring

**Layout**: Three-column design
1. **Left Column - Plan Tree**: Hierarchical view of AI execution steps
2. **Center Column - Activity Feed**: Live scrolling log of AI actions
3. **Right Column - Document Tray**: Digital previews of forms/certificates

**Features**:
- Auto-scrolling activity feed (toggleable)
- Real-time updates every 5 seconds
- Expandable plan tree with substeps
- Document status tracking
- Mission progress header

**Activity Types**:
- Info (ℹ️): General updates
- Success (✅): Completed actions
- Error (❌): Failures
- Warning (⚠️): Cautions
- Processing (⚙️): Ongoing tasks

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--color-navy-900: #0a1628    /* Background */
--color-navy-800: #0f1f3a    /* Cards */
--color-navy-700: #1a2942    /* Elevated elements */
--color-slate-400: #cbd5e1   /* Text */

/* Accent Colors */
--color-primary: #3b82f6     /* Primary actions */
--color-success: #10b981     /* Success states */
--color-warning: #f59e0b     /* Warnings */
--color-error: #ef4444       /* Errors */
```

### Typography

- **Primary Font**: Inter (300-800 weights)
- **Monospace Font**: JetBrains Mono (for code/logs)
- **Scale**: 0.75rem to 3rem (xs to 5xl)

### Components

- **Buttons**: Primary, Secondary, Outline variants
- **Cards**: Standard and Glass variants
- **Progress Bars**: With shimmer animation
- **Badges**: Success, Warning, Error, Info
- **Toast Notifications**: Auto-dismissing alerts
- **Skeleton Loaders**: For async content

### Animations

- **fadeIn**: Smooth entrance
- **fadeInUp**: Slide up entrance
- **pulse**: Attention-grabbing
- **shimmer**: Loading indicator
- **float**: Subtle hover effect

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend API running on `http://localhost:8000`

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Production files will be in the `dist/` directory.

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── pages/          # Page components
│   │   ├── LandingPage.jsx
│   │   ├── LandingPage.css
│   │   ├── AuthPage.jsx
│   │   ├── AuthPage.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── AgentWorkspace.jsx
│   │   └── AgentWorkspace.css
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles & design system
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## 🔌 API Integration

The frontend is configured to proxy API requests to the Django backend:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    }
  }
}
```

### Expected API Endpoints

- `POST /api/auth/login` - User authentication
- `POST /api/auth/signup` - User registration
- `GET /api/missions` - List all missions
- `GET /api/missions/:id` - Get mission details
- `POST /api/missions` - Create new mission
- `GET /api/missions/:id/activity` - Get activity feed
- `GET /api/missions/:id/documents` - Get documents

## 🎯 Key Features

### Real-Time Updates

The Agent Workspace simulates real-time updates using intervals. In production, this should be replaced with WebSocket connections:

```javascript
// Example WebSocket integration
const ws = new WebSocket('ws://localhost:8000/ws/missions/' + missionId)
ws.onmessage = (event) => {
  const activity = JSON.parse(event.data)
  setActivityFeed(prev => [...prev, activity])
}
```

### Responsive Design

All pages are fully responsive with breakpoints at:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

### Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- High contrast ratios (WCAG AA compliant)

## 🔒 Security Considerations

- All forms include CSRF protection (to be implemented)
- Authentication tokens stored in httpOnly cookies
- Input sanitization on all user inputs
- Content Security Policy headers

## 🧪 Testing

```bash
# Run linter
npm run lint

# Future: Add testing commands
# npm test
# npm run test:e2e
```

## 📦 Dependencies

### Production
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-router-dom`: ^6.21.0
- `axios`: ^1.6.2

### Development
- `vite`: ^5.0.8
- `@vitejs/plugin-react`: ^4.2.1
- `eslint`: ^8.55.0

## 🎨 Customization

### Changing Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --color-primary: #your-color;
  --color-navy-900: #your-background;
}
```

### Adding New Pages

1. Create component in `src/pages/`
2. Create corresponding CSS file
3. Add route in `src/App.jsx`

## 🐛 Known Issues

- WebSocket integration pending (currently using polling)
- Form validation needs enhancement
- Need to add error boundaries
- Toast notification system needs implementation

## 🚧 Future Enhancements

- [ ] WebSocket integration for real-time updates
- [ ] Advanced filtering and search
- [ ] Export mission reports
- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n)
- [ ] Progressive Web App (PWA) support
- [ ] Advanced analytics dashboard

## 📝 License

Copyright © 2026 AutoDocs. All rights reserved.

## 👥 Contributing

This is a private project. For questions or issues, contact the development team.

---

**Built with ❤️ using React and Vite**
