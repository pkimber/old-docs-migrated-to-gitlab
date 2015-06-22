CKEditor
********

.. highlight:: javascript

Configure
=========

To build:

Browse to http://ckeditor.com/download

Choose 'Or let me customise CKEditor' and click 'Customise and Download CKEditor'

Choose the ``Standard`` preset.

Select the following from ``Available plugins``::

  Youtube Plugin

Select ``Moono`` from available skins.

Download the ``Optimized`` version of the CKEditor.

Remove the current ``ckeditor`` folder from the ``base`` app::

  base/static/vendor/js/ckeditor/

Extract the archive to the ``ckeditor`` folder::

  base/static/vendor/js/ckeditor


Config.js configuration
-----------------------

Edit the config.js file (located in the base/static/vendor/js/ckeditor
directory) as follows:

Add plugin for youtube (above the toolbarGroups)::

  config.extraPlugins = 'youtube';

Remove the spellchecker button from the toolbar - the ``editing`` line of
toolbarGroups should look like this::

  { name: 'editing',     groups: [ 'find', 'selection' ] },

The removeButtons line should look like this::

  config.removeButtons = 'About,Anchor,Blockquote,Format,HorizontalRule,Source,Strike,Styles,Subscript,Superscript,Table';

Enable the native browser spellchecker as follows::

  config.disableNativeSpellChecker = false;

Save the file

Usage
=====

Add the following to your form template (probably below the
``{% endblock content %}`` block)::

  {% block script_extra %}
    {{ block.super }}
    {% include 'base/_ckeditor.html' %}
  {% endblock script_extra %}

Any block with an ID of ``id_description`` will become a rich text editor.

To make any other text field into rich text, add ``CKEDITOR.replace`` sections
below the ``include`` section e.g::

  {% block script_extra %}
    {{ block.super }}
    {% include 'base/_ckeditor.html' %}
    <script type="text/javascript">
      CKEDITOR.replace('id_footer_left');
      CKEDITOR.replace('id_footer_right');
    </script>
  {% endblock script_extra %}

If you don't have a text field with the ID of ``id_description``, you can
change the ID e.g::

  {% block script_extra %}
    {% include 'base/_ckeditor.html' with id_textarea='id_notes' %}
    <!-- ...

More limited user ckeditor toolbar
----------------------------------

To create a more limited ckeditor for use by users of your django site include
the ``_ckeditor_user.html`` snippet as follows: ::

  {% block script_extra %}
    {{ block.super }}
    {% include 'base/_ckeditor_user.html' %}
  {% endblock script_extra %}

or alternatively add the following to your template::

  {% load staticfiles %}
  <script src="{% static 'vendor/js/ckeditor/ckeditor.js' %}" type="text/javascript"></script>
  <script type="text/javascript">
    CKEDITOR.replace('id_description',{
      removePlugins : 'elementspath', 
      resize_enabled : false,
      toolbar: [
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
        { name: 'editing', groups: [ 'find', 'selection', ], items: [ 'Find', 'Replace', '-', 'SelectAll' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', '-', 'RemoveFormat' ] },
        { name: 'paragraph', groups: [ 'list', 'indent' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent' ] }
      ]
    });
  </script>


NB either method of including the user template add the configuration from your
config.js but provides a more limited set of options in toolbar e.g. it
restricts the use or links and embeded content etc.

Template
--------

To display the rich text on an HTML template::

  {% autoescape off %}
    {{ c.description }}
  {% endautoescape %}

.. warning:: This by-passes the Django auto-escaping and it therefore a
             security risk.  Don't display user input using this method.
