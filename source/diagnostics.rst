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

See :doc:`maintain`

SOLR
====

Check the following logs (you will need to change the date)::

  vim /var/lib/tomcat7/logs/localhost.2014-04-23.log
