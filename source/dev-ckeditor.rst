CKEditor
********

.. highlight:: javascript

Configure
=========

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

Usage
=====

Add the following to your form template (probably below the
``{% endblock content %}`` block)::

  {% block script_extra %}
    {% include 'base/_ckeditor.html' %}
  {% endblock script_extra %}

Any block with an ID of ``id_description`` will become a rich text editor.

To make any other text field into rich text, add ``CKEDITOR.replace`` sections
below the ``include`` section e.g::

  {% block script_extra %}
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


Template
--------

To display the rich text on an HTML template::

  {% autoescape off %}
    {{ c.description }}
  {% endautoescape %}

.. warning:: This by-passes the Django auto-escaping and it therefore a
             security risk.  Don't display user input using this method.
