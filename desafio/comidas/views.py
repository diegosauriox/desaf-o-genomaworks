from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect
# Importar el modelo
from django.http import JsonResponse, HttpResponse
from requests import Request
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ComidasModel
from .serializers import ComidaSerializer
# Create your views here.
@api_view(['GET'])
def index(request):
    lugares= ComidasModel.objects.all()
    serializer = ComidaSerializer(lugares,many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)