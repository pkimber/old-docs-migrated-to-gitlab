base
****

.. highlight:: python

https://github.com/pkimber/base

``RequiredFieldForm``
=====================

https://github.com/pkimber/base/blob/master/base/form_utils.py

e.g::

  class SnippetForm(RequiredFieldForm):

To mark a field as *not* required::

URL
===

We have a few *standard* URLs:

- ``logout``
- ``login``
- ``project.home`` the home page of the web site.
- ``project.dash`` the home page for a member of staff (or logged in user if
  the project requires it).
- ``project.settings``, the project settings.  Usually only accessible to a
  member of staff.

view_utils
==========

https://github.com/pkimber/base/blob/master/base/view_utils.py

The ``BaseMixin`` class adds the following to the template context:

- ``path``: ``self.request.path`` or ``home`` if the path is ``/``
- ``today``: todays date (``datetime.today()``)
- ``request_path``: ``self.request.path``
