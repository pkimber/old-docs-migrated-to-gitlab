Diagnostics
***********

.. highlight:: bash

ElasticSearch
=============

See :doc:`app-search`...

If you want to see what is being indexed for a model, log into your cloud
server and run the following ``curl`` command::

  curl "localhost:9200/hatherleigh_info/_search?q=django_ct:crm.ticket&size=500&pretty"

Replace:

- ``hatherleigh_info`` with your site name.
- ``crm.ticket`` with the model you want to check.

Site
====

Also see :doc:`maintain`

If the site isn't running (perhaps nginx is displaying a ``502 Bad Gateway``
error):

Check supervisor to see if uWSGI is running::

  sudo -i
  # supervisorctl
  uwsgi                            RUNNING    pid 1104, uptime 0:04:01

If the process is not running, check the supervisor logs e.g::

  tail /var/log/supervisor/uwsgi-stderr---supervisor-IupGOf.log
  tail /var/log/supervisor/uwsgi-stdout---supervisor-IEfygY.log

If uWSGI is running without a problem, check the uWSGI logs for the project
e.g::

  sudo -i -u web
  tail ~/repo/uwsgi/log/hatherleigh_info.log

It is a good idea to check the application logs e.g::

  tail ~/repo/project/hatherleigh_info/live/logfile

SOLR
====

Check the following logs (you will need to change the date)::

  vim /var/lib/tomcat7/logs/localhost.2014-04-23.log
