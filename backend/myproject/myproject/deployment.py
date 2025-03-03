import os
from .settings import *
from .settings import BASE_DIR

#Allowed hosts and trusted origins are set
ALLOWED_HOSTS = ['inventorykh2024-backend-fta8gwhqhwgqfchv.eastus-01.azurewebsites.net', 'inventorykh2024-backend-fta8gwhqhwgqfchv.azurewebsites.net', 'pantrypal.design', 'www.pantrypal.design']
CSRF_TRUSTED_ORIGINS = ['https://inventorykh2024-backend-fta8gwhqhwgqfchv.eastus-01.azurewebsites.net', 'https://pantrypal.design', 'https://www.pantrypal.design']

#Secret key and debug settings
SECRET_KEY = os.environ['MY_SECRET_KEY']
DEBUG = False

#Middleware settings
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

#CSRF and cookies settings
CSRF_COOKIE_NAME = 'csrftoken'  
CSRF_COOKIE_HTTPONLY = False      
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True       
CSRF_COOKIE_SAMESITE = 'None'   
SESSION_COOKIE_SAMESITE = 'None'

#CORS settings
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    'https://inventorykh2024-backend-fta8gwhqhwgqfchv.eastus-01.azurewebsites.net',
    'https://pantrypal.design',
    'https://www.pantrypal.design'
]

#Application definition
WSGI_APPLICATION = 'myproject.wsgi.application'

#Static files are managed
STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'
STATIC_URL = '/static/'
STATIC_ROOT= os.path.join(BASE_DIR,'staticfiles')
STATICFILES_DIRS = [
    'D:/home/site/wwwroot/static',
    os.path.join(BASE_DIR,'static'),
]