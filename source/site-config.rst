Site - Configuration
********************

.. highlight:: yaml

The fabric tasks expect the folder structure for your projects to be in the
following folder structure::

  ├── module
  │   ├── deploy
  │   │   ├── pillar
  |   |   │   ├── db
  |   |   │   ├── global
  |   |   │   ├── README.rst
  |   |   |
  │   │   ├── post-deploy
  │   │   │   ├── hatherleigh_net.txt
  │   │   │   ├── pkimber_net.txt
  |   |   |
  │   │   ├── salt-cloud
  │   │   │   ├── cloud.profiles
  │   │   │   ├── cloud.providers
  │   │   │
  │   │   ├── ssl-cert
  │   │   │   ├── hatherleigh.net
  |   |   │   │   ├── server.key
  |   |   │   │   └── ssl-unified.crt
  |   |   │   ├── pkimber.net
  |   |   │   │   ├── server.key
  |   |   │   │   └── ssl-unified.crt
  |   |   │
  │   │   └── upload
  |   |
  │   ├── fabric
  │   │   ├── deploy.py
  │   │   ├── fabfile.py
  |   |
  │   └── salt
  │       ├── db
  │       ├── default


Pillar
======

See :doc:`salt-pillar`

Testing
=======

The :doc:`fabric-deploy` task runs automatically runs some tests at the end of
the process.

Create a text file in your ``post-deploy`` folder, listing the pages which
should be checked.  The test will attempt to open the pages using
http://docs.seleniumhq.org/ in the Firefox browser.

If, for example, your site is called ``pkimber_net``, then you could create a
file called ``pkimber_net.txt`` with the following contents::

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
