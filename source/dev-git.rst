git
***

.. highlight:: bash

GitLab
======

To create a new repository:

- Log into https://gitlab.com/ using our company login details.
- Click on *New Project*.
- In the *Project path* section select the ``kb`` group.  Select the correct
  *Visibility Level* and click *Create Project*.
- You should now be able to clone the repository, add a ``README.rst`` file and
  then push.
- Go to the *Project Settings*, click on *Protected branches* and unprotect the
  master branch so developers can push to it.

To move a repository from GitHub to GitLab: `Migrate from GitHub`_

Continuous Integration
----------------------

To set-up a runner see `Continuous Integration`_

- Go to *Project Settings*, scroll down to *Continuous Integration* and copy
  the regular expression for ``pytest-cov`` into the *Test coverage parsing*
  section.  Click *Save Changes*.
- Log into GitLab as an administrator, *Project Settings*, *Runners*, click
  *Enable for this project*.

Create a ``.gitlab-ci.yml`` file in your project.  Here is an example:
`.gitlab-ci.yml`_

- Create a ``requirements/ci.txt`` file.  To make access easier for public
  repositories, use the GIT ``https`` URL rather than a path to the folder e.g:
  ``-e git+https://github.com/pkimber/login.git#egg=login``
- In the ``setup.cfg`` file, add ``src`` to stop the tests being run for
  installed apps e.g: ``norecursedirs = .git venv-* src``


.. _`.gitlab-ci.yml`: https://gitlab.com/kb/checkout/blob/master/.gitlab-ci.yml
.. _`Continuous Integration`: https://www.pkimber.net/howto/git/gitlab.html#continuous-integration
.. _`Migrate from GitHub`: https://www.pkimber.net/howto/git/gitlab.html#migrate-from-github
