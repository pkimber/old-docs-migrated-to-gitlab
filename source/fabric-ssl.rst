SSL Certificate
***************

Configuration
=============

The following task expects the certificate to be in a folder for the domain
within a folder called ``ssl-cert`` which is placed beside the ``fabric`` and
``pillar`` folders.  See :doc:`site-config` for details...

Make sure the Salt pillar is configured correctly for the site.  You need to
set ``ssl`` to ``True`` and the ``domain`` must match the certificate e.g::

  domain: hatherleigh.info
  ssl: True

.. important:: If you are using :doc:`mailgun`, then don't forget to update
  the route to use ``https`` rather than ``http``.

Usage
=====

To copy an SSL certificate to a cloud server::

  fab -H drop-d ssl_cert:prefix=pkimber,site_name=hatherleigh_net

For details on the ``prefix`` parameter, see :doc:`fabric-release` and
:doc:`site-config`

.. note:: The task will ask you to enter the ``sudo`` password for the user on
  the server.

.. note:: This task expects the ``/srv/`` folder to exist on the server.  I
  don't know what creates the folder... so I am currently not sure how it gets
  there!
