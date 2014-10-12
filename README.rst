Deploy Django projects using SaltStack
**************************************

To build the documentation::

  pyvenv-3.4 --without-pip venv-sphinx
  source venv-sphinx/bin/activate
  wget https://raw.githubusercontent.com/pypa/pip/master/contrib/get-pip.py
  python get-pip.py

  pip install -r requirements.txt

Build and open the documentation::

  make html && firefox build/html/index.html &

On a mac::

  make html && open -a firefox build/html/index.html

To deploy the site::

  make html
  rsync -av --delete --force --size-only \
    ./build/html/ \
    web@pkimber.net:/home/web/repo/project/pkimber_net/open/
