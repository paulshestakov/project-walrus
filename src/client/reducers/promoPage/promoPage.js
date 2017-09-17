import {
	LOAD_PROMO_SUCCESS
} from './../../actionCreators/promoPage/promoPage';

const defaultState = {
	promo: {}
};

const promoPageReducer = (state = defaultState, action) => {
	switch (action.type) {

		case LOAD_PROMO_SUCCESS: {
			return {
				...state,
				promo: action.payload
			}
		}

		default: {
			return state;
		}
	}
};

export default promoPageReducer;