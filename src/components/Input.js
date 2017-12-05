/**
 * Created by chao on 2017/10/24.
 */

import React, { Component } from 'react';

export default class Input extends Component {
  render () {
    return (
      <input
        ref={this.props.name}
        onChange={this.props.onChange}
        value={this.props.value}
        placeholder={this.props.placeholder}
        autoFocus={this.props.autoFocus}
        style={Object.assign(
          {}, styles.inputstyle,
          this.props.type === 'password' ? { borderTop: '0 solid #ddd' } : {}
          )}
        type={this.props.type} />
    );
  }
};

const styles = {
  inputstyle:{
    display: 'flex',
    flex:'1',
    marginLeft:'0.8rem',
    marginRight:'0.8rem',
    height:'0.9rem',
    width: '5.6rem',
    color: '#666',
    backgroundColor: '#f5f5f5',
    borderWidth: '0px',
    borderStyle: 'none',
    borderColor:'#ddd',
    padding:'0',
    fontSize: '0.26rem',
    borderBottom: '0.01rem solid #e5e5e5',
    borderTop: '0.01rem solid #e5e5e5',
    outline:'none',
    caretColor:'#999'
  }
};
