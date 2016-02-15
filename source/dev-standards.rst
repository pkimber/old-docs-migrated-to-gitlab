Standards
*********

.. highlight:: python

- Click here for :doc:`dev-standards-code`
- Click here for :doc:`dev-standards-ui`

.. important:: We want to continually improve the quality and reliability of
               our software.  If you have any thoughts or ideas for
               improvement, then please create a pull request.

Our current method of working is as follows:

Daily Meeting
=============

Before starting work each day, please send a *daily meeting* email.  The email
should have three headings:

1. *Yesterday*  What did you do yesterday (or the last piece of work you did)?
2. *Today*  What do you expect to do today?
3. *Concerns*  Are there any impediments in your way?  This will help us remove
   any obstacles which might prevent you from completing your work.

Record Time
===========

Please fill in a time sheet.  We will pay your agreed hourly rate based on the
time-sheet.

If you have access to our CRM system, then please record time against the
project ticket.

Standards
=========

- Please use the modules listed in ``dev-requirements``.  If you need to use
  other modules, then please discuss with another member of the team first.
- Please follow our :doc:`dev-standards-code`
- Please follow the :doc:`dev-standards-ui`

Unit Testing
============

We practice test-driven development with a minimum level of code coverage.
See :doc:`dev-standards-code` for the minimum coverage percentage.

Pull Request
============

Create a branch in GIT and then create a pull request in GitHub, GitLab or
BitBucket.

We create a branch as follows::

  git checkout -b 488-time-management

.. note:: In this example, 488 is the ticket number and ``time-management`` is
          a short description of the feature.

We aim to create short-lived branches and merge them quickly back into the
``master`` branch.  Another member of the team will review the work before
merging the code back into the ``master`` branch.

Commit early, commit often
==========================

Please code in small units of work and commit after each change.  At a minimum,
please commit twice a day - at lunch time and before finishing work for the
day.
