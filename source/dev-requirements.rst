Requirements
************

.. highlight:: bash

To update the version of a dependency in ``base.txt``::

  find . -name "base.txt" | xargs sed -i 's/Django==1.6.1/Django==1.6.2/g'

Latest::

  bleach==1.4.1
  boto==2.36.0
  celery-haystack==0.8
  celery==3.1.17
  cssselect==0.9.1
  django-braces==1.4.0
  # version 0.2.0 does not work with python 3
  django-celery-transactions==0.1.3
  django-compressor==1.4
  django-formtools==1.0
  django-haystack==2.3.1
  django-nocaptcha-recaptcha==0.0.18
  django-redis==3.8.3
  django-reversion==1.8.5
  django-sendfile==0.3.6
  django-statsd-mozilla==0.3.14
  django-storages-redux
  Django==1.8.1
  djangorestframework==3.1.1
  djrill==1.3.0
  docutils==0.12
  easy-thumbnails==2.2
  elasticsearch==1.4.0
  hg+https://bitbucket.org/schinckel/django-jsonfield#egg=jsonfield
  iso8601==0.1.10
  pillow==2.8.1
  psycopg2==2.6
  python-dateutil==2.4.1
  pytz==2014.10
  PyYAML==3.11
  redis==2.10.3
  reportlab==3.1.44
  requests==2.6.0
  statsd==3.0.1
  stripe==1.21.0
  Yapsy==1.10.423

.. note:: For Django 1.8, you will need to run:
          ``pip install --upgrade -r requirements/local.txt``.
