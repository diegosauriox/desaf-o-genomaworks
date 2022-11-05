# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from comidas.models import ComidasModel
from lugares.models import LugaresModel


class ComidaLugaresModel(models.Model):
    id_comidas = models.ForeignKey(ComidasModel, models.DO_NOTHING, db_column='id_comidas')
    id_lugar = models.ForeignKey(LugaresModel, models.DO_NOTHING, db_column='id_lugar')

    class Meta:
        managed = False
        db_table = 'lugares_comida'
