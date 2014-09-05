Django
******

.. highlight:: python

- :doc:`dev-django-media`
- :doc:`dev-django-static`
- :doc:`dev-django-thumbnails`

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
          'NAME': SITE_NAME,
          'USER': SITE_NAME,
          'PASSWORD': get_env_variable('DB_PASS'),
          'HOST': get_env_variable('DB_IP'),
          'PORT': '',
      }
  }

.. _django_transactions:

Transactions
============

I have started using ``transaction.atomic`` in several of the views.  Make sure
the transaction is committed befire returning the HTTP response.

This is the pattern I am using::

  from django.http import HttpResponseRedirect

  def form_valid(self, form):
      with transaction.atomic():
          self.object = form.save(commit=False)
          self.object.deleted = True
          self.object = form.save()
      return HttpResponseRedirect(self.get_success_url())

If you don't do this then queued tasks are called before the object is saved.
