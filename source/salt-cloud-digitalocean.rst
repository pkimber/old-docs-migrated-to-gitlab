Digital Ocean
*************

Configuration
=============

.. note::

  Upload the public key for your root user to
  https://www.digitalocean.com/ssh_keys

  Give the key a name (e.g. ``name-of-my-key.pub``) and add to
  ``ssh_key_name`` in ``cloud.providers`` (see below).

  It took me a while to understand this.  Thank you to Russell Ballestrini for
  this article:
  http://russell.ballestrini.net/create-your-own-fleet-of-servers-with-digital-ocean-and-salt-cloud/

Set-up a virtual environment::

  mkvirtualenv --system-site-packages dev_create_cloud_server

Profile
-------

::

  vim /etc/salt/cloud.profiles

::

  droplet_512:
    provider: digitalocean
    size: 512MB
    image: Ubuntu 12.04 x64

Providers
---------

::

  vim /etc/salt/cloud.providers

::

  digitalocean:
    client_key: the-client-key
    api_key: the-api-key
    provider: digital_ocean
    location: Amsterdam 1
    ssh_key_name: name-of-root-key

The ``name-of-root-key`` will look similar to this:: ``root@euston.pub`` (where
``euston`` is the host name of my workstation.

Usage
=====

To create a server called ``drop-temp`` (replace ``patrick`` with your own
name)::

  sudo ~/.virtualenvs/dev_create_cloud_server/bin/python \
      ~/.virtualenvs/dev_create_cloud_server/bin/salt-cloud \
      --profiles=/home/patrick/repo/dev/module/deploy/salt-cloud/cloud.profiles \
      --providers-config=/home/patrick/repo/dev/module/deploy/salt-cloud/cloud.providers \
      -p droplet_512 \
      drop-temp

.. note::

  Take a note of the IP address of the newly created server

To log into the server::

  sudo -i -u root
  ssh the.server.ip.address

Provision
=========

You will now want to set-up your server: :doc:`salt-provision`...
