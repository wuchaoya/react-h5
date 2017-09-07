import HttpUitl from './HttpUitl';

export default class HttpRequest {
  static getHomeData (parameter, callbackSuccess, callbackError) {
    HttpUitl.Post('/v2/homepage', parameter, (response) => {
      if (response.state === 200 && response.data) {
        callbackSuccess(response.data);
      } else {
        callbackError(response.state);
      }
    },
    (error) => {
      callbackError(error);
    });
  }
  static getGameDissertationData (parameter, callbackSuccess, callbackError) {
    HttpUitl.Post('/v2/dissertation/', parameter, (response) => {
      if (response.state === 200 && response.data) {
        callbackSuccess(response.data);
      } else {
        callbackError(response.state);
      }
    },
      (error) => {
        callbackError(error);
      });
  }
};
