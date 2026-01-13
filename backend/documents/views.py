from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from .models import Document
from .serializers import DocumentSerializer, DocumentUploadSerializer
from activities.models import Activity


class DocumentViewSet(viewsets.ModelViewSet):
    """ViewSet for Document CRUD operations"""
    
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return documents for missions owned by current user"""
        return Document.objects.filter(mission__user=self.request.user)
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action in ['create', 'update', 'partial_update']:
            return DocumentUploadSerializer
        return DocumentSerializer
    
    def get_serializer_context(self):
        """Add request to serializer context"""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        """Download a document"""
        document = self.get_object()
        
        # Log download activity
        Activity.log(
            mission=document.mission,
            type='action',
            message=f'Document downloaded: {document.name}',
            details=f'User {request.user.username} downloaded {document.name}'
        )
        
        return FileResponse(
            document.file.open('rb'),
            as_attachment=True,
            filename=document.name
        )
    
    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        """Verify a document"""
        document = self.get_object()
        document.verify(request.user)
        
        # Log verification activity
        Activity.log(
            mission=document.mission,
            type='success',
            message=f'Document verified: {document.name}',
            details=f'Verified by {request.user.username}'
        )
        
        serializer = self.get_serializer(document)
        return Response(serializer.data)
