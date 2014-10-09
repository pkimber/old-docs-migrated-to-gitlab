Amazon S3
*********

.. highlight:: python

Just making a note of my initial settings:

::

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
