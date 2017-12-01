/**
 * Created by chao on 2017/10/24.
 */

import React, { Component } from 'react';

import icon from '../assets/img/back-h5@2x.png';

export default class GoBack extends Component {
  render () {
    return (
      <div style={styles.container}>
        <div onClick={this.props.onClick}>
          <img style={styles.iconStyle} src={icon} alt='' />
        </div>
      </div>
    );
  }
};

const styles = {
  container:{
    display:'flex',
    flex:'1',
    height:'0.88rem',
    alignItems:'center'
  },
  iconStyle: {
    width: '0.17rem',
    height: '0.31rem',
    padding:'0.4rem',
    paddingTop:'0.5rem',
    marginTop:'0.1rem'
  }
};

