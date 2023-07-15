import json
import pathlib


class Product:
  def __init__(self):
    self.collections = json.load(self.openDb())

  def openDb(self):
    return open(pathlib.Path().cwd()/'db/db.json')

  def get(self):
    return self.collections.get('products', [])

  def getSingleProduct(self, id):
    products = self.collections.get('products')
    return [product for product in products if str(product.get('id') == id)][int(id)-1] | {}