Deploy
******

.. note::

  Before deploying your site, you need to release the code.  If you have not
  done this, check out the :doc:`fabric-release` instructions...

To deploy your project (in this example for the site ``hatherleigh_info``)::

  cd fabric
  fab site:hatherleigh_info deploy:0.0.19

Issues
======

Error when ``pip install lxml``::

  [drop-temp] out: gcc: internal compiler error: Killed (program cc1)

Check on the server to see if you ran out of memory::

  sudo -i

  drop-temp ~ # dmesg | tail
  [9840732.434057] Out of memory: Kill process 1405 (cc1) score 481 or sacrifice child
  [9840732.434579] Killed process 1405 (cc1) total-vm:281224kB, anon-rss:242024kB, file-rss:0kB
