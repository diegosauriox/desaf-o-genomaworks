from rest_framework import serializers

from .models import ComidaLugaresModel
from lugares.serializers import LugaresSerializer
from comidas.serializers import ComidaSerializer

class ComidaLugaresSerializer(serializers.ModelSerializer):
    lugar = LugaresSerializer(source="*")
    comida = ComidaSerializer(source="*")
    class Meta:
        model = ComidaLugaresModel
        fields = ("lugar","comida")