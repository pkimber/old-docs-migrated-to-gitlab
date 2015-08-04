cms
***

.. highlight:: html

https://github.com/pkimber/cms

The ``cms`` app extends the :doc:`app-block` app and allows an administrator to
create new pages and sections.

Compose
=======

Update the compose app to support different ``Article`` types::

  picture_only
  text_left
  text_only
  text_right

Article
-------

See the template in ``compose/page_article.html``.  This is used by the home
page of the example app.

Feature
-------

Provides a page section with a title, description and a picture

See the template ``compose/page_feature.html`` (this uses the
``compose/_event_feature.html`` snippet which displays events using the feature
block).

This page is not created when the ``example_cms`` app is initialised so you
need to log in to the ``example_cms`` app as ``admin`` and follow this
procedure to configure it.

.. note:: Please note this page also uses a header block so you need to
          configure it (see the section below).

Create a section (*Dashboard* | *Section*)::

  Name          Feature A
  Slug          feature_a
  Block app     compose
  Block model   Feature
  Create url    compose.feature.create

Create a template called ``compose/page_feature.html`` (*Dashboard* |
*Template*).  Add the *Feature A* section created above.

Create a Feature style called ``Event`` css class ``event`` (*Settings* |
*Feature Styles*)

Create a page that uses the ``page_feature`` template (*Dashboard* | *Create
Page*)

You can now manage the content on this page using design mode.

Header
------

Provides a page section that displays a header.

See the template ``page_feature.html``.  In addition to the steps above...

Create a section (*Dashboard* | *Section*)::

  Name          Header A
  Slug          header_a
  Block app     compose
  Block model   Header
  Create url    compose.header.create

Add this section to the template ``compose/page_feature.html`` created above
(*Dashboard | *Template*)

You can now manage the content on this page using design mode.

Contact
=======

To use the contact form (the ``enquiry`` app):

.. code-block:: python

  # views.py
  from block.views import (
      ContentPageMixin,
      PageMixin,
  )
  from enquiry.forms import EnquiryForm
  from enquiry.models import Enquiry

  class ContactView(PageMixin, ContentPageMixin, CreateView):

      form_class = EnquiryForm
      model = Enquiry
      template_name = 'compose/contact.html'

      def get_form_kwargs(self):
          kwargs = super(ContactView, self).get_form_kwargs()
          kwargs.update(dict(
              request=self.request,
              user=self.request.user,
          ))
          return kwargs

      def get_success_url(self):
          return reverse('project.page', kwargs=dict(page='contact-thank-you'))

  # urls.py
  url(regex=r'^contact/$',
      view=ContactView.as_view(),
      kwargs=dict(page='contact'),
      name='project.contact'
      ),

You will need to create a new page (``contact-thank-you``).

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
