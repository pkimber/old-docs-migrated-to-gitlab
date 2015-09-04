Salt Cloud - Install
********************

.. highlight:: bash

Install::

  sudo apt-get install build-essential python-m2crypto sshpass python-software-properties
  sudo add-apt-repository ppa:saltstack/salt
  sudo apt-get update
  sudo apt-get install salt-cloud

On OSX::

  brew install swig
  mkvirtualenv create_cloud_server
  pip install M2Crypto
  brew install https://raw.github.com/eugeneoden/homebrew/eca9de1/Library/Formula/sshpass.rb

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
