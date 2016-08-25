'use strict';

const λ = require('@financial-times/n-lambda');

exports.handle = λ(function(event) {
	console.log(event);
});
