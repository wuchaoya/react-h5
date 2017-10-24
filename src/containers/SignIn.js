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
import TextButton from '../components/SignTextButton';

class SignIn extends Component {
  render () {
    return (
      <Container background='#f5f5f5'>
        <GoBack />
        <Title title='账号登陆' />
        <Input placeholder='请输入手机号' autoFocus type='text' />
        <Input placeholder='请输入密码' autoFocus={false} type='password' />
        <Button disabled />
        <TextButton>短信登录</TextButton>
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
export default connect(getLogin)(SignIn);
