Backup Dropbox
**************

.. highlight:: bash

To set-up a server for backing up DropBox accounts.

Set-up your gpg keys (see :ref:`backup_cloud_server_gpg`).

Create a pillar file listing the name of the accounts you want to backup e.g.
``sites/dropbox.sls``::

  dropbox:
    accounts:
      - pat_hatherleigh_info
      - web_pkimber_net

.. hint:: Our standard for the names is to take the email address of the
          Dropbox account and replace ``@`` and ``.`` with ``_``
          e.g. pat@hatherleigh.info becomes ``pat_hatherleigh_info``.

Include this ``sls`` file into the ``top.sls`` file for your server e.g::

  'dropbox':
    - global.gpg
    - global.users
    - sites.dropbox

Apply the salt states to your server.  This will create folders, backup
scripts, cron and supervisor tasks for each account e.g::

  /home/web/repo/files/dropbox/pat_hatherleigh_info
  /home/web/opt/backup_dropbox_pat_hatherleigh_info.sh
  /etc/cron.d/dropbox
  /etc/supervisor/conf.d/dropbox_pat_hatherleigh_info

Initialise
==========

Each Dropbox account will need to be initialised.  Log into your server::

  sudo -i

Find the log file for the supervisor task for your account::

  ls -l /var/log/supervisor/

Follow the file e.g::

  tail -f /var/log/supervisor/dropbox_pat_hatherleigh_infok-stdout---supervisor-NI0cjP.log

  # sample output
  This computer isn't linked to any Dropbox account...
  Please visit https://www.dropbox.com/cli_link_nonce?nonce=f123abc123abc123abc123abc123abc1 to link this device.

Open a private (or incognito session) in a browser .  Log into the DropBox
account you want to sync and paste in the URL.

The script will tell you that the account is linked e.g::

  This computer is now linked to Dropbox. Welcome Pat

To check the sync, look in the following folder (update folder names as
required)::

  sudo -i -u web
  ls -l /home/web/repo/files/dropbox/pat_hatherleigh_info/Dropbox/

WIP
===

Links
-----

- `Headless Dropbox`_
- `Run Multiple Instances of Dropbox Simultaneously`_
- `Setup headless Dropbox sync client on linux`_
- init_script_1_
- init_script_2_

.. note:: The Dropbox sync will all take place in the ``~/repo/files`` folder
          to make backup as easy as possible.

.. note:: The method below allows us to sync several Dropbox accounts under one
          user.

Install
-------

Log into your computer as the ``user`` who is running all the backups::

  cd
  # 64 bit
  wget -O - "https://www.dropbox.com/download?plat=lnx.x86_64"| tar xzf -
  # 32 bit "uname -m" == i686
  wget -O - "https://www.dropbox.com/download?plat=lnx.x86"| tar xzf -

This will create a folder containing the ``dropboxd`` daemon:
``~/.dropbox-dist/dropboxd``

Setup
-----

Install the ``dropboxd`` daemon (see above).

Download this shell script, :download:`misc/dropbox-multi-sync.sh` and edit the
list of ``dropboxes``.  This is a space separated list of folder names.  Our
naming convention is:

- ``dropbox-`` because it is!
- The email address for the Dropbox account - replacing ``@`` and ``.`` with
  ``_`` e.g. pat@hatherleigh.info becomes ``pat_hatherleigh_info``.

Run the ``dropbox-multi-sync.sh`` script e.g::

  sh ./dropbox-multi-sync.sh
  # sample output
  This computer isn't linked to any Dropbox account...
  Please visit https://www.dropbox.com/cli_link_nonce?nonce=f123abc123abc123abc123abc123abc1 to link this device.

Open a private (or incognito session) in a browser .  Log into the DropBox
account you want to sync and paste in the URL.

The script will tell you that the account is linked e.g::

  This computer is now linked to Dropbox. Welcome Pat

To check the sync, look in the following folder (update folder names as
required)::

  ~/repo/files/dropbox-pat-hatherleigh-info/Dropbox/

Issues
------

When testing the scripts::

  No protocol specified
  !! (Qt:Fatal) QXcbConnection: Could not connect to display :0

To stop this error, use a headless connection i.e. ssh into the computer or use
a separate console.  This will still be an issue if you have a GUI and you
``sudo`` to a user who is *not* running a GUI.


.. _`Headless Dropbox`: http://rkulla.blogspot.co.uk/2014/03/headless-dropbox.html
.. _`Run Multiple Instances of Dropbox Simultaneously`: http://www.dropboxwiki.com/tips-and-tricks/run-multiple-instances-of-dropbox-simultaneously-on-linux-or-mac-os-x#On_Ubuntu
.. _`Setup headless Dropbox sync client on linux`: http://www.jamescoyle.net/how-to/1147-setup-headless-dropbox-sync-client
.. _init_script_1: https://gist.github.com/ThomasHobbes92/ed083e7f503a43b881ab
.. _init_script_2: https://gist.githubusercontent.com/benhedrington//2347727/raw/108fc8af551cb4fdf7cdd08b891a45f405d283dc/dropbox
