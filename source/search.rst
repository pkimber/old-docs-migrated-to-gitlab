SOLR
****

Requirements
============

::

  django-haystack==2.1.0
  lxml==3.2.1
  pysolr==3.1.0

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
