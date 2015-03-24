block
*****

.. highlight:: python

https://github.com/pkimber/block

.. note:: The :doc:`app-cms` app extends the ``block`` app.

Diagram
=======

:download:`misc/block.pdf`

Pagination
==========

To use pagination in a ``block`` view, we must change the ``page_kwarg``.  As a
standard we will use ``page-no`` e.g::

  page_kwarg = 'page-no'
  paginate_by = 15

The cause of this issue is our use of the ``page`` variable in the ``block``
app to identify the page.  The default value of ``page_kwarg`` is ``page``.
Django looks for ``page_kwarg`` in ``views/generic/list.py``::

  page = self.kwargs.get(page_kwarg) or self.request.GET.get(page_kwarg) or 1
