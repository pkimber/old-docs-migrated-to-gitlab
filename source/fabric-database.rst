Database
********

If you are ready to deploy a Django site, start by creating a database...

Create
======

.. note::

  Make sure the Salt pillar is configured correctly for the site.  You need to
  include the database password and a folder containing the database settings.

  For details, see :doc:`site-config`

To create a database for a site (in this example for the server ``drop-temp``
and the site ``hatherleigh_net``)::

  cd fabric
  fab site:hatherleigh_info create_db

  # if your would like to use a Postgres table space name
  fab site:hatherleigh_info create_db:table_space=cbs

You are now ready to :doc:`fabric-deploy` your site...

Maintenance
===========

- :doc:`fabric-backup`
- :doc:`restore`

Version
-------

::

  fab db_version
