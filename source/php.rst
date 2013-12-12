PHP
***

.. highlight:: bash

PHP sites are set-up in the pillar in the ``sites`` folder.  Create an ``sls``
file with ``php`` at the root.  The sites are configured like this:

.. code-block:: yaml

  php:
    myphpsite_com:
      domain: westcountrycoders.co.uk


To re-start the PHP service::

  service nginx restart; service php5-fpm restart

Deploy
======

To install Drupal onto your PHP server, first download a Drupal archive from
https://drupal.org/download.

Copy the archive to the ``~/Downloads/drupal/`` folder.

Run the ``drupal`` command, passing the name of the archive as the final
parameter e.g::

  fab -H web@drop.temp -f lamp.py drupal:site_name=hatherleigh_net,archive=drupal-6.29.tar.gz

``ssh`` into the server and create the MySQL database
(from `Create a database using MySQL commands`_)::

  sudo -i -u root
  mysql -u root mysql

.. code-block:: sql

  CREATE USER 'hatherleigh_net'@'localhost' IDENTIFIED BY 'mypassword';
  CREATE DATABASE hatherleigh_net;
  GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, LOCK TABLES, CREATE TEMPORARY TABLES ON `hatherleigh_net`.* TO 'hatherleigh_net'@'localhost' IDENTIFIED BY 'mypassword';

.. warning:: A MySQL user name cannot be longer than 16 characters.


.. _`Create a database using MySQL commands`: https://drupal.org/documentation/install/create-database#direct
