Monitor
*******

.. highlight:: bash

.. _monitor_server:

Server
======

To create a monitor (Graphite) server, start by adding a ``monitor`` section to
the ``pillar``:

.. code-block:: yaml

  monitor:
    uwsgi_port: 3032
    db_pass: your-db-password
    secret_key: my-secret-key-generated-by-django
    domain: monitor.hatherleigh.info

Note:

- We normally install a monitor onto a separate server because our apps use
  python 3 and Graphite uses python 2 (not sure if they will work together).
- To generate a unique secret key, see :ref:`generate_secret_key`
- The ``domain`` is used to fill in the Django ``ALLOWED_HOSTS`` field.  You
  will probably want to copy this domain to the ``django`` pillar file (see
  below).

::

  psql -X -U postgres -c "CREATE ROLE graphite WITH PASSWORD '<your-db-password>' NOSUPERUSER CREATEDB NOCREATEROLE LOGIN;"
  psql -X -U postgres -c "CREATE DATABASE graphite WITH OWNER=graphite TEMPLATE=template0 ENCODING='utf-8';"

Diagnostics
===========

Check storage schema::

  /opt/graphite/bin/validate-storage-schemas.py

Client
======

The monitor client is configured in the ``django`` pillar file e.g:

.. code-block:: yaml

  django:
    monitor: monitor.hatherleigh.info

.. note:: This will probably be the same as the domain name configured in the
          server (see :ref:`monitor_server` above).

Diagnostics
===========

To run ``statsd`` without ``supervisord``::

  /usr/bin/nodejs /opt/statsd/stats.js /opt/statsd/localConfig.js

To view the messages received by ``statd``, edit ``/opt/statsd/localConfig.js``
and add ``dumpMessages: true`` e.g::

  {
      graphitePort: 2003,
      graphiteHost: "monitor.hatherleigh.info",
      port: 8125,
      dumpMessages: true,
      backends: [ "./backends/graphite" ]
  }

.. tip:: Don't forget to stop ``statsd`` in ``supervisorctl`` if running from
         the command line.

From `Looking Under the Covers of StatsD`_

To see the statistics from the management interface::

   echo "stats" | nc localhost 8126

   (echo "timers" | nc localhost 8126)
   (echo "counters" | nc localhost 8126)

To see if the monitor server is accepting connections::

   telnet monitor.hatherleigh.info 2003

To send some data to ``statsd``::

  echo "foo:1|c" | nc -u -w0 127.0.0.1 8125


.. _`Looking Under the Covers of StatsD`: http://blog.johngoulah.com/2012/10/looking-under-the-covers-of-statsd/
