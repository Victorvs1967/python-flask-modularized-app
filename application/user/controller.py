from .model import User


class UserController:
  def __init__(self):
    self.model = User()

  def getUser(self):
    data = self.model.getUser()
    if not data:
      return { 'status': False, 'data': [data], 'message': 'User is not found.' }
    return { 'ststus': True, 'data': [data], 'message': '' }