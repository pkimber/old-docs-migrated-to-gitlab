Database
********

.. highlight:: bash

If you are ready to deploy a Django site, start by creating a database...

Create
======

.. note::

  Make sure the Salt pillar is configured correctly for the site.  You need to
  include the database password and a folder containing the database settings.

  For details, see :doc:`site-config`

To create a database for a site::

  cd fabric
  fab test:hatherleigh_info create_db

  # if your would like to use a Postgres table space name
  fab test:hatherleigh_info create_db:cbs

You are now ready to :doc:`fabric-deploy` your site...

Drop/Delete
===========

To drop a database, you will need to append the current date and time e.g::

  fab test:hatherleigh_info drop_db:02/02/2015-16:54

Maintenance
===========

- :doc:`backup`
- :doc:`dev-restore`
- :doc:`restore`
