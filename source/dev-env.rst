Development Environment
***********************

.. highlight:: bash

.. note:: For Ubuntu 14.04 LTS

Packages
========

Install the following packages...

::

  sudo locale-gen en_GB.utf8
  sudo update-locale en_GB.utf8

Development tools (install ``vim`` or an editor of your choosing)::

  sudo apt-get install vim git wget

python development::

  sudo apt-get install python3-dev

The following packages are needed for ``pillow``::

  sudo apt-get install libtiff4-dev libjpeg8-dev zlib1g-dev \
    libfreetype6-dev liblcms2-dev libwebp-dev tcl8.5-dev tk8.5-dev python-tk

Postgres::

  sudo apt-get install postgresql libpq-dev

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

Virtual Environment
-------------------

To create a virtual environment e.g. ``venv-name``::

  pyvenv-3.4 --without-pip venv-name
  source venv-name/bin/activate
  wget https://raw.githubusercontent.com/pypa/pip/master/contrib/get-pip.py
  python get-pip.py

To activate a virtual environment::

  source venv-name/bin/activate
