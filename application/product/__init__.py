from flask import Blueprint


product = Blueprint('product', __name__, static_folder='static', template_folder='templates', url_prefix='/product')