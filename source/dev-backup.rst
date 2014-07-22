Backup
******

.. highlight:: bash

In the examples below replace:

- ``drop-temp`` with your server name
- ``hatherleigh_info`` with your site name
- ``patrick`` with your user name

``ssh`` into the server...

Find the database password and IP address::

  cat /home/web/repo/uwsgi/vassals/hatherleigh_info.ini | grep DB_PASS
  cat /home/web/repo/uwsgi/vassals/hatherleigh_info.ini | grep DB_IP

Backup the data::

  mkdir -p ~/repo/backup/postgres/
  export PGPASSWORD="<database password>"
  pg_dump -U hatherleigh_info -h <database ip> hatherleigh_info -f ~/repo/backup/postgres/hatherleigh_info.sql

Exit the shell and copy the file back to your workstation::

  cd ~/repo/backup/postgres/
  scp drop-temp:/home/patrick/repo/backup/postgres/hatherleigh_info.sql .

To restore the database, see :doc:`dev-restore`
