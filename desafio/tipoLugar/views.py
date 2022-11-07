from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect
# Importar el modelo
from django.http import JsonResponse, HttpResponse
from requests import Request
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import TipoLugarModel
from .serializers import TipoLugarSerializer
# Create your views here.

def buscarLugar(id):
    tipoLugar= TipoLugarModel.objects.get(id=id)
    serializer = TipoLugarSerializer(tipoLugar,many=True)
    
    return tipoLugar

