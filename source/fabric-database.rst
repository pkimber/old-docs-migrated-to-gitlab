Database
********

If you are ready to deploy a Django site, start by creating a database...

.. note::

  Make sure the Salt pillar is configured correctly for the site.  You need to
  include the database password.

Create
------

To create a database for a site (in this example for ``hatherleigh_net``):

::

  fab create_db:dbname

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
