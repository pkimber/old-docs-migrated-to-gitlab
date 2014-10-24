Backup
******

Links
=====

`How To Use Duplicity with GPG to Securely Automate Backups on Ubuntu`_

`How-To: Import/Export GPG Key Pair`_

`Setting up Duplicity with GnuPG`_

Strategy (draft)
================

http://duplicity.nongnu.org/duplicity.1.html

Using the following commands::

  remove-all-but-n-full
  remove-all-inc-of-but-n-full

We will run one backup which does weekly full, daily incremental, deleting full
backups over 4 weeks, and incremental over 7 days.

We will run another (separate) monthly full backup which is deleted after 3
months.

For database backups::

  # put the database backups into a 'backup' folder on the cloud server e.g.
  /home/web/repo/backup/pkimber_net/20141024_1700.sql
  /home/web/repo/backup/hatherleigh_info/20141024_1704.sql

  # cron task will remove the previous days backups after making todays e.g.
  rm /home/web/repo/backup/pkimber_net/20141023_1600.sql
  rm /home/web/repo/backup/hatherleigh_info/20141023_1604.sql

  # duplicity will back this up to rsync.net
  duplicity full --encrypt-key="ABCD0001" \
    scp://123@tv-s009.rsync.net/pkimber_net/backup \
    /home/web/repo/backup/pkimber_net
  duplicity full --encrypt-key="ABCD0001" \
    scp://123@tv-s009.rsync.net/hatherleigh_info/backup \
    /home/web/repo/backup/hatherleigh_info

  # duplicity will verify the backup
  duplicity verify --encrypt-key="ABCD0001" \
    scp://123@tv-s009.rsync.net/pkimber_net/backup \
    /home/web/repo/backup/pkimber_net
  duplicity verify --encrypt-key="ABCD0001" \
    scp://123@tv-s009.rsync.net/hatherleigh_info/backup \
    /home/web/repo/backup/hatherleigh_info

Getting Started
===============

Using http://rsync.net/ for backups...

To use SSH keys rather than passwords for login, create your key and then
upload it to ``rsync.net`` using this command::

  scp ~/.ssh/id_rsa.pub 123@tv-s009.rsync.net:.ssh/authorized_keys

.. warning:: Only use this command for the first key.  For more keys, use the
             following command:

To append SSH keys::

  cat ~/.ssh/id_rsa.pub | ssh 123@tv-s009.rsync.net \
    'dd of=.ssh/authorized_keys oflag=append conv=notrunc'

We will use ``Duplicity`` for backups.  To create a GPG key::

  gpg --gen-key

**Put the private key on the server so we can verify**

To export the *public* key::

  gpg --list-keys
  gpg --output key.gpg --armor --export ABCDFE01

  # copy the key to your web server
  scp key.gpg user@remote:~/

  # log into the remote host and import the key
  ssh user@remote
  gpg --import ~/key.gpg
  gpg --list-keys

  # mark the key as trusted
  gpg --edit-key [key]
  > trust
  # decide how much to trust it. duplicity requires 'ultimate'
  > save


.. _`How To Use Duplicity with GPG to Securely Automate Backups on Ubuntu`: https://www.digitalocean.com/community/tutorials/how-to-use-duplicity-with-gpg-to-securely-automate-backups-on-ubuntu
.. _`How-To: Import/Export GPG Key Pair`: http://www.debuntu.org/how-to-importexport-gpg-key-pair/
.. _`Setting up Duplicity with GnuPG`: http://codegouge.blogspot.co.uk/2012/01/setting-up-duplicity-with-gnupg.html
