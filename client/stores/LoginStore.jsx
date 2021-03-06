import EventEmmiter from 'events';

import dispatcher from '../dispatcher.jsx';


class LoginStore extends EventEmmiter {
  constructor(props) {
    super(props);

    this.session = {};
    this.csrfToken = "";
  }

  getCSRFTokenLogin() {
    return this.csrfToken;
  }

  getSession() {
    return this.session;
  }

  handleAction(action) {
    switch(action.type) {
      case "GET_CSRF_LOGIN_TOKEN": {
        this.csrfToken = action.csrfToken;
        this.emit('change');
        break;
      }      
      case "LOGIN_DONE": {
        this.session = action.data.session;
        this.emit('change');
        break;
      }
    }
  }
}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleAction.bind(loginStore));

export default loginStore;
