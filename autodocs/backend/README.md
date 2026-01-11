# AutoDocs Backend (Django REST Framework)

Django backend API for the AutoDocs AI-powered document automation platform.

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- pip

### Installation

```bash
cd backend
pip install -r requirements.txt
```

### Database Setup

```bash
python manage.py migrate
```

### Development

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## 📁 Project Structure

```
backend/
├── autodocs/              # Main Django project
│   ├── settings.py       # Django settings
│   ├── urls.py           # URL routing
│   ├── views.py          # View functions
│   ├── wsgi.py           # WSGI config
│   └── asgi.py           # ASGI config
├── api/                  # REST API app (to be created)
│   ├── models.py         # Database models
│   ├── serializers.py    # DRF serializers
│   ├── views.py          # API views
│   └── urls.py           # API routes
├── manage.py             # Django management script
├── requirements.txt      # Python dependencies
└── README.md
```

## 🔧 Technologies

- **Django 6.0**: Web framework
- **Django REST Framework**: API framework
- **SQLite**: Database (development)
- **Python 3.14**: Programming language

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/user` - Get current user

### Missions
- `GET /api/missions` - List all missions
- `POST /api/missions` - Create new mission
- `GET /api/missions/:id` - Get mission details
- `PATCH /api/missions/:id` - Update mission
- `DELETE /api/missions/:id` - Delete mission

### Documents
- `GET /api/documents` - List documents
- `POST /api/documents` - Upload document
- `GET /api/documents/:id` - Get document
- `DELETE /api/documents/:id` - Delete document

### Activity Feed
- `GET /api/activity/:mission_id` - Get activity feed for mission
- `WS /ws/activity/:mission_id` - WebSocket for real-time updates

## 🗄️ Database Models

### User
- Standard Django user model

### Mission
```python
class Mission(models.Model):
    user = ForeignKey(User)
    title = CharField(max_length=200)
    type = CharField(max_length=100)
    status = CharField(choices=['pending', 'in-progress', 'completed'])
    progress = IntegerField(default=0)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
```

### Document
```python
class Document(models.Model):
    mission = ForeignKey(Mission)
    name = CharField(max_length=200)
    file = FileField(upload_to='documents/')
    type = CharField(max_length=100)
    status = CharField(choices=['pending', 'processing', 'verified'])
    created_at = DateTimeField(auto_now_add=True)
```

### ActivityLog
```python
class ActivityLog(models.Model):
    mission = ForeignKey(Mission)
    type = CharField(choices=['info', 'success', 'warning', 'error'])
    message = TextField()
    details = TextField(blank=True)
    timestamp = DateTimeField(auto_now_add=True)
```

### PlanStep
```python
class PlanStep(models.Model):
    mission = ForeignKey(Mission)
    title = CharField(max_length=200)
    description = TextField()
    status = CharField(choices=['pending', 'processing', 'completed'])
    order = IntegerField()
    duration = CharField(max_length=50, blank=True)
```

## 🔐 Authentication

Using Django REST Framework Token Authentication:

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

## 🌐 CORS Configuration

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React frontend
]
```

## 📝 Next Steps

1. Install dependencies: `pip install -r requirements.txt`
2. Run migrations: `python manage.py migrate`
3. Create superuser: `python manage.py createsuperuser`
4. Start server: `python manage.py runserver`
5. Access admin: `http://localhost:8000/admin`

## 🎯 Features to Implement

- [ ] Create Django REST Framework API app
- [ ] Implement database models
- [ ] Create serializers for all models
- [ ] Build API endpoints
- [ ] Add JWT authentication
- [ ] Implement WebSocket support for real-time updates
- [ ] Add file upload handling
- [ ] Create AI agent integration
- [ ] Add Celery for background tasks
- [ ] Implement rate limiting
- [ ] Add API documentation (Swagger/OpenAPI)

## 📚 Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Django Channels](https://channels.readthedocs.io/) (for WebSockets)
