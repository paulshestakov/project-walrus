
import {
	LOAD_COMPANY_SUCCESS
} from '../../actionCreators/editCompany';

const defaultState = {
	company: null
};

const editCompanyReducer = (state = defaultState, action) => {
	switch (action.type) {
		case LOAD_COMPANY_SUCCESS: {
			return {
				...state,
				company: action.payload
			}
		}

		default: {
			return state;
		}
	}
};

export default editCompanyReducer;