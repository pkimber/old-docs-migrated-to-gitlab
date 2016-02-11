Adding Angular to Django Project
================================

.. note:: This document is a work in progress!!
          This procedure does not use gulp or grunt as the tsd compiler has
          it's own watch mechanism

After you have created your django project, create a directory for the angular 
part of the project e.g. angular::

    mkdir angular
    cd angular

Within this angular directory create a package.json as follows:: 

  {
    "name": "<NAME OF YOUR APP>",
    "description": "<DESCRIPTION OF YOUR APP>",
    "repository": "<URL OF YOUR PROJECT'S REPOSITORY",
    "version": "1.0.0",
    "scripts": {
      "tsc": "tsc",
      "tsc:w": "tsc -w",
      "lite": "lite-server",
      "start": "concurrent \"npm run tsc:w\" "
    },
    "license": "Apache Software License",
    "dependencies": {
      "zone.js": "0.5.11",
      "angular2": "2.0.0-beta.3",
      "systemjs": "0.19.6",
      "es6-promise": "^3.0.2",
      "es6-shim": "^0.33.3",
      "reflect-metadata": "0.1.2",
      "rxjs": "5.0.0-beta.0"
    },
    "devDependencies": {
      "concurrently": "^1.0.0",
      "lite-server": "^2.0.1",
      "typescript": "^1.7.5"
    }
  }

To use the lite-server (if your app can run independently of the django
project) you can change the start line above as follows, however running your
app via the lite-server makes it more difficult to access rest apis on the
server::

     "start": "concurrent \"npm run tsc:w\" \"npm run lite\" "

Create tsconfig.json as follows::

  {
    "compilerOptions": {
      "target": "es5",
      "module": "system",
      "moduleResolution": "node",
      "outDir": "static/angular/app",
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "removeComments": false,
      "noImplicitAny": false
    },
    "exclude": [
      "node_modules"
    ]
  }

Install the angular tools
-------------------------

If you don't have the node.js / npm tool chain installed you'll need install
it.  To check type::

    node -v
    npm -v

The node version should be higher than v0.10.32
The npm version should be higher than 2.1.8

As node v10 is sufficient, you can probably simply install your distro's
packages e.g.::

    sudo apt-get install nodejs).

It's also worth checking you have the latest npm::

    sudo npm install npm -g

For the latest version of the nodejs tool chain see::

  https://nodejs.org/en/download/package-manager/

The install generates an error if typescript and tsd are only installed as
local dependencies. If you don't have them installed already on your system,
they can be installed as follows::

    npm install -g typescript@^1.7.0
    npm install -g tsd

Now install angular and dependancies::
    
    npm install

Create your static directory for use by django::

    mkdir -p static/angular/jslib
    mkdir -p static/angular/app
    
Copy the modules needed for your project to the jslib directory::

    cp node_modules/es6-shim/es6-shim.min.js static/angular/jslib
    cp node_modules/systemjs/dist/system-polyfills.js static/angular/jslib

    cp node_modules/angular2/bundles/angular2-polyfills.js static/angular/jslib
    cp node_modules/systemjs/dist/system.src.js static/angular/jslib
    cp node_modules/rxjs/bundles/Rx.js static/angular/jslib
    cp node_modules/angular2/bundles/angular2.dev.js static/angular/jslib
    cp node_modules/angular2/bundles/http.dev.js static/angular/jslib

The following are required for development, they should not be included in the
distribution::

    cp node_modules/es6-shim/es6-shim.map static/angular/jslib
    cp node_modules/systemjs/dist/system-polyfills.js static/angular/jslib

Create your angular app directory (e.g. app)::

    mkdir app

Add angular as a django app
---------------------------
Now add the angular directory as an app to django in your django settings file

Create a init file::

    touch __init__.py

Edit settings/base.py add 'angular' to INSTALLED_APPS

Edit setup.py to add 'angular' to the list of packages

Create a section in package_data as follows::

    'angular': [
        'static/*.*',
        'static/angular/app/*.*',
        'static/angular/jslib/*.*',
    ],

Using angular in a project
--------------------------

To enable loading using the django static mechanism need to add the following to
your configuration to the angular entry point document for your application
(e.g. the index.html for your Django Application)

    System.paths["app/*"] = "{% static 'angular' %}/app/*"

Using standard configuration your served template render this::

    System.paths["app/*"] = "/static/angular/app/*"





Useful further reading::
  https://lincolnloop.com/blog/simplifying-your-django-frontend-tasks-grunt/
  http://livereload.com/extensions/
  https://lincolnloop.com/blog/integrating-front-end-tools-your-django-project/
  https://nodejs.org/en/download/package-manager/
  http://chariotsolutions.com/blog/post/angular2-observables-http-separating-services-components/
  http://blog.nknj.me/token-authentication-django-and-angular





Error when running npm install without typscript and tsd installed globally
---------------------------------------------------------------------------

BTW: It does work after this error but best to install error free using the
procedure above

└── UNMET DEPENDENCY zone.js@0.5.11

npm WARN optional Skipping failed optional dependency /chokidar/fsevents:
npm WARN notsup Not compatible with your operating system or architecture: fsevents@1.0.7
npm WARN angular2-quickstart@1.0.0 No description
npm WARN angular2-quickstart@1.0.0 No repository field.
npm ERR! Linux 4.2.0-27-generic
npm ERR! argv "node" "/usr/bin/npm" "install"
npm ERR! node v0.12.7
npm ERR! npm  v3.7.1
npm ERR! file sh
npm ERR! code ELIFECYCLE
npm ERR! errno ENOENT
npm ERR! syscall spawn

npm ERR! zone.js@0.5.11 postinstall: `tsd install`
npm ERR! spawn ENOENT
npm ERR! 
npm ERR! Failed at the zone.js@0.5.11 postinstall script 'tsd install'.
npm ERR! Make sure you have the latest version of node.js and npm installed.
npm ERR! If you do, this is most likely a problem with the zone.js package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!     tsd install
npm ERR! You can get information on how to open an issue for this project with:
npm ERR!     npm bugs zone.js
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!     npm owner ls zone.js
npm ERR! There is likely additional logging output above.

npm ERR! Please include the following file with any support request:
npm ERR!     /home/user/repo/dev/project/project-name/angular/npm-debug.log




