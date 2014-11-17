Amazon S3
*********

.. highlight:: python

Configuration
=============

You will receive your access keys from Amazon.  Please refer to the
:doc:`checklist` and fill in your own details.

In your Salt pillar...

Create an ``amazon`` ``sls`` replacing the access and secret key with your
own (see :doc:`checklist`):

.. code-block:: yaml

  # global/amazon.sls
  amazon:
    aws_s3_access_key_id: ABCDEFG
    aws_s3_secret_access_key: 1a2b3c

And add it to the config for the server e.g:

.. code-block:: yaml

  # top.sls
  'test-a':
    - global.amazon

For each site which uses Amazon web service, add ``amazon`` to the config for
the server e.g:

.. code-block:: yaml

  # sites/my.sls
  sites:
    hatherleigh_info:
      amazon: True
      profile: django

WIP
===

Just making a note of my initial settings::

  # settings/base.py

  # AWS
  AWS_S3_ACCESS_KEY_ID = get_env_variable('AWS_S3_ACCESS_KEY_ID')
  AWS_S3_SECRET_ACCESS_KEY = get_env_variable('AWS_S3_SECRET_ACCESS_KEY')
  DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'

  # settings/local.py

  # amazon (see 'base.py' for id and key)
  AWS_STORAGE_BUCKET_NAME = '{}-dev'.format(SITE_NAME.replace('_', '-'))

  # settings/production.py

  # amazon (see 'base.py' for id and key)
  AWS_STORAGE_BUCKET_NAME = '{}{}'.format(
      SITE_NAME.replace('_', '-'),
      '-test' if TESTING else '',
  )

