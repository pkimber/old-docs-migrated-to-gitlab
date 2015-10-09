Requirements
************

.. highlight:: bash

Branches::

  # cms
  git checkout 1043-convert-from-cms-models-to-block

Requirements::

  bleach==1.4.2
  boto==2.36.0
  celery-haystack==0.9
  celery==3.1.18
  cssselect==0.9.1
  d2to1==0.2.12
  django-braces==1.8.1
  django-celery-transactions==0.3.2
  django-compressor==1.5
  django-extensions==1.5.5
  django-formtools==1.0
  django-haystack==2.4.0
  django-mptt==0.7.4
  django-nvd3==0.8.2
  # remove: django-nocaptcha-recaptcha==0.0.18
  django-recaptcha==1.0.4
  django-redis==4.2.0
  django-reversion==1.9.3
  django-sendfile==0.3.9
  django-statsd-mozilla==0.3.14
  django-storages-redux
  Django==1.8.5
  djangorestframework==3.1.3
  djrill==1.4.0
  docutils==0.12
  easy-thumbnails==2.2
  elasticsearch==1.7.0
  hg+https://bitbucket.org/schinckel/django-jsonfield#egg=jsonfield
  iso8601==0.1.10
  lxml==3.4.4
  opbeat==3.1.1
  pillow==2.9.0
  psycopg2==2.6.1
  python-dateutil==2.4.2
  pytz==2015.06
  PyYAML==3.11
  redis==2.10.3
  reportlab==3.2.0
  requests==2.6.0
  spyne==2.11.0
  statsd==3.0.1
  stripe==1.27.0
  tasklib==0.9.0
  transitions==0.2.8
  xmltodict==0.9.2
  Yapsy==1.10.423

.. note:: For Django 1.8, you will need to run:
          ``pip uninstall celery_haystack``
          and
          ``pip install --upgrade -r requirements/local.txt``.

To update the version of a dependency in ``base.txt``::

  find . -name "base.txt" | xargs sed -i 's/Django==1.6.1/Django==1.6.2/g'
