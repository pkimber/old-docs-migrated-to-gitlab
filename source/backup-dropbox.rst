Backup Dropbox
**************

.. highlight:: bash

.. note:: The Dropbox sync will all take place in the ``~/repo/files`` folder
          to make backup as easy as possible.

.. note:: The method below allows us to sync several Dropbox accounts under one
          user.

Install
=======

Log into your computer as the ``user`` who is running all the backups::

  cd
  # 64 bit
  wget -O - "https://www.dropbox.com/download?plat=lnx.x86_64"| tar xzf -
  # 32 bit "uname -m" == i686
  wget -O - "https://www.dropbox.com/download?plat=lnx.x86"| tar xzf -

This will create a folder containing the ``dropboxd`` daemon:
``~/.dropbox-dist/dropboxd``

Setup
=====

Install the ``dropboxd`` daemon (see above).

Download this shell script, :download:`misc/dropbox-multi-sync.sh` and edit the
list of ``dropboxes``.  This is a space separated list of folder names.  Our
naming convention is:

- ``dropbox-`` because it is!
- The email address for the Dropbox account - replacing ``@`` and ``.`` with
  ``-`` e.g. pat@hatherleigh.info becomes ``pat-hatherleigh-info``.

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
======

When testing the scripts::

  No protocol specified
  !! (Qt:Fatal) QXcbConnection: Could not connect to display :0

To stop this error, use a headless connection i.e. ssh into the computer or use
a separate console.  This will still be an issue if you have a GUI and you
``sudo`` to a user who is *not* running a GUI.


.. _`Run Multiple Instances of Dropbox Simultaneously`: http://www.dropboxwiki.com/tips-and-tricks/run-multiple-instances-of-dropbox-simultaneously-on-linux-or-mac-os-x#On_Ubuntu
