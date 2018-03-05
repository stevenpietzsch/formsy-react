'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var moment = require('moment');
var Immutable = require('immutable');
var Decimal = require('decimal.js');

module.exports = {
  arraysDiffer: function arraysDiffer(a, b) {
    var isDifferent = false;
    if (a.length !== b.length) {
      isDifferent = true;
    } else {
      a.forEach(function (item, index) {
        if (!this.isSame(item, b[index])) {
          isDifferent = true;
        }
      }, this);
    }
    return isDifferent;
  },

  objectsDiffer: function objectsDiffer(a, b) {
    var isDifferent = false;
    if (Object.keys(a).length !== Object.keys(b).length) {
      isDifferent = true;
    } else {
      Object.keys(a).forEach(function (key) {
        if (!this.isSame(a[key], b[key])) {
          isDifferent = true;
        }
      }, this);
    }
    return isDifferent;
  },

  isSame: function isSame(a, b) {
    if (isNaN(a) || isNaN(b)) {
      return a === b;
    } else if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== (typeof b === 'undefined' ? 'undefined' : _typeof(b))) {
      return false;
    } else if (moment.isMoment(a) || moment.isMoment(b)) {
      if (isNaN(a.valueOf())) {
        if (moment.isMoment(b) && isNaN(b.valueOf())) {
          return true;
        }
      }

      return a.isSame(b);
    } else if (Immutable.List.isList(a) || Immutable.Map.isMap(a)) {
      return a.equals(b);
    } else if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a !== null && a.isDecimal) {
      return a.equals(b);
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return !this.arraysDiffer(a, b);
    } else if (typeof a === 'function') {
      return a.toString() === b.toString();
    } else if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a !== null && b !== null) {
      return !this.objectsDiffer(a, b);
    } else if (typeof a === 'number' && isNaN(a) && isNaN(b)) {
      return true;
    }

    return a === b;
  },

  find: function find(collection, fn) {
    for (var i = 0, l = collection.length; i < l; i++) {
      var item = collection[i];
      if (fn(item)) {
        return item;
      }
    }
    return null;
  }
};