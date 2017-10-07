interface Company {
	companyId: string,
	name: string,
	logo: string,
	description: string,
	email: string,
	url: string,
	image: object,
	phones: Array<string>,
	lat: number,
	lng: number,
    companyCategoryId: string,
    companySubcategoryId: string,
    companyCategoryName: string,
	companySubcategoryName: string,
	workingTimes: Array<object>,
}

interface IFeedback {
	user: object,
	companyId: string,
	feedback: string,
	summary: string,
	rating: number,
}