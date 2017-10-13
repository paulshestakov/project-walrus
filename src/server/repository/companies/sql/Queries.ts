const COMPANIES_TABLE = 'wikipet.companies';
const COMPANIES_PHONES = 'wikipet.companies_phones';
const COMPANINES_LOCATION = 'wikipet.companies_location';
const CODE_VALUES = 'wikipet.code_values';
const WORKING_TIMES = 'wikipet.companies_working_time';
const FEEDBACK = 'wikipet.companies_feedback';
const USERS = 'wikipet.dle_users';

export default {
	GET: `
		SELECT
			c.COMPANY_ID companyId,
			c.COMPANY_CATEGORY_ID categoryId,
			(SELECT NAME FROM wikipet.code_values WHERE ID = c.COMPANY_CATEGORY_ID) as categoryName,
			c.COMPANY_SUBCATEGORY_ID subcategoryId,
			(SELECT NAME FROM wikipet.code_values WHERE ID = c.COMPANY_SUBCATEGORY_ID) as subcategoryName,
			c.NAME name,
			c.LOGO logo,
			c.DESCRIPTION description,
			c.EMAIL email,
			c.WEBSITE_URL url,

			cl.SUBWAY_ID subwayId,
			cl.CITY_ID cityId,
			cl.ADDRESS address,
			cl.LAT lat,
			cl.LNG lng

		FROM ${COMPANIES_TABLE} c
		LEFT JOIN ${COMPANINES_LOCATION} cl
			ON c.COMPANY_ID = cl.COMPANY_ID
		WHERE c.COMPANY_ID = ?
	`,

	GET_BY_NAME: `
		SELECT
			c.COMPANY_ID companyId,
			c.NAME name,
			c.LOGO logo,
			c.DESCRIPTION description,
			c.EMAIL email,
			c.WEBSITE_URL url

		FROM ${COMPANIES_TABLE} c
		WHERE c.NAME LIKE ?
	`,

	SAVE: `INSERT INTO ${COMPANIES_TABLE} set ?`,

	GET_PHONES: `SELECT PHONE FROM ${COMPANIES_PHONES} WHERE COMPANY_ID = ?`,

	SAVE_PHONES: `INSERT INTO ${COMPANIES_PHONES} VALUES ?`,

	SAVE_LOCATION: `INSERT INTO ${COMPANINES_LOCATION} set ?`,

	SAVE_WORKING_TIMES: `INSERT INTO ${WORKING_TIMES} VALUES ?`,

	SAVE_FEEDBACK: `INSERT INTO ${FEEDBACK} set ?`,

	GET_FEEDBACKS: `SELECT
			f.COMPANY_FEEDBACK_ID feedbackId,
			f.COMPANY_ID companyId,
			f.FEEDBACK feedback,
			f.SUMMARY summary,
			f.RATING rating,
			f.creation_date createDate,
			f.modification_date modificateDate,

			u.user_id userId,
			u.foto photo,
			u.name userName

		FROM ${FEEDBACK} f
		LEFT JOIN ${USERS} u
			ON f.USER_ID = u.user_id
		WHERE f.COMPANY_ID = ?
		ORDER BY f.creation_date desc`
}