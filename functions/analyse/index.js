'use strict';

const λ = require('@financial-times/n-lambda');

function split (logs) {
	const dummyLog = '2016-08-24T14:36:13.232291+00:00 heroku[web.6]: source=web.6 dyno=heroku.55307485.e1e8c4c5-46e1-428b-b27c-2f604784e863 sample#load_avg_1m=0.01 sample#load_avg_5m=0.09 sample#load_avg_15m=0.50';
	return [dummyLog, dummyLog, dummyLog];
}

function parse (log) {
	return log;
};

function filterLog (log) {
	return log === log;
}

function sendToGraphite (logs) {
	const url = 'https://some.url.com';
	return fetch(url)
		.then(function (response) {
			return response;
		}, function (error) {
			return error;
		});
};

exports.handle = λ(function(event) {
	const splitLogs = split(event.logs);
	const parsedLogs = splitLogs.map(parse);
	const filteredLogs = parsedLogs.filter(filterLog);
	return sendToGraphite(filteredLogs);
});
