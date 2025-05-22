from django.urls import path
from . import views

urlpatterns = [
    path('get/', views.get_product),
    path('add/', views.add_product),
    path('update/<int:product_id>/', views.update_product),
    path('delete/<int:product_id>/', views.delete_product),
]
