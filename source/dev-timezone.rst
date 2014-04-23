Time zones
**********

.. highlight:: python

In your ``settings/base.py`` file check to make sure that timezones are
enabled::

  USE_TZ = True

In your ``requirements/base.txt`` file::

  pytz==2014.2

For more information,
https://docs.djangoproject.com/en/1.6/topics/i18n/timezones/

The FAQs are very useful:
https://docs.djangoproject.com/en/1.6/topics/i18n/timezones/#faq

To get the time now in a format which is *aware*::

  from django.utils import timezone

  td = timezone.now() - self.created

Issues
======

If you get the error when running unit tests, make sure you are setting field
dates to timezone aware values.
