import { REQUEST_PROMOS,
	ADD_FILTER,
	REMOVE_FILTER } from '../actionCreators/promos';

const mockData = {
	promos:
		[...new Array(10)].map(x => ({
			title: 'Title',
			type: 'SELL',
			imageSrc: 'https://vignette1.wikia.nocookie.net/sanicsource/images/9/97/Doge.jpg/revision/latest?cb=20160112233015',
			date: new Date(),
			description: 'Descr',
			price: 100
		}))
};

const filters = {
	promoTypes: [
		{
			id: 'PETS',
			text: 'Питомцы'
		},
		{
			id: 'GOODS_FOR_PETS',
			text: 'Товары для питомцев'
		}
	],
	animals: [
		{
			id: 'DOG',
			text: "Собака"
		},
		{
			id: 'CAT',
			text: "Собака"
		},
		{
			id: 'BIRD',
			text: "Птица"
		},
		{
			id: 'FISH',
			text: "Рыбка"
		}
	],
	cities: [
		{
			id: "MINSK",
			text: "Минск"
		},
		{
			id: "GRODNO",
			text: "Гродно"
		},
		{
			id: "GOMEL",
			text: "Гомель"
		}
	]
};


const promos = (state = mockData, action) => {
	switch (action.type) {

		case REQUEST_PROMOS: {
			return {
				...state,
				isFetching: true
			};
		}
		case ADD_FILTER: {
			const filterGroupId = action.payload.filterGroupId;
			const filterValueId = action.payload.filterValueId;

			return {
				...state,
				filter: {
					...state.filter,
					[filterGroupId]: [
						...state.filter[filterGroupId],
						filterValueId
					]
				}
			};
		}
		case REMOVE_FILTER: {
			const filterGroupId = action.payload.filterGroupId;
			const filterValueId = action.payload.filterValueId;

			return {
				...state,
				filter: {
					...state.filter,
					[filterGroupId]: state.filter[filterGroupId].filter(valueId => {
						return valueId !== filterValueId;
					})
				}
			};
		}
		default: {
			return state;
		}
	}
};

export default promos;