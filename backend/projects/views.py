from rest_framework import generics, permissions
from .models import Project
from .serializers import ProjectSerializer


class ProjectListView(generics.ListCreateAPIView):
    """List all projects or create a new project"""
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        # Return projects owned by the current user
        return Project.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a project"""
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        # Return projects owned by the current user
        return Project.objects.filter(owner=self.request.user)
