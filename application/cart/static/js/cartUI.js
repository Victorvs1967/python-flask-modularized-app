window.addEventListener('load', () => new Api().callApiCart().then(new UI().showCart))

class Api {
  async callApiCart() {
    return await fetch('/cart/api/')
      .then(resp => resp.json())
      .then(data => data);
  }

  async removeItemFromCart(itemId) {
    return await fetch('/cart/api/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'productId': itemId })
    })
    .then(resp => resp.json())
    .then(data => {
      new ApiNotif().callApiCartNotif().then(new UINotif().showCartNotif);
      new Api().callApiCart().then(new UI().showCart);
    });
  }
}

class UI {
  constructor() {
    this.showCart = this.showCart.bind(this);
  }

  showCart(apiResp) {
    const cart = apiResp.data[0].items;
    const records = [];
    for (let [index, item] of cart.entries()) {
      item.index = index + 1;
      records.push(this.createRecordCartItems(item));
    }

    let cartTable = document.getElementById('cartItemList');
    cartTable.innerHTML = records.join('');
    this.setTotalPrice(apiResp.data[0].totalPrice);
    this.registerListenerToRemoveItem();
  }

  createRecordCartItems(item) {
    let row = `
    <tr>
      <th scope="row">${ item.index }</th>
      <th scope="row">${ item.name }</th>
      <th scope="row">${ item.price }</th>
      <th scope="row"><button type="button" class="btn btn-danger button-action-remove" itemId=${ item.id }>Delete</button>
      </th>
    </tr>
    `;
    return row;
  }

  registerListenerToRemoveItem() {
    const listOfActionButton = document.querySelectorAll('.button-action-remove');
    for (let element of listOfActionButton) {
      element.addEventListener('click', function() {
        new Api().removeItemFromCart(this.getAttribute('itemId'));
      });
    }
  }

  setTotalPrice(totalPrice) {
    document.getElementById('totalPrice').innerHTML = 'Total Price: '.concat(totalPrice, ' ');
  }

}