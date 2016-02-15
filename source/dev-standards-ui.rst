UI Standards
************

- Click here for :doc:`dev-standards`
- Click here for :doc:`dev-standards-code`

Dashboard
=========

.. note:: Public pages will normally be in the ``web`` app.

          The ``dash`` app is generally for pages where the user has to be
          logged in.

          The ``settings`` app is generally for pages where a member of staff
          can configure settings, add records to look-up tables etc.

          These are not a hard and fast rules.  We will often want other apps
          where the user needs to be logged in.

Projects will normally have a dashboard and a settings page.  The URL for the
dashboard must be named ``project.dash`` and the URL for the settings page must
be named ``project.settings`` e.g::

  # from 'dash/urls.py'
  url(regex=r'^$',
      view=DashView.as_view(),
      name='project.dash'
      ),
  url(regex=r'^settings/$',
      view=SettingsView.as_view(),
      name='project.settings'
      ),

An app can make it easy for a developer to add items to the dashboard or
settings template by making an ``<app-name>/_dash.html`` or
``<app-name>/_settings.html`` template e.g:

.. code-block:: html

  {% include 'cms/_dash.html' %}
  {% include 'cms/_settings.html' %}

For example code, see:

- https://github.com/pkimber/cms/blob/master/cms/templates/cms/_dash.html
- https://github.com/pkimber/cms/blob/master/cms/templates/cms/_settings.html

Icons
=====

http://fontawesome.io/icon/calendar/::

  usage         calendar/booking
  icon          <i class="fa fa-calendar"></i>

http://fontawesome.io/icon/check/::

  usage         tick
  icon          <i class="fa fa-check"></i>

http://fontawesome.io/icon/cloud-download/::

  usage         download
  icon          <i class="fa fa-cloud-download"></i>

http://fontawesome.io/icon/envelope-o/::

  usage         mail
  icon          <i class="fa fa-envelope-o"></i>

http://fontawesome.io/icon/exclamation-triangle/::

  usage         warning
  icon          <i class="fa fa-warning"></i>

http://fontawesome.io/icon/external-link/::

  usage         external link
  icon          <i class="fa fa-external-link"></i>

http://fontawesome.io/icon/file-code-o/::

  usage         template - html
  icon          <i class="fa fa-file-code-o"></i>

http://fontawesome.io/icon/header/::

  usage         header/footer
  icon          <i class="fa fa-header"></i>

http://fontawesome.io/icon/home/::

  usage         home
  icon          <i class="fa fa-home"></i>

http://fontawesome.io/icon/pencil-square-o/::

  usage         edit
  icon          <i class="fa fa-edit"></i>

http://fontawesome.io/icon/phone/::

  usage         phone
  icon          <i class="fa fa-phone"></i>

http://fontawesome.io/icon/plus/::

  usage         add
  icon          <i class="fa fa-plus"></i>

http://fontawesome.io/icon/refresh/::

  usage         retry
  icon          <i class="fa fa-refresh"></i>

http://fontawesome.io/icon/reply/::

  usage         dash (back)
  icon          <i class="fa fa-reply"></i>

http://fontawesome.io/icon/shopping-cart/::

  usage         money/payments
  icon          <i class="fa fa-shopping-cart"></i>

http://fontawesome.io/icon/file-text-o/::

  usage         page
  icon          <i class="fa fa-file-text-o"></i>

http://fontawesome.io/icon/tachometer/::

  usage         dashboard
  icon          <i class="fa fa-tachometer"></i>

http://fontawesome.io/icon/trash-o/::

  usage         delete
  icon          <i class="fa fa-trash-o"></i>
  or...         <i class="fa fa-times"></i>

Pure
====

Grid
----

Two columns

.. code-block:: html

  <div class="pure-g">
    <div class="pure-u-1 pure-u-md-1-2">
      <!-- spacing -->
      <div class="l-box">
      <div class="r-box">

Menu
----

.. code-block:: html

  <div class="pure-g">
    <div class="pure-u-1">
      <div class="pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <li class="pure-menu-item">
            <a href="{% url 'booking.list' %}" class="pure-menu-link">
              <i class="fa fa-calendar"></i>
              Bookings
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

Table
-----

.. code-block:: html

  <table class="pure-table pure-table-bordered">
    <thead>
      <tr valign="top">
        <th>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr valign="top">
        <td>
        </td>
      </tr>
    </tbody>
  </table>

Template
========

Date
----

Short date e.g. ``05/09/2015 13:30``::

  {{ item.checkout_date|date:'d/m/Y H:i' }}

Tags
----

From `Two Scoops of Django`_, *the convention we follow is*
``<app_name>_tags.py`` e.g. ``cms_tags.py``.


.. _`Two Scoops of Django`: http://twoscoopspress.org/products/two-scoops-of-django-1-6
