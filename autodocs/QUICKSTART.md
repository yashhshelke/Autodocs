# 🚀 AutoDocs Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ npm installed (`npm --version`)
- ✅ Python 3.10+ installed (`python --version`)
- ✅ pip installed (`pip --version`)

---

## Step 1: Install Frontend Dependencies

```bash
cd d:\Autodocs\autodocs\frontend
npm install
```

This will install:
- React 18
- React Router DOM
- Vite
- @vitejs/plugin-react

**Expected output**: `added XXX packages` (takes ~1-2 minutes)

---

## Step 2: Install Backend Dependencies

```bash
cd d:\Autodocs\autodocs\backend
pip install -r requirements.txt
```

This will install:
- Django 6.0
- Django REST Framework
- Django CORS Headers
- Django Channels
- Celery
- Redis
- Pillow

**Expected output**: `Successfully installed...` (takes ~2-3 minutes)

---

## Step 3: Start the Backend Server

```bash
cd d:\Autodocs\autodocs\backend
python manage.py runserver
```

**Expected output**:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

✅ Backend API is now running at `http://localhost:8000`

---

## Step 4: Start the Frontend Development Server

**Open a NEW terminal window**, then:

```bash
cd d:\Autodocs\autodocs\frontend
npm run dev
```

**Expected output**:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

✅ Frontend is now running at `http://localhost:3000`

---

## Step 5: Access the Application

Open your browser and navigate to:

### 🌐 **http://localhost:3000**

You should see the AutoDocs landing page!

### Available Routes:
- **Landing Page**: http://localhost:3000/
- **Auth Portal**: http://localhost:3000/auth
- **Dashboard**: http://localhost:3000/dashboard
- **Workspace**: http://localhost:3000/workspace

---

## 🎯 Next Steps

### 1. Create React Page Components

Navigate to `frontend/src/pages/` and create:

**LandingPage.jsx**:
```jsx
export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to AutoDocs</h1>
      {/* Add your landing page content */}
    </div>
  )
}
```

**AuthPage.jsx**, **DashboardPage.jsx**, **WorkspacePage.jsx** - similar structure

### 2. Create Reusable Components

Navigate to `frontend/src/components/` and create:

**Button.jsx**:
```jsx
export default function Button({ children, variant = 'primary', ...props }) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  )
}
```

**Badge.jsx**, **Card.jsx**, **ProgressBar.jsx** - similar structure

### 3. Set Up Django API

```bash
cd backend
python manage.py startapp api
```

Then create models, serializers, and views in the `api` folder.

---

## 🐛 Troubleshooting

### Frontend Issues

**Problem**: `npm: command not found`
**Solution**: Install Node.js from https://nodejs.org/

**Problem**: Port 3000 already in use
**Solution**: Change port in `vite.config.js`:
```js
server: {
  port: 3001  // or any other port
}
```

### Backend Issues

**Problem**: `python: command not found`
**Solution**: Install Python from https://python.org/

**Problem**: Port 8000 already in use
**Solution**: Run on different port:
```bash
python manage.py runserver 8001
```

**Problem**: Module not found errors
**Solution**: Ensure you're in the backend directory and run:
```bash
pip install -r requirements.txt
```

---

## 📁 Project Structure Reference

```
autodocs/
├── frontend/          # React app (port 3000)
│   ├── src/
│   │   ├── pages/    # Create your page components here
│   │   └── components/ # Create reusable components here
│   └── package.json
│
└── backend/           # Django API (port 8000)
    ├── autodocs/     # Django project
    └── requirements.txt
```

---

## ✅ Verification Checklist

- [ ] Node.js and npm installed
- [ ] Python and pip installed
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend dependencies installed (`pip install -r requirements.txt`)
- [ ] Backend server running (port 8000)
- [ ] Frontend dev server running (port 3000)
- [ ] Can access http://localhost:3000 in browser
- [ ] No console errors in browser

---

## 🎨 Design System Available

All design tokens are ready in `frontend/src/styles/globals.css`:
- Colors (HSL-based palette)
- Typography (Inter + JetBrains Mono)
- Spacing scale
- Animations
- Glassmorphism effects

Use CSS variables in your components:
```css
.my-component {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
}
```

---

## 📚 Documentation

- **Main README**: `README.md`
- **Frontend Guide**: `frontend/README.md`
- **Backend Guide**: `backend/README.md`
- **Project Summary**: `PROJECT_SUMMARY.md`

---

## 🎉 You're Ready!

Your AutoDocs development environment is now set up and running!

Start building your React components and Django API endpoints.

**Happy Coding! 🚀**
