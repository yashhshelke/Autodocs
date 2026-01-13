# AutoDocs Backend - Development Workflow

## 🔄 Daily Development Workflow

### Starting Your Development Session

```bash
# 1. Navigate to backend directory
cd backend

# 2. Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 3. Pull latest changes (if using git)
git pull

# 4. Apply any new migrations
python manage.py migrate

# 5. Start development server
python manage.py runserver
```

### Making Changes

#### Adding a New Model Field

```bash
# 1. Edit the model in models.py
# Example: Add a new field to Mission model

# 2. Create migration
python manage.py makemigrations

# 3. Review the migration file
# Check migrations/<app_name>/000X_<migration_name>.py

# 4. Apply migration
python manage.py migrate

# 5. Update serializers if needed
# Edit serializers.py to include new field

# 6. Test in admin panel
# Navigate to http://localhost:8000/admin
```

#### Adding a New API Endpoint

```python
# 1. Add method to viewset (views.py)
@action(detail=True, methods=['post'])
def custom_action(self, request, pk=None):
    obj = self.get_object()
    # Your logic here
    serializer = self.get_serializer(obj)
    return Response(serializer.data)

# 2. Test the endpoint
# URL will be: /api/missions/{id}/custom_action/

# 3. Update API documentation
# Add to API_DOCUMENTATION.md
```

#### Creating a New App

```bash
# 1. Create the app
python manage.py startapp app_name

# 2. Add to INSTALLED_APPS in settings.py
INSTALLED_APPS = [
    ...
    'app_name',
]

# 3. Create models in app_name/models.py

# 4. Create serializers in app_name/serializers.py

# 5. Create views in app_name/views.py

# 6. Create urls in app_name/urls.py

# 7. Include in main urls.py
path('api/', include('app_name.urls')),

# 8. Create and apply migrations
python manage.py makemigrations
python manage.py migrate

# 9. Register in admin (app_name/admin.py)
```

## 🧪 Testing Workflow

### Manual Testing

```bash
# 1. Start server
python manage.py runserver

# 2. Run test script
python test_api.py

# 3. Test in browser/Postman
# Use API_DOCUMENTATION.md for endpoints
```

### Writing Unit Tests

```python
# In app_name/tests.py
from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User

class MissionTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
    
    def test_create_mission(self):
        response = self.client.post('/api/missions/', {
            'title': 'Test Mission',
            'type': 'document_retrieval',
            'priority': 'medium'
        })
        self.assertEqual(response.status_code, 201)
```

```bash
# Run tests
python manage.py test

# Run specific app tests
python manage.py test missions

# Run with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

## 🐛 Debugging Workflow

### Using Django Shell

```bash
# Open Django shell
python manage.py shell

# Example: Query missions
>>> from missions.models import Mission
>>> missions = Mission.objects.all()
>>> for m in missions:
...     print(f"{m.id}: {m.title} - {m.status}")

# Example: Create test data
>>> from django.contrib.auth.models import User
>>> user = User.objects.first()
>>> from missions.models import Mission
>>> mission = Mission.objects.create(
...     user=user,
...     title="Debug Mission",
...     type="document_retrieval"
... )
>>> mission.start()
>>> mission.save()
```

### Checking Logs

```bash
# View server output
# Check terminal where runserver is running

# For production, check log files
tail -f autodocs.log
```

### Database Inspection

```bash
# Open database shell
python manage.py dbshell

# SQLite commands
.tables                 # List all tables
.schema missions_mission  # Show table schema
SELECT * FROM missions_mission;  # Query data
.quit                   # Exit
```

## 📦 Dependency Management

### Adding New Package

```bash
# 1. Install package
pip install package-name

# 2. Update requirements.txt
pip freeze > requirements.txt

# 3. Commit changes
git add requirements.txt
git commit -m "Add package-name dependency"
```

### Updating Packages

```bash
# Update specific package
pip install --upgrade package-name

# Update all packages (careful!)
pip list --outdated
pip install --upgrade package-name

# Update requirements.txt
pip freeze > requirements.txt
```

## 🔄 Migration Workflow

### Creating Migrations

```bash
# After model changes
python manage.py makemigrations

