from django.shortcuts import render, HttpResponse, redirect
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import *
from django.views.decorators.csrf import csrf_exempt

def home(request):
    scores = Score.objects.order_by('-result')[:8]
    return render(request, 'home.html',  {'scores' : scores})

def play(request):
    scores = Score.objects.order_by('-result')[:8]
    return render(request, 'play.html',  {'scores' : scores})

@csrf_exempt
def insertscores(request):
    if request.method == "POST":
        
        scores = request.POST.getlist('scores[]', [])
        if len(scores) == 0:
            return HttpResponse('Empty')

        else:
            for score in scores:
                x = Score(result = score)
                x.save()
            return HttpResponse('Success')




