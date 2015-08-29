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

Install Default Template::

  cd ~/repo/dev/module/
  git clone git@bitbucket.org:timbushell/kb-grunt-templates.git 


Usage
=====

Install template-from-foldername-name (e.g. grunt-kbsoftware-projects) in your project folder::

  cd ~/repo/dev/project/hatherleigh_info/
  grunt-init ~/repo/dev/module/kb-grunt-templates/grunt-kbsoftware-projects --force  
  npm install --save bootstrap
  npm install
  
  
Add "node_modules" to .gitignore


Run grunt::

  grunt


You can run individual tasks e.g ::

  grunt less  #converts less2css grunt without also watch
  grunt watch  #don't immediately less2css until "theme" less files being watched change
  
Edit Gruntfile.js to add more tasks  

