from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.template import RequestContext, loader

from django.contrib.auth.models import User
from django.forms import ModelForm

from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

@login_required
def home(request):
    return HttpResponse(loader.get_template('home.djhtml').render())

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
                user = User.objects.create_user(username=request.POST['username'],
                                                email=request.POST['email'],
                                                password=request.POST['password'])
                user.is_active = True
                user.save()
                return redirect(signin,is_new_user=True)
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
            print(username,password)
        except:
            return render(request,
                          'signin.djhtml',
                          RequestContext(request,{'new':is_new_user,'errormsg':"Missing username or password"}))
        user = authenticate(username=username,password=password)
        print(user)
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

