Django Static
*************

.. highlight:: python

.. note::

  Note to myself... None of my projects use the ``staticfiles_urlpatterns``
  function, but they still serve static files... but I cannot see how!!

The Django documentation describes a helper function, staticfiles_urlpatterns_,
for serving static files during development:

::

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


.. _staticfiles_urlpatterns: https://docs.djangoproject.com/en/1.5/ref/contrib/staticfiles/

favicon.ico
===========

In order for nginx to serve your applications favicon.ico file, it will need to be located in the following static folder within your project:

::

  static/ico/favicon.ico
