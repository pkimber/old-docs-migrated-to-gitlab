ElasticSearch
*************

.. highlight:: bash

For building the fuzzy match code, I found the following articles very useful:

- `ElasticSearch - Searching For Human Names`_
- `Fuzzy Problem in Elasticsearch`_
- `phonetic token filter`_

Install
=======

For a development workstation, install elasticsearch_



Install the phoentic search plugins::

  sudo -i
  cd /usr/share/elasticsearch/
  bin/plugin install analysis-phonetic

  service elasticsearch restart

.. tip:: For more information on the Phonetic Plugins, see `Custom Analyzers`_
         and `Phonetic Analysis Plugin`_


.. _`Custom Analyzers`: https://www.elastic.co/guide/en/elasticsearch/guide/current/custom-analyzers.html
.. _`ElasticSearch - Searching For Human Names`: http://stackoverflow.com/questions/20632042/elasticsearch-searching-for-human-names
.. _`Fuzzy Problem in Elasticsearch`: http://www.basistech.com/fuzzy-search-names-in-elasticsearch/
.. _`Phonetic Analysis Plugin`: https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-phonetic.html
.. _`phonetic token filter`: https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-phonetic-token-filter.html
.. _elasticsearch: https://www.pkimber.net/howto/java/apps/elasticsearch.html
