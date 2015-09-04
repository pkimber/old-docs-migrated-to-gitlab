Digital Ocean
*************

Configuration
=============

.. note::

  Upload the public key for your root user to
  https://cloud.digitalocean.com/settings/security

  Give the key a *Name* (e.g. ``name-of-my-key.pub``) and add to
  ``ssh_key_name`` in ``cloud.providers`` (see below).

  It took me a while to understand this.  Thank you to Russell Ballestrini for
  this article:
  http://russell.ballestrini.net/create-your-own-fleet-of-servers-with-digital-ocean-and-salt-cloud/

Profile
-------

.. note:: Replace ``yb`` with your *Company Abbreviation* (:doc:`checklist`)

::

  vim ~/repo/dev/module/deploy/salt-cloud/yb.profiles.conf

::

  droplet_512:
    provider: digitalocean
    size: 512MB
    image: Ubuntu 14.04 x32

Providers
---------

.. note:: Replace ``yb`` with your *Company Abbreviation* (:doc:`checklist`)

::

  vim ~/repo/dev/module/deploy/salt-cloud/yb.providers.conf

::

  digitalocean:
    client_key: the-client-key
    api_key: the-api-key
    provider: digital_ocean
    location: London 1
    ssh_key_file: /root/.ssh/id_rsa.pub
    ssh_key_name: name-of-my-key.pub

The ``name-of-my-key.pub`` is the same name as you entered in the Digital Ocean
Control Panel (see above).

.. warning::

  The actual **name** must match... so if the name of the key in the Digital
  Ocean Control Panel is ``name-of-my-key.pub``, then this must match the value
  contained in ``ssh_key_name`` in ``yb.providers.conf``.

Usage
=====

To create a server called ``drop-temp``::

  sudo -i
  salt-cloud -p droplet_512 drop-temp

.. tip:: For logging, add ``--log-level=debug`` to the ``salt-cloud`` command.

.. note:: Take a note of the IP address of the newly created server

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
  salt-cloud --list-location digitalocean

.. note::

  You can also use ``--list-images`` and ``--list-sizes``
