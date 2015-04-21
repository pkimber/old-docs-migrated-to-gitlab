block
*****

.. highlight:: python

https://github.com/pkimber/block

.. note:: The :doc:`app-cms` app extends the ``block`` app.

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
  class EnquiryCreateView(
          PageMixin, PageTemplateMixin, ContentPageMixin, CreateView):

      form_class = EnquiryForm
      model = Enquiry

      def get_form_kwargs(self):
          kwargs = super(EnquiryCreateView, self).get_form_kwargs()
          kwargs.update(dict(
              request=self.request,
              user=self.request.user,
          ))
          return kwargs

      def get_success_url(self):
          page = Page.objects.get(slug=PAGE_CONTACT, slug_menu=MENU_THANKYOU)
          return page.get_absolute_url()

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
