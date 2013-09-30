Mailgun
*******

.. highlight::python

Send
====

To integrate http://www.mailgun.com/ into your project...

Add the following to your requirements::

  django-mailgun==0.2.2

Add the following to ``production.py``::

  # django-mailgun
  EMAIL_BACKEND = 'django_mailgun.MailgunBackend'
  MAILGUN_ACCESS_KEY = get_env_variable("MAILGUN_ACCESS_KEY")
  MAILGUN_SERVER_NAME = get_env_variable("MAILGUN_SERVER_NAME")

Make sure you include a ``mailgun_access_key`` somewhere in your pillar.

Setting this as a global variable is probably a good idea because it will
be the same for all your sites e.g:

.. code-block:: yaml

  mail:
    mailgun_access_key: 'your mailgun key'

In your Salt pillar for the site, enable ``mailgun_send`` and (if the mailgun
domain is different to the site domain) a ``mailgun_domain``:

.. code-block:: yaml

  sites:
    hatherleigh_net:
      domain: hatherleigh.net
      mailgun_domain: mg.hatherleigh.net
      mailgun_send: True
