Celery (using Redis)
********************

.. highlight:: python

From `Using Celery with Django`_

To use a Celery queue in your project...

Add the following to ``requirements/base.txt``::

  celery==3.1.13
  django-redis==3.7.0
  redis==2.10.1

Create a ``celery.py`` file in the ``project`` folder::

  # -*- encoding: utf-8 -*-
  from __future__ import unicode_literals

  from celery import Celery

  from django.conf import settings

  app = Celery('project')
  app.config_from_object('django.conf:settings')
  app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

Add the following to you ``project/__init__.py`` file::

  from .celery import app as celery_app

In your ``settings/base.py`` file, add the following::

  # Celery
  BROKER_URL = 'redis://localhost:6379/0'
  CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
  # https://kfalck.net/2013/02/21/run-multiple-celeries-on-a-single-redis
  CELERY_DEFAULT_QUEUE = '{}'.format(SITE_NAME)

To start the task queue on your development system::

  celery -A project worker --loglevel=info

To deploy, add ``celery`` to your pillar e.g:

.. code-block:: yaml

  sites:
    pkimber_net:
      profile: django
      celery: True

Task
----

To create a task, create a function in your ``app/tasks.py`` file (where
``app`` is an application in your project) e.g::

  from celery import task

  @task()
  def my_task():
      # some example code
      with transaction.atomic():
          qs = TestModel.objects.select_for_update().filter(complete=True)

To add this task to the queue::

  from .tasks import my_task
  my_task.delay()

cron
====

To create a periodic (``cron`` like task), start by create a function in your
``app/tasks.py`` file (where ``app`` is an application in your project)::

  from celery import task

  @task()
  def process_periodic_task():
      """Nothing to do... just testing."""
      pass

In your ``settings/base.py`` file, set-up the schedule e.g::

  # periodic tasks (requires 'beat')
  from celery.schedules import crontab
  CELERYBEAT_SCHEDULE = {
      'process-every-minute': {
          'task': 'app.tasks.process_periodic_task',
          'schedule': crontab(minute='*/1'),
      },
  }


.. _`Using Celery with Django`: http://docs.celeryproject.org/en/latest/django/first-steps-with-django.html#using-celery-with-django
