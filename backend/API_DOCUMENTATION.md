# AutoDocs API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication

All API endpoints (except registration and login) require JWT authentication.

### Headers
```
Authorization: Bearer <access_token>
```

---

## Authentication Endpoints

### Register User
**POST** `/api/auth/register/`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "password_confirm": "securepassword123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response (201):**
```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "profile": {
      "avatar": null,
      "bio": "",
      "phone": "",
      "preferences": {},
      "total_missions": 0,
      "completed_missions": 0
    }
  },
  "tokens": {
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

### Login
**POST** `/api/auth/login/`

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Refresh Token
**POST** `/api/auth/refresh/`

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response (200):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Get Current User
**GET** `/api/auth/user/`

**Response (200):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "profile": {
    "avatar": null,
    "bio": "AI enthusiast",
    "phone": "+1234567890",
    "preferences": {},
    "total_missions": 5,
    "completed_missions": 3
  }
}
```

### Update User
**PUT/PATCH** `/api/auth/user/update/`

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "profile": {
    "bio": "Updated bio",
    "phone": "+1234567890"
  }
}
```

---

## Mission Endpoints

### List Missions
**GET** `/api/missions/`

**Query Parameters:**
- `page` (optional): Page number for pagination

**Response (200):**
```json
{
  "count": 10,
  "next": "http://localhost:8000/api/missions/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Retrieve Tax Documents",
      "description": "Download tax documents from portal",
      "type": "document_retrieval",
      "status": "running",
      "progress": 45,
      "priority": "high",
      "created_at": "2026-01-13T10:00:00Z",
      "started_at": "2026-01-13T10:05:00Z",
      "completed_at": null,
      "estimated_duration": "00:30:00",
      "user_name": "john_doe",
      "document_count": 3,
      "activity_count": 12
    }
  ]
}
```

### Create Mission
**POST** `/api/missions/`

**Request Body:**
```json
{
  "title": "Retrieve Tax Documents",
  "description": "Download tax documents from portal",
  "type": "document_retrieval",
  "priority": "high",
  "estimated_duration": "00:30:00",
  "config": {
    "portal_url": "https://example.com",
    "document_types": ["W2", "1099"]
  }
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "Retrieve Tax Documents",
  "description": "Download tax documents from portal",
  "type": "document_retrieval",
  "status": "pending",
  "progress": 0,
  "priority": "high",
  "created_at": "2026-01-13T10:00:00Z",
  "started_at": null,
  "completed_at": null,
  "updated_at": "2026-01-13T10:00:00Z",
  "estimated_duration": "00:30:00",
  "config": {
    "portal_url": "https://example.com",
    "document_types": ["W2", "1099"]
  },
  "user_name": "john_doe",
  "plan_steps": [],
  "recent_activities": [
    {
      "id": 1,
      "type": "info",
      "message": "Mission created",
      "details": "Mission \"Retrieve Tax Documents\" has been created",
      "timestamp": "2026-01-13T10:00:00Z"
    }
  ],
  "documents": []
}
```

### Get Mission Details
**GET** `/api/missions/{id}/`

**Response (200):**
```json
{
  "id": 1,
  "title": "Retrieve Tax Documents",
  "description": "Download tax documents from portal",
  "type": "document_retrieval",
  "status": "running",
  "progress": 45,
  "priority": "high",
  "created_at": "2026-01-13T10:00:00Z",
  "started_at": "2026-01-13T10:05:00Z",
  "completed_at": null,
  "updated_at": "2026-01-13T10:15:00Z",
  "estimated_duration": "00:30:00",
  "config": {},
  "user_name": "john_doe",
  "plan_steps": [
    {
      "id": 1,
      "title": "Authenticate to portal",
      "description": "Login to the tax portal",
      "status": "completed",
      "order": 1,
      "started_at": "2026-01-13T10:05:00Z",
      "completed_at": "2026-01-13T10:07:00Z",
      "substeps": []
    }
  ],
  "recent_activities": [...],
  "documents": [...]
}
```

### Update Mission
**PUT/PATCH** `/api/missions/{id}/`

**Request Body:**
```json
{
  "title": "Updated Title",
  "priority": "urgent"
}
```

### Delete Mission
**DELETE** `/api/missions/{id}/`

**Response (204):** No content

### Start Mission
**POST** `/api/missions/{id}/start/`

**Response (200):**
```json
{
  "id": 1,
  "status": "running",
  "started_at": "2026-01-13T10:05:00Z",
  ...
}
```

### Pause Mission
**POST** `/api/missions/{id}/pause/`

**Response (200):**
```json
{
  "id": 1,
  "status": "paused",
  ...
}
```

### Resume Mission
**POST** `/api/missions/{id}/resume/`

**Response (200):**
```json
{
  "id": 1,
  "status": "running",
  ...
}
```

### Complete Mission
**POST** `/api/missions/{id}/complete/`

**Response (200):**
```json
{
  "id": 1,
  "status": "completed",
  "progress": 100,
  "completed_at": "2026-01-13T10:35:00Z",
  ...
}
```

### Get Mission Activity
**GET** `/api/missions/{id}/activity/`

**Response (200):**
```json
[
  {
    "id": 1,
    "mission": 1,
    "mission_title": "Retrieve Tax Documents",
    "type": "info",
    "type_display": "Information",
    "message": "Mission started",
    "details": "Mission has been started",
    "metadata": {},
    "timestamp": "2026-01-13T10:05:00Z"
  }
]
```

### Get Mission Documents
**GET** `/api/missions/{id}/documents/`

**Response (200):**
```json
[
  {
    "id": 1,
    "mission": 1,
    "mission_title": "Retrieve Tax Documents",
    "name": "W2_2025.pdf",
    "file": "/media/documents/2026/01/13/W2_2025.pdf",
    "file_url": "http://localhost:8000/media/documents/2026/01/13/W2_2025.pdf",
    "file_type": "pdf",
    "file_size": 524288,
    "file_size_mb": 0.5,
    "status": "ready",
    "description": "W2 form for 2025",
    "metadata": {},
    "is_verified": false,
    "verified_by": null,
    "verified_by_name": null,
    "verified_at": null,
    "uploaded_at": "2026-01-13T10:20:00Z",
    "updated_at": "2026-01-13T10:20:00Z"
  }
]
```

---

## Document Endpoints

### List Documents
**GET** `/api/documents/`

**Response (200):**
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [...]
}
```

