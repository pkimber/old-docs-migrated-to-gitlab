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

  I recommend choosing a short version of your company name e.g. ``kb``:

Start by committing your code to the version control system.

Release the module and upload to your package index.  In this first example, we
switch to the ``fabric`` virtual environment which is using python
(``fabric`` is currently not compatible with python 3)::

  cd /your/app/folder/
  source ~/repo/dev/module/fabric/venv-fabric/bin/activate && \
      fab -f ../../module/fabric/release.py dist:prefix=kb,pypirc=dev && \
      cd .

If this is the first time you have released this package then the upload will
fail.  You need to run the following before running the ``release`` command
again::

  devpi login kb --password "123"
  # devpi use --set-cfg kb/dev
  devpi upload

.. cd /your/app/folder/
.. python setup.py register -r dev

.. note:: see :doc:`devpi` for help with the above commands.

.. note:: Don't forget to commit your code to the version control system after
          running this task

Click here for :doc:`fabric-deploy` instructions...

To check the contents of the release::

  tar -ztvf dist/kb-app-name-0.0.16.tar.gz

.. note::

  The release process removes underscores from the package name, so if your
  package is called ``app_name`` it will be changed to ``app-name``.  I don't
  really understand why this is necessary, but the following links might be
  useful.

  http://python.6.x6.nabble.com/quot-Safe-quot-Project-Names-and-underscores-in-Project-Names-issue-td2011757.html

  https://bitbucket.org/tarek/distribute/src/611910892a04/pkg_resources.py#cl-1135
