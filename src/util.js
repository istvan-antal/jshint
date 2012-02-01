/*jshint node:true */
/*global util:true */

var _ = require('underscore');

(function (exports) {
    'use strict';

    function panic(message) {
        throw new Error(message);
    }

    function error() {
    }

    function warning() {
    }

    exports.panic   = panic;
    exports.error   = error;
    exports.warning = warning;
}(typeof exports == 'undefined' ? (util = {}) : exports));