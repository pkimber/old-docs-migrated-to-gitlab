block
*****

.. highlight:: python

.. note:: Some of this documentation has been moved from the old ``cms`` app.
          Most of the code is not in this ``block`` app.

https://github.com/pkimber/block

Diagram
=======

:download:`misc/block.pdf`

Custom Pages
============

The standard anchor tag for the design menu should be similar to this:

.. code-block:: html

  <a href="{% if design %}{{ view_url }}{% else %}{{ page.get_design_url }}?view={{ path }}{% endif %}"
    title="{% if design %}View{% else %}Design{% endif %}">

.. note:: The ``view_url`` is generated from the ``view`` parameters.  The view
          passes the current URL to the ``PageDesignMixin`` so that it knows
          where to return to when the user clicks *View* to leave *Design*
          mode.
          For the code, see PageDesignMixin`` in ``block/block/views.py``.

If you want to add a form or extra context to a page, then use a ``CUSTOM``
page.  The URL of a custom page must be different to the standard URL for the
page e.g::

  # urls.py
  url(regex=r'^recruitment/candidate/create/$',
      view=RecruitmentCandidateCreateView.as_view(),
      kwargs=dict(page=Page.CUSTOM, menu='recruitment-candidate-create'),
      name='recruitment.candidate.create'
      ),

  # views.py
  class CalendarView(PageView):

      def get_context_data(self, **kwargs):
          context = super(AvailabilityView, self).get_context_data(**kwargs)
          context.update(dict(
              calendar=('Jan', 'Feb', 'Mar'),
          ))
          return context

Or to add a form::

  # urls.py
  url(regex=r'^contact/$',
      view=EnquiryCreateView.as_view(),
      kwargs=dict(page='contact',),
      name='project.page'
      ),

  # views.py
  class EnquiryCreateView(PageFormMixin, CreateView):

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
          page = Page.objects.get(slug=PAGE_CONTACT, slug_menu=MENU_THANKYOU)
          return page.get_absolute_url()

Enquiry Form
============

To use the contact form (the ``enquiry`` app)::

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

Wizard
======

We have a link and an image wizard.  The following field types are available
for use in a ``ContentModel``::

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
