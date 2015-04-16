invoice
*******

.. highlight:: python

https://github.com/pkimber/invoice

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

Who do I need to invoice::

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
