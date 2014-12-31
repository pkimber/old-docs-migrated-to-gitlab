cms
***

.. highlight:: python

https://github.com/pkimber/cms

The ``cms`` app extends the :doc:`app-block` app and allows an administrator to
create new pages and sections.

URL
===

To use the Django ``url`` tag to link to a page:

.. code-block:: html

  <a href="{% url 'project.page' 'contact' %}">
    You can find our contact details by clicking here...
  </a>

.. tip:: The URL name (``project.page``) is in the ``cms.urls.page`` module.

.. note:: The URL parameter (in this example ``contact``) is the ``slug`` of
          the page.