### Upload Document
**POST** `/api/documents/`

**Request (multipart/form-data):**
```
mission: 1
name: W2_2025.pdf
file: <binary>
file_type: pdf
description: W2 form for 2025
metadata: {}
```

**Response (201):**
```json
{
  "id": 1,
  "mission": 1,
  "name": "W2_2025.pdf",
  "file_type": "pdf",
  "status": "pending",
  ...
}
```

### Get Document Details
**GET** `/api/documents/{id}/`

### Download Document
**GET** `/api/documents/{id}/download/`

**Response:** File download

### Verify Document
**POST** `/api/documents/{id}/verify/`

**Response (200):**
```json
{
  "id": 1,
  "is_verified": true,
  "verified_by": 1,
  "verified_by_name": "john_doe",
  "verified_at": "2026-01-13T10:25:00Z",
  "status": "verified",
  ...
}
```

### Delete Document
**DELETE** `/api/documents/{id}/`

**Response (204):** No content

---

## Activity Endpoints

### List Activities
**GET** `/api/activities/`

**Query Parameters:**
- `mission` (optional): Filter by mission ID
- `type` (optional): Filter by activity type (info, success, warning, error, milestone, action)
- `page` (optional): Page number

**Response (200):**
```json
{
  "count": 50,
  "next": "http://localhost:8000/api/activities/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "mission": 1,
      "mission_title": "Retrieve Tax Documents",
      "type": "info",
      "type_display": "Information",
      "message": "Mission started",
      "details": "Mission has been started",
      "metadata": {},
      "timestamp": "2026-01-13T10:05:00Z"
    }
  ]
}
```

### Create Activity
**POST** `/api/activities/`

**Request Body:**
```json
{
  "mission": 1,
  "type": "info",
  "message": "Custom activity message",
  "details": "Additional details",
  "metadata": {
    "custom_field": "value"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "field_name": ["Error message"]
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error."
}
```

---

## Mission Types
- `document_retrieval` - Document Retrieval
- `form_filling` - Form Filling
- `data_extraction` - Data Extraction
- `verification` - Verification
- `custom` - Custom

## Mission Status
- `pending` - Pending
- `initializing` - Initializing
- `running` - Running
- `paused` - Paused
- `completed` - Completed
- `failed` - Failed
- `cancelled` - Cancelled

## Priority Levels
- `low` - Low
- `medium` - Medium
- `high` - High
- `urgent` - Urgent

## Activity Types
- `info` - Information
- `success` - Success
- `warning` - Warning
- `error` - Error
- `milestone` - Milestone
- `action` - Action

## Document Types
- `pdf` - PDF
- `docx` - Word Document
- `xlsx` - Excel Spreadsheet
- `csv` - CSV
- `txt` - Text File
- `image` - Image
- `other` - Other

## Document Status
- `pending` - Pending
- `processing` - Processing
- `ready` - Ready
- `verified` - Verified
- `failed` - Failed
