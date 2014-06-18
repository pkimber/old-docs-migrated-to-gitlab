Logging
*******

.. highlight:: python

I am not very happy with my logging set-up at the moment.  Need to spend time
working out how to use it properly.

This is my set-up at the moment in ``base.py``::

  LOGGING = {
      'version': 1,
      'disable_existing_loggers': True,
      'formatters': {
          'standard': {
              'format': "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
              'datefmt': "%d/%b/%Y %H:%M:%S"
          },
      },
      'handlers': {
          'null': {
              'level':'DEBUG',
                  'class':'django.utils.log.NullHandler',
          },
          'logfile': {
              'level':'DEBUG',
              'class':'logging.handlers.RotatingFileHandler',
              'filename': "logfile",
              'maxBytes': 500000,
              'backupCount': 10,
              'formatter': 'standard',
          },
          'console':{
              'level':'INFO',
              'class':'logging.StreamHandler',
              'formatter': 'standard'
          },
      },
      'loggers': {
          'django': {
              'handlers':['console'],
              'propagate': True,
              'level':'WARN',
          },
          'django.db.backends': {
              'handlers': ['console'],
              'level': 'DEBUG',
              'propagate': False,
          },
          '': {
              'handlers': ['console', 'logfile'],
              'level': 'DEBUG',
          },
      }
  }

To add logging to a module::

  import logging

  # after imports
  logger = logging.getLogger(__name__)

  # in the code
  logger.critical(
      'payment check: invalid {} != {}'.format(
          payment_pk, payment.pk,
  ))
