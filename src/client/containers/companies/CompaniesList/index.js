import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Title, Grid, Card, Label, Text, TextField, Button, ConfirmDialog, InfoDialog, Finder } from 'components';
import CompanyItem from './components/CompanyItem/index';
import Sidebar from './components/Sidebar/index';
import classNames from 'classnames';
import styles from './styles';
import { CircularProgress } from 'material-ui';
import { extendCodeValues } from '../selectors';

import {
	loadCompanies,
	fuzzySearchLoadCompanies,
	clearFuzzySearchLoadedCompanies,
	suggestionInputValueChange,
	removeCompany,
	componentLeave,
} from './actionCreators/companiesList';

import {
	updateStateWithUrlSource,
	updateUrlWithStateSource,
	addSubway,
	removeSubway,
	addBreed,
	removeBreed,
	setIsWorkingNow,

	setupInitialFilterState,

	suggestionFilterChange,
	checkboxesBlockFilterChange,
	handleSuggestionSearch,
} from './actionCreators/filter';


@translate(['companiesList'])
@withStyles(styles)
class CompaniesListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isWorkingTimeDialogOpened: false,
			isConfirmDialogOpened: false,
			isPhonesDialogOpened: false,
			cities: [],
			daysOfWeekWorkingTime: [],
			company: {},
			phones: []
		};
	}

	componentDidMount() {
		const { updateStateWithUrlSource, match, loadCompanies, location } = this.props;
		const { companyCategoryId, companySubcategoryId, countryId, cityId } = match.params;

		const searchParams = new URLSearchParams(location.search);
		searchParams.append('companyCategoryId', companyCategoryId);
		searchParams.append('companySubcategoryId', companySubcategoryId);
		if (countryId) {
			searchParams.append('selectedCountryId', countryId);
		}
		if (cityId) {
			searchParams.append('selectedCityId', cityId);
		}

		this.state.companyBaseUrl = `/company/${companyCategoryId}/${companySubcategoryId}/company/`;
		updateStateWithUrlSource(searchParams);
		loadCompanies();
	}

	handleSuggestionsFetchRequested = (change) => {
		if (this.props.main.suggestionInputValue !== change.value) {
			this.props.fuzzySearchLoadCompanies({
				searchQuery: change.value,
				subcategoryId: this.props.match.params.companySubcategoryId,
			});
		}
	};

	handleChange = (event, { newValue }) => {
		this.props.suggestionInputValueChange(newValue);
	};

	handleOpenWorkingTimeDialog = (daysOfWeekWorkingTime) => {
		this.setState({
			isWorkingTimeDialogOpened: true,
			daysOfWeekWorkingTime
		});
	};

	handleOpenPhonesDialog = (phones) => {
		this.setState({
			isPhonesDialogOpened: true,
			phones
		});
	};

	handleAction = (company) => {
		this.setState({ isConfirmDialogOpened: true, company });
	};

	deleteCompany = () => {
		this.setState({ isConfirmDialogOpened: false });
		this.props.removeCompany(this.state.company.companyId);
	};

	blockCompany = () => {
		// action to block company
	};

	componentWillUnmount() {
		this.props.componentLeave();
	}

	render() {
		const { t, companies, classes, match, main, clearFuzzySearchLoadedCompanies } = this.props;

		return (
			<Grid container className="my-3">
				<Grid item xs={9} className={classes.companiesListBlock}>
					<Card className={classNames(classes.searchInputWrapper)}>
						<Finder
							values={main.fuzzySearchCompanies}
							placeholder={t('SECTION_SEARCH')}
							value={main.suggestionInputValue}
							onChange={this.handleChange}
							handleSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
							handleSuggestionsClearRequested={clearFuzzySearchLoadedCompanies}
							suggestionData={{
								getLink: company => `/company/${company.categoryId}/${company.subcategoryId}/company/${company.url_id}`,
								getLogo: company => company.logo,
								getTitle: company => company.name,
								getDescription: company => company.description
							}}
						/>
					</Card>
					<div className={classes.companiesList}>
						{
							main.isLoading ?

								<CircularProgress className={classes.progressCircle} /> :

								companies.map(company => {
									return (
										<CompanyItem
											key={company.companyId}
											companyBaseUrl={this.state.companyBaseUrl}
											company={company}
											match={match}
											deleteAction={this.deleteCompany}
											blockAction={this.blockCompany}
											handleOpenWorkingTimeDialog={this.handleOpenWorkingTimeDialog}
											handleOpenPhonesDialog={this.handleOpenPhonesDialog}
											handleAction={this.handleAction}/>
									);
								})
						}
					</div>
				</Grid>

				<Grid item xs={3}>
					<Sidebar
						history={this.props.history}
						filter={this.props.filter}
						filterValues={this.props.filterValues}
						setIsWorkingNow={this.props.setIsWorkingNow}
						updateUrlWithStateSource={this.props.updateUrlWithStateSource}
						loadCompanies={this.props.loadCompanies}
						category={this.props.match.params.companyCategoryId}
						subcategory={this.props.match.params.companySubcategoryId}
						setupInitialFilterState={this.props.setupInitialFilterState}

						suggestionFilterChange={this.props.suggestionFilterChange}
						checkboxesBlockFilterChange={this.props.checkboxesBlockFilterChange}

						handleSuggestionSearch={this.props.handleSuggestionSearch}
					/>
				</Grid>

				<InfoDialog
					open={this.state.isPhonesDialogOpened}
					title="Телефоны"
					message="Message"
					closeCallback={() => this.setState({ isPhonesDialogOpened: false })}>
					{
						this.state.phones && this.state.phones.map(item => (
							<div key={item.phoneId} className="mt-2">
								<Label>{item.phone}</Label>
							</div>
						))
					}
				</InfoDialog>
				<InfoDialog
					open={this.state.isWorkingTimeDialogOpened}
					title="Время работы"
					closeCallback={() => this.setState({ isWorkingTimeDialogOpened: false })}>
					{
						this.state.daysOfWeekWorkingTime.map(time => {
							const open = time.open.substring(0, time.open.lastIndexOf(':'));
							const close = time.close.substring(0, time.close.lastIndexOf(':'));
							return (
								<div key={time.dayOfWeek} className={classNames(classes.flexRow, 'mt-2')}>
									<Label>{time.dayOfWeekName}</Label>
									<Label className="ml-3">{`${open} - ${close}`}</Label>
								</div>
							);
						})
					}
				</InfoDialog>

				<ConfirmDialog
					open={this.state.isConfirmDialogOpened}
					message={this.state.company.message}
					title={this.state.company.title}
					okCallback={this.state.company.action}
					closeCallback={() => this.setState({ isConfirmDialogOpened: false })}/>
			</Grid>
		);
	}
}

const getCommon = (state) => state.common;
const getFilter = (state) => state.companiesList.filter;
const getSuggestionQueries = (state) => state.companiesList.filter.suggestionQueries;
const getCompanies = (state) => state.companiesList.main.companies;

const getFlatCompanies = createSelector(
	[getCompanies],
	(companies) => {
		return companies.map(company => {
			let mainLocation = company.locations.find(location => (location.isMain === 1));
			if (!mainLocation) {
				if (company.locations.length > 0) {
					mainLocation = company.locations[0];
				} else {
					mainLocation = {
						workingTimes: [],
						phones: []
					};
				}
			}
			const phonesText = mainLocation.phones ? mainLocation.phones.map(p => (p.phone)).join(', ') : 'Телефонов нет';

			return {
				...company,
				mainLocation,
				phonesText
			};
		});
	}
);


const mapCodeValue = (item) => ({
	value: item.value,
	label: item.label,
	sort: item.sort
});


const getCountries = createSelector(
	[getCommon], (common) => common.countries
);
const getQueriedCountries = searchConnectedSelector('countries', getCountries);

const getCities = createSelector(
	[getCommon, getFilter], (common, filter) => {
		const selectedCountry = filter.sidebarFilters.countries;

		const foundCountry = common.countries.find(country => country.value === selectedCountry);

		if (foundCountry) {
			return foundCountry.cities
				.reduce((acc, item) => acc.concat(item, item.subCities), [])
				.sort((a, b) => a.sort - b.sort);
		}
		return [];
	}
);
const getQueriedCities = searchConnectedSelector('cities', getCities);

const getCitiesEnabled = createSelector(
	[getFilter], (filter) => {
		return !!filter.sidebarFilters.countries;
	}
);

const getSubways = createSelector(
	[getCities, getFilter], (cities, filter) => {
		const selectedCity = filter.sidebarFilters.cities;
		const foundCity = cities.find(city => city.value === selectedCity);

		return foundCity ? foundCity.subways : [];
	}
);
const getSubwaysEnabled = createSelector(
	[getFilter], (filter) => {
		return !!filter.sidebarFilters.cities;
	}
);

const getDrugsTypes = createSelector(
	[getCommon], (common) => common.drugsTypes
);

const getTorgTypes = createSelector(
	[getCommon], (common) => common.torgTypes
);

const getDirections = createSelector(
	[getCommon], (common) => common.specialistDirections
);

const getClinicsServices = createSelector(
	[getCommon], (common) => common.clinicsServices
);

const getAnimals = createSelector(
	[getCommon], (common) => common.animals
);
const getQueriedAnimals = searchConnectedSelector('animals', getAnimals);

function containsFilter(substring, option) {
	return option.label.search(new RegExp(substring, 'i')) !== -1;
}

function searchConnectedSelector(name, getAllValuesSelector) {
	return createSelector(
		[getAllValuesSelector, getSuggestionQueries], (allValues, suggestionQueries) => {
			const searchQuery = suggestionQueries[name];

			if (searchQuery) {
				return allValues.filter(containsFilter.bind(null, searchQuery));
			}
			return allValues;
		}
	);
}







const getBreeds = createSelector(
	[getCommon, getFilter], (common, filter) => {
		const selectedAnimal = common.animals.find(animal => animal.value === filter.selectedAnimalId);
		if (selectedAnimal) {
			return selectedAnimal.breeds;
		}
		return [];
	}
);
const getBreedsEnabled = createSelector(
	[getFilter], (filter) => {
		return !!filter.animals;
	}
);


const CompaniesList = connect(
	state => {
		return {
			common: extendCodeValues()(state),
			main: state.companiesList.main,
			companies: getFlatCompanies(state),
			filter: state.companiesList.filter,
			filterValues: {
				countries: {
					values: getQueriedCountries(state),
					enabled: true
				},
				cities: {
					values: getQueriedCities(state),
					enabled: getCitiesEnabled(state)
				},
				subways: {
					values: getSubways(state),
					enabled: getSubwaysEnabled(state)
				},
				animals: {
					values: getQueriedAnimals(state),
					enabled: true
				},
				breeds: {
					values: getBreeds(state),
					enabled: getBreedsEnabled(state)
				},
				drugsTypes: {
					values: getDrugsTypes(state),
					enabled: true
				},
				torgTypes: {
					values: getTorgTypes(state),
					enabled: true
				},
				directions: {
					values: getDirections(state),
					enabled: true
				},
				clinicsServices: {
					values: getClinicsServices(state),
					enabled: true
				},
			},
		};
	},
	{
		loadCompanies,

		fuzzySearchLoadCompanies,
		clearFuzzySearchLoadedCompanies,
		suggestionInputValueChange,

		updateStateWithUrlSource,
		updateUrlWithStateSource,

		addSubway,
		removeSubway,
		removeCompany,
		addBreed,
		removeBreed,

		setIsWorkingNow,

		componentLeave,

		setupInitialFilterState,


		suggestionFilterChange,
		checkboxesBlockFilterChange,

		handleSuggestionSearch
	}
)(CompaniesListContainer);

export default CompaniesList;