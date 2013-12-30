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
  fab -H drop-temp create_db:server_name=drop-temp,site_name=hatherleigh_net

  # if your would like to specify a Postgres table space name
  fab -H drop-temp create_db:server_name=drop-temp,site_name=hatherleigh_net,table_space=cbs

You are now ready to :doc:`fabric-deploy` your site...

Maintenance
===========

Backup
------

To backup a database (in this example ``hatherleigh_net``)::

  fab -H drop-temp backup_db:server_name=drop-temp,site_name=hatherleigh_net

The backup will be copied from the server into the following folder on your
local workstation::

  ~/repo/backup/postgres/

To restore the database, see :doc:`restore`...

To backup the files for *all* sites on a cloud server::

  fab -H drop-temp backup_files

The backup will be copied to the following folder on your workstation::

  ~/repo/backup/files/

To restore the files, see :doc:`restore`...

Restore
-------

MySQL::

  mysql --user=hatherleigh_net --password=mypassword --database=hatherleigh_net < /home/patrick/repo/backup/mysql/hatherleigh_net_20131230_125531_patrick.sql

Version
-------

::

  fab db_version
