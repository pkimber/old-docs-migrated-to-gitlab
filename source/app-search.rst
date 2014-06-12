Search
******

.. highlight:: bash

:doc:`solr`

ElasticSearch
=============

In your ``requirements/base.txt``, add the following::

  django-haystack==2.1.0
  pyelasticsearch==0.6.1

Test
----

To check the install::

  curl -X GET 'http://localhost:9200'

Issues
------

If SOLR was previously installed on a server, you will want to remove OpenJDK
and Tomcat before installing ElasticSearch::

  apt-get remove openjdk-7-jre-headless
  apt-get remove tomcat7

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
