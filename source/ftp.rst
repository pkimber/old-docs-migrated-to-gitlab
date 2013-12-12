FTP
***

.. highlight:: python

Configuration
=============

If you want to allow FTP access for a site, set ``ftp`` to ``True`` and create
an ``ftp_user_id`` and ``ftp_password`` e.g:

.. code-block:: yaml

  sites:
    hatherleigh_net:
      db_pass: password2
      domain: hatherleigh.net
      secret_key: 'another-secret-key-generated-by-django'
      ssl: True
      uwsgi_port: 3036
      ftp: True
      ftp_password: "generated-using-mkpasswd-see-below"
      ftp_user_id: 7600

.. note::

  Keep the ``ftp_user_id`` unique across all the sites and start from ID 7600
  so we don't clash with standard users.

The password is generated using ``mkpasswd``:

.. code-block:: bash

  mkpasswd -m sha-512 <password>

When you enable FTP for a site, a system user will be created using the name
of the site as the user name e.g. ``hatherleigh_net``.

To allow your project to find templates and static media uploaded using FTP,
update your ``TEMPLATE_DIRS`` in ``settings/production.py`` as follows::

  TEMPLATE_DIRS = (
      get_env_variable('FTP_TEMPLATE_DIR'),
  )

For development, set ``TEMPLATE_DIRS`` in ``local.py`` as follows::

  TEMPLATE_DIRS = (
      os.path.normpath(
          os.path.join(
              os.path.dirname(os.path.realpath(__file__)),
              '..',
              'example',
              'templates',
          )
      ),
  )

Usage
=====

Using an FTP client, connect to the server.  The user name is the name of the
site e.g. ``hatherleigh_net``, and the password is the one you created using
``mkpasswd`` (see above).

When you connect, you will see a ``site`` folder.  Within the ``site`` folder,
create a folder for ``templates`` and a folder for ``static`` media.  The
``templatepages`` folder is for the `django-templatepages`_ app e.g::

  ├── site
  │   ├── static
  │   │   ├── image.jpg
  │   │   └── ...
  │   └── templates
  │       ├── _footer.html
  │       ├── home.html
  │       ├── ...
  │       ├── templatepages
  │       │   ├── my.html
  │       │   └── ...

The URLs for the image and the ``templatepages`` page in the previous example
will be:

| http://hatherleigh.net/fs/image.jpg
| http://hatherleigh.net/article/my.html

Note: The ``article`` within the previous URL assumes that your project URLs
are set-up as follows::

  url(regex=r'^article/',
      view=include('templatepages.urls'),
      ),

If your project (or application) need access to the FTP static folder, then
you can make it available in your environment by adding the following to your
``production.py`` file::

  # FTP upload 'static' folder
  FTP_STATIC_DIR = get_env_variable('FTP_STATIC_DIR')
  FTP_STATIC_URL = get_env_variable('FTP_STATIC_URL')

.. note::

  If you don't want to allow FTP upload to your site, then set
  ``FTP_STATIC_DIR`` and ``FTP_STATIC_URL`` to ``None``::

    # FTP upload 'static' folder
    FTP_STATIC_DIR = None
    FTP_STATIC_URL = None

For local development, to simulate access to the FTP upload folder, add
something similar to this to the ``settings/local.py`` file::

  # FTP upload 'static' folder
  FTP_STATIC_DIR = os.path.normpath(os.path.join(
      os.path.dirname(os.path.realpath(__file__)),
      '..',
      'project',
      'tests',
      'data',
      'ftp_static_dir',
  ))
  # Start a local web server in the 'project' folder.
  FTP_STATIC_URL = 'http://localhost:8080/'


.. _`django-templatepages`: https://github.com/bryanchow/django-templatepages
