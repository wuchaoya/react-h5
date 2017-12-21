/**
 * Created by chao on 2017/10/24.
 * 短信登陆
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  SignTitle,
	GoBack,
	Input,
	InputCode,
	SignButton,
	Toast,
	SigninModal
} from '../components';

import HttpRequst from '../utils/HttpRequest';
import * as actions from '../actions/actions';
import SwissArmyKnife from '../utils/SwissArmyKnife';

class SignInSMS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeDisabled : true,
      buttonDisabled : true,
      phone:'',
      code: '',
      getCodeToast: false,
      errText:'验证码已失效',
      showErrModal: false,
      loginErr: false
    };
    this.setStateDisabled = this.setStateDisabled.bind(this);
    this.getCode = this.getCode.bind(this);
    this.siginSMS = this.siginSMS.bind(this);
  }
  render () {
    return (
      <div style={{ background: '#f5f5f5' }}>
        <GoBack onClick={() => {
          this.props.history.goBack();
        }} />
        <SignTitle title='短信登录' />
        <Input
          placeholder='请输入手机号'
          autoFocus
          type='text'
          name='phone'
          ref='phoneInput'
          value={this.state.phone}
          onChange={() => {
            this.setState({
              phone: this.refs.phoneInput.refs.phone.value
            }, () => {
              this.checkOnChange();
            });
          }}
        />
        <InputCode
          name='code'
          ref='codeInput'
          value={this.state.code}
          disable={this.state.codeDisabled}
          placeholder='验证码' autoFocus={false} type='text'
          func={this.setStateDisabled}
          getCode={this.getCode}
          onChange={() => {
            this.setState({
              code:this.refs.codeInput.refs.code.value
            }, () => {
              this.setState({
                buttonDisabled:!(/^1[34578]\d{9}$/.test(this.state.phone) && this.state.code.length === 6)
              });
            });
          }}
        />
        <SignButton onClick={this.siginSMS} disabled={this.state.buttonDisabled} />
        {this.state.getCodeToast ? <Toast text='短信已发送...' /> : null}
        {this.state.showErrModal ? <SigninModal err={this.state.loginErr} onConfirm={() => {
          this.setState({
            showErrModal: false
          });
        }} title={this.state.errText} /> : null}
      </div>
    );
  }
	
	/**
   * 短信验证码登录
	 */
  siginSMS () {
    this.setState({
      showErrModal: true,
      loginErr: false
    }, () => {
	    HttpRequst.signinSMS(
        {
          phone: this.state.phone,
          smsValidate:this.state.code,
          userIP:'',
          position:'',
          DeviceType: ''
        },
        (res) => {
          console.log(res);
          if (res.resultCode === '0') {
            this.props.login(
              {
                id:res.authenticateRsp.userInfo.identityID,
                name:res.authenticateRsp.loginAccountName
              }
            );
            this.getMyService(res.authenticateRsp.userInfo.identityID);
          } else {
            this.setState({
              loginErr: true,
	            errText:'验证码已失效'
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
	
	/**
   * 获取短信验证码
	 */
	getCode () {
	  HttpRequst.getCode(
      {
        phone:this.state.phone,
        businessID:'2'
      },
      (res) => {
        console.log(res);
        this.setState({
          getCodeToast: true
        }, () => {
          window.setTimeout(() => {
            this.setState({
              getCodeToast: false
            });
          }, 2500);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
	checkOnChange () {
    this.setState({
      codeDisabled:!(/^1[34578]\d{9}$/.test(this.state.phone)),
      buttonDisabled:!(/^1[34578]\d{9}$/.test(this.state.phone) && this.state.code.length === 6)
    });
  }
  
  setStateDisabled (bool) {
    this.setState({
      codeDisabled: bool
    });
  }
  
  componentWillMount () {
	  SwissArmyKnife.setColor('#f5f5f5')
  }
  
	/**
	 * 获取用户包月信息
	 * @param id
	 */
	getMyService (id) {
		HttpRequst.getMyService(
			{
				user_id: id,
				channelId: '40129731334'
			},
			(res) => {
				let services = [];
				if (res.service.length !== 0) {
					res.service.forEach((item) => {
						services.push(item.service_id);
					});
					this.props.getMyService(services);
				} else {
					this.props.getMyService([]);
				}
				this.getTimeLength(id, services);
			},
			(err) => {
				console.log('获取我的包月失败', err);
				this.setState({
					loginErr: true,
					errText: '获取用户订购信息失败'
				});
			}
		);
	}
	
	/**
	 * 获取剩余时长
	 * @param userId
	 * @param id
	 */
	getTimeLength (userId, id) {
		HttpRequst.getTimeLength(
			{
				user_id: userId,
				service_id:id,
				pkg:'',
				channelId: '40129731334'
			},
			(res) => {
				this.props.getTimeLength(Number(res.result_time));
				this.setState({
					showErrModal: false
				}, () => {
					this.props.history.go(-2);
				});
			},
			(err) => {
				console.log('获取时长失败', err);
				this.setState({
					loginErr: true,
					errText: '获取用户剩余时长失败'
				});
			}
		);
	}
	
};
export default connect(actions.getStateData, actions)(SignInSMS);
