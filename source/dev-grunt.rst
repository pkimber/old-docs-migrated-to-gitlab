grunt
*****

Install
=======

::

  sudo apt-get install nodejs
  sudo ln -s /usr/bin/nodejs /usr/bin/node

Install ``grunt``::

  sudo npm install -g grunt-cli

Copy :download:`misc/grunt/Gruntfile.js` and
:download:`misc/grunt/package.json` to the root of your project.

Install dependencies in your project folder::

  cd ~/repo/dev/project/hatherleigh_info/
  npm install

Usage
=====

::

  grunt

You can run individual tasks e.g::

  grunt concat
  grunt cssmin
