devpi
*****

.. highlight:: bash

Salt
====

Salt requires two separate bits of information in your pillar.  The first is
the server configuration.  Here is an example file:

.. code-block:: yaml

  devpi:
    domain: devpi.hatherleigh.info
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
    index_url: http://devpi.hatherleigh.info/root/dev/+simple/

Just update the domain name in the URL to suit your install.

Initial Configuration
=====================

To configure http://doc.devpi.net/ after Salt has installed it on your server,
run the following commands on your workstation::

  mkvirtualenv devpi-client
  pip install nose
  pip install devpi-client

Security
--------

Create a password for the root user (change ``123`` to a password of your
choice)::

  devpi use http://your.server/root/pypi/
  devpi login root --password ""
  devpi user -m root password=123
  devpi logoff

To log in later::

  devpi login root --password "123"

Development Index
-----------------

We need to create an index so we can upload our own packages::

  devpi login root --password "123"
  devpi index -c dev volatile=False

Note: To delete the index: ``devpi index --delete dev``

Client
======

To configure your workstation to use ``devpi`` as it's default index::

  vim ~/.pip/pip.conf

::

  [global]
  index-url = http://your.server/root/dev/+simple/

To configure your workstation to upload packages to the ``devpi`` index you
created above::

  vim ~/.pypirc

::

  [distutils]
  index-servers =
      dev

  [dev]
  repository: http://your.server/root/dev/
  username: root
  password: 123

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
  Submitting dist/pkimber-my-app-0.0.03.tar.gz to http://your.server/root/dev/
  error: None

... then check the nginx error logs on the server::

  tail /var/log/nginx/error.log
