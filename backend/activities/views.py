from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Activity
from .serializers import ActivitySerializer, ActivityCreateSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    """ViewSet for Activity CRUD operations"""
    
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return activities for missions owned by current user"""
        queryset = Activity.objects.filter(mission__user=self.request.user)
        
        # Filter by mission if provided
        mission_id = self.request.query_params.get('mission', None)
        if mission_id:
            queryset = queryset.filter(mission_id=mission_id)
        
        # Filter by type if provided
        activity_type = self.request.query_params.get('type', None)
        if activity_type:
            queryset = queryset.filter(type=activity_type)
        
        return queryset
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action in ['create', 'update', 'partial_update']:
            return ActivityCreateSerializer
        return ActivitySerializer
