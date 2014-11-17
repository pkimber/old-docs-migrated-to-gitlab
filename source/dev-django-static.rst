Django Static
*************

.. highlight:: python

.. note::

  Note to myself... None of my projects use the ``staticfiles_urlpatterns``
  function, but they still serve static files... but I cannot see how!!

The Django documentation describes a helper function, staticfiles_urlpatterns_,
for serving static files during development::

  from django.contrib.staticfiles.urls import staticfiles_urlpatterns

  urlpatterns = patterns(
      '',
      url(regex=r'^admin/',
          view=include(admin.site.urls)
          ),
  )

  urlpatterns += staticfiles_urlpatterns()

.. note::

  This helper function will only work if ``DEBUG`` is ``True``

Compress
========

.. note:: The fabric deploy task runs the ``compress`` management command for
          all projects which use Amazon web services (unless you use the
          ``compress`` setting in your pillar).

Setup your site to use Amazon S3, :doc:`amazon-s3`.

http://django-compressor.readthedocs.org/::

  # requirements/base.txt
  django-compressor==1.4

  # base.py
  STATICFILES_FINDERS = (
      ...
      'compressor.finders.CompressorFinder',
  )

  # settings/base.py
  THIRD_PARTY_APPS = (
      'compressor',

  # settings/production.py
  # django-compressor
  COMPRESS_ENABLED = True
  COMPRESS_OFFLINE = True
  COMPRESS_STORAGE = 'base.storage.CachedS3BotoStorage'
  COMPRESS_URL = 'http://{}.s3.amazonaws.com/'.format(SITE_NAME.replace('_', '-'))
  STATIC_URL = COMPRESS_URL
  COMPRESS_ROOT = STATIC_ROOT
  STATICFILES_STORAGE = COMPRESS_STORAGE
  # http://stackoverflow.com/questions/10929418/django-compressor-with-s3-url-heroku
  AWS_QUERYSTRING_AUTH = False
  AWS_PRELOAD_METADATA = True

  # optional - to disable
  # django-compressor
  COMPRESS_ENABLED = False # defaults to the opposite of DEBUG

If you are hosting your site on Amazon and don't want to use Django Compressor
(perhaps you are writing an API and don't have any templates), then add the
``compress: False`` to your site pillar e.g:

.. code-block:: yaml

  hatherleigh_info:
    amazon: True
    compress: False

Editor
======

:doc:`dev-ckeditor`

favicon.ico
===========

In order for nginx to serve your applications favicon.ico file, it will need
to be located in the following static folder within your project::

  static/ico/favicon.ico

To use this icon on your site::

  <link rel="shortcut icon" href="{% static 'ico/favicon.ico' %}">


.. _staticfiles_urlpatterns: https://docs.djangoproject.com/en/1.5/ref/contrib/staticfiles/
