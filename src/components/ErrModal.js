/**
 * Created by chao on 2017/10/26.
 */
import React, { Component } from 'react';

import Modal from './ModalC'

export default class ErrModal extends Component {
  render () {
    return (
      <Modal>
        <div style={
          Object.assign({}, styles.container, this.isWeiXin() ? { marginTop: '-2rem' } : {})}>
          <div style={styles.title}>
            {this.props.title}
          </div>
          <div style={styles.containerBottom}>
            <div onClick={this.props.onCancel} style={Object.assign({}, styles.button, styles.line)}>取消</div>
            <div onClick={this.props.onConfirm} style={Object.assign({}, styles.button, styles.green)}>确定</div>
          </div>
        </div>
      </Modal>
    );
  }
};

const styles = {
  container: {
    height:'2.64rem',
    width: '5.3rem',
    backgroundColor: '#f2f2f2',
    borderRadius:'0.12rem'
  },
  containerBottom: {
    height: '1.06rem',
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  title: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'1.58rem',
    fontSize:'0.26rem',
    color:'#666',
    borderBottom: '0.01rem solid #ddd'
  },
  button: {
    height: '0.4rem',
    width: '2.65rem',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    color:'#666'
  },
  line: {
    borderRight: '0.01rem solid #ddd'
  },
  green: {
    color: '#83b233'
  }
};
