Restore
*******

.. note::

  These are draft notes...  I have only restored once... but wanted to get
  started on the notes...

Database
========

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

MySQL
-----

::

  mysql --user=hatherleigh_net --password=mypassword --database=hatherleigh_net < /home/patrick/repo/backup/mysql/hatherleigh_net_20131230_125531_patrick.sql

Files
=====

Copy a recent backup from your workstation to the cloud server::

  scp ~/repo/backup/files/hatherleigh_net_20130926_121358_patrick.tar.gz web@drop-temp:/home/web/repo/backup/files/

.. note::

  We are copying the files as user ``web``.  We should get the correct
  permissions if we extract the files as the ``web`` user.

On the cloud server::

  sudo -i -u web
  cd /home/web/repo/files/
  tar xzf /home/web/repo/backup/files/hatherleigh_net_20130926_121358_patrick.tar.gz

.. warning::

  This will restore all files for all sites.  You might not want this!!

FTP
===

.. note::

  In this example, we are restoring files for the ``hatherleigh_net`` site.
  Please replace any references to ``hatherleigh_net`` with the correct site
  name.

Copy a recent backup from your workstation to the cloud server::

  scp /home/patrick/repo/backup/ftp/hatherleigh_net_20140319_165906_patrick.ftp.tar.gz web@drop-f:/home/web/repo/temp/

On the cloud server::

  sudo -i -u hatherleigh_net
  cd ~/site/
  tar xzf /home/web/repo/temp/hatherleigh_net_20140319_165906_patrick.ftp.tar.gz
