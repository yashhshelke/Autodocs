# AutoDocs Backend Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React Frontend)                   │
│                     http://localhost:3000                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/HTTPS + JWT
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      DJANGO REST API                             │
│                   http://localhost:8000/api                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              AUTHENTICATION LAYER                        │   │
│  │  • JWT Token Authentication                              │   │
│  │  • User Registration & Login                             │   │
│  │  • Token Refresh                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  API ENDPOINTS                           │   │
│  │                                                           │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │   USERS      │  │   MISSIONS   │  │  DOCUMENTS   │  │   │
│  │  │              │  │              │  │              │  │   │
│  │  │ • Register   │  │ • List       │  │ • Upload     │  │   │
│  │  │ • Login      │  │ • Create     │  │ • Download   │  │   │
│  │  │ • Profile    │  │ • Update     │  │ • Verify     │  │   │
│  │  │ • Update     │  │ • Delete     │  │ • List       │  │   │
│  │  │              │  │ • Start      │  │              │  │   │
│  │  │              │  │ • Pause      │  │              │  │   │
│  │  │              │  │ • Resume     │  │              │  │   │
│  │  │              │  │ • Complete   │  │              │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  │                                                           │   │
│  │  ┌──────────────┐                                        │   │
│  │  │  ACTIVITIES  │                                        │   │
│  │  │              │                                        │   │
│  │  │ • List       │                                        │   │
│  │  │ • Create     │                                        │   │
│  │  │ • Filter     │                                        │   │
│  │  └──────────────┘                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              BUSINESS LOGIC LAYER                        │   │
│  │                                                           │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │ Serializers  │  │   ViewSets   │  │ Permissions  │  │   │
│  │  │              │  │              │  │              │  │   │
│  │  │ • Validation │  │ • CRUD Ops   │  │ • IsAuth     │  │   │
│  │  │ • Transform  │  │ • Custom     │  │ • Ownership  │  │   │
│  │  │ • Nested     │  │   Actions    │  │ • Admin      │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  DATA MODELS                             │   │
│  │                                                           │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │    User      │  │   Mission    │  │  Document    │  │   │
│  │  │              │  │              │  │              │  │   │
│  │  │ • Username   │  │ • Title      │  │ • Name       │  │   │
│  │  │ • Email      │  │ • Type       │  │ • File       │  │   │
│  │  │ • Password   │  │ • Status     │  │ • Type       │  │   │
│  │  │ • Profile    │  │ • Progress   │  │ • Status     │  │   │
│  │  │              │  │ • Priority   │  │ • Verified   │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  │                                                           │   │
│  │  ┌──────────────┐  ┌──────────────┐                     │   │
│  │  │  PlanStep    │  │   Activity   │                     │   │
│  │  │              │  │              │                     │   │
│  │  │ • Title      │  │ • Type       │                     │   │
│  │  │ • Order      │  │ • Message    │                     │   │
│  │  │ • Status     │  │ • Details    │                     │   │
│  │  │ • Parent     │  │ • Timestamp  │                     │   │
│  │  └──────────────┘  └──────────────┘                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ ORM
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                        DATABASE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              SQLite (Development)                        │   │
│  │           PostgreSQL (Production)                        │   │
│  │                                                           │   │
│  │  Tables:                                                  │   │
│  │  • auth_user                                             │   │
│  │  • users_userprofile                                     │   │
│  │  • missions_mission                                      │   │
│  │  • missions_planstep                                     │   │
│  │  • documents_document                                    │   │
│  │  • activities_activity                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                      ADDITIONAL COMPONENTS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    CORS      │  │    Media     │  │    Admin     │          │
│  │              │  │              │  │              │          │
│  │ • Frontend   │  │ • File       │  │ • Django     │          │
│  │   Origins    │  │   Upload     │  │   Admin      │          │
│  │ • Credentials│  │ • Storage    │  │   Panel      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐                             │
│  │   Channels   │  │    Celery    │                             │
│  │              │  │              │                             │
│  │ • WebSocket  │  │ • Background │                             │
│  │   Support    │  │   Tasks      │                             │
│  │ • Real-time  │  │ • Queue      │                             │
│  └──────────────┘  └──────────────┘                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘


DATA FLOW EXAMPLE: Creating a Mission
═══════════════════════════════════════

1. Frontend → POST /api/missions/
   {
     "title": "Retrieve Tax Documents",
     "type": "document_retrieval",
     "priority": "high"
   }

2. Django REST Framework
   ↓ JWT Authentication
   ↓ Permission Check (IsAuthenticated)
   ↓ Serializer Validation

3. MissionCreateSerializer
   ↓ Validate data
   ↓ Add current user

4. Mission Model
   ↓ Create mission instance
   ↓ Save to database

5. Activity Model
   ↓ Auto-create activity log
   ↓ "Mission created"

6. Response ← 201 Created
   {
     "id": 1,
     "title": "Retrieve Tax Documents",
     "status": "pending",
     "progress": 0,
     ...
   }


SECURITY LAYERS
═══════════════

┌─────────────────────────────────────┐
│  1. HTTPS (Production)              │
├─────────────────────────────────────┤
│  2. CORS Headers                    │
├─────────────────────────────────────┤
│  3. JWT Authentication              │
├─────────────────────────────────────┤
│  4. Permission Classes              │
├─────────────────────────────────────┤
│  5. Ownership Validation            │
├─────────────────────────────────────┤
│  6. Django ORM (SQL Injection)      │
├─────────────────────────────────────┤
│  7. Password Hashing (PBKDF2)       │
└─────────────────────────────────────┘
