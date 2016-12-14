from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Invitation(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    author = models.CharField(max_length=200)

    def __str__(self):
        return self.title+"**"+self.description+"**"+self.author