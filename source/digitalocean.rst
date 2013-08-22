Digital Ocean
*************

How to create a new server and deploy a web site.

Follow the *Digital Ocean* instructions in the ``create_cloud_server`` module
to create your server...

  Make a note of the IP address of the new server e.g. 1.2.3.4

Log into the server as ``root`` using the IP address above:

::

  sudo ssh root@1.2.3.4

Edit the Salt Minion configuration file, set the IP address for the Salt Master and
re-start the minion:

::

  vi /etc/salt/minion
  
  master: 5.6.7.8

  stop salt-minion
  start salt-minion

Log into your Salt Master, accept the key for the new minion and make sure the
minion is receiving requests:

::

  sudo -i -u root

  salt-key -L
  salt-key -a temp.server.b

  salt '*' test.ping

Staying logged into the master as root, apply the update to the minion:

::

  cd /srv/salt/
  salt 'temp.server.*' state.highstate
