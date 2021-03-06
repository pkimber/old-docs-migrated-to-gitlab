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

Remove ``migrations`` folders... then create new version 1.7 migrations:
:doc:`dev-django-migrations`.

Deploy
------

If you get the error::

  relation "easy_thumbnails_thumbnaildimensions" already exists

Then, just drop the table::

  DROP TABLE easy_thumbnails_thumbnaildimensions;

Django 1.8
==========

Remove ``TEMPLATE_DIRS`` and replace with::

  TEMPLATES = [
      {
          'BACKEND': 'django.template.backends.django.DjangoTemplates',
          'DIRS': [],
          'APP_DIRS': True,
          'OPTIONS': {
              'context_processors': [
                  'django.contrib.auth.context_processors.auth',
                  'django.template.context_processors.debug',
                  'django.template.context_processors.i18n',
                  'django.template.context_processors.media',
                  'django.template.context_processors.static',
                  'django.template.context_processors.tz',
                  'django.contrib.messages.context_processors.messages',
              ],
              'string_if_invalid': '**** INVALID EXPRESSION: %s ****',
          },
      },
  ]

Remove::

  TEMPLATE_DEBUG = DEBUG
  TEMPLATE_STRING_IF_INVALID = '**** INVALID EXPRESSION: %s ****'

``formtools``
-------------

The ``formtools`` package has been removed, so if you need wizards replace::

  from django.contrib.formtools.wizard.views import SessionWizardView

with::

  from formtools.wizard.views import SessionWizardView

Install::

  django-formtools

Add ``formtools`` to ``INSTALLED_APPS``::

  INSTALLED_APPS = (
      # ...
      'formtools',
  )

``get_model``
-------------

::

  from django.apps import apps
  model = apps.get_model('compose', 'Article')

Management Commands
-------------------

Django 1.8 uses ``argparse`` rather than ``optparse``.  For details, see
`Custom Management Commands`_ and `Argparse Tutorial`.  You are encouraged to
exclusively use ``**options`` for new commands::

  def add_arguments(self, parser):
      parser.add_argument(
          '--path',
          help="path to the 'name.csv' file"
      )

  def handle(self, *args, **options):
      file_name = options['path']

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
the transaction is committed before adding a task to the queue or returning the
HTTP response.

This is the pattern I am using::

  from django.http import HttpResponseRedirect

  def form_valid(self, form):
      with transaction.atomic():
          self.object = form.save(commit=False)
          self.object.deleted = True
          self.object = form.save()
      # return the response or add a task to the queue
      return HttpResponseRedirect(self.get_success_url())

If we don't do this then queued tasks are called before the object is saved.


.. _`Argparse Tutorial`: https://docs.python.org/3/howto/argparse.html#argparse-tutorial
.. _`Custom Management Commands`: https://docs.djangoproject.com/en/1.8/howto/custom-management-commands/
