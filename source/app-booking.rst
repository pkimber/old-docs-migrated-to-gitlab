booking
*******

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
