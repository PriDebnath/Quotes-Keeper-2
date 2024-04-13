from django.contrib import admin

from quotes_keeper_2.apps.accounts.models import CustomUser

admin.site.register(CustomUser)
