from django.shortcuts import render,redirect
from django.http import HttpResponse, JsonResponse
from django.template import RequestContext, loader, Context
import json

from django.contrib.auth.models import User
from django import forms

from django.contrib.auth import authenticate, login, logout, get_user
from django.contrib.auth.decorators import login_required

from .models import UserProfile
from stackExchange.models import Tag

import datetime

class ProfileForm(forms.Form):
    first_name = forms.CharField(required=False,max_length=255)
    last_name = forms.CharField(required=False,max_length=255)
    email = forms.EmailField(required=False)
    birthday = forms.DateField(required=False,input_formats=['%Y/%m/%d'])


# This functions used for user's adding follew to a tag
# The return state: 'ok' or 'failed'
# If the state is ok:
# Front end can get more infomation about the user's saved tags
# The attributes can see below
@login_required
def like_tag(request):
    user = get_user(request)
    profile = user.userprofile
    tags = Tag.objects.all()[request.session['tagLastStartPos']:request.session['tagStartPos']]
    if 'tag_name' in request.GET:
        print(request.GET['tag_name'])
        try:
            tag = Tag.objects.get(name=request.GET['tag_name'])
            profile.saved_tags.add(tag)
            profile.save()
        except:
            JsonResponse({'state':'failed'})
            pass
    return JsonResponse({'state': 'ok',
                         'user':user,
                         'profile':profile,
                         'tags':tags,
                         'saved_tags':profile.saved_tags.all(),
                         'saved_tags_count':profile.saved_tags.count(),
                         'questions_count':profile.questions.count(),
                         'answers_count':profile.questions.count(),
                         'created_days':(datetime.date.today()-profile.creation_date).days})

# This functions used for user's cancel follew to a tag
# The return state: 'ok' or 'failed'
# If the state is ok:
# Front end can get more infomation about the user's saved tags
# The attributes can see below   
@login_required
def dislike_tag(request):
    user = get_user(request)
    profile = user.userprofile
    tags = Tag.objects.all()[request.session['tagLastStartPos']:request.session['tagStartPos']]
    if 'tag_name' in request.GET:
        print(request.GET['tag_name'])
        try:
            tag = Tag.objects.get(name=request.GET['tag_name'])
            profile.saved_tags.remove(tag)
            profile.save()
        except:
            JsonResponse({'state':'failed'})
            pass
    return JsonResponse({'state': 'ok',
                         'user':user,
                         'profile':profile,
                         'tags':tags,
                         'saved_tags':profile.saved_tags.all(),
                         'saved_tags_count':profile.saved_tags.count(),
                         'questions_count':profile.questions.count(),
                         'answers_count':profile.questions.count(),
                         'created_days':(datetime.date.today()-profile.creation_date).days})

# This functions used for getting tags
# The return state: 'ok' or 'failed'
# If the state is ok:
# Front end can get more infomation about the user's saved tags
# The attributes can see below  
@login_required
def get_tags(request):
    startPos = request.session['tagStartPos']
    step = 2
    if 'requiredTagCount' in request.POST:
        step = int(request.POST['requiredTagCount'])
    print(startPos)
    print(step)
    tags = Tag.objects.all()[startPos:startPos+step]
    request.session['tagStartPos'] = startPos + step
    request.session['tagLastStartPos'] = startPos
    user = get_user(request)
    profile = user.userprofile
    return JsonResponse({'state': 'ok',
                         'user':user,
                         'profile':profile,
                         'tags':tags,
                         'saved_tags':profile.saved_tags.all(),
                         'saved_tags_count':profile.saved_tags.count(),
                         'questions_count':profile.questions.count(),
                         'answers_count':profile.questions.count(),
                         'created_days':(datetime.date.today()-profile.creation_date).days})

# This function used for getting some setted informations
@login_required
def get_settings(request):
    user = get_user(request)
    profile = user.userprofile
    return JsonResponse({'user':user,
                         'profile':profile,
                         'birthday':profile.birthday.strftime('%Y/%m/%d')})
    
