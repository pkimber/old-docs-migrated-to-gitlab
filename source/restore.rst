Restore
*******

.. highlight:: bash

Click here for the :doc:`backup` notes...

.. note:: In the examples below, I am restoring to a ``test`` server.  The
          procedure is more or less the same for a live site.  **Just be more
          careful!!**

.. note:: I am restoring to date folders in the ``~/repo/temp/`` folder
          (``~/repo/temp/2015-04-27-backup/`` and
          ``~/repo/temp/2015-04-27-files/``).  Please change the date to the
          day when you do the work.

.. note:: The database dump file used in this example is ``20150427_0100.sql``.
          Please select the most recent file for your restore.

Database
========

On the server as user ``web``::

  psql -U postgres
  drop database hatherleigh_info_test;

On the workstation::

  fab test:hatherleigh_info create_db

On the server as user ``web``::

  # download the backup from duplicity
  PASSPHRASE="****" \
  duplicity \
    ssh://123@usw-s011.rsync.net/hatherleigh_info/backup \
    /home/web/repo/temp/2015-04-27-backup/

  # restore the duplicity files to the database
  psql -U postgres -d hatherleigh_info_test \
    -f ~/repo/temp/2015-04-27-backup/20150427_0100.sql 2> out.log

.. tip:: Check the ``out.log`` file for import issues.

If required, set the owner of the database tables::

  psql -X -U postgres -d hatherleigh_info_test -c "REASSIGN OWNED BY another_owner TO hatherleigh_info"

Files
=====

On the server as user ``web``::

  # download the files from duplicity
  PASSPHRASE="****" \
  duplicity \
    ssh://123@usw-s011.rsync.net/hatherleigh_info/files \
    /home/web/repo/temp/2015-04-27-files/

  # restore the duplicity files
  cd ~/repo/files/hatherleigh_info/
  # move (or remove) the existing public and private folders before replacing
  # with the restored folders:
  mv ~/repo/temp/2015-04-27-files/private .
  mv ~/repo/temp/2015-04-27-files/public .
