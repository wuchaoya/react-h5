/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from './Container';
import UserTop from './UserTopContainer';
import UserInfoTop from './UserInfoTopContainer';
import PurchaseContainer from './PurchaseContainer';
import UserTitle from '../components/UserTitle';
import PurChaseItem from '../components/PurchaseItem';
import UserEquity from './UserEquity';
import EquityItem from '../components/EquityItem';
import EquityIcon from '../components/EquityIcon';
import EquityText from '../components/EquityText';
import HttpRequest from '../utils/HttpRequest';
import WebView from '../components/WebView';
import ErrModal from '../components/ErrModal';

import { login, loginOut, getServiceData, getMyService, getTimeLength } from '../actions/actions';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renovate: false,
      openView: false,
      src: '',
      loginModal: false
    };
  }
  render () {
    const { isLogin, data, MyServiceId, userInfo } = this.props;
    return data ? <Container background='#fff' marginBottom={0.56}>
      <UserTop >
        <UserInfoTop setting={() => {
          this.props.history.push('/setting');
        }} time={this.props.timeLength} name={userInfo.name} click={() => {
          if (isLogin) {
            return;
          }
          this.props.history.push('/signin', { key: this.props.location.key });
        }}  login={isLogin} />
      </UserTop>
      <PurchaseContainer>
        <UserTitle margin='0.52rem 0 0.18rem 0.24rem'>会员购买</UserTitle>
        {data.map((item, index) => {
          if (Number(item.prize) === 0) {
            return null;
          }
          return <PurChaseItem
            MyServiceId={MyServiceId}
            isRecommend={index === 1}
            data={item} key={index}
            onClick={() => {
              if (item.service_id === MyServiceId) {
                return;
              }
              if (!isLogin) {
                this.setState({
                  loginModal: true
                });
                return;
              }
              this.ypPay(data[index]);
            }}
          />;
        })}
      </PurchaseContainer>
      <UserEquity>
        <UserTitle margin='0.52rem 0 0.48rem 0.24rem'>会员权益</UserTitle>
        {data.map((item, index) => {
          return <EquityItem key={index}>
            <EquityIcon name={data[data.length - index - 1].prodect_title} />
            <EquityText>
              {data[data.length - index - 1].prodect_describe}
            </EquityText>
          </EquityItem>;
        })}
      </UserEquity>
      {this.state.openView ? <WebView func={() => {
        this.setState({
          openView: false
        });
      }} src={this.state.src} /> : null}
      {this.state.loginModal ? <ErrModal
        title='您尚未登陆，是否登陆'
        onConfirm={() => {
          this.props.history.push('/signin', { key: this.props.location.key });
        }}
        onCancel={() => {
          this.setState({
            loginModal: false
          });
        }} /> : null}
    </Container> : null;
  }
  componentDidMount () {
    document.title = '我的';
    this.getData();
    window.addEventListener('message', (event) => {
      console.log(event);
      this.setState({
        openView: false
      });
    });
  }
  componentWillReceiveProps () {
    if (this.props.isLogin && !this.state.renovate) {
      this.setState({
        renovate: true
      }, () => {
        this.getMyService();
      });
    }
  }
  getData () {
    HttpRequest.serviceList(
      {
        user_id: this.props.isLogin ? this.props.userInfo.id : ''
      },
      (res) => {
        this.props.getServiceData(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getMyService () {
    HttpRequest.getMyService(
      {
        user_id: this.props.isLogin ? this.props.userInfo.id : ''
      },
      (res) => {
        this.props.getMyService(res.service[0].service_id);
        this.getTimeLength(res.service[0].service_id);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getTimeLength (id) {
    HttpRequest.getTimeLength(
      {
        user_id: this.props.userInfo.id,
        service_id:[id],
        pkg:''
      },
      (res) => {
        this.props.getTimeLength(Number(res.result_time));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ypPay (obj) {
    HttpRequest.ygPay(
      {
        uId: this.props.userInfo.id,
        channelCode: obj.channel_code,
        monthStatus: '1',
        productDescribe: obj.prodect_describe,
        serviceID: obj.service_id,
        spCode: obj.sp_code,
        etel: this.props.userInfo.name,
        cloudgame: '1'
      },
      (res) => {
        let url = res.yg_url;
        // let url = History.replaceUrl({
        //   url:res.yg_url,
        //   str:'redirectURL=http://pcloud.haimawan.com/html/success.html',
        //   replaceStr:'redirectURL=http://localhost:3000/ygerr'
        // });
        // url = History.replaceUrl({
        //   url:url,
        //   str:'failRedirectURL=http://pcloud.haimawan.com/html/fail.html',
        //   replaceStr:'redirectURL=http://localhost:3000/ygerr'
        // });
        this.setState(
          {
            src: url,
            openView: true
          }
        );
        // window.location.href = res.yg_url;
      },
      (err) => {
        console.log(err);
      }
    );
  }
};
const getLogin = state => {
  return {
    data: state.update.serviceData,
    isLogin: state.update.login,
    userInfo: state.update.userInfo,
    MyServiceId: state.update.MyServiceId,
    timeLength: state.update.timeLength
  };
};

export default connect(getLogin, { login, loginOut, getServiceData, getMyService, getTimeLength })(User);
