exports.handle = function(event) {
	console.log('date=' + Date.now());
	console.log('request=' + JSON.stringify(event));
};
