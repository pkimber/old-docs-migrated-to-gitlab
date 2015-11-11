Scripts to manage the development process
*****************************************

https://github.com/mdinsmore/dev-scripts

``set-branches``
================

I've added a script to dev-scripts called ``set-branches``.  You'll be
surprised to learn that what it does is set the branches the apps used by the
project.  After you pull the latest version you need to run the following in
the top level directory of the dev-scripts project to add the script to your
``$HOME/bin`` directory::

  ./create-bin

To use the set-branches script just change to the project directory and type::

  set-branches

The script requires a file called ``requirements/branch.txt``. This should
contain a line for each app used in the project using the format::

  app|branch

E.g. for Kach atm it looks like this::

  base|1136-delete-image-from-library
  block|1136-delete-image-from-library
  compose|1136-delete-image-from-library
  login|master
  mail|master
