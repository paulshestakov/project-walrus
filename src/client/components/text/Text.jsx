import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';

import styles from './style.module.scss';

@CSSModules(styles)
export default class Text extends React.Component {
	render() {
		let accentStyleClass = '';

		switch (this.props.accent) {
			case 'grey':
				accentStyleClass = 'accentGrey';
				break;
		}

		const className = [
			this.props.styles.text,
			this.props.styles[accentStyleClass],
			this.props.className
		].join(' ');

		const style = {
			fontSize: this.props.fontSize
		};

		return (
			<p style={style} styleName="text" className={className}>
				{this.props.children}
			</p>
		);
	}
};

Text.defaultProps = {
	fontSize: '1rem'
};

Text.propTypes = {
	fontSize: PropTypes.string,
	accent: PropTypes.string
};
