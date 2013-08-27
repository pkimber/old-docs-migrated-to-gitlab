Django Media
************

.. highlight:: python

To set-up media for user uploading media and public display on the internet...

In your ``settings/base.py`` file:

::

  MEDIA_URL = '/media/'


In your ``settings/local.py`` file:

::

  MEDIA_ROOT = 'media'

In your ``settings/production.py`` file:

::

  MEDIA_ROOT = get_env_variable("MEDIA_ROOT")
  MEDIA_ROOT_PRIVATE = get_env_variable("MEDIA_ROOT_PRIVATE")

Add the following to your ``project/urls.py`` file:

::

  from django.conf import settings
  from django.conf.urls.static import static

  urlpatterns = patterns(
      '',
      url(regex=r'^admin/',
          view=include(admin.site.urls)
          ),
  ) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
  #   ^ helper function to return a URL pattern for serving files in debug mode.
  # https://docs.djangoproject.com/en/1.5/howto/static-files/#serving-files-uploaded-by-a-user

The ``static`` method will only be active when ``DEBUG`` is ``False``.
