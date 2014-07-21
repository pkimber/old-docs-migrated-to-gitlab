enquiry
*******

.. highlight:: python

https://github.com/pkimber/enquiry

Usage
=====

The enquiry form needs to know the current user.  In your view, add the
``user`` in the ``get_form_kwargs`` method e.g::

  class EnquiryCreateView(BaseMixin, CreateView):
      """Save an enquiry in the database."""

      form_class = EnquiryForm
      model = Enquiry

      def get_form_kwargs(self):
          kwargs = super(EnquiryCreateView, self).get_form_kwargs()
          kwargs.update(dict(
              user=self.request.user,
          ))
          return kwargs

Development
===========

:doc:`dev-captcha`

Set-up
======

Log into the admin area of the site and set-up notify users.
