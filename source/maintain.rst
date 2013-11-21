Maintenance
***********

.. warning::

  Only run this command if you have deployed a release within the last week!

To remove old deploy folders in the ``hatherleigh_net`` project::

  sudo -i -u web
  find /home/web/repo/project/hatherleigh_net/deploy -maxdepth 1 -type d -ctime +21 -exec rm -rf {} \;
