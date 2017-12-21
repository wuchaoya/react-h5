/**
 * Created by chao on 2017/10/24.
 * 账号登陆
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	SignTitle,
	GoBack,
	Input,
	SignButton,
	SignTextButton,
	SigninModal
} from '../components';

import HttpRequst from '../utils/HttpRequest';
import * as actions from '../actions/actions';
import SwissArmyKnife from '../utils/SwissArmyKnife';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password:'',
      disabled:true,
      errText:'账号或密码不正确',
      showErrModal: false,
      loginErr: false
    };
    this.sigin = this.sigin.bind(this);
  }
  render () {
    return (
      <div style={{ background: '#f5f5f5' }}>
        
        <GoBack onClick={() => {
          this.props.history.goBack();
        }} />
        
        <SignTitle title='账号登录' />
        
        <Input
          name='phone'
          ref='phoneInput'
          value={this.state.phone}
          placeholder='请输入手机号'
          autoFocus
          type='text'phone
          onChange={() => {
            this.setState({
              phone:this.refs.phoneInput.refs.phone.value
            }, () => {
              this.checkOnChange();
            });
          }}
        />
        
        <Input
          name='password'
          ref='passwordInput'
          value={this.state.password}
          placeholder='请输入密码'
          autoFocus={false}
          type='password'
          onChange={() => {
            this.setState({
              password:this.refs.passwordInput.refs.password.value
            }, () => {
              this.checkOnChange();
            });
          }}
        />
        
        <SignButton onClick={this.sigin} disabled={this.state.disabled} />
        
        <SignTextButton onClick={() => {
          this.props.history.push('/signinsms');
        }}>短信登录</SignTextButton>
        
        {this.state.showErrModal ? <SigninModal err={this.state.loginErr} onConfirm={() => {
          this.setState({
            showErrModal: false
          });
        }} title={this.state.errText} /> : null}
     
      </div>
    );
  }
	
	/**
   * 登录
	 */
  sigin () {
    this.setState({
      showErrModal: true,
      loginErr: false
    }, () =>  {
      HttpRequst.signin(
        {
          phone: this.state.phone,
          password: this.state.password,
          ip: '',
          position:'',
          DeviceType:''
        },
        (res) => {
          if (Number(res.resultCode) === 0) {
            this.props.login({
              id:res.authenticateRsp.userInfo.identityID,
              name:res.authenticateRsp.loginAccountName
            });
            this.getMyService(res.authenticateRsp.userInfo.identityID);
          } else {
            this.setState({
              loginErr: true,
	            errText:'账号或密码不正确'
            });
          }
        },
        (err) => {

        }
      );
    });
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
					this.props.history.goBack();
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
	
	/**
   * 输入框变化时检查
	 */
	checkOnChange () {
    this.setState({
      disabled:!(/^1[34578]\d{9}$/.test(this.state.phone) && this.state.password.length > 5)
    });
  }
  
  componentWillMount () {
    SwissArmyKnife.setColor('#f5f5f5');
  }
  

};

export default connect(actions.getStateData, actions)(SignIn);
