window.addEventListener('load', () => new Api().callApiProduct().then(new UI().showDetailProduct));

class Api {
  async callApiProduct() {
    const urls = location.href.split('/');
    const productId = urls[urls.length - 1];

    return await fetch('/product/api/detail/'.concat(productId))
    .then(resp => resp.json())
    .then(data => data);
  }
}

class UI {
  constructor() {
    this.showDetailProduct = this.showDetailProduct.bind(this);
  }

  showDetailProduct(apiRest) {
    const getEl = id => document.getElementById(id);
    const product = apiRest.data[0];

    getEl('productName').innerHTML = product.name;
    getEl('productDesc').innerHTML = product.desc;
    getEl('type').innerHTML = product.type;
    getEl('brand').innerHTML = product.brand;
    getEl('stock').innerHTML = product.stock;
    getEl('weight').innerHTML = product.weight;
    getEl('price').innerHTML = product.price;
    getEl('productImage').setAttribute('src', product.images);
  }
}