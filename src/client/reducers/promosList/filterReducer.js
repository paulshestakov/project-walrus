import Util from '../util/Util';
import {
	LOAD_BREEDS_SUCCESS,

	SET_ANIMAL,
	SET_PROMO_TYPE,
	ADD_BREED,
	REMOVE_BREED,
	ADD_CITY,
	REMOVE_CITY,

	UPDATE_URL_WITH_STATE_SOURCE,

	UPDATE_FILTER_STATE_WITH_URL_SOURCE
} from './../../actionCreators/promosList/filter';

const defaultState = {
	selectedAnimalId: 'ALL',
	selectedAnimalLabel: 'Все',

	selectedPromoTypeId: 'ALL',

	selectedCitiesIds: [],
	selectedBreedsIds: [],

	priceFrom: null,
	priceTo: null,

	breeds: [],
	breedsAreLoaded: false
};


const filterReducer = (state = defaultState, action) => {
	switch (action.type) {

		case SET_ANIMAL: {
			return {
				...state,
				selectedAnimalId: action.payload.animalId,
				selectedAnimalLabel: action.payload.label
			}
		}
		case SET_PROMO_TYPE: {
			return {
				...state,
				selectedPromoTypeId: action.payload
			}
		}
		case ADD_BREED: {
			return {
				...state,
				selectedBreedsIds: state.selectedBreedsIds.concat([action.payload])
			}
		}
		case REMOVE_BREED: {
			return {
				...state,
				selectedBreedsIds: state.selectedBreedsIds.filter(x => x !== action.payload)
			}
		}
		case ADD_CITY: {
			return {
				...state,
				selectedCitiesIds: state.selectedCitiesIds.concat([action.payload])
			}
		}
		case REMOVE_CITY: {
			return {
				...state,
				selectedCitiesIds: state.selectedCitiesIds.filter(x => x !== action.payload)
			}
		}

		case UPDATE_URL_WITH_STATE_SOURCE: {
			updateUrl(state, action.payload);

			return state;
		}

		case UPDATE_FILTER_STATE_WITH_URL_SOURCE: {
			return {
				...state,
				...urlParamsToStateData(action.payload)
			}
		}

		case LOAD_BREEDS_SUCCESS:
			return {
				...state,
				breeds: action.payload,
				breedsAreLoaded: true
			};
		default: {
			return state;
		}
	}
};


function updateUrl(state, history) {

	const filterData = {
		animalId: state.selectedAnimalId,
		promoTypeId: state.selectedPromoTypeId,

		cityId: state.selectedCitiesIds,
		breedId: state.selectedBreedsIds,

		priceFrom: state.priceFrom,
		priceTo: state.priceTo
	};

	history.push({
		search: Util.objectToUrlQuery(filterData)
	});
}

function urlParamsToStateData(searchParams) {
	const urlData = Util.searchParamsToObject(searchParams);

	return {
		selectedAnimalId: urlData.animalId || defaultState.selectedAnimalId,
		selectedPromoTypeId: urlData.promoTypeId  || defaultState.selectedPromoTypeId,

		selectedCitiesIds: urlData.cityId  || defaultState.selectedCitiesIds,
		selectedBreedsIds: urlData.breedId  || defaultState.selectedBreedsIds,

		priceFrom: urlData.priceFrom || defaultState.priceFrom,
		priceTo: urlData.priceTo || defaultState.priceTo
	};
}

export default filterReducer;