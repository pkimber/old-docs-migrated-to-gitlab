Checkout
********

.. highlight:: python

https://github.com/pkimber/checkout

.. note:: This app replaces the old :doc:`app-pay`

``forms.py``::

  from checkout.forms import CheckoutForm

  class JobCheckoutForm(CheckoutForm):

      class Meta:
          model = Job
          fields = (
              'action',
          )

``views.py``::

  from checkout.views import CheckoutMixin

  class JobCheckoutView(
      PageFormMixin, CheckoutMixin, BaseMixin, UpdateView):

      model = Job
      form_class = JobCheckoutForm

In the ``html`` template:

.. code-block:: html

  {% include '_form.html' with submit='Checkout' form_id='id_checkout_form' %}

  {% block script %}
    {{ block.super }}
    {% include 'checkout/_stripe.js.html' %}
  {% endblock script %}

In your ``.private`` file, add your test keys for Stripe:

.. code-block:: bash

  export STRIPE_PUBLISH_KEY="pk_test_123"
  export STRIPE_SECRET_KEY="sk_test_456"

Testing::

  from checkout.tests.helper import check_checkout

  @pytest.mark.django_db
  def test_checkout():
      obj = JobFactory()
      check_checkout(obj)
