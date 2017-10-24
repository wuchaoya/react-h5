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

class SignInSMS extends Component {
  render () {
    return (
      <Container background='#f5f5f5'>
        <GoBack />
        <Title title='短信登陆' />
        <Input placeholder='请输入手机号' autoFocus type='text' />
        <InputButton placeholder='验证码' autoFocus={false} type='text' />
        <Button disabled />
      </Container>
    );
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
export default connect(getLogin)(SignInSMS);
