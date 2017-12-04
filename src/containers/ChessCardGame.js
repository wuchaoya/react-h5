/**
 * Created by chao on 2017/11/23.
 * 棋牌游戏
 */

import React, { Component } from 'react';

export default class ChessCardGame extends Component {
  render () {
    return (
      <div style={styles.container}>
        <div style={styles.top}>
          <img style={styles.userIcon} src='' alt='' />
          <div>
            <h2 style={styles.name}>小咪咕</h2>
            <span style={styles.card}>剩余房卡：x</span>
          </div>
        </div>
        <div style={{marginTop: '1.2rem'}}>
          <div style={styles.item}>
            <img style={styles.icon} src='' alt='' />
            <span>咪咕斗地主</span>
            <div style={styles.button}>
              进入游戏
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const styles = {
  container: {
    width: '7.2rem',
    height: '12.08rem',
    backgroundColor: 'rgb(102,184,245)'
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '0.6rem',
    paddingLeft: '0.6rem',
    alignItems: 'center'
  },
  userIcon: {
    width: '1rem',
    height: '1rem',
    backgroundColor: '#94d'
  },
  name: {
    fontSize: '0.3rem',
    color: '#000',
    margin: '0',
    padding: '0'
  },
  card: {
    fontSize: '0.24rem',
    color: '#fff'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '0.6rem'
  },
  icon: {
    width: '1rem',
    height: '1rem',
    backgroundColor: '#94d',
    borderRadius: '50%'
  },
  title: {
    fontSize: '0.26rem',
    color: '#000'
  },
  button: {
    width: '1.7rem',
    height: '0.6rem',
    borderRadius:  '0.3rem',
    backgroundColor: '#5ba',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

