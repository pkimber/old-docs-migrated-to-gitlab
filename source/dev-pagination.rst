Pagination
**********

::

  # views.py
  class PaymentListView(BaseMixin, ListView):
      paginate_by = 20

::

  <!-- html -->
  <div class="pure-g">
    <div class="pure-u-1">
      {% include 'base/_paginate.html' %}

.. note:: The ``_paginate.html`` template will leave some blank space if there
          are not enough rows to switch it on.  To remove the space, enclose
          the section in ``{% if is_paginated %}``.
