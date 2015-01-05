cms
***

.. highlight:: html

https://github.com/pkimber/cms

The ``cms`` app extends the :doc:`app-block` app and allows an administrator to
create new pages and sections.

Template
========

To use the CMS menu and styling in your project we can use ``cms/base.html`` in
place of ``base/base.html``::

  <!-- project/templates/project/base.html -->
  {% extends 'cms/base.html' %}

  <!-- web/templates/web/page.html -->
  {% extends 'project/base.html' %}

To extend the CMS menu in your project::

  <!-- this block will appear below the dashboard and above the pages -->
  {% block menu_dash %}

  <!-- this block will below the pages and above logout-->
  {% block menu_extra %}

URL
===

To use the Django ``url`` tag to link to a page::

  <a href="{% url 'project.page' 'contact' %}">
    You can find our contact details by clicking here...
  </a>

And to ``reverse``:

.. code-block:: python

  url = reverse('project.page', kwargs=dict(page='thank-you'))

.. tip:: The URL name (``project.page``) is in the ``cms.urls.page`` module.

.. note:: The URL parameter (in this example ``contact``) is the ``slug`` of
          the page.
