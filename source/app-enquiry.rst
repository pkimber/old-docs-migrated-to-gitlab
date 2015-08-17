enquiry
*******

.. highlight:: python

https://github.com/pkimber/enquiry

Install
=======

Install :doc:`dev-captcha`

Add the :doc:`app-mail` app to your project.

Add the enquiry app to ``requirements/local.txt``::

  -e ../../app/enquiry

Add the enquiry app to ``requirements/production.txt``.

Add the enquiry app to ``settings/base.py``::

  LOCAL_APPS = (
      'project',
      # ...
      'enquiry',

Add the enquiry app to ``project/urls.py``::

  urlpatterns = patterns(
      '',
      # ...
      url(regex=r'^enquiry/',
          view=include('enquiry.urls')
          ),

Usage
=====

.. note:: The following instructions are for adding an enquiry form to a custom
          page (using our :doc:`app-block` app).

Create a custom page for the enquiry form (probably best to do this in the
``init_project`` management command for your project)::

  contact = Page.objects.init_page(
      Page.CUSTOM,
      'contact',
      'Contact',
      3,
      'compose/page_contact.html',
      is_custom=True,
  )
  PageSection.objects.init_page_section(contact, body)
  thankyou = Page.objects.init_page(
      'contact',
      'thankyou',
      'Thank you',
      0,
      'compose/page_article.html',
  )
  PageSection.objects.init_page_section(thankyou, body)

Create a URL for your custom page::
  url(regex=r'^contact/$',
      view=EnquiryCreateView.as_view(),
      kwargs=dict(page=Page.CUSTOM, menu='contact'),
      name='web.contact'
      ),

The enquiry form needs to *know* the current user.  In your view, add the
``user`` in the ``get_form_kwargs`` method e.g::

  from django.views.generic import CreateView

  from block.models import Page
  from block.views import  PageFormMixin
  from enquiry.forms import EnquiryForm
  from enquiry.models import Enquiry

  class EnquiryCreateView(PageFormMixin, CreateView):
      """Save an enquiry in the database."""

      form_class = EnquiryForm
      model = Enquiry

      def get_form_kwargs(self):
          kwargs = super().get_form_kwargs()
          kwargs.update(dict(
              request=self.request,
              user=self.request.user,
          ))
          return kwargs

      def get_success_url(self):
          page = Page.objects.get(slug='contact', slug_menu='thankyou')
          return page.get_absolute_url()

Add the enquiry form to your template e.g::

  {% if design %}
    <p>
      <a href="{% url 'booking.list' %}">
        <i class="fa fa-comments-o"></i>
        Review enquiries
      </a>
    </p>
    <small>The contact form will appear here on the live site.</small>
  {% else %}
    {% include 'web/_form.html' %}
  {% endif %}

Set-up
======

Log into the admin area of the site and set-up notify users.
