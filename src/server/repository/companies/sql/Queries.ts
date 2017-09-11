

const COMPANIES_TABLE = 'wikipet.COMPANIES';
const COMPANIES_TYPES_TABLE = 'wikipet.COMPANIES_TYPES';
const COMPANIES_EXACT_TYPES_TABLE = 'wikipet.COMPANIES_EXACT_TYPES';

export default {
	GET: `
		SELECT
			c.COMPANY_ID,
			c.NAME,
			c.LOGO,
			c.DESCRIPTION,
			c.EMAIL,
			c.URL,
			c.PHONE,
			c.LOCATION,
			
			ct.COMPANY_TYPE_ID,
			ct.COMPANY_TYPE_NAME,
			
			cet.COMPANY_EXACT_TYPE_ID,
			cet.COMPANY_EXACT_TYPE_NAME
		
		FROM wikipet.COMPANIES AS c
		
		LEFT JOIN wikipet.COMPANY_TYPES AS ct
			ON c.COMPANY_TYPE_ID = ct.COMPANY_TYPE_ID
		
		INNER JOIN wikipet.COMPANY_EXACT_TYPES AS cet
			ON c.COMPANY_EXACT_TYPE_ID = cet.COMPANY_EXACT_TYPE_ID
		
		WHERE c.COMPANY_ID = ?
	`
}