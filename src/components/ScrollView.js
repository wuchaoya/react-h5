/**
 * Created by chao on 2017/9/12.
 */
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
const styles = {
  root: {
    padding: '0.18rem',
    backgroundColor: '#fff',
    marginTop: '0.12rem'
  },
  slideContainer: {
    marginRight: '0.18rem',
  },
  slide: {
    padding: 15,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900'
  },
  slide2: {
    backgroundColor: '#B3DC4A'
  },
  slide3: {
    backgroundColor: '#6AC0FF'
  },
  imgStyle: {
    height: '2.32rem'

  },
  container: {
    width: 'auto'
  }
};
// 720 1280   880 495
export default class ScrollView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      img: null,
      imgx:{
        height: '2.32rem',
        width: 880 / (495 / 2.32) + 'rem'
      },
      imgy: {
        height: '2.32rem',
        width: 720 / (720 / 2.32) + 'rem'
      }
    };
  }
  render () {
    console.log(this.state.img ? this.state.imgy.width : this.state.imgx.width);
    return (
      <SwipeableViews
        containerStyle={{ height:'2.32rem', backgroundColor:'red', width:this.state.img ? this.state.imgy.width : this.state.imgx.width }}
        enableMouseEvents={true}
        style={styles.root}
        slideStyle={styles.slideContainer}>
        {this.props.data.map((item, index) => {
          return (
            <img
              ref='img'
              key={index}
              alt=''
              height={'100%'}
              width={'100%'}
              style={this.state.img == null ? null : (this.state.img === true ? this.state.imgy : this.state.imgx)}
              src={item} />
          );
        })}
      </SwipeableViews>
    );
  }
  getImgNaturalDimensions (src) {
  }
  componentDidMount () {
    console.log(this.refs.img.height);
    console.log(this.refs.img.width);
    setTimeout(() => {
      if (this.refs.img.height > this.refs.img.width) {
        this.setState({
          img: true
        }, () => {
          console.log(this.state);
        });
      } else {
        this.setState({
          img: false
        }, () => {
          console.log(this.state.img);
        });
      }
      }, 100);
  }
}
