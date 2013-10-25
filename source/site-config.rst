Site - Configuration
********************

.. highlight:: yaml

.. warning::

  The Salt pillar data must be kept secure.  Do not push to a public repository
  such as GitHub or BitBucket

The fabric tasks expect the folder structure for your projects to be in the
following folder structure::

  ├── module
  |  ├── fabric
  |  │  ├── deploy.py
  |  │  ├── fabfile.py
  |  │  └── ...
  |  ├── pillar
  |  │  ├── db
  |  │  ├── global
  |  │  ├── README.rst
  |  │  ├── ...
  |  ├── salt
  |  │  ├── db
  |  │  ├── default
  |  │  ├── devpi
  |  │  ├── ...
  |  └── ssl-cert
  |     ├── hatherleigh.net
  |     │   ├── server.key
  |     │   └── ssl-unified.crt
  |     ├── pkimber.net
  |     │   ├── server.key
  |     │   └── ssl-unified.crt
  |     └── ...

Sites
=====

To set-up a new site (or sites) on a server, create or edit a file in the
pillar, ``sites`` folder e.g. ``sites/mysites.sls``.  The file should contain
details of the sites to be deployed onto this server e.g:

::

  sites:
    pkimber_net:
      db_pass: password
      domain: pkimber.net
      secret_key: 'my-secret-key-generated-by-django'
      ssl: False
      uwsgi_port: 3035
    another_site:
      db_pass: password2
      domain: another.site
      secret_key: 'another-secret-key-generated-by-django'
      ssl: True
      uwsgi_port: 3036
      ftp: True
      ftp_password: "generated-using-mkpasswd-see-below"

FTP
---

If you want to allow FTP access for a site, set ``ftp`` to ``True`` and create
an ``ftp_password``.  The password is generated using ``mkpasswd``::

  mkpasswd -m sha-512 <password>

If you enable FTP for a site, a system user will be created using the name of
the site as the user name e.g. ``another_site``.  They will be able to login
and upload files to a ``site`` folder which is within their home folder.  This
``site`` folder is linked to the web site.

Secret Key
----------

To generate a new secret key, use the Django extensions application:

::

  pip install django-extensions

.. code-block:: python

  INSTALLED_APPS = (
      'django_extensions',

::

  django-admin.py generate_secret_key

Database
========

The fabric :doc:`fabric-release` task uses a ``prefix`` parameter for
identifying your modules.  This ``prefix`` is also used to lookup the
database IP address for your site when running the :doc:`fabric-deploy`
command.  So, for example, if your prefix is ``pkimber``, you should have a
file in your pillar called::

  db/pkimber/settings.sls

This file should contain the IP address of your server (or ``localhost`` if
your database is installed on the same server as your site) e.g::

  postgres_settings:
    listen_address: localhost

Validate
========

To validate the pillar files, use the fabric ``validate`` task e.g:

::

  cd fabric
  fab valid:prefix=pkimber,name=pkimber_net

Testing
=======

The :doc:`fabric-deploy` task runs automatically runs some tests at the end of
the process.

Create a text file in your ``post-deploy`` folder, listing the pages which
should be checked.  The test will attempt to open the pages using
http://docs.seleniumhq.org/ in the Firefox browser.

If, for example, your site is called ``pkimber_net``, then you could create a
file called ``pkimber_net.txt`` with the following contents:

::

  urls:
  - doc: not https
    url: http://pkimber.net/
    title: Home
  - doc: www subdomain
    url: http://www.pkimber.net/
    title: Home
  - url: https://pkimber.net/
    title: Home
  - url: https://pkimber.net/about/
    title: About
  - url: https://pkimber.net/contact/
    title: Contact
