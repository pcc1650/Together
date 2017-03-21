from django.shortcuts import render
from django.db.models import Q
# Create your views here.
from django.contrib.auth.models import User
from testApp.models import Invitation
from django.http import HttpResponse
from django.template import loader
from django.views.generic import View
from django.db import IntegrityError
from django.contrib.auth import authenticate
from django.contrib.auth import login, logout
from django.http import HttpResponseRedirect
from django.http import QueryDict
import json
import time
from django.http import HttpResponseRedirect


class MyRegistrationView(View):
    def get(self, request, *args, **kwargs):
        ret = {}
        return HttpResponse(json.dumps(ret), content_type='application/json')

    def post(self, request, *args, **kwargs):
        paras = request.POST
        user = paras['username']
        pwd = paras['password']
        ret = {}
        try:
            User.objects.create_user(username=user, password=pwd)
            ret['success'] = True
            ret['username'] = user
        except IntegrityError:
            ret['success'] = False
            ret['error'] = "This account has been registered!"
        return HttpResponse(json.dumps(ret), content_type='application/json')


class MyLoginView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'reactJS/webpackHTML.html')


class MyIndexView(View):
    def get(self, request, *args, **kwargs):
        # return HttpResponseRedirect('login.html')
        return HttpResponseRedirect('/testApp/')

    def post(self, request, *args, **kwargs):
        # request.POST when using JQuery
        # paras = request.POST
        paras = json.loads(request.body)
        user = paras['username']
        pwd = paras['password']
        user_login = authenticate(username=user, password=pwd)
        # template = loader.get_template('testApp/index.html')
        # context = {
        #     'username': user,
        # }
        ret = {}
        if user_login is not None:
            login(request, user_login)
            ret['username'] = user
            ret['success'] = True
            return HttpResponse(json.dumps(ret), content_type='application/json')
        else:
            ret['error'] = 'The username or password is wrong!'
            ret['success'] = False
            return HttpResponse(json.dumps(ret), content_type='application/json', status=401)


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


class MycheckLoginStateView(View):
    def get(self, request, *args, **kwargs):
        # import time
        # time.sleep(2)
        ret = {}
        print request.user.is_authenticated()
        if request.user.is_authenticated():
            ret['logined'] = True
            ret['user'] = request.user.username
            postdata = list()
            all_entries = Invitation.objects.all().order_by('-id')
            for e in all_entries:
                temp = dict()
                temp['pk'] = e.pk
                temp['title'] = e.title
                temp['content'] = e.description
                temp['author'] = e.author
                postdata.append(temp)
            ret['postData'] = postdata
            return HttpResponse(json.dumps(ret), content_type='application/json')
        else:
            ret['logined'] = False
            return HttpResponse(json.dumps(ret), content_type='application/json')


class MyPostView(View):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated():
            return HttpResponseRedirect("/testApp/")
        ret = dict()
        postdata = list()
        # all_entries = Invitation.objects.all().order_by('-id')
        all_entries = Invitation.objects.all().order_by('-id')
        for e in all_entries:
            temp = dict()
            temp['pk'] = e.pk
            temp['title'] = e.title
            temp['content'] = e.description
            temp['author'] = e.author
            postdata.append(temp)
        ret['postData'] = postdata
        # time.sleep(10)
        return HttpResponse(json.dumps(ret), content_type='application/json')

    def post(self, request, *args, **kwargs):
        paras = json.loads(request.body)
        title = paras['Title']
        contents = paras['Content']
        author = paras['Author']
        newPost = Invitation(title=title, description=contents, author=author)
        newPost.save()
        ret = {}
        ret['success'] = True
        return HttpResponse(json.dumps(ret), content_type='application/json', status=201)

    def put(self, request, id):
        paras = QueryDict(request.body)
        title = paras['Title']
        content = paras['Content']
        post = Invitation.objects.get(pk=id)
        post.title = title
        post.description = content
        post.save()
        ret = dict()
        ret['test'] = 'test'
        return HttpResponse(json.dumps(ret), content_type='application/json', status=204)

    def delete(self, request, id):
        post = Invitation.objects.get(pk=id)
        post.delete()
        ret = dict()
        return HttpResponse(json.dumps(ret), content_type='application/json', status=204)


# class MyGetPostsView(View):
#     def get(self, request, *args, **kwargs):
#         ret = dict()
#         postData = dict()
#         all_entries = Invitation.objects.all()
#         for e in all_entries:
#             temp = dict()
#             temp['pk'] = e.pk
#             temp['title'] = e.title
#             temp['content'] = e.description
#             temp['author'] = e.author
#             postData[temp['pk']] = temp
#         ret['postData'] = postData
#         # time.sleep(10)
#         return HttpResponse(json.dumps(ret), content_type='application/json')


class MySearchView(View):
    def post(self, request, *args, **kwargs):
        ret = dict()
        search_ret = list()
        paras = request.POST
        searchContent = paras['search']
        search_entries = Invitation.objects.filter(Q(title__icontains=searchContent) | Q(description__icontains=searchContent)).order_by('-id')
        if search_entries:
            ret['success'] = True
        else:
            ret['error'] = 'No matching result!'
        for e in search_entries:
            temp=dict()
            temp['pk'] = e.pk
            temp['title'] = e.title
            temp['content'] = e.description
            temp['author'] = e.author
            search_ret.append(temp)
        ret['searchResult'] = search_ret
        return HttpResponse(json.dumps(ret), content_type='application/json')


class MyManageView(View):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated():
            return HttpResponseRedirect("/testApp/")
        ret = dict()
        myPosts_ret = list()
        user = request.user
        search_entries = Invitation.objects.filter(author=user).order_by('-id')
        if search_entries:
            ret['success'] = True
            for e in search_entries:
                temp = dict()
                temp['pk'] = e.pk
                temp['title'] = e.title
                temp['content'] = e.description
                temp['author'] = e.author
                myPosts_ret.append(temp)
            ret['myPostsData'] = myPosts_ret
            print myPosts_ret
        else:
            ret['success'] = False
            ret['error'] = 'No matching result!'
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
