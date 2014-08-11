Monitor
*******

.. highlight:: bash

::

  psql -X -U postgres -c "CREATE ROLE graphite WITH PASSWORD '<your db password>' NOSUPERUSER CREATEDB NOCREATEROLE LOGIN;"
  psql -X -U postgres -c "CREATE DATABASE graphite WITH OWNER=graphite TEMPLATE=template0 ENCODING='utf-8';"
