/**
 * Created by chao on 2017/10/26.
 */

import React, { Component } from 'react';

import Iframe from 'react-iframe';

export default class WebView extends Component {
  render () {
    return (
      <div style={styles.viewStyle}>
        <Iframe
          url={this.props.src}
          width='100%' height='100%'
          display='initial'
          position='relative'
          allowFullScreen />
      </div>
    );
  }
};

const styles = {
  viewStyle: {
    width: '7.2rem',
    height: '12.8rem',
    position: 'fixed',
    top:'0',
    left:'0'
  }
};
