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

Constuct
--------

To create a date/time for testing purposes::

  from datetime import datetime
  import pytz

  d = datetime(2014, 10, 1, 6, 0, 0, tzinfo=pytz.utc)

.. warning:: Only use ``utc`` for constructing dates.  For more information
             see http://pytz.sourceforge.net/#example-usage

Local
-----

To display a time in the local timezone, use ``localtime``::

  from django.utils import timezone
  alarm = timezone.now()
  alarm
  datetime.datetime(2014, 6, 17, 14, 19, 40, 607734, tzinfo=<UTC>)
  timezone.localtime(alarm)
  datetime.datetime(2014, 6, 17, 15, 19, 40, 607734, tzinfo=<DstTzInfo 'Europe/London' BST+1:00:00 DST>)

Issues
======

If you get the error when running unit tests, make sure you are setting field
dates to timezone aware values.
