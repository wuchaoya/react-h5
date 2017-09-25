/**
 * Created by chao on 2017/9/25.
 * 首页
 */

import React, { Component } from 'react';

import Container from './Container';
import HttpRequest from '../utils/HttpRequest';
import LoadingContainer from './LoadingContainer';
import HomeFours from '../components/HomeFours';
import HomeTopic from './HomeTopic';
import Title from '../components/Title';
import ScrollView from '../components/HomeScroll';

class PlayGameContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      err: false
    };
  }
  render () {
    // eslint-disable-next-line
    return this.state.data === null ? <LoadingContainer name='首页'clickButton={() => this.getData()} err={this.state.err} /> : <Container marginBottom={0.24}>
      <HomeFours data={this.state.data.banner} />
      <HomeTopic>
        <Title margin='0.24rem 0 0 0.24rem' color='#000' fontSize='0.3rem'>游戏专题</Title>
        <Title margin='0.24rem 0 0 0.24rem' color='#999' fontSize='0.24rem'>ACT ACT 我们为你挑好了</Title>
        <ScrollView data={this.state.data.dissertation} />
      </HomeTopic>
    </Container>;
  }
  getData () {
    this.setState({
      err: false
    });
    HttpRequest.getHomeData({}, (res) => {
      document.title = '首页';
      console.log(res);
      this.setState({
        data: res
      });
    }, (err) => {
      document.title = '首页';
      this.setState({
        data: null,
        err: true
      });
    });
  }
  componentDidMount () {
    this.getData();
  }
}

export default PlayGameContainer;

