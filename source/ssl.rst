SSL
***

Using https://www.startssl.com/, enter the *Validations Wizard* and choose
*Domain Name Validation*, enter the *Domain Name*, select a *Verification Email*
and then enter the verification code sent to the selected email address.

Generate your certificate request and private key:

::

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
  Country Name (2 letter code) [AU]:UK
  State or Province Name (full name) [Some-State]:Devon
  Locality Name (eg, city) []:Okehampton
  Organization Name (eg, company) [Internet Widgits Pty Ltd]:pkimber.net
  Organizational Unit Name (eg, section) []:
  Common Name (e.g. server FQDN or YOUR name) []:pkimber.net
  Email Address []:web@pkimber.net

  Please enter the following 'extra' attributes
  to be sent with your certificate request
  A challenge password []:
  An optional company name []:

Note: I did not use either of the extra attributes (challenge password or
optional company name).  Just press *Enter* to ignore...

This process will generate two files, ``server.csr`` (the certificate request)
and ``server.key`` (the private key).

Enter the *Certificates Wizard*, select *Web Server SSL/TLS Certificate*,
then click *Skip*.

Paste the contents of ``server.csr`` into the box.  The request is the whole file starting with
``-----BEGIN CERTIFICATE REQUEST-----`` and ending with ``-----END CERTIFICATE REQUEST-----``.

Click *Continue*, then *Continue* again.  Choose the *Domain*...

Add a subdomain.  I usually enter ``www``.

Complete the process and then *Save Certificate* into a file named ``ssl.crt``
(as suggested by the StartSSL web site).  Before clicking *Finish*, download
``sub.class1.server.ca.pem`` and ``ca.pem``

.. Note:: if you forget to download any of these files, then don't panic!
  ``ssl.crt`` can be downloaded from *Control Panel*, *Toolbox*, *Retrieve
  Certificate*.  I think the other two files are the same for all StartSSL
  certificates and can be re-used from another download or found on the StartSSL
  web site (possibly http://www.startssl.com/certs/)

Concatenate the three certificates to create a unified certificate:

::

  cat ssl.crt sub.class1.server.ca.pem ca.pem > ssl-unified.crt

To copy the certificate to the server, refer to the :doc:`fabric-ssl` notes...