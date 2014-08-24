Testing
*******

.. highlight:: yaml

To deploy a test site...

Add a ``testing`` ``sls`` to the config e.g::

  # top.sls
  'test-*':
    - config.django
    - config.nginx
    - config.testing
  'test-a':
    - sites.kb-a

  # config/testing.sls
  testing:
    True

Append the test domain to the pillar e.g::

  sites:
    pkimber_net:
      profile: django
      db_pass: password
      db_type: psql
      domain: pkimber.net
      secret_key: 'my-secret-key-generated-by-django'
      ssl: False
      uwsgi_port: 3035
      test:
        domain: test.hatherleigh.info

Add ``TESTING`` to ``settings/production.py`` and update the database ``NAME``:

.. code-block:: python

  DEBUG = False
  TEMPLATE_DEBUG = DEBUG
  TESTING = get_env_variable_bool('TESTING')

  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.postgresql_psycopg2',
          'NAME': '{}_test'.format(SITE_NAME) if TESTING else SITE_NAME,
