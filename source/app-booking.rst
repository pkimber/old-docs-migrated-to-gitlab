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

To add the booking URLs to your site::

  url(regex=r'^dash/booking/',
      view=include('booking.urls')
      ),

For editing simple bookings we have a ``BookingForm``.

  The app has now been extended so it can be used as a simple calendar for an
  organisation wanting to track upcoming events.  For editing simple events, we
  have a ``BookingEventForm``.

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

To integrate the calendar with a custom page on your site, Create the custom
page (this example is a management command using page sections from the
``compose`` app::

  def handle(self, *args, **options):
      """These sections should already exist."""
      body = Section.objects.get(slug=SECTION_BODY)
      card = Section.objects.get(slug=SECTION_CARD)
      slideshow = Section.objects.get(slug=SECTION_SLIDESHOW)
      # booking page
      booking = Page.objects.init_page(
          Page.CUSTOM,
          'booking',
          'Booking',
          6,
          'web/page_booking.html',
          is_custom=True,
      )
      # booking page sections
      PageSection.objects.init_page_section(booking, body)
      PageSection.objects.init_page_section(booking, card)
      PageSection.objects.init_page_section(booking, slideshow)
      Url.objects.init_pages()
      Url.objects.init_reverse_url(
          'Booking',
          'web.booking',
      )

Create the URL for your custom page::

  url(regex=r'^booking/$',
      view=BookingView.as_view(),
      kwargs=dict(page=Page.CUSTOM, menu='booking'),
      name='web.booking'
      ),

And the view::

  from block.views import PageTemplateView
  from booking.views import CalendarMixin

  class BookingView(CalendarMixin, PageTemplateView):
      pass

Add something like the following to your web page:

.. code-block:: html

  {% if design %}
    <div class="pure-g">
      <div class="pure-u-1">
        <div class="l-box">
          <p>
            <a class="pure-button pure-button-xsmall" href="{% url 'booking.list' %}">
              <i class="fa fa-calendar"></i>
              Manage bookings
            </a>
          </p>
        </div>
      </div>
    </div>
  {% endif %}
  {% for c in calendar %}
    <div class="pure-g">
      {% for month in c %}
        <div class="pure-u-1 pure-u-md-1-3">
          <div class="l-box">
            {{ month }}
          </div>
        </div>
      {% endfor %}
    </div>
  {% endfor %}

Here is sample sample CSS which will make the calendar look OK:

.. code-block:: css

  table {
      border-collapse:collapse;
      width: 100%;
  }

  th, td {
      border: 1px solid #2D9493;
  }

  td {
      text-align: center;
      width: 14%;
  }

  td.afternoon {
      background-image:url(afternoon.gif);
      background-repeat: no-repeat;
      background-position: center;
  }

  td.booked {
      background: #7ED9B6;
  }

  td.morning {
      background-image:url(morning.gif);
      background-repeat: no-repeat;
      background-position: center;
  }

Copy ``afternoon.gif`` and ``morning.gif`` from one of our other projects.


.. _`Wyckhams Lodge`: https://www.wyckhamslodge.co.uk/availability/
