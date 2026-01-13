from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Mission, PlanStep
from .serializers import (
    MissionListSerializer, 
    MissionDetailSerializer, 
    MissionCreateSerializer,
    PlanStepSerializer
)
from activities.models import Activity


class MissionViewSet(viewsets.ModelViewSet):
    """ViewSet for Mission CRUD operations"""
    
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return missions for current user"""
        return Mission.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return MissionListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return MissionCreateSerializer
        return MissionDetailSerializer
    
    def perform_create(self, serializer):
        """Create mission for current user"""
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def start(self, request, pk=None):
        """Start a mission"""
        mission = self.get_object()
        mission.start()
        
        Activity.log(
            mission=mission,
            type='milestone',
            message='Mission started',
            details=f'Mission "{mission.title}" has been started'
        )
        
        serializer = self.get_serializer(mission)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def pause(self, request, pk=None):
        """Pause a mission"""
        mission = self.get_object()
        mission.pause()
        
        Activity.log(
            mission=mission,
            type='warning',
            message='Mission paused',
            details=f'Mission "{mission.title}" has been paused'
        )
        
        serializer = self.get_serializer(mission)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def resume(self, request, pk=None):
        """Resume a paused mission"""
        mission = self.get_object()
        mission.resume()
        
        Activity.log(
            mission=mission,
            type='info',
            message='Mission resumed',
            details=f'Mission "{mission.title}" has been resumed'
        )
        
        serializer = self.get_serializer(mission)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Mark mission as completed"""
        mission = self.get_object()
        mission.complete()
        
        Activity.log(
            mission=mission,
            type='success',
            message='Mission completed',
            details=f'Mission "{mission.title}" has been completed successfully'
        )
        
        # Update user stats
        if hasattr(request.user, 'profile'):
            request.user.profile.update_mission_stats()
        
        serializer = self.get_serializer(mission)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def activity(self, request, pk=None):
        """Get mission activity log"""
        mission = self.get_object()
        activities = mission.activities.all()
        
        from activities.serializers import ActivitySerializer
        serializer = ActivitySerializer(activities, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def documents(self, request, pk=None):
        """Get mission documents"""
        mission = self.get_object()
        documents = mission.documents.all()
        
        from documents.serializers import DocumentSerializer
        serializer = DocumentSerializer(documents, many=True, context={'request': request})
        return Response(serializer.data)


class PlanStepViewSet(viewsets.ModelViewSet):
    """ViewSet for PlanStep CRUD operations"""
    
    permission_classes = [IsAuthenticated]
    serializer_class = PlanStepSerializer
    
    def get_queryset(self):
        """Return plan steps for missions owned by current user"""
        return PlanStep.objects.filter(mission__user=self.request.user)
