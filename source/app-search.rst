search
******

.. highlight:: bash

https://github.com/pkimber/search

ElasticSearch
=============

Prerequisites
-------------

Setup :doc:`celery`...

If :doc:`solr` was previously installed on the server, you will need to remove
OpenJDK and Tomcat before installing ElasticSearch::

  apt-get remove openjdk-7-jre-headless
  apt-get remove tomcat7

Install
-------

In your ``requirements/base.txt``, add the following::

  celery-haystack==0.8
  django-celery-transactions==0.1.3
  django-haystack==2.2.0
  elasticsearch==1.2.0

In ``settings/base.py``:

.. code-block:: python

  THIRD_PARTY_APPS = (
      'celery_haystack',

In ``settings/local.py``:

.. code-block:: python

  HAYSTACK_CONNECTIONS = {
      'default': {
          'ENGINE': 'haystack.backends.simple_backend.SimpleEngine',
      },
  }

In ``settings/production.py`` (after ``CELERY_DEFAULT_QUEUE``)::

  from celery.schedules import crontab
  CELERYBEAT_SCHEDULE = {
      'update_search_index': {
          'task': 'search.tasks.update_search_index',
          'schedule': crontab(minute='15', hour='*/1'),
      },
  }

In ``settings/production.py`` (after ``FTP_STATIC_URL``):

.. code-block:: python

  HAYSTACK_CONNECTIONS = {
      'default': {
          'BATCH_SIZE': 100,
          'ENGINE': 'haystack.backends.elasticsearch_backend.ElasticsearchSearchEngine',
          'INDEX_NAME': '{}'.format(SITE_NAME),
          'TIMEOUT': 60 * 5,
          'URL': 'http://127.0.0.1:9200/',
      },
  }
  HAYSTACK_SIGNAL_PROCESSOR = 'celery_haystack.signals.CelerySignalProcessor'

.. note:: Remember to use the correct pattern for transactions when queuing
          search index updates.  For details, see :ref:`django_transactions`

In your ``search_indexes.py`` modules, inherit from ``CelerySearchIndex``:

.. code-block:: python

  from celery_haystack.indexes import CelerySearchIndex
  from haystack import indexes

  class ContactIndex(CelerySearchIndex, indexes.Indexable):
      # etc

For further information, see `celery-haystack`_

Diagnostics
===========

For diagnostics, see :doc:`diagnostics`...

Maintenance
===========

To manually update the index::

  django-admin.py update_index

The flush process of an index basically frees memory::

  curl localhost:9200/_flush

Test
====

To check the install::

  curl -X GET 'http://localhost:9200'

Search
======

::

  curl "localhost:9200/hatherleigh_info/_search?q=cloud&pretty"

Replace ``hatherleigh_info`` with your site name.  In this example, we are
searching for ``cloud``.


.. _`celery-haystack`: http://celery-haystack.readthedocs.org/en/latest/
