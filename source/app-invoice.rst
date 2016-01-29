invoice
*******

.. highlight:: python

https://github.com/pkimber/invoice

Plan
====

I am trying to use the ``VatCode`` model in the ``invoice`` app, but we have a
problem with the ``Contact`` record in the ``crm``.  The ``job`` app uses
``settings.CONTACT_MODEL``, and the ``crm`` app has it's own ``Contact``.

  I think the proper solution is to move ``Contact`` from the ``crm`` app and
  put it into a ``contact`` app.

  Move ``TimeRecord`` from ``invoice`` to ``crm``.

  Update the invoice routines so they can invoice a *generic* line type.  One
  of these types would be ``TimeRecord``.

  Create a new ``account`` app.  Move ``VatCode`` into this ``account`` app.

  At a later date, move the code from ``invoice`` and ``pay`` into the
  ``account`` app.

Credit Note
===========

To create a credit note, list invoices for a contact, click *Create draft
invoice (without time records)*, enter the date for the credit note.  Click
*Add line*, enter a **negative quantity** and a *positive price*.

.. warning:: It is **not** possible to mix invoice and credit lines on one
             document.  If you want to credit a customer, then create a
             separate credit note.

Date
====

To create an invoice for a particular date (the ``slug`` is for the contact)::

  from datetime import date
  from crm.models import Contact
  from django.contrib.auth.models import User
  from invoice.service import InvoiceCreate

  invoice_date = date(2013, 12, 31)
  slug = 'kb'
  user_name = 'patrick.kimber'

  invoice_create = InvoiceCreate()
  contact = Contact.objects.get(slug=slug)
  user = User.objects.get(username=user_name)
  invoice_create.create(user, contact, invoice_date)

To create the invoice PDF, follow the *PDF* instructions below...

Outstanding
===========

Who do I need to invoice (run from project folder using ``django-admin shell``)::

  from invoice.models import TimeRecord
  qs = TimeRecord.objects.filter(invoice_line__isnull=True, billable=True).order_by('ticket__contact__slug').distinct('ticket__contact__slug')
  for t in qs: print(t.ticket.contact.slug)

How much time have I spent on a ticket::

  # edit the ticket numbers in the source code
  django-admin.py ticket_time_csv

PDF
===

To create the PDF for an invoice::

  from invoice.models import Invoice
  from invoice.service import InvoicePrint

  invoice_number = 53

  invoice = Invoice.objects.get(pk=invoice_number)
  invoice.contact.name
  invoice.pdf = None
  InvoicePrint().create_pdf(invoice, header_image=None)

Ticket Time
===========

This is a temporary management command which will download all the time records
for a list of tickets.

To use this command, start by restoring a backup of the data for your site.

Then edit the source code for the management command::

  ~/repo/dev/app/invoice/invoice/management/commands/ticket_time_csv.py

Update the list of numbers to include the tickets you want in your CSV file::

  tickets = (
    732,

Run the management command::

  django-admin.py ticket_time_csv
