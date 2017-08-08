import React from 'react';
import { translate } from 'react-i18next';
import { Grid, Title, Button, Card, Label, Textarea, TextField, Input } from 'components';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import PromoItem from './components/promoItem/PromoItem';
import SearchInput from './components/searchInput/SearchInput';
import SideBar from "./components/sidebar/SideBar";

import Tabs, { Tab } from 'material-ui/Tabs';

import {buildUrl} from "../../actionCreators/promos";



const styleSheet = createStyleSheet({
	tabs: {
		'& button': {
			minWidth: 'auto',
			display: 'flex',
			flexGrow: 1
		}
	}
});




@translate(['promos', 'common'])
@withStyles(styleSheet)
class Promos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTabIndex: 0,
			filter : {
				animal : 'DOG',
				breeds : [],
				cities : ['MINSK']
			}
		};
        this.props.history.push({search : buildUrl(null, this.state.filter)});
	}

	componentDidMount() {
        this.props.loadPromos(this.state.filter);
		this.props.loadCodeValues();
		this.props.loadBreeds(this.state.filter.animal);
	}

	handleFilterChanged = (event) => {
		let target = event.target;
		let filter = this.state.filter;

		let value = event.value;

		if (value) {
            filter.breeds = [];
            filter.animal = value;

            this.props.loadBreeds(value);

		} else if (['cities', 'breeds'].indexOf(target.name) > -1) {
			let checked = target.checked;
			let value = target.value;

			if (checked) {
				filter[target.name].push(value);
			} else {
				let index = filter[target.name].indexOf(value);
				filter[target.name].splice(index, 1);
			}
		}

		this.setState({filter});
		this.props.history.push({search : buildUrl(null, this.state.filter)});
		this.props.loadPromos(this.state.filter);
	};

	handleTabPress = (event, index) => {
		this.setState({
			selectedTabIndex: index
		});
	};

	render() {
		const t = this.props.t;
		const classes = this.props.classes;

		return (
			<Grid container md="12" className="mt-2">
				<Grid item md="9">

					<Card>
						<Grid container direction="column">
							<Grid item>
								<div className="m-2">
									<Input placeholder={t('SECTION_SEARCH')} className="w-100" />
								</div>
							</Grid>

							<Grid item>
								<Tabs
									index={this.state.selectedTabIndex}
									onChange={this.handleTabPress}
									indicatorColor="primary"
									textColor="primary"
									classes={{
										root: classes.tabs
									}}
								>
									<Tab label={t('common:WILL_SELL')} />
									<Tab label={t('common:WILL_BUY')} />
									<Tab label={t('common:WILL_GIVE_GIFT')} />
									<Tab label={t('common:WILL_ACCEPT_GIFT')} />
									<Tab label={t('common:LOST')} />
									<Tab label={t('common:FOUND')} />
								</Tabs>
							</Grid>
						</Grid>
					</Card>

					{
						this.props.promos && this.props.promos.map(promo => {
							return (
								<Row>
									<PromoItem title={promo.title}
									   type={t(promo.type)}
									   imageSrc={promo.imageSrc}
									   date={promo.date}
									   description={promo.description}
									   price={promo.price}
									   className="my-3"/>
								</Row>

							);
						})
					}
				</Grid>

				<Grid item md="3">
					<SideBar onFilterChanged={this.handleFilterChanged}
						 animals={this.props.animals}
						 cities={this.props.cities}
						 breeds={this.props.breeds}
						 filter={this.state.filter} />
				</Grid>
			</Grid>
		);
	}
}

export default Promos;