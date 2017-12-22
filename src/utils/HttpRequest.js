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
	
	static checkUserBattleId (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/mpweixin/check_user_room', parameter,
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
	
	static checkUserRoomCard (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/user/room_card', parameter,
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
	
	static openMonthly (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/nofify/yg_pay', parameter,
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
	static getWxUserInfo (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('v2/mpweixin/wx-user-info', parameter,
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
	};
	static signin (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/login/password', parameter,
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
	static signinSMS (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/login/sms_code', parameter,
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
	static getCode (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/login/verity_code', parameter,
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
	static exitBattleGroup (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/mpweixin/exit-battle-group', parameter,
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
	static serviceList (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/user/service_list', parameter,
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
	static getMyService (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/user/my_service', parameter,
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
	static getTimeLength (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/user/time_length', parameter,
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
	static ygPay (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/pay/yg_pay', parameter,
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
	static score (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/game/score', parameter,
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
	
	static validateToken (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/sso/pcloud-token-validate', parameter,
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
	
	static getToken (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/sso/token', parameter,
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
	
	static loginQuick (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/login/quick_login', parameter,
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
	
	static userBehaviorLogReport (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/log/user-behavior-log', parameter,
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
	
	/**
	 * 通过openID注册user用户
	 * @param parameter
	 * @param callbackSuccess
	 * @param callbackError
	 */
	static bindOpenId (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/user/bind_openid', parameter,
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
	
	/**
	 * 绑定openID和phone
	 * @param parameter
	 * @param callbackSuccess
	 * @param callbackError
	 */
	static bindPhone (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/user/bind_phone', parameter,
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
	
	/**
	 * 查询剩余房卡
	 * @param parameter
	 * @param callbackSuccess
	 * @param callbackError
	 */
	static selectRoomCard (parameter, callbackSuccess, callbackError) {
		HttpUitl.Post('/v2/user/room_card', parameter,
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
