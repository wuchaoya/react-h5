/**
 * Created by chao on 2017/12/7.
 */

import React, { Component } from 'react';
import HttpRequest from '../utils/HttpRequest';
import PurChaseItem from '../components/PurchaseItem';
import WebView from '../components/WebView';
import DesUtils from '../utils/DesUtils';
let key = '625a706566676a397432573238557444';

let channelID = '1deb33365f16b5673cdcc65a11fd3057';

export default class OpenMonthlyDialog extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: null,
      src: ''
    };
    this.onMessage = this.onMessage.bind(this);
  }
  render () {
    return (
      <div style={styles.modal}>
        {
          this.state.data ? <div style={styles.container}>
            {this.state.data.map((item, index) => {
              if (Number(item.prize) === 0) {
                return null;
              }
              let service = '';
              this.props.services.forEach((id) => {
                if (item.service_id === id) {
                  service = item.service_id;
                }
              })
              return <PurChaseItem
                MyServiceId={service}
                isRecommend={index === 1}
                data={item} key={index}
                onClick={() => {
                  if (service === '') {
                    this.ypPay(this.state.data[index]);
                  }
                }}
              />;
            })}
          </div> : null
        }
        {this.state.openView ? <WebView func={() => {
          this.setState({
            openView: false
          });
        }} src={this.state.src} /> : null}
      </div>
    );
  }
  defaultEvent (event) {
    event.preventDefault();
  }
  componentDidMount () {
    document.addEventListener('touchmove', this.defaultEvent, false);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    this.setState({
      height: document.body.clientHeight / 100,
      width: document.body.clientWidth / 100
    });
    this.getData();
    window.addEventListener('message', this.onMessage);
  }
  isWeiXin () {
    let ua = window.navigator.userAgent.toLowerCase();
    // eslint-disable-next-line
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }
  componentWillUnmount () {
    document.removeEventListener('touchmove', this.defaultEvent, false);
    document.documentElement.style.overflow = 'visible';
    document.body.style.overflow = 'visible';
  }

  getData () {
    HttpRequest.serviceList(
      {
        user_id: this.props.userid
      },
      (res) => {
        this.setState({
          data: res
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ypPay (obj) {
    HttpRequest.ygPay(
      {
        uId: this.props.uid,
        channelCode: obj.channel_code,
        monthStatus: '1',
        productDescribe: obj.prodect_describe,
        serviceID: obj.service_id,
        spCode: obj.sp_code,
        etel: DesUtils.desencry(key, this.props.phone),
        cloudgame: '1',
        channel_id: channelID,
        tag: window.location.origin + '/qpc'
      },
      (res) => {
        let url = res.yg_url;
        if (navigator.userAgent.match(/iPad|iPhone/i)) {
          window.location.href = url;
        } else {
          this.setState(
            {
              src: url,
              openView: true
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onMessage (event) {
    if (event.origin === 'http://pcloud.haimawan.com' || event.origin === 'http://api_dev.haimawan.com' || event.origin === 'http://migu-api.cmgame.com') {
      this.setState({
        openView: false
      });
    }
  }
};

const styles = {
  modal: {
    width: '7.2rem',
    height:'12.8rem',
    backgroundColor:'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    position: 'fixed',
    top:'0',
    left:'0',
    zIndex:'99'
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    position: 'relative',
    borderRadius: '0.2rem'
  },
  button: {
    position: 'absolute',
    top: '0.1rem',
    right: '0.1rem'
  }
};
