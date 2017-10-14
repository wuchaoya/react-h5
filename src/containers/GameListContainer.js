/**
 * Created by chao on 2017/9/14.
 */

import React, { Component, PureComponent } from 'react';
import ReactPullLoad, { STATS } from 'react-pullload';
import GameListHead from '../components/GameListHead';
import HttpRequest from '../utils/HttpRequest';
import GameListItem from './GameListItemContainer';
import GameListIcon from '../components/GameListIcon';
import GameListItemInfoContainer from './GameListItemInfoContainer';
import GameListItemName from '../components/GameListItemName';
import Start from '../components/Star';
import GameClass from '../components/GameDetailsClass';
import GameListButton from '../components/GamelistButton';
import loading from '../assets/loading.gif';
import res from '../assets/emoji_res.png';
import loadermore from '../assets/emoji_loadermore.png';
import WeChat from '../utils/WeChat';

const defaultStyle = {
  width: '100%',
  height: '0.86rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
const loadingIconStyle = {
  width:0.54 * 0.7 + 'rem',
  height:0.58 * 0.7 + 'rem'
}
const resIconStyle = {
  width: '1.02rem',
  height: '0.25rem'
}
const line = {
  flex: '1',
  borderTop: '0.01rem solid #e5e5e5'
}
const textStyle = {
  marginLeft:'0.1rem',
  fontSize: '0.26rem',
  color: '#666'
}
class HeadNode extends PureComponent{
  _render (loaderState) {
    if (loaderState === STATS.pulling) {
      return (<div style={defaultStyle}><img style={loadingIconStyle} src={loading} alt=''/><span style={textStyle}>使劲拉</span></div>)
    } else if (loaderState === STATS.enough) {
      return (<div style={defaultStyle}><img style={loadingIconStyle} src={loading} alt=''/><span style={textStyle}>松手</span></div>)
    } else if (loaderState === STATS.refreshing) {
      return (<div style={defaultStyle}><img style={loadingIconStyle} src={loading} alt=''/><span style={textStyle}>刷新中</span></div>)
    } else if (loaderState === STATS.refreshed) {
      return (<div style={defaultStyle}><img style={resIconStyle} src={res} alt=''/><span style={textStyle}>刷新成功</span></div>)
    }
    return <div />
  }
  render () {
    const { loaderState } = this.props;
    return this._render(loaderState)
  }
}

class FooterNode extends PureComponent{
  _render (loaderState, hasMore) {
    if (loaderState === STATS.loading) {
      return (<div style={defaultStyle}><img style={loadingIconStyle} src={loading} alt=''/><span style={textStyle}>加载中</span></div>)
    } else if (hasMore === false) {
      return (<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display:'flex',flexDirection:'row', alignItems: 'center',marginTop:'0.56rem',width:'100%'}}>
          <div style={line} />
          <span style={{marginLeft:'0.18rem', marginRight: '0.18rem'}}>底线都出来了</span>
          <div style={line} />
        </div>
        <img style={{marginTop:'0.64rem',height:'0.79rem',width:'0.79rem',marginBottom:'0.4rem'}} src={loadermore} alt=''/>
      </div>)
    }
    return <div />
  }
  render () {
    const { loaderState, hasMore } = this.props;
    return this._render(loaderState, hasMore)
  }
}

export default class Pull extends Component{
  constructor () {
    super();
    this.state = {
      hasMore: true,
      data: null,
      action: STATS.init,
      index: 0
    };
  }
  handleAction = (action) => {
    // eslint-disable-next-line
    if (action === this.state.action || action === STATS.refreshing && this.state.action === STATS.loading || action === STATS.loading && this.state.action === STATS.refreshing) {
      return false;
    }

    if (action === STATS.refreshing) {
      this.setState({
        index: 0
      }, () => {
        HttpRequest.getGameListData({ page: this.state.index }, (res) => {
          this.setState({
            data: res,
            action: STATS.refreshed,
            hasMore: true
          });
        }, (err) => {
          this.setState({
            data: null,
            action: STATS.refreshed,
            hasMore: true
          });
        });
      });
    } else if (action === STATS.loading && this.state.hasMore) {
      this.setState({
        index: this.state.index + 1
      }, () => {
        HttpRequest.getGameListData({ page: this.state.index }, (res) => {
          let arr = this.state.data;
          arr = arr.concat(res);
          this.setState({
            data: arr,
            action: STATS.reset,
            hasMore: res.length === 10
          });
        }, (err) => {
          this.setState({
            action: STATS.reset,
            hasMore: false
          });
        });
      });
    }
    if (action === STATS.loading && !this.state.hasMore) {
      return;
    }
    this.setState({
      action: action
    });
  }
  render () {
    const {
      hasMore
    } = this.state;
    return (
      <div style={{backgroundColor:'rgba(237,237,237,1)'}}>
        <GameListHead />
        <ReactPullLoad
          downEnough={100}
          action={this.state.action}
          handleAction={this.handleAction}
          hasMore={hasMore}
          HeadNode={HeadNode}
          FooterNode={FooterNode}
          style={{paddingTop: 0}}
          distanceBottom={1000}>
          {
            this.state.data == null ? null : this.state.data.map((item, index) => {
              return <GameListItem key={index} onClick={() => {
                this.props.history.push('gamedetails' + item.gid);
              }}>
                <GameListIcon src={item.icon} />
                <GameListItemInfoContainer>
                  <GameListItemName>{item.name}</GameListItemName>
                  <Start marginBottom={0.14} length={item.score} />
                  <GameClass data={item.label = ['好玩', '不错']} />
                </GameListItemInfoContainer>
                <GameListButton onClick={(e) => {
                  console.log(e.nativeEvent);
                  e.stopPropagation();
                  this.props.history.push('playgame',{pkg:item.pkg});
                }
                } />
              </GameListItem>;
            })
            }
        </ReactPullLoad>
      </div>
    );
  }
  getData () {
    this.setState({
      err: false
    });
    HttpRequest.getGameListData({ page: this.state.index }, (res) => {
     console.log(res);
      this.setState({
        data: res
      });
    }, (err) => {
      this.setState({
        data: null,
        err: true
      });
    });
  }
  init () {
    HttpRequest.getWxConfig(
      {
        activityCode:'123',
        url: window.location.href.split('#')[0]
      },
      (res) => {
        console.log(res);
        WeChat.init({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见附录1
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  componentDidMount () {
    document.title = '游戏列表';
    this.getData();
    this.props.history.listen((location, action) => {
      console.log(location);
      this.init();
    });
    this.init();
    WeChat.ready();
    WeChat.error();
  }
}
