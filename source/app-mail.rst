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

  git+https://github.com/pkimber/Djrill.git#egg=djrill

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

In the salt ``sls`` file for your site, add the ``mail_template_type``,
``mandrill_api_key``, ``mandrill_user_name`` and (if you are not using Celery)
the ``mail_send`` cron command e.g::

  sites:
    my_site:
      celery: True
      cron:
        mail_send:
          schedule: "*/5    *       *       *       *"
      mail:
        mandrill_api_key: your-api-key
        mandrill_user_name: notify@pkimber.net

.. note:: The ``mail_template_type`` should be selected from the list of
          constants at the top of the ``mail.models`` module.

Usage
=====

To queue an email template::

  context = {
      email_address: {
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


.. You will also need a way to run the app mail sending service.  One way to do
.. this is to create a python run script called ``run_mail_service.py``.  This
.. can then be run from a bash script.  This should contain::
..
..   from mail.service import (send_mail, send_messages_via_mandrill)
..
..   # uncomment the next line if you are using mandrill
..   # send_message_via_mandrill()
..
..   # uncomment the next line if you are using the default django mail backend
..   # send_mail()
..
.. You will also need to create a shell script to run from ``cron``.  Here is an
.. example:
..
..   #!/bin/bash
..   cd <directory where you installed the application that contains you app>
..
..   source .env
..
..   python <full path to run_mail_service.py script>
..
..
..   This app provides several API functions, these are accessed as follows:
..
..   from mail.service import (
..       queue_mail,
..       send_mail,
..       sned_mail_via_mandrill,
..       render_mail_template
..   )
