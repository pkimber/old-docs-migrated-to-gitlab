mail
****

.. highlight:: python

https://github.com/pkimber/mail

Prerequisites
=============

Setup :doc:`celery`...

Requirements
============

Add the following to ``requirements/base.txt``::

  djrill==1.3.0

Add the mail app to ``requirements/local.txt``::

  -e ../../app/mail

Settings
========

In your ``settings/base.py``, add ``mail`` to your apps e.g::

  LOCAL_APPS = (
      'project',
      ...
      'mail',

And add the default from address::

  DEFAULT_FROM_EMAIL = 'notify@pkimber.net'

And add the setting for the mail template type::

  # See the list of constants at the top of 'mail.models'
  MAIL_TEMPLATE_TYPE = 'django'

For Mandrill::

  # mandrill
  EMAIL_BACKEND = 'djrill.mail.backends.djrill.DjrillBackend'
  MANDRILL_API_KEY = get_env_variable('MANDRILL_API_KEY')
  MANDRILL_USER_NAME = get_env_variable('MANDRILL_USER_NAME')

.. warning:: Don't forget to set the ``EMAIL_BACKEND`` to use Mandrill.

In ``settings/production.py`` (after ``CELERY_DEFAULT_QUEUE``) (see
:doc:`celery` for more information)::

  from celery.schedules import crontab
  CELERYBEAT_SCHEDULE = {
      'process_mail': {
          'task': 'mail.tasks.process_mail',
          'schedule': crontab(minute='1', hour='*/1'),
      },
  }

Development
-----------

Add the following to your ``.private`` file e.g:

.. code-block:: bash

  export MANDRILL_API_KEY="your-api-key"
  export MANDRILL_USER_NAME="notify@pkimber.net"

.. tip:: When testing the password reset workflow, make sure you use a valid
         email address for a user.  On the standard demo data, this will be
         ``web@pkimber.net``

Deploy
======

In the salt pillar ``sls`` file for your site, add the ``mandrill_api_key``,
``mandrill_user_name`` and (if you are **not** using Celery) the ``mail_send``
cron command e.g::

  sites:
    my_site:
      celery: True
      cron:
        mail_send:
          schedule: "*/5    *       *       *       *"
      mail:
        mandrill_api_key: your-api-key
        mandrill_user_name: notify@pkimber.net

Usage
=====

.. note:: In the examples below, ``self.object`` is an object which the email
          address will be linked to.

To queue an email without using a template::

  from mail.models import Notify
  from mail.service import queue_mail_message

  email_addresses = [n.email for n in Notify.objects.all()]
  if email_addresses:
      queue_mail_message(
          self.object,
          email_addresses,
          subject,
          message,
      )
  else:
      logging.error(
          "Cannot send email notification of payment.  "
          "No email addresses set-up in 'mail.models.Notify'"
      )

To queue an email template::

  from mail.service import queue_mail_template

  context = {
      'test@pkimber.net': {
          "SUBJECT": "Re: {}".format(subject),
          "BODY": description,
          "DATE": created.strftime("%d-%b-%Y %H:%M:%S"),
      },
  }
  queue_mail_template(
      self.object,
      'enquiry_acknowledgement',
      context,
  )

To send queued emails::

  from mail.tasks import process_mail
  process_mail.delay()

To send email, use the ``mail_send`` management command e.g:

.. code-block:: bash

  django-admin.py mail_send
