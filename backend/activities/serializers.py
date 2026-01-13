from rest_framework import serializers
from .models import Activity


class ActivitySerializer(serializers.ModelSerializer):
    """Serializer for Activity model"""
    
    mission_title = serializers.CharField(source='mission.title', read_only=True)
    type_display = serializers.CharField(source='get_type_display', read_only=True)
    
    class Meta:
        model = Activity
        fields = [
            'id', 'mission', 'mission_title', 'type', 'type_display',
            'message', 'details', 'metadata', 'timestamp'
        ]
        read_only_fields = ['timestamp']


class ActivityCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating activities"""
    
    class Meta:
        model = Activity
        fields = ['mission', 'type', 'message', 'details', 'metadata']
