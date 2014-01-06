Rackspace
*********

To create a server called ``web.temp.server`` on Rackspace:

::

  sudo ~/.virtualenvs/create_cloud_server/bin/python \
    ~/.virtualenvs/create_cloud_server/bin/salt-cloud \
    -p openstack_512 \
    web.temp.server

On the Mac we need to use the full path including the username...
(replacing 'username' and 'path_to_cloud_profiles' respectively)

::

  sudo /Users/username/.Virtualenvs/create_cloud_server/bin/python \
    /Users/username/.Virtualenvs/create_cloud_server/bin/salt-cloud \
    --profiles=/Users/username/path_to_cloud_profiles/salt-cloud/cloud.profiles \
    --providers-config=/Users/username/path_to_cloud_profiles/salt/cloud/cloud.providers \
    --profile=openstack_512 \
    web.temp.server
