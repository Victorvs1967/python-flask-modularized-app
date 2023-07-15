import json
import pathlib


class User:
  def __init__(self):
    self.collections = json.load(self.opemDb())

  def opemDb(self):
    return open(pathlib.Path().cwd()/'db/db.json')

  def getUser(self):
    users = self.collections.get('users')
    return users[0]