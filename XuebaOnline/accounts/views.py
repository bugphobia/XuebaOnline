from django.http import HttpResponse
from django.shortcuts import render
from django.template import RequestContext, loader

def index(request):
	return HttpResponse(loader.get_template('index.djhtml').render())

def signup(request):
	return HttpResponse(loader.get_template('signup.djhtml').render())
