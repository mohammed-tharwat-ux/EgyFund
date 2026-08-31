from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render

def handler_404(request, exception):
    return render(request, '404.html', status=404)

def handler_500(request):
    return render(request, '500.html', status=500)

handler404 = handler_404
handler500 = handler_500

from users.views import admin_dashboard_view, admin_toggle_featured, admin_delete_comment, admin_delete_project, admin_add_category, admin_edit_category, admin_delete_category

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('admin/', admin_dashboard_view, name='custom_admin_dashboard'),
    path('users/', include('users.urls')),
    path('', include('projects.urls')), 

    path('admin/toggle-featured/<int:project_id>/', admin_toggle_featured, name='admin_toggle_featured'),
    path('admin/delete-comment/<int:comment_id>/', admin_delete_comment, name='admin_delete_comment'),
    path('admin/delete-project/<int:project_id>/', admin_delete_project, name='admin_delete_project'),
    path('admin/add-category/', admin_add_category, name='admin_add_category'),
    path('admin/edit-category/<int:category_id>/', admin_edit_category, name='admin_edit_category'),
    path('admin/delete-category/<int:category_id>/', admin_delete_category, name='admin_delete_category'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
