Social
******

.. highlight:: html

Facebook
========

Add the following to your form template (probably below the
``{% endblock content %}`` block)::

  {% block script_extra %}
    {{ block.super }}
    {% include 'base/_facebook.html' %}
  {% endblock script_extra %}

Browse to the Facebook Social Plugins, `Like Box`_ page:

  Replace the *Facebook Page URL* with the URL of your Facebook page.

  Tick *Show Posts*

  Modify the other settings as required.

Click the *Get Code* button:

  Put the second bit of code (where it starts with
  ``<div class="fb-like-box"``) into your template where you want the feed to
  appear.


.. _`Like Box`: https://developers.facebook.com/docs/plugins/like-box-for-pages
