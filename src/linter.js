/*jshint node:true, es5:true */
/*global linter:true */

var _           = require('underscore');
var util        = require('./util.js');
var reserved    = require('./reserved.js');
var MessagePool = require('./messages.js').MessagePool;

(function (exports) {
	'use strict';

	function Walker(tokens, range) {
		var slice  = [];
		var length = tokens.length;
		var token;

		for (var i = 0; i < length; i++) {
			token = tokens[i];

			if (token.range[0] < range[0])
				continue;

			if (token.range[1] > range[1])
				break;

			slice.push(token);
		}

		this.tokens   = slice;
		this.curToken = 0;
	}

	Object.defineProperties(Walker.prototype, {
		current: {
			get: function () {
				return this.tokens[this.curToken] || null;
			}
		},

		previous: {
			get: function () {
				if (this.curToken === 0)
					return null;
				return this.tokens[this.curToken - 1] || null;
			}
		}
	});

	Walker.prototype.peak = function () {
		return this.tokens[this.curToken + 1] || null;
	};

	Walker.prototype.advance = function () {
		this.curToken += 1;
		return this.current;
	};

	function Linter(tree) {
		this.tokens   = tree.tokens;
		this.tree     = tree.body;
		this.comments = tree.comments;
		this.messages = new MessagePool();
	}

	Linter.prototype.VariableDeclaration = function (element) {
		var decl = element.declarations;

		for (var i = 0; i < decl; i++) {
			this.VariableDeclarator(decl[i]);
		}
	};

	Linter.prototype.VariableDeclarator = function (element) {
		var expr = element.init;

		switch (expr.type) {
		case 'Identifier':
			this.Identifier(expr);
			break;
		case 'ObjectExpression':
			this.ObjectExpression(expr);
			break;
		}
	};

	Linter.prototype.Identifier = function (element) {
		if (reserved[element.name])
			this.messages.addError('Missing semicolon.');
	};

	Linter.prototype.ObjectExpression = function (element) {
	};

	exports.Linter = Linter;
}(typeof exports == 'undefined' ? (linter = {}) : exports));