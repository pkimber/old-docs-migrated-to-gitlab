login
*****

.. highlight:: python

https://github.com/pkimber/login

Password Reset
==============

When a user (or non-user) attemps to reset their password, the ``Notify`` users
are emailed.  For logic, see:
https://github.com/pkimber/login/blob/master/login/forms.py

I think this is a potential risk for a DOS attack.  If we get a DOS attack
then we could use the ``PasswordResetAudit`` model to limit the number of
notification emails we send:
https://github.com/pkimber/login/blob/master/login/models.py

To see an audit of password reset attempts, browse to
``/accounts/password/reset/audit/report/``

Register
========

If you want to allow users to register on your site, add the following to
``urls.py``::

  from login.views import RegisterCreateView

  url(regex=r'^accounts/register/$',
      view=RegisterCreateView.as_view(),
      name='register'
      ),

Staff
=====

If you want a member of staff to be able to update user names and passwords for
other users:

Create a couple of views in ``views.py``.  This will allow you to set the
success URL for your project::

  from login.views import (
      UpdateUserNameView,
      UpdateUserPasswordView,
  )

  class MyUpdateUserNameView(UpdateUserNameView):

      def get_success_url(self):
          return reverse('example.test')

  class MyUpdateUserPasswordView(UpdateUserPasswordView):

      def get_success_url(self):
          return reverse('example.test')

Add the views to ``urls.py``::

  from .views import (
      MyUpdateUserNameView,
      MyUpdateUserPasswordView,
  )

  url(regex=r'^accounts/user/(?P<pk>\d+)/username/$',
      view=MyUpdateUserNameView.as_view(),
      name='update_user_name',
      ),
  url(regex=r'^accounts/user/(?P<pk>\d+)/password/$',
      view=MyUpdateUserPasswordView.as_view(),
      name='update_user_password',
      ),

You can use these views in your project as follows:

.. code-block:: html

  <td>
    <a href="{% url 'update_user_name' u.pk %}">
      <i class="fa fa-edit"></i>
      {{ u.username }}
    </a>
  </td>
  <td>
    <a href="{% url 'update_user_password' u.pk %}">
      <i class="fa fa-edit"></i>
      ********
    </a>
  </td>
