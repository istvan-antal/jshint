/*jshint node:true, es5:true */
/*global messages:true */

(function (exports) {
	'use strict';

	function MessagePool() {
		this.messages = [];
	}

	MessagePool.WARNING = 1;
	MessagePool.ERROR   = 2;

	MessagePool.prototype.add = function (type, message) {
		this.messages.push({
			type:    type,
			message: message
		});
	};

	MessagePool.prototype.addWarning = function (message) {
		this.add(MessagePool.WARNING, message);
	};

	MessagePool.prototype.addError = function (message) {
		this.add(MessagePool.ERROR, message);
	};

	MessagePool.prototype.pp = function () {
		this.messages.forEach(function (msg) {
			var title;

			if (msg.type == MessagePool.WARNING) {
				title = 'WARNING:';
			} else if (msg.type == MessagePool.ERROR) {
				title = 'ERROR:';
			}

			console.log(title, msg.message);
		});
	};

	Object.defineProperty(MessagePool.prototype, 'length', {
		get: function () {
			return this.messages.length;
		}
	});

	exports.MessagePool = MessagePool;
}(typeof exports == 'undefined' ? (messages = {}) : exports));