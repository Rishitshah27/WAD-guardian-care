from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProviderViewSet, UserProfileViewSet, BookingViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'providers', ProviderViewSet)
router.register(r'users', UserProfileViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
