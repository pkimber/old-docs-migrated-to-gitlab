Development Environment
***********************

.. note:: For Ubuntu 14.04 LTS

.bashrc
=======

::

  export PIP_DOWNLOAD_CACHE=$HOME/.pip_download_cache
  export PIP_RESPECT_VIRTUALENV=true
  # Uncomment - causes problems with pip and jython 2.5.2
  export PIP_USE_MIRRORS=false

::

  git clone git://github.com/kennethreitz/autoenv.git ~/.autoenv
  echo 'source ~/.autoenv/activate.sh' >> ~/.bashrc

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

python 3
--------

Install the following::

  sudo apt-get install python3-dev

The following packages are needed for ``pillow``::

  sudo apt-get install libtiff4-dev libjpeg8-dev zlib1g-dev \
    libfreetype6-dev liblcms2-dev libwebp-dev tcl8.5-dev tk8.5-dev python-tk

The following package is needed for SOLR/Haystack::

  sudo apt-get install libxslt1-dev

python Virtual Environment
==========================

python 2
--------

To create and activate a virtual environment::

  virtualenv venv-name
  source venv-name/bin/activate

python 3
--------

To create a virtual environment::

  pyvenv-3.4 --without-pip venv-name
  source venv-name/bin/activate
  wget https://raw.githubusercontent.com/pypa/pip/master/contrib/get-pip.py
  python get-pip.py

To activate a virtual environment::

  source venv-name/bin/activate
