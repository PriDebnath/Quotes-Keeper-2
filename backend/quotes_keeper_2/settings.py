"""
Django settings for quotes_keeper_2 project.

Generated by 'django-admin startproject' using Django 5.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-srm@d&)^ethvrb$-2^i-*((q&$(+s8g-3ke)*mt0)$lhi^(+xo'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
  '127.0.0.1',
  "quotes-keeper-2.onrender.com",
  ]
  
HOST = '0.0.0.0'  # Bind to all available network interfaces.

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

INSTALLED_PACKAGES = [
    "rest_framework",
    "django_filters",
    "corsheaders"
]

PROJECT_APPS = [
    "quotes_keeper_2.apps.quote",
    "quotes_keeper_2.apps.accounts",
]

INSTALLED_APPS = INSTALLED_APPS + INSTALLED_PACKAGES + PROJECT_APPS


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',

]

ROOT_URLCONF = 'quotes_keeper_2.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'quotes_keeper_2.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

AUTH_USER_MODEL = 'accounts.CustomUser'

RENDER_INTERNAL_DATABASE_URL = "postgres://quote_keeper_2_user:RpQpepA4tfs7daTjzQEHL2fg6G3aqthU@dpg-con1as21hbls73fas0tg-a/quote_keeper_2"

DATABASES = {
    #'default': {   'ENGINE': 'django.db.backends.sqlite3',    'NAME': BASE_DIR / 'db.sqlite3',}
    'default': dj_database_url.parse(RENDER_INTERNAL_DATABASE_URL)
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

CORS_ORIGIN_ALLOW_ALL = True  # This allows all origins



# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
MEDIA_URL = 'media/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
  
REST_FRAMEWORK = {
  'DEFAULT_AUTHENTICATION_CLASSES': (
    'rest_framework_simplejwt.authentication.JWTAuthentication',
    #'rest_framework.authentication.TokenAuthentication',
  ),
  'DEFAULT_FILTER_BACKENDS': [
    'django_filters.rest_framework.DjangoFilterBackend',
    'rest_framework.filters.OrderingFilter',
    'rest_framework.filters.SearchFilter',
  ],
  'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
  'PAGE_SIZE': 10,
  #'DEFAULT_THROTTLE_RATES':{
  #  'anon': '5/minute'
  #}
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=2),
    'AUTH_HEADER_TYPES': ('Bearer',),
}
 

# CORS_ALLOWED_ORIGINS = [
#     "https://localhost.com",
#     "https://sub.example.com",
# ]


