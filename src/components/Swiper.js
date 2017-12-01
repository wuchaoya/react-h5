/**
 * Created by chao on 2017/11/27.
 *
 */

import React, { Component } from 'react';
import Gesture from 'rc-gesture';
/**
 * dataList : 图片
 * autoplay : 自动播放
 * speed : 切换速度
 * onClick：点击事件
 * width : 切换宽度
 * slideStyle : 样式
 * showIndex : 显示索引
 * component : 自定义
 * initialSlide ：初始时index
 */

let time;

export default class Swiper extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			translate: props.initialSlide * (props.width || 7.2) || 0,
			width: props.width || 7.2,
			initialSlide: props.initialSlide || 0
		};
	}
	
	render () {
		let { dataList, slideStyle, showIndex, component, onClick }= this.props;
		return (
			<Gesture onSwipeLeft={() => this.ononSwipe(true)} onSwipeRight={() => this.ononSwipe(false)}>
				<div style={styles.overflow}>
					<div style={Object.assign({}, styles.container, {transform: 'translateX(' + this.state.translate + 'rem)'})}>
						{dataList.map((item, index) => {
							if (component !== undefined) {
								return component(item, index);
							}
							return (
								<div key={index} onClick={() => onClick(index)}>
									<img height='100%' width='100%' style={slideStyle || styles.slide} src={item.cover} alt=''/>
								</div>
							);
						})}
					</div>
					{showIndex ? <div style={styles.dotList}>
						{
							dataList.map((item, index) => {
								return (
									<span style={Object.assign({}, styles.dot, Math.abs(this.state.translate / this.state.width) === index ? styles.selectDotStyle : {})} key={index} />
								);
							})
						}
					</div> : null}
				</div>
			</Gesture>
		);
	}
	
	ononSwipe (state) {
		let props = this.props;
		if (this.state.initialSlide === props.dataList.length) {
			return;
		}
		if (state) {
			if (this.state.translate === - this.state.width * (props.dataList.length - 1 )) { return; }
			this.setState({
				translate: ((this.state.initialSlide + 1) * ( - this.state.width )),
				initialSlide: this.state.initialSlide + 1
			});
		} else {
			if (this.state.initialSlide === 0) { return; }
			this.setState({
				translate: ((this.state.initialSlide - 1) * ( - this.state.width )),
				initialSlide: this.state.initialSlide - 1
			});
		}
	}
	
	autoplay () {
		let props = this.props;
		if (!this.props.autoplay) {
			return;
		}
		time = window.setInterval(
			() => {
				if (this.state.translate === - this.state.width * (props.dataList.length - 1 )) {
					this.setState({
						translate: 0
					});
					return;
				}
				this.setState({
					translate: (this.state.translate * 100 - this.state.width * 100) / 100
				}); },
			props.speed || 2500);
	}
	
	componentDidMount () {
		this.autoplay();
	}
	
	componentWillUnmount () {
		window.clearInterval(time);
	}
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		transition: 'all 0.3s'
	},
	slide: {
		width: '7.2rem',
		height: '2.88rem'
	},
	spanStyle: {
		display: 'inline-block',
		width: '0.18rem',
		height: '0.18rem',
		borderRadius: '50%',
		backgroundColor: '#fff',
		marginLeft: '0.1rem',
		opacity: '0.4'
	},
	spanList: {
		position: 'absolute',
		right: '0.3rem',
		bottom: '0.18rem'
	},
	selectStyle: {
		backgroundColor: '#c2ff1d',
		opacity: '1'
	},
	overflow: {
		overflow: 'hidden',
		position: 'relative'
	},
	dot: {
		display: 'inline-block',
		width: '0.18rem',
		height: '0.18rem',
		borderRadius: '50%',
		backgroundColor: '#fff',
		marginLeft: '0.1rem',
		opacity: '0.4'
	},
	dotList: {
		position: 'absolute',
		right: '0.3rem',
		bottom: '0.18rem'
	},
	selectDotStyle: {
		backgroundColor: '#c2ff1d',
		opacity: '1'
	}
};