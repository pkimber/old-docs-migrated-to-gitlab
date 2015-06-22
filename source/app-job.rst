Job
***

.. highlight:: python

In the interests of reuse the Recruiter and Candidate models use a contact
model which is defined in the project or another app.

The contact model must be specified in ``settings.CONTACT_MODEL`` using the
form <app name>.<contact model name> e.g::

  CONTACT_MODEL = 'example_job.Contact'

The contact model must have the following fields, methods and URLs:

Fields::

  address_1
  address_2
  address_3
  company_name
  country
  county # technically this is the region but called county for historical reasons
  dob
  mobile
  nationality
  position
  postcode
  town
  user # as defined in settings.AUTH_USER_MODEL
  website

Properties::

  full_name
  is_recruiter
  is_candidate

You must also have a ``contact.detail`` URL which takes you to the contact
detail for the staff user e.g::

  url(regex=r'^contact/(?P<pk>\d+)/$',
      view=ContactDetailView.as_view(),
      name='contact.detail'
      ),

Testing
=======

Use the ``check_contact`` function to check your model and URLs are correct
e.g::

  from job.tests.helper import check_contact
  check_contact(ContactFactory())
