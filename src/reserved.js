/*jshint node:true, es5:true */
/*global reserved:true */

(function (exports) {
	'use strict';

	var reserved = [
		'function',
		'typeof'
	];

	reserved.forEach(function (word) {
		exports[word] = true;
	});
}(typeof exports == 'undefined' ? (reserved = {}) : exports));