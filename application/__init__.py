from flask import Flask

from .user.route import user
from .product.route import product
from .cart.route import cart


app = Flask(__name__)
app.register_blueprint(user)
app.register_blueprint(product)
app.register_blueprint(cart)

from . import route