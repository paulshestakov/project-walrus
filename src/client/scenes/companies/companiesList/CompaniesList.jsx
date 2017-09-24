import React from 'react';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card} from "components";
import CompanyItem from './companyItem/CompanyItem'
import Sidebar from './sidebar/Sidebar';
import classNames from 'classnames';
import styles from './styles';


@translate(['companiesList'])
@withStyles(styles)
export default class CompaniesList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadCompaniesCodeValues();

		const searchParams = new URLSearchParams(this.props.location.search);
		this.props.updateStateWithUrlSource(searchParams);




		this.props.loadCompanies();
	}

	render() {
		const {t, classes, ...other} = this.props;

		return (
			<Grid container className="mt-4">
				<Grid item md={9}>
					<Card className={classes.inputWrapper}>
						<Input placeholder={t('SECTION_SEARCH')} className={classNames(classes.searchInput, 'm-2', 'mt-3')} />
					</Card>
					{
						this.props.main.companies.map(company => {
							return (
								<CompanyItem company={company} />
							);
						})
					}
				</Grid>

				<Grid item md={3}>
					<Sidebar
						filter={this.props.filter}

						cities={this.props.common.cities}

					/>
				</Grid>
			</Grid>
		);
	}
}