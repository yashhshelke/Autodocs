# AutoDocs - AI-Powered Document Automation Platform

A sophisticated, high-trust Process Monitor for agentic AI document automation. AutoDocs provides complete transparency over AI actions with a professional, data-driven aesthetic.

## 🏗️ Project Structure

```
autodocs/
├── frontend/                    # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── WorkspacePage.jsx
│   │   ├── styles/             # CSS and styling
│   │   │   └── globals.css
│   │   ├── utils/              # Utility functions
│   │   ├── assets/             # Static assets
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/                     # Django REST API Backend
│   ├── autodocs/               # Django project
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── api/                    # REST API app (to create)
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── requirements.txt
│   └── README.md
│
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites
- **Frontend**: Node.js 18+ and npm
- **Backend**: Python 3.10+ and pip

### 1. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### 2. Setup Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend API will run on `http://localhost:8000`

## 🎨 Application Pages

### 1. **Landing/Information Hub** (`/`)
- Hero section with animated gradient background
- "How It Works" timeline explaining AI process (4 steps)
- Features grid showcasing transparency and trust
- Statistics showcase (10,000+ documents, 98% success rate)
- Call-to-action sections

**Key Features:**
- Smooth scroll animations
- Intersection Observer for timeline
- Premium dark theme with glassmorphism
- Responsive design

### 2. **Authentication Portal** (`/auth`)
- Clean, centered card-based layout
- Tabbed interface (Sign In / Sign Up)
- Password strength indicator
- Social login options (Google, GitHub)
- Security badges (256-bit encryption, GDPR, SOC 2)
- Trust indicators for sensitive data

**Key Features:**
- Real-time password validation
- Animated background orbs
- Form validation
- Secure authentication flow

### 3. **Main Command Dashboard** (`/dashboard`)
- Grid of "Active Missions" (current paperwork goals)
- High-level progress bars for each mission
- "Last Action Taken" snippets with timestamps
- Statistics overview cards
- Filter tabs (All, In Progress, Completed, Pending)
- Search functionality

**Key Features:**
- Real-time mission updates
- Interactive mission cards
- Dynamic filtering
- Progress tracking

### 4. **Live Agent Workspace** (`/workspace`)
The most complex page with three-column layout:

#### **Left Column: Plan Tree**
- All steps the AI has mapped out
- Visual status indicators (Pending, Processing, Completed)
- Estimated duration for each step
- Hierarchical view of the entire process

#### **Center Column: Real-Time Activity Feed**
- Scrolling log of AI's internal reasoning
- API call monitoring
- Timestamped events
- Color-coded message types (Info, Success, Warning, Error)
- Auto-scroll functionality
- Pause/Resume controls

#### **Right Column: Document Tray**
- Digital previews of forms being filled
- Retrieved certificates display
- Document status badges
- Click to preview in modal
- File size and type information

**Key Features:**
- Real-time WebSocket updates
- Three-column responsive layout
- Live activity streaming
- Document preview modal
- Plan tree auto-updates

## 🎨 Design System

### Color Palette
```css
Primary:   hsl(240, 100%, 65%)  /* Vibrant blue */
Secondary: hsl(280, 85%, 60%)   /* Purple */
Accent:    hsl(190, 95%, 55%)   /* Cyan */
Success:   hsl(142, 76%, 45%)   /* Green */
Warning:   hsl(38, 92%, 50%)    /* Orange */
Danger:    hsl(0, 84%, 60%)     /* Red */
```

### Typography
- **UI Font**: Inter (300, 400, 500, 600, 700, 800)
- **Code Font**: JetBrains Mono (400, 500, 600)

### Key Design Principles
1. **Premium Aesthetics**: Vibrant gradients, glassmorphism, smooth animations
2. **Trust & Transparency**: Real-time logging, security indicators, clear status
3. **Professional**: Data-driven, clean layouts, consistent spacing
4. **Responsive**: Mobile-first approach, adaptive layouts

## 🔧 Technology Stack

### Frontend
- **React 18**: UI library
- **React Router**: Client-side routing
- **Vite**: Build tool and dev server
- **CSS Variables**: Design system
- **ES6+ JavaScript**: Modern JavaScript

### Backend
- **Django 6.0**: Web framework
- **Django REST Framework**: API framework
- **Django Channels**: WebSocket support
- **Celery**: Background task processing
- **Redis**: Caching and message broker
- **SQLite**: Database (development)

## 📡 API Architecture

### REST Endpoints
- `/api/auth/*` - Authentication
- `/api/missions/*` - Mission management
- `/api/documents/*` - Document handling
- `/api/activity/*` - Activity logs

### WebSocket Endpoints
- `/ws/activity/:mission_id` - Real-time activity updates
- `/ws/status/:mission_id` - Mission status updates

## 🗄️ Database Schema

### Core Models
- **User**: Authentication and profile
- **Mission**: Document automation tasks
- **Document**: Uploaded and generated files
- **ActivityLog**: AI reasoning and actions
- **PlanStep**: Planned execution steps

## 🔐 Security Features

- Token-based authentication (JWT)
- CORS configuration
- Rate limiting
- File upload validation
- XSS protection
- CSRF protection

## 📱 Responsive Design

All pages are fully responsive:
- **Desktop**: 1024px+ (full three-column layout)
- **Tablet**: 768px - 1023px (adapted layouts)
- **Mobile**: < 768px (stacked layouts)

## 🎯 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project structure setup
- [x] Design system implementation
- [x] Frontend routing
- [x] Backend API structure

### Phase 2: Core Features (In Progress)
- [ ] Complete React page components
- [ ] Implement Django REST API
- [ ] Database models and migrations
- [ ] Authentication flow
- [ ] WebSocket integration

### Phase 3: AI Integration
- [ ] AI agent service integration
- [ ] Document processing pipeline
- [ ] Real-time activity streaming
- [ ] Plan generation algorithm

### Phase 4: Polish & Deploy
- [ ] Performance optimization
- [ ] Unit and integration tests
- [ ] Documentation
- [ ] Production deployment

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
```

### Backend
```bash
cd backend
python manage.py test
```

## 📚 Documentation

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [API Documentation](./backend/docs/api.md) (to be created)
- [Design System Guide](./frontend/docs/design-system.md) (to be created)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern SaaS platforms
- Color palette based on HSL color theory
- Typography from Google Fonts

---

**Built with ❤️ for transparency in AI automation**

For questions or support, please open an issue on GitHub.
