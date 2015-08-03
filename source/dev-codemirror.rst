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


.. _`Example Template`: https://github.com/pkimber/cms/blob/975-try-code-mirror/example_cms/templates/example/dash.html
.. _`Example View`: https://github.com/pkimber/cms/blob/975-try-code-mirror/example_cms/views.py
