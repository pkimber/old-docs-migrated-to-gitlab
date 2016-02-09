Django Rest Framework
*********************

.. highlight:: python

Requirements:

.. code-block:: text

  # requirements/base.txt
  djangorestframework

.. tip:: Find the version number in :doc:`dev-requirements`

In ``example/base.py`` for an app, ``settings/base.py`` for a project:

.. code-block:: python

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

Testing
=======

Sample test code::

  import pytest

  from django.core.urlresolvers import reverse
  from rest_framework.authtoken.models import Token
  from rest_framework.test import APIClient

  from login.tests.factories import UserFactory


  @pytest.fixture
  def api_client():
      user = UserFactory()
      Token.objects.create(user=user)
      token = Token.objects.get(user=user)
      client = APIClient()
      client.credentials(HTTP_AUTHORIZATION='Token {}'.format(token.key))
      client.user = user
      return client


  @pytest.mark.django_db
  def test_something(api_client):
      response = api_client.get(reverse('docrecord.api.document'))
      assert 200 == response.status_code


.. _TokenAuthentication: http://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication
