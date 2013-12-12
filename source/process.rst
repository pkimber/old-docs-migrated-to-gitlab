Process
*******

.. highlight:: bash

To deploy a site from scratch:

Purchase a domain name e.g. http://dyn.com/

Create a cloud server for your project: :doc:`salt-cloud-digitalocean` or
:doc:`salt-cloud-rackspace`.

Set the name servers.  e.g. for https://cloud.digitalocean.com/domains::

  ns1.digitalocean.com
  ns2.digitalocean.com
  ns3.digitalocean.com

Set-up the basic DNS records e.g.

.. image:: ./misc/process-dns.jpg

Enable mailgun for your project: :doc:`mailgun`

.. warning::

  Your site doesn't yet have ``https`` enables, so for the *Action*
  on the mailgun route, use ``http`` (not ``https``).

Set-up your pillar :doc:`site-config`

.. warning:: Set-up your site with ``ssl: False``

Transfer the pillar to the salt master and then :doc:`salt-provision`

Create the database for your project: :doc:`fabric-database`

Release your project: :doc:`fabric-release`

Deploy your project to the server: :doc:`fabric-deploy`

Check the mailgun domain to make sure the DNS records are set-up correctly.

Send a test email to your site e.g. ``test@hatherleigh.info``

Log into your cloud server and check the email was received e.g::

  ssh drop-temp
  sudo -i -u web
  hatherleigh_info.sh shell

.. code-block:: python

  from mailgun_incoming.models import IncomingEmail
  IncomingEmail.objects.all()

Create an SSL certificate e.g. http://www.startssl.com/

.. warning::

  Change the *Action* on the mailgun route filter to use ``https``:
  :doc:`mailgun`
