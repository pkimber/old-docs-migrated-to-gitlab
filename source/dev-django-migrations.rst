Django Migrations
*****************

.. highlight:: python

Workflow
========

Create an automatic migration:

.. code-block:: bash

  django-admin.py makemigrations yourappname

Create a data migration:

.. code-block:: bash

  django-admin.py makemigrations --empty yourappname

Run:

.. code-block:: bash

  django-admin.py migrate

Default Value for Foreign Keys
==============================

To set-up default states for foreign keys...

Create a ``default`` function e.g::

  def default_payment_state():
      return PaymentState.objects.get(slug=PaymentState.DUE).pk

.. warning:: This function **must** return an integer (the primary key) or it
             won't work with migrations.

Then... follow one of two strategies...

1) Create All Models
--------------------

Create all the models without defaults - then add the defaults later.

Create your models and allow the foreign key to be set to ``null`` e.g::

  class Payment(TimeStampedModel):
      state = models.ForeignKey(
          PaymentState,
          #default=default_payment_state,
          blank=True,
          null=True
      )

Create the migrations for all your models

.. _django_migrations_defaults:

Create a data migration and use it to set-up the defaults for your state model
e.g::

  def _init_state(model, name, slug):
      try:
          model.objects.get(slug=slug)
      except model.DoesNotExist:
          instance = model(**dict(name=name, slug=slug))
          instance.save()
          instance.full_clean()

  def default_state(apps, schema_editor):
      PaymentState = apps.get_model('pay', 'PaymentState')
      _init_state(PaymentState, 'Due', 'due')
      _init_state(PaymentState, 'Paid', 'paid')

  class Migration(migrations.Migration):
      dependencies = [
      ]
      operations = [
          migrations.RunPython(default_state),
      ]

Set the foreign key so it has a default and no longer accepts ``null`` e.g::

  class Payment(TimeStampedModel):
      state = models.ForeignKey(
          PaymentState,
          default=default_payment_state,
          #blank=True,
          #null=True
      )

Update the migrations so the default value is set.

2) Lookup Model First
---------------------

Create the lookup model - then add the dependant models later

This strategy is simple and logical, but isn't suitable if you are moving from
South and creating the first migration.  To move from South, all current models
need to be in the ``0001_initial.py`` file.

Create the model which will contain the default value (don't create the model
which depends on it) e.g::

  class PaymentState(TimeStampedModel):
      DUE = 'due'
      name = models.CharField(max_length=100)
      slug = models.SlugField(unique=True)

Create migrations for this model

Create a data migration and use it to set-up the defaults for your state model
(e.g. django_migrations_defaults_ from the example above).

Create the model which uses the foreign key e.g::

  class Payment(TimeStampedModel):
      state = models.ForeignKey(PaymentState, default=default_payment_state)

Create the migration for this model
