Install
*******

Prerequisites
-------------

::

  sudo apt-get install build-essential
  sudo apt-get install python-m2crypto
  sudo apt-get install sshpass

On OSX

::

  brew install swig
  mkvirtualenv create_cloud_server
  pip install M2Crypto
  brew install https://raw.github.com/eugeneoden/homebrew/eca9de1/Library/Formula/sshpass.rb

Virtual Environment
-------------------

**Note**: Don't forget to use the ``--system-site-packages`` parameter:

::

  mkvirtualenv --system-site-packages create_cloud_server
  pip install -r requirements.txt

Configuration files
-------------------

The configuration files are kept securely and should
**never be copied to GitHub or BitBucket**:

::

  cd /etc/salt/
  sudo ln -s /secure/folder/cloud.profiles .
  sudo ln -s /secure/folder/cloud.providers .
