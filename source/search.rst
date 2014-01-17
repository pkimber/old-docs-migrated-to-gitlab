SOLR
****

Requirements
============

::

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

Pillar
======

If you are using SOLR in your project, then include a pillar file containing
the following::

  solr:
    True

I create a file called ``config/solr.sls`` and include it in my ``top.sls``
file like this::

  'drop-temp':
    - config.solr
