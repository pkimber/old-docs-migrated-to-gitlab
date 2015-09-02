CodeMirror Editor
*****************

.. highlight:: html

Usage
=====

Add the following to your form template (probably below the
``{% endblock content %}`` block)::

  {% block script_extra %}
    {{ block.super }}
    {% include 'base/_codemirror.html' %}
  {% endblock script_extra %}

Any element with an ID of ``id_code`` will become a code editor.

Example
-------

- `Example Template`_
- `Example View`_


.. _`Example Template`: https://github.com/pkimber/compose/blob/master/example_compose/templates/example/dash.html
.. _`Example View`: https://github.com/pkimber/compose/blob/master/example_compose/views.py
