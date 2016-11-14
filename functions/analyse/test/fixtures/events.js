// errors
const body1 = "206 <190>1 2016-10-10T16:42:52.334260+00:00 host app web.12 - Failed getting CAPIv2 response level=warn path=/lists?curatedTopStoriesFor=29ebbd5c-5607-3934-bbde-6a51ead211c3 error=\"BadServerResponseError: 404\"206 <190>1 2016-10-10T16:42:52.335455+00:00 host app web.12 - Failed getting CAPIv2 response level=warn path=/lists?curatedTopStoriesFor=8d5d7bae-a5df-33f0-9acf-cc57badf805b error=\"BadServerResponseError: 404\"211 <190>1 2016-10-10T16:42:52.336868+00:00 host app web.12 - Failed getting CAPIv2 response level=warn path=/lists?curatedOpinionAnalysisFor=29ebbd5c-5607-3934-bbde-6a51ead211c3 error=\"BadServerResponseError: 404\"211 <190>1 2016-10-10T16:42:52.497866+00:00 host app web.12 - Failed getting CAPIv2 response level=warn path=/lists?curatedOpinionAnalysisFor=8d5d7bae-a5df-33f0-9acf-cc57badf805b error=\"BadServerResponseError: 404\"";
const body2 = "143 <172>1 2016-10-11T09:45:12+00:00 host heroku logplex - Error L10 (output buffer overflow): 20 messages dropped since 2016-10-11T09:43:19+00:00.443 <190>1 2016-10-11T09:45:12.199584+00:00 host app web.10 - Failed getting COCO response level=warn path=/concordances?authority=http://api.ft.com/system/FT-TME&identifierValue=ZTgxZmQ5ZGUtMGQwZC00Zjk0LWI1NTQtMzcxY2E5ZGU5NTZj-U2VjdGlvbnM= error=\"FetchError: network timeout at: https://prod-coco-up-read.ft.com/concordances?authority=http://api.ft.com/system/FT-TME&identifierValue=ZTgxZmQ5ZGUtMGQwZC00Zjk0LWI1NTQtMzcxY2E5ZGU5NTZj-U2VjdGlvbnM=\"\n206 <190>1 2016-10-11T09:45:12.331041+00:00 host app web.10 - Failed getting CAPIv2 response level=warn path=/lists?curatedTopStoriesFor=3bd34043-aa6a-31a0-9729-4301e046d597 error=\"BadServerResponseError: 404\"\n";
const body3 = "203 <45>1 2016-10-11T09:43:17.183402+00:00 host heroku web.5 - source=web.5 dyno=heroku.55307485.73fd806f-b896-4a33-bee9-43bf10fecbb3 sample#load_avg_1m=0.03 sample#load_avg_5m=0.12 sample#load_avg_15m=0.12\n340 <45>1 2016-10-11T09:43:17.183592+00:00 host heroku web.5 - source=web.5 dyno=heroku.55307485.73fd806f-b896-4a33-bee9-43bf10fecbb3 sample#memory_total=236.29MB sample#memory_rss=209.62MB sample#memory_cache=2.43MB sample#memory_swap=24.23MB sample#memory_pgpgin=23251870pages sample#memory_pgpgout=23453083pages sample#memory_quota=512.00MB\n";
const body4 = "143 <172>1 2016-10-11T09:44:49+00:00 host heroku logplex - Error L10 (output buffer overflow): 13 messages dropped since 2016-10-11T09:43:26+00:00.203 <45>1 2016-10-11T09:44:48.825510+00:00 host heroku web.7 - source=web.7 dyno=heroku.55307485.8de7ea07-ab77-4401-af77-d20ee5a500ca sample#load_avg_1m=0.22 sample#load_avg_5m=0.16 sample#load_avg_15m=0.11\n339 <45>1 2016-10-11T09:44:48.825571+00:00 host heroku web.7 - source=web.7 dyno=heroku.55307485.8de7ea07-ab77-4401-af77-d20ee5a500ca sample#memory_total=184.48MB sample#memory_rss=176.70MB sample#memory_cache=3.13MB sample#memory_swap=4.65MB sample#memory_pgpgin=14330811pages sample#memory_pgpgout=14361935pages sample#memory_quota=512.00MB\n";

