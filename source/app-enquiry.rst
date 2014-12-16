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

The enquiry form needs to know the current user.  In your view, add the
``user`` in the ``get_form_kwargs`` method e.g::

  from enquiry.forms import EnquiryForm
  from enquiry.models import Enquiry

  class EnquiryCreateView(BaseMixin, CreateView):
      """Save an enquiry in the database."""

      form_class = EnquiryForm
      model = Enquiry

      def get_form_kwargs(self):
          kwargs = super(EnquiryCreateView, self).get_form_kwargs()
          kwargs.update(dict(
              request=self.request,
              user=self.request.user,
          ))
          return kwargs

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
