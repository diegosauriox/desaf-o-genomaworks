from rest_framework import serializers

from .models import LugaresModel
from tipoLugar.serializers import TipoLugarSerializer

class LugaresSerializer(serializers.ModelSerializer):
    class Meta:
        model = LugaresModel
        fields = ('id','nombre', 'pais','ciudad', 'calificacion', 'visitado', "comidas",'tipoLugar' )