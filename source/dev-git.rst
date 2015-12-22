git
***

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

Continuous Integration
----------------------

- Go to *Project Settings*, scroll down to *Continuous Integration* and copy
  the regular expression for ``pytest-cov`` into the *Test coverage parsing*
  section.  Click *Save Changes*.
- *Runners* can be found in *Project Settings*, *Runners*.
