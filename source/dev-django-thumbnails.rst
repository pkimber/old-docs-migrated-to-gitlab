Django Thumbnails
*****************

.. highlight:: python

Requirements::

  requirements/base.txt

  easy-thumbnails
  pillow

For an app::

  example/base.py

  THUMBNAIL_DEBUG = DEBUG
  INSTALLED_APPS = (
      ...
      'django.contrib.staticfiles',
      'easy_thumbnails',

In your templates::

  {% load thumbnail %}
  <img src="{% thumbnail story.picture 100x100 crop %}" />

The easy thumbnail module creates a new image alongside your current image
e.g::

  ls -l media/story/2013/10/18/

  banner.jpg
  banner.jpg.100x100_q85_crop.jpg
