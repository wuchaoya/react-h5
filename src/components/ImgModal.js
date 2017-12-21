/**
 * Created by chao on 2017/12/21.
 */
import React, { Component } from 'react';

import Modal from './ModalC';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
	dots: true,
	infinite: false,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1
};

export default class ImgModal extends Component {
	render () {
		return (
			<Modal style={styles.container} onClick={this.props.onClick}  component={this._render()} />
		);
	}
	_render () {
		return (
			<Slider initialSlide={this.props.index} {...settings}>
				{this.props.data.map((url, index) => {
					return <img  key={index} height='100%' width='100%' src={url} />;
				})}
			</Slider>
		);
	}
};

const styles = {
	container: {
		justifyContent: 'flex-start',
	}
};