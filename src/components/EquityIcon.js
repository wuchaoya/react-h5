/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';

import icon1 from '../assets/img/giftBag1_icon.png';
import icon2 from '../assets/img/giftBag2_icon.png';
import icon3 from '../assets/img/giftBag3_icon.png';

export default class EquityIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      icon: icon1,
      fontSize: 0.28,
      color: '#ffba00'
    };
  }
  render () {
    return (
      <div style={styles.container}>
        <span style={{ fontSize:this.state.fontSize + 'rem', color: this.state.color }}>{this.state.name}</span>
        <img style={styles.icon} src={this.state.icon} alt='icon' />
        <span style={{ fontSize:'0.24rem', color: this.state.color }}>游戏时常</span>
      </div>
    );
  }
  componentDidMount () {
    if (this.props.name === '尊享包') {
      this.setState({
        icon: icon1,
        fontSize: 0.28,
        color: '#ffba00'
      });
    } else if (this.props.name === '精选包') {
      this.setState({
        icon: icon2,
        fontSize: 0.28,
        color: '#ea8e4a'
      });
    } else {
      this.setState({
        icon: icon3,
        fontSize: 0.28,
        color: '#999'
      });
    }
  }
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '0.16rem',
    marginRight:'0.3rem'
  },
  icon: {
    height:'0.66rem'
  }
};

