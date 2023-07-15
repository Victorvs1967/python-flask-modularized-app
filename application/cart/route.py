from flask import render_template

from . import cart
from .controller import CartController


@cart.get('/')
def index():
  return render_template('cart.html')

@cart.get('/api/')
def listOfCartItems():
  return CartController().getCart()

@cart.get('/api/total-items')
def totalOfCartItems():
  return CartController().getTotalItemsInCart()

@cart.post('/api/')
def addNewDataToCart():
  return CartController().addNewItemToCart()

@cart.delete('/api/')
def removeItemFromCart():
  return CartController().removeItemFromCart()