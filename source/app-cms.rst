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
