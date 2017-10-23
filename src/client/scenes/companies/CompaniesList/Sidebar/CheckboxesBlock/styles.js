import globalStyles from '../../../../../style';


export default {
	checkboxesContainer: {
		display: 'flex',
		flexDirection: 'column'
	},

	checkboxWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '0',

		'& > span': {
			order: 2
		},

		'& p': {
			order: 1,
			fontSize: '1.25rem',
			fontFamily: globalStyles.BEBAS_FONT
		}
	},

	popoverCard: {
		display: 'flex',
		flexDirection: 'column',
		padding: '1.5rem'
	}
}