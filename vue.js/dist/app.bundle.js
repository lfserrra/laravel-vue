/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".app.bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);

	__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(5), __webpack_require__(6), __webpack_require__(7), __webpack_require__(9), __webpack_require__(10), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13)]; (function (dashboardComponent, billPayComponent, billPayListComponent, billPayCreateComponent, billReceiveComponent, billReceiveListComponent, billReceiveCreateComponent, billComponent) {
	    var router = new VueRouter();

	    router.map({
	        '/': {
	            name: 'dashboard',
	            component: dashboardComponent
	        },

	        '/bill-pays': {
	            component: billPayComponent,
	            subRoutes: {
	                '/': {
	                    name: 'bill-pay.list',
	                    component: billPayListComponent
	                },

	                '/create': {
	                    name: 'bill-pay.create',
	                    component: billPayCreateComponent
	                },

	                '/:id/update': {
	                    name: 'bill-pay.update',
	                    component: billPayCreateComponent
	                }
	            }
	        },

	        '/bill-receives': {
	            component: billReceiveComponent,
	            subRoutes: {
	                '/': {
	                    name: 'bill-receive.list',
	                    component: billReceiveListComponent
	                },

	                '/create': {
	                    name: 'bill-receive.create',
	                    component: billReceiveCreateComponent
	                },

	                '/:id/update': {
	                    name: 'bill-receive.update',
	                    component: billReceiveCreateComponent
	                }
	            }
	        },

	        '*': {
	            component: dashboardComponent
	        }

	    });

	    router.start({
	        components: {
	            'bill-component': billComponent
	        }
	    }, '#app');

	    router.redirect({
	        '*': '/'
	    });
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Vue.http.options.root = 'http://api.bills.dev:8000/api';

	window.BillPay = Vue.resource('bills{/id}', {}, {
	    total: { method: 'GET', url: 'bills/total' }
	});

	window.BillReceive = Vue.resource('bills_receive{/id}', {}, {
	    total: { method: 'GET', url: 'bills_receive/total' }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Vue.filter('doneLabel', function (value) {
	    return value == 1 ? 'Paga' : 'Não Paga';
	});

	Vue.filter('payStatusGeneral', function (value) {
	    if (value === false) {
	        return 'Nenhuma conta cadastrada';
	    }

	    if (!value) {
	        return 'Nenhuma conta a pagar';
	    }

	    if (value === 1) {
	        return 'Existe 1 conta a pagar';
	    }

	    return value + ' contas a pagar';
	});

	Vue.filter('receiveStatusGeneral', function (value) {
	    if (value === false) {
	        return 'Nenhuma conta cadastrada';
	    }

	    if (!value) {
	        return 'Nenhuma conta a receber';
	    }

	    if (value === 1) {
	        return 'Existe 1 conta a receber';
	    }

	    return value + ' contas a receber';
	});

	Vue.filter('numberFormat', {
	    read: function read(value, language) {
	        var number = 0;

	        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
	            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
	            number = numberRegex ? numberRegex[0] : 0;
	        }

	        return new Intl.NumberFormat(language, {
	            minimumFractionDigits: 2,
	            maximumFractionDigits: 2,
	            style: 'currency',
	            currency: 'BRL'
	        }).format(number);
	    },
	    write: function write(value) {
	        var number = 0;

	        if (value.length > 0) {
	            number = value.replace(/[^\d,]/g, '').replace(/\,/g, '.');

	            number = isNaN(number) ? 0 : parseFloat(number);
	        }

	        return number;
	    }
	});

	Vue.filter('dateFormat', {
	    read: function read(value, language) {
	        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
	            if (!(value instanceof Date)) {
	                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
	                var dateString = dateRegex ? dateRegex[0] : dateRegex;

	                if (dateString) {
	                    value = new Date(dateString + "T03:00:00");
	                } else {
	                    return value;
	                }
	            }

	            return new Intl.DateTimeFormat(language).format(value).split(' ')[0];
	        }

	        return value;
	    },
	    write: function write(value) {
	        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);

	        if (dateRegex) {
	            var dateString = dateRegex[0];
	            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");

	            if (!isNaN(date.getTime())) {
	                return date;
	            }
	        }

	        return value;
	    }
	});

	Vue.filter('upperFormat', {
	    read: function read(value) {
	        return value.toUpperCase();
	    },
	    write: function write(value) {
	        return value.toLowerCase();
	    }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BillPayClass = function () {
	    function BillPayClass() {
	        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, BillPayClass);

	        this.date_due = '';
	        this.name = '';
	        this.value = 0;
	        this.done = false;

	        Object.assign(this, data);
	    }

	    _createClass(BillPayClass, [{
	        key: 'toJSON',
	        value: function toJSON() {
	            return {
	                date_due: this.getDateDue(this.date_due),
	                name: this.name,
	                value: this.value,
	                done: this.done
	            };
	        }
	    }, {
	        key: 'getDateDue',
	        value: function getDateDue(date_due) {
	            var dateDueObject = date_due;

	            if (!(date_due instanceof Date)) {
	                dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
	            }

	            if (isNaN(dateDueObject.getTime()) || !dateDueObject) {
	                return date_due;
	            }

	            return dateDueObject.toISOString().split('T')[0];
	        }
	    }]);

	    return BillPayClass;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BillReceiveClass = function () {
	    function BillReceiveClass() {
	        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, BillReceiveClass);

	        this.date_due = '';
	        this.name = '';
	        this.value = 0;
	        this.done = false;

	        Object.assign(this, data);
	    }

	    _createClass(BillReceiveClass, [{
	        key: 'toJSON',
	        value: function toJSON() {
	            return {
	                date_due: this.getDateDue(this.date_due),
	                name: this.name,
	                value: this.value,
	                done: this.done
	            };
	        }
	    }, {
	        key: 'getDateDue',
	        value: function getDateDue(date_due) {
	            var dateDueObject = date_due;

	            if (!(date_due instanceof Date)) {
	                dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
	            }

	            if (isNaN(dateDueObject.getTime()) || !dateDueObject) {
	                return date_due;
	            }

	            return dateDueObject.toISOString().split('T')[0];
	        }
	    }]);

	    return BillReceiveClass;
	}();

/***/ }
/******/ ]);