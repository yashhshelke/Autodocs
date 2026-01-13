# AutoDocs Backend

Django REST API backend for the AutoDocs AI-powered document automation platform.

## 🎯 Overview

The AutoDocs backend provides RESTful APIs for managing AI agent missions, user authentication, document processing, and real-time activity tracking.

## 🏗️ Architecture

### Technology Stack

- **Framework**: Django 4.x
- **API**: Django REST Framework
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Django Channels (WebSocket support)
- **Task Queue**: Celery + Redis
- **AI Integration**: Custom AI agent framework

## 📁 Project Structure

```
backend/
├── autodocs/           # Main Django project
│   ├── settings.py    # Project settings
│   ├── urls.py        # URL routing
│   ├── wsgi.py        # WSGI config
│   └── asgi.py        # ASGI config (for WebSockets)
├── manage.py          # Django management script
└── db.sqlite3         # Development database
```

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- pip
- Virtual environment (recommended)

### Installation

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

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## 📡 API Endpoints

### Authentication

```
POST /api/auth/signup/
POST /api/auth/login/
POST /api/auth/logout/
POST /api/auth/refresh/
GET  /api/auth/user/
```

### Missions

```
GET    /api/missions/              # List all missions
POST   /api/missions/              # Create new mission
GET    /api/missions/:id/          # Get mission details
PUT    /api/missions/:id/          # Update mission
DELETE /api/missions/:id/          # Delete mission
POST   /api/missions/:id/pause/    # Pause mission
POST   /api/missions/:id/resume/   # Resume mission
```

### Activity Feed

```
GET /api/missions/:id/activity/    # Get activity log
WS  /ws/missions/:id/              # WebSocket for real-time updates
```

### Documents

```
GET    /api/missions/:id/documents/     # List mission documents
GET    /api/documents/:id/              # Get document details
GET    /api/documents/:id/download/     # Download document
POST   /api/documents/:id/verify/       # Verify document
```

## 🗄️ Database Models

### User
- Standard Django user model
- Extended with profile information

### Mission
```python
class Mission(models.Model):
    user = ForeignKey(User)
    title = CharField(max_length=200)
    type = CharField(choices=MISSION_TYPES)
    status = CharField(choices=STATUS_CHOICES)
    progress = IntegerField(default=0)
    priority = CharField(choices=PRIORITY_CHOICES)
    started_at = DateTimeField(auto_now_add=True)
    completed_at = DateTimeField(null=True)
    estimated_completion = DurationField()
```

### Activity
```python
class Activity(models.Model):
    mission = ForeignKey(Mission)
    type = CharField(choices=ACTIVITY_TYPES)
    message = TextField()
    details = TextField()
    timestamp = DateTimeField(auto_now_add=True)
```

### Document
```python
class Document(models.Model):
    mission = ForeignKey(Mission)
    name = CharField(max_length=200)
    file = FileField(upload_to='documents/')
    type = CharField(max_length=50)
    status = CharField(choices=DOC_STATUS_CHOICES)
    uploaded_at = DateTimeField(auto_now_add=True)
```

### PlanStep
```python
class PlanStep(models.Model):
    mission = ForeignKey(Mission)
    parent = ForeignKey('self', null=True)
    title = CharField(max_length=200)
    status = CharField(choices=STATUS_CHOICES)
    order = IntegerField()
```

## 🤖 AI Agent Integration

The backend integrates with AI agents for automated document processing:

```python
# Example agent workflow
class DocumentAgent:
    def __init__(self, mission):
        self.mission = mission
        
    async def execute(self):
        # 1. Initialize
        await self.log_activity('info', 'Mission started')
        
        # 2. Authenticate
        await self.authenticate_portal()
        
        # 3. Navigate and fill forms
        await self.process_forms()
        
        # 4. Download documents
        await self.retrieve_documents()
        
        # 5. Verify and deliver
        await self.verify_and_deliver()
```

## 🔒 Security

### Authentication
- JWT-based authentication
- Token refresh mechanism
- Secure password hashing (PBKDF2)

### Authorization
- Role-based access control
- Mission ownership validation
- Document access restrictions

### Data Protection
- HTTPS only in production
- CORS configuration
- SQL injection prevention (ORM)
- XSS protection
- CSRF tokens

## 🧪 Testing

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test missions

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

## 📦 Dependencies

Create `requirements.txt`:

```txt
Django>=4.2.0
djangorestframework>=3.14.0
django-cors-headers>=4.0.0
djangorestframework-simplejwt>=5.2.0
channels>=4.0.0
channels-redis>=4.1.0
celery>=5.3.0
redis>=4.5.0
psycopg2-binary>=2.9.0
python-dotenv>=1.0.0
Pillow>=10.0.0
```

## ⚙️ Configuration

### Environment Variables

Create `.env` file:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:pass@localhost/autodocs
REDIS_URL=redis://localhost:6379/0
ALLOWED_HOSTS=localhost,127.0.0.1

# AI Agent Configuration
AI_AGENT_API_KEY=your-api-key
AI_AGENT_MODEL=gpt-4

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-password
```

### CORS Settings

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

## 🔄 Real-Time Updates

### WebSocket Configuration

```python
# routing.py
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from missions.consumers import MissionConsumer

application = ProtocolTypeRouter({
    'websocket': URLRouter([
        path('ws/missions/<int:mission_id>/', MissionConsumer.as_asgi()),
    ]),
})
```

### Consumer Example

```python
# consumers.py
class MissionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.mission_id = self.scope['url_route']['kwargs']['mission_id']
        await self.channel_layer.group_add(
            f'mission_{self.mission_id}',
            self.channel_name
        )
        await self.accept()
    
    async def mission_update(self, event):
        await self.send(text_data=json.dumps(event['data']))
```

## 📊 Monitoring & Logging

```python
# settings.py
LOGGING = {
    'version': 1,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'autodocs.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
        },
    },
}
```

## 🚀 Deployment

### Production Checklist

- [ ] Set `DEBUG=False`
- [ ] Configure production database (PostgreSQL)
- [ ] Set up Redis for caching and Celery
- [ ] Configure static files serving
- [ ] Set up HTTPS
- [ ] Configure email backend
- [ ] Set up monitoring (Sentry)
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline

### Docker Deployment

```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "autodocs.wsgi:application", "--bind", "0.0.0.0:8000"]
```

## 🐛 Known Issues

- WebSocket authentication needs enhancement
- Rate limiting not implemented
- Need to add comprehensive test coverage
- Document storage needs S3 integration

## 🚧 Future Enhancements

- [ ] GraphQL API support
- [ ] Advanced caching strategy
- [ ] Machine learning model integration
- [ ] Multi-tenancy support
- [ ] Advanced analytics
- [ ] Audit logging
- [ ] API versioning

## 📝 License

Copyright © 2026 AutoDocs. All rights reserved.

---

**Built with Django REST Framework**
