Django
******

.. highlight:: python

- :doc:`dev-django-media`
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

.. _django_migrations:

Migrations
==========

Automatic Migration::

  django-admin.py makemigrations yourappname

Data Migration::

  python manage.py makemigrations --empty yourappname

Tip
---

To set-up default states for foreign keys:

- create the lookup model before creating the model which depends on it.
- create migrations for the lookup model on it's own
- create a data migration to create the state e.g.
  https://github.com/pkimber/pay/blob/0200a679c9d8c69ef80612963744099fac450041/pay/migrations/0002_auto_20141114_2237.py
- create the model which depends on the lookup model
- create the migration for the model which depends on the lookup model.  The
  model will need to get the primary key of the lookup model e.g.
  https://github.com/pkimber/pay/blob/0200a679c9d8c69ef80612963744099fac450041/pay/migrations/0003_auto_20141115_0926.py#L31
  and
  https://github.com/pkimber/pay/blob/0200a679c9d8c69ef80612963744099fac450041/pay/models.py#L20

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
