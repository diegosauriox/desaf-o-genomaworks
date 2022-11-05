from rest_framework import serializers

from .models import TipoLugarModel

class TipoLugarSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoLugarModel
        fields = ('id','nombre')