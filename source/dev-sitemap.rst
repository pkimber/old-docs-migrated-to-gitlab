SiteMap
*******

.. highlight:: python

::

  # project/urls.py
  from django.contrib.sitemaps import GenericSitemap

  from block.models import Page

  info_dict = {
    'queryset': Page.objects.pages(),
    'date_field': 'modified',
  }

  sitemaps = {
      'block': GenericSitemap(info_dict, priority=0.5, changefreq='monthly'),
  }

  urlpatterns = patterns(
      '',
      url(regex=r'^sitemap\.xml$',
          view='django.contrib.sitemaps.views.sitemap',
          kwargs={'sitemaps': sitemaps},
      ),

  # settings/base.py
  DJANGO_APPS = (
      # ...
      'django.contrib.sitemaps',
  )
