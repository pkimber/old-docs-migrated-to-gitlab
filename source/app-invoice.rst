invoice
*******

.. highlight:: python

https://github.com/pkimber/invoice

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

PDF
===

To create the PDF for an invoice::

  from invoice.models import Invoice
  from invoice.service import InvoicePrint

  invoice_number = 53

  invoice = Invoice.objects.get(pk=invoice_number)
  invoice.contact.name
  InvoicePrint().create_pdf(invoice, header_image=None)
