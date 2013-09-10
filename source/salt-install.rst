Salt - Install
**************

Master
======

Log into your master server as ``root``:

::

  vim /etc/salt/master
  # uncomment the following lines:
  # file_roots:
  #   base:
  #     - /srv/salt

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
