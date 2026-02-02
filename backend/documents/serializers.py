from rest_framework import serializers
from .models import Document


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for document data"""
    project_name = serializers.CharField(source='project.title', read_only=True)
    
    class Meta:
        model = Document
        fields = ('id', 'name', 'description', 'project', 'project_name', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')
