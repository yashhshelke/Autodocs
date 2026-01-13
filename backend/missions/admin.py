from django.contrib import admin
from .models import Mission, PlanStep


@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    """Admin interface for Mission model"""
    
    list_display = ['title', 'user', 'type', 'status', 'priority', 'progress', 'created_at']
    list_filter = ['status', 'type', 'priority', 'created_at']
    search_fields = ['title', 'description', 'user__username']
    readonly_fields = ['created_at', 'updated_at', 'started_at', 'completed_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('user', 'title', 'description', 'type')
        }),
        ('Status', {
            'fields': ('status', 'progress', 'priority')
        }),
        ('Timing', {
            'fields': ('estimated_duration', 'created_at', 'started_at', 'completed_at', 'updated_at')
        }),
        ('Configuration', {
            'fields': ('config',),
            'classes': ('collapse',)
        }),
    )


@admin.register(PlanStep)
class PlanStepAdmin(admin.ModelAdmin):
    """Admin interface for PlanStep model"""
    
    list_display = ['title', 'mission', 'order', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['title', 'description', 'mission__title']
    readonly_fields = ['created_at', 'started_at', 'completed_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('mission', 'parent', 'title', 'description', 'order')
        }),
        ('Status', {
            'fields': ('status', 'started_at', 'completed_at')
        }),
    )
