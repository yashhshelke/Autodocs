from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Mission(models.Model):
    """Model for AI agent missions"""
    
    MISSION_TYPES = [
        ('document_retrieval', 'Document Retrieval'),
        ('form_filling', 'Form Filling'),
        ('data_extraction', 'Data Extraction'),
        ('verification', 'Verification'),
        ('custom', 'Custom'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('initializing', 'Initializing'),
        ('running', 'Running'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='missions')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=50, choices=MISSION_TYPES, default='document_retrieval')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    progress = models.IntegerField(default=0)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Estimated time
    estimated_duration = models.DurationField(null=True, blank=True)
    
    # Configuration
    config = models.JSONField(default=dict, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'status']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.get_status_display()}"
    
    def start(self):
        """Start the mission"""
        self.status = 'running'
        self.started_at = timezone.now()
        self.save()
    
    def pause(self):
        """Pause the mission"""
        self.status = 'paused'
        self.save()
    
    def resume(self):
        """Resume the mission"""
        self.status = 'running'
        self.save()
    
    def complete(self):
        """Mark mission as completed"""
        self.status = 'completed'
        self.progress = 100
        self.completed_at = timezone.now()
        self.save()
    
    def fail(self, reason=''):
        """Mark mission as failed"""
        self.status = 'failed'
        self.save()


class PlanStep(models.Model):
    """Model for mission execution plan steps"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('skipped', 'Skipped'),
    ]
    
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE, related_name='plan_steps')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='substeps')
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    order = models.IntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['order']
        indexes = [
            models.Index(fields=['mission', 'order']),
        ]
    
    def __str__(self):
        return f"{self.mission.title} - Step {self.order}: {self.title}"
