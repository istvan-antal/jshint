/*jshint node:true, expr:true */
/*global JSHINT:true */

var _ = require('underscore');
var esprima = require('./esprima.js');
var util = require('./util.js');
var Linter = require('./linter.js').Linter;

(function (exports) {
	'use strict';

	// Parse and extract AST, comments and tokens. If the parser throws an
	// exception (e.g. when the source is completely unparseable) panic and
	// stop the execution.
	function parse(code, dest) {
		try {
			return esprima.parse(code, { tokens: true, range: true, comment: true });
		} catch (exc) {
			util.panic(exc.message);
		}
	}

	function lint(code) {
		var tree   = parse(code);
		var len    = tree.body.length;
		var linter = new Linter(tree);
		var item, i;

		for (i = 0; i < len; i++) {
			item = tree.body[i];

			if (item.type == 'VariableDeclaration') {
				linter.VariableDeclaration(item);
			}
		}

		linter.messages.pp();
	}

	exports.lint = lint;
}(typeof exports === 'undefined' ? (JSHINT = {}) : exports));