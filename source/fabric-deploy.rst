Deploy
******

Following on from the previous :doc:`fabric-release` step...

To deploy your project, change into the ``fabric`` folder.

::

  fab -H web@your.server -f deploy.py deploy:prefix=pkimber,name=app_name,version=0.0.16
