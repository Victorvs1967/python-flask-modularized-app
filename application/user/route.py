from flask import render_template

from . import user
from .controller import UserController


@user.get('/')
def index():
  return render_template('user.html')

@user.get('/api/detail')
def userDetail():
  return UserController().getUser()