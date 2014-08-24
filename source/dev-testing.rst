Testing
*******

.. highlight:: yaml

.. warning:: Test sites must be deployed to a dedicated *test* server.  You
             cannot deploy live and test sites to the same server.

.. note:: The domain name for the site will not be prefixed with ``www``.

.. note:: The ``nginx.conf`` for the test site will not do any redirection to
          ``www``, ``https`` or ``http``.

To deploy a test site, create a dedicated test server, and update the DNS
records for your *test* domain to point to this server e.g.
``test.hatherleigh.info``.

pillar
======

Create a ``testing`` ``sls``::

  # config/testing.sls
  testing:
    True

And add it to the config for the server e.g::

  # top.sls
  'test-*':
    - config.django
    - config.testing
  'test-a':
    - sites.my

.. note:: You can re-use the *live* ``sites`` pillar...

Append the test domain to the pillar e.g::

  # sites/my.sls
  sites:
    pkimber_net:
      profile: django
      uwsgi_port: 3035
      test:
        domain: test.hatherleigh.info

Code
====

Add ``TESTING`` to ``settings/local.py``:

.. code-block:: python

  DEBUG = True
  TEMPLATE_DEBUG = DEBUG
  TESTING = False

Add ``TESTING`` to ``settings/production.py`` and update the database ``NAME``:

.. code-block:: python

  DEBUG = False
  TEMPLATE_DEBUG = DEBUG
  TESTING = get_env_variable_bool('TESTING')

  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.postgresql_psycopg2',
          'NAME': '{}_test'.format(SITE_NAME) if TESTING else SITE_NAME,
