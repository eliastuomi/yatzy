from django.db import models

class Score(models.Model):
    result = models.IntegerField(default=0)

