Deploy
******

.. note::

  Before deploying your site, you need to release the code.  If you have not
  done this, check out the :doc:`fabric-release` instructions...

To deploy your project (in this example for the server ``server`` and the
site ``hatherleigh_net``):

::

  cd fabric
  fab -H web@drop-temp -f deploy.py deploy:prefix=pkimber,name=hatherleigh_net,version=0.0.16

For details on the ``prefix`` parameter, see :doc:`fabric-release`
