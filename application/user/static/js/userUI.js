window.addEventListener('load', () => new Api().callApiUser().then(new UI().showUser));

class Api {

  async callApiUser() {
    return await fetch('/user/api/detail')
      .then(resp => resp.json())
      .then(data => data);
  }
}

class UI {
  constructor() {
    this.showUser = this.showUser.bind(this);
  }

  showUser(apiResp) {
    const getEl = id => document.getElementById(id);
    const user = apiResp.data[0];

    getEl('nickName').innerHTML = user.nickName;
    getEl('username').innerHTML = user.username;
    getEl('phone').innerHTML = user.phone;
    getEl('email').innerHTML = user.email;
    getEl('birth').innerHTML = user.birth;
    getEl('address').innerHTML = user.address;
    getEl('joinedDates').innerHTML = user.joinedDates;
    getEl('memberTypes').innerHTML = user.memberTypes;
    getEl('profileImage').setAttribute('src', user.images);
  }
}