Site - Configuration
********************

.. highlight:: yaml

To set-up a new site (or sites) on a server, create or edit a file in the
pillar, ``sites`` folder e.g.

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

.. note::

  The Salt pillar data must be kept secure.  Do not push to a public repository
  such as GitHub or BitBucket

To validate the file, use the fabric ``validate`` task e.g:

::

  cd fabric
  fab valid:pkimber_net

To generate a new secret key, use the Django extensions application:

::

  pip install django-extensions

.. code-block:: python

  INSTALLED_APPS = (
      'django_extensions',

::

  django-admin.py generate_secret_key
