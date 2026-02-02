from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for project data"""
    owner_email = serializers.CharField(source='owner.email', read_only=True)
    document_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = ('id', 'title', 'description', 'owner', 'owner_email', 'document_count', 'created_at', 'updated_at')
        read_only_fields = ('id', 'owner', 'created_at', 'updated_at')
    
    def get_document_count(self, obj):
        return obj.document_set.count()
