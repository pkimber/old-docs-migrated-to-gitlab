Create SSL Certificate
**********************

.. highlight:: bash

To install an SSL certificate, see :doc:`fabric-ssl`...

.. note:: To validate the domain name, you will need to receive an email.
          If you are not using Google Mail, then set-up MailGun by following
          the instructions in :doc:`mailgun`

We use two companies for SSL certificates, SSLs.com and StartSSL.  The
certificates from StartSSL are free, but the web site is complicated to use.

Create a domain folder within the ``ssl-cert`` folder e.g. :doc:`site-config`.
Run the following commands in that folder.

SSLs.com
========

.. warning:: When using ``ssls.com`` the *Common Name* **must** include the
             ``www``
             i.e. ``www.hatherleigh.info`` rather than ``hatherleigh.info``.

Generate your certificate request and private key::

  openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr

  Generating a 2048 bit RSA private key
  ..................+++
  .........................................+++
  writing new private key to 'server.key'
  -----
  You are about to be asked to enter information that will be incorporated
  into your certificate request.
  What you are about to enter is what is called a Distinguished Name or a DN.
  There are quite a few fields but you can leave some blank
  For some fields there will be a default value,
  If you enter '.', the field will be left blank.
  -----
  Country Name (2 letter code) [AU]:GB
  State or Province Name (full name) [Some-State]:Devon
  Locality Name (eg, city) []:Okehampton
  Organization Name (eg, company) [Internet Widgits Pty Ltd]:www.hatherleigh.info
  Organizational Unit Name (eg, section) []:
  Common Name (e.g. server FQDN or YOUR name) []:www.hatherleigh.info
  Email Address []:

  Please enter the following 'extra' attributes
  to be sent with your certificate request
  A challenge password []:
  An optional company name []:

.. note:: Country code for the UK is ``GB``

.. note:: Do not enter the email address, challenge password or optional
          company name).  Just press *Enter* to ignore.

This process will generate two files, ``server.csr`` (the certificate request)
and ``server.key`` (the private key).

Use the certificate request (``server.csr``) file to request a certificate from
https://www.ssls.com/

Confirm Domain ownership by receiving an email - choose webmaster@hatherleigh.info

When the certificate is approved, you will be sent an email containing a couple
of certificates.

Copy the *Web Server CERTIFICATE* into a file called ``ssl.crt``.  The
certificate is the text starting with ``-----BEGIN CERTIFICATE-----`` and
ending with ``-----END CERTIFICATE-----``.

Copy the *INTERMEDIATE CA* into a file called ``intermediate.crt``.  The
certificate is the text starting with ``-----BEGIN CERTIFICATE-----`` and
ending with ``-----END CERTIFICATE-----``.

Concatenate the two certificates to create a unified certificate::

  cat ssl.crt intermediate.crt > ssl-unified.crt

StartSSL
========

.. note:: Instructions for http://www.ssls.com/ are similar.  See the section
          above for instructions on generating a certificate request.

Using https://www.startssl.com/, enter the *Validations Wizard* and choose
*Domain Name Validation*, enter the *Domain Name*, select a
*Verification Email* and then enter the verification code sent to the selected
email address.

Enter the *Certificates Wizard*, select *Web Server SSL/TLS Certificate*,
then click *Skip*.

Paste the contents of ``server.csr`` into the box.  The request is the whole
file starting with ``-----BEGIN CERTIFICATE REQUEST-----`` and ending with
``-----END CERTIFICATE REQUEST-----``.

Click *Continue*, then *Continue* again.  Choose the *Domain*...

Add a subdomain.  I usually enter ``www``.

Complete the process and then *Save Certificate* into a file named ``ssl.crt``
(as suggested by the StartSSL web site).  Before clicking *Finish*, download
``sub.class1.server.ca.pem`` and ``ca.pem``

.. Note:: if you forget to download any of these files, then don't panic!
  ``ssl.crt`` can be downloaded from *Control Panel*, *Toolbox*, *Retrieve
  Certificate*.  I think the other two files are the same for all StartSSL
  certificates and can be re-used from another download or found on the
  StartSSL web site (possibly http://www.startssl.com/certs/)

Concatenate the three certificates to create a unified certificate::

  cat ssl.crt sub.class1.server.ca.pem ca.pem > ssl-unified.crt

Install
=======

To copy the certificate to the server, refer to the :doc:`fabric-ssl` notes...

Verify
======

To make sure your certificate matches the private key::

  openssl x509 -noout -modulus -in ssl.crt
  openssl req -noout -modulus -in server.csr
  openssl rsa -noout -modulus -in server.key

Issues
======

The nginx log showed:

::

  Starting nginx:
  nginx: [emerg] SSL_CTX_use_certificate_chain_file("/srv/ssl/hatherleigh_net/ssl-unified.crt")
  failed (SSL: error:0906D066:PEM
  routines:PEM_read_bio:bad end line error:140DC009:SSL
  routines:SSL_CTX_use_certificate_chain_file:PEM lib)
  nginx: configuration file /etc/nginx/nginx.conf test failed

This was an issue with the line breaks in the concatenated files.

They looked thus::

-----END CERTIFICATE----------BEGIN CERTIFICATE-----


and it should have looked like this::

-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----

To acheieve this we added a blank line to the ``ssl.crt`` file, re-concatenated,
used ``fab live:hatherleigh.info ssl`` to place the new file on the server and
then re-started nginx with ``service nginx restart`` on the server as root.

For further help solving this issue, see `Fixing PEM routines:PEM_read_bio:bad end line error`_.


.. _`Fixing PEM routines:PEM_read_bio:bad end line error`: http://drewsymo.com/how-to/pem-routinespem_read_biobad-end-line-error/
