crm
***

.. highlight:: python

https://github.com/pkimber/crm

Ticket
======

To re-open a complete ticket::

  from crm.models import Ticket
  ticket = Ticket.objects.get(pk=386)
  ticket.complete = None
  ticket.complete_user = None
  ticket.save()
