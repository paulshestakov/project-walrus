import React from 'react';
import { Link } from "react-router-dom";
import { Grid, Row, Col } from 'react-bootstrap';
import { translate, Interpolate, Trans } from 'react-i18next';

import Separator from '../../reusableComponents/separator/Separator';

import './styles/style.scss';
import Input from '../../reusableComponents/input/Input';
import Button from '../../reusableComponents/button/Button';

@translate(['footer'])
class Footer extends React.Component {
	render() {
		const t = this.props.t;

		return (
			<footer className={ ['footerWrapper', this.props.className || '' ].join(' ') }>
				<Grid>
					<Row>
						<Col md={3} className="d-flex flex-column">
							<Link to="/" className="my-2">
								{t('ABOUT_US')}
							</Link>
							<Link to="/" className="my-2">
								{t('EDITORIAL_POLICY')}
							</Link>
							<Link to="/" className="my-2">
								{t('PUBLIC_OFFER_CONTRACT')}
							</Link>
							<Link to="/" className="my-2">
								{t('CONTACTS')}
							</Link>
						</Col>

						<Col md={3} className="d-flex flex-column">
							<Link to="/" className="my-2">
								{t('PETS_MEINTENANCE_LEGAL_ISSUES')}
							</Link>
							<Separator/>
							<Link to="/" className="my-2">
								{t('SPECIAL_PROJECTS')}
							</Link>
						</Col>

						<Col md={3} className="d-flex flex-column">
							<Link to="/" className="my-2">
								{t('INSTAGRAM')}
							</Link>
							<Link to="/" className="my-2">
								{t('VK')}
							</Link>
							<Link to="/" className="my-2">
								{t('FB')}
							</Link>
							<Link to="/" className="my-2">
								{t('O')}
							</Link>
							<Link to="/" className="my-2">
								{t('YOUTUBE')}
							</Link>
						</Col>

						<Col md={3} className="d-flex flex-column align-items-start">
							<Link to="/" className="my-2">
								{t('SUBSCRIBE_FOR_NEWSLETTER')}
							</Link>
							<Input placeholder={t('ENTER_EMAIL')} className="my-2" />
							<Button text={t('SUBSCRIBE')}
								buttonType="passive"
								className="my-2" />
						</Col>
					</Row>

					<Row>
						<Col md={12}>
							<Separator />
						</Col>
					</Row>

					<Row>
						<Col md={12} className="d-flex justify-content-around my-2">
							{t('BOTTOM_INFO')}
						</Col>
					</Row>
				</Grid>
			</footer>
		);
	}
}

export default Footer;