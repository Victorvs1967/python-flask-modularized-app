import json
import pathlib


class Cart:
  def __init__(self):
    self.collections = json.load(self.openDb())

  def openDb(self):
    return open(pathlib.Path().cwd()/'db/db.json')

  def getCart(self):
    cart = self.collections.get('carts')
    return cart[0]

  def addNewItemToCart(self, selectedProductId):
    item = self.getSelectedItem(selectedProductId)
    cartItems = self.collections.get('carts', [])[0].get('items', [])
    cartItems.append(item)
    self.collections.get('carts')[0].update({ 'items': cartItems })
    self.updateDb()

  def updateDb(self):
    db = open(pathlib.Path().cwd()/'db/db.json', 'w')
    db.write(json.dumps(self.collections))

  def removeItemFromCart(self, selectedProductId):
    itemIndex = self.findItemInCart(selectedProductId)
    cartItems = self.collections.get('carts', [{}])[0].get('items', [])
    cartItems.pop(itemIndex)
    self.collections.get('carts')[0].update({ 'items': cartItems })
    self.updateDb()

  def getSelectedItem(self, selectedProductId):
    item = {}
    products = self.collections.get('products', [])
    item = [product for product in products if str(product.get('id')) == selectedProductId][0]

    if not item:
      raise Exception('Product is not found.')

    return item

  def findItemInCart(self, selectedProductId):
    itemIndex = None
    products = self.collections.get('carts', [{}])[0].get('items', [])
    itemIndex = [index for index, product in enumerate(products) if str(product.get('id')) == selectedProductId][0]

    if itemIndex == None:
      raise Exception('Product is not found.')

    return itemIndex

  def getTotalItemsInCart(self):
    users = self.collections.get('carts')
    return len(users[0].get('items', []))