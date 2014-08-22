Fabric
******

Clone https://github.com/pkimber/fabric into::

  ~/repo/dev/module/fabric/

Packages
========

Check to make sure the following are **not** installed::

  dpkg -l | grep python-virtualenv
  dpkg -l | grep python-pip
  dpkg -l | grep python-setuptools
  dpkg -l | grep virtualenvwrapper

python 2
--------

Install the following (we need python 2 for ``fabric``)::

  sudo apt-get install python-dev

Download and install ``setuptools``::

  wget https://bitbucket.org/pypa/setuptools/raw/bootstrap/ez_setup.py -O - | sudo python
  sudo easy_install pip
  sudo pip install virtualenv

Virtual Environment
-------------------

To create and activate a virtual environment::

  virtualenv venv-name
  source venv-name/bin/activate
