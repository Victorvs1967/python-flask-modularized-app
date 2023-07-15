window.addEventListener('load', () => new ApiNotif().callApiCartNotif().then(new UINotif().showCartNotif));

class ApiNotif {
  async callApiCartNotif() {
    return await fetch('/cart/api/total-items')
      .then(resp => resp.json())
      .then(data => data);
  }
}

class UINotif {
  constructor() {
    this.showCartNotif = this.showCartNotif.bind(this);
  }

  showCartNotif(apiResp) {
    document.getElementById('notifId').innerHTML = apiResp.data[0].total;
  }
}