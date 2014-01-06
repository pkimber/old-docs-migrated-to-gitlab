Salt Cloud - Install
********************

Prerequisites
=============

::

  apt-get install build-essential python-m2crypto sshpass python-software-properties
  add-apt-repository ppa:saltstack/salt
  apt-get update
  apt-get install salt-master

On OSX

::

  brew install swig
  mkvirtualenv create_cloud_server
  pip install M2Crypto
  brew install https://raw.github.com/eugeneoden/homebrew/eca9de1/Library/Formula/sshpass.rb

Virtual Environment
-------------------

**Note**: Don't forget to use the ``--system-site-packages`` parameter:

::

  cd create_cloud_server
  mkvirtualenv --system-site-packages create_cloud_server
  pip install -r requirements.txt

Configuration files
-------------------

The configuration files are kept securely and should
**never be copied to GitHub or BitBucket**:

::

  cd /etc/salt/
  sudo ln -s /secure/folder/cloud.profiles .
  sudo ln -s /secure/folder/cloud.providers .

Create a Server
===============

You can now follow the appropriate instructions for creating your own cloud
server:

- :doc:`salt-cloud-digitalocean`
- :doc:`salt-cloud-rackspace`
