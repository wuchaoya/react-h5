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
import loading from '../assets/loading.gif'

const defaultStyle = {
  width: '100%',
  height: '0.86rem',
  justifyContent: 'center',
  alignItems: 'center'
};
class HeadNode extends PureComponent{
  render () {
    const { loaderState } = this.props;
    let content;
    if (loaderState === STATS.pulling) {
      content = '使劲拉';
    } else if (loaderState === STATS.enough) {
      content = '';
    } else if (loaderState === STATS.refreshing) {
      content = '正在刷新...';
    } else if (loaderState === STATS.refreshed) {
      content = '刷新成功';
    }
    return (
      <div style={defaultStyle}>
        {content}
      </div>
    );
  }
}

class FooterNode extends PureComponent{
  render () {
    const { loaderState, hasMore } = this.props;

    let content = '';
    // if(hasMore === false){
    //   content = "没有更多"
    // } else if(loaderState == STATS.loading && hasMore === true){
    //   content = "加载中"
    // }
    if (loaderState === STATS.loading) {
      content = '加载中';
    } else if (hasMore === false) {
      content = '没有更多';
    }

    return (
      <div style={defaultStyle}>
        {content}
      </div>
    );
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
      <div>
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
                  <Start marginBottom={0.24} length={item.score} />
                  <GameClass data={item.label = ['好玩', '不错']} />
                </GameListItemInfoContainer>
                <GameListButton onClick={(e) => {
                  console.log(e.nativeEvent);
                  e.stopPropagation();
                  this.props.history.push('playgame');
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
      document.title = '专题详情';
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