Requirements
************

To update the version of a dependency in ``base.txt``::

  find . -name "base.txt" | xargs sed -i 's/Django==1.6.1/Django==1.6.2/g'
