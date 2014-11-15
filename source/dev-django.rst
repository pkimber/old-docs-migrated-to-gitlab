Django
******

.. highlight:: python

- :doc:`dev-django-media`
- :doc:`dev-django-migrations`
- :doc:`dev-django-static`
- :doc:`dev-django-thumbnails`

Django 1.7
==========

Remove ``south`` from requirements and ``INSTALLED_APPS``

Update django and reversion in the requirements::

  django-reversion==1.8.5
  Django==1.7.1

To get rid of ``(1_6.W001) Some project unittests may not execute as expected``
remove the following from your settings::

  SITE_ID = 1
  DJANGO_APPS = (
      'django.contrib.sites',

  TEMPLATE_LOADERS = (
      'django.template.loaders.filesystem.Loader',
      'django.template.loaders.app_directories.Loader',
      # 'django.template.loaders.eggs.Loader',
  )

.. note:: only remove the ``SITE_ID`` and ``sites`` if you are not using
          ``Site`` in your project (I am using ``Site`` in
          ``hatherleigh_net``).

Remove ``migrations`` folders... then create new version 1.7 migrations::

  django-admin.py makemigrations <app-name>

Deploy
------

If you get the error::

  relation "easy_thumbnails_thumbnaildimensions" already exists

Then, just drop the table::

  DROP TABLE easy_thumbnails_thumbnaildimensions;

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
          'NAME': '{}_test'.format(SITE_NAME) if TESTING else SITE_NAME,
          'USER': SITE_NAME,
          'PASSWORD': get_env_variable('DB_PASS'),
          'HOST': get_env_variable('DB_IP'),
          'PORT': '',
      }
  }

Migrations
==========

:doc:`dev-django-migrations`

.. _django_transactions:

Transactions
============

I have started using ``transaction.atomic`` in several of the views.  Make sure
the transaction is committed before returning the HTTP response.

This is the pattern I am using::

  from django.http import HttpResponseRedirect

  def form_valid(self, form):
      with transaction.atomic():
          self.object = form.save(commit=False)
          self.object.deleted = True
          self.object = form.save()
      return HttpResponseRedirect(self.get_success_url())

If you don't do this then queued tasks are called before the object is saved.