# Create empty migration for data migration
python manage.py makemigrations --empty app_name

# Name the migration
python manage.py makemigrations app_name --name descriptive_name
```

### Applying Migrations

```bash
# Apply all migrations
python manage.py migrate

# Apply specific app migrations
python manage.py migrate app_name

# Apply to specific migration
python manage.py migrate app_name 0001

# Show migration status
python manage.py showmigrations
```

### Rolling Back Migrations

```bash
# Rollback to previous migration
python manage.py migrate app_name 0001

# Rollback all migrations for an app
python manage.py migrate app_name zero
```

## 🚀 Deployment Workflow

### Pre-Deployment Checklist

```bash
# 1. Run tests
python manage.py test

# 2. Check for migrations
python manage.py makemigrations --check

# 3. Collect static files
python manage.py collectstatic

# 4. Check deployment settings
python manage.py check --deploy

# 5. Update requirements.txt
pip freeze > requirements.txt
```

### Environment Setup

```bash
# 1. Copy environment template
cp .env.example .env

# 2. Update .env with production values
# Set DEBUG=False
# Set SECRET_KEY to secure random string
# Set DATABASE_URL for PostgreSQL
# Set ALLOWED_HOSTS

# 3. Install production dependencies
pip install gunicorn psycopg2-binary

# 4. Run migrations on production database
python manage.py migrate

# 5. Create superuser
python manage.py createsuperuser

# 6. Collect static files
python manage.py collectstatic --noinput
```

## 🔧 Common Tasks

### Reset Database

```bash
# Delete database
rm db.sqlite3

# Delete migrations (except __init__.py)
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete

# Create new migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### Create Sample Data

```python
# Create management command: app_name/management/commands/create_sample_data.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from missions.models import Mission

class Command(BaseCommand):
    help = 'Create sample data for testing'
    
    def handle(self, *args, **kwargs):
        # Create test user
        user, created = User.objects.get_or_create(
            username='demo',
            defaults={'email': 'demo@example.com'}
        )
        if created:
            user.set_password('demo123')
            user.save()
        
        # Create sample missions
        for i in range(5):
            Mission.objects.create(
                user=user,
                title=f'Sample Mission {i+1}',
                type='document_retrieval',
                priority='medium'
            )
        
        self.stdout.write(self.style.SUCCESS('Sample data created!'))
```

```bash
# Run command
python manage.py create_sample_data
```

### Export/Import Data

```bash
# Export data
python manage.py dumpdata > data.json
python manage.py dumpdata missions > missions.json

# Import data
python manage.py loaddata data.json
```

## 📊 Performance Monitoring

### Query Optimization

```python
# Use select_related for foreign keys
missions = Mission.objects.select_related('user').all()

# Use prefetch_related for many-to-many
missions = Mission.objects.prefetch_related('documents').all()

# Check query count
from django.db import connection
print(len(connection.queries))
```

### Enable Debug Toolbar (Development)

```bash
# Install
pip install django-debug-toolbar

# Add to INSTALLED_APPS
'debug_toolbar',

# Add to MIDDLEWARE
'debug_toolbar.middleware.DebugToolbarMiddleware',

# Add to urls.py
import debug_toolbar
urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
```

## 🎯 Best Practices

1. **Always activate virtual environment** before running commands
2. **Create migrations** after every model change
3. **Test locally** before deploying
4. **Use git** for version control
5. **Document** new endpoints in API_DOCUMENTATION.md
6. **Write tests** for new features
7. **Keep requirements.txt** up to date
8. **Use environment variables** for sensitive data
9. **Review migrations** before applying
10. **Backup database** before major changes

## 🆘 Troubleshooting

### Server won't start
```bash
# Check for port conflicts
netstat -ano | findstr :8000

# Try different port
python manage.py runserver 8001
```

### Migration conflicts
```bash
# Show migration status
python manage.py showmigrations

# Merge migrations
python manage.py makemigrations --merge
```

### Import errors
```bash
# Reinstall dependencies
pip install -r requirements.txt

# Check virtual environment is activated
which python  # Should show venv path
```

---

**Happy Coding! 🚀**
