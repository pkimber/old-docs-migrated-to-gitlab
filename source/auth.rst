Authentication
**************

.. highlight:: python

If your site is deployed, but you don't have an admin user (in this example
``hatherleigh_net`` is the name of the site):

::

  ssh server
  sudo -i -u web
  ~/opt/hatherleigh_net.sh shell

  from django.contrib.auth.models import User
  User.objects.create_superuser('your.name', '', 'password')
  exit()
