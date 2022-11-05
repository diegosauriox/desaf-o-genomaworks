from rest_framework import serializers

from .models import ComidasModel

class ComidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComidasModel
        fields = ('id','nombre')