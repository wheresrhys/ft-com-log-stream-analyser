const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const stubs = { 'next-metrics': { init: sinon.stub(), count: sinon.stub() } };
const { main, parse, split } = proxyquire('../../lib/log-parser', stubs);
const fixtures = require('../fixtures/events');

describe('log parser', () => {

	it('splits logs', () => {
		expect(split(fixtures.body1)).eql(fixtures.split1);
		expect(split(fixtures.body2)).eql(fixtures.split2);
		expect(split(fixtures.body3)).eql(fixtures.split3);
		expect(split(fixtures.body4)).eql(fixtures.split4);
	});

	it('parses logs', () => {
		const herokuMetrics = "203 <45>1 2016-10-11T09:44:48.825510+00:00 host heroku web.7 - source=web.7 dyno=heroku.55307485.8de7ea07-ab77-4401-af77-d20ee5a500ca sample#load_avg_1m=0.22 sample#load_avg_5m=0.16 sample#load_avg_15m=0.11";

		expect(parse(herokuMetrics)).eql({
			'dyno': 'heroku.55307485.8de7ea07-ab77-4401-af77-d20ee5a500ca',
			'load_avg_1m': '0.22',
			'load_avg_5m': '0.16',
			'load_avg_15m': '0.11',
			'source': 'web.7',
			"timestamp": '2016-10-11T09:44:48.825510+00:00'
		});
	});

	it('ignores L10 errors', () => {
		const herokuErr = "143 <172>1 2016-10-11T09:44:49+00:00 host heroku logplex - Error L10 (output buffer overflow): 13 messages dropped since 2016-10-11T09:43:26+00:00.";
		expect(parse(herokuErr)).undefined;
	});

	it('send metrics to graphite', () => {
		main({ rawBody: fixtures.body3, msgCount: fixtures.split3.length });
		expect(stubs['next-metrics'].count.called).true;
	});

	it('sends errors to graphite', () => {
		main({ rawBody: fixtures.body2, msgCount: fixtures.split2.length });
	});

	it('captures parse errors', () => {
		main({ rawBody: fixtures.body2, msgCount: fixtures.split2.length + 1 });
	});

	it('filters out app-level metrics', () => {});
});
