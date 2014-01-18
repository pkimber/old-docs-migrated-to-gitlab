SOLR
****

Requirements
============

::

  cssselect==0.9.1
  django-haystack==2.1.0
  lxml==3.2.1
  pysolr==3.1.0

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

Issues
------

The current version of Haystack has an issue with the ``simple_backend.py``:
https://github.com/toastdriven/django-haystack/commit/49564861

To temporarily fix the issue::

  cdsitepackages
  vim +67 haystack/backends/simple_backend.py

Edit the code so that it matches the fixed version on GitHub i.e::

  for field in model._meta.fields:

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
