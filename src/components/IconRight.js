/**
 * Created by chao on 2017/9/26.
 */

import React, { Component } from 'react';
let Iconright = require('react-icons/lib/fa/angle-right');

export default class IconRight extends Component {
  render () {
    return (
      // eslint-disable-next-line
      <Iconright fontSize={this.props.fontSize} style={{marginLeft:'-0.04rem',marginTop:'0.2rem'}} color={this.props.color} />
    );
  }
};
