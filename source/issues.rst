Issues
******

nginx
=====

502 Bad Gateway
---------------

This is a general error.  Find the cause by looking in the following files::

  sudo -i -u web
  # check the files in:
  tail -f ~/repo/uwsgi/log/

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

SOLR
====

The current version of Haystack has an issue with the ``simple_backend.py``:
https://github.com/toastdriven/django-haystack/commit/49564861

To temporarily fix the issue::

  cdsitepackages
  vim +67 haystack/backends/simple_backend.py

Edit the code so that it matches the fixed version on GitHub i.e::

  for field in model._meta.fields:

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
