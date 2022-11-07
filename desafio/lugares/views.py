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
from tipoLugar.views import buscarLugar
# Create your views here.
@api_view(['GET'])
def index(request):
    lugares= LugaresModel.objects.all()
    serializer = LugaresSerializer(lugares,many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def eliminar(request,id):
    lugar= LugaresModel.objects.get(id=id)
    lugar.delete()
    
    return HttpResponse("Eliminado")

@api_view(['PUT'])
def editar(request,id):
    lugar= LugaresModel.objects.get(id=id)
    serializer=LugaresSerializer(data=request.data, instance=lugar)
    lugar.pais=request.data["pais"]
    lugar.ciudad=request.data["ciudad"]
    lugar.calificacion=request.data["calificacion"]
    lugar.visitado=request.data["visitado"]
    lugar.id_tipo_lugar=buscarLugar(request.data["id_tipo_lugar"]) 
    lugar.save()


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
    nombre=request.data["nombre"]
    ubicacion=request.data["ubicacion"]
    calificacion=request.data["calificacion"]
    visitado=request.data["visitado"]
    id_tipo_lugar=buscarLugar(request.data["id_tipo_lugar"]) 

    lugar=LugaresModel(nombre=nombre,ubicacion=ubicacion,calificacion=calificacion,visitado=visitado,id_tipo_lugar=id_tipo_lugar)
    lugar.save()
    return HttpResponse("guardado")