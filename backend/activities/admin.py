from django.contrib import admin
from .models import Activity


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    """Admin interface for Activity model"""
    
    list_display = ['mission', 'type', 'message', 'timestamp']
    list_filter = ['type', 'timestamp']
    search_fields = ['message', 'details', 'mission__title']
    readonly_fields = ['timestamp']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('mission', 'type', 'message', 'details')
        }),
        ('Metadata', {
            'fields': ('metadata',),
            'classes': ('collapse',)
        }),
        ('Timestamp', {
            'fields': ('timestamp',)
        }),
    )
    
    def has_add_permission(self, request):
        """Disable manual activity creation in admin"""
        return False
