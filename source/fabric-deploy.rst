Deploy
******

.. highlight:: bash

.. note:: Before deploying your site, you need to release the code.  If you
          have not done this, check out the :doc:`fabric-release` instructions.

Prerequisites:

  The fabric ``deploy`` command opens the pages on the web site using the
  Chrome browser.  For this to work you need to install the Chrome web driver:
  `Chrome WebDriver for Selenium`_

.. _`Chrome WebDriver for Selenium`: https://www.pkimber.net/howto/testing/selenium/chrome.html

To deploy your project to a test site (in this example for the site
``hatherleigh_info``)::

  cd fabric
  fab test:hatherleigh_info deploy:0.0.19

To deploy your project to a live site (in this example for the site
``hatherleigh_info``)::

  cd fabric
  fab live:hatherleigh_info deploy:0.0.19

Test
====

The ``deploy`` command will open the pages in the site map in the Chrome
browser.  To open additional pages, add them to the ``deploy/test/`` folder for
the site e.g::

  # ~/repo/dev/module/deploy/test/hatherleigh_info.yaml

.. code-block:: yaml

  urls:
  - url:
    title: Hatherleigh Information
  - url: accounts/login
    title: Login

Issues
======

lxml
----

Error when ``pip install lxml``::

  [drop-temp] out: gcc: internal compiler error: Killed (program cc1)

Check on the server to see if you ran out of memory::

  sudo -i

  drop-temp ~ # dmesg | tail
  [9840732.434057] Out of memory: Kill process 1405 (cc1) score 481 or sacrifice child
  [9840732.434579] Killed process 1405 (cc1) total-vm:281224kB, anon-rss:242024kB, file-rss:0kB

uwsgi
-----

Since switching to python 3, the uwsgi install using Salt appears to have some
issues::

  tail /var/log/nginx/error.log

To solve the problem:

  Run the ``highstate`` for a second time.  You should see ``0`` errors.

  Install your web project (so that ``uwsgi`` has something to do).

  Log into the minion as ``root``.

  Run ``supervisorctl`` and you will probably see that ``uwsgi`` ``Exited too
  quickly``.  Just ``start uwsgi`` and all should be well.
