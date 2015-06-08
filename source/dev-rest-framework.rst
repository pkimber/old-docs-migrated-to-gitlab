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
  REST_FRAMEWORK = {
      'COERCE_DECIMAL_TO_STRING': True,
      # not sure if this is required or not
      # 'DATETIME_FORMAT': '%Y%m%dT%H%M%SZ',
      'DEFAULT_AUTHENTICATION_CLASSES': (
          'rest_framework.authentication.TokenAuthentication',
      ),
      'TEST_REQUEST_DEFAULT_FORMAT': 'json',
  }

Add the following to ``urls.py``::

  url(regex=r'^token/$',
      view='rest_framework.authtoken.views.obtain_auth_token',
      name='api.token.auth',
  ),
