Backup
******

To backup a database (in this example ``hatherleigh_net``)::

  fab site:hatherleigh_info backup_db

The backup will be copied from the server into the following folder on your
local workstation::

  ~/repo/backup/postgres/

To restore the database, see :doc:`restore`...

To backup the files for *all* sites on a cloud server::

  fab -H drop-temp backup_files

The backup will be copied to the following folder on your workstation::

  ~/repo/backup/files/

To restore the files, see :doc:`restore`...

