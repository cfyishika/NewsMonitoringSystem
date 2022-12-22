from django.urls import path

from . import views

app_name = 'myNewsApp'

urlpatterns = [
    path("", views.login, name="login"),
    path("register", views.register, name="register"),
    path("home", views.index, name="home"),
    path("logout", views.logout, name='logout'),
    path('forget_password', views.forget_password,
         name='forget_password'),
    path('fetching/<int:pk>',views.fetching,name='source_fetching'),

]
