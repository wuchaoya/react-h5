import Encryption from './Encryption';
let { fetch } = window;
export default class HttpUitl {
  static Post (path, parameter, callbackSuccess, callbackError) {
    parameter.time = (new Date()).valueOf();
    fetch( path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Sign': Encryption.encryptFun(JSON.stringify(parameter))
      },
      body: JSON.stringify(parameter)
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      callbackSuccess(responseJson);
    }).catch((error) => {
      callbackError(error);
    });
  }
  static Get (path, callbackSuccess, callbackError) {
    fetch(path).then((response) => {
      return response.json();
    }).then((responseJson) => {
      callbackSuccess(responseJson);
    }).catch((error) => {
      callbackError(error);
    });
  }
};