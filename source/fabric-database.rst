Database
********

If you are ready to deploy a Django site, start by creating a database...

.. note::

  Make sure the Salt pillar is configured correctly for the site.  You need to
  include the database password.

Create
------

To create a database for a site (in this example for the server ``drop-temp``
and the site ``hatherleigh_net``):

::

  fab -H drop-temp create_db:site_name=hatherleigh_net,table_space=

  # if your would like to specify a Postgres table space name
  fab -H drop-temp create_db:site_name=hatherleigh_net,table_space=cbs

You are now ready to :doc:`fabric-deploy` your site...

Maintenance
===========

Backup
------

To backup a database (in this example ``dbname``):

::

  fab -H web.server backup_files && fab -H db.server backup_db:dbname

The backup will be copied from the server into the following folder on your local workstation:

::

  ~/repo/backup/csw/postgres/

Database - Version
------------------

::

  fab db_version
