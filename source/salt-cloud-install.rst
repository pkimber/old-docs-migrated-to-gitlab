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

The configuration files are kept securely and should
**never be copied to a public repository e.g. DropBox, GitHub or BitBucket**
(replace ``patrick`` with your own name)::

  sudo -i
  cd /etc/salt/
  sudo ln -s /home/patrick/repo/dev/module/deploy/salt-cloud/cloud.profiles .
  sudo ln -s /home/patrick/repo/dev/module/deploy/salt-cloud/cloud.providers .

Create a Server
===============

You can now follow the appropriate instructions for creating your own cloud
server:

- :doc:`salt-cloud-digitalocean`
- :doc:`salt-cloud-rackspace`
