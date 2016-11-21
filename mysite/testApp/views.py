from django.shortcuts import render

# Create your views here.
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.template import loader
from django.views.generic import View
from django.db import IntegrityError
from django.contrib.auth import authenticate
from django.contrib.auth import login, logout
from django.http import HttpResponseRedirect
import json


class MyRegistrationView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'testApp/register.html')

    def post(self, request, *args, **kwargs):
        paras = request.POST
        user = paras['username']
        pwd = paras['password']
        try:
            User.objects.create_user(username=user, password=pwd)
            template = loader.get_template('testApp/createSuccessfully.html')
        except IntegrityError:
            template = loader.get_template('testApp/createFailed.html')
        return HttpResponse(template.render(request))


class MyLoginView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'testApp/login.html')


class MyIndexView(View):
    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect('login.html')

    def post(self, request, *args, **kwargs):
        paras = request.POST
        user = paras['username']
        pwd = paras['password']
        user_login = authenticate(username=user, password=pwd)
        template = loader.get_template('testApp/index.html')
        context = {
            'username': user,
        }
        if user_login is not None:
            login(request, user_login)
            return HttpResponse(template.render(context, request))
        else:
            return HttpResponse('The username or password is wrong!')


class MyLogoutView(View):
    def get(self, request, *args, **kwargs):
        ret = {}
        if not request.user.is_authenticated():
            ret['success'] = False
            ret['error'] = 'Should login first'
        else:
            logout(request)
            ret['success'] = True
            ret['data'] = 'logout successfully!'

        return HttpResponse(json.dumps(ret), content_type='application/json')

        # def index(request):
        #     # template = loader.get_template('testApp/index.html')
        #     # return HttpResponse(template.render(request))
        #     return render(request, 'testApp/index.html')
        #
        #
        # def createUser(request):
        #     paras = request.POST
        #     user = paras['username']
        #     pwd = paras['password']
        #     User.objects.create_user(username=user, password=pwd)
        #     template = loader.get_template('testApp/createSuccessfully.html')
        #     return HttpResponse(template.render(request))
