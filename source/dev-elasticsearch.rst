ElasticSearch
*************

.. highlight:: bash

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
.. _`Phonetic Analysis Plugin`: https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-phonetic.html
.. _elasticsearch: https://www.pkimber.net/howto/java/apps/elasticsearch.html
