grunt
*****

Install
=======

::

  sudo apt-get install nodejs
  sudo ln -s /usr/bin/nodejs /usr/bin/node

Install ``grunt``::

  sudo npm install -g grunt-cli
  sudo npm install -g grunt-init

Copy :download:`misc/grunt/Gruntfile.js` and
:download:`misc/grunt/package.json` to the root of your project.

Install dependencies in your project folder::

  cd ~/repo/dev/project/hatherleigh_info/
  npm install

Template::

  cd ~/repo/dev/module/
  git clone git@bitbucket.org:timbushell/kb-grunt-templates.git grunt-templates

Usage
=====


::

  grunt

You can run individual tasks e.g::

  grunt concat
  grunt cssmin
