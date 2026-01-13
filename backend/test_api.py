"""
Simple test script to verify the AutoDocs API is working correctly.
Run this after starting the development server.
"""

import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_api():
    print("🧪 Testing AutoDocs API...\n")
    
    # Test 1: Register a user
    print("1️⃣ Testing user registration...")
    register_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpass123",
        "password_confirm": "testpass123",
        "first_name": "Test",
        "last_name": "User"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register/", json=register_data)
        if response.status_code == 201:
            print("✅ User registration successful!")
            data = response.json()
            access_token = data['tokens']['access']
            print(f"   Access token: {access_token[:20]}...")
        else:
            print(f"⚠️  Registration returned status {response.status_code}")
            print(f"   Response: {response.text}")
            # Try to login instead
            print("\n   Trying to login with existing user...")
            login_data = {
                "username": "testuser",
                "password": "testpass123"
            }
            response = requests.post(f"{BASE_URL}/auth/login/", json=login_data)
            if response.status_code == 200:
                print("✅ Login successful!")
                data = response.json()
                access_token = data['access']
            else:
                print("❌ Login failed!")
                return
    except Exception as e:
        print(f"❌ Error: {e}")
        return
    
    # Test 2: Get current user
    print("\n2️⃣ Testing get current user...")
    headers = {"Authorization": f"Bearer {access_token}"}
    
    try:
        response = requests.get(f"{BASE_URL}/auth/user/", headers=headers)
        if response.status_code == 200:
            print("✅ Get current user successful!")
            user = response.json()
            print(f"   Username: {user['username']}")
            print(f"   Email: {user['email']}")
        else:
            print(f"❌ Failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 3: Create a mission
    print("\n3️⃣ Testing mission creation...")
    mission_data = {
        "title": "Test Mission",
        "description": "This is a test mission",
        "type": "document_retrieval",
        "priority": "medium"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/missions/", json=mission_data, headers=headers)
        if response.status_code == 201:
            print("✅ Mission creation successful!")
            mission = response.json()
            mission_id = mission['id']
            print(f"   Mission ID: {mission_id}")
            print(f"   Title: {mission['title']}")
            print(f"   Status: {mission['status']}")
        else:
            print(f"❌ Failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return
    except Exception as e:
        print(f"❌ Error: {e}")
        return
    
    # Test 4: List missions
    print("\n4️⃣ Testing list missions...")
    try:
        response = requests.get(f"{BASE_URL}/missions/", headers=headers)
        if response.status_code == 200:
            print("✅ List missions successful!")
            data = response.json()
            print(f"   Total missions: {data['count']}")
        else:
            print(f"❌ Failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 5: Start mission
    print("\n5️⃣ Testing start mission...")
    try:
        response = requests.post(f"{BASE_URL}/missions/{mission_id}/start/", headers=headers)
        if response.status_code == 200:
            print("✅ Start mission successful!")
            mission = response.json()
            print(f"   Status: {mission['status']}")
        else:
            print(f"❌ Failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 6: Get mission activities
    print("\n6️⃣ Testing get mission activities...")
    try:
        response = requests.get(f"{BASE_URL}/missions/{mission_id}/activity/", headers=headers)
        if response.status_code == 200:
            print("✅ Get activities successful!")
            activities = response.json()
            print(f"   Total activities: {len(activities)}")
            if activities:
                print(f"   Latest: {activities[0]['message']}")
        else:
            print(f"❌ Failed with status {response.status_code}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    print("\n✨ API testing complete!")

if __name__ == "__main__":
    print("=" * 50)
    print("AutoDocs API Test Script")
    print("=" * 50)
    print("\nMake sure the Django server is running:")
    print("  python manage.py runserver\n")
    
    try:
        test_api()
    except KeyboardInterrupt:
        print("\n\n⚠️  Test interrupted by user")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
