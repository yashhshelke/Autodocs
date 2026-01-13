from django.contrib import admin
from .models import Document


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    """Admin interface for Document model"""
    
    list_display = ['name', 'mission', 'file_type', 'status', 'is_verified', 'uploaded_at']
    list_filter = ['status', 'file_type', 'is_verified', 'uploaded_at']
    search_fields = ['name', 'description', 'mission__title']
    readonly_fields = ['file_size', 'uploaded_at', 'updated_at', 'verified_at', 'verified_by']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('mission', 'name', 'description', 'file', 'file_type', 'file_size')
        }),
        ('Status', {
            'fields': ('status', 'is_verified', 'verified_by', 'verified_at')
        }),
        ('Metadata', {
            'fields': ('metadata',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('uploaded_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
