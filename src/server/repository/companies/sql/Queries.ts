const COMPANIES_TABLE = 'wikipet.COMPANIES';
const COMPANIES_CATEGORIES_TABLE = 'wikipet.COMPANIES_CATEGORIES';
const COMPANIES_SUBCATEGORIES_TABLE = 'wikipet.COMPANIES_SUBCATEGORIES';

export default {
	GET: `
		SELECT
			c.COMPANY_ID,
			c.COMPANY_CATEGORY_ID,
			c.COMPANY_SUBCATEGORY_ID,
			c.NAME,
			c.LOGO,
			c.DESCRIPTION,
			c.EMAIL,
			c.URL,
			c.PHONE,
			c.LAT,
			c.LNG,

			cc.COMPANY_CATEGORY_NAME,

			csc.COMPANY_SUBCATEGORY_NAME

		FROM ${COMPANIES_TABLE} AS c

		INNER JOIN ${COMPANIES_CATEGORIES_TABLE} AS cc
			ON c.COMPANY_CATEGORY_ID = cc.COMPANY_CATEGORY_ID

		INNER JOIN ${COMPANIES_SUBCATEGORIES_TABLE} AS csc
			ON c.COMPANY_CATEGORY_ID = csc.COMPANY_CATEGORY_ID
				AND c.COMPANY_SUBCATEGORY_ID = csc.COMPANY_SUBCATEGORY_ID

		WHERE c.COMPANY_ID = ?
	`,

	GET_COMPANIES_TYPES: `
		SELECT
			ct.COMPANY_CATEGORY_ID,
			ct.COMPANY_CATEGORY_NAME,

			cet.COMPANY_SUBCATEGORY_ID,
			cet.COMPANY_SUBCATEGORY_NAME

		FROM ${COMPANIES_CATEGORIES_TABLE} AS ct

		INNER JOIN ${COMPANIES_SUBCATEGORIES_TABLE} AS cet
			ON ct.COMPANY_TYPE_ID = cet.COMPANY_TYPE_ID

	`
}