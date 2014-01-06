Cloud Docs
**********

To build the documentation:

::

  mkvirtualenv dev_docs
  pip install -r requirements.txt

::

  make html && firefox build/html/index.html

  on a mac...
  make html && open -a firefox build/html/index.html
