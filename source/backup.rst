Backup
******

.. highlight:: bash

We are Using http://rsync.net/ for backups.  The process below can easily be
adapted for use with any linux based storage system because we use Duplicity,
ssh keys and gpg for encryption.

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

What can we do?
---------------

Delete *all* backups older than *x* days (weeks or months)

Remove *all* backups older than *count* full backups

Remove all incrementals older than *count* full backups

::

  F   1st Sept
  I
  I
  F   15th Sept
  I
  I
  F   1st Oct
  I

Getting Started
===============

Install Duplicity::

  sudo apt-get install duplicity python-paramiko

You will receive your account details from rsync.net.  Please refer to the
:doc:`checklist` and fill in your own details.

SSH Key
-------

Create an SSH key on your laptop::

  ssh-keygen -t rsa

.. note:: Do not enter a password here.

Upload your key to the rsync.net server::

  cat ~/.ssh/id_rsa.pub | ssh 123@usw-s001.rsync.net 'dd of=.ssh/authorized_keys oflag=append conv=notrunc'

If you are setting up the rsync.net server for the *first time ever*:

.. danger:: Do not run the following command unless you are the first person
            (or computer) to use this rsync.net server.  If you upload another
            key using this command, they will overwrite the first key.

::

  scp ~/.ssh/id_rsa.pub 123@usw-s001.rsync.net:.ssh/authorized_keys

Test your ssh login to the server::

  ssh 123@usw-s001.rsync.net ls

These instructions are copied from `Generating SSH Keys for Automated Backups`_
(up to and including *Testing Your Passwordless Login*).

GPG Key
-------

To encrypt the backups we need a gpg key.  This key will be shared with all the
web servers and with any laptops which need to decrypt (and restore) the data.

To create the gpg key::

  gpg --gen-key

  # defaults...
  Please select what kind of key you want:
  (1) RSA and RSA (default)
  RSA keys may be between 1024 and 4096 bits long.
  What keysize do you want? (2048)
  Please specify how long the key should be valid.
  0 = key does not expire
  You need a Passphrase to protect your secret key.

Accept the defaults (as above) and enter a passphrase for your gpg key.

List the keys, and make a note of the key number (in this example, the key is
``ABCD1234``)::

  gpg --list-keys
  # --------------------------------
  # pub   2048R/ABCD1234 2014-10-30

Export the public and private keys and add them to your pillar::

  cd ~/repo/dev/module/deploy/pillar/
  gpg --armor --export ABCD1234 >> global/gpg.sls
  gpg --armor --export-secret-key ABCD1234 >> global/gpg.sls

Edit the ``global/gpg.sls`` file so it is in the following format e.g:

.. code-block:: yaml

  gpg:
    rsync.net:
      user: 123
      server: usw-s001.rsync.net
      key: ABCD1234
      public: |
        -----BEGIN PGP PUBLIC KEY BLOCK-----
        Version: GnuPG v1

        ABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCA
        -----END PGP PUBLIC KEY BLOCK-----
      private: |
        -----BEGIN PGP PRIVATE KEY BLOCK-----
        Version: GnuPG v1

        ABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCA
        -----END PGP PRIVATE KEY BLOCK-----

.. tip:: Multiline strings in YAML files are started with the ``|`` character
         and are indented two characters.

To enable backups for a server, add the following to the pillar config for your
server e.g:

.. code-block:: yaml

  # top.sls
  'test-a':
    - global.gpg

.. _backup_cloud_server_gpg:

Cloud Server
------------

Log into the Salt master and update your cloud server.  Salt will do the
following tasks:

- create an ``ssh`` key
- copy the GPG keys to the ``~/repo/temp/`` folder.
- create a backup script for each site on the server
- create a cron script for each site on the server

Add the ``ssh`` keys to the rsync.net server::

  ssh server
  sudo -i -u web
  cat ~/.ssh/id_rsa.pub | ssh 123@usw-s001.rsync.net \
    'dd of=.ssh/authorized_keys oflag=append conv=notrunc'
  # enter your rsync.net password

Check that you can connect to the rsync.net server without a password::

   ssh 123@usw-s001.rsync.net ls -la

Import the GPG keys::

  ssh server
  sudo -i -u web
  gpg --import ~/repo/temp/pub.gpg
  gpg --allow-secret-key-import --import ~/repo/temp/sec.gpg

List the keys, and then mark the rsync.net key as trusted::

  gpg --list-keys
  gpg --edit-key ABCD1234
  > trust
  # Select option 5 = I trust ultimately
  > q

Do an initial ``full`` backup.  The Salt states will create a backup script in
the ``/home/web/opt/`` folder
e.g:: ``/home/web/opt/backup_hatherleigh_info.sh``.

To initialise the backup run the script with the ``full`` argument e.g::

  /home/web/opt/backup_hatherleigh_info.sh full

Restore
-------

:doc:`restore`

.. _duplicity_command_examples:

Duplicity
---------

To list the files on ``rsync.net``::

  # database backup (and any files in the backup folder)
  ssh 123@usw-s001.rsync.net ls -la hatherleigh_info/backup
  # files backup
  ssh 123@usw-s001.rsync.net ls -la hatherleigh_info/files

To list backup dates::

  duplicity collection-status ssh://123@usw-s001.rsync.net/hatherleigh_info/backup

To list the backups::

  duplicity list-current-files ssh://123@usw-s001.rsync.net/hatherleigh_info/backup
  duplicity list-current-files ssh://123@usw-s001.rsync.net/hatherleigh_info/files

Duplicity makes restoring easy. You can restore by simply reversing the remote
and local parameters.

.. note:: You will probably see ``Operation not permitted`` errors.  This is
          Duplicity attempting to restore owner and group permissions on the
          files.

To restore a folder::

  PASSPHRASE="gpg-password" \
    duplicity \
    --file-to-restore \
    "path/to/folder/" \
    ssh://123@usw-s001.rsync.net/hatherleigh_info/files \
    /path/to/restore/folder/

.. note:: When restoring a folder, ``/path/to/restore/folder/`` must not exist.
          It will be created by Duplicity.

To restore a single file (in this example we are restoring from a ``Dropbox``
backup)::

  PASSPHRASE="gpg-password" \
    duplicity \
    --file-to-restore \
    "Dropbox/Contact/Cycle Policy.docx" \
    ssh://123@usw-s001.rsync.net/dropbox/web_hatherleigh_info/files \
    "/path/to/restore/Cycle Policy.docx"

.. note:: When restoring a single file, ``/path/to/restore/policy.docx`` is the
          file name **NOT** the folder name.


.. _`Generating SSH Keys for Automated Backups`: http://www.rsync.net/resources/howto/ssh_keys.html
.. _`How To Use Duplicity with GPG to Securely Automate Backups on Ubuntu`: https://www.digitalocean.com/community/tutorials/how-to-use-duplicity-with-gpg-to-securely-automate-backups-on-ubuntu
.. _`How-To: Import/Export GPG Key Pair`: http://www.debuntu.org/how-to-importexport-gpg-key-pair/
.. _`Setting up Duplicity with GnuPG`: http://codegouge.blogspot.co.uk/2012/01/setting-up-duplicity-with-gnupg.html
