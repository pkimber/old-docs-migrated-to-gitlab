Standards
*********

.. highlight:: python

This document is a **very** good starting point:
`Django models, encapsulation and data integrity`_

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

Documentation
=============

From `PEP 257 - Docstring Conventions - Multi-line Docstrings`_::

  def complex(real=0.0, imag=0.0):
      """Form a complex number.

      Keyword arguments:
      real -- the real part (default 0.0)
      imag -- the imaginary part (default 0.0)
      """
      if imag == 0.0 and real == 0.0:
          return complex_zero

I think I agree with most of the examples in this document:
:download:`misc/pep8_cheat.pdf`

Icons
=====

http://fontawesome.io/icon/calendar/::

  usage         calendar/booking
  icon          <i class="fa fa-calendar"></i>

http://fontawesome.io/icon/cloud-download/::

  usage         download
  icon          <i class="fa fa-cloud-download"></i>

http://fontawesome.io/icon/reply/::

  usage         dash (back)
  icon          <i class="fa fa-reply"></i>

http://fontawesome.io/icon/pencil-square-o/::

  usage         edit
  icon          <i class="fa fa-edit"></i>

http://fontawesome.io/icon/external-link/::

  usage         external link
  icon          <i class="fa fa-external-link"></i>

http://fontawesome.io/icon/home/::

  usage         home
  icon          <i class="fa fa-home"></i>

http://fontawesome.io/icon/plus/::

  usage         add
  icon          <i class="fa fa-plus"></i>

http://fontawesome.io/icon/exclamation-triangle/::

  usage         warning
  icon          <i class="fa fa-warning"></i>

Model
=====

The order of model inner classes and standard methods should be as follows
(they are not all required):

- All database fields
- Custom manager attributes
- ``class Meta``
- ``def __unicode__()``
- ``def __str__()``
- ``def save()``
- ``def get_absolute_url()``
- Any custom methods

Test
----

Create a ``DjangoModelFactory`` for the model using `Factory Boy`_ and test the
following (these are a common source of hard to diagnose issues):

- ``ordering``
- ``str``

Template
========

Tags
----

From `Two Scoops of Django`_, *the convention we follow is*
``<app_name>_tags.py`` e.g. ``cms_tags.py``.

URL
===

From `Coding Conventions`_::

  url(regex=r'^$',
      view=views.poll_list,
      name='poll_list',
  ),

... *the preferred and wonderfully explicit Jacob Kaplan-Moss / Frank Wiles
pattern*...

.. note:: Probably best to use the actual view class rather than just the name,
          using ``view='polls.views.standard.poll_list',``, makes it harder to
          debug on errors.


.. _`Coding Conventions`: https://django-party-pack.readthedocs.org/en/latest/conventions.html#using-the-url-function
.. _`Django models, encapsulation and data integrity`: http://www.dabapps.com/blog/django-models-and-encapsulation/
.. _`PEP 257 - Docstring Conventions - Multi-line Docstrings`: https://www.python.org/dev/peps/pep-0257/#multi-line-docstrings
.. _`Two Scoops of Django`: http://twoscoopspress.org/products/two-scoops-of-django-1-6
.. _`Factory Boy`: https://github.com/rbarrois/factory_boy
