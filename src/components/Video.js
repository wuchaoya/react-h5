/**
 * Created by chao on 2017/9/25.
 */
import React, { Component } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

class MyVideo extends Component {
  render () {
    return (
      <Video
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
}

export default MyVideo;
