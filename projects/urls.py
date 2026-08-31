from django.urls import path
from . import views

app_name = 'projects'

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('create/', views.create_project, name='create_project'),
    path('project/<int:project_id>/', views.project_details, name='project_details'),
    path('project/<int:project_id>/donate/', views.make_donation, name='make_donation'),
    path('category/<int:category_id>/', views.category_projects, name='category_projects'),
]