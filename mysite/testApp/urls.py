from django.conf.urls import url
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^$', views.MyIndexView.as_view()),
    url(r'^index', views.MyIndexView.as_view()),
    url(r'^register', views.MyRegistrationView.as_view()),
    url(r'^logout', views.MyLogoutView.as_view()),
    url(r'^post$', views.MyPostView.as_view()),
    url(r'^post/(?P<id>\d+)$', views.MyPostView.as_view()),
    url(r'^checkLoginState', views.MycheckLoginStateView.as_view()),
    url(r'^search', views.MySearchView.as_view()),
    url(r'^manage', views.MyManageView.as_view()),
    # url(r'^invitation/(?P<id>\d+)', views.MyPostView.as_view())

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
