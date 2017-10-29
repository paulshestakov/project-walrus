import React from 'react';
import {Route, Switch} from "react-router-dom";

import {Grid} from 'material-ui';

import {Header, Footer} from 'components';

import PromosList from "../promos/PromosList";
import NewPromo from "../promos/NewPromo";
import PromoPage from "../promos/PromoPage";
import CompanyRouter from "../companies/CompanyRouter";

import './styles.scss';


export default class Router extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		//this.props.loadUserInfo();
	}

	render() {
		return (
			<div className="appWrapper">
				<Header />

				<main>
					<Grid container justify="center" spacing={0}>
						<Grid item xs={11} md={9} className="flexGrowFull">
							<Switch>
								<Route path="/promoPage/:promoId" component={PromoPage} />
								<Route path="/newPromo" component={NewPromo} />
								<Route exact path='/promosList' component={PromosList} />

								<Route path="/company" component={CompanyRouter} />
							</Switch>
						</Grid>
					</Grid>
				</main>

				<Footer />
			</div>
		);
	}
}
