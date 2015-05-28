Requirements
************

.. highlight:: bash

To update the version of a dependency in ``base.txt``::

  find . -name "base.txt" | xargs sed -i 's/Django==1.6.1/Django==1.6.2/g'

Latest::

  bleach==1.4.1
  boto==2.36.0
  celery-haystack==0.8
  celery==3.1.18
  cssselect==0.9.1
  django-braces==1.4.0
  django-celery-transactions==0.3.1
  django-compressor==1.4
  django-formtools==1.0
  django-haystack==2.3.1
  django-nocaptcha-recaptcha==0.0.18
  django-redis==3.8.3
  django-reversion==1.8.5
  django-sendfile==0.3.6
  django-statsd-mozilla==0.3.14
  django-storages-redux
  Django==1.8.2
  djangorestframework==3.1.1
  djrill==1.4.0
  docutils==0.12
  easy-thumbnails==2.2
  elasticsearch==1.4.0
  # awaiting a release https://github.com/django-haystack/celery-haystack/pull/37
  git+https://github.com/django-haystack/celery-haystack.git@0ca54a6a8b6f794f88a1c28b8c79cdacef994cc7#egg=celery_haystack
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
  stripe==1.22.2
  xmltodict==0.9.2
  Yapsy==1.10.423

.. note:: For Django 1.8, you will need to run:
          ``pip uninstall celery_haystack``
          and
          ``pip install --upgrade -r requirements/local.txt``.
