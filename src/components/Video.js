/**
 * Created by chao on 2017/9/25.
 */
import React, { Component } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

class MyVideo extends Component {
  render () {
    return (
      <Video ref='video'
        muted controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
        // eslint-disable-next-line
        poster={this.props.img}
        // eslint-disable-next-line
        src={this.props.video}
        onCanPlayThrough={() => {
               // Do stuff
        }} />
    );
  }
  componentDidMount () {
  }
}

export default MyVideo;
