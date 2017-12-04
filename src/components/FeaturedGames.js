/**
 * Created by chao on 2017/11/28.
 * 首页精选游戏
 */


import * as React from 'react';
import {
	Text,
	Button,
	Swiper
} from '../components';

export default class FeaturedGames extends React.Component {
	
	constructor (props) {
		super(props);
		this.state = {
		};
		this.renderSlide = this.renderSlide.bind(this);
	}
	
	render () {
		let props = this.props;
		return (
			<div style={styles.container}>
				<div style={styles.topStyle}>
					<Text padding='0' color='#000' size={0.3} text='精选游戏' />
					<Button onClick={this.props.onClickButton} width='auto' height='auto' size='0.24rem' border='none' margin='0' buttonText='更多' />
				</div>
				<Swiper width={1.96} component={this.renderSlide} showIndex={false} autoplay={false} dataList={props.dataList} />
			</div>
		);
	}
	
	renderSlide (item, index) {
		let props = this.props;
		return (
			<div onClick={() => props.onClick(index)} style={styles.sildeaStyle} key={index}>
				<img style={styles.imgStyle} src={item.icon} alt={item.title}/>
				<span style={styles.textStyle}>{item.name}</span>
			</div>
		);
	}
	
}

const styles = {
	container: {
		display: 'flex',
		flex: '1',
		background: '#fff',
		marginTop: '0.18rem',
		paddingTop: '0.24rem',
		flexDirection: 'column',
		paddingLeft: '0.24rem'
	},
	topStyle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '0.24rem'
	},
	imgStyle: {
		width: '1.72rem',
		height: '1.72rem',
		borderRadius: '0.38rem'
	},
	textStyle: {
		width: '1.72rem',
		color: '#333',
		marginTop: '0.24rem',
		fontSize: '0.26rem',
		fontWeight: '400',
		display: '-webkit-box',
		textOverflow: 'ellipsis',
		OtextOverflow: 'ellipsis',
		WebkitBoxOrient: 'vertical',
		overflow: 'hidden',
		WebkitLineClamp: '2'
	},
	sildeaStyle: {
		display: 'flex',
		marginRight: '0.24rem',
		flexDirection: 'column',
	}
};