PHP
***

.. highlight:: bash

PHP sites are set-up in the pillar in the ``sites`` folder.  Create an ``sls``
file with ``sites`` at the root.  The sites are configured like this:

.. code-block:: yaml

  sites:
    hatherleigh_net:
      profile: php
      db_pass: password
      db_type: mysql
      db_user: hatherleigh
      ssl: False
      domain: hatherleigh.net
      packages:
        - name: drupal
          archive: drupal-6.29.tar.gz
          tar: --strip-components=1
        - name: adsense
          archive: adsense-6.x-1.5.tar.gz
          folder: sites/all/modules
        - name: views
          archive: views-6.x-2.16.tar.gz
          folder: sites/all/modules
      backup:

.. warning::

  A MySQL user name cannot be longer than 16 characters.  The ``db_user``
  setting is an *optional* parameter and should **only** be used where the
  site name (``hatherleigh_net`` in this example) is longer than 16
  characters.

.. note::

  The ``backup`` section is currently used for legacy sites.  When the legacy
  sites are gone I will remove it.

Deploy
======

Check the ``deploy/upload`` folder (see :doc:`site-config`) to see if it
contains the archive for the version of Drupal you want to install.

If you need a newer version, download a Drupal archive from
https://drupal.org/download.

Update the ``sites`` configuration so the ``drupal`` ``archive`` contains the
version you want to install.

To install Drupal and any modules listed in the ``packages`` section of the
pillar file, run the fabric deploy command e.g::

  fab -H web@drop-temp -f deploy.py deploy:server_name=drop-temp,site_name=hatherleigh_net,prefix=pkimber,version=1.0.01

Use the fabric ``create_db`` task to create the database (see
:doc:`fabric-database` for more information).

.. ``ssh`` into the server and create the MySQL database
.. (from `Create a database using MySQL commands`_)::
.. 
..   sudo -i -u root
..   mysql -u root mysql
.. 
.. .. code-block:: sql
.. 
..   CREATE USER 'hatherleigh_net'@'localhost' IDENTIFIED BY 'mypassword';
..   CREATE DATABASE hatherleigh_net;
..   GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, LOCK TABLES, CREATE TEMPORARY TABLES ON `hatherleigh_net`.* TO 'hatherleigh_net'@'localhost' IDENTIFIED BY 'mypassword';
.. 
.. .. warning:: A MySQL user name cannot be longer than 16 characters.

For instructions on how to restore the database, see :doc:`fabric-database`.

To restore the files, copy a recent full backup to the server and restore just
the custom bits e.g::

  sudo -i -u web
  cd ~/repo/project/hatherleigh_net/live/

  tar xvfz \
    /home/patrick/repo/backup/files/hatherleigh_net_20131230_140527_patrick.tar.gz \
    ./images \
    ./sites/all/libraries \
    ./sites/all/themes \
    ./sites/default/files \
    ./sites/default/settings.php

If you have changed the database settings, edit::

  ./sites/default/settings.php

To re-start the PHP service::

  service nginx restart; service php5-fpm restart


.. _`Create a database using MySQL commands`: https://drupal.org/documentation/install/create-database#direct
