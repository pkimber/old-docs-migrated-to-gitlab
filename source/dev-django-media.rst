Django Media
************

.. highlight:: python

.. warning::

  Don't forget to use
  ``<form enctype="multipart/form-data" method="post"...``
  in your forms, or the file/image will not be uploaded.

Public
======

To set-up your site for user upload of media with public access:

In your ``settings/base.py`` file::

  MEDIA_URL = '/media/'

In your ``settings/local.py`` file::

  MEDIA_ROOT = 'media'

In your ``settings/production.py`` file::

  MEDIA_ROOT = get_env_variable("MEDIA_ROOT")

The Salt state will set-up your site so media root is pointing to a folder
which is accessible to the public.

For development, add the following to your ``project/urls.py`` file::

  from django.conf import settings
  from django.conf.urls.static import static

  urlpatterns = patterns(
      '',
      url(regex=r'^admin/',
          view=include(admin.site.urls)
          ),
  )

  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
  #   ^ helper function to return a URL pattern for serving files in debug mode.
  # https://docs.djangoproject.com/en/1.5/howto/static-files/#serving-files-uploaded-by-a-user

The ``static`` method will only be active when ``DEBUG`` is ``False``.

Private
=======

For private uploads/attachments we use
https://github.com/johnsensible/django-sendfile

Add ``django-sendfile`` to your ``base.txt`` requirements::

  git+https://github.com/pkimber/django-sendfile#egg=sendfile

The ``production.py`` settings file should contain the following::

  SENDFILE_BACKEND = 'sendfile.backends.nginx'
  SENDFILE_ROOT = get_env_variable("SENDFILE_ROOT")
  SENDFILE_URL = '/private'

In your ``base`` application, create a store for private files::

  private_file_store = FileSystemStorage(location=settings.SENDFILE_ROOT)

Any models with a file field where the download needs to be kept private should
use the ``private_file_store`` e.g::

  pdf = models.FileField(
      upload_to='invoice/%Y/%m/%d',
      storage=private_file_store,
  )

For development, add the following to your ``local.py`` settings file::

  SENDFILE_BACKEND = 'sendfile.backends.development'
  SENDFILE_ROOT = 'media-private'

The upload should *just work*.  For the download, you might like to try
something like this::

  # views.py
  @login_required
  def download_cv(request, pk):
      """https://github.com/johnsensible/django-sendfile"""
      if not request.user.is_staff:
          raise PermissionDenied()
      enrol = get_object_or_404(Enrol, pk=pk)
      return sendfile(
          request,
          enrol.cv.path,
          attachment=True,
          # attachment_filename='{}.pdf'.format(enrol.pk)
      )

  # urls.py
  url(regex=r'^cv/(?P<pk>\d+)/$',
      view=download_cv,
      name='enrol.download.cv'
      ),

.. code-block:: html

  <a href="{% url 'enrol.download.cv' object.pk %}">
    <i class="fa fa-download"></i>
    CV
  </a>
