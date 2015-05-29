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
