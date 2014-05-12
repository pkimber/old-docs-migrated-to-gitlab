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

Profile
-------

::

  vim ~/repo/dev/module/deploy/salt-cloud/cloud.profiles

::

  droplet_512:
    provider: digitalocean
    size: 512MB
    image: Ubuntu 14.04 x32

Providers
---------

::

  vim ~/repo/dev/module/deploy/salt-cloud/cloud.providers

::

  digitalocean:
    client_key: the-client-key
    api_key: the-api-key
    provider: digital_ocean
    location: Amsterdam 1
    ssh_key_name: name-of-my-key.pub

The ``name-of-my-key.pub`` will look similar to this:: ``root@euston.pub`` (where
``euston`` is the host name of my workstation.

.. warning::

  The actual **name** must match... so if the name of the key in the Digital
  Ocean GUI is ``name-of-my-key.pub``, then this must match the value contained
  in ``ssh_key_name`` in ``cloud.providers``.

Usage
=====

To create a server called ``drop-temp`` (replace ``patrick`` with your own
name)::

  sudo -i
  salt-cloud \
      --profiles=/home/patrick/repo/dev/module/deploy/salt-cloud/cloud.profiles \
      --providers-config=/home/patrick/repo/dev/module/deploy/salt-cloud/cloud.providers \
      --profile droplet_512 \
      drop-temp

.. tip::

  To get some logging, add ``--log-level=debug`` to the ``salt-cloud`` command.

.. note::

  Take a note of the IP address of the newly created server

To log into the server::

  sudo -i
  ssh the.server.ip.address

Provision
=========

You will now want to set-up your server: :doc:`salt-provision`...

Utility
=======

Locations
---------

To list all locations for a provider (in this example for ``digitalocean``)::

  sudo -i
  salt-cloud \
    --profiles=/home/patrick/repo/dev/module/deploy/salt-cloud/cloud.profiles \
    --providers-config=/home/patrick/repo/dev/module/deploy/salt-cloud/cloud.providers \
    --list-location \
    digitalocean

.. note::

  You can also use ``--list-images`` and ``--list-sizes``
