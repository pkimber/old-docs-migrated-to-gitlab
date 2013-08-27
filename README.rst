Cloud Docs
**********

To build the documentation:

::

  mkvirtualenv dev_docs_cloud
  pip install -r requirements.txt

::

  make html && firefox build/html/index.html
