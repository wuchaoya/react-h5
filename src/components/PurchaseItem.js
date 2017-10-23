/**
 * Created by chao on 2017/10/23.
 */
import React, { Component } from 'react';

import icon from '../assets/radius_icon.png';
export default class PurchaseItem extends Component {
  render () {
    return (
      <div style={
        Object.assign(
          {}, styles.container, {
            backgroundColor: this.props.isRecommend? '#fff8f0' : '#fff'
          }
          )}>
        {this.props.isRecommend ? <div style={styles.icon}>
          荐
        </div> : null}
        <div style={styles.nameStyle}>
          咪咕娱乐云游戏
        </div>
        <div style={styles.rightStyle}>
          <div>
            <span style={styles.numberStyle}>15</span>
            <span style={styles.textStyle}>元/月</span>
          </div>
          <div style={Object.assign(
            {}, styles.buttonStyle, {
              backgroundColor: this.props.isRecommend? '#ff8800' : '#83b233'
            }
          )}>
            <span>开通</span>
          </div>
        </div>
      </div>
    );
  }
};

const styles = {
  container: {
    height: '1.2rem',
    display: 'flex',
    flexDirection: 'row',
    border: '0.01rem solid #ccc',
    borderRadius: '0.12rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 0.2rem 0 0.2rem',
    margin: '0 0.3rem 0 0.3rem',
    position: 'relative',
    marginTop:'0.12rem'
  },
  nameStyle: {
    fontSize: '0.26rem',
    color: '#666'
  },
  rightStyle: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center'
  },
  numberStyle: {
    fontSize: '0.3rem',
    color: '#ff8800'
  },
  textStyle: {
    fontSize: '0.2rem',
    color: '#666',
  },
  buttonStyle: {
    width: '1.4rem',
    height: '0.6rem',
    color: '#fff',
    fontSize: '0.24rem',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: '0.3rem',
    marginLeft:'0.3rem'
  },
  icon: {
    width: '0.57rem',
    height:'0.57rem',
    background: 'url(' + icon + ') no-repeat',
    backgroundSize:'100% 100%',
    fontSize: '0.2rem',
    color: '#fff',
    paddingTop:'0.06rem',
    paddingLeft:'0.08rem',
    position: 'absolute',
    top: '0',
    left:'0'
  }
};
