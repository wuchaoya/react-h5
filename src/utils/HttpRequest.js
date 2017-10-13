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

  static getGameDetailsData (parameter, callbackSuccess, callbackError) {
    HttpUitl.Post('/v2/game/game_detail', parameter,
      (response) => {
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

  static getGameListData (parameter, callbackSuccess, callbackError) {
    HttpUitl.Post('/v2/game/game_list', parameter,
      (response) => {
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

  static getRoomId (parameter, callbackSuccess, callbackError) {
    HttpUitl.Post('/v2/mpweixin/room_id', parameter,
      (response) => {
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
  static checkRoomId (parameter, callbackSuccess, callbackError) {
    HttpUitl.Post('/v2/mpweixin/check_room', parameter,
      (response) => {
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
  static getWxConfig (parameter, callbackSuccess, callbackError) {
    HttpUitl.Post('v2/mpweixin/wechat-share-config', parameter,
      (response) => {
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
