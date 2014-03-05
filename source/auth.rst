Authentication
**************

.. highlight:: python

If your site is deployed, but you don't have an admin user (in this example
``hatherleigh_info`` is the name of the site):

.. code-block:: bash

  ssh server
  sudo -i -u web
  ~/opt/hatherleigh_info.sh shell

::

  from django.contrib.auth.models import User
  User.objects.create_superuser('your.name', '', 'password')
  exit()

::

  User.objects.create_user('your.name', '', 'password', is_staff=True)
