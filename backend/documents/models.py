from django.db import models
from missions.models import Mission


class Document(models.Model):
    """Model for documents generated or processed by missions"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('ready', 'Ready'),
        ('verified', 'Verified'),
        ('failed', 'Failed'),
    ]
    
    TYPE_CHOICES = [
        ('pdf', 'PDF'),
        ('docx', 'Word Document'),
        ('xlsx', 'Excel Spreadsheet'),
        ('csv', 'CSV'),
        ('txt', 'Text File'),
        ('image', 'Image'),
        ('other', 'Other'),
    ]
    
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE, related_name='documents')
    
    name = models.CharField(max_length=200)
    file = models.FileField(upload_to='documents/%Y/%m/%d/')
    file_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='pdf')
    file_size = models.BigIntegerField(default=0)  # in bytes
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Metadata
    description = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    # Verification
    is_verified = models.BooleanField(default=False)
    verified_by = models.ForeignKey(
        'auth.User', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='verified_documents'
    )
    verified_at = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-uploaded_at']
        indexes = [
            models.Index(fields=['mission', 'status']),
            models.Index(fields=['uploaded_at']),
        ]
    
    def __str__(self):
        return f"{self.name} ({self.mission.title})"
    
    def verify(self, user):
        """Mark document as verified"""
        from django.utils import timezone
        self.is_verified = True
        self.verified_by = user
        self.verified_at = timezone.now()
        self.status = 'verified'
        self.save()
    
    @property
    def file_size_mb(self):
        """Return file size in MB"""
        return round(self.file_size / (1024 * 1024), 2)
