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

.. note:: If the file is empty (0 bytes), then log into the supervisor console
          (``supervisorctl``) and check the status of the process.  If you see
          this message,
          ``can't find command '/home/web/.dropbox-dist/dropboxd'``
          then DropBox was probably installed after the supervisor script was
          created.  Just re-start the process to resolve this issue.

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

To initialise the backup run the backup script with the ``full`` argument e.g::

  /home/web/opt/backup_dropbox_pat_hatherleigh_info.sh full

Restore
=======

To restore a document or folder, follow the example commands in
:ref:`duplicity_command_examples`.

.. _rsync_usage:

Usage
=====

.. note:: For the following, refer to your company :doc:`checklist` and replace
          ``123@tv-s009.rsync.net`` with your rsync.net Host address.

To check the rsync.net usage (by domain), create a script for in your ``~/bin``
as follows.  At your command prompt type the following::

  gedit ~/bin/rsync-usage

Then type or paste the following 2 lines  (Please note: the backslash before
the asterisk is important::


  #!/bin/bash
  ssh 123@tv-s009.rsync.net du -sh \*

Save the file and close gedit. Then type the following at your command prompt::

  chmod 755 ~/bin/rsync-usage

Now to get the analysis of usage on our rsync account, you can type::

  rsync-usage


.. _`Headless Dropbox`: http://rkulla.blogspot.co.uk/2014/03/headless-dropbox.html
.. _`Run Multiple Instances of Dropbox Simultaneously`: http://www.dropboxwiki.com/tips-and-tricks/run-multiple-instances-of-dropbox-simultaneously-on-linux-or-mac-os-x#On_Ubuntu
.. _`Setup headless Dropbox sync client on linux`: http://www.jamescoyle.net/how-to/1147-setup-headless-dropbox-sync-client
.. _init_script_1: https://gist.github.com/ThomasHobbes92/ed083e7f503a43b881ab
.. _init_script_2: https://gist.githubusercontent.com/benhedrington//2347727/raw/108fc8af551cb4fdf7cdd08b891a45f405d283dc/dropbox
