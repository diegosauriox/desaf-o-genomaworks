from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, redirect
# Importar el modelo
from django.http import JsonResponse, HttpResponse
from requests import Request
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import LugaresModel
from .serializers import LugaresSerializer
# Create your views here.
@api_view(['GET'])
def index(request):
    lugares= LugaresModel.objects.all()
    serializer = LugaresSerializer(lugares,many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def eliminar(request,id):
    lugar= LugaresModel.objects.get(id=id)
    lugar.delete()
    
    return HttpResponse("Eliminado")

@api_view(['PUT'])
def editar(request,id):
    lugar= LugaresModel.objects.get(id=id)
    serializer=LugaresSerializer(data=request.data, instance=lugar)
    serializer.save()
    """ lugar.nombre=
    lugar.ubicacion=
    lugar.calificacion=
    lugar.visitado=
    lugar.id_tipo_lugar=
    lugar.save()
     """
    return HttpResponse("editado")
    
@api_view(['POST'])
def agregar(request):
    #lugares= LugaresModel.objects.all()
    print(request)
    serializer = LugaresSerializer(request.data,many=True)
    if(serializer.is_valid()):
        serializer.save()
        return HttpResponse("añadido")
    return HttpResponse("no funcino")