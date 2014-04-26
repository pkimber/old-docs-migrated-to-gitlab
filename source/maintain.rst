Maintenance
***********

.. highlight:: bash

Site
====

To run django management commands on the server, first ``ssh`` to the server,
then ``sudo`` to ``web``::

  sudo -i -u web

Each site on the server will have a bash script in the ``opt`` folder.
For ``hatherleigh_info`` the script is::

  /home/web/opt/hatherleigh_info.sh

This script is on the path, will put you into the virtual environment and can
be used in the same way as ``django-admin.py`` on your development machine
e.g::

  hatherleigh_info.sh shell

Tidy
====

.. warning::

  Only run this command if you have deployed a release within the last week!

To remove old deploy folders in the ``hatherleigh_net`` project::

  sudo -i -u web
  find /home/web/repo/project/hatherleigh_net/deploy -maxdepth 1 -type d -ctime +21 -exec rm -rf {} \;
