import React from 'react';
import { translate } from 'react-i18next';
import _ from 'lodash';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import Title from '../../components/title/Title.jsx';
import Button from '../../components/button/Button';
import Tabs from '../../components/tabs/Tabs';

import LostPromo from './components/LostPromo.jsx';
import FoundPromo from './components/FoundPromo.jsx';
import BuyOrSellPromo from './components/BuyOrSellPromo.jsx';
import GiveOrAcceptGiftPromo from './components/GiveOrAcceptGiftPromo.jsx';
import ImageUploader from 'imageUploader/ImageUploader';
import Input from 'input/Input';


@translate(['newPromo'])
class NewPromo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			promoType: 'LOST',
			imageObjects: []
		};
	}

	handleImageAdd = (imageObject) => {
		this.setState({imageObjects: [...this.state.imageObjects, imageObject]});
	};

	handleImageDelete = (imageIndex) => {
		this.setState({
			imageObjects: [
				...this.state.imageObjects.slice(0, imageIndex),
				...this.state.imageObjects.slice(imageIndex + 1)
			]
		});
	};

	handlePromoTypeSelected = (promoType) => {
		this.setState({promoType});
	};

	handleInputChange = (imageObjects) => {
		this.setState({imageObjects});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const formElements = e.target.elements;

		const formData = {
			lostAddress:	_.get(formElements.lostAddress, 'value', null),
			lostTime:		_.get(formElements.lostTime, 'value', null),

			foundAddress:	_.get(formElements.foundAddress, 'value', null),
			foundTime:		_.get(formElements.foundTime, 'value', null),

			gender:			_.get(formElements.gender, 'value', null),
			approximateAge:	_.get(formElements.approximateAge, 'value', null),

			price:			_.get(formElements.price, 'value', null),

			personName:		_.get(formElements.personName, 'value', null),
			personAddress:	_.get(formElements.personAddress, 'value', null),
			personPhone:	_.get(formElements.personPhone, 'value', null),
			personEmail:	_.get(formElements.personEmail, 'value', null),

			description:	_.get(formElements.description, 'value', null),

			images:	this.state.imageObjects.map(imageObject => imageObject.file)
		};

		this.props.handleSubmit(formData);
	};

	render() {
		const t = this.props.t;

		return (
			<Grid>
				<Row>
					<Col md={12}>
						<Form onSubmit={this.handleSubmit}>
							<Tabs activeKey={this.state.promoType}
								onSelect={this.handlePromoTypeSelected}
								className="mt-5"
								options={[
									{
										key: "LOST",
										tabTitle: t('LOST')
									},
									{
										key: "FOUND",
										tabTitle: t('FOUND')
									},
									{
										key: "BUY",
										tabTitle: t('WILL_BUY')
									},
									{
										key: "SELL",
										tabTitle: t('WILL_SELL')
									},
									{
										key: "GIVE_GIFT",
										tabTitle: t('WILL_GIVE_GIFT')
									},
									{
										key: "ACCEPT_GIFT",
										tabTitle: t('WILL_ACCEPT_GIFT')
									}
								]}
							/>

							<ImageUploader className="mt-5"
								imageObjects={this.state.imageObjects}
								onImageAdd={this.handleImageAdd}
								onImageDelete={this.handleImageDelete}
							/>

							<Title text={t('PROMO_NAME')} className="mt-5"/>
							<Input name="promoName" placeholder={t('ENTER_PROMO_NAME')} />

							{
								(this.state.promoType === 'LOST'
									&& <LostPromo />)
								||
								(this.state.promoType === 'FOUND'
									&& <FoundPromo />)
								||
								((this.state.promoType === 'BUY' || this.state.promoType === 'SELL')
									&& <BuyOrSellPromo />)
								||
								((this.state.promoType === 'GIVE_GIFT' || this.state.promoType === 'ACCEPT_GIFT')
									&& <GiveOrAcceptGiftPromo />)
							}

							<div className="d-flex justify-content-around">
								<Button type="submit"
									className="my-5"
									bsSize="large"
									accent="blue">
									{t('PUBLISH')}
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default NewPromo;



