block
*****

.. highlight:: python

.. note:: Some of this documentation is awaiting review.  It has been moved
          from the old ``cms`` app.

https://github.com/pkimber/block

Diagram
=======

:download:`misc/block.pdf`

CMS
===

To use the block system as a CMS::

  url(regex=r'^block/',
      view=include('block.urls.block')
      ),
  url(regex=r'^compose/',
      view=include('compose.urls.compose')
      ),
  # this url include should come last
  url(regex=r'^',
      view=include('block.urls.cms')
      ),

.. note:: The ``block.urls.cms`` URLs add a header and footer to the page.

Custom Pages
============

If you want to add a form or extra context to a page, then use a ``CUSTOM``
page.  Our standard is to use ``Page.CUSTOM`` for the ``page`` parameter.

The URL of a custom page must be different to the standard URL for the page

See :doc:`app-enquiry` for an example...

Menu - Design
-------------

The standard anchor tag for the design menu should be similar to this:

.. code-block:: html

  <a href="{% if design %}{{ view_url }}{% else %}{{ page.get_design_url }}?view={{ path }}{% endif %}"
    title="{% if design %}View{% else %}Design{% endif %}">

.. note:: The ``view_url`` is generated from the ``view`` parameters.  The view
          passes the current URL to the ``PageDesignMixin`` so that it knows
          where to return to when the user clicks *View* to leave *Design*
          mode.
          For the code, see PageDesignMixin`` in ``block/block/views.py``.

Pagination
==========

To use pagination in a ``block`` view, we must change the ``page_kwarg``.

As a standard we will use ``page-no`` e.g::

  page_kwarg = 'page-no'
  paginate_by = 15

The cause of this issue is our use of the ``page`` variable in the ``block``
app to identify the page.  The default value of ``page_kwarg`` is ``page``.
Django looks for ``page_kwarg`` in ``views/generic/list.py``::

  page = self.kwargs.get(page_kwarg) or self.request.GET.get(page_kwarg) or 1

Template
========

To use the CMS menu and styling in your project we can use ``block/base.html``
in place of ``base/base.html``::

  <!-- project/templates/project/base.html -->
  {% extends 'block/base.html' %}

  <!-- web/templates/web/page.html -->
  {% extends 'project/base.html' %}

To extend the block menu in your project::

  <!-- this block will appear below the dashboard and above the pages -->
  {% block menu_dash %}

  <!-- this block will below the pages and above logout-->
  {% block menu_extra %}

URL
===

To use the Django ``url`` tag to link to a page::

  <a href="{% url 'project.page' 'custom' 'contact' %}">
    You can find our contact details by clicking here...
  </a>

And to ``reverse``:

.. code-block:: python

  url = reverse('project.page', kwargs=dict(page='thank-you'))

.. tip:: The URL name (``project.page``) is in the ``block.urls.cms`` module.

Wizard
======

We have a *link* and an *image* wizard.  The following field types are
available for use in a ``ContentModel``::

  link = models.ForeignKey(
      Link,
      related_name='article_link',
      blank=True, null=True
  )
  references = models.ManyToManyField(Link)
  picture = models.ForeignKey(
      Image,
      related_name='article_picture',
      blank=True, null=True
  )
  carousel = models.ManyToManyField(Image)

The field names are returned as a ``list`` to the ``block`` app in a
``wizard_fields`` method e.g::

  @property
  def wizard_fields(self):
      return [
          Wizard('picture', Wizard.IMAGE, Wizard.SINGLE),
          Wizard('link', Wizard.LINK, Wizard.SINGLE),
          Wizard('carousel', Wizard.IMAGE, Wizard.MULTI),
          Wizard('references', Wizard.LINK, Wizard.MULTI),
      ]

If you want the user to be able to link a single image (or link), then specify
``Wizard.SINGLE``.  For multi-links or images, use ``Wizard.MULTI``.

The urls for these fields are rendered in the
``block/block/templates/block/_moderate.html`` template.
