Digital Ocean
*************

Configuration
=============

.. note::

  Upload the public key for your root user to https://www.digitalocean.com/ssh_keys
  Give the key a name (e.g. ``name-of-my-key.pub``) and add to ``ssh_key_name``
  in ``cloud.providers`` (see below).

  It took me a while to understand this.  Thank you to Russell Ballestrini for
  this article:
  http://russell.ballestrini.net/create-your-own-fleet-of-servers-with-digital-ocean-and-salt-cloud/

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

Usage
=====

To create a server called ``drop-temp``:

::

  sudo ~/.virtualenvs/create_cloud_server/bin/python \
      ~/.virtualenvs/create_cloud_server/bin/salt-cloud \
      -p droplet_512 \
      drop-temp

.. note::

  Take a note of the IP address of the newly created server

To log into the server:

::

  sudo -i -u root
  ssh the.server.ip.address
