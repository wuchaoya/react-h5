/**
 * Created by chao on 2017/9/25.
 */
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize, bindKeyboard } from 'react-swipeable-views-utils';

const EnhancedSwipeableViews = bindKeyboard(autoPlay(virtualize(SwipeableViews)));

export default class HomeFours extends Component {
  constructor (props) {
    super(props);
    this.state = {
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
          this.props.data[index].cover
        }
        onClick={() =>{this.props.click(this.props.data[index].gid)}}
        style={styles.slide} key={key} />
    );
  }
  render () {
    return (
      <EnhancedSwipeableViews slideCount={this.props.data.length} slideRenderer={this.slideRenderer} />
    );
  }
}
const styles = {
  slide: {
    width: '7.2rem',
    height: '2.88rem'
  }
};

