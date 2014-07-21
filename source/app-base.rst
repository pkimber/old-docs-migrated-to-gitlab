base
****

https://github.com/pkimber/base

view_utils
==========

https://github.com/pkimber/base/blob/master/base/view_utils.py

The ``BaseMixin`` class adds the following to the template context:

- ``path``: ``self.request.path`` or ``home`` if the path is ``/``
- ``today``: todays date (``datetime.today()``)
- ``request_path``: ``self.request.path``
