from django.db import models
from django.contrib.auth import get_user_model




class Category(models.Model):
  name = models.CharField(max_length = 50, unique = True)
  def __str__(self):
    return self.name
  
class Quote(models.Model):
  text = models.CharField(max_length = 250)
  user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="quotes",
        null = True
  )
  def __str__(self):
    return self.text
    
class QuoteCategory(models.Model):
  quote = models.ForeignKey(Quote, on_delete = models.CASCADE)
  category = models.ForeignKey(Category, on_delete = models.CASCADE)
  class Meta:
    unique_together = ('quote', 'category')