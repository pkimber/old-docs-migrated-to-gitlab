Workflow
********

.. highlight:: bash

GitHub Flow
===========

We are using the GitHub Flow.

Here is a 5 minute outline of the process: `Understanding the GitHub Flow`_

This YouTube video has an excellent overview of the thinking behind the
process: `How GitHub Uses GitHub to Build GitHub by Zach Holman`_

.. note:: We would like the pull request for all code to be reviewed by another
          member of the team before the code is accepted into ``master`` and
          deployed.

Here are some notes which try and explain how we use the workflow:

Create a branch
---------------

Always create a branch for the piece of work you are doing next.  The branch
name should be separated with dashes and start with the ticket number from the
CRM system (for help with ``git`` branching, see `git branching`_)::

  git checkout -b 508-dev-workflow

Development
-----------

Do your development for this feature on this branch.  Commit and push as often
as you like::

  # when you try a push the first time, you might be asked to set the origin
  git push --set-upstream origin 508-dev-workflow

If you want to switch back to the ``master`` branch::

  # commit your changes, then...
  git checkout master

To list branches::

  git branch -a

If you want to switch back to the branch::

  # commit your changes, then...
  git checkout 508-dev-workflow

To pull the latest changes from ``master`` into your branch::

  git checkout master
  git pull
  git checkout 508-dev-workflow
  git rebase master
  # not sure if we need to commit after this?

Review
------

When you would like some help, or you are ready for the code to be reviewed,
then create a pull request on GitHub.

Go to the repository.  I found a button saying *Compare and pull request* which
I clicked and filled in the details.

  You can add the user name to notify a particular user e.g. ``@pkimber``.

Continue
--------

We can continue to comment and commit until we are happy with the pull request.

.. tip:: The pull request doesn't have to be a small piece of code.  It could
         happily contain a full sub-system.

Merge
-----

When we are happy with the pull request, then someone other than the author can
click *Merge pull request* to merge the changes back into ``master`` ready for
deployment.


.. _`git branching`: https://www.pkimber.net/howto/git/branch.html
.. _`How GitHub Uses GitHub to Build GitHub by Zach Holman`: https://www.youtube.com/watch?v=qyz3jkOBbQY
.. _`Understanding the GitHub Flow`: https://guides.github.com/introduction/flow/index.html
