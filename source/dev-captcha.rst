Captcha
*******

.. highlight:: python

Sign up to reCAPTCHA on http://www.google.com/recaptcha

  I created a global key.

  You will receive a private key and a public key...

Make sure your pillar includes an ``sls`` file containing the public and
private keys e.g:

.. code-block:: yaml

  captcha:
    recaptcha_private_key: 1234567890
    recaptcha_public_key: 1234567890

Add the following to ``requirements/base.txt``::

  git+https://github.com/pkimber/django-recaptcha.git#egg=captcha

.. note::

  This is a fork of
  https://github.com/insttrack/django-recaptcha
  which is a fork of
  https://github.com/praekelt/django-recaptcha.

  The fork by ``insttrack`` appear to be compatible with python 3.

Add the following to ``settings/base.py``::

  # https://github.com/insttrack/django-recaptcha
  RECAPTCHA_PRIVATE_KEY = get_env_variable('RECAPTCHA_PRIVATE_KEY')
  RECAPTCHA_PUBLIC_KEY = get_env_variable('RECAPTCHA_PUBLIC_KEY')
  RECAPTCHA_USE_SSL = True

When setting up your project for local development, you will need to set-up the
environment variables as follows (this can be added to ``README.rst``):

.. code-block:: bash

  echo "export RECAPTCHA_PRIVATE_KEY=\"your private key\"" >> $VIRTUAL_ENV/bin/postactivate
  echo "export RECAPTCHA_PUBLIC_KEY=\"your public key\"" >> $VIRTUAL_ENV/bin/postactivate

  echo "unset RECAPTCHA_PRIVATE_KEY" >> $VIRTUAL_ENV/bin/postdeactivate
  echo "unset RECAPTCHA_PUBLIC_KEY" >> $VIRTUAL_ENV/bin/postdeactivate

.. note:: Replace ``your private key`` and ``your public key`` with the actual
          reCAPTCHA keys.

To add a captcha field to your form::

  from captcha.fields import ReCaptchaField

  class EnquiryForm(RequiredFieldForm):

      captcha = ReCaptchaField(attrs={'theme' : 'clean'})

To test a view containing a form::

  class TestView(TestCase):

      def setUp(self):
          os.environ['RECAPTCHA_TESTING'] = 'True'

      def tearDown(self):
          del os.environ['RECAPTCHA_TESTING']

      def test_create(self):
          response = self.client.post(
              reverse('enquiry.create'),
              dict(
                  name='Richard',
                  description='Do you sell hay and straw?',
                  email='richard@pkimber.net',
                  recaptcha_response_field='PASSED',
              )
          )
