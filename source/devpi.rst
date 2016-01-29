devpi
*****

.. highlight:: bash

.. note:: Refer to your company :doc:`checklist` and replace
          ``devpi.yourbiz.co.uk`` with the name of your ``devpi`` server.
          Do the same for the username and password.

Salt
====

Salt requires two separate bits of information in your pillar.  The first is
the server configuration.  Here is an example file:

.. code-block:: yaml

  devpi:
    domain: devpi.yourbiz.co.uk
    port: 4040

The ``domain`` name is the server where your ``devpi`` service is running.

The ``port`` number is the one on which the local ``devpi`` service is
running.  The ``port`` is used when the service is started by ``supervisor``.
For details, see:
https://github.com/pkimber/salt/blob/master/supervisor/devpi.conf

The second piece of information required in your pillar is the configuration of
``pip``.  Here is an example file:

.. code-block:: yaml

  pip:
    index_url: http://devpi.yourbiz.co.uk/bz/dev/+simple/

Prerequisites
=============

Create an SSL certificate (:doc:`ssl`).

Copy the SSL certificate from your workstation to the server::

  scp server.key devpi.yourbiz.co.uk:/home/patrick/repo/temp/
  scp ssl-unified.crt devpi.yourbiz.co.uk:/home/patrick/repo/temp/

Create the folder for the certificates and update permissions::

  ssh devpi.yourbiz.co.uk
  sudo -i
  mkdir -p /srv/ssl/devpi/
  chown www-data:www-data /srv/ssl
  chmod 0400 /srv/ssl
  chown www-data:www-data /srv/ssl/devpi
  chmod 0400 /srv/ssl/devpi

  mv /home/patrick/repo/temp/server.key /srv/ssl/devpi/
  mv /home/patrick/repo/temp/ssl-unified.crt /srv/ssl/devpi/
  chown www-data:www-data /srv/ssl/devpi/*
  chmod 0400 /srv/ssl/devpi/*

Re-start the nginx server::

  service nginx restart

Initial Configuration
=====================

To configure http://doc.devpi.net/ after Salt has installed it on your server,
run the following commands on your workstation::

  # virtual environment
  virtualenv --python=python3.4 venv-devpi-client
  source venv-devpi-client/bin/activate
  pip install --upgrade pip

  pip install devpi-client

.. important:: Use python 3 for ``devpi`` or you might get SSL certificate
               errors.

Security
--------

Create a password for the root user (change ``123`` to a password of your
choice before adding to the :doc:`checklist`)::

  devpi use --set-cfg https://devpi.yourbiz.co.uk/root/pypi/
  devpi login root --password ""
  devpi user -m root password=789
  devpi logoff

To log in later::

  devpi login root --password "789"

Development Index
-----------------

.. note:: The user you create is used in the devpi URL e.g. for user ``bz`` the
          devpi URL will be https://devpi.yourbiz.co.uk/bz/dev

We need to create a user and an index for the user so we can upload our own
packages (in this example, the user is ``bz``)::

  devpi login root --password "789"

  devpi user -c bz password=789
  devpi login bz --password "789"
  devpi index -c dev volatile=False

.. note:: To delete the index: ``devpi index --delete dev``

Client
======

To configure your workstation to use ``devpi`` as it's default index::

  devpi use https://devpi.yourbiz.co.uk/bz/dev/ --set-cfg

.. note:: I don't know how to set the ``username`` or ``password``

To remove the index (not sure if this works)::

  devpi use https://devpi.yourbiz.co.uk/bz/dev/ --delete


.. To configure your workstation to use ``devpi`` as it's default index::
..
..   vim ~/.pip/pip.conf
..
.. ::
..
..   [global]
..   index-url = https://devpi.yourbiz.co.uk/bz/dev/+simple/
..
.. To configure your workstation to upload packages to the ``devpi`` index you
.. created above::
..
..   vim ~/.pypirc
..
.. ::
..
..   [distutils]
..   index-servers =
..       dev
..
..   [dev]
..   repository: https://devpi.yourbiz.co.uk/bz/dev/
..   username: bz
..   password: 789

Upgrade
=======

To upgrade the index to a new version::

  sudo -i -u web
  cd /home/web/repo/devpi
  source venv_devpi/bin/activate
  devpi-server --export /home/web/repo/backup/devpi/ --serverdir=/home/web/repo/devpi/data
  mv /home/web/repo/devpi/data /home/web/repo/temp/
  devpi-server --import /home/web/repo/backup/devpi/ --serverdir=/home/web/repo/devpi/data

.. note:: The ``data`` folder needs to be removed before running the ``import``
          command.

Issues
======

To solve any server side issues, start by using the ``--debug`` parameter in
the ``/etc/supervisor/conf.d/devpi.conf`` file e.g::

  /home/web/repo/devpi/venv_devpi/bin/devpi-server --serverdir=/home/web/repo/devpi/data --refresh=60 --port=4040 --host=127.0.0.1 --debug

Re-start the service using ``supervisorctl`` and check the logs in::

  /var/log/supervisor/

Bad Request
-----------

I kept getting a *Bad request (400)* error with no more information when
running::

  python setup.py clean sdist upload -r dev

For the first release of a module, use the ``devpi upload`` command.
Subsequent releases will work using ``setup.py upload``.

Weird
-----

If the release procedure (``python setup.py clean sdist upload -r dev``) starts
to throw some weird errors e.g::

  running upload
  Submitting dist/pkimber-my-app-0.0.03.tar.gz to http://your.server/bz/dev/
  error: None

... then check the nginx error logs on the server::

  tail /var/log/nginx/error.log
