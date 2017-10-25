import {
	LOAD_PROMO_CODE_VALUES_SUCCESS,
	LOAD_COMPANIES_CODE_VALUES_SUCCESS,
	LOAD_USER_INFO_SUCCESS
} from '../../actionCreators/common/common.js';

const defaultState = {
	animals: [],
	animalsAreLoaded: false,
	user: {
		role: 5
	},

	cities: [],
	subway: [],
	citiesAreLoaded: false,

	companiesCategories: [],
	companiesCategoriesAreLoaded: false,

	daysOfWeek: []
};

const commonReducer = (state = defaultState, action) => {
	switch (action.type) {

		case LOAD_PROMO_CODE_VALUES_SUCCESS:
			return {
				...state,

				animals: action.payload.animals,
				animalsAreLoaded: true,

				cities: action.payload.cities,
				citiesAreLoaded: true
			};

		case LOAD_COMPANIES_CODE_VALUES_SUCCESS:
            return {
                ...state,
				cities: action.payload.cities,
				daysOfWeek: action.payload.DAY_OF_WEEK,
                companiesCategories: action.payload.categories
			};

		case LOAD_USER_INFO_SUCCESS:
			return {
				...state,
				user: action.payload
			};

		default:
			return state;
	}
};

export default commonReducer;