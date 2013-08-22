Cloud Docs
**********

To build the documentation:

::

  mkvirtualenv dev_cloud_docs
  pip install -r requirements.txt

::

  make html && firefox build/html/index.html
