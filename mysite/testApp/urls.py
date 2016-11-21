from django.conf.urls import url
from . import views

urlpatterns = [
    # url(r'^$', views.index, name='index1'),
    # url(r'^createUser$', views.createUser, name='createUser1'),
    url(r'^$', views.MyIndexView.as_view()),
    url(r'^index', views.MyIndexView.as_view()),
    url(r'^register', views.MyRegistrationView.as_view()),
    url(r'^login', views.MyLoginView.as_view()),
    url(r'^logout', views.MyLogoutView.as_view()),
]
