/**
 * Created by chao on 2017/10/24.
 * 账号登陆
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from './Container';
import Title from '../components/SignTitle';
import GoBack from '../components/GoBack';
import Input from '../components/Input';
import '../styles/inputStyle.css';
import Button from '../components/SignButton';
import TextButton from '../components/SignTextButton';
import HttpRequst from '../utils/HttpRequest';
import { login, loginOut, getMyService, getTimeLength, getExtraId } from '../actions/actions';
import LoginModal from '../components/LoginModal';

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
      <Container background='#f5f5f5'>
        <GoBack onClick={() => {
          this.props.history.goBack();
        }} />
        <Title title='账号登录' />
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
        <Button onClick={this.sigin} disabled={this.state.disabled} />
        <TextButton onClick={() => {
          this.props.history.push('/signinsms', { key:this.props.location.state.key });
        }}>短信登录</TextButton>
        {this.state.showErrModal ? <LoginModal err={this.state.loginErr} onConfirm={() => {
          this.setState({
            showErrModal: false
          });
        }} title={this.state.errText} /> : null}
      </Container>
    );
  }
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
              loginErr: true
            });
          }
        },
        (err) => {

        }
      );
    });
  }
  checkOnChange () {
    this.setState({
      disabled:!(/^1[34578]\d{9}$/.test(this.state.phone) && this.state.password.length > 5)
    });
  }
  componentWillMount () {
    document.getElementsByTagName('html')[0].style.background = '#f5f5f5';
    document.getElementsByTagName('body')[0].style.background = '#f5f5f5';
  }
  getMyService (id) {
    HttpRequst.getMyService(
      {
        user_id: id
      },
      (res) => {
        this.props.getMyService(res.service[0].service_id);
        this.getTimeLength(id, res.service[0].service_id);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getTimeLength (userId, id) {
    HttpRequst.getTimeLength(
      {
        user_id: userId,
        service_id:[id],
        pkg:''
      },
      (res) => {
        this.props.getTimeLength(Number(res.result_time));
        this.props.getExtraId(res.trace_unique_id);
        this.setState({
          showErrModal: false
        }, () => {
          this.props.history.goBack();
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

};
const getLogin = state => {
  return {
    login: state.update.login
  };
};
export default connect(getLogin, { login, loginOut, getMyService, getTimeLength, getExtraId })(SignIn);
