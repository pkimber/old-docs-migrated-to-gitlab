Database
********

Backup
------

To backup a database (in this example ``dbname``):

::

  fab -H web.server backup_files && fab -H db.server backup_db:dbname

The backup will be copied from the server into the following folder on your local workstation:

::

  ~/repo/backup/csw/postgres/

Database - Create
-----------------

To create a database for a new client (in this example for ``dbname``):

::

  fab create_db:dbname

Database - Version
------------------

::

  fab db_version
