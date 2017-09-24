import { combineReducers } from 'redux';

import newPromoReducer from './newPromo/newPromo';
import newCompanyReducer from './newCompany'

import promoPageReducer from './promoPage/promoPage';
import companyPageReducer from './companyPage/companyPage';

import promosListReducer from './promosList/promosListReducer';
import filterReducer from './promosList/filterReducer';

import companiesListReducer from './companiesList/companiesListReducer';
import companiesFilterReducer from './companiesList/filterReducer';

import commonReducer from './common/common';

const rootReducer = combineReducers({
	common: commonReducer,
	newPromo: newPromoReducer,
	newCompany: newCompanyReducer,
	promoPage: promoPageReducer,
	companyPage : companyPageReducer,

	promosList: combineReducers({
		main: promosListReducer,
		filter: filterReducer,
	}),

	companiesList: combineReducers({
		main: companiesListReducer,
		filter: companiesFilterReducer,
	}),
});

export default rootReducer;
