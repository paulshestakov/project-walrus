import * as mysql from 'mysql';
import async from 'async';
import * as config from 'config';
import log from "../util/Logger";
import Util from "../util/Util";

const pool = mysql.createPool({
	connectionLimit : 100, //important
	host     :  process.env.DATABASE_HOST || config.get('mysql.host'),
	port     :  process.env.PORT || config.get('mysql.port'),
	user     :  config.get('mysql.user'),
	password :  config.get('mysql.password'),
	database :  config.get('mysql.db')
});

// Test connection
pool.getConnection(function(err, connection) {
	if (!err) {
		log.info('DB is connected');
	} else {
		console.log('DB is not connected, error : ' + err);
	}
	connection.release();
});

const executeQuery = (query, params, callback) => {
	pool.getConnection((err,connection) => {
		if (err) {
			connection.release();
			Util.handleError(err, callback);
		}
		try {
			connection.query(query, params, (err, rows) => {
				if (err) {
					console.log(err);
					callback(err);
					return;
				}
				callback(null, rows);
			});
		} catch (e) {
			connection.release();
			Util.handleError(err, callback);
		}
	});
};

const performTransaction = function (functions, callback) {
	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err);
			callback(err);
			return;
		}

		connection.beginTransaction(function (err) {
			if (err) {
				connection.rollback(function (err) {
					connection.release();
					Util.handleError(err, callback);
				});
				return;
			}

			functions = functions.map((func) => func.bind(null, connection));

			async.series(functions, function (err, result) {
				if (err) {
					Util.handleError(err);
					connection.rollback(function (err) {
						connection.release();
						Util.handleError(err, callback);
					});
					return;
				}

				connection.commit(function (err) {
					if (err) {
						Util.handleError(err);
						connection.rollback(function (err) {
							connection.release();
							Util.handleError(err, callback);
						});
						return;
					}

					connection.release();

					callback(null, result);
				});
			});
		});
	});
};


export {executeQuery, pool, performTransaction};