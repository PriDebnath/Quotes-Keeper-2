from django.contrib import admin
from quotes_keeper_2.apps.quote.models import Quote, Category, QuoteCategory

admin.site.register(Quote)
admin.site.register(Category)
admin.site.register(QuoteCategory)
