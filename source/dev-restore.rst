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
