from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render

# ── Custom error handlers ──────────────────────────────────────────────────
def handler_404(request, exception):
    return render(request, '404.html', status=404)

def handler_500(request):
    return render(request, '500.html', status=500)

handler404 = handler_404
handler500 = handler_500
# ──────────────────────────────────────────────────────────────────────────

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('', include('projects.urls')), 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)