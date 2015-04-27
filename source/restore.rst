Restore
*******

.. highlight:: bash

Click here for the :doc:`backup` notes...

.. note:: In the examples below, I am restoring a ``test`` server.  The
          procedure is more or less the same for a live site.  Just be more
          careful!!

.. note:: I am restoring to a date folder in the ``~/repo/temp/`` folder
          (``~/repo/temp/2015-04-27-backup/`` and
          ``~/repo/temp/2015-04-27-files/``).  Please change the date to the
          day when you do the work!

.. note:: ``20150427_0100.sql`` is the database dump file used in this example.
          Please select the most recent file for your restore.

Database
========

On the server as user ``web``::

  psql -U postgres
  drop database hatherleigh_info_test;

On the workstation::

  fab test:hatherleigh_info create_db

On the server as user ``web``::

  # download the files from duplicity
  PASSPHRASE="****" \
  duplicity \
    ssh://123@usw-s011.rsync.net/hatherleigh_info/backup \
    /home/web/repo/temp/2015-04-27-backup/

  # restore the duplicity files to the database
  psql -U postgres -d hatherleigh_info_test \
    -f ~/repo/temp/2015-04-27-backup/20150427_0100.sql 2> out.log

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
