/**
 * Created by chao on 2017/10/24.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from './Container';
import Title from '../components/SignTitle';
import GoBack from '../components/GoBack';
import Input from '../components/Input';
import '../styles/inputStyle.css';
import Button from '../components/SignButton';
import InputButton from '../components/InputCode';
import HttpRequest from '../utils/HttpRequest';
import Toast from '../components/Toast';
import LoginModal from '../components/LoginModal';
import { login, loginOut } from '../actions/actions';

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
      <Container background='#f5f5f5'>
        <GoBack onClick={() => {
          this.props.history.goBack();
        }} />
        <Title title='短信登陆' />
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
        <InputButton
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
        <Button onClick={this.siginSMS} disabled={this.state.buttonDisabled} />
        {this.state.getCodeToast ? <Toast text='短信已发送...' /> : null}
        {this.state.showErrModal ? <LoginModal err={this.state.loginErr} onConfirm={() => {
          this.setState({
            showErrModal: false
          });
        }} title={this.state.errText} /> : null}
      </Container>
    );
  }
  siginSMS () {
    this.setState({
      showErrModal: true,
      loginErr: false
    }, () => {
      HttpRequest.signinSMS(
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
            this.setState({
              showErrModal: false
            }, () => {
              this.props.login(
                {
                  id:res.authenticateRsp.userInfo.identityID,
                  name:res.authenticateRsp.loginAccountName
                }
              );
              this.props.history.go(-2);
            });
          } else {
            this.setState({
              loginErr: true
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
  getCode () {
    HttpRequest.getCode(
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
    document.getElementsByTagName('html')[0].style.background = '#f5f5f5';
    document.getElementsByTagName('body')[0].style.background = '#f5f5f5';
  }
};
const getLogin = state => {
  return {
    login: state.update.login
  };
};
export default connect(getLogin, { login, loginOut })(SignInSMS);
