/**
 * Created by chao on 2017/10/26.
 */

import React, { Component } from 'react';

export default class WebView extends Component {
  render () {
    return (
      <div ref='div' style={styles.viewStyle}>
        <iframe
          style={{
            width: '7.2rem',
            height: '12.8rem'
          }}
          title='开通包月'
          src={this.props.src}
          name='iframe'
          ref='iframe'
          width='100%' height='100%'
          frameBorder='0'
           />
      </div>
    );
  }
  componentDidMount () {
  }
};

const styles = {
  viewStyle: {
    width: '7.2rem',
    height: '12.8rem',
    position: 'fixed',
    top:'0',
    left:'0',
    zIndex:'999',
    overflowY:'scroll',
    WebkitOverflowScroll:'touch',
    overflowX:'hidden'
  }
};
