Development Environment
***********************

.. highlight:: bash

.. note:: For Ubuntu 14.04 LTS

Packages
========

Install the following::

  sudo locale-gen en_GB.utf8
  sudo update-locale en_GB.utf8

Development tools (install ``vim`` or an editor of your choosing)::

  sudo apt-get install mercurial git vim wget

python development::

  sudo apt-get install python3-dev
  # pillow
  sudo apt-get install libtiff4-dev libjpeg8-dev zlib1g-dev \
    libfreetype6-dev liblcms2-dev libwebp-dev tcl8.5-dev tk8.5-dev python-tk

Postgres::

  sudo apt-get install postgresql libpq-dev

Redis::

  sudo apt-get install redis-server

bash
====

A simple script for directory based environments (if a directory contains a
``.env`` file it will automatically be executed when you ``cd`` into it)::

  git clone git://github.com/kennethreitz/autoenv.git ~/.autoenv
  echo 'source ~/.autoenv/activate.sh' >> ~/.bashrc

Database
========

Replace ``/etc/postgresql/9.3/main/pg_hba.conf``
with :download:`misc/pg_hba.conf`::

  sudo chown postgres:postgres /etc/postgresql/9.3/main/pg_hba.conf
  sudo chmod 640 /etc/postgresql/9.3/main/pg_hba.conf

Replace ``/etc/postgresql/9.3/main/postgresql.conf``
with :download:`misc/postgresql.conf`::

   sudo chown postgres:postgres /etc/postgresql/9.3/main/postgresql.conf
   sudo chmod 644 /etc/postgresql/9.3/main/postgresql.conf

Re-start Postgres::

  sudo /etc/postgresql/9.3/main/service postgres restart

Create a role for your user name (replace ``patrick`` with your linux user
name)::

  psql -X -U postgres -c "CREATE ROLE patrick WITH NOSUPERUSER CREATEDB NOCREATEROLE LOGIN;"

python
======

pip
---

Add the following to the ``~/.pip/pip.conf`` file::

  [install]
  download-cache=~/.pip/cache

Source Code
===========

Check out your source code into this folder structure::

  ├── repo
  │   ├── dev
  │   │   ├── app
  │   │   │   ├── base
  │   │   │   ├── block
  │   │   │   ├── booking
  │   │   │   ├── crm
  │   │   │   ├── enquiry
  │   │   │   ├── holding
  │   │   │   ├── invoice
  │   │   │   ├── login
  │   │   │   ├── mail
  │   │   │   ├── pay
  │   │   │   ├── search
  │   │   │   └── stock
  │   │   └── project
  │   │       ├── hatherleigh_info
  │   │       └── pkimber_net

The source code for the reusable apps go into the ``app`` folder.  The github
URL and documentation for my open source apps are here:

- :doc:`app-base`
- :doc:`app-block`
- :doc:`app-crm`
- :doc:`app-enquiry`
- :doc:`app-invoice`
- :doc:`app-login`
- :doc:`app-mail`
- :doc:`app-pay`
- :doc:`app-search`

Put the source code for your customer into the ``project`` folder e.g:
https://github.com/pkimber/pkimber_net

Follow the instructions in the ``README.rst`` file in the app or project
folder.
