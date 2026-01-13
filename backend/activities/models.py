from django.db import models
from missions.models import Mission


class Activity(models.Model):
    """Model for tracking mission activity logs"""
    
    TYPE_CHOICES = [
        ('info', 'Information'),
        ('success', 'Success'),
        ('warning', 'Warning'),
        ('error', 'Error'),
        ('milestone', 'Milestone'),
        ('action', 'Action'),
    ]
    
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE, related_name='activities')
    
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='info')
    message = models.CharField(max_length=500)
    details = models.TextField(blank=True)
    
    # Additional context
    metadata = models.JSONField(default=dict, blank=True)
    
    # Timestamp
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        verbose_name_plural = 'Activities'
        indexes = [
            models.Index(fields=['mission', '-timestamp']),
            models.Index(fields=['type']),
        ]
    
    def __str__(self):
        return f"[{self.get_type_display()}] {self.message}"
    
    @classmethod
    def log(cls, mission, type, message, details='', metadata=None):
        """Helper method to create activity log"""
        return cls.objects.create(
            mission=mission,
            type=type,
            message=message,
            details=details,
            metadata=metadata or {}
        )
