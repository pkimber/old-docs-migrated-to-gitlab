SOLR
****

Packages
========

The following package is needed for SOLR/Haystack::

  sudo apt-get install libxslt1-dev

Requirements
============

Add the following to ``requirements/base.py``::

  cssselect==0.9.1
  django-haystack==2.1.0
  lxml==3.3.5
  pysolr==3.2.0

Development
===========

To enable Haystack in your project (in this example, our Django app name is
``contact``):

Add ``haystack`` to ``THIRD_PARTY_APPS``::

  THIRD_PARTY_APPS = (
      'haystack',

Set-up ``HAYSTACK_CONNECTIONS`` in ``settings/local.py``::

  HAYSTACK_CONNECTIONS = {
      'default': {
          'ENGINE': 'haystack.backends.simple_backend.SimpleEngine',
      },
  }

.. note::

  See :doc:`issues` for a current issue with the ``simple_backend``.

Set-up ``HAYSTACK_CONNECTIONS`` in ``settings/production.py``::

  HAYSTACK_CONNECTIONS = {
      'default': {
          'ENGINE': 'haystack.backends.solr_backend.SolrEngine',
          'URL': 'http://127.0.0.1:8080/solr/{}'.format(SITE_NAME)
      },
  }

Create a ``search_indexes.py`` file in your application folder (in this
example, ``contact/search_indexes.py``) e.g::

  from haystack import indexes
  from .models import Contact

  class ContactIndex(indexes.SearchIndex, indexes.Indexable):
      text = indexes.CharField(document=True, use_template=True)

      def get_model(self):
          return Contact

Create a template in the templates folder - in this example::

  contact/templates/search/indexes/contact/contact_text.txt

e.g::

  {{ object.first_name }}
  {{ object.surname }}

Deploy
======

Pillar
------

If you are using SOLR in your project, then include a pillar file containing
the following::

  solr:
    True

I create a file called ``config/solr.sls`` and include it in my ``top.sls``
file like this::

  'drop-temp':
    - config.solr

Set-up
------

SOLR needs a ``schema.xml`` file to work.  To create this file for your search
indexes, pipe the output of the ``build_solr_schema`` command into a new file
called ``schema.xml``::

  django-admin.py build_solr_schema

The current version of Haystack does not add a ``_version`` field to the
``schema.xml`` file.  You will see this error when running ``update_index``::

  Caused by: org.apache.solr.common.SolrException:
  _version_field must exist in schema,
  using indexed="true" stored="true" and multiValued="false"
  (_version_ does not exist)

To solve the problem, add a ``_version_`` field to the ``fields`` section of
``schema.xml``::

  <fields>
    <!-- other stuff... -->

    <field name="_version_" type="long" indexed="true" stored ="true"/>
  </fields>

For more information, see
https://github.com/toastdriven/django-haystack/issues/671

Copy your ``schema.xml`` to the following folder on your server (replacing
``hatherleigh_info`` with your site name)::

  /var/data/solr/multicore/hatherleigh_info/conf/schema.xml

Make sure the permissions are set as follows::

  -rw-r--r-- tomcat7 tomcat7

Re-start Tomcat::

  service tomcat7 restart

To create the SOLR index, see :doc:`fabric-search`.  A cron task should update
the index at regular intervals.

Configuration
-------------

Tomcat uses the following folders::

  /usr/share/tomcat7/
  /var/lib/tomcat7/
  /var/lib/tomcat7/logs/

Issue
=====

I am getting time-outs all the time.  I made a ``schema.xml`` file for both
sites on the server.

I edited::

  /usr/share/tomcat7/lib/log4j.properties:

To set the location of ``solr.log`` to::

  vim /tmp/tomcat7-tomcat7-tmp/solr.log

The log file is created when I do the following as the ``web`` user::

  pkimber_net.sh shell
  import requests
  requests.get('http://127.0.0.1:8080/solr/')

It has suddenly started working now... How?  Why?

Now it has stopped working!

Then it started working.  Is there some kind of delay in Tomcat getting
started?
