/**
 * Created by chao on 2017/10/31.
 */

import React, { Component } from 'react';

export default class Activity extends Component {
  render () {
    return (
      <div>
        <div />
        <div>
          <div>
            <h2 style={styles.title}>产品规则:</h2>
            <p style={styles.text}>每个用户同个周期(5天内)只能办理一次，不能重复办理。</p>
          </div>
          <div>
            <h2 style={styles.title}>权益:</h2>
            <p style={styles.text}>1</p>
          </div>
        </div>
        <div />
      </div>
    );
  }
};

const styles = {
  title: {
    fontSize:'0.26rem',
    color:'#fd7303',
    fontWeight:'900',
    fontFamily: 'Microsoft YaHei'
  },
  text: {
    fontSize:'0.24rem',
    color:'#a85924',
    fontFamily:'Lantinghei SC'
  }
};
