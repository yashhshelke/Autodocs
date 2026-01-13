# AutoDocs Backend - Quick Start Guide

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.9 or higher
- pip (Python package manager)
- Virtual environment (recommended)

### 2. Installation

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Database Setup

```bash
# Run migrations
python manage.py migrate

# Create superuser (admin account)
python manage.py createsuperuser
```

Follow the prompts to create your admin account.

### 4. Start Development Server

```bash
python manage.py runserver
```

The API will be available at: `http://localhost:8000`

### 5. Access Admin Panel

Navigate to: `http://localhost:8000/admin`

Login with the superuser credentials you created.

## 📡 Testing the API

### Using cURL

#### Register a new user:
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password_confirm": "testpass123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

Save the `access` token from the response.

#### Create a mission:
```bash
curl -X POST http://localhost:8000/api/missions/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "Test Mission",
    "description": "My first mission",
    "type": "document_retrieval",
    "priority": "medium"
  }'
```

#### List missions:
```bash
curl -X GET http://localhost:8000/api/missions/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🔧 Common Commands

### Create new app
```bash
python manage.py startapp app_name
```

### Make migrations after model changes
```bash
python manage.py makemigrations
python manage.py migrate
```

### Create superuser
```bash
python manage.py createsuperuser
```

### Run tests
```bash
python manage.py test
```

### Collect static files (for production)
```bash
python manage.py collectstatic
```

### Shell access
```bash
python manage.py shell
```

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

## 🐛 Troubleshooting

### Port already in use
```bash
# Run on different port
python manage.py runserver 8001
```

### Database locked error
```bash
# Stop all running servers and try again
# Or delete db.sqlite3 and run migrations again
```

### Module not found
```bash
# Make sure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt
```

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

## 📦 Project Structure

```
backend/
├── autodocs/           # Main project settings
│   ├── settings.py     # Django settings
│   ├── urls.py         # URL routing
│   └── wsgi.py         # WSGI config
├── users/              # User authentication
├── missions/           # Mission management
├── documents/          # Document handling
├── activities/         # Activity logging
├── manage.py           # Django CLI
├── requirements.txt    # Dependencies
└── db.sqlite3          # SQLite database
```

## 🎯 Next Steps

1. **Explore the Admin Panel**: Navigate to `/admin` to manage data
2. **Test the API**: Use the examples above or tools like Postman
3. **Read the API Docs**: Check `API_DOCUMENTATION.md` for all endpoints
4. **Integrate with Frontend**: Connect your React frontend to the API
5. **Customize**: Modify models, views, and serializers as needed

## 💡 Tips

- Always activate the virtual environment before running commands
- Use the admin panel to quickly view and manage data
- Check the Django debug toolbar for performance insights
- Use `python manage.py shell` for interactive testing
- Read Django and DRF documentation for advanced features

## 🆘 Getting Help

- Django Documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- Project README: [README.md](./README.md)
