Rackspace
*********

To create a server called ``web.temp.server`` on Rackspace:

::

  sudo ~/.virtualenvs/create_cloud_server/bin/python \
    ~/.virtualenvs/create_cloud_server/bin/salt-cloud \
    -p openstack_512 \
    web.temp.server

On the Mac...

::

  sudo ~/.Virtualenvs/create_cloud_server/bin/python \
    ~/.Virtualenvs/create_cloud_server/bin/salt-cloud \
    --profiles=/from/secret/wiki/source/sys/misc/salt-cloud/cloud.profiles \
    --providers-config=/from/secret/wiki/source/sys/misc/salt-cloud/cloud.providers \
    --profile=openstack_512 \
    web.temp.server
