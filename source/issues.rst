Issues
******

Duplicity
=========

gio
---

If you get this error::

  No module named gio

Then::

  apt-get install python-gobject-2

Symbolic Links
--------------

Duplicity does **NOT** backup symbolic links... or the contents of symbolic
links.

ElasticSearch
=============

Connection marked as dead
-------------------------

Errors from the ElasticSearch client saying::

  %s marked as dead for %s seconds

The code can be seen here:
https://github.com/rhec/pyelasticsearch/blob/master/pyelasticsearch/client.py#L241

My thought is that the ``pyelasticsearch`` client is timing out when the
``cron`` task re-indexes the data (there are lots of records, so I would expect
this to take some time).  The connections are pooled, and time-out, so the
connection is marked as dead.

To see if this is the problem (or not), I have added ``BATCH_SIZE`` and
``TIMEOUT`` to the settings::

  HAYSTACK_CONNECTIONS = {
      'default': {
          'BATCH_SIZE': 100,
          'ENGINE': 'haystack.backends.elasticsearch_backend.ElasticsearchSearchEngine',
          'INDEX_NAME': '{}'.format(SITE_NAME),
          'TIMEOUT': 60 * 5,
          'URL': 'http://127.0.0.1:9200/',
      },
  }

For documentation on these settings:
http://django-haystack.readthedocs.org/en/v2.1.0/settings.html

nginx
=====

502 Bad Gateway
---------------

This is a general error.  Find the cause by looking in the following files::

  sudo -i -u web
  # check the files in:
  tail -f ~/repo/uwsgi/log/hatherleigh_info.log

  sudo -i
  tail -f /var/log/nginx/error.log
  # check the log files in:
  tail -f /var/log/supervisor/

PostgreSQL
==========

Ubuntu 14.04 LTS
----------------

.. warning:: Check you have a backup of all databases on your development
             machine.

If you have upgraded from a previous version of Ubuntu running Postgres 9.1,
you might need to completely remove the old version::

  sudo apt-get purge postgresql-9.1

Selenium
========

If you have issues with Selenium and Firefox, then try the following::

  pip install -U selenium

SOLR
====

The current version of Haystack has an issue with the ``simple_backend.py``:
https://github.com/toastdriven/django-haystack/commit/49564861

To temporarily fix the issue::

  cdsitepackages
  vim +67 haystack/backends/simple_backend.py

Edit the code so that it matches the fixed version on GitHub i.e::

  for field in model._meta.fields:

Ubuntu
======

Clearing "System Problem Detected" messages
-------------------------------------------

Sometimes historical "System Problem Detected" message re-appear when Ubuntu is
started.

For example a problem with the chrome browser may not be reported to Ubuntu
because the Chrome is not a supported package.

These message are from files stored in the ``/var/crash`` directory.

Investigate old crash messages

Change to the crash reporting directory as follows::

  cd /var/crash

View the files in the directory as follows::

  ls -al

Files that end with ``.crash`` are ascii files containing the crash report
detail.  You can view them with your favourite editor (e.g. vim, nano or
gedit).  Some crash reports are readable by root only so you may need to use
``sudo`` to be able to view them.

To use vim type::

  sudo vim *.crash

To use nano type::

  sudo nano *.crash

To use gedit type::

  gksu gedit *.crash

You'll be prompted for your password and on successful entry go to your editor

Delete historical crash messages

To delete historical crash messages type ::

  sudo rm /var/crash/*

Any new crash messages that appear after that should be investigated.

uwsgi
=====

It seems that a new cloud server using python 3 doesn't install ``uwsgi``
correctly into the virtual environment.

Check the supervisor error log for uwsgi::

  /var/log/supervisor/uwsgi-stderr

If you get the following::

  exec: uwsgi: not found

Then::

  sudo -i -u web
  /home/web/repo/uwsgi
  . venv_uwsgi/bin/activate
  pip install uwsgi==2.0.1

The version of ``uwsgi`` can be found in
https://github.com/pkimber/salt/blob/master/uwsgi/requirements3.txt
