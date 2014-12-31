Standards
*********

.. highlight:: python

This document is a **very** good starting point:
`Django models, encapsulation and data integrity`_

Icons
=====

http://fontawesome.io/icon/reply/::

  usage         dash (back)
  icon          <i class="fa fa-reply"></i>

http://fontawesome.io/icon/pencil-square-o/::

  usage         edit
  icon          <i class="fa fa-edit"></i>

http://fontawesome.io/icon/external-link/::

  usage         external link
  icon          <i class="fa fa-external-link"></i>

http://fontawesome.io/icon/home/::

  usage         home
  icon          <i class="fa fa-home"></i>

Model
=====

The order of model inner classes and standard methods should be as follows
(these are not all required):

- All database fields
- Custom manager attributes
- ``class Meta``
- ``def __unicode__()``
- ``def __str__()``
- ``def save()``
- ``def get_absolute_url()``
- Any custom methods

URL
===

From `Coding Conventions`_::

  url(regex=r'^$',
      view=views.poll_list,
      name='poll_list',
  ),

... *the preferred and wonderfully explicit Jacob Kaplan-Moss / Frank Wiles
pattern*...

.. note:: Probably best to use the actual view class rather than just the name,
          using ``view='polls.views.standard.poll_list',``, makes it harder to
          debug on errors.


.. _`Coding Conventions`: https://django-party-pack.readthedocs.org/en/latest/conventions.html#using-the-url-function
.. _`Django models, encapsulation and data integrity`: http://www.dabapps.com/blog/django-models-and-encapsulation/
