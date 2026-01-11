from django.shortcuts import render

def index(request):
    """Landing page view"""
    return render(request, 'index.html')

def auth(request):
    """Authentication page view"""
    return render(request, 'auth.html')

def dashboard(request):
    """Dashboard page view"""
    return render(request, 'dashboard.html')

def workspace(request):
    """Live agent workspace view"""
    return render(request, 'workspace.html')