@login_required
def home(request):
    if request.method == 'POST':
        form = ProfileForm(request.POST)
        if form.is_valid():
            user = get_user(request)
            fields = form.cleaned_data
            if 'first_name' in fields:
                user.first_name = fields['first_name']
            if 'last_name' in fields:
                user.last_name = fields['last_name']
            if 'email' in fields:
                user.email = fields['email']
            user.save()
            profile = user.userprofile
            if 'birthday' in form.fields:
                profile.birthday = fields['birthday']
            profile.save()
        return HttpResponse(json.dumps({'isOK':True if form.is_valid() else False}),
                                       content_type='application/json')
    user = get_user(request)
    profile = user.userprofile
    request.session['tagLastStartPos'] = 0
    request.session['tagStartPos'] = 2
    tags = Tag.objects.all()[0:2]
    
    return JsonResponse({'user': user,
                         'profile': profile,
                         'tags':tags,
                         'birthday':profile.birthday.strftime('%Y/%m/%d'),
                         'saved_tags':profile.saved_tags.all(),
                         'saved_tags_count':profile.saved_tags.count(),
                         'questions_count':profile.questions.count(),
                         'answers_count':profile.questions.count(),
                         'created_days':(datetime.date.today()-profile.creation_date).days})

# This function is used for user's regest:
# If the request.method == GET, means don't carry any info.
# The return state
#       "ok"     :   regest success
#       "fail"   :   the infomation has error, need refill the info
# The error infomation
#       Through 'errors', front end can get the error info. 
# Warming!
# Compared with the alpha version, we don't have redirect logic here. 
def signup(request):
    if request.method == 'POST':
        errors = list()
        if 'username' not in request.POST:
            errors.append('Missing username')
        if 'password' not in request.POST:
            errors.append('Missing password')
        if 'repassword' not in request.POST:
            errors.append('Missing repassword')
        if 'email' not in request.POST:
            errors.append('Missing email')

        if not errors:
            password = request.POST['password']
            repassword = request.POST['repassword']
            if password != repassword:
                errors.append('password and repassword is not same')
            else:
                if User.objects.filter(username=request.POST['username']).count() is 0: 
                    user = User.objects.create_user(username=request.POST['username'],
                                                    email=request.POST['email'],
                                                    password=request.POST['password'])
                    user.is_active = True
                    user.save()
                    profile = UserProfile()
                    profile.user = user
                    profile.save()
                    return JsonResponse({'state':'ok', 'is_new_user':True})
                else:
                    print(User.objects.filter(username=request.POST['username']))
                    errors.append('The username have already been used')
        for error in errors:
            print(error)
        return JsonResponse({'state':'failed', 'errors' : errors})
    return render(request,'signup.djhtml',RequestContext(request))


# This function used for user's login
# If the request.method == GET, means don't carry any info.
# The return state
#       "ok"     :   login success 
#       "missing":   don't have such a user or wrong password
#       "failed" :   other errors
# The return is_new_user: true or false
def signin(request,is_new_user):
    if request.method == 'POST':
        username = ""
        password = ""
        try:
            username = request.POST['username']
            password = request.POST['password']
        except:
            return JsonResponse({'state':'failed', 'is_new_user': is_new_user})
        user = authenticate(username=username,password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return JsonResponse({'state':'ok', 'is_new_user': is_new_user})
            else:
                return JsonResponse({'state':'failed', 'is_new_user': is_new_user})
        else:
            return JsonResponse({'state':'missing', 'is_new_user': is_new_user})
    return render(request,
                  'signin.djhtml',
                  RequestContext(request,{'new':is_new_user}))


# This function used for user's logout
# logout button will show only when the user has logged in, so logout is sure to success.
def logout_view(request):
    logout(request)
    return JsonResponse({'state':'ok'})


# This function used for update the user infomation
# Cause user is no need to give all informations
# So we just get the info been posted
# Warming!
# The setting information is disharmony between database and interface, may have error.
@login_required
def updateprofile(request):
    if request.method == 'POST':
        email = ""
        realname = ""
        description = ""
        try:
            email = request.POST['email']
            realname = request.POST['realname']
            description = request.POST['description']
        except:
            pass
        user = get_user(request)
        profile = user.userprofile
        user.email = email
        user.first_name = realname
        user.save()
        profile.display = description
        profile.save();
        return JsonResponse({'state':'ok'})


# This function is for getting infomation about the user
# Warming!
# The setting information is disharmony between database and interface, may have error.
@login_required
def userinfo(request):
    user = get_user(request)
    profile = user.userprofile
    return JsonResponse({'state': 'ok',
                         'user':user,
                         'profile':profile,
                         'saved_tags':profile.saved_tags.all(),
                         'saved_tags_count':profile.saved_tags.count(),
                         'questions_count':profile.questions.count(),
                         'answers_count':profile.questions.count(),
                         'created_days':(datetime.date.today()-profile.creation_date).days})







