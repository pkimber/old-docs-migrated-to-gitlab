booking
*******

.. highlight:: python

https://github.com/pkimber/booking

Definitions
===========

Permissions

  Each booking has a permission level - the default level is ``public``.

  Bookings with a permission of ``public`` can be viewed by people browsing
  your web site whether they are logged in or not.

  Bookings with the ``user`` permission can only be viewed by a person who is
  logged into the web site.

  Bookings with the ``staff`` permission can only be viewed by a member of
  staff.  The ``staff`` permission can be used to hide event information until
  arrangements are confirmed e.g. when planning events.

User notes

  Can be viewed by users of the web site when they are logged in.  This would
  typically be used to add extra booking information for your members.

Staff notes

  Can only be viewed by a member of staff.  Use these notes to add extra
  information for other members of staff.

Settings
========

For simple bookings, you will not need user and staff notes.  To enable the
notes navigate to the Django admin site, click on *Booking settings* and tick
the *Notes user staff* check box.

The default permission level is ``public``.  If your site uses the other
permission levels, then enable the highlighted display of the levels by
browsing to the Django admin site, click on *Booking settings* and tick the
*Display permissions* check box.

Usage
=====

The ``booking`` app was built as a simple availability page for
`Wyckhams Lodge`_.

  For editing simple bookings we have a ``BookingForm``.

  The app has now been extended so it can be used as a simple calendar for an
  organisation wanting to track upcoming events.

  For editing simple events, we have a ``BookingEventForm``.

We need to customise the form used for creating and updating bookings (events).
To do this, add a ``create`` and ``update`` view to your ``urls.py`` and set
the ``form_class`` as required e.g. for a cottage booking::

  from booking.forms import BookingForm
  from booking.views import (
      BookingCreateView,
      BookingUpdateView,
  )

  urlpatterns = patterns(
      '',
      # ...
      url(regex=r'^booking/create/$',
          view=BookingCreateView.as_view(form_class=BookingForm),
          name='booking.create'
          ),
      url(regex=r'^booking/(?P<pk>\d+)/update/$',
          view=BookingUpdateView.as_view(form_class=BookingForm),
          name='booking.update'
          ),

Or, for a simple event::

  from booking.forms import BookingEventForm
  from booking.views import (
      BookingCreateView,
      BookingUpdateView,
  )

  urlpatterns = patterns(
      '',
      # ...
      url(regex=r'^booking/create/$',
          view=BookingCreateView.as_view(form_class=BookingEventForm),
          name='booking.create'
          ),
      url(regex=r'^booking/(?P<pk>\d+)/update/$',
          view=BookingUpdateView.as_view(form_class=BookingEventForm),
          name='booking.update'
          ),

If you prefer, you can create your own forms.

.. _`Wyckhams Lodge`: https://www.wyckhamslodge.co.uk/availability/
