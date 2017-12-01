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
          this.props.data[index].cover
        }
        onClick={() =>{this.props.click(this.props.data[index].gid)}}
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
        } slideCount={this.props.data.length} slideRenderer={this.slideRenderer} />
        {this.indexRender(this.props.data)}
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
    height: '2.88rem'
  },
  spanStyle: {
    display:'inline-block',
    width: '0.18rem',
    height: '0.18rem',
    borderRadius:'50%',
    backgroundColor:'#fff',
    marginLeft:'0.1rem',
    opacity:'0.4'
  },
  spanList: {
    position: 'absolute',
    right: '0.3rem',
    bottom:'0.18rem'
  },
  selectStyle: {
    backgroundColor:'#c2ff1d',
    opacity:'1'
  }
};

