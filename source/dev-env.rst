Development Environment
***********************

Packages
========

python 2
--------

::

  sudo apt-get install python-dev

python 3
--------

::

  sudo apt-get install python3-dev

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
