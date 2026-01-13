from rest_framework import serializers
from .models import Document


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for Document model"""
    
    mission_title = serializers.CharField(source='mission.title', read_only=True)
    verified_by_name = serializers.CharField(source='verified_by.username', read_only=True)
    file_size_mb = serializers.ReadOnlyField()
    file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Document
        fields = [
            'id', 'mission', 'mission_title', 'name', 'file', 'file_url',
            'file_type', 'file_size', 'file_size_mb', 'status',
            'description', 'metadata', 'is_verified', 'verified_by',
            'verified_by_name', 'verified_at', 'uploaded_at', 'updated_at'
        ]
        read_only_fields = ['file_size', 'is_verified', 'verified_by', 'verified_at']
    
    def get_file_url(self, obj):
        """Get absolute URL for file"""
        request = self.context.get('request')
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return None


class DocumentUploadSerializer(serializers.ModelSerializer):
    """Serializer for uploading documents"""
    
    class Meta:
        model = Document
        fields = ['mission', 'name', 'file', 'file_type', 'description', 'metadata']
    
    def create(self, validated_data):
        """Create document and set file size"""
        file = validated_data.get('file')
        if file:
            validated_data['file_size'] = file.size
        
        document = Document.objects.create(**validated_data)
        
        # Log document upload
        from activities.models import Activity
        Activity.log(
            mission=document.mission,
            type='success',
            message=f'Document uploaded: {document.name}',
            details=f'File size: {document.file_size_mb} MB'
        )
        
        return document
