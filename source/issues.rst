Issues
******

Celery
======

If you find Celery wants to use AMQP (``amqp/transport.py``,
``Connection refused``), then check you created ``celery.py`` in your
``project`` (or ``example_appname``) folder, and that your ``__init__.py``
contains ``from .celery import app as celery_app``.  For more information, see
:doc:`celery`.

cron
====

If a cron script in ``/etc/cron.d`` has a ``.`` in the file name, then it will
not run! (`configs with dots in file name not working in /etc/cron.d`_)

devpi
=====

I was getting SSL ``certificate verify failed`` errors when using ``devpi``
(which uses ``httpie`` and ``requests``).  To solve the issue, use ``devpi``
with a python 3 virtual environment (not python 2).

Index
-----

If you have a local PyPI server, and you **do not** want to use it, then
comment out ``index-url`` in::

  ~/.pip/pip.conf

Django Compressor
=================

I had an issue where relative images in css files were not being found e.g::

  url(../img/logo-fill.png)

Django Compressor is supposed to convert relative URLs to absolute e.g::

  url('https://hatherleigh-info-test.s3.amazonaws.com/dash/img/logo-fill.png?ae4f8b52c99c')

The ``compress`` management command creates a manifest file listing the files
it creates.  On the web server this can be found in::

  ./web_static/CACHE/manifest.json

On Amazon S3 it is in the ``CACHE`` folder.

  You can look at the manifest files to find the name of the generated CSS file
  and look in this file to see if the relative URLs are converted to absolute.

  You can use the browser developer tools to see which CSS file is being used.

To solve the issue, I checked the generated CSS file and the links were not
relative.  I then ran ``compress`` and checked the generated CSS file again and
the links were absolute.  I re-started the Django project on the server and all
was OK.

.. tip:: I also uninstalled ``django-storages-redux`` and reinstalled the old
         version:
         (``git+https://github.com/pkimber/django-storages-py3.git@py3#egg=storages``)

         ... but I don't think that made a difference?!

Dropbox
=======

When testing the scripts::

  No protocol specified
  !! (Qt:Fatal) QXcbConnection: Could not connect to display :0

To stop this error, use a headless connection i.e. ssh into the computer or use
a separate console.  This will still be an issue if you have a GUI and you
``sudo`` to a user who is *not* running a GUI.

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

``bind() to 0.0.0.0:80 failed``
-------------------------------

``nginx`` won't start and ``/var/log/nginx/error.log`` shows::

  [emerg]: bind() to 0.0.0.0:80 failed (98: Address already in use)
  [emerg] 15405#0: bind() to 0.0.0.0:443 failed (98: Address already in use)

When I stopped the nginx service, I could still see the ports being used::

  lsof -i :80
  lsof -i :443

From `bind() to 0.0.0.0:80 failed`_, killing the users of the port, sorted the
issue::

  sudo fuser -k 80/tcp
  sudo fuser -k 443/tcp

.. note:: I am not over happy about this solution.  But... I guess the
          processes were started somehow and had not been stopped?

PostgreSQL
==========

Ubuntu 14.04 LTS
----------------

.. warning:: Check you have a backup of all databases on your development
             machine.

If you have upgraded from a previous version of Ubuntu running Postgres 9.1,
you might need to completely remove the old version::

  sudo apt-get purge postgresql-9.1

Salt
====

Firewall
--------

.. note:: For Ubuntu only...

On the master and minion, open the Firewall for Salt::

  ufw allow salt

Minion ID
---------

To set the minion id::

  # /etc/salt/minion
  id: cloud-a

  # re-start the minion and accept the key on the master
  service salt-minion restart

.. note:: Might be worth checking out this article instead of editing the
          minion id:
          http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-hostname.html

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


.. _`configs with dots in file name not working in /etc/cron.d`: https://bugs.launchpad.net/ubuntu/+source/cron/+bug/706565

`bind() to 0.0.0.0:80 failed`
https://easyengine.io/tutorials/nginx/troubleshooting/emerg-bind-failed-98-address-already-in-use/
