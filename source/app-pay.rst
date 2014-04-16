Pay
***

.. highlight:: python

Stripe
======

In your ``settings/base.py``, add ``pay`` to your apps e.g::

  LOCAL_APPS = (
      'project',
      ...
      'pay',

In your ``requirements/base.txt``, add ``stripe`` e.g::

  ...
  South
  stripe

In your ``settings/base.py`` module, add the following::

  # Stripe
  STRIPE_PUBLISH_KEY = get_env_variable('STRIPE_PUBLISH_KEY')
  STRIPE_SECRET_KEY = get_env_variable('STRIPE_SECRET_KEY')

Make sure your site pillar includes the Stripe publish key e.g:

.. code-block:: yaml

  uwsgi_port: 3041
  stripe_publish_key: pk_test_6pRNASCoBOKtIshFeQd4XMUh
  stripe_secret_key: sk_test_BQokikJOvBiI2HlWgH4olfQ2

When setting up your project for local development, you will need to set the
environment variables as follows (this can be added to ``README.rst``):

.. code-block:: bash

  echo "export STRIPE_PUBLISH_KEY=\"your_stripe_publish_key\"" >> $VIRTUAL_ENV/bin/postactivate
  echo "unset STRIPE_PUBLISH_KEY" >> $VIRTUAL_ENV/bin/postdeactivate

  echo "export STRIPE_SECRET_KEY=\"your_stripe_secret_key\"" >> $VIRTUAL_ENV/bin/postactivate
  echo "unset STRIPE_SECRET_KEY" >> $VIRTUAL_ENV/bin/postdeactivate

.. note::

  Replace ``your_stripe_publish_key`` and ``your_stripe_secret_key`` with the
  *publishable* and *secret* key.

PayPal
======

.. warning:: I don't have PayPal working yet...

Using your PayPal account, set-up two test accounts, one for the buyer
(personal) and one for the merchant (business):
https://developer.paypal.com/webapps/developer/applications/accounts

In your ``settings/base.py`` module, add the following::

  # https://github.com/spookylukey/django-paypal
  PAYPAL_RECEIVER_EMAIL = get_env_variable('PAYPAL_RECEIVER_EMAIL')
  PAYPAL_TEST = True

Make sure your site pillar includes the merchants email address e.g:

.. code-block:: yaml

  mailgun_send: True
  ...
  paypal_receiver_email: merchant@pkimber.net

When setting up your project for local development, you will need to set the
environment variables as follows (this can be added to ``README.rst``):

.. code-block:: bash

  echo "export PAYPAL_RECEIVER_EMAIL=\"merchant@pkimber.net\"" >> $VIRTUAL_ENV/bin/postactivate
  echo "unset PAYPAL_RECEIVER_EMAIL" >> $VIRTUAL_ENV/bin/postdeactivate

.. note::

  Replace ``merchat@pkimber.net`` with your PayPal merchant email address.

Notes
=====

Using https://github.com/spookylukey/django-paypal, I think the *Pro (WPP)*
API requires the merchant to pay 20 pounds per month:
https://www.paypal.com/uk/webapps/mpp/pro

For the standard version, I think I can implement ``IPN`` AND ``PDT``.  Just
have to be careful not to credit the account twice!

Links
=====

http://go.developer.ebay.com/devzone/articles/getting-started-paypal-django
