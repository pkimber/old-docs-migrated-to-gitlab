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

.. _django_migrations:

Migrations
==========

Create an automatic migration::

  django-admin.py makemigrations yourappname

Create a data migration::

  django-admin.py makemigrations --empty yourappname

Run::

  django-admin.py migrate

Tip
---

To set-up default states for foreign keys...

Create a ``default`` function e.g::

  def default_payment_state():
      return PaymentState.objects.get(slug=PaymentState.DUE).pk

.. warning:: This **must** return an integer (the primary key) or it won't work
             with migrations.

Follow one of two strategies...

1) Create all the models without defaults - then add the defaults later.

- create your models and allow the foreign key to be set to ``null`` e.g::

    class Payment(TimeStampedModel):
        state = models.ForeignKey(
            PaymentState,
            #default=default_payment_state,
            blank=True,
            null=True
        )

- create the migrations for all your models
- create a data migration and use it to set the defaults for your state model
  e.g.
  https://github.com/pkimber/pay/blob/0200a679c9d8c69ef80612963744099fac450041/pay/migrations/0002_auto_20141114_2237.py
- set the foreign key so it has a default and no longer accepts ``null`` e.g::

    class Payment(TimeStampedModel):
        state = models.ForeignKey(
            PaymentState,
            default=default_payment_state,
            #blank=True,
            #null=True
        )

- update the migrations so the default value is set.

2) Create the lookup model - then add the dependant models later

This strategy is simple and logical, but isn't suitable if you are moving from
South and creating the first migration.  To move from South, all current models
need to be in the ``0001_initial.py`` file.

- create the model which will contain the default value (don't create the model
  which depends on it) e.g::

    class PaymentState(TimeStampedModel):
        DUE = 'due'
        name = models.CharField(max_length=100)
        slug = models.SlugField(unique=True)

- create migrations for this model
- create a data migration and use it to set the defaults for your state model
  e.g.
  https://github.com/pkimber/pay/blob/0200a679c9d8c69ef80612963744099fac450041/pay/migrations/0002_auto_20141114_2237.py
- create the model which uses the foreign key e.g::

    class Payment(TimeStampedModel):
        state = models.ForeignKey(PaymentState, default=default_payment_state)

- create the migration for this model

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
