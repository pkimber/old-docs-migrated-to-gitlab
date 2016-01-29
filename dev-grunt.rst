26/08/2105
==========

This repo is a folder inside a bootstrap development environment... In other
words it represents a single theme where the same parent folder might contain
other themes (2 for Agbag for instance.

Since the bootswatch and bootstrap files in this parent folder are never edited
(by me) and because it means we only have to keep 1 version of the latest
version of Bootstrap up to date - it makes sense to do it set it up with way.
Setting up this environment for bootswatch is decribed in the readme file at
the repo.

So that's the problem. If I add the theme for Kach.less into the Kach_couk repo
- can it be checked out into a folder outside of the project folder? Can you
add and track files outside of the root git folder? 

Perhaps it would be better to chat about this.


27/08/2015
==========

Grunt.
https://nodejs.org
http://gruntjs.com

See the above links to install both node and grunt. I install them globally and
so can use them in all projects. The instructions to install and setup from the
links above are easy to follow.

I've attached the 2 grunt javascript task runner files.

When running the 'npm' (node package manager) and 'grunt', you need to be in
the project root folder, this is where the Gruntfile.js and package.json files
live (same location as README.rst, setup.py)

I have setup the attached files based upon your hatherleighcommunitycentre_couk project with an example of how to define the apps resource folder locations. I've also added basic remarks on each task block.

I have cloned your project locally where I have created the grunt files but have not pushed the additions instead decided to send these additions/notes via email instead.

Basic install and run flow is as follows...
Install node.js
Install grunt

Place the 2 attached files in your projects root folder.
To install the defined grunt packages in package.json...
cd into project root folder and run 'npm install'
this will download and install the dependencies into 'node_modules' folder

Run 'grunt' from project root in its own terminal, grunt will then watch for
changes and build resources.
I've set the Gruntfile up to do this, you can change the
grunt.registerTask('default', ['watch']); to register and run which processes
you like.

You can run each defined process individually with 'grunt concat' or
'grunt cssmin' etc
You do not what to version control the installed node modules in 'node_modules'
folder and so add 'node_modules' to your .gitignore
