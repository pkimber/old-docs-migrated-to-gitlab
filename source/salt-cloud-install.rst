Salt Cloud - Install
********************

.. highlight:: bash

.. important:: These instructions should install version 2015.8.3 (Beryllium)

Install::

  sudo apt-get install build-essential python-m2crypto sshpass python-software-properties
  sudo add-apt-repository ppa:saltstack/salt
  sudo apt-get update
  sudo apt-get install salt-cloud

If the instructions above do not install version 2015.8.3, then try this::

  sudo -i
  wget -O - https://repo.saltstack.com/apt/ubuntu/14.04/amd64/latest/SALTSTACK-GPG-KEY.pub | sudo apt-key add -

Add the following line to ``/etc/apt/sources.list``::

  # vim /etc/apt/sources.list
  deb http://repo.saltstack.com/apt/ubuntu/14.04/amd64/latest trusty main

  sudo apt-get update
  sudo apt-get install salt-cloud

Configuration files
-------------------

.. warning:: The configuration files are kept securely and should **never be
             copied to a public repository e.g. DropBox, GitHub or BitBucket**

.. note:: Replace ``patrick`` with your *User Name* (:doc:`checklist`)

.. note:: Replace ``yb`` with your *Company Abbreviation* (:doc:`checklist`)

::

  sudo -i
  cd /etc/salt/cloud.profiles.d/
  sudo ln -s /home/patrick/repo/dev/module/deploy/salt-cloud/yb.profiles.conf .
  cd /etc/salt/cloud.providers.d/
  sudo ln -s /home/patrick/repo/dev/module/deploy/salt-cloud/yb.providers.conf .

Create a Server
===============

You can now follow the appropriate instructions for creating your own cloud
server:

- :doc:`salt-cloud-amazon`
- :doc:`salt-cloud-digitalocean`
- :doc:`salt-cloud-rackspace`
