Django
******

.. highlight:: python

- :doc:`dev-django-media`
- :doc:`dev-django-static`
- :doc:`dev-django-thumbnails`

Settings
========

In your ``settings/production.py`` file::

  if get_env_variable_bool('SSL'):
      SESSION_COOKIE_SECURE = True
      CSRF_COOKIE_SECURE = True

  ALLOWED_HOSTS = [get_env_variable('ALLOWED_HOSTS'), ]

  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.postgresql_psycopg2',
          'NAME': SITE_NAME,
          'USER': SITE_NAME,
          'PASSWORD': get_env_variable('DB_PASS'),
          'HOST': get_env_variable('DB_IP'),
          'PORT': '',
      }
  }
