from flask import render_template

from . import product
from .controller import ProductController


@product.get('/<productId>')
def index(productId):
  return render_template('product.html')

@product.get('/api/')
def productList():
  return ProductController().get()

@product.get('/api/detail/<productId>')
def certainProduct(productId):
  return ProductController().getSingleProduct(productId)