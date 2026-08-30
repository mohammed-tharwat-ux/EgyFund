from django.urls import path
from . import views

app_name = 'projects'

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('create/', views.create_project, name='create_project'),
    path('project/<int:project_id>/', views.project_details, name='project_details'),
]