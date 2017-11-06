import * as uuid from 'uuid';
import Queries from './sql/Queries';
import Util from "../../util/Util";

export default class Phones {
	static mapPhone = (item) => ({
		phoneId: item.phoneId,
		phone: item.phone
	});

	static internalizePhone(phone) {
		return [
			uuid(),
			phone.locationId,
			phone.phone
		];
	}

	static updatePhones = (phones, locationId) => {
		return (connection, done) => {
			const deletePhones = new Promise((resolve, reject) => {
				connection.query(Queries.DELETE_PHONES_BY_LOCATION, [locationId], Util.resolvePromise(resolve, reject));
			});
			const insertPhones = new Promise((resolve, reject) => {
				if (phones && phones.length > 0) {
					const internalizedPhones = phones.map(phone => {
						phone.locationId = locationId;
						return Phones.internalizePhone(phone);
					});
					connection.query(Queries.SAVE_PHONES, [internalizedPhones], Util.resolvePromise(resolve, reject));
				} else {
					resolve(null);
				}
			});
			Promise.all([deletePhones, insertPhones]).then((results) => done(null, results));
		};
	}
}