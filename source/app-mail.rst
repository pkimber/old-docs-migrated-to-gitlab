Mail
****

.. highlight:: python

https://github.com/pkimber/mail

Settings
========

In your ``settings/base.py``, add ``mail`` to your apps e.g::

  LOCAL_APPS = (
      'project',
      ...
      'mail',

Check the list of constants at the top of ``mail.models`` and add the type of
email you want to use e.g. for Mandrill::

  # See constants at the top of 'mail.models'
  MAIL_TYPE = 'mandrill'

.. warning:: Don't try importing the constant from ``mail.models`` because you
             shouldn't import external modules into the settings file.

Usage
=====

To send email, use the ``mail_send`` management command e.g:

.. code-block:: bash

  django-admin.py mail_send

Deploy
======

To set-up the ``cron`` command using ``salt``, add the ``cron`` command to
your site configuration e.g::

  sites:
    my_site:
      db_pass: password
      domain: hatherleigh.info
      ssl: False
      uwsgi_port: 3038
      cron:
        mail_send:
          schedule: "*/5    *       *       *       *"


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
