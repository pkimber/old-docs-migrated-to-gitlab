Cache
*****

.. highlight:: python

Add the following to ``requirements/base.txt``::

  django-redis==3.7.0
  redis==2.10.1

Add the following to ``settings/base.py``::

  # caching
  KEY_PREFIX = SITE_NAME
  CACHES = {
      'default': {
          'BACKEND': 'redis_cache.cache.RedisCache',
          'LOCATION': '127.0.0.1:6379:1',
      },
  }

To cache sessions in redis, add the following to ``settings/base.py``::

  SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
  SESSION_CACHE_ALIAS = 'default'
