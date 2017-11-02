/**
 * Created by chao on 2017/11/1.
 */
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize, bindKeyboard } from 'react-swipeable-views-utils';

import banner1 from '../assets/banner-庞然巨物.jpg';
import banner2 from '../assets/banner-我的宠物Pou.jpg';
import banner3 from '../assets/banner-逃离实验室.jpg';
import banner4 from '../assets/banner-飞翔彩虹猫.jpg';

const EnhancedSwipeableViews = bindKeyboard(autoPlay(virtualize(SwipeableViews)));
const data = [banner1, banner2, banner3, banner4];

export default class ActFours extends Component {
  constructor (props) {
    super(props);
    this.state = {
      index:0
    };
    this.slideRenderer = this.slideRenderer.bind(this);
  }
  slideRenderer (params) {
    const { index, key } = params;
    return (
      <img
        alt=''
        src={
          // eslint-disable-next-line
          data[index]
        }
        style={styles.slide} key={key} />
    );
  }
  indexRender (data) {
    return (
      <div style={styles.spanList}>
        {data.map((item, index) => {
          return <span key={'span_' + index} style={
            Object.assign({}, styles.spanStyle, this.state.index === index ? styles.selectStyle : {})
          } />;
        })}
      </div>
    );
  }
  render () {
    return (
      <div style={styles.container}>
        <EnhancedSwipeableViews onChangeIndex={
          (index, indexLatest) => {
            this.setState({
              index: index
            });
          }
        } slideCount={data.length} slideRenderer={this.slideRenderer} />
        {this.indexRender(data)}
      </div>
    );
  }
}
const styles = {
  container: {
    position: 'relative'
  },
  slide: {
    width: '7.2rem',
    height: '4.06rem'
  },
  spanStyle: {
    display:'inline-block',
    width: '0.18rem',
    height: '0.18rem',
    borderRadius:'50%',
    backgroundColor:'#fff',
    marginLeft:'0.1rem'
  },
  spanList: {
    position: 'absolute',
    right: '0.3rem',
    bottom:'0.18rem'
  },
  selectStyle: {
    backgroundColor:'#fc9100',
    opacity:'1'
  }
};

