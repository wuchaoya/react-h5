/**
 * Created by chao on 2017/11/28.
 * 按钮
 */

import * as React from 'react';

export default class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	render () {
		let props = this.props;
		return (
			<div
				onClick={this.props.onClick}
				style={
					Object.assign(
						{},
						styles.buttonStyle,
						{border: props.border || '0.01rem solid #b5d185',
							borderRadius: props.radius || '0.26rem',
							color: props.color || '#83b233',
							background: props.background || '#fff',
							margin: props.margin || '0.3rem 0 0 0',
							padding: props.padding || '0',
							fontSize: props.size || '0.22rem',
							height: props.height || '0.52rem',
							width: props.width || '1.2rem',
						})}
			>
        <span>
          {props.buttonText}
        </span>
			</div>
		);
	}
}

const styles = {
	buttonStyle: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '0.52rem',
		width: '1.2rem',
		border: '0.01rem solid #b5d185',
		backgroundColor: '#fff',
		borderRadius: '0.26rem',
		color: '#83b233',
		marginTop: '0.3rem',
		position: 'absolute',
		right: '0.3rem',
		fontSize: '0.22rem'
	}
};