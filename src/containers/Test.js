/**
 * Created by chao on 2017/10/16.
 */

import React, { Component } from 'react';

import Gesture from 'rc-gesture';

export default class ScrollView extends Component {
  render () {
    return (
      <Gesture

        onTap={(gestureStatus) => { console.log(gestureStatus); }}
        onSwipeLeft={(gestureStatus) => { console.log(gestureStatus); }}
      >
        <div style={styles.divStyle}>
          <div style={styles.itemStyle} />
          <div style={styles.itemStyle} />
          <div style={styles.itemStyle} />
          <div style={styles.itemStyle} />
        </div>
      </Gesture>
    );
  }
};

const styles = {
  divStyle: {
    height: '4rem',
    width: '4rem',
    backgroundColor:'#eee',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  itemStyle: {
    width: '2rem',
    height: '4rem',
    backgroundColor:'red',
    marginRight:'0.2rem'
  }
};

