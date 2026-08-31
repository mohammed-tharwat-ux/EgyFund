from django.urls import path
from . import views

app_name = 'projects'

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('create/', views.create_project, name='create_project'),
    path('project/<int:project_id>/', views.project_details, name='project_details'),
    path('project/<int:project_id>/donate/', views.make_donation, name='make_donation'),
    path('category/<int:category_id>/', views.category_projects, name='category_projects'),

    path('project/<int:project_id>/comment/', views.add_comment, name='add_comment'),
    path('project/<int:project_id>/comment/<int:comment_id>/reply/', views.add_reply, name='add_reply'),
    path('project/<int:project_id>/report/', views.report_project, name='report_project'),
    path('project/<int:project_id>/comment/<int:comment_id>/report/', views.report_comment, name='report_comment'),

    path('all/', views.all_projects, name='all_projects'),
    path('search/', views.search_projects, name='search_projects'),
    path('fund/', views.go_fund, name='go_fund'),
    path('info/<str:page_name>/', views.generic_page, name='generic_page'),
]

