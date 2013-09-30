Salt Master
***********

.. note::

  A Salt master starts life as a minion.

To create the minion (which will become a master), follow the instructions in
:doc:`salt-cloud-install`, followed by :doc:`salt-cloud-digitalocean` or
:doc:`salt-cloud-rackspace`

Log into your new master server as ``root``...

Install
-------

Install salt master::

  apt-get update
  apt-get install salt-master

Configuration
-------------

::

  vim /etc/salt/master
  # uncomment the following lines:
  # file_roots:
  #   base:
  #     - /srv/salt

  # and uncomment the following lines:
  # pillar_roots:
  #   base:
  #     - /srv/pillar

Then re-start the salt master:

::

  restart salt-master
  # or:
  sudo /etc/init.d/salt-master restart

Check out the ``sls`` and pillar files from your repository so they are in the
following folder structure:

::

  ├── srv
  │   ├── pillar
  |   │   ├── db
  |   │   ├── global
  |   │   ├── README.rst
  |   │   ├── service
  |   │   ├── sites
  |   │   └── top.sls
  │   ├── salt
  |   │   ├── db
  |   │   ├── default
  |   │   ├── devpi
  |   │   ├── nginx
  |   │   ├── README.rst
  |   │   ├── solr
  |   │   ├── ssh
  |   │   ├── supervisor
  |   │   ├── top.sls
  |   │   ├── uwsgi
  |   │   └── web
  │   └── ssl

Provision
---------

The Salt pillar should be set-up to install the services you require for your
master e.g::

  base:
    'master':
      - global.yourcompany.users
      - service.yourcompany.devpi

To set-up your ``master``, follow the instructions in :doc:`salt-provision`
remembering to use ``localhost`` as the IP address of the master.
