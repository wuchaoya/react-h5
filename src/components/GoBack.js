/**
 * Created by chao on 2017/10/24.
 */

import React, { Component } from 'react';

export default class GoBack extends Component {
  render () {
    return (
      <div>
        <div style={styles.iconStyle} />
      </div>
    );
  }
};

const styles = {
  container:{
    display:'flex',
    flex:'1'
  },
  iconStyle: {
    width: '0.3rem',
    height: '0.3rem',
    borderLeft: '0.01rem solid #000',
    borderTop: '0.01rem solid #000'
  }
};

