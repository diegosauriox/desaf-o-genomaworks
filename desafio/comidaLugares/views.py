from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect
# Importar el modelo
from django.http import JsonResponse, HttpResponse
from requests import Request
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ComidaLugaresModel
from .serializers import ComidaLugaresSerializer
# Create your views here.
@api_view(['GET'])
def index(request):
    lugares= ComidaLugaresModel.objects.all()
    serializer = ComidaLugaresSerializer(lugares,many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)