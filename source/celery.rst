Celery (using Redis)
********************

.. highlight:: python

From `Using Celery with Django`_

To use a Celery queue in your project...

Add the following to ``requirements/base.txt``::

  celery==3.1.16
  django-redis==3.7.2
  redis==2.10.3

Create a ``celery.py`` file in the ``project`` folder::

  # -*- encoding: utf-8 -*-
  from __future__ import unicode_literals

  from celery import Celery

  from django.conf import settings

  app = Celery('project')
  app.config_from_object('django.conf:settings')
  app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

Add the following to your ``project/__init__.py`` file::

  from .celery import app as celery_app

In your ``settings/production.py`` or ``settings/base.py`` file (below
``DATABASES``), add the following::

  # Celery
  BROKER_URL = 'redis://localhost:6379/0'
  CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
  # https://kfalck.net/2013/02/21/run-multiple-celeries-on-a-single-redis
  CELERY_DEFAULT_QUEUE = '{}'.format(SITE_NAME)
  # http://celery.readthedocs.org/en/latest/userguide/tasks.html#disable-rate-limits-if-they-re-not-used
  CELERY_DISABLE_RATE_LIMITS = True

.. note:: If you are writing an example application, then just use
          ``CELERY_ALWAYS_EAGER`` (as shown below).

In your ``settings/dev_test.py`` file (below ``DATABASES``), add the
following::

  # http://docs.celeryproject.org/en/2.5/django/unit-testing.html
  CELERY_ALWAYS_EAGER = True

To start the task queue on your development system::

  celery -A project worker --loglevel=info

To deploy, add ``celery`` and ``redis`` to your pillar e.g:

.. code-block:: yaml

  # sites/my.sls
  sites:
    pkimber_net:
      profile: django
      celery: True

Create a ``redis`` ``sls``:

.. code-block:: yaml

  # config/redis.sls
  redis:
    True

And add it to the config for the server e.g:

.. code-block:: yaml

  # top.sls
  'test-a':
    - config.redis
    - sites.my

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

.. warning:: Remember to use the correct pattern for transactions when adding
             tasks to the queue.  For details, see :ref:`django_transactions`

To get the ID of the current task (from `How do I get the task ID`_)::

  @app.task(bind=True)
  def mytask(self):
      # self.request.id is the ID of the current task
      cache.set(self.request.id, "Running")


.. _celery_cron:

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


.. _`How do I get the task ID`: http://celery.readthedocs.org/en/latest/faq.html#how-can-i-get-the-task-id-of-the-current-task
.. _`Using Celery with Django`: http://docs.celeryproject.org/en/latest/django/first-steps-with-django.html#using-celery-with-django
