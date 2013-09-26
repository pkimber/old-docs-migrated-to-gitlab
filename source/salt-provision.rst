Salt - Provision
****************

After following the :doc:`salt-cloud-digitalocean` or
:doc:`salt-cloud-rackspace` instructions to create your
server...  you will want to use Salt to set it up...

Minion
======

Log into the new server as ``root`` using the IP address:

::

  sudo -i -u root
  ssh the.server.ip.address

Edit the Salt Minion configuration file, set the IP address for the Salt Master and
re-start the minion:

::

  vi /etc/salt/minion

  master: the.master.ip.address

  stop salt-minion
  start salt-minion

Log into your Salt Master as yourself (make sure you exit the ``root`` session from
the previous step).  Accept the key for the new minion and make sure the minion is
receiving requests:

::

  sudo -i -u root

  salt-key -L
  salt-key -a drop-temp

  salt '*' test.ping

Staying logged into the master as root and apply the configuration to the minion.

.. note::

  Make sure the Salt pillar is configured correctly for the new server.

.. note::

  Check that the latest Salt configuration and the pillar data are on the master.

::

  cd /srv/salt/
  salt 'drop-*' state.highstate

Your new server should now be provisioned.  If your pillar file contained a
list of ``users``, they should have been created.

You might like to add the server to your ssh configuration file e.g:

::

  vim ~/.ssh/config

  Host drop-temp
      HostName 37.139.130.130
      Compression yes

If your pillar file contained a ``site``, then click here for instructions on
getting started: :doc:`fabric-database`
