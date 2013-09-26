Restore
*******

.. note::

  These are draft notes...  I have only restored once... but wanted to get
  started on the notes...

Copy a recent backup to the cloud server::

  scp ~/repo/backup/postgres/hatherleigh_net_20130926_113531_patrick.sql drop-temp:/home/patrick/repo/backup/postgres/

On the cloud server::

  cd ~/repo/backup/postgres/
  psql -X -U postgres -c "DROP DATABASE hatherleigh_net"                                         

On your workstation, re-create the database.  See :doc:`fabric-database`

.. note::

  You will need to comment out the ``CREATE ROLE`` command in the fabric script.

On the cloud server::

  psql -U postgres -d hatherleigh_net -f hatherleigh_net_20130926_113531_patrick.sql 2> out.log

Check the contents of ``out.log`` to make sure the restore succeeded.

.. note::

  We still have to restore the cloud files...
