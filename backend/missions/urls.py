from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MissionViewSet, PlanStepViewSet

router = DefaultRouter()
router.register(r'missions', MissionViewSet, basename='mission')
router.register(r'plan-steps', PlanStepViewSet, basename='planstep')

urlpatterns = [
    path('', include(router.urls)),
]
