Release
*******

.. note::

  The release process supports Mercurial and GIT.

  The fabric release task will deploy your module to a package index of your
  choice (e.g. ``dev``).  For details on setting up your own package index,
  see the :doc:`devpi` documentation.

.. note::

  This task prefixes your application name with a name of your choosing.  This
  prevents name clashes with other packages on the python package index (PyPI).

  The prefix is also used for looking up the database settings for your
  application.  For details, see :doc:`site-config`

  I recommend choosing a short version of your company name e.g. ``pkimber``:

Start by committing your code to the version control system.

Release the module and upload to your package index::

  cd /your/app/folder/
  fab -f ../../module/fabric/release.py dist:prefix=pkimber,pypirc=dev

If this is the first time you have released this package then the upload will
fail.  You need to run the following before running the ``release`` command
again::

  cd /your/app/folder/
  python setup.py register -r dev

.. If the upload to :doc:`devpi` fails (as it seems to do the first time you
   release a module), then you can use the command line to upload (change the
   password to the one you defined when setting up ``devpi``)::
   pip install nose
   pip install devpi-client
   devpi login root --password="123"
   devpi use root/dev
   devpi upload

.. note::

  Don't forget to commit your code to the version control system after running
  this task

Click here for :doc:`fabric-deploy` instructions...

To check the contents of the release::

  tar -ztvf dist/pkimber-app-name-0.0.16.tar.gz

.. note::

  The release process removes underscores from the package name, so if your
  package is called ``app_name`` it will be changed to ``app-name``.  I don't
  really understand why this is necessary, but the following links might be
  useful.

  http://python.6.x6.nabble.com/quot-Safe-quot-Project-Names-and-underscores-in-Project-Names-issue-td2011757.html

  https://bitbucket.org/tarek/distribute/src/611910892a04/pkg_resources.py#cl-1135
