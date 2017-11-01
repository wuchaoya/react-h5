/**
 * Created by chao on 2017/10/31.
 */

import React, { Component } from 'react';
import ActFours from '../components/ActFours';

export default class Activity extends Component {
  render () {
    return (
      <div>
        <ActFours />
        <div style={styles.textContainer}>
          <div style={styles.line}>
            <h2 style={styles.title}>产品规则:</h2>
            <p style={styles.text}>每个用户同个周期(5天内)只能办理一次，不能重复办理。</p>
          </div>
          <div>
            <h2 style={styles.title}>权益:</h2>
            <p style={styles.text}>1、订购用户享受20GB省内流量(有效期5天)</p>
            <p style={styles.text}>2、订购即送咪咕斗地主5000乐豆、100张兑换券、10张参赛券尊享礼包。
              (备注：订购后页面领取，权益即刻到账；非页面领取10个工作日内到账，道具有效期以游戏内为准。)
            </p>
            <p style={styles.text}>3、订购用户从订购之日算起，通过权益领取页面或者其他方式登陆进入
              咪咕云游戏H5页面，享受4个月云游戏不限时长.
            </p>
          </div>
        </div>
        <div style={styles.center}>
          <div style={styles.button}>
            我要办理
          </div>
        </div>
      </div>
    );
  }
  componentWillMount () {
    document.getElementsByTagName('html')[0].style.background = '#fff';
    document.getElementsByTagName('body')[0].style.background = '#fff';
  }
};

const styles = {
  textContainer: {
    paddingRight:'0.48rem',
    paddingLeft:'0.48rem'
  },
  title: {
    fontSize:'0.26rem',
    color:'#fd7303',
    fontWeight:'900',
    fontFamily: 'Microsoft YaHei',
    margin: '0',
    padding:'0',
    marginTop:'0.4rem',
    marginBottom:'0.22rem'
  },
  text: {
    fontSize:'0.26rem',
    color:'#343434',
    fontFamily:'Lantinghei SC',
    fontWeight:'400',
    lineHeight:'0.4rem',
    margin:'0',
    padding:'0',
    marginBottom:'0.32rem'
  },
  button: {
    width: '4.36rem',
    height:'0.69rem',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background:'#fd7303',
    fontSize:'0.3rem',
    fontFamily:'Lantinghei SC',
    color:'#fff',
    fontWeight:'400',
    borderRadius:'0.12rem'
  },
  center: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'0.97rem',
    borderTop: '0.01rem solid #ededed'
  },
  line: {
    borderBottom:'0.01rem solid #ededed'
  }
};
