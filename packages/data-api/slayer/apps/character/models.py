from django.db import models

class Character(models.Model):
  name = models.CharField(max_length=50)

  universe = models.ForeignKey(
    'universe.Universe', on_delete=models.CASCADE, related_name='characters'
  )


  def __str__(self):
    return self.name
