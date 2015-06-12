Django Rest Framework
*********************

.. highlight:: python

Requirements:

.. code-block:: text

  # requirements/base.txt
  djangorestframework

.. tip:: Find the version number in :doc:`dev-requirements`

``example/base.py`` for an app, ``settings/production.py`` for a project::

  THIRD_PARTY_APPS = (
      'rest_framework',
      # http://www.django-rest-framework.org/api-guide/authentication#tokenauthentication
      'rest_framework.authtoken',

  # http://www.django-rest-framework.org/api-guide/authentication#tokenauthentication
  REST_FRAMEWORK = {
      'COERCE_DECIMAL_TO_STRING': True,
      # not sure if this is required or not
      # 'DATETIME_FORMAT': '%Y%m%dT%H%M%SZ',
      'DEFAULT_AUTHENTICATION_CLASSES': (
          'rest_framework.authentication.TokenAuthentication',
      ),
      'DEFAULT_PERMISSION_CLASSES': (
          'rest_framework.permissions.IsAdminUser',
      ),
      'TEST_REQUEST_DEFAULT_FORMAT': 'json',
  }

Add the following to ``urls.py`` (perhaps in your ``project`` folder)::

  url(regex=r'^token/$',
      view='rest_framework.authtoken.views.obtain_auth_token',
      name='api.token.auth',
  ),

.. note:: You can change the ``regex`` to another URL if you want...

Create a token for each of the users who will use the API::

  from rest_framework.authtoken.models import Token
  Token.objects.create(user=...)

.. tip:: To auto-generate a token for every user, check out
         TokenAuthentication_


.. _TokenAuthentication: http://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication
