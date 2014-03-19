CKEditor
********

To build:

Browse to http://ckeditor.com/builder

Choose the ``Basic`` preset.

Select the following from ``Available plugins``::

  Image
  Paste from Word
  Paste As Plain Text
  Youtube Plugin

Select ``Moono`` from available skins.

Download the ``Optimized`` version of the CKEditor.

Remove the current ``ckeditor`` folder from the ``base`` app::

  base/static/base/js/ckeditor/

Extract the archive to the ``ckeditor`` folder::

  base/static/base/js/ckeditor
