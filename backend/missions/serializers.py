from rest_framework import serializers
from .models import Mission, PlanStep
from activities.models import Activity
from documents.models import Document


class PlanStepSerializer(serializers.ModelSerializer):
    """Serializer for PlanStep model"""
    
    substeps = serializers.SerializerMethodField()
    
    class Meta:
        model = PlanStep
        fields = [
            'id', 'title', 'description', 'status', 'order',
            'started_at', 'completed_at', 'substeps'
        ]
    
    def get_substeps(self, obj):
        """Get nested substeps"""
        substeps = obj.substeps.all()
        return PlanStepSerializer(substeps, many=True).data


class MissionListSerializer(serializers.ModelSerializer):
    """Serializer for Mission list view"""
    
    user_name = serializers.CharField(source='user.username', read_only=True)
    document_count = serializers.SerializerMethodField()
    activity_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Mission
        fields = [
            'id', 'title', 'description', 'type', 'status', 'progress',
            'priority', 'created_at', 'started_at', 'completed_at',
            'estimated_duration', 'user_name', 'document_count', 'activity_count'
        ]
    
    def get_document_count(self, obj):
        return obj.documents.count()
    
    def get_activity_count(self, obj):
        return obj.activities.count()


class MissionDetailSerializer(serializers.ModelSerializer):
    """Serializer for Mission detail view"""
    
    user_name = serializers.CharField(source='user.username', read_only=True)
    plan_steps = PlanStepSerializer(many=True, read_only=True)
    recent_activities = serializers.SerializerMethodField()
    documents = serializers.SerializerMethodField()
    
    class Meta:
        model = Mission
        fields = [
            'id', 'title', 'description', 'type', 'status', 'progress',
            'priority', 'created_at', 'started_at', 'completed_at',
            'updated_at', 'estimated_duration', 'config', 'user_name',
            'plan_steps', 'recent_activities', 'documents'
        ]
    
    def get_recent_activities(self, obj):
        """Get recent activities (last 10)"""
        from activities.serializers import ActivitySerializer
        activities = obj.activities.all()[:10]
        return ActivitySerializer(activities, many=True).data
    
    def get_documents(self, obj):
        """Get mission documents"""
        from documents.serializers import DocumentSerializer
        documents = obj.documents.all()
        return DocumentSerializer(documents, many=True).data


class MissionCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating missions"""
    
    class Meta:
        model = Mission
        fields = [
            'title', 'description', 'type', 'priority',
            'estimated_duration', 'config'
        ]
    
    def create(self, validated_data):
        """Create mission with current user"""
        user = self.context['request'].user
        mission = Mission.objects.create(user=user, **validated_data)
        
        # Log creation activity
        Activity.log(
            mission=mission,
            type='info',
            message='Mission created',
            details=f'Mission "{mission.title}" has been created'
        )
        
        return mission
