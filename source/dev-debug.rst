Debug
*****

After watching, `Clayton Parker - So you think you can PDB? - PyCon 2015`_, I
have started using pdbpp_.

I think you might like it...

.. image:: ./misc/pdbpp.png

Add the following to ``requirements/local.txt``::

  pdbpp
  setuptools_scm

.. note:: You might need to remove ``ipdb`` and ``ipython``

Download a nice looking ``.pdbrc.py`` file and copy to your home folder.
I downloaded this one:
https://github.com/claytron/dotfiles/blob/master/.pdbrc.py

To debug, add the following to the line of your code where you want the
breakpoint:

.. code-block:: python

  import pdb; pdb.set_trace()


.. _`Clayton Parker - So you think you can PDB? - PyCon 2015`: https://www.youtube.com/watch?v=P0pIW5tJrRM
.. _pdbpp: https://pypi.python.org/pypi/pdbpp/
