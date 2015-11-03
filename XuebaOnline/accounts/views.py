from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.template import RequestContext, loader, Context
import json

from django.contrib.auth.models import User
from django import forms

from django.contrib.auth import authenticate, login, logout, get_user
from django.contrib.auth.decorators import login_required

from .models import UserProfile

class ProfileForm(forms.Form):
    first_name = forms.CharField(required=False,max_length=255)
    last_name = forms.CharField(required=False,max_length=255)
    email = forms.EmailField(required=False)
    birthday = forms.DateField(required=False,input_formats=['%Y/%m/%d'])

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
    return HttpResponse(loader.get_template('home.djhtml').render(RequestContext(request,{"user": user,"profile": profile})))

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
                    return redirect(signin,is_new_user=True)
                else:
                    print(User.objects.filter(username=request.POST['username']))
                    errors.append('The username have already been used')
        for error in errors:
            print(error)
        return render(request,
                      'signup.djhtml',
                      RequestContext(request,{'errors':errors}))
    return render(request,'signup.djhtml',RequestContext(request))

def signin(request,is_new_user):
    if request.method == 'POST':
        username = ""
        password = ""
        try:
            username = request.POST['username']
            password = request.POST['password']
            # print(username,password)
        except:
            return render(request,
                          'signin.djhtml',
                          RequestContext(request,{'new':is_new_user,'errormsg':"Missing username or password"}))
        user = authenticate(username=username,password=password)
        # print(user)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('/accounts/')
            else:
                return render(request,
                          'signin.djhtml',
                          RequestContext(request,{'new':is_new_user,'errormsg':"Disabled account"}))
        else:
            return render(request,
                          'signin.djhtml',
                          RequestContext(request,{'new':is_new_user,'errormsg':"Wrong username or password"}))
    return render(request,
                  'signin.djhtml',
                  RequestContext(request,{'new':is_new_user}))

def logout_view(request):
    logout(request)
    return redirect('/index/')

