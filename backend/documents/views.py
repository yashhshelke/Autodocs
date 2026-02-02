from rest_framework import generics, permissions
from .models import Document
from .serializers import DocumentSerializer


class DocumentListView(generics.ListCreateAPIView):
    """List all documents or create a new document"""
    serializer_class = DocumentSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        # Return documents from projects owned by the current user
        return Document.objects.filter(project__owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save()


class DocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a document"""
    serializer_class = DocumentSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        # Return documents from projects owned by the current user
        return Document.objects.filter(project__owner=self.request.user)
