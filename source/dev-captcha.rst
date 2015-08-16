Captcha
*******

.. highlight:: python

For documentation, see https://github.com/praekelt/django-recaptcha

Sign up to reCAPTCHA on https://www.google.com/recaptcha/admin.

You will receive a site key and a secret key...

In the salt ``sls`` file for your site, add the ``norecaptcha_site_key`` and
the ``norecaptcha_secret_key`` for your live site and (if required) the ``test``
site (remember - a test site might have a different domain name e.g:

.. code-block:: yaml

  recaptcha:
    norecaptcha_site_key: <your site key>
    norecaptcha_secret_key: <your secret key>
  test:
    norecaptcha_site_key: <your test site key>
    norecaptcha_secret_key: <your test secret key>

.. note:: Replace ``<your site key>`` and ``<your secret key>`` with the
          actual reCAPTCHA keys.

Add the following to ``requirements/base.txt``::

  django-recaptcha==1.0.4

Add the following to ``settings/base.py``::

  THIRD_PARTY_APPS = (
      'captcha',
      # ...
  )

  # https://github.com/praekelt/django-recaptcha
  NOCAPTCHA = True
  RECAPTCHA_PUBLIC_KEY = get_env_variable('NORECAPTCHA_SITE_KEY')
  RECAPTCHA_PRIVATE_KEY = get_env_variable('NORECAPTCHA_SECRET_KEY')

When setting up your project for local development, you will need to set-up the
environment variables as follows (can be added to ``.private``):

.. code-block:: bash

  export NORECAPTCHA_SITE_KEY="<your site key>"
  export NORECAPTCHA_SECRET_KEY="<your secret key>"

.. note:: Replace ``<your site key>`` and ``<your secret key>`` with the
          actual reCAPTCHA keys.

To add a captcha field to your form::

  from captcha.fields import ReCaptchaField

  class EnquiryForm(RequiredFieldForm):

      captcha = ReCaptchaField()

To test a view containing a form::

  # copied from:
  # https://github.com/ImaginaryLandscape/django-nocaptcha-recaptcha/blob/master/nocaptcha_recaptcha/tests.py
  import os
  from django.forms import Form
  from django.test import TestCase
  from . import fields

  class TestForm(Form):
      captcha = fields.NoReCaptchaField(gtag_attrs={'data-theme': 'dark'})

  class TestCase(TestCase):

      def setUp(self):
          os.environ['RECAPTCHA_TESTING'] = 'True'

      def test_envvar_enabled(self):
          form_params = {'g-recaptcha-response': 'PASSED'}
          form = TestForm(form_params)
          self.assertTrue(form.is_valid())

      def test_envvar_disabled(self):
          os.environ['RECAPTCHA_TESTING'] = 'False'
          form_params = {'g-recaptcha-response': 'PASSED'}
          form = TestForm(form_params)
          self.assertFalse(form.is_valid())

      def tearDown(self):
          del os.environ['RECAPTCHA_TESTING']
