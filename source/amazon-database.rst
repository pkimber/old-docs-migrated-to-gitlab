Amazon Database
***************

From `An Introduction to the AWS Command Line Tool Part 2`_

Security Group
==============

Create a security group for the database::

  aws ec2 create-security-group \
    --group-name db \
    --description "DB Security Group"

Allow access::

  aws ec2 authorize-security-group-ingress \
    --group-name db \
    --source-group db \
    --protocol tcp --port 5432

.. note:: The above rule allows any EC2 instance associated with the ``db``
          security group to access any other EC2 or RDS instance associated
          with the ``db`` security group on tbp port ``5432``.

Create Database
===============

Select one of the secure passwords from the list generated by ``apg``::

  apg -a0 -n10 -m16

Make a note of the ``GroupId`` of your security group::

  aws ec2 describe-security-groups --group-name db

Create the database instance::

  aws rds create-db-instance \
    --db-name kb \
    --db-instance-identifier kb \
    --allocated-storage 5 \
    --db-instance-class db.t1.micro \
    --engine postgres \
    --master-username postgres \
    --master-user-password <password generated with apg> \
    --vpc-security-group-ids <db security group id>

- Replace ``kb`` with the name you want to use for the database.
- Replace ``<password generated with apg>`` with the password generated by
  ``agp``.
- Replace ``<db security group id>`` with the ID of your ``db`` security group.

You can view your database instances::

  aws rds describe-db-instances


.. _`An Introduction to the AWS Command Line Tool Part 2`: http://www.linux.com/news/featured-blogs/206-rene-cunningham/764536-an-introduction-to-the-aws-command-line-tool-part-2
