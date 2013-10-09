devpi
*****

Initial Configuration
=====================

To configure http://doc.devpi.net/ after Salt has installed it on your server,
run the following commands on your workstation:

::

  mkvirtualenv devpi-client
  pip install nose
  pip install devpi-client

Security
--------

Create a password for the root user (change ``123`` to a password of your choice):

::

  devpi use http://your.server/root/pypi/
  devpi login root --password ""
  devpi user -m root password=123
  devpi logoff

To log in later:

::

  devpi login root --password "123"

Development Index
-----------------

We need to create an index so we can upload our own packages:

::

  devpi login root --password "123"
  devpi index -c dev volatile=False

Note: To delete the index: ``devpi index --delete dev``

Client
======

To configure your workstation to use ``devpi`` as it's default index:

::

  vim ~/.pip/pip.conf

::

  [global]
  index-url = http://your.server/root/dev/+simple/

To configure your workstation to upload packages to the ``devpi`` index you created above:

::

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

To solve any server side issues, start by using the ``--debug`` parameter e.g::

  /home/web/repo/devpi/venv_devpi/bin/devpi-server --serverdir=/home/web/repo/devpi/data --refresh=60 --port=4040 --host=127.0.0.1 --debug

Bad Request
-----------

I kept getting a *Bad request (400)* error with no more information when
running::

  python setup.py clean sdist upload -r dev

It worked perfectly when using ``devpi upload``.  I spent over 3 hours trying
to find why...  but it just started working when I actually used ``devpi`` to
install one of the packages I had uploaded.

Weird
-----

If the release procedure (``python setup.py clean sdist upload -r dev``) starts
to throw some weird errors e.g:

::

  running upload
  Submitting dist/pkimber-my-app-0.0.03.tar.gz to http://your.server/root/dev/
  error: None

... then check the nginx error logs on the server:

::

  tail /var/log/nginx/error.log