const split1 = [
	"206 <190>1 2016-10-10T16:42:52.334260+00:00 host app web.12 - Failed getting CAPIv2 response level=warn path=/lists?curatedTopStoriesFor=29ebbd5c-5607-3934-bbde-6a51ead211c3 error=\"BadServerResponseError: 404\"",
	"206 <190>1 2016-10-10T16:42:52.335455+00:00 host app web.12 - Failed getting CAPIv2 response level=warn path=/lists?curatedTopStoriesFor=8d5d7bae-a5df-33f0-9acf-cc57badf805b error=\"BadServerResponseError: 404\"",
	"211 <190>1 2016-10-10T16:42:52.336868+00:00 host app web.12 - Failed getting CAPIv2 response level=warn path=/lists?curatedOpinionAnalysisFor=29ebbd5c-5607-3934-bbde-6a51ead211c3 error=\"BadServerResponseError: 404\"",
	"211 <190>1 2016-10-10T16:42:52.497866+00:00 host app web.12 - Failed getting CAPIv2 response level=warn path=/lists?curatedOpinionAnalysisFor=8d5d7bae-a5df-33f0-9acf-cc57badf805b error=\"BadServerResponseError: 404\""
];

const split2 = [
	"143 <172>1 2016-10-11T09:45:12+00:00 host heroku logplex - Error L10 (output buffer overflow): 20 messages dropped since 2016-10-11T09:43:19+00:00.",
	"443 <190>1 2016-10-11T09:45:12.199584+00:00 host app web.10 - Failed getting COCO response level=warn path=/concordances?authority=http://api.ft.com/system/FT-TME&identifierValue=ZTgxZmQ5ZGUtMGQwZC00Zjk0LWI1NTQtMzcxY2E5ZGU5NTZj-U2VjdGlvbnM= error=\"FetchError: network timeout at: https://prod-coco-up-read.ft.com/concordances?authority=http://api.ft.com/system/FT-TME&identifierValue=ZTgxZmQ5ZGUtMGQwZC00Zjk0LWI1NTQtMzcxY2E5ZGU5NTZj-U2VjdGlvbnM=\"",
	"206 <190>1 2016-10-11T09:45:12.331041+00:00 host app web.10 - Failed getting CAPIv2 response level=warn path=/lists?curatedTopStoriesFor=3bd34043-aa6a-31a0-9729-4301e046d597 error=\"BadServerResponseError: 404\""
];

const split3 = [
	"203 <45>1 2016-10-11T09:43:17.183402+00:00 host heroku web.5 - source=web.5 dyno=heroku.55307485.73fd806f-b896-4a33-bee9-43bf10fecbb3 sample#load_avg_1m=0.03 sample#load_avg_5m=0.12 sample#load_avg_15m=0.12",
	"340 <45>1 2016-10-11T09:43:17.183592+00:00 host heroku web.5 - source=web.5 dyno=heroku.55307485.73fd806f-b896-4a33-bee9-43bf10fecbb3 sample#memory_total=236.29MB sample#memory_rss=209.62MB sample#memory_cache=2.43MB sample#memory_swap=24.23MB sample#memory_pgpgin=23251870pages sample#memory_pgpgout=23453083pages sample#memory_quota=512.00MB"
];

const split4 = [
	"143 <172>1 2016-10-11T09:44:49+00:00 host heroku logplex - Error L10 (output buffer overflow): 13 messages dropped since 2016-10-11T09:43:26+00:00.",
	"203 <45>1 2016-10-11T09:44:48.825510+00:00 host heroku web.7 - source=web.7 dyno=heroku.55307485.8de7ea07-ab77-4401-af77-d20ee5a500ca sample#load_avg_1m=0.22 sample#load_avg_5m=0.16 sample#load_avg_15m=0.11",
	"339 <45>1 2016-10-11T09:44:48.825571+00:00 host heroku web.7 - source=web.7 dyno=heroku.55307485.8de7ea07-ab77-4401-af77-d20ee5a500ca sample#memory_total=184.48MB sample#memory_rss=176.70MB sample#memory_cache=3.13MB sample#memory_swap=4.65MB sample#memory_pgpgin=14330811pages sample#memory_pgpgout=14361935pages sample#memory_quota=512.00MB"
];

module.exports = { body1, body2, body3, body4, split1, split2, split3, split4 };
