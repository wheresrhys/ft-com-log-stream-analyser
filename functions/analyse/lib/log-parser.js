module.exports = { main, split, parse, count };

const logger = require('@financial-times/n-logger').default;
const Metrics = require('next-metrics');
Metrics.init({ app: 'logstreamanalyser', flushEvery: 5000 });

// TODO: other apps https://devcenter.heroku.com/articles/platform-api-reference#filters-apps
const HEROKU_APP_NAMES = {
	55307485: 'ft-next-stream-page-eu'
};

function main (e) {
	const logs = split(e.rawBody);
	if (logs.length === e.msgCount) {
		logs.map(parse).forEach(count);
	} else {
		logger.warn({ event: 'SYLOG_SPLIT_ERROR' });
	}
}

function split (body) {
	const syslogSeparator = /(?=[0-9]{3}\s<[0-9]{2,3}>[0-9]\s)/g;
	return body.split(syslogSeparator)
		.map(log => log.trim())
		.filter(log => log);
}

function parse (log) {
	// syslog format: tools.ietf.org/html/rfc5424#section-6 (read it & weep)
	const parts = log.split(' ');
	const timestamp = parts[2];
	const type = parts[4];
	const source = parts[5];

	if (type === 'heroku' && source.match(/web/)) {
		return parts.filter(part => /^(.+)=/.test(part))
			.map(metric => metric.replace(/^sample#/, ''))
			.map(metric => metric.split('='))
			.reduce((result, metric) => {
				result[metric[0]] = metric[1];
				return result;
			}, { timestamp });
	}

	if (type === 'heroku' && source === 'logplex') {
		const error = parts.slice(7).join(' ');
		const code = parts[8];
		if (code !== 'L10') {
			return { code, error, timestamp };
		}
		// see: https://devcenter.heroku.com/articles/error-codes#l10-drain-buffer-overflow
		logger.info({ event: 'LOGDRAIN_OVERFLOW' });
		return;
	}

	if (!['router'].includes(source)) {
		logger.info({ event: 'SYSLOG_UNMATCHED', source, log });
	}
}

function count (log) {
	if (!log) return;

	if (log.error) {
		logger.info(Object.assign(log, { event: 'HEROKU_RUNTIME_ERROR' }));
		Metrics.count(log.code);
		return;
	}

	if (!log.dyno || !log.source) {
		logger.info(Object.assign(log, { event: 'MALFORMED_HEROKU_METRICS' }));
		return;
	}

	logger.info(log, { event: 'AGGREGATE_METRICS' });

	const herokuappID = log.dyno.match(/heroku\.(.*?)\.[0-9a-z]/)[1];
	const app = HEROKU_APP_NAMES[herokuappID];
	const processID = log.source.replace('.', '_');

	Object.keys(log)
		.filter(key => !['source', 'dyno', 'timestamp'].includes(key))
		.forEach(metric => {
			const identifier = `${app}.${processID}.${metric}`;
			const count = log[metric];
			logger.info({ event: 'INDIVIDUAL_METRIC', identifier, count });
			Metrics.count(identifier, count);
		});
}
