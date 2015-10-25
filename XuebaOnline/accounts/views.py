from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader

def home(request):
	return HttpResponse(loader.get_template('home.djhtml').render())

def signup(request):
	return HttpResponse(loader.get_template('signup.djhtml').render())

def signin(request):
	return HttpResponse(loader.get_template('signin.djhtml').render())

