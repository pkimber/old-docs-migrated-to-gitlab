Django Thumbnails
*****************

.. highlight:: python

Requirements:

.. code-block:: text

  requirements/base.txt

  easy-thumbnails
  pillow

For an app::

  # example/base.py

  THUMBNAIL_DEBUG = DEBUG
  INSTALLED_APPS = (
      ...
      'django.contrib.staticfiles',
      'easy_thumbnails',

For a project::

  # settings/production.py
  THUMBNAIL_DEBUG = DEBUG

  # settings/local.py
  THUMBNAIL_DEBUG = DEBUG

  # settings/base.py
  DJANGO_APPS = (
      ...
      'django.contrib.staticfiles',

  THIRD_PARTY_APPS = (
      ...
      'easy_thumbnails',

In your templates:

.. code-block:: html

  {% load thumbnail %}
  <img src="{% thumbnail story.picture 100x100 crop %}" />

The easy thumbnail module creates a new image alongside your current image
e.g:

.. code-block:: bash

  ls -l media/story/2013/10/18/

  banner.jpg
  banner.jpg.100x100_q85_crop.jpg

Issues
======

If you are having trouble with the thumbnail template tag and you don't know
what is causing the problem, then start by replacing the ``thumbnail`` tag
with the ``MEDIA_URL`` and path e.g:

.. code-block:: html

  <!-- replace -->
  <img src="{% thumbnail c.picture 541x326 %}">

  <!-- with -->
  <img src="{{ MEDIA_URL }}{{ c.picture }}">
