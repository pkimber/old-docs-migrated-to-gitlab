Code Standards
**************

.. highlight:: python

- Click here for :doc:`dev-standards`
- Click here for :doc:`dev-standards-ui`

These documents are **very** good starting points:

- `Django models, encapsulation and data integrity`_
- `Open Sourcing a Python Project the Right Way`_

Code
====

.. important:: We are going to start by aiming for 70% test coverage for an app
               and 50% for a project.
               Useful to bear this in mind `Changing the Metrics Conversation`_

Add the following to ``requirements/local.txt``::

  pytest-cov
  pytest-flakes
  pytest-pep8

Add configuration for flakes e.g in ``setup.cfg``::

  [pytest]
  addopts= --cov-report html --reuse-db
  DJANGO_SETTINGS_MODULE = settings.dev_test
  norecursedirs = .git venv-*
  # 1. migrations always import models
  # 2. custom settings files e.g. 'dev_patrick.py' do 'from .base import *'
  # 3. 'test_view_perm.py' py.test fixtures conflict with pyflakes
  flakes-ignore =
      block/migrations/* UnusedImport
      example_block/dev_*.py ImportStarUsed
      test_view_perm.py UnusedImport RedefinedWhileUnused

.. important:: Change ``block`` to the correct path for your app or project.

To check the code::

  py.test --flakes
  py.test --pep8

Release

- (not sure if this project is any good).  If it is... check with
  https://github.com/mgedmin/check-manifest

Documentation
=============

From `PEP 257 - Docstring Conventions - Multi-line Docstrings`_::

  def complex(real=0.0, imag=0.0):
      """Form a complex number.

      Keyword arguments:
      real -- the real part (default 0.0)
      imag -- the imaginary part (default 0.0)
      """
      if imag == 0.0 and real == 0.0:
          return complex_zero

I think I agree with most of the examples in this document:
:download:`misc/pep8_cheat.pdf`.

I also like some of the ideas in `Elements of Python Style`_.  We can watch and
see if it becomes accepted.

Model
=====

The order of model inner classes and standard methods should be as follows
(they are not all required):

- All database fields
- Custom manager attributes
- ``class Meta``
- ``def __unicode__()``
- ``def __str__()``
- ``def save()``
- ``def get_absolute_url()``
- Any custom methods

Delete
------

Use a boolean field e.g::

  deleted = models.BooleanField(default=False)
  # optional date and user fields
  date_deleted = models.DateTimeField(blank=True, null=True)
  user_deleted = models.ForeignKey(
      settings.AUTH_USER_MODEL, blank=True, null=True
  )

With an option ``set_deleted`` method::

  def set_deleted(self, user):
      self.deleted = True
      self.date_deleted = timezone.now()
      self.user_deleted = user
      self.save()

Testing
=======

Factories
---------

Model factories should create the minimum required to construct a valid object
e.g. a product will probably need to create a product category, but a contact
will not need to fill in the date of birth.

.. note:: I am not 100% sure about this... but I am sure a factory which does
          more than it needs to will make it feel like magic is going on and
          cause confusion.

Model
-----

Create a ``DjangoModelFactory`` for the model using `Factory Boy`_ and test the
following (these are a common source of hard to diagnose issues):

- ``ordering``
- ``str``

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


.. _`Changing the Metrics Conversation`: https://www.thoughtworks.com/insights/blog/changing-metrics-conversation
.. _`Coding Conventions`: https://django-party-pack.readthedocs.org/en/latest/conventions.html#using-the-url-function
.. _`Django models, encapsulation and data integrity`: http://www.dabapps.com/blog/django-models-and-encapsulation/
.. _`Elements of Python Style`: https://github.com/amontalenti/elements-of-python-style
.. _`Factory Boy`: https://github.com/rbarrois/factory_boy
.. _`Open Sourcing a Python Project the Right Way`: http://www.jeffknupp.com/blog/2013/08/16/open-sourcing-a-python-project-the-right-way/
.. _`PEP 257 - Docstring Conventions - Multi-line Docstrings`: https://www.python.org/dev/peps/pep-0257/#multi-line-docstrings
