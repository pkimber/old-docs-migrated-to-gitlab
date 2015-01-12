Workflow
********

.. highlight::

GitHub Flow
===========

We are using the GitHub Flow.  This is a 5 minute outline of the process:
`Understanding the GitHub Flow`_

This YouTube video has an excellent overview of the thinking behind the
process: `How GitHub Uses GitHub to Build GitHub by Zach Holman`_

We would like the pull request for all code to be reviewed by another member of
the team before the code is accepted into ``master`` and deployed.

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
as you like e.g::



Review
------

When 


.. _`git branching`: https://www.pkimber.net/howto/git/branch.html
.. _`How GitHub Uses GitHub to Build GitHub by Zach Holman`: https://www.youtube.com/watch?v=qyz3jkOBbQY
.. _`Understanding the GitHub Flow`: https://guides.github.com/introduction/flow/index.html
