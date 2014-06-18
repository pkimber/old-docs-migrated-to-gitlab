Search
******

.. note::

  Don't forget to set-up :doc:`app-search`

To update the Haystack index for ``hatherleigh_info``::

  fab site:hatherleigh_info haystack_index

To clear the Haystack index for ``app_name`` on the ``web.server``::

  fab -H web@web.server haystack_index_clear:app_name

**Note**: you will be asked to confirm this command.  For more information see
https://django-haystack.readthedocs.org/en/v2.0.0/management_commands.html#clear-index
