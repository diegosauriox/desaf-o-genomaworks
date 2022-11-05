from rest_framework import serializers

from .models import LugaresModel
from tipoLugar.serializers import TipoLugarSerializer

class LugaresSerializer(serializers.ModelSerializer):
    tipoLugar = TipoLugarSerializer(source="*")
    class Meta:
        model = LugaresModel
        fields = ('id','nombre', 'ubicacion', 'calificacion', 'visitado', 'tipoLugar')