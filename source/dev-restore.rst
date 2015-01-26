Restore
*******

.. highlight:: bash

List::

  fab live:hatherleigh_info list_current:backup
  fab live:hatherleigh_info list_current:files

Restore::

  fab live:hatherleigh_info restore:backup
  fab live:hatherleigh_info restore:files

  # to restore the database backup and the files
  fab live:hatherleigh_info restore:backup restore:files

~ Old Notes
~ =========
~
~ In the examples below replace:
~
~ - ``hatherleigh_info`` with your site name
~ - ``patrick`` with your user name
~ - ``test_hatherleigh_info_patrick`` with the database name from your settings
~   file e.g. ``settings/dev_patrick.py``
~
~ Database
~ ========
~
~ After backing up your database (:doc:`dev-backup`)::
~
~   psql -X -U postgres -c "DROP DATABASE test_hatherleigh_info_patrick"
~   psql -X -U postgres -c "CREATE DATABASE test_hatherleigh_info_patrick TEMPLATE=template0 ENCODING='utf-8';"
~   psql -X --set ON_ERROR_STOP=on -U postgres -d test_hatherleigh_info_patrick --file /home/patrick/repo/backup/postgres/hatherleigh_info.sql
~   psql -X -U postgres -d test_hatherleigh_info_patrick -c "REASSIGN OWNED BY hatherleigh_info TO patrick"
~
~ Files
~ =====
~
~ Extract a recent backup (from your workstation) to a temporary folder (in this
~ example ``drop_a_20140426_133620_patrick`` is the name of the temporary
~ folder and ``hatherleigh_info`` is the name of the site)::
~
~   mkdir ~/repo/temp/media/
~   cd ~/repo/temp/media/
~
~   tar xzf /home/patrick/repo/backup/files/drop_a_20140426_133620_patrick.tar.gz
~
~   mv hatherleigh_info/public/* ~/repo/dev/project/hatherleigh_info/media/
~
~ .. note:: You will probably need to remove the contents of the
~           ``media/public`` folder in your project before moving the files.
