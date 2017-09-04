webpackJsonp([8],{

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export min_to_hours */
/* unused harmony export countdown */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sec_to_hhmmss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return sec_to_hourminsec; });
/* unused harmony export hourmin */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return sec_to_hourmin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return customCalendar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns_esm__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_lang_js__ = __webpack_require__(86);



var text = window.store ? store.getters.text : __WEBPACK_IMPORTED_MODULE_1__store_lang_js__["a" /* default */].en;

function min_to_hours(val) {
	var nr = val / 60;
	if (val == 10) {
		nr = nr.toFixed(2);
	}
	return nr;
}
function countdown(val) {
	var item = allItems.nodes[val];
	var p = item.planned_time;
	var u = item.used_time;
	var time = parseFloat(p) * 60 - parseFloat(u);
	return calc_hhmmss(time);
}
function sec_to_hhmmss(val) {
	return calc_hhmmss(val);
}
function calc_hhmmss(val) {
	function pad(num) {
		return ("0" + num).slice(-2);
	}
	var secs = void 0;
	var minutes = Math.floor(val / 60);
	secs = val % 60;
	var hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	if (hours > 0) {
		return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);
	} else {
		return pad(minutes) + ":" + pad(secs);
	}
}
function sec_to_hourminsec(val) {
	function pad(num, unit) {
		if (num > 0) {
			return num + " " + unit;
		}return '';
	}
	var secs = void 0;
	var minutes = Math.floor(val / 60);
	secs = val % 60;
	var hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	if (hours > 0) {
		return pad(hours, text.global.hour + ' ') + pad(minutes, text.global.min);
	} else if (minutes > 0) {
		return pad(minutes, text.global.min + ' ') + pad(secs, text.global.sec);
	} else {
		return pad(secs, text.global.sec);
	}
}
function hourmin(val) {
	function pad(num, unit) {
		if (num > 0) {
			return num + " " + unit;
		}return '';
	}
	var minutes = val % 60;
	var hours = Math.floor(val / 60);
	if (hours > 0) {
		return pad(hours, text.global.hour + ' ') + pad(minutes, text.global.min);
	} else {
		return pad(minutes, text.global.min);
	}
}
function sec_to_hourmin(val) {
	function pad(num, unit) {
		if (num > 0) {
			return num + " " + unit;
		}return '';
	}
	var secs = void 0;
	var minutes = Math.floor(val / 60);
	secs = val % 60;
	var hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	if (hours > 0) {
		return pad(hours, text.global.hour + ' ') + pad(minutes, text.global.min);
	} else {
		return pad(minutes, text.global.min);
	}
}
function customCalendar(val) {
	val = new Date(val.replace(/-/g, "/"));
	var relativeTime = Object(__WEBPACK_IMPORTED_MODULE_0_date_fns_esm__["c" /* formatRelative */])(val, new Date(), { addSuffix: true });
	if (relativeTime.includes('at')) {
		relativeTime = relativeTime.substring(0, relativeTime.indexOf(' at'));
	}
	return relativeTime;
}




/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
	dateFormat: 'Y-m-d H:i:S',
	maxDate: 'today',

	time_24hr: true,
	onOpen: function onOpen(dateObj, dateStr, instance) {
		var id = instance.element.name;
		if (!store.state.beforeEditCache_doneDate) {
			store.state.beforeEditCache_doneDate = {};
		}
		console.log('flatPickr[onOpen] id: ' + id + '.    dateStr: ' + dateStr);
		store.state.beforeEditCache_doneDate[id] = dateStr;
	},
	onClose: function onClose(dateObj, dateStr, instance) {
		var id = instance.element.name;
		console.log('flatPickr[onClose] id: ' + id + '.    dateStr: ' + dateStr);
		console.log('store.state.beforeEditCache_doneDate[id] = ' + store.state.beforeEditCache_doneDate[id]);
		if (store.state.beforeEditCache_doneDate[id] == dateStr) {
			return;
		}
		store.dispatch('patch', { id: id, field: 'done_date', value: dateStr });
		delete store.state.beforeEditCache_doneDate[id];
	}
});

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_globalFunctions_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_quasar__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_quasar_extras_material_icons__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_quasar_extras_ionicons__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_quasar_extras_ionicons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_quasar_extras_ionicons__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vuex__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__store_store_js__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__store_ItemComputedProperties_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vuelidate__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vuelidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_vuelidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__router_js__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__config_WindowKeyBindings_js__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__config_Directives_js__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_vue_clipboard2__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_vue_clipboard2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_vue_clipboard2__);


__webpack_require__(133);



window.Element.prototype.hasClass = function (config) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__helpers_globalFunctions_js__["d" /* hasClass */])(this, config);
};
window.Element.prototype.addClass = function (config) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__helpers_globalFunctions_js__["b" /* addClass */])(this, config);
};
window.Element.prototype.removeClass = function (config) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__helpers_globalFunctions_js__["f" /* removeClass */])(this, config);
};


window.axios = __WEBPACK_IMPORTED_MODULE_2_axios___default.a;


window.Vue = __WEBPACK_IMPORTED_MODULE_3_vue__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_3_vue__["a" /* default */].config.productionTip = false;




__WEBPACK_IMPORTED_MODULE_3_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_4_quasar__["s" /* default */], {
    components: {
        QBtn: __WEBPACK_IMPORTED_MODULE_4_quasar__["b" /* QBtn */], QIcon: __WEBPACK_IMPORTED_MODULE_4_quasar__["d" /* QIcon */], QPopover: __WEBPACK_IMPORTED_MODULE_4_quasar__["l" /* QPopover */], QModal: __WEBPACK_IMPORTED_MODULE_4_quasar__["k" /* QModal */], QSpinnerOval: __WEBPACK_IMPORTED_MODULE_4_quasar__["n" /* QSpinnerOval */], QLayout: __WEBPACK_IMPORTED_MODULE_4_quasar__["h" /* QLayout */], QFixedPosition: __WEBPACK_IMPORTED_MODULE_4_quasar__["c" /* QFixedPosition */], QProgress: __WEBPACK_IMPORTED_MODULE_4_quasar__["m" /* QProgress */]
    }
});


__WEBPACK_IMPORTED_MODULE_3_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_7_vuex__["a" /* default */]);

window.store = new __WEBPACK_IMPORTED_MODULE_7_vuex__["a" /* default */].Store(Object(__WEBPACK_IMPORTED_MODULE_8__store_store_js__["a" /* default */])());



window.itemGetters = {};
__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(store.state.nodes).forEach(function (id) {
    itemGetters[id] = new __WEBPACK_IMPORTED_MODULE_3_vue__["a" /* default */]({
        store: store,
        data: {
            item: store.state.nodes[id]
        },
        computed: __WEBPACK_IMPORTED_MODULE_9__store_ItemComputedProperties_js__["a" /* default */]
    });
});


__WEBPACK_IMPORTED_MODULE_3_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_10_vuelidate___default.a);


window.router = __WEBPACK_IMPORTED_MODULE_11__router_js__["a" /* default */];


new __WEBPACK_IMPORTED_MODULE_12__config_WindowKeyBindings_js__["a" /* default */]();


__WEBPACK_IMPORTED_MODULE_3_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_13__config_Directives_js__["a" /* default */]);


__WEBPACK_IMPORTED_MODULE_3_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_14_vue_clipboard2___default.a);

window.vm = new __WEBPACK_IMPORTED_MODULE_3_vue__["a" /* default */]({
    el: '#q-app',
    router: __WEBPACK_IMPORTED_MODULE_11__router_js__["a" /* default */],
    store: store,
    render: function render(h) {
        return h(__webpack_require__(366));
    }
});

__webpack_require__(370);

/***/ }),

/***/ 133:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return stringToKeyboardKeys; });
/* unused harmony export mobilecheck */
/* unused harmony export objectToArray */
/* unused harmony export uniqBy */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return uniq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return arrayToString; });
/* unused harmony export sec_to_hourmin */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return scrollToElementIfNeeded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return scrollToElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return sortObjectArrayByProperty; });
/* unused harmony export sortObjectArrayByTwoProperties */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return removeEmptyValuesFromArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utilities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return makeTagObject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_date_fns_format__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_date_fns_format___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_date_fns_format__);





function makeTagObject(tagAsString) {
	console.log('running makeTagObject...');
	if (Array.isArray(tagAsString)) {
		return tagAsString.map(function (tag) {
			return makeTagObject(tag);
		});
	}
	return {
		temp: true,
		tag_name: tagAsString,
		tag_slug: Utilities.tagNameToSlug(tagAsString),
		tag: {
			temp: true,
			name: tagAsString,
			slug: Utilities.tagNameToSlug(tagAsString)
		}
	};
}

function mobilecheck() {
	var check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}
function stringToKeyboardKeys(str) {
	return str.split(' ').map(function (k) {
		if (!k.includes('+') && !k.includes('click')) {
			return '<span class=\'o-keyboardkey\'>' + k + '</span>';
		} else {
			return k;
		}
	}).join(' ');
}
function arrayToString(arr) {
	if (!Array.isArray(arr) || !arr.length) {
		return '';
	}
	var c_o = '';
	arr.forEach(function (entry) {
		c_o = c_o + ',' + entry;
	});
	return c_o.substring(1);
}
function objectToArray(obj) {
	return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_object_keys___default()(obj).map(function (key) {
		return obj[key];
	});
}

function hasClass(element, cls) {
	return (' ' + element.className + ' ').includes(' ' + cls + ' ');
}
function addClass(element, cls) {
	if (!(' ' + element.className + ' ').includes(' ' + cls + ' ')) {
		element.className += " " + cls;
	}
	return element;
}
function removeClass(element, cls) {
	element.className = ' ' + element.className + ' ';
	if (element.className.includes(' ' + cls + ' ')) {
		element.className = element.className.replace(' ' + cls + ' ', ' ');
	}
	return element;
}

function removeEmptyValuesFromArray(array) {
	var cleanArray = [];
	array = array.map(function (e) {
		return e.trim();
	});
	array.forEach(function (val) {
		if (val.replace(/\s/g, "").length) {
			cleanArray.push(val);
		}
	}.bind(cleanArray));
	return cleanArray;
}

function sortObjectArrayByProperty(array, propertyName) {
	var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'asc';

	return array.sort(function (a, b) {
		var textA = a[propertyName] ? a[propertyName].toUpperCase() : ' ';
		var textB = b[propertyName] ? b[propertyName].toUpperCase() : ' ';
		if (order == 'asc') {
			return textA < textB ? -1 : textA > textB ? 1 : 0;
		} else if (order == 'desc') {
			return textA > textB ? -1 : textA < textB ? 1 : 0;
		}
	}.bind(propertyName));
}

function sortObjectArrayByTwoProperties(array, prop1, prop2) {
	var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'asc';
	var order2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'asc';

	var props = { prop1: prop1, prop2: prop2 };
	return array.sort(function (a, b) {
		prop1 = props['prop1'];
		prop2 = props['prop2'];

		var textA = void 0;
		var textB = void 0;
		if (a[prop1]) {
			textA = prop1.includes('date_forgetabboutit') ? new Date(__WEBPACK_IMPORTED_MODULE_5_date_fns_format___default()(new Date(a[prop1]), 'YYYY/MM/DD')) : a[prop1].toUpperCase();
		} else {
			textA = ' ';
		}
		if (b[prop1]) {
			textB = prop1.includes('date_forgetabboutit') ? new Date(__WEBPACK_IMPORTED_MODULE_5_date_fns_format___default()(new Date(b[prop1]), 'YYYY/MM/DD')) : b[prop1].toUpperCase();
		} else {
			textB = ' ';
		}

		if (order == 'asc') {
			if (textA < textB) {
				return -1;
			} else if (textA > textB) {
				return 1;
			} else {
				if (!a[prop2] || !b[prop2]) {
					return 0;
				}
				var text2A = a[prop2] ? a[prop2].toUpperCase() : ' ';
				var text2B = b[prop2] ? b[prop2].toUpperCase() : ' ';
				if (order2 == 'asc') {
					return text2A > text2B ? -1 : text2A < text2B ? 1 : 0;
				} else if (order2 == 'desc') {
					return text2A < text2B ? -1 : text2A > text2B ? 1 : 0;
				}
			}
		} else if (order == 'desc') {
			if (textA > textB) {
				return -1;
			} else if (textA < textB) {
				return 1;
			} else {
				if (!a[prop2] || !b[prop2]) {
					return 0;
				}
				var _text2A = a[prop2] ? a[prop2].toUpperCase() : ' ';
				var _text2B = b[prop2] ? b[prop2].toUpperCase() : ' ';

				if (order2 == 'asc') {
					return _text2A > _text2B ? -1 : _text2A < _text2B ? 1 : 0;
				} else if (order2 == 'desc') {
					return _text2A < _text2B ? -1 : _text2A > _text2B ? 1 : 0;
				}
			}
		}
	}.bind(props));
}
function uniqBy(a, key) {
	key = key ? key : __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default.a;
	var seen = {};
	return a.filter(function (item) {
		var k = key(item);
		if (!k || k == "null") {
			return false;
		}
		return seen.hasOwnProperty(k) ? false : seen[k] = true;
	});
}
function uniq(a) {
	return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from___default()(new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default.a(a));
}
function isElementInViewport(el) {
	var rect = el.getBoundingClientRect();
	var panelNavHeight = 40;
	var topVar = store.getters.mobile ? 0 : panelNavHeight;
	var bottomVar = window.innerHeight || document.documentElement.clientHeight;
	bottomVar = !store.getters.mobile ? bottomVar : bottomVar - panelNavHeight;
	return rect.top >= topVar && rect.left >= 0 && rect.bottom <= bottomVar && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function scrollToElementIfNeeded(el) {
	if (!isElementInViewport(el)) {
		el.scrollIntoView();
		window.scrollBy(0, -40);
	}
}
function scrollToElement(el) {
	el.scrollIntoView();
	window.scrollBy(0, -40);
}
var Utilities = {
	tagNameToSlug: function tagNameToSlug(tag) {
		if (!tag || typeof tag != 'string') {
			return;
		}
		return tag.split(' ').join('-').toLowerCase();
	},
	tagSlugToName: function tagSlugToName(tag) {
		tag = tag.replace(/-/g, ' ');
		tag = tag.split(' ').map(function (_ref) {
			var _ref2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toArray___default()(_ref),
			    h = _ref2[0],
			    t = _ref2.slice(1);

			return h.toUpperCase() + t.join('').toLowerCase();
		}).join(' ');
		return tag;
	},
	AplusB: function AplusB(a, b) {
		return parseFloat(a) + parseFloat(b);
	}
};



/***/ }),

/***/ 211:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 213:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state_js__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getters_js__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mutations_js__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_js__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_user_js__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_userSettings_js__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_api_js__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_selection_js__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_newItem_js__ = __webpack_require__(343);










/* harmony default export */ __webpack_exports__["a"] = (function () {
	return {
		state: Object(__WEBPACK_IMPORTED_MODULE_0__state_js__["a" /* default */])(),
		getters: __WEBPACK_IMPORTED_MODULE_1__getters_js__["a" /* default */],
		mutations: __WEBPACK_IMPORTED_MODULE_2__mutations_js__["a" /* default */],
		actions: __WEBPACK_IMPORTED_MODULE_3__actions_js__["a" /* default */],
		modules: {
			user: __WEBPACK_IMPORTED_MODULE_4__modules_user_js__["a" /* default */],
			userSettings: __WEBPACK_IMPORTED_MODULE_5__modules_userSettings_js__["a" /* default */],
			api: __WEBPACK_IMPORTED_MODULE_6__modules_api_js__["a" /* default */],
			selection: __WEBPACK_IMPORTED_MODULE_7__modules_selection_js__["a" /* default */],
			newItem: __WEBPACK_IMPORTED_MODULE_8__modules_newItem_js__["a" /* default */]
		}
	};
});

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	'copyClipboard': {
		'mac': '',
		'win': '',
		'name': {
			'en': 'copy',
			'ja': 'コピー'
		},
		'guide': {
			'en': 'Copy to clipboard',
			'ja': 'クリップボードにコピー'
		},
		'popmenu': {
			'en': 'Copy to clipboard',
			'ja': 'クリップボードにコピー'
		},
		'success': {
			'en': 'Copied successfully! Now go paste!',
			'ja': 'コピーしました！どこかにペーストしましょう！'
		},
		'error': {
			'en': "There was an error copy'ing! Please let <a href='mailto:mesqueeb@gmail.com'>Luca Ban</a> know!",
			'ja': "コピーしようとしたけど、エラーが起きました！<a href='mailto:mesqueeb@gmail.com'>バン・ルカへのお知らせ</a>ください！"
		}
	},
	'delete': {
		'mac': '⌫',
		'win': '⌫',
		'name': {
			'en': 'delete',
			'ja': '削除'
		},
		'guide': {
			'en': 'Delete item',
			'ja': '削除'
		},
		'popmenu': {
			'en': 'Delete item',
			'ja': '削除'
		}
	},
	'setToday': {
		'mac': 'T',
		'win': 'T',
		'name': {
			'en': 'do today',
			'ja': '今日やる'
		},
		'guide': {
			'en': 'Do <u>T</u>oday',
			'ja': '今日に設定'
		},
		'popmenu': {
			'en': 'Do <u>T</u>oday',
			'ja': '今日に設定'
		}
	},
	'setTomorrow': {
		'mac': '-',
		'win': '-',
		'name': {
			'en': 'do tomorrow',
			'ja': '明日やる'
		},
		'guide': {
			'en': 'Do tomorrow',
			'ja': '明日に設定'
		},
		'popmenu': {
			'en': 'Do tomorrow',
			'ja': '明日に設定'
		}
	},
	'timer': {
		'mac': 'S',
		'win': 'S',
		'name': {
			'en': 'timer',
			'ja': 'タイマー'
		},
		'guide': {
			'en': '<u>S</u>topwatch / Timer',
			'ja': 'ストップウォッチ / タイマー'
		},
		'popmenu': {
			'en': '',
			'ja': ''
		}
	},
	'indent': {
		'mac': 'tab',
		'win': 'tab',
		'name': {
			'en': '',
			'ja': ''
		},
		'guide': {
			'en': 'Indent item',
			'ja': 'アイテムを右へ'
		},
		'popmenu': {
			'en': '',
			'ja': ''
		}
	},
	'add': {
		'mac': 'enter',
		'win': 'enter',
		'name': {
			'en': '',
			'ja': ''
		},
		'guide': {
			'en': 'Add item',
			'ja': 'アイテムを追加'
		},
		'popmenu': {
			'en': '',
			'ja': ''
		}
	},
	'edit': {
		'mac': '⌘ enter',
		'win': 'ctrl enter',
		'name': {
			'en': 'edit',
			'ja': '編集'
		},
		'guide': {
			'en': 'Edit item',
			'ja': 'アイテムを編集'
		},
		'popmenu': {
			'en': 'Edit item',
			'ja': 'アイテムを編集'
		}
	},
	'editTag': {
		'mac': 'shift T',
		'win': 'shift T',
		'name': {
			'en': '',
			'ja': ''
		},
		'guide': {
			'en': 'Edit tags',
			'ja': 'タグを編集'
		},
		'popmenu': {
			'en': '',
			'ja': ''
		}
	},
	'hideTag': {
		'mac': "alt click",
		'win': "alt click",
		'name': {
			'en': '',
			'ja': ''
		},
		'guide': {
			'en': 'Hide tag',
			'ja': 'タグのアイテムを非表示'
		},
		'popmenu': {
			'en': '',
			'ja': ''
		}
	},
	'move': {
		'mac': '⌘ ↑↓',
		'win': 'ctrl ↑↓',
		'name': {
			'en': '',
			'ja': ''
		},
		'guide': {
			'en': 'Move item up/down',
			'ja': 'アイテムを上下へ移動'
		},
		'popmenu': {
			'en': '',
			'ja': ''
		}
	},
	'duplicate': {
		'mac': '⌘ shift D',
		'win': 'ctrl shift D',
		'name': {
			'en': '',
			'ja': ''
		},
		'guide': {
			'en': 'Duplicate item',
			'ja': 'アイテムを複製'
		},
		'popmenu': {
			'en': 'Duplicate item',
			'ja': 'アイテムを複製'
		}
	}
});

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns_esm__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_globalFunctions_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_clipboardFormat_js__ = __webpack_require__(62);




function flattenTree(array) {
	var flattenedTree = [];
	array.forEach(function (item) {
		flattenedTree.push(item);
		if (item.children.length) {
			Array.prototype.push.apply(flattenedTree, flattenTree(item.children));
		}
	});
	return flattenedTree;
}

/* harmony default export */ __webpack_exports__["a"] = ({
	totalPlannedMin: function totalPlannedMin() {
		var t0__a = performance.now();
		console.log('running totalPlannedMin...');
		var item = this.item;
		var selfValue = item.planned_time ? parseFloat(item.planned_time) : 0;
		var childrenArray = this.allChildItems;
		if (!childrenArray || !childrenArray.length) {
			return selfValue;
		}
		var x = childrenArray.reduce(function (prevVal, child) {
			var plannedTime = !child ? 0 : child.planned_time;
			return prevVal + parseFloat(plannedTime);
		}, selfValue);
		var t1__a = performance.now();
		console.log("			call to totalPlannedMin took " + (t1__a - t0__a) + " milliseconds.");
		return x ? parseFloat(x) : 0;
	},
	totalUsedSec: function totalUsedSec() {
		var t0__a = performance.now();
		console.log('running totalUsedSec...');
		var item = this.item;
		var childrenArray = this.allChildItems;
		var selfValue = item.used_time ? parseFloat(item.used_time) : 0;
		if (!childrenArray || !childrenArray.length) {
			return selfValue;
		}

		var x = childrenArray.reduce(function (prevVal, child) {
			var usedTime = !child ? 0 : child.used_time;
			return prevVal + parseFloat(usedTime);
		}, selfValue);
		var t1__a = performance.now();
		console.log("			call to totalUsedSec took " + (t1__a - t0__a) + " milliseconds.");
		return x ? x : 0;
	},
	totalPlannedSec: function totalPlannedSec() {
		console.log('running totalPlannedSec...');
		return this.totalPlannedMin * 60;
	},
	totalSecLeft: function totalSecLeft() {
		console.log('running totalSecLeft...');
		return this.totalPlannedSec - this.totalUsedSec;
	},
	totalVisiblePlannedMin: function totalVisiblePlannedMin() {
		var t0__a = performance.now();
		console.log('running totalVisiblePlannedMin...');
		var item = this.item;
		var selfValue = item.planned_time ? parseFloat(item.planned_time) : 0;
		var childrenArray = this.allVisibleChildIds;
		if (!childrenArray || !childrenArray.length) {
			return selfValue;
		}
		var x = childrenArray.reduce(function (prevVal, childId) {
			var child = store.state.nodes[childId];
			var plannedTime = !child ? 0 : child.planned_time;
			return prevVal + parseFloat(plannedTime);
		}, selfValue);
		var t1__a = performance.now();
		console.log("			call to totalVisiblePlannedMin took " + (t1__a - t0__a) + " milliseconds.");
		return x ? parseFloat(x) : 0;
	},
	totalVisibleUsedSec: function totalVisibleUsedSec() {
		var t0__a = performance.now();
		console.log('running totalVisibleUsedSec...');
		var item = this.item;
		var childrenArray = this.allVisibleChildIds;
		var selfValue = item.used_time ? parseFloat(item.used_time) : 0;
		if (!childrenArray || !childrenArray.length) {
			return selfValue;
		}

		var x = childrenArray.reduce(function (prevVal, childId) {
			var child = store.state.nodes[childId];
			var usedTime = !child ? 0 : child.used_time;
			return prevVal + parseFloat(usedTime);
		}, selfValue);
		var t1__a = performance.now();
		console.log("			call to totalVisibleUsedSec took " + (t1__a - t0__a) + " milliseconds.");
		return x ? x : 0;
	},
	totalVisiblePlannedSec: function totalVisiblePlannedSec() {
		console.log('running totalVisiblePlannedSec...');
		return this.totalVisiblePlannedMin * 60;
	},
	totalVisibleSecLeft: function totalVisibleSecLeft() {
		console.log('running totalVisibleSecLeft...');
		return this.totalVisiblePlannedSec - this.totalVisibleUsedSec;
	},
	secLeft: function secLeft() {
		console.log('running secLeft...');
		if (!this.item) {
			return 0;
		}
		return this.item.planned_time * 60 - this.item.used_time;
	},
	totalTimeDifferentFromParent: function totalTimeDifferentFromParent() {
		console.log('running totalTimeDifferentFromParent...');
		if (!this.item.parent_id) {
			return true;
		}
		if (!itemGetters[this.item.parent_id]) {
			return true;
		}
		return this.totalPlannedSec != itemGetters[this.item.parent_id].totalPlannedSec;
	},
	tagsArray: function tagsArray() {
		console.log('running tagsArray...');
		return this.item.tagged.map(function (obj) {
			return obj.tag_name;
		});
	},
	siblingIndex: function siblingIndex() {
		console.log('running siblingIndex...');
		var id = this.item.id;
		var parentId = this.item.parent_id;
		if (!parentId || !store.state.nodes[parentId]) {
			return false;
		}
		var siblingsArray = store.state.nodes[parentId].children_order;
		return siblingsArray.indexOf(id);
	},
	visibleSiblingIndex: function visibleSiblingIndex() {
		console.log('running siblingIndex...');
		var id = this.item.id;
		var parentId = this.item.parent_id;
		if (!parentId || !store.state.nodes[parentId]) {
			return false;
		}
		var siblingsArray = itemGetters[parentId].visibleDirectChildIds;
		return siblingsArray.indexOf(id);
	},
	olderSiblingId: function olderSiblingId() {
		console.log('running olderSiblingId...');
		var id = this.item.id;
		var parentId = this.item.parent_id;
		if (!parentId) {
			return;
		}
		var siblingsArray = store.state.nodes[parentId].children_order;
		if (siblingsArray.length <= 1 || this.siblingIndex == 0) {
			return parentId;
		}
		var siblingIndex = siblingsArray.indexOf(id);
		return store.state.nodes[parentId].children_order[siblingIndex - 1];
	},
	nextItemId: function nextItemId() {
		console.log('running nextItemId...');
		var id = this.item.id;
		var item = this.item;
		if (!id) {
			return;
		}

		if (store.state.selection.view == 'journal') {
			var journalItems = store.getters.filteredItemsFlat.map(function (item) {
				return item.id;
			});
			var ind = journalItems.indexOf(id);
			if (ind + 1 == journalItems.length) {
				return journalItems[0];
			}
			return journalItems[ind + 1];
		} else if (store.getters.filteredIdsTree.includes(id) && (!this.visibleDirectChildren.length || !item.show_children)) {
				var _ind = store.getters.filteredIdsTree.indexOf(id);
				if (_ind + 1 == store.getters.filteredIdsTree.length) {
					return store.getters.filteredIdsTree[0];
				}
				return store.getters.filteredIdsTree[_ind + 1];
			} else if (this.visibleDirectChildIds.length && item.show_children) {
					return this.visibleDirectChildIds[0];
				} else {
						return this.nextItemRecursion;
					}
	},
	nextItemRecursion: function nextItemRecursion() {
		console.log('running nextItemRecursion...');
		var id = this.item.id;
		if (!id) {
			return;
		}
		if (this.itIsADeepestChild) {
			var topLvlItemId = this.topLvlParentOfDeepestChild;
			var _index = store.getters.filteredIdsTree.indexOf(topLvlItemId);
			if (_index + 1 == store.getters.filteredIdsTree.length) {
				var firstItemId = store.getters.filteredIdsTree[0];
				if (firstItemId == id) {
					return null;
				}
				return firstItemId;
			}
			return store.getters.filteredIdsTree[_index + 1];
		}
		var index = this.visibleSiblingIndex;
		var parentId = this.item.parent_id;
		if (!parentId) {
			return;
		}
		var parentsChildren = itemGetters[parentId].visibleDirectChildIds;
		if (index + 1 == parentsChildren.length) {
			if (parentId == store.state.root.id) {
				return;
			}
			return itemGetters[parentId].nextItemRecursion;
		}
		return parentsChildren[index + 1];
	},
	nextSiblingOrParentsSiblingId: function nextSiblingOrParentsSiblingId() {
		console.log('running nextSiblingOrParentsSiblingId...');
		var parentId = this.item.parent_id;
		if (!parentId) {
			return;
		}
		var children_order = store.state.nodes[parentId].children_order;
		var nextIndex = this.siblingIndex + 1;
		if (nextIndex == children_order.length) {
			return itemGetters[parentId].nextSiblingOrParentsSiblingId;
		} else {
			return children_order[nextIndex];
		}
	},
	findDeepestVisibleChild: function findDeepestVisibleChild() {
		console.log('running findDeepestVisibleChild...');
		var id = this.item.id;
		var childrenIds = this.visibleDirectChildIds;
		if (!childrenIds.length) {
			return id;
		}
		var deepestId = childrenIds[childrenIds.length - 1];
		return itemGetters[deepestId].findDeepestVisibleChild;
	},
	itIsADeepestChild: function itIsADeepestChild() {
		console.log('running itIsADeepestChild...');
		var id = this.item.id;

		if (!id) {
			console.log('you need an ID');return;
		}
		return store.getters.filteredItemsTreeDeepestChildren.map(function (item) {
			return item.deepestChild;
		}).includes(id);
	},
	topLvlParentOfDeepestChild: function topLvlParentOfDeepestChild() {
		console.log('running topLvlParentOfDeepestChild...');
		var deepestChildId = this.item.id;
		var topLvlParentDeepestChildSet = store.getters.filteredItemsTreeDeepestChildren.find(function (obj) {
			return obj.deepestChild == deepestChildId;
		});
		if (!topLvlParentDeepestChildSet) {
			return;
		}
		return topLvlParentDeepestChildSet.id;
	},
	isFirstItem: function isFirstItem() {
		console.log('running isFirstItem...');
		if (store.getters.noItems) {
			return false;
		}
		return this.siblingIndex == 0;
	},
	prevItemId: function prevItemId() {
		console.log('running prevItemId...');
		var id = this.item.id;
		if (!id || this.item.depth == 0) {
			return false;
		}
		var prevItemId = void 0;

		if (store.state.selection.view == 'journal') {
			var journalItems = store.getters.filteredItemsFlat.map(function (item) {
				return item.id;
			});
			var index = journalItems.indexOf(id);
			if (index == 0) {
				prevItemId = journalItems[journalItems.length - 1];
			} else {
				prevItemId = journalItems[index - 1];
			}
		} else if (store.getters.filteredIdsTree.includes(id)) {
				var topLvlIds = store.getters.filteredIdsTree;
				var _index2 = topLvlIds.indexOf(id);
				if (_index2 == 0) {
					prevItemId = itemGetters[topLvlIds[topLvlIds.length - 1]].findDeepestVisibleChild;
				} else {
					prevItemId = itemGetters[topLvlIds[_index2 - 1]].findDeepestVisibleChild;
				}
			} else {
				var item = this.item;
				var _index3 = this.visibleSiblingIndex;
				if (_index3 == 0) {
					prevItemId = item.parent_id;
				} else {
					var elderSiblingId = itemGetters[item.parent_id].visibleDirectChildIds[_index3 - 1];
					prevItemId = itemGetters[elderSiblingId].findDeepestVisibleChild;
				}
			}
		return prevItemId;
	},
	isTopLvlItemInFilteredRoot: function isTopLvlItemInFilteredRoot() {
		console.log('running isTopLvlItemInFilteredRoot...');
		var id = this.item.id;
		if (store.getters['selection/nothingSelected'] && store.state.selection.view == 'tree') {
			return false;
		}
		if (id == store.state.root.id) {
			return true;
		}
		return store.getters.filteredIdsTree.includes(id);
	},
	relativeDepth: function relativeDepth() {
		if (this.item.isTopLvlItemInFilteredRoot) {
			return 0;
		}
		var item = this.item;
		if (!item.parent_id) {
			return 0;
		}
		var parent = store.state.nodes[item.parent_id];
		if (!parent) {
			return 0;
		}
		return itemGetters[item.parent_id].relativeDepth + 1;
	},
	hasParentDueToday: function hasParentDueToday() {
		var item = this.item;
		if (!item.parent_id) {
			return false;
		}
		var parent = store.state.nodes[item.parent_id];
		if (!parent) {
			return false;
		}
		var parentIsDueToday = itemGetters[item.parent_id].isDueToday;
		if (parentIsDueToday) {
			return true;
		} else {
			return itemGetters[item.parent_id].hasParentDueToday;
		}
	},
	isDueToday: function isDueToday() {
		if (this.item.done) {
			return false;
		}

		var diff = Object(__WEBPACK_IMPORTED_MODULE_0_date_fns_esm__["a" /* differenceInCalendarDays */])(new Date(this.item.due_date.replace(/-/g, "/")), new Date());
		if (diff <= 0) {
			return true;
		}
		return false;
	},
	isDueFlat: function isDueFlat() {
		return this.isDueToday || this.hasParentDueToday;
	},
	isProject: function isProject() {
		console.log('running isProject...');
		if (this.item.body.slice(-1) == ':') {
			return true;
		} else {
			return false;
		}
	},
	itemTagArray: function itemTagArray() {
		console.log('running itemTagArray...');
		return this.item.tagged.map(function (tagObj) {
			return tagObj.tag_name;
		});
	},
	allChildrenAreDone: function allChildrenAreDone() {
		console.log('running allChildrenAreDone...');
		var id = this.item.id;
		var children = this.item.children;
		if (!children.length) {
			return false;
		}
		var doneAmount = children.reduce(function (prev, child) {
			var a = child.done ? 1 : 0;
			return __WEBPACK_IMPORTED_MODULE_1__helpers_globalFunctions_js__["a" /* Utilities */].AplusB(a, prev);
		}, 0);
		if (children.length == doneAmount) {
			return true;
		} else {
			return false;
		}
	},
	calTotalPlannedTime: function calTotalPlannedTime() {
		console.log('running calTotalPlannedTime...');
		var item = this.item;
		var totalPlannedTime = void 0;
		if (!(Array.isArray(item.children) && item.children.length)) {
			totalPlannedTime = !item.done || store.state.selection.view == 'journal' ? parseFloat(item.planned_time) : 0;
		} else {
			totalPlannedTime = item.children.reduce(function (prev, next) {
				var x = next.totalPlannedTime ? next.totalPlannedTime : next.planned_time;
				return prev + parseFloat(x);
			}, !item.done || store.state.selection.view == 'journal' ? parseFloat(item.planned_time) : 0);
		}
		return parseFloat(totalPlannedTime);
	},
	calTotalUsedTime: function calTotalUsedTime() {
		console.log('running calTotalUsedTime...');
		var item = this.item;
		var totalUsedTime = void 0;
		if (!(Array.isArray(item.children) && item.children.length)) {
			totalUsedTime = !item.done || store.state.selection.view == 'journal' ? parseFloat(item.used_time) : 0;
		} else {
			totalUsedTime = item.children.reduce(function (prev, next) {
				var x = next.totalUsedTime ? next.totalUsedTime : next.used_time;
				return prev + parseFloat(x);
			}, !item.done || store.state.selection.view == 'journal' ? parseFloat(item.used_time) : 0);
		}
		return parseFloat(totalUsedTime);
	},
	allChildItems: function allChildItems() {
		console.log('running allChildItems...');
		var flattenedTree = flattenTree(this.item.children);

		return flattenedTree;
	},
	allVisibleChildItems: function allVisibleChildItems() {
		console.log('running allVisibleChildItems...');
		var children = this.visibleDirectChildren;
		var flattenedTree = flattenTree(children);
		var visibleChildren = flattenedTree.filter(function (child) {
			return store.getters.filteredIdsFlat.includes(child.id);
		});
		return visibleChildren;
	},
	allVisibleChildIds: function allVisibleChildIds() {
		console.log('running allVisibleChildIds...');
		return this.allVisibleChildItems.map(function (c) {
			return c.id;
		});
	},
	visibleDirectChildren: function visibleDirectChildren() {
		var item = this.item;
		if (!item.children.length || !item.show_children) {
			return [];
		}
		return item.children.filter(function (child) {
			return store.getters.filteredIdsFlat.includes(child.id);
		});
	},
	visibleDirectChildIds: function visibleDirectChildIds() {
		console.log('running visibleDirectChildIds...');
		return this.visibleDirectChildren.map(function (c) {
			return c.id;
		});
	},
	clipboardText: function clipboardText() {
		console.log('running clipboardText...');
		return Object(__WEBPACK_IMPORTED_MODULE_2__helpers_clipboardFormat_js__["a" /* default */])([this.item], { first: true });
	}
});

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns_esm__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_quasar__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_valueMorphers2_js__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helpers_clipboardFormat_js__ = __webpack_require__(62);








/* harmony default export */ __webpack_exports__["a"] = ({
	filteredItemsUsedSec: function filteredItemsUsedSec(state, getters) {
		return itemGetters[state.root.id].totalVisibleUsedSec;
	},
	filteredItemsSecLeft: function filteredItemsSecLeft(state, getters) {
		return itemGetters[state.root.id].totalVisibleSecLeft;
	},
	hasTag: function hasTag(state, getters) {
		return function (id, tags) {
			console.log('running hasTag...');
			var item = state.nodes[id];
			if (!item) {
				console.log("[hasTag(id, tags)] what is state shit... id:" + id);return false;
			}
			if (!item.tagged || !item.tagged.length) {
				return false;
			}
			var hasTags = void 0;
			if (!Array.isArray(tags)) {
				tags = [tags];
			}
			tags.forEach(function (tag) {
				tag = __WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["a" /* Utilities */].tagNameToSlug(tag);
				var tagExists = item.tagged.find(function (itemTags) {
					return itemTags.tag_slug == tag;
				});
				if (tagExists) {
					hasTags = true;
				}
			});
			return hasTags;
		};
	},
	hasAllTags: function hasAllTags(state, getters) {
		return function (id, tags) {
			var item = state.nodes[id];
			if (!item) {
				return false;
			}
			if (!item.tagged || !item.tagged.length) {
				return false;
			}
			if (!Array.isArray(tags)) {
				tags = [tags];
			}
			var hasAllTags = tags.every(function (tag) {
				return item.tagged.filter(function (itemTagObject) {
					return itemTagObject.tag_slug == __WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["a" /* Utilities */].tagNameToSlug(tag);
				}).length;
			});
			return hasAllTags;
		};
	},
	hasParentWithTag: function hasParentWithTag(state, getters) {
		return function (id, tags) {
			console.log('running getters.hasParentWithTag...');
			if (!id) {
				return false;
			}
			var item = state.nodes[id];
			var parentId = state.nodes[id].parent_id;
			if (!parentId) {
				return false;
			}
			if (!state.nodes[parentId]) {
				return false;
			}
			var parentHasTag = getters.hasTag(parentId, tags);
			return parentHasTag;
		};
	},
	parentIdWithTag: function parentIdWithTag(state, getters) {
		return function (id, tags) {
			console.log('running parentIdWithTag...');

			var item = state.nodes[id];
			console.log('id & body = ' + item.id + " - " + item.body);
			var parentId = state.nodes[id].parent_id;
			if (!parentId) {
				return false;
			}

			var parentHasTag = getters.hasTag(parentId, tags);
			console.log('parentHasTag');
			console.log(parentHasTag);
			if (parentHasTag) {
				return parentId;
			} else {
				return getters.parentIdWithTag(parentId, tags);
			}
		};
	},
	checkValParentTree: function (_checkValParentTree) {
		function checkValParentTree(_x, _x2) {
			return _checkValParentTree.apply(this, arguments);
		}

		checkValParentTree.toString = function () {
			return _checkValParentTree.toString();
		};

		return checkValParentTree;
	}(function (state, getters) {
		return function (id, val) {
			console.log('running checkValParentTree...');
			var pId = state.nodes[id].parent_id;
			console.log('checkValParentTree pId: ' + checkValParentTree);
			if (!pId) {
				return false;
			}
			var checkVal = state.nodes[pId].item[val];
			console.log('checkValParentTree checkVal: ' + checkVal);
			if (checkVal) {
				return checkVal;
			} else {
				return getters.checkValParentTree(pId, val);
			}
		};
	}),
	clipboardTextJournal: function clipboardTextJournal(state, getters) {
		return function (item) {
			console.log('running clipboardTextJournal...');

			var usedT = false ? '\n' + getters.text.menu.usedTime + ': ' + sec_to_hourmin(itemGetters[item].totalUsedSec) : '';
			var journalDateTxt = getters.journalDate(item) + '\n==========' + usedT;
			var allChildren = item.children.reduce(function (all, val) {
				var completionMemo = val.completion_memo ? '\n\u3000\u3000' + val.completion_memo : '';
				var pb = !all.includes('\u3010' + val.parents_bodies + '\u3011') ? '\n\u3010' + val.parents_bodies + '\u3011' : '';
				return '' + all + pb + '\n\u30FB' + val.body + completionMemo;
			}, journalDateTxt);
			return allChildren;
		};
	},
	journalDate: function journalDate(state, getters) {
		return function (item) {
			console.log('running journalDate...');
			if (!item || state.selection.view != 'journal' || !item.journalDate) {
				return false;
			}
			return item.done_date;
		};
	},

	filteredItemsTreeDeepestChildren: function filteredItemsTreeDeepestChildren(state, getters) {
		console.log('running filteredItemsTreeDeepestChildren...');
		return getters.filteredIdsTree.map(function (id) {
			var deepestChild = !itemGetters[id] ? id : itemGetters[id].findDeepestVisibleChild;
			return { id: id, deepestChild: deepestChild };
		});
	},
	oS: function oS(state, getters) {
		console.log('running oS...');
		return __WEBPACK_IMPORTED_MODULE_3_quasar__["a" /* Platform */].is.platform;
	},
	language: function language(state, getters) {
		console.log('running language...');
		if (state.setLanguage) {
			return state.setLanguage;
		} else if (defaultLanguage) {
			return defaultLanguage;
		} else {
			return 'en';
		}
	},
	text: function text(state, getters) {
		console.log('running text...');
		return state.languageContents[getters.language];
	},
	desktop: function desktop(state, getters) {
		console.log('running desktop...');
		return __WEBPACK_IMPORTED_MODULE_3_quasar__["a" /* Platform */].is.desktop;
	},
	mobile: function mobile(state, getters) {
		console.log('running mobile...');
		if (state.manualMobile) {
			return true;
		}
		return __WEBPACK_IMPORTED_MODULE_3_quasar__["a" /* Platform */].is.mobile;
	},
	mobileSmall: function mobileSmall(state, getters) {
		console.log('running mobileSmall...');
		if (window.innerWidth < 385) {
			return true;
		}
	},
	noItems: function noItems(state, getters) {
		console.log('running noItems...');
		if (!itemGetters[state.root.id].visibleDirectChildren.length) {
			return true;
		}
		return false;
	},
	editingOrAddingId: function editingOrAddingId(state, getters) {
		if (state.editingItemTags) {
			return state.editingItemTags;
		} else if (state.editingItem) {
			return state.editingItem;
		} else if (state.addingNewUnder) {
			return state.addingNewUnder;
		}
	},

	filteredItemsJournal: function filteredItemsJournal(state, getters) {
		console.log('running filteredItemsJournal...');
		if (state.selection.view != 'journal') {
			return [];
		}
		var dates = {};
		getters.filteredItemsFlat.forEach(function (item) {
			if (!item.done) {
				return;
			}
			var dd = Object(__WEBPACK_IMPORTED_MODULE_2_date_fns_esm__["b" /* format */])(item.done_date, 'YYYY-MM-DD');
			if (!dates[dd]) {
				dates[dd] = { date: dd, items: [] };
			}
			if (!state.userSettings.journalShowParentBodies) {
				dates[dd].items.push(item);
				return;
			}
			var parentBody = !item.parents_bodies ? 'null_no_parent_body' : item.parents_bodies;
			var entry = dates[dd].items.find(function (entry) {
				return entry.parentBody == parentBody;
			});
			if (!entry) {
				dates[dd].items.push({ parentBody: parentBody, items: [item] });
			} else {
				entry.items.push(item);
			}
		});
		return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(dates).map(function (dd) {
			return dates[dd];
		});
	},
	journalDates: function journalDates(state, getters) {
		console.log('running journalDates...');
		return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(getters.filteredItemsJournal);
	},
	nodesArray: function nodesArray(state) {
		return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(state.nodes).filter(function (id) {
			return id != state.root.id;
		}).map(function (id) {
			return state.nodes[id];
		});
	},

	doneItemsFlat: function doneItemsFlat(state, getters) {
		var items = getters.nodesArray;
		var result = items.filter(function (item) {
			return item.done;
		});

		return result;
	},
	doneIdsFlat: function doneIdsFlat(state, getters) {
		return getters.doneItemsFlat.map(function (item) {
			return item.id;
		});
	},
	doneItemsCountFlat: function doneItemsCountFlat(state, getters) {
		return getters.doneItemsFlat.length;
	},

	dueIdsFlat: function dueIdsFlat(state) {
		var allIds = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(state.nodes);
		var result = allIds.filter(function (id) {
			return itemGetters[id].isDueFlat;
		});
		return result;
	},
	dueItemsFlat: function dueItemsFlat(state, getters) {
		return getters.dueIdsFlat.map(function (id) {
			return state.nodes[id];
		});
	},
	dueItemsCountFlat: function dueItemsCountFlat(state, getters) {
		return getters.dueIdsFlat.length;
	},
	dueIdsTree: function dueIdsTree(state) {
		var allIds = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(state.nodes);
		var result = allIds.filter(function (id) {
			return itemGetters[id].isDueToday;
		});
		return result;
	},
	dueItemsTree: function dueItemsTree(state, getters) {
		return getters.dueIdsTree.map(function (id) {
			return state.nodes[id];
		});
	},
	dueItemsCountTree: function dueItemsCountTree(state, getters) {
		return getters.dueIdsTree.length;
	},

	itemsWithSelectedTagsTree: function itemsWithSelectedTagsTree(state, getters) {
		var tagFilters = state.selection.tags;
		if (!tagFilters.length) {
			return [];
		}

		var items = tagFilters.map(function (tagSlug) {
			return itemsByTag[tagSlug].tree;
		});
		items = items.reduce(function (items, array) {
			return items.concat(array);
		}, []);
		items = items.filter(function (item) {
			return getters.hasAllTags(item.id, tagFilters);
		});
		items = Object(__WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["l" /* uniq */])(items);
		return items;
	},
	itemsWithSelectedTagsFlat: function itemsWithSelectedTagsFlat(state, getters) {
		var tagFilters = state.selection.tags;
		if (!tagFilters.length) {
			return [];
		}

		var items = void 0;
		if (tagFilters.length == 1) {
			items = itemsByTag[tagFilters[0]].flat;
		} else if (tagFilters.length > 1) {
			var tagFiltersCounts = tagFilters.map(function (tagSlug) {
				return itemsByTag[tagSlug].countFlat;
			});
			var smallestResult = Math.min.apply(Math, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(tagFiltersCounts));
			var startTag = tagFilters.find(function (tagSlug) {
				return itemsByTag[tagSlug].countFlat == smallestResult;
			});
			var remainingTags = tagFilters.filter(function (tagSlug) {
				return tagSlug != startTag;
			});
			items = itemsByTag[startTag].flat;
			items = items.filter(function (item) {
				return getters.hasAllTags(item.id, remainingTags);
			});
		}
		return items;
	},

	filteredItemsTree: function filteredItemsTree(state, getters) {
		console.log('			running filteredItemsTree 2...');
		var t0 = performance.now();
		state.computing = true;
		var items = void 0;

		if (state.selection.view == 'journal') {
			return getters.filteredItemsFlat;
		}
		if (getters['selection/noFilterOrTag']) {
			items = state.root.children;
		}
		var tagFilters = state.selection.tags;
		if (tagFilters.length && !getters['selection/dueItemsFiltered']) {
			items = getters.itemsWithSelectedTagsTree;
		}
		if (getters['selection/dueItemsFiltered'] && !tagFilters.length) {
			items = getters.dueItemsTree;
		}
		if (getters['selection/dueItemsFiltered'] && tagFilters.length) {
			items = getters.dueItemsFlat;
			items = items.filter(function (item) {
				return getters.hasAllTags(item.id, tagFilters) && !(getters.hasAllTags(item.parent_id, tagFilters) && itemGetters[item.id].hasParentDueToday);
			});
		}
		var t1 = performance.now();
		console.log("			call to filteredItemsTree 2 took " + (t1 - t0) + " milliseconds.");
		state.computing = false;
		return items;
	},
	filteredIdsTree: function filteredIdsTree(state, getters) {
		console.log(getters.filteredItemsTree);
		return getters.filteredItemsTree.map(function (item) {
			return item.id;
		});
	},
	filteredItemsFlat: function filteredItemsFlat(state, getters) {
		console.log('			running filteredItemsFlat 2...');
		var t0 = performance.now();

		var items = void 0;
		if (getters['selection/noFilterOrTag']) {
			items = getters.nodesArray;
		}
		var tagFilters = state.selection.tags;
		var taggedItems = [];
		if (tagFilters.length) {
			taggedItems = getters.itemsWithSelectedTagsFlat;
			items = taggedItems;
		}
		var dueItems = [];
		if (getters['selection/dueItemsFiltered']) {
			dueItems = getters.dueItemsFlat;
			items = dueItems;
		}
		if (taggedItems.length && dueItems.length) {
			var smallestResult = Math.min(dueItems.length, taggedItems.length);
			if (taggedItems.length == smallestResult) {
				items = taggedItems.filter(function (item) {
					return itemGetters[item.id].isDueFlat;
				});
			} else {
				items = dueItems.filter(function (item) {
					return getters.hasAllTags(item.id, tagFilters);
				});
			}
		}
		if (state.selection.view == 'journal' && (taggedItems.length || dueItems.length)) {
			items = items.filter(function (item) {
				return item.done;
			});
			items = Object(__WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["j" /* sortObjectArrayByProperty */])(items, 'done_date', 'desc');
		}
		if (state.selection.view == 'journal' && !taggedItems.length && !dueItems.length) {
			items = getters.doneItemsFlat;
			items = Object(__WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["j" /* sortObjectArrayByProperty */])(items, 'done_date', 'desc');
		}
		var t1 = performance.now();
		console.log("			call to filteredItemsFlat 2 took " + (t1 - t0) + " milliseconds.");
		return items;
	},
	filteredIdsFlat: function filteredIdsFlat(state, getters) {
		return getters.filteredItemsFlat.map(function (item) {
			return item.id;
		});
	},
	itemCount: function itemCount(state, getters) {
		console.log('running itemCount...');
		return getters.filteredIdsFlat.length;
	},

	allTagsComputed: function allTagsComputed(state, getters) {
		console.log('running allTagsComputed...');
		var t0 = performance.now();
		var items = getters.filteredItemsFlat;
		if (!items.length) {
			return [];
		}

		var allTagsObj = {};
		var allTagsObjAdd = function allTagsObjAdd(taggedObj) {
			if (!taggedObj.tag || !taggedObj.tag.name) {
				return;
			}
			allTagsObj[taggedObj.tag_slug] = taggedObj.tag;
		};
		items.forEach(function (item) {
			return item.tagged.forEach(allTagsObjAdd);
		});
		var allTagsArray = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(allTagsObj).map(function (k) {
			return allTagsObj[k];
		});
		allTagsArray = Object(__WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["j" /* sortObjectArrayByProperty */])(allTagsArray, 'name');

		var t1 = performance.now();
		console.log("			call to allTagsComputed 1c took " + (t1 - t0) + " milliseconds.");
		return allTagsArray;
	},
	lastItems: function lastItems(state, getters) {
		console.log('running lastItems...');
		if (getters.noItems) {
			return [];
		}
		var lastChild = getters.filteredIdsTree[getters.filteredIdsTree.length - 1];
		var deepestChild = itemGetters[lastChild].findDeepestVisibleChild;
		return [lastChild, deepestChild];
	},
	firstItem: function firstItem(state, getters) {
		console.log('running firstItem...');
		if (getters.noItems) {
			return null;
		}
		return getters.filteredIdsTree[0];
	},
	clipboardTextDue: function clipboardTextDue(state, getters) {
		console.log('running clipboardTextDue...');
		return '\u25C6 Today\n' + Object(__WEBPACK_IMPORTED_MODULE_6__helpers_clipboardFormat_js__["a" /* default */])(getters.filteredItemsTree, { first: true });
	}

});

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state_js__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ItemComputedProperties_js__ = __webpack_require__(32);





/* harmony default export */ __webpack_exports__["a"] = ({
	resetStateData: function resetStateData(state) {
		var newState = Object(__WEBPACK_IMPORTED_MODULE_2__state_js__["a" /* default */])();
		state = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(state, newState);
	},
	updateState: function updateState(state, payload) {
		var key = payload.field;
		var val = payload.value;
		if (!key && !val) {
			key = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(payload).filter(function (k) {
				return k != 'id';
			})[0];
			val = payload[key];
		}
		if (payload.id) {
			state.nodes[payload.id][key] = val;
			return;
		}
		state[key] = val;
	},
	updatePopouts: function updatePopouts(state, payload) {
		var key = payload.field;
		var val = payload.value;
		if (!key && !val) {
			key = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(payload)[0];
			val = payload[key];
		}
		state.popouts[key] = val;
	},
	updatePopups: function updatePopups(state, payload) {
		var key = payload.field;
		var val = payload.value;
		if (!key && !val) {
			key = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(payload)[0];
			val = payload[key];
		}
		state.popups[key] = val;
	},
	removePopout: function removePopout(state, _ref) {
		var type = _ref.type,
		    index = _ref.index;

		state.popouts[type].splice(index, 1);
	},
	removePopup: function removePopup(state, _ref2) {
		var index = _ref2.index;

		state.popups.splice(index, 1);
	},
	addPopup: function addPopup(state, _ref3) {
		var popup = _ref3.popup;

		state.popups.push(popup);
	},
	pushFlash: function pushFlash(state, payload) {
		state.flashes.push(payload);
	},
	resetNewItem: function resetNewItem(state) {
		state.newItem.body = '';
		state.newItem.due_date = '0000-00-00 00:00:00';
		state.newItem.done_date = '0000-00-00 00:00:00';
		state.newItem.done = false;
		state.newItem.planned_time = '';
		state.newItem.preparedTags = [];
	},
	addNode: function addNode(state, _ref4) {
		var item = _ref4.item;

		var t0 = performance.now();
		vm.$set(state.nodes, item.id, item);
		itemGetters[item.id] = new Vue({
			store: store,
			data: {
				item: store.state.nodes[item.id]
			},
			computed: __WEBPACK_IMPORTED_MODULE_3__ItemComputedProperties_js__["a" /* default */]
		});
		var t1 = performance.now();
		console.log("			Call to addNode took " + (t1 - t0) + " milliseconds.");
	},
	addChild: function addChild(state, _ref5) {
		var newParentId = _ref5.newParentId,
		    index = _ref5.index,
		    item = _ref5.item;

		if (!state.nodes[newParentId].children) {
			state.nodes[newParentId].children = [];
		}
		if (!state.nodes[newParentId].children_order) {
			state.nodes[newParentId].children_order = [];
		}
		if (!index && index != 0) {
			state.nodes[newParentId].children.push(item);
			state.nodes[newParentId].children_order.push(item.id);
			return;
		}
		state.nodes[newParentId].children.splice(index, 0, item);
		state.nodes[newParentId].children_order.splice(index, 0, item.id);
	},
	addOrDeleteTempTag: function addOrDeleteTempTag(state) {
		var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref6.id,
		    tagObject = _ref6.tagObject,
		    _ref6$requestType = _ref6.requestType,
		    requestType = _ref6$requestType === undefined ? 'tag' : _ref6$requestType;

		console.log(requestType + 'ging items tempor ' + id + ' with "' + tagObject.tag_name + '"');
		if (requestType == 'tag') {
			console.log(state.nodes[id].tagged);
			state.nodes[id].tagged.push(tagObject);
			console.log(state.nodes[id].tagged);
		}
		if (requestType == 'untag') {
			state.nodes[id].tagged = state.nodes[id].tagged.filter(function (t) {
				return t.tag_slug != tagObject.tag_slug;
			});
		}
	},
	deleteTag: function deleteTag(state, _ref7) {
		var id = _ref7.id,
		    tags = _ref7.tags;

		if (!state.nodes[id]) {
			console.log('trying to tag an unexisting item');
			return;
		}
		tags.forEach(function (tag) {
			return state.nodes[id].tagged = state.nodes[id].tagged.filter(function (t) {
				return t.tag_slug != tag.tag_slug;
			});
		});
	},
	addTagTemporarely: function addTagTemporarely(state, _ref8) {
		var id = _ref8.id,
		    tags = _ref8.tags;

		var t0 = performance.now();
		if (!Array.isArray(tags)) {
			tags = [tags];
		}
		if (!state.nodes[id]) {
			console.log('trying to tag an unexisting item');
			return;
		}
		console.log('tagging items tempor ' + id + ' with... "' + tags.map(function (t) {
			return t.tag_name;
		}) + '"');

		tags.forEach(function (tag) {
			return state.nodes[id].tagged.push(tag);
		});
		var t1 = performance.now();
		console.log("			Call to commit addTagTemporarely took " + (t1 - t0) + " milliseconds.");
	},
	deleteTempItem: function deleteTempItem(state, _ref9) {
		var item = _ref9.item;

		var parent = state.nodes[item.parent_id];
		state.nodes[item.parent_id].children = parent.children.filter(function (i) {
			return !i.temp;
		});
		state.nodes[item.parent_id].children_order = parent.children_order.filter(function (i) {
			return !i.toString().includes('tempItem');
		});
		__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(state.nodes).forEach(function (k) {
			if (k.toString().includes('tempItem')) {
				vm.$delete(state.nodes, k);
			}
		});
	},
	deleteChild: function deleteChild(state, _ref10) {
		var index = _ref10.index,
		    id = _ref10.id;

		state.nodes[id].children.splice(index, 1);
		state.nodes[id].children_order.splice(index, 1);
	},
	closeFlash: function closeFlash(state, _ref11) {
		var flash = _ref11.flash;

		state.flashes = state.flashes.filter(function (f) {
			return f != flash;
		});
	}
});

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_nan__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_nan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_nan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_date_fns_esm__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__setDefaultItemValues_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_quasar__ = __webpack_require__(31);








var addToDate = __WEBPACK_IMPORTED_MODULE_6_quasar__["r" /* date */].addToDate;


/* harmony default export */ __webpack_exports__["a"] = ({
	resetStore: function resetStore(_ref) {
		var commit = _ref.commit;

		commit('newItem/resetStateData');
		commit('selection/resetStateData');
		commit('userSettings/resetStateData');
		commit('user/resetStateData');
		commit('resetStateData');
	},
	giveNewParent: function giveNewParent(_ref2) {
		var state = _ref2.state,
		    commit = _ref2.commit,
		    dispatch = _ref2.dispatch,
		    getters = _ref2.getters;

		var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref3.id,
		    new_parent_id = _ref3.new_parent_id,
		    specificNewIndex = _ref3.specificNewIndex;

		if (itemGetters[id].isTopLvlItemInFilteredRoot) {
			var errMsg = getters.text.flashes.moveTopLvlItem;
			console.log(errMsg);
			dispatch('sendFlash', { type: 'warning', msg: errMsg });
			return;
		}
		console.log('giving new parent');
		var parent_id = state.nodes[id].parent_id;
		var targetItem = state.nodes[id];
		var newParent = state.nodes[new_parent_id];
		console.log('newParent ↓ ');
		console.log(newParent);
		var prevParent = state.nodes[parent_id];
		console.log('prevParent ↓ ');
		console.log(prevParent);
		var siblingIndex = itemGetters[id].siblingIndex;

		commit('updateState', { id: id, field: 'parent_id', value: new_parent_id });

		commit('updateState', { id: id, field: 'depth', value: newParent.depth + 1 });


		if (!newParent.children_order) {
			commit('updateState', { id: new_parent_id, field: 'children_order', value: [] });
		}
		if (specificNewIndex || specificNewIndex == 0) {
			commit('addChild', { 'index': specificNewIndex, 'item': targetItem, 'newParentId': new_parent_id });
		} else if (prevParent.depth - 1 == newParent.depth && new_parent_id == prevParent.parent_id) {
			var newIndex = itemGetters[prevParent.id].siblingIndex + 1;

			commit('addChild', { 'index': newIndex, 'item': targetItem, 'newParentId': new_parent_id });
		} else {
			commit('addChild', { 'item': targetItem, 'newParentId': new_parent_id });
		}

		commit('updateState', { 'field': 'show_children', 'id': new_parent_id, 'value': 1 });

		commit('deleteChild', { 'index': siblingIndex, 'id': prevParent.id });

		if (prevParent.children.length == 0) {
			commit('updateState', { 'field': 'children', 'id': prevParent.id, 'value': [] });
		}

		dispatch('attachParentBody', { id: id });
		var tags = itemGetters[new_parent_id].itemTagArray;
		dispatch('tagItem', { id: id, tags: tags });
		dispatch('patch', { id: id, field: 'depth' });
		dispatch('patch', { id: id, field: 'parent_id' });
		dispatch('patch', { id: new_parent_id, field: 'children_order' });
		dispatch('patch', { id: new_parent_id, field: 'show_children' });
		dispatch('patch', { id: parent_id, field: 'children_order' });
		dispatch('updateChildrenDepth', { id: targetItem.id });
		dispatch('updateChildrenDueDate', { id: new_parent_id });
		dispatch('updateChildrenDueDate', { id: parent_id });
		dispatch('autoCalculateDoneState', { id: new_parent_id });
		dispatch('autoCalculateDoneState', { id: parent_id });
	},
	duplicate: function duplicate(_ref4) {
		var state = _ref4.state,
		    dispatch = _ref4.dispatch;

		var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref5.id;

		id = !id ? state.selection.selectedId : id;
		var item = state.nodes[id];
		var index = itemGetters[id].siblingIndex + 1;
		var dupe = JSON.parse(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(item));


		var addNextItemAs = null;
		var addTags = dupe.tagged.map(function (tagObj) {
			return tagObj.tag_name;
		});
		var duplication = true;
		dispatch('postNewItem', { newItem: dupe, index: index, addNextItemAs: addNextItemAs, addTags: addTags, duplication: duplication });
	},
	addAndCleanNodesRecursively: function addAndCleanNodesRecursively(_ref6) {
		var commit = _ref6.commit,
		    dispatch = _ref6.dispatch,
		    getters = _ref6.getters;

		var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    item = _ref7.item;

		var t0 = performance.now();

		item = Object(__WEBPACK_IMPORTED_MODULE_5__setDefaultItemValues_js__["a" /* default */])(item);
		var t0__a = performance.now();
		commit('addNode', { item: item });
		var t1__a = performance.now();
		console.log("			call to addAndCleanNodesRecursively part A took " + (t1__a - t0__a) + " milliseconds.");
		if (item.children.length) {
			item.children.forEach(function (child) {
				return dispatch('addAndCleanNodesRecursively', { item: child });
			});
		}
		var t1 = performance.now();
		console.log("			call to addAndCleanNodesRecursively took " + (t1 - t0) + " milliseconds.");
	},
	addFetchedNodes: function addFetchedNodes(_ref8, _ref9) {
		var commit = _ref8.commit;
		var nodes = _ref9.nodes;

		__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(nodes).forEach(function (id) {
			commit('addNode', { item: nodes[id] });
		});
	},
	addItem: function addItem(_ref10) {
		var state = _ref10.state,
		    commit = _ref10.commit,
		    dispatch = _ref10.dispatch,
		    getters = _ref10.getters;

		var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    item = _ref11.item,
		    index = _ref11.index,
		    addNextItemAs = _ref11.addNextItemAs,
		    addTags = _ref11.addTags,
		    duplication = _ref11.duplication;

		var t0 = performance.now();
		console.log('addItem to DOM');
		console.log(item);

		if (getters['user/loggedIn'] && !item.id.toString().includes('tempItem')) {
			console.log('deleting temp item');
			commit('deleteTempItem', { item: item });
		}

		dispatch('addAndCleanNodesRecursively', { item: item }).then(function () {
			commit('addChild', { newParentId: item.parent_id, index: index, item: item });

			if (addTags) {
				dispatch('tagItem', { id: item.id, tags: addTags });
			}

			dispatch('autoCalculateDoneState', { id: item.parent_id });

			if (!item.id.toString().includes('tempItem')) {
				console.log('patching parent order: ' + item.parent_id);
				dispatch('patch', { id: item.parent_id, field: 'children_order' });
			}

			console.log('showing state.selection.selectedId');
			console.log(state.selection.selectedId);
			if (duplication || addNextItemAs == 'stop' || state.selection.selectedId != null) {
				state.addingNewUnder = null;
			} else {
				dispatch('showAddNewItem', { id: item.id, addAs: addNextItemAs });
			}
			if (state.selection.selectedId && state.selection.selectedId.includes('tempItem')) {
				state.selection.selectedId = item.id;
			}
			Vue.nextTick(function () {
				return dispatch('scrollToItemIfNeeded', { id: item.id });
			});
			var t1 = performance.now();
			console.log("			call to addItem took " + (t1 - t0) + " milliseconds.");
		});
	},
	hideTaggedNodes: function hideTaggedNodes(_ref12) {
		var state = _ref12.state,
		    getters = _ref12.getters;

		var _ref13 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    tag = _ref13.tag;

		__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(state.nodes).forEach(function (id) {
			id = parseFloat(id);
			if (getters.hasTag(id, tag)) {
				if (!state.selection.hiddenItems.includes(id)) {
					state.selection.hiddenItems.push(id);
				}
			}
		});
	},
	hideDoneNodes: function hideDoneNodes(_ref14) {
		var state = _ref14.state;

		__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(state.nodes).forEach(function (id) {
			id = parseFloat(id);
			if (state.nodes[id].done) {
				if (!state.selection.hiddenItems.includes(id)) {
					state.selection.hiddenItems.push(id);
				}
			}
		});
	},
	sortAllChildren: function sortAllChildren(_ref15) {
		var state = _ref15.state,
		    dispatch = _ref15.dispatch;

		if (!state.root.children || !state.root.children.length) {
			return;
		}
		console.log('sorting all items');
		__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(state.nodes).forEach(function (id) {
			dispatch('sortChildren', { id: id });
			dispatch('updateChildrenDueDate', { id: id });
		});
	},
	sortChildren: function sortChildren(_ref16) {
		var state = _ref16.state,
		    commit = _ref16.commit,
		    dispatch = _ref16.dispatch;

		var _ref17 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref17.id;

		var item = state.nodes[id];
		item.children_order = item.children_order.filter(function (id) {
			return item.children.includes(state.nodes[id]);
		});

		var order = item.children_order;
		var items = item.children;
		if (order instanceof Array && order.length) {
			item.children = order.map(function (id) {
				return items.find(function (t) {
					return t.id === id;
				});
			});
		}
	},
	updateChildrenDepth: function updateChildrenDepth(_ref18) {
		var state = _ref18.state,
		    commit = _ref18.commit,
		    dispatch = _ref18.dispatch;

		var _ref19 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref19.id;

		var targetChildren = state.nodes[id].children;
		if (!(targetChildren || targetChildren.length)) {
			return false;
		}
		targetChildren.forEach(function (child) {
			console.log(child);
			child.depth = state.nodes[child.parent_id].depth + 1;
			dispatch('patch', { id: child.id, field: 'depth' });
			dispatch('updateChildrenDepth', { id: child.id });
			return true;
		});
	},
	copyParentBodyToAllChildren: function copyParentBodyToAllChildren(_ref20) {
		var state = _ref20.state,
		    commit = _ref20.commit,
		    dispatch = _ref20.dispatch;

		var _ref21 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    parent_id = _ref21.parent_id;

		if (!parent_id) {
			return;
		}
		var item = state.nodes[parent_id];
		if (!item.children_order.length) {
			return;
		}
		var b = item.body;
		item.children_order.forEach(function (childId) {
			var child = state.nodes[childId];
			child.parents_bodies = b;
			if (!vm) {
				return;
			}
			dispatch('patch', { id: child.id, field: 'parents_bodies' });
		});
	},
	attachParentBody: function attachParentBody(_ref22) {
		var state = _ref22.state,
		    commit = _ref22.commit,
		    dispatch = _ref22.dispatch;

		var _ref23 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref23.id;

		if (!id) {
			return;
		}
		var item = state.nodes[id];
		if (!item.parent_id) {
			return;
		}
		var parent = state.nodes[item.parent_id];
		if (!parent) {
			return;
		}
		commit('updateState', { id: id, parents_bodies: parent.body });
		dispatch('patch', { id: id, field: 'parents_bodies' });
	},
	deleteItem: function deleteItem(_ref24) {
		var state = _ref24.state,
		    commit = _ref24.commit,
		    dispatch = _ref24.dispatch,
		    getters = _ref24.getters;

		var _ref25 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref25.id;

		if (!id) {
			console.log('item id not specified at deleteItem');
		}
		var item = state.nodes[id];
		var previousItemId = itemGetters[id].prevItemId ? itemGetters[id].prevItemId : null;

		if (Array.isArray(item.children) && item.children.length) {
			var allChildrenIds = itemGetters[id].allVisibleChildIds;
			dispatch('deleteItemApi', { idOrArray: allChildrenIds });
			allChildrenIds.forEach(function (id) {
				vm.$delete(state.nodes, id);
			});
		}

		var parent_id = item.parent_id;
		var prevParent = state.nodes[parent_id];
		if (prevParent) {
			var siblingIndex = itemGetters[id].siblingIndex;
			prevParent.children.splice(siblingIndex, 1);
			prevParent.children_order.splice(siblingIndex, 1);

			dispatch('patch', { id: parent_id, field: 'children_order' });
		}
		dispatch('deleteItemApi', { idOrArray: id });

		if (state.selection.view == 'journal') {
			state.selection.view = null;
			state.selection.view = 'journal';
		}
		if (state.selection.view == 'tree') {
			state.selection.view = 'journal';
			state.selection.view = 'tree';
		}
		if (getters['selection/dueItemsFiltered']) {
			state.selection.filter.dueDate.to = null;
			state.selection.filter.dueDate.to = new Date();
		}
		var newSelectedId = itemGetters[previousItemId].nextItemId ? itemGetters[previousItemId].nextItemId : null;
		console.log('new selected ID is: ' + newSelectedId);
		state.selection.selectedId = newSelectedId;
		vm.$delete(state.nodes, id);
	},
	tagItem: function tagItem(_ref26) {
		var state = _ref26.state,
		    commit = _ref26.commit,
		    dispatch = _ref26.dispatch,
		    getters = _ref26.getters;

		var _ref27 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: state.selection.selectedId, tags: state.newTag, requestType: 'tag' },
		    _ref27$id = _ref27.id,
		    id = _ref27$id === undefined ? state.selection.selectedId : _ref27$id,
		    _ref27$tags = _ref27.tags,
		    tags = _ref27$tags === undefined ? state.newTag : _ref27$tags,
		    _ref27$requestType = _ref27.requestType,
		    requestType = _ref27$requestType === undefined ? 'tag' : _ref27$requestType;

		var t0 = performance.now();

		if (!tags) {
			return;
		}
		tags = JSON.parse(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(tags));
		state.newTag = null;
		if (!Array.isArray(tags)) {
			tags = [tags];
		}
		tags = Object(__WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["g" /* removeEmptyValuesFromArray */])(tags);
		if (requestType == 'tag') {
			tags = tags.filter(function (t) {
				return !getters.hasTag(id, t);
			});
		}
		if (!tags.length) {
			return;
		}
		var t0__a = performance.now();
		dispatch('tagItemTemporarely', { id: id, tags: tags, requestType: requestType });
		var t1__a = performance.now();
		console.log("			A point in tagItem call took " + (t1__a - t0__a) + " milliseconds.");
		var t0__b = performance.now();
		dispatch('patchTag', { id: id, tags: tags, requestType: requestType });
		var t1__b = performance.now();
		console.log("			B point in tagItem call took " + (t1__b - t0__b) + " milliseconds.");

		var item = state.nodes[id];
		if (!item) {
			return;
		}
		if (item.children.length) {
			item.children_order.forEach(function (childId) {
				dispatch('tagItem', { id: childId, tags: tags });
			});
		}
		var t1 = performance.now();
		console.log("			Call to tagItem took " + (t1 - t0) + " milliseconds.");
	},
	tagItemTemporarely: function tagItemTemporarely(_ref28) {
		var state = _ref28.state,
		    commit = _ref28.commit,
		    dispatch = _ref28.dispatch,
		    getters = _ref28.getters;

		var _ref29 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: null, tags: null, requestType: 'tag' },
		    id = _ref29.id,
		    tags = _ref29.tags,
		    _ref29$requestType = _ref29.requestType,
		    requestType = _ref29$requestType === undefined ? 'tag' : _ref29$requestType;

		var t0a = performance.now();
		if (!tags) {
			return;
		}
		if (!Array.isArray(tags)) {
			tags = [tags];
		}
		tags = tags.map(function (tag) {
			return Object(__WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["e" /* makeTagObject */])(tag);
		});
		if (requestType == 'untag') {
			commit('deleteTag', { id: id, tags: tags });
		} else {
			commit('addTagTemporarely', { id: id, tags: tags });
		}
		tags.forEach(function (tag) {
			if (!state.allTags.find(function (t) {
				return t.tag == tag.tag_slug;
			})) {
				state.allTags.push(tag.tag);
			}
		});
		var t1a = performance.now();
		console.log("			Call to dispatch tagItemTemporarely took " + (t1a - t0a) + " milliseconds.");
	},
	prepareDonePatch: function prepareDonePatch(_ref30) {
		var state = _ref30.state,
		    commit = _ref30.commit,
		    dispatch = _ref30.dispatch;

		var _ref31 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref31.id;

		console.log('preparingDonePatch for ' + id);
		var item = state.nodes[id];
		if (!item) {
			return;
		}

		var done_date = Object(__WEBPACK_IMPORTED_MODULE_3_date_fns_esm__["b" /* format */])(new Date(), 'YYYY-MM-DD HH:mm:ss');
		console.log(done_date);
		commit('updateState', { id: id, done_date: done_date });

		dispatch('patchDone', { id: id });
		if (item.done) {
			dispatch('popup', { id: id, type: 'afterDone' });
			dispatch('attachParentBody', { id: id });
		}
	},
	autoCalculateDoneState: function autoCalculateDoneState(_ref32) {
		var state = _ref32.state,
		    commit = _ref32.commit,
		    dispatch = _ref32.dispatch;

		var _ref33 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref33.id;

		if (state.nodes[id].depth == 0) {
			return;
		}

		if (itemGetters[id].allChildrenAreDone == true && !itemGetters[id].isProject) {} else {
			dispatch('markDone', { id: id, markAs: 'notDone' });
		}
	},
	moveItem: function moveItem(_ref34) {
		var state = _ref34.state,
		    commit = _ref34.commit,
		    dispatch = _ref34.dispatch,
		    getters = _ref34.getters;

		var _ref35 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref35.id,
		    direction = _ref35.direction;

		id = !id ? state.selection.selectedId : id;
		if (itemGetters[id].isTopLvlItemInFilteredRoot) {
			var errMsg = getters.text.flashes.moveTopLvlItem;
			console.log(errMsg);
			dispatch('sendFlash', { type: 'warning', msg: errMsg });
			return;
		}
		clearTimeout(window.patchDelay);
		var pId = state.nodes[id].parent_id;
		var parent = state.nodes[pId];
		var index = itemGetters[id].siblingIndex;
		if (direction == 'up') {
			if (index == 0) {
				if (parent.depth == 0) {
					console.log('ceiling!');return;
				}

				var parentOlderSiblingId = itemGetters[pId].olderSiblingId;
				var newInd = parentOlderSiblingId == parent.parent_id ? 0 : null;
				dispatch('giveNewParent', { id: id, new_parent_id: parentOlderSiblingId, specificNewIndex: newInd });
			} else {
				parent.children_order.splice(index, 1);
				parent.children_order.splice(index - 1, 0, id);
				dispatch('sortChildren', { id: pId });
				window.patchDelay = setTimeout(function () {
					dispatch('patch', { id: pId, field: 'children_order' });
				}, 1000);
			}
		} else if (direction == 'down') {
			if (index + 1 == parent.children_order.length) {
				if (parent.depth == 0) {
					console.log('floor!');return;
				}

				var new_parent_id = itemGetters[id].nextSiblingOrParentsSiblingId;
				console.log('new_parent_id: ' + new_parent_id);
				dispatch('giveNewParent', { id: id, new_parent_id: new_parent_id, specificNewIndex: 0 });
			} else {
				parent.children_order.splice(index, 1);
				parent.children_order.splice(index + 1, 0, id);
				dispatch('sortChildren', { id: pId });
				window.patchDelay = setTimeout(function () {
					dispatch('patch', { id: pId, field: 'children_order' });
				}, 1000);
			}
		}
		Vue.nextTick(function () {
			return dispatch('scrollToItemIfNeeded', { id: id });
		});
	},
	flushDoneItems: function flushDoneItems(_ref36) {
		var state = _ref36.state,
		    commit = _ref36.commit,
		    dispatch = _ref36.dispatch;

		var nodes = state.nodes;
		var keys = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(nodes);
		var doneItemsObject = keys.reduce(function (prev, id) {
			if (nodes[id].done) {
				dispatch('deleteItem', { id: id });
			}
		});
	},
	updateChildrenDueDate: function updateChildrenDueDate(_ref37) {
		var state = _ref37.state,
		    commit = _ref37.commit,
		    dispatch = _ref37.dispatch;

		var _ref38 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref38.id;

		var item = state.nodes[id];
		if (!item.children.length) {
			return false;
		}
		item.children.forEach(function (child) {
			if (item.dueDateParent) {
				child.dueDateParent = item.dueDateParent;
				dispatch('updateChildrenDueDate', { id: child.id });
			} else if (item.due_date && item.due_date != '0000-00-00 00:00:00') {
				child.dueDateParent = item.due_date;
				dispatch('updateChildrenDueDate', { id: child.id });
			} else {
				child.dueDateParent = false;
				dispatch('updateChildrenDueDate', { id: child.id });
			}
		});
	},
	formatDone: function formatDone(_ref39) {
		var state = _ref39.state,
		    commit = _ref39.commit,
		    dispatch = _ref39.dispatch;

		var _ref40 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    doneArray = _ref40.doneArray;

		var doneItemsObject = doneArray.reduce(function (prev, item) {
			if (item.done) {
				var donePropName = Object(__WEBPACK_IMPORTED_MODULE_3_date_fns_esm__["b" /* format */])(item.done_date, 'YYYY/MM/DD');

				if (!prev.hasOwnProperty(donePropName)) {
					prev[donePropName] = [];
				}
				prev[donePropName].push(item);
			}
			return prev;
		}, {});
		return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(doneItemsObject).map(function (k) {
			var rObj = {};
			rObj['date'] = k;
			rObj['items'] = doneItemsObject[k];

			return rObj;
		});
	},
	blockBlur: function blockBlur(_ref41) {
		var state = _ref41.state,
		    commit = _ref41.commit,
		    dispatch = _ref41.dispatch;

		state.blockBlur = true;
		setTimeout(function () {
			state.blockBlur = false;
		}, 500);
	},
	startEdit: function startEdit(_ref42) {
		var state = _ref42.state,
		    commit = _ref42.commit,
		    dispatch = _ref42.dispatch,
		    getters = _ref42.getters;

		var _ref43 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    item = _ref43.item,
		    event = _ref43.event;

		if (event && (event.srcElement.hasClass('done') || event.srcElement.hasClass('custom-tag'))) {
			return;
		}
		console.log('startEdit');
		item = item ? item : state.nodes[state.selection.selectedId];
		commit('updateState', { beforeEditCache_body: item.body });
		commit('updateState', { beforeEditCache_planned_time: item.planned_time });

		commit('updateState', { editingItem: item.id });

		if (getters.mobile) {
			Vue.nextTick(function () {
				var el = document.querySelector('.js-editaddbox');
				Object(__WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["h" /* scrollToElement */])(el);
			});
		}
	},
	scrollToItemIfNeeded: function scrollToItemIfNeeded(_ref44) {
		var state = _ref44.state,
		    commit = _ref44.commit,
		    dispatch = _ref44.dispatch;

		var _ref45 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref45.id;

		if (!id) {
			return;
		};
		var el = document.getElementById('item-body-' + id);
		Object(__WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["i" /* scrollToElementIfNeeded */])(el);
	},
	doneEdit: function doneEdit(_ref46) {
		var state = _ref46.state,
		    commit = _ref46.commit,
		    dispatch = _ref46.dispatch,
		    getters = _ref46.getters;

		var _ref47 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: state.editingItem },
		    _ref47$id = _ref47.id,
		    id = _ref47$id === undefined ? state.editingItem : _ref47$id;

		console.log('Done edit!');
		dispatch('blockBlur');
		preventKeydownListener();

		var item = state.nodes[id];
		commit('updateState', { editingItem: null });
		commit('updatePopouts', { edit: [] });
		if (state.editingItemTags) {
			commit('updateState', { editingItemTags: null });
			return;
		}
		if (!item.body) {
			commit('updateState', { id: id, body: state.beforeEditCache_body });
		}


		if (typeof item.planned_time != 'number' || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_is_nan___default()(item.planned_time)) {
			commit('updateState', { id: id, planned_time: 0 });
		}
		if (item.planned_time != state.beforeEditCache_planned_time) {
			dispatch('patch', { id: id, field: 'planned_time' });
		}
		if (item.body != state.beforeEditCache_body) {
			dispatch('patch', { id: id, field: 'body' });
			dispatch('copyParentBodyToAllChildren', { parent_id: id });
		}
		commit('updateState', { beforeEditCache_body: null });
		commit('updateState', { beforeEditCache_planned_time: null });
	},
	cancelEdit: function cancelEdit(_ref48) {
		var state = _ref48.state,
		    commit = _ref48.commit,
		    dispatch = _ref48.dispatch,
		    getters = _ref48.getters;

		var id = state.editingItem ? state.editingItem : state.editingItemTags;
		if (!id) {
			return;
		}

		if (state.editingItem) {
			Vue.nextTick(function () {
				console.log("cancel edit. Reverting to: " + state.beforeEditCache_body);
				commit('updateState', { id: id, body: state.beforeEditCache_body });
				commit('updateState', { id: id, planned_time: state.beforeEditCache_planned_time });
			});
		}
		commit('updateState', { editingItem: null });
		commit('updateState', { editingItemTags: null });
		commit('updatePopouts', { edit: [] });
	},
	cancelEditOrAdd: function cancelEditOrAdd(_ref49) {
		var state = _ref49.state,
		    commit = _ref49.commit,
		    dispatch = _ref49.dispatch;

		dispatch('blockBlur');
		if (state.addingNewUnder) {
			dispatch('cancelAddNew');
		} else if (state.editingItem || state.editingItemTags) {
			dispatch('cancelEdit');
		}
	},
	cancelAddNew: function cancelAddNew(_ref50) {
		var state = _ref50.state,
		    commit = _ref50.commit,
		    dispatch = _ref50.dispatch,
		    getters = _ref50.getters;

		console.log('cancelAddNew');
		if (state.selection.selectedId == state.addingNewUnder || state.selection.selectedId == null) {
			state.selection.selectedId = state.selection.lastSelectedId;
			dispatch('scrollToItemIfNeeded', { id: state.selection.lastSelectedId });
		}

		state.addingNewUnder = null;
		state.addingNewAsChild = false;
	},
	addNew: function addNew(_ref51) {
		var state = _ref51.state,
		    commit = _ref51.commit,
		    dispatch = _ref51.dispatch,
		    getters = _ref51.getters;

		var _ref52 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { addNextItemAs: null },
		    addNextItemAs = _ref52.addNextItemAs;

		dispatch('blockBlur');

		console.log('addingNew');
		var newItem = JSON.parse(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(state.newItem));
		var olderSiblingId = state.addingNewUnder;
		var addTags = getters['newItem/preparedPlusComputedTags'];
		commit('newItem/resetStateData');
		newItem.newItem = null;
		if (!newItem.body) {
			return;
		}
		if (!olderSiblingId && state.selection.selectedId) {
			olderSiblingId = state.selection.selectedId;
		} else if (!olderSiblingId && !state.selection.selectedId) {
			olderSiblingId = state.root.id;
		}
		var olderSibling = state.nodes[olderSiblingId];

		newItem.parent_id = olderSibling.parent_id ? olderSibling.parent_id : state.root.id;
		newItem.depth = !olderSibling.depth ? 1 : olderSibling.depth;

		var OlderSiblingIndex = itemGetters[olderSibling.id].siblingIndex;
		var index = isNaN(OlderSiblingIndex) ? 0 : OlderSiblingIndex + 1;
		console.log('\n\t\tadding new item[' + newItem.body + ']\n\t\twith parent id = ' + newItem.parent_id + '\n\t\tdepth = ' + newItem.depth + '\n\t\tindex = ' + index);
		if (state.addingNewAsChild) {
			newItem.depth = olderSibling.depth + 1;
			newItem.parent_id = olderSibling.id;
			index = 0;
		}
		if (state.selection.view == "journal") {
			newItem.done = 1;
			var doneDate = !olderSibling || olderSibling.depth == 0 ? Object(__WEBPACK_IMPORTED_MODULE_3_date_fns_esm__["b" /* format */])(new Date(), 'YYYY-MM-DD HH:mm:ss') : olderSibling.done_date;
			newItem.done_date = doneDate;
		}
		if (getters['selection/dueItemsFiltered'] && itemGetters[olderSibling.id].isTopLvlItemInFilteredRoot && !state.addingNewAsChild) {
			newItem.due_date = Object(__WEBPACK_IMPORTED_MODULE_3_date_fns_esm__["b" /* format */])(new Date(), 'YYYY-MM-DD HH:mm:ss');
			addTags = addTags.filter(function (val) {
				return val != 'Today';
			});
		}
		console.log('sending newItem:');
		console.log(JSON.parse(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(newItem)));
		console.log('sending tags:');
		console.log(addTags);

		commit('resetNewItem');
		dispatch('addItem', { item: newItem, index: index, addNextItemAs: addNextItemAs, addTags: addTags }).then(function () {
			return dispatch('postNewItem', { newItem: newItem, index: index, addNextItemAs: addNextItemAs, addTags: addTags, duplication: null });
		});
	},
	showChildren: function showChildren(_ref53) {
		var state = _ref53.state,
		    commit = _ref53.commit,
		    dispatch = _ref53.dispatch;

		var _ref54 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref54.id,
		    action = _ref54.action;

		id = id ? id : state.selection.selectedId;
		var item = state.nodes[id];
		if (!item.children || !item.children.length) {
			return;
		}
		if (action == 'show') {
			if (item.show_children) {
				return;
			}
			commit('updateState', { id: id, show_children: true });
		} else if (action == 'hide') {
			if (!item.show_children) {
				return;
			}
			commit('updateState', { id: id, show_children: false });
		} else {
			commit('updateState', { id: id, show_children: !item.show_children });
		}
		dispatch('patch', { id: id, field: 'show_children' });
	},
	markDone: function markDone(_ref55) {
		var state = _ref55.state,
		    commit = _ref55.commit,
		    dispatch = _ref55.dispatch;

		var _ref56 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref56.id,
		    markAs = _ref56.markAs;

		id = id ? id : state.selection.selectedId;
		if (!id) {
			return;
		}
		var item = state.nodes[id];
		if (!item) {
			return;
		}
		if (markAs == 'notDone') {
			if (!item.done) {
				return;
			}
			commit('updateState', { id: id, done: false });
			dispatch('prepareDonePatch', { id: id });
			return;
		}
		if (item.children.length && !itemGetters[id].allChildrenAreDone) {
			return;
		}
		if (markAs == 'done') {
			if (item.done) {
				return;
			}
			commit('updateState', { id: id, done: true });
		} else {
			commit('updateState', { id: id, done: !item.done });
		}
		dispatch('prepareDonePatch', { id: id });
	},
	indent: function indent(_ref57) {
		var state = _ref57.state,
		    commit = _ref57.commit,
		    dispatch = _ref57.dispatch;

		var _ref58 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref58.id;

		id = id ? id : state.selection.selectedId;

		var new_parent_id = itemGetters[id].olderSiblingId;
		if (new_parent_id == state.nodes[id].parent_id) {
			console.log('bump! ceiling!');return;
		}
		console.log('new_parent_id / olderSiblingId: ' + new_parent_id);
		dispatch('giveNewParent', { id: id, new_parent_id: new_parent_id });
	},
	unindent: function unindent(_ref59) {
		var state = _ref59.state,
		    commit = _ref59.commit,
		    dispatch = _ref59.dispatch;

		var _ref60 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref60.id;

		id = id ? id : state.selection.selectedId;

		var depth = state.nodes[id].depth;
		var olderSiblingId = itemGetters[id].olderSiblingId;
		var olderSiblingDepth = state.nodes[olderSiblingId].depth;

		while (olderSiblingDepth != depth - 1) {
			olderSiblingId = itemGetters[olderSiblingId].olderSiblingId;
			olderSiblingDepth = state.nodes[olderSiblingId].depth;
		}
		var new_parent_id = olderSiblingId;
		var new_parent_depth = olderSiblingDepth;
		console.log('new_parent: ' + new_parent_id);

		if (!new_parent_id) {
			console.log('crash! floor!');return;
		}
		if (new_parent_depth == 0 && depth == 1) {
			console.log('crash! floor!');return;
		}
		if (new_parent_id == state.nodes[id].parent_id) {
			new_parent_id = state.nodes[new_parent_id].parent_id;
		}
		dispatch('giveNewParent', { id: id, new_parent_id: new_parent_id });
	},
	selectItem: function selectItem(_ref61) {
		var state = _ref61.state,
		    commit = _ref61.commit,
		    dispatch = _ref61.dispatch,
		    getters = _ref61.getters;

		var _ref62 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: state.selection.selectedId },
		    _ref62$id = _ref62.id,
		    id = _ref62$id === undefined ? state.selection.selectedId : _ref62$id,
		    direction = _ref62.direction;

		if (getters.mobile) {
			state.editingItem = state.addingNewUnder = null;
		}
		var nextSelectedId = void 0;
		if (!direction) {
			nextSelectedId = id;
		} else if (direction == 'next') {
			if (!id || id == state.root.id) {
				nextSelectedId = getters.filteredIdsTree[0];
			} else {
				nextSelectedId = itemGetters[id].nextItemId;
			}
		} else if (direction == 'prev') {
			if (!id || id == state.root.id) {
				var toplvlItems = getters.filteredIdsTree;
				nextSelectedId = toplvlItems[toplvlItems.length - 1];
			} else {
				nextSelectedId = itemGetters[id].prevItemId;
			}
		}
		state.selection.selectedId = nextSelectedId;
		dispatch('scrollToItemIfNeeded', { id: nextSelectedId });
	},
	setToday: function setToday(_ref63) {
		var state = _ref63.state,
		    commit = _ref63.commit,
		    dispatch = _ref63.dispatch;

		var _ref64 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref64.id;

		id = id ? id : state.selection.selectedId;
		if (!id) {
			return;
		}
		var item = state.nodes[id];
		if (!item) {
			return;
		}
		if (itemGetters[id].hasParentDueToday && item.due_date == '0000-00-00 00:00:00') {
			console.log('parent is already due');
			return;
		}
		dispatch('setDueDate', { id: id });
	},
	setTomorrow: function setTomorrow(_ref65) {
		var state = _ref65.state,
		    commit = _ref65.commit,
		    dispatch = _ref65.dispatch;

		var _ref66 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref66.id;

		id = id ? id : state.selection.selectedId;
		if (!id) {
			return;
		}

		var duedate = addToDate(new Date(), { days: 1 });
		duedate = Object(__WEBPACK_IMPORTED_MODULE_3_date_fns_esm__["b" /* format */])(duedate, "YYYY-MM-DD HH:mm:ss");
		dispatch('setDueDate', { id: id, duedate: duedate });
	},
	setDueDate: function setDueDate(_ref67) {
		var state = _ref67.state,
		    commit = _ref67.commit,
		    dispatch = _ref67.dispatch,
		    getters = _ref67.getters;

		var _ref68 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { duedate: false },
		    id = _ref68.id,
		    duedate = _ref68.duedate;

		var dd = duedate ? new Date(duedate) : new Date();
		var oriDueDate = new Date(state.nodes[id].due_date.replace(/-/g, "/"));
		var diff = Object(__WEBPACK_IMPORTED_MODULE_3_date_fns_esm__["a" /* differenceInCalendarDays */])(oriDueDate, dd);
		dd = diff == 0 ? '0000-00-00 00:00:00' : Object(__WEBPACK_IMPORTED_MODULE_3_date_fns_esm__["b" /* format */])(dd, 'YYYY-MM-DD hh:mm:ss');
		state.nodes[id].due_date = dd;
		if (diff == 0 && getters['selection/dueItemsFiltered']) {
			state.selection.selectedId = itemGetters[id].nextItemId;
		}
		dispatch('patchDueDate', { id: id, duedate: dd });
		dispatch('updateChildrenDueDate', { id: id });
	},
	showAddNewItem: function showAddNewItem(_ref69) {
		var state = _ref69.state,
		    commit = _ref69.commit,
		    dispatch = _ref69.dispatch,
		    getters = _ref69.getters;

		var _ref70 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: state.selection.selectedId },
		    _ref70$id = _ref70.id,
		    id = _ref70$id === undefined ? state.selection.selectedId : _ref70$id,
		    addAs = _ref70.addAs;

		id = id ? id : state.root.id;
		console.log('showing add new item for id: ' + id);
		if (!id) {
			return;
		}
		state.addingNewUnder = id;
		state.selection.lastSelectedId = id;
		state.selection.selectedId = null;

		state.addingNewAsChild = addAs == 'child' ? true : false;
		Vue.nextTick(function () {
			var el = document.querySelector('.js-editaddbox');
			console.log(el);
			if (getters.mobile) {
				Object(__WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["h" /* scrollToElement */])(el);
				return;
			}
			Object(__WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["i" /* scrollToElementIfNeeded */])(el);
		});
	},
	startEditTags: function startEditTags(_ref71) {
		var state = _ref71.state,
		    commit = _ref71.commit,
		    dispatch = _ref71.dispatch;

		var _ref72 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref72.id;

		id = id ? id : state.selection.selectedId;
		if (!id) {
			return;
		}
		state.editingItemTags = id;
	},
	stopPatching: function stopPatching(_ref73) {
		var state = _ref73.state,
		    commit = _ref73.commit,
		    dispatch = _ref73.dispatch;

		if (window.stopPatchingIcon) {
			clearTimeout(window.stopPatchingIcon);
		}
		window.stopPatchingIcon = setTimeout(function () {
			state.patching = false;
		}.bind(state), 300);
	},
	startPatching: function startPatching(_ref74) {
		var state = _ref74.state,
		    commit = _ref74.commit,
		    dispatch = _ref74.dispatch;

		if (window.stopPatchingIcon) {
			clearTimeout(window.stopPatchingIcon);
		}
		state.patching = true;
	},
	deleteItemDialogue: function deleteItemDialogue(_ref75) {
		var state = _ref75.state,
		    commit = _ref75.commit,
		    dispatch = _ref75.dispatch;

		var _ref76 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref76.id;

		id = !id ? state.selection.selectedId : id;
		dispatch('popout', { id: id, type: 'confirm-delete' });
	},
	popup: function popup(_ref77) {
		var state = _ref77.state,
		    commit = _ref77.commit,
		    dispatch = _ref77.dispatch;

		var _ref78 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref78.id,
		    type = _ref78.type;

		id = !id ? state.selection.selectedId : id;
		var item = state.nodes[id];
		var popupExists = state.popups.filter(function (popup) {
			return popup.item.id === id;
		})[0];
		if (popupExists) {
			return;
		}
		state.popups.push({
			item: item,
			type: type,
			timeout: true,
			time: 10 });
	},
	sendFlash: function sendFlash(_ref79) {
		var state = _ref79.state,
		    commit = _ref79.commit,
		    dispatch = _ref79.dispatch;
		var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		commit('pushFlash', payload);
	},
	popout: function popout(_ref80) {
		var state = _ref80.state,
		    commit = _ref80.commit,
		    dispatch = _ref80.dispatch;

		var _ref81 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref81.id,
		    type = _ref81.type;

		id = !id ? state.selection.selectedId : id;
		if (!id) {
			return;
		}
		var item = state.nodes[id];

		if (type == 'timer') {
			state.popouts.timer.push(item);
			Vue.nextTick(function () {
				console.log('emitting playTimer on Vue.nextTick');
				Vue.bus.$emit('playTimer', item);
			});
		}
		if (type == 'confirm-delete') {
			state.popouts.delete.push(item);
		}
	},
	addTimer: function addTimer(_ref82) {
		var state = _ref82.state,
		    commit = _ref82.commit,
		    dispatch = _ref82.dispatch;

		var _ref83 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: state.selection.selectedId },
		    _ref83$id = _ref83.id,
		    id = _ref83$id === undefined ? state.selection.selectedId : _ref83$id;

		dispatch('popout', { id: id, type: 'timer' });
		return;
	},
	copyProgrammatic: function copyProgrammatic(_ref84) {
		var dispatch = _ref84.dispatch,
		    state = _ref84.state,
		    getters = _ref84.getters;

		var _ref85 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { text: itemGetters[state.selection.selectedId].clipboardText },
		    _ref85$text = _ref85.text,
		    text = _ref85$text === undefined ? itemGetters[state.selection.selectedId].clipboardText : _ref85$text;

		var textArea = document.createElement("textarea");

		textArea.style.position = 'fixed';
		textArea.style.top = 0;
		textArea.style.left = 0;

		textArea.style.width = '2em';
		textArea.style.height = '2em';

		textArea.style.padding = 0;

		textArea.style.border = 'none';
		textArea.style.outline = 'none';
		textArea.style.boxShadow = 'none';

		textArea.style.background = 'transparent';

		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.select();
		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';

			dispatch('sendFlash', { type: 'success', msg: state.keybindings.copyClipboard.success[getters.language] + '\n\n' + text });
		} catch (err) {
			console.log(err);
			dispatch('sendFlash', { type: 'error', msg: '' + state.keybindings.copyClipboard.error[getters.language] });
		}
		document.body.removeChild(textArea);
	},
	prepareTag: function prepareTag(_ref86) {
		var state = _ref86.state;

		if (!state.newTag || !state.newTag.trim()) {
			return;
		}
		state.newItem.preparedTags.push(state.newTag);
		state.newTag = null;
	},
	blurOnEditOrAdd: function blurOnEditOrAdd(_ref87) {
		var dispatch = _ref87.dispatch,
		    commit = _ref87.commit,
		    state = _ref87.state,
		    getters = _ref87.getters;

		var _ref88 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { field: null },
		    field = _ref88.field;

		if (state.addingNewUnder) {
			var npt = !state.newItem.planned_time ? 0 : parseFloat(state.newItem.planned_time);
			commit('newItem/updateState', { planned_time: npt });
		}
		if (state.blockBlur) {
			return;
		}
		if (getters.mobile && field == 'add-tag') {
			if (state.editingItem) {
				dispatch('tagItem', { id: state.editingItem, tags: state.newTag });
				return;
			}
			if (state.addingNewUnder) {
				dispatch('prepareTag');
				return;
			}
		}
		if (getters.mobile) {
			return;
		}
		setTimeout(function () {
			if ((document.activeElement.nodeName == 'INPUT' || document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'A' || document.activeElement.nodeName == 'BUTTON') && !document.activeElement.className.includes('js-popup__completion_memo__txtarea') && !document.activeElement.className.includes('js-toggle')) {
				return;
			} else {
				if (state.editingItem) {
					console.log('blurring on edit');
					dispatch('doneEdit');
				}
				if (state.editingItemTags) {
					console.log('blurring on edit tags');
					commit('updateState', { editingItemTags: null });
				}
				if (state.addingNewUnder) {
					console.log('bluring on Add New');
					dispatch('cancelAddNew');
				}
			}
		}, 50);
	},
	doneEditOrCancelNew: function doneEditOrCancelNew(_ref89) {
		var state = _ref89.state,
		    dispatch = _ref89.dispatch;

		if (state.editingItem) {
			console.log('blurring on edit');
			dispatch('doneEdit');
		}
		if (state.addingNewUnder) {
			console.log('bluring on Add New');
			dispatch('cancelAddNew');
		}
	},
	doneEditOrAddNew: function doneEditOrAddNew(_ref90) {
		var state = _ref90.state,
		    dispatch = _ref90.dispatch,
		    commit = _ref90.commit;

		if (state.editingItemTags) {
			commit('updateState', { editingItemTags: null });
		} else if (state.editingItem) {
			dispatch('doneEdit');
		} else if (state.addingNewUnder) {
			dispatch('addNew');
		}
	},
	focusElement: function focusElement(_ref91, _ref92) {
		var state = _ref91.state;
		var el = _ref92.el;

		console.log('trying to focus: ' + el);
		document.querySelector(el).focus();
	},
	filterItems: function filterItems(_ref93) {
		var state = _ref93.state,
		    commit = _ref93.commit,
		    dispatch = _ref93.dispatch;

		var _ref94 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    keyword = _ref94.keyword,
		    value = _ref94.value,
		    event = _ref94.event;

		commit('updateState', { computing: true });
		if (state.editingItem) {
			return;
		}

		var operator = null;
		if (event) {
			event.preventDefault();
			if (event.ctrlKey || event.metaKey) {
				operator = 'AND';
			} else if (event.altKey) {
				operator = 'NOT';
			}
		}
		if (keyword == 'journal' && !state.fetchedDone) {
			dispatch('fetchDone', { tags: null, operator: operator });
		}
		dispatch('selection/addKeywords', { keyword: keyword, value: value, operator: operator }).then(function () {
			return commit('updateState', { computing: false });
		});
	},
	removeHiddenTag: function removeHiddenTag(_ref95) {
		var state = _ref95.state,
		    commit = _ref95.commit,
		    dispatch = _ref95.dispatch;

		var _ref96 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    tag = _ref96.tag;

		state.selection.hiddenTags = state.selection.hiddenTags.filter(function (x) {
			return x !== tag;
		});
	},
	test: function test(_ref97) {
		var state = _ref97.state,
		    commit = _ref97.commit,
		    dispatch = _ref97.dispatch;

		var _ref98 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    id = _ref98.id;

		document.querySelectorAll(".tag-menu a").forEach(function (el) {
			return alert(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(el.style.color));
		});
	},
	alert: function (_alert) {
		function alert(_x42) {
			return _alert.apply(this, arguments);
		}

		alert.toString = function () {
			return _alert.toString();
		};

		return alert;
	}(function (_ref99) {
		var state = _ref99.state,
		    commit = _ref99.commit,
		    dispatch = _ref99.dispatch;

		var _ref100 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    value = _ref100.value;

		alert(value);
	})
});

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);


function initialState() {
	return {
		user: null
	};
}
/* harmony default export */ __webpack_exports__["a"] = ({
	namespaced: true,
	state: initialState(),
	mutations: {
		resetStateData: function resetStateData(state) {
			var newState = initialState();
			state = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(state, newState);
		},
		updateState: function updateState(state, payload) {
			var key = payload.field;
			var val = payload.value;
			if (!key && !val) {
				key = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(payload)[0];
				val = payload[key];
			}
			state[key] = val;
		}
	},
	actions: {},
	getters: {
		loggedIn: function loggedIn(state) {
			return state.user ? true : false;
		}
	}
});

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);


function initialState() {
	return {
		plannedDurations: [10, 15, 25, 50],
		language: 'en',
		journalShowParentBodies: true,
		clipboardSettings: {
			bulletin: '・',
			depthSpace: '　'
		}
	};
}
/* harmony default export */ __webpack_exports__["a"] = ({
	namespaced: true,
	state: initialState(),
	mutations: {
		resetStateData: function resetStateData(state) {
			var newState = initialState();
			state = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(state, newState);
		},
		updateState: function updateState(state, payload) {
			var key = payload.field;
			var val = payload.value;
			if (!key && !val) {
				key = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(payload)[0];
				val = payload[key];
			}
			state[key] = val;
		}
	},
	actions: {},
	getters: {}
});

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_globalFunctions_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fetchedDataOrganizer_js__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ItemComputedProperties_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_quasar__ = __webpack_require__(31);










var getDateDiff = __WEBPACK_IMPORTED_MODULE_8_quasar__["r" /* date */].getDateDiff;


/* harmony default export */ __webpack_exports__["a"] = ({
	state: {
		token: null,
		tokenTimeStamp: null
	},
	mutations: {
		destroyToken: function destroyToken(state) {
			localStorage.removeItem('token');
			localStorage.removeItem('tokenTimeStamp');
			window.axios.defaults.headers.common = {
				'X-Requested-With': 'XMLHttpRequest',
				'Authorization': "Bearer " + ''
			};
			state.token = null;
			state.tokenTimeStamp = null;
		},
		setToken: function setToken(state, _ref) {
			var token = _ref.token;

			localStorage.setItem('token', token);
			localStorage.setItem('tokenTimeStamp', new Date());
			window.axios.defaults.headers.common = {
				'X-Requested-With': 'XMLHttpRequest',
				'Authorization': "Bearer " + token
			};
			state.token = token;
			state.tokenTimeStamp = new Date();
		}
	},
	actions: {
		refreshToken: function refreshToken(_ref2) {
			var commit = _ref2.commit,
			    state = _ref2.state;

			var token = JSON.parse(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(state.token));
			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.post(apiBaseURL + 'refreshToken', { token: token }).then(function (_ref3) {
				var data = _ref3.data;

				console.log('refreshed token:');
				console.log(data);
				commit('setToken', { token: data });
			});
		},
		logout: function logout(_ref4) {
			var commit = _ref4.commit,
			    dispatch = _ref4.dispatch,
			    getters = _ref4.getters,
			    rootState = _ref4.rootState,
			    state = _ref4.state;

			commit('updateState', { loading: true });
			if (state.token) {
				var token = JSON.parse(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_json_stringify___default()(state.token));
				__WEBPACK_IMPORTED_MODULE_5_axios___default.a.post(apiBaseURL + 'logout', { token: token }).then(function (_ref5) {
					var data = _ref5.data;

					console.log(data);
				});
				commit('destroyToken');
			}
			dispatch('resetStore').then(function () {
				commit('updateState', { loading: false });
			});
		},
		login: function login(_ref6, credentials) {
			var commit = _ref6.commit,
			    dispatch = _ref6.dispatch,
			    getters = _ref6.getters,
			    rootState = _ref6.rootState;

			dispatch('resetStore');
			commit('updateState', { loading: true });

			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.post(apiBaseURL + 'auth', credentials).then(function (_ref7) {
				var data = _ref7.data;

				commit('setToken', { token: data.token });
				dispatch('fetchListo');
				router.push('/');
			}).catch(function (_ref8) {
				var response = _ref8.response;

				var serverError = response.data;
				commit('updateState', { loading: false });
				console.log(serverError);
				var errors = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(serverError).map(function (k) {
					return serverError[k];
				}).map(function (e, i) {
					return e[i];
				}).join('<br>');
				dispatch('sendFlash', { msg: errors });
			});
		},
		register: function register(_ref9, credentials) {
			var commit = _ref9.commit,
			    dispatch = _ref9.dispatch,
			    getters = _ref9.getters,
			    rootState = _ref9.rootState;

			commit('updateState', { loading: true });

			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.post(apiBaseURL + 'register', credentials).then(function (_ref10) {
				var data = _ref10.data;

				commit('setToken', { token: data.token });
				dispatch('fetchListo');
				router.push('/');
			}).catch(function (_ref11) {
				var response = _ref11.response;

				var serverError = response.data;
				commit('updateState', { loading: false });
				console.log(serverError);
				var errors = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(serverError).map(function (k) {
					return serverError[k];
				}).map(function (e, i) {
					return e[i];
				}).join('<br>');
				dispatch('sendFlash', { msg: errors });
			});
		},
		fetchListo: function fetchListo(_ref12) {
			var commit = _ref12.commit,
			    dispatch = _ref12.dispatch;

			commit('updateState', { loading: true });
			dispatch('getUser');
			dispatch('fetchAllTags');
			console.log('start fetching all items');
			console.log(__WEBPACK_IMPORTED_MODULE_5_axios___default.a.defaults.headers.common);

			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(apiBaseURL + 'items').then(function (_ref13) {
				var data = _ref13.data;

				console.log('fetched all items');
				dispatch('initializeState', { data: data }).then(function () {
					commit('updateState', { loading: false });
				}).catch(function (error) {
					console.log('ERROR: ' + error);
				});
			}).catch(function (error) {
				console.log('ERROR: ' + error);
			});
		},
		initializeState: function initializeState(_ref14, _ref15) {
			var dispatch = _ref14.dispatch,
			    commit = _ref14.commit;
			var data = _ref15.data;

			var userData = Object(__WEBPACK_IMPORTED_MODULE_4__fetchedDataOrganizer_js__["a" /* default */])(data);

			__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(userData.nodes).forEach(function (id) {
				itemGetters[id] = new __WEBPACK_IMPORTED_MODULE_7_vue__["a" /* default */]({
					store: store,
					data: {
						item: userData.nodes[id]
					},
					computed: __WEBPACK_IMPORTED_MODULE_6__ItemComputedProperties_js__["a" /* default */]
				});
			});
			commit('updateState', { source: userData.source });
			commit('updateState', { orphans: userData.orphans });
			commit('updateState', { root: userData.root });
			commit('updateState', { nodes: userData.nodes });

			dispatch('sortAllChildren');
		},
		getUser: function getUser(_ref16) {
			var dispatch = _ref16.dispatch,
			    commit = _ref16.commit;

			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(apiBaseURL + 'user').then(function (_ref17) {
				var data = _ref17.data;

				console.log(data);
				commit('user/updateState', { user: data.user });
				dispatch('sendFlash', { msg: 'Hello ' + data.user.name + '!' });
			}).catch(function (error) {
				console.log('ERROR: ' + error.response);
			});
		},
		patch: function patch(_ref18) {
			var commit = _ref18.commit,
			    dispatch = _ref18.dispatch,
			    getters = _ref18.getters,
			    rootState = _ref18.rootState,
			    state = _ref18.state;

			var _ref19 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    id = _ref19.id,
			    field = _ref19.field,
			    value = _ref19.value;

			if (!rootState.user.user) {
				console.log('not Logged in');return;
			}
			if (id.toString().includes('tempItem')) {
				return;console.log('not patching temp items...');
			}

			dispatch('startPatching');

			var diff = getDateDiff(new Date(), state.tokenTimeStamp, 'minutes');
			console.log('diff = ' + diff);
			var tokenLifeSpan = 4300;
			if (diff > tokenLifeSpan) {
				if (window.refreshingToken) {
					console.log('refreshingToken...');
					return;
				}
				window.refreshingToken = true;
				console.log('old Token: ' + state.token);
				console.log('old Token Date: ' + state.tokenTimeStamp);
				__WEBPACK_IMPORTED_MODULE_5_axios___default.a.post(apiBaseURL + 'refreshToken', { token: state.token }).then(function (_ref20) {
					var data = _ref20.data;

					console.log('refreshed token:');
					console.log(data);
					window.axios.defaults.headers.common = {
						'X-Requested-With': 'XMLHttpRequest',
						'Authorization': "Bearer " + data
					};
					state.token = data;
					state.tokenTimeStamp = new Date();
					localStorage.setItem('token', data);
					localStorage.setItem('tokenTimeStamp', new Date());

					console.log('new Token: ' + state.token);
					console.log('new Token Date: ' + state.tokenTimeStamp);
					window.refreshingToken = false;
					dispatch('patch', { id: id, field: field, value: value });
				});
				console.log('stop here');
				return;
				console.log('THIS SHOULD NOT SHOW');
			}

			var patchObj = {};
			var patchVal = value ? value : rootState.nodes[id][field];
			if (field == 'children_order') {
				patchVal = Object(__WEBPACK_IMPORTED_MODULE_3__helpers_globalFunctions_js__["c" /* arrayToString */])(patchVal);
			}
			patchObj[field] = patchVal;
			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.patch(apiBaseURL + 'items/' + id, patchObj, { method: 'PATCH' }).then(function (response) {
				console.log('patched ' + id + '[' + rootState.nodes[id].body + '].' + field + ' = ' + patchObj[field]);
				dispatch('stopPatching');
			}, function (response) {
				commit('updateState', { patching: 'error' });
				var errMsg = getters.text.flashes.ajaxError;
				console.log(errMsg);
				dispatch('sendFlash', { type: 'ajaxError', msg: errMsg });
				return;
			});
		},
		patchTag: function patchTag(_ref21) {
			var rootState = _ref21.rootState,
			    dispatch = _ref21.dispatch;

			var _ref22 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    id = _ref22.id,
			    tags = _ref22.tags,
			    requestType = _ref22.requestType;

			if (!rootState.user.user) {
				console.log('not Logged in');return;
			}
			if (id.toString().includes('tempItem')) {
				return;console.log('not patching temp items...');
			}
			dispatch('startPatching');
			var patchObj = {};
			patchObj['tags'] = tags;
			patchObj['type'] = requestType;

			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.patch(apiBaseURL + 'itemtags/' + id, patchObj, { method: 'PATCH' }).then(function (tagResponse) {
				var syncedTags = tagResponse.data.tags;
				console.log('tagged [' + rootState.nodes[id].body + '] with: ' + tagResponse.data.tags + ';');
				console.log(tagResponse);

				__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(apiBaseURL + 'itemtags/' + id, { type: 'tags' }).then(function (updatedTagList) {
					rootState.nodes[id].tagged = updatedTagList.data;
					console.log('updatedTagList of [' + rootState.nodes[id].body + '] with: ' + updatedTagList.data.map(function (t) {
						return t.tag_name;
					}) + ';');
				});
				dispatch('stopPatching');
			});
		},
		patchDueDate: function patchDueDate(_ref23) {
			var dispatch = _ref23.dispatch,
			    rootState = _ref23.rootState;

			var _ref24 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    id = _ref24.id,
			    duedate = _ref24.duedate;

			if (!rootState.user.user) {
				console.log('not Logged in');return;
			}
			if (id.toString().includes('tempItem')) {
				return;console.log('not patching temp items...');
			}
			dispatch('startPatching');
			if (duedate == '0000-00-00 00:00:00') {
				__WEBPACK_IMPORTED_MODULE_5_axios___default.a.patch(apiBaseURL + 'items/' + id, { 'due_date': duedate }).then(function (response) {
					dispatch('stopPatching');
				});
				return;
			}
			duedate = new Date(duedate.replace(/-/g, "/"));
			console.log('PatchDueDate: ' + duedate);
			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.patch(apiBaseURL + 'items/' + id, { 'due_date': duedate }).then(function (response) {
				dispatch('stopPatching');
			});
		},
		patchDone: function patchDone(_ref25) {
			var rootState = _ref25.rootState,
			    dispatch = _ref25.dispatch;

			var _ref26 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    id = _ref26.id;

			if (!rootState.user.user) {
				console.log('not Logged in');return;
			}
			if (id.toString().includes('tempItem')) {
				return;console.log('not patching temp items...');
			}
			dispatch('startPatching');
			var done_date = void 0;
			var doneValue = rootState.nodes[id].done;
			if (doneValue) {
				done_date = new Date();
			} else {
				done_date = '0000-00-00 00:00:00';
			}
			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.patch(apiBaseURL + 'items/' + id, { 'done': doneValue, 'done_date': done_date }).then(function (response) {
				dispatch('stopPatching');
			});
		},
		deleteItemApi: function deleteItemApi(_ref27) {
			var rootState = _ref27.rootState,
			    dispatch = _ref27.dispatch;

			var _ref28 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    idOrArray = _ref28.idOrArray;

			if (!rootState.user.user) {
				console.log('not Logged in');return;
			}
			dispatch('startPatching');
			if (Array.isArray(idOrArray) && idOrArray.length) {
				var array = idOrArray;
				array.forEach(function (id) {
					dispatch('deleteItemApi', { idOrArray: id });
				});
			} else {
				var id = idOrArray;
				if (id.toString().includes('tempItem')) {
					return;console.log('not patching temp items...');
				}
				if (!id) {
					return;
				}
				var item = rootState.nodes[id];
				__WEBPACK_IMPORTED_MODULE_5_axios___default.a.delete(apiBaseURL + 'items/' + id).then(function (response) {
					console.log('deleted: ' + id + '[' + item.body + ']');
					dispatch('stopPatching');
				});
			}
		},
		fetchAllTags: function fetchAllTags(_ref29) {
			var rootState = _ref29.rootState,
			    dispatch = _ref29.dispatch,
			    getters = _ref29.getters,
			    commit = _ref29.commit;

			rootState.patching = true;
			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(apiBaseURL + 'allTags').then(function (_ref30) {
				var data = _ref30.data;

				commit('updateState', { allTags: data });
				rootState.patching = false;
			});
		},
		fetchDone: function fetchDone(_ref31) {
			var rootState = _ref31.rootState,
			    dispatch = _ref31.dispatch,
			    getters = _ref31.getters,
			    rootGetters = _ref31.rootGetters;

			var _ref32 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    tags = _ref32.tags,
			    operator = _ref32.operator;

			if (!rootState.user.user) {
				console.log('not Logged in');return;
			}
			rootState.loading = true;
			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(apiBaseURL + 'items/fetchdone').then(function (_ref33) {
				var data = _ref33.data;

				rootState.fetchedDone = true;
				console.log('fetched Done');
				if (!data.length) {
					console.log('no done items...');
					rootState.loading = false;
					return;
				}

				var doneData = Object(__WEBPACK_IMPORTED_MODULE_4__fetchedDataOrganizer_js__["a" /* default */])(data);
				__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(doneData.nodes).forEach(function (id) {
					itemGetters[id] = new __WEBPACK_IMPORTED_MODULE_7_vue__["a" /* default */]({
						store: store,
						data: {
							item: doneData.nodes[id]
						},
						computed: __WEBPACK_IMPORTED_MODULE_6__ItemComputedProperties_js__["a" /* default */]
					});
				});

				var allItems = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(rootState.nodes, doneData.nodes);
				rootState.nodes = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, allItems);

				rootState.loading = false;
			});
		},
		postNewItem: function postNewItem(_ref34) {
			var rootState = _ref34.rootState,
			    dispatch = _ref34.dispatch,
			    getters = _ref34.getters;

			var _ref35 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    newItem = _ref35.newItem,
			    index = _ref35.index,
			    addNextItemAs = _ref35.addNextItemAs,
			    addTags = _ref35.addTags,
			    duplication = _ref35.duplication;

			console.log('posting newItem...');
			console.log(newItem);
			if (!rootState.user.user) {
				console.log('not Logged in');
				return;
			}
			dispatch('startPatching');

			if (newItem.children_order) {
				newItem.children_order = Object(__WEBPACK_IMPORTED_MODULE_3__helpers_globalFunctions_js__["c" /* arrayToString */])(newItem.children_order);
			}
			var data = newItem;

			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.post(apiBaseURL + 'items', data).then(function (response) {
				var storedItem = response.data;
				console.log('starting dom update...');
				console.log('Index: ');
				console.log(index);
				dispatch('addItem', { item: storedItem, index: index, addNextItemAs: addNextItemAs, addTags: addTags, duplication: duplication });
				dispatch('stopPatching');
			}, function (response) {
				rootState.patching = 'error';
				var errMsg = getters.text.flashes.ajaxError;
				console.log(errMsg);
				dispatch('sendFlash', { type: 'ajaxError', msg: errMsg });
			});
		},
		patchRootChildrenOrderWithFilter: function patchRootChildrenOrderWithFilter(_ref36) {
			var rootState = _ref36.rootState,
			    dispatch = _ref36.dispatch;

			var _ref37 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    id = _ref37.id;

			if (!rootState.user.user) {
				console.log('not Logged in');return;
			}
			if (id.toString().includes('tempItem')) {
				return;console.log('not patching temp items...');
			}
			__WEBPACK_IMPORTED_MODULE_5_axios___default.a.get(apiBaseURL + 'items/' + rootState.root.id).then(function (response) {
				var rootChildrenOrder = response.data.children_order;
				rootChildrenOrder = rootChildrenOrder + ',' + id;
				__WEBPACK_IMPORTED_MODULE_5_axios___default.a.patch(apiBaseURL + 'items/' + rootState.root.id, { 'children_order': rootChildrenOrder }).then(function (response) {
					var newRootChildrenOrder = response.data.children_order;
					console.log('newRootChildrenOrder = ' + newRootChildrenOrder);
				});
			});
		}
	},
	getters: {
		someGetter: function someGetter(state, getters, rootState, rootGetters) {
			return function (id) {
				getters.someOtherGetter;
				rootGetters.someOtherGetter;
			};
		}
	}
});

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = organizeData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setDefaultItemValues_js__ = __webpack_require__(35);



function makeNode(item, returnedObject) {
	var node = JSON.parse(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(item));
	var parent = returnedObject.nodes[node.parent_id];

	node = Object(__WEBPACK_IMPORTED_MODULE_1__setDefaultItemValues_js__["a" /* default */])(node);

	if (node.depth == 0) {
		returnedObject.root = node;console.log('root-node');
	} else if (parent) {
		parent.children.push(node);
	} else {
		returnedObject.orphans.push(node);
	}
	returnedObject.nodes[node.id] = node;
}
function organizeData(fetchedData) {
	console.log('organizeData() with fetchedData \u2193');
	console.log(fetchedData);
	if (!fetchedData) {
		return;
	}

	var returnedObject = {};
	returnedObject.source = fetchedData;
	returnedObject.orphans = [];
	returnedObject.nodes = {};
	returnedObject.root = {};
	fetchedData.forEach(function (item) {
		return makeNode(item, returnedObject);
	});

	return returnedObject;
}

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_date_fns_esm__ = __webpack_require__(20);



function initialState() {
	return {
		selectedId: null,
		lastSelectedId: null,
		filter: {
			dueDate: { from: null, to: null },
			doneDate: { from: null, to: null }
		},
		tags: [],
		hiddenTags: [],
		hiddenItems: [],
		hiddenBookmarks: [],
		view: 'tree',
		filters: []
	};
}
/* harmony default export */ __webpack_exports__["a"] = ({
	namespaced: true,
	state: initialState(),
	mutations: {
		resetStateData: function resetStateData(state) {
			var newState = initialState();
			state = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(state, newState);
		},
		clear: function clear(state) {
			state.filter = {
				dueDate: { from: null, to: null },
				doneDate: { from: null, to: null }
			}, state.tags = [];
			state.hiddenTags = [];
			state.hiddenItems = [];
			state.hiddenBookmarks = [];
		},
		clearTags: function clearTags(state) {
			state.hiddenTags = [];
			state.tags = [];
		},
		clearFilters: function clearFilters(state) {
			state.filter = {
				dueDate: { from: null, to: null },
				doneDate: { from: null, to: null }
			}, state.hiddenBookmarks = [];
		},
		updateState: function updateState(state, payload) {
			var key = payload.field;
			var val = payload.value;
			if (!key && !val) {
				key = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(payload).filter(function (k) {
					return k != 'id';
				})[0];
				val = payload[key];
			}
			if (payload.id) {
				state.nodes[payload.id][key] = val;
				return;
			}
			state[key] = val;
		}
	},
	actions: {
		addKeywords: function addKeywords(_ref, _ref2) {
			var state = _ref.state,
			    rootState = _ref.rootState,
			    getters = _ref.getters,
			    rootGetters = _ref.rootGetters,
			    dispatch = _ref.dispatch,
			    commit = _ref.commit;
			var keyword = _ref2.keyword,
			    value = _ref2.value,
			    operator = _ref2.operator;

			if (keyword == 'tag') {
				if (operator == 'NOT') {
					if (state.hiddenTags.includes(value)) {
						return;
					}
					state.hiddenTags.push(value);
					state.tags = state.tags.filter(function (tag) {
						return tag !== value;
					});
				} else if (state.tags.includes(value)) {
					state.tags = state.tags.filter(function (tag) {
						return tag !== value;
					});
				} else if (state.hiddenTags.includes(value)) {
					state.hiddenTags = state.hiddenTags.filter(function (tag) {
						return tag !== value;
					});
				} else {
					if (!operator) {
						commit('clearTags');
					}
					state.tags.push(value);
				}
			} else {
				if (!operator || keyword == 'all') {
					commit('clearFilters');
				}
				if (keyword == 'all') {
					state.view = 'tree';
				}
				if (operator == 'NOT' && keyword == 'journal') {
					state.hiddenBookmarks.push(keyword);
					return;
				}
				if (keyword == 'journal') {
					state.view = 'journal';
					state.filter.doneDate.to = value;
				} else {
					state.view = 'tree';
				}
				if (keyword == 'duedate') {
					state.filter.dueDate.to = value;
				}
			}
			Vue.nextTick(function () {
				if (!rootGetters.filteredItemsFlat.map(function (i) {
					return i.id;
				}).includes(state.selectedId)) {
					state.selectedId = null;
				}
			});
		}
	},
	getters: {
		nothingSelected: function nothingSelected(state, getters) {
			return getters.noTagsSelected && getters.noFiltersSelected && !state.hiddenItems.length && !state.hiddenBookmarks.length;
		},
		noFilterOrTag: function noFilterOrTag(state, getters) {
			return getters.noTagsSelected && getters.noFiltersSelected;
		},
		noTagsSelected: function noTagsSelected(state) {
			return !state.tags.length && !state.hiddenTags.length;
		},
		noFiltersSelected: function noFiltersSelected(state, getters) {
			return !getters.dueDateFiltered && !getters.doneFiltered;
		},
		dueDateFiltered: function dueDateFiltered(state) {
			return state.filter.dueDate.from != null || state.filter.dueDate.to != null;
		},
		doneFiltered: function doneFiltered(state) {
			return state.filter.doneDate.from != null || state.filter.doneDate.to != null;
		},
		dueItemsFiltered: function dueItemsFiltered(state) {
			return Object(__WEBPACK_IMPORTED_MODULE_2_date_fns_esm__["a" /* differenceInCalendarDays */])(state.filter.dueDate.to, new Date()) == 0;
		},
		getHiddenItemsTotalUsedTime: function getHiddenItemsTotalUsedTime(state, getters) {
			if (!state.hiddenItems.length) {
				return 0;
			}
			return state.hiddenItems.reduce(function (a, id) {
				var item = state.nodes[id];
				if (!item) {
					return a;
				}
				var b = item.used_time;

				return a + b;
			}, 0);
		},
		getHiddenItemsTotalPlannedTime: function getHiddenItemsTotalPlannedTime(state, getters) {
			if (!state.hiddenItems.length) {
				return 0;
			}
			return state.hiddenItems.reduce(function (a, id) {
				var item = state.nodes[id];
				if (!item) {
					return a;
				}
				var b = item.planned_time;

				return a + b;
			}, 0);
		},
		testAgainstTagSelection: function testAgainstTagSelection(state, getters, rootState, rootGetters) {
			return function (id) {
				var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { flat: false },
				    _ref3$flat = _ref3.flat,
				    flat = _ref3$flat === undefined ? false : _ref3$flat;

				console.log('running testAgainstTagSelection');
				if (!state.tags.length && !state.hiddenTags.length) {
					return true;
				}
				var hasHiddenTags = false;
				if (state.hiddenTags.length) {
					hasHiddenTags = state.hiddenTags.some(function (tag) {
						return rootGetters.hasTag(id, tag);
					});
				}
				if (state.hiddenTags.length && state.tags.length) {
					return !hasHiddenTags && rootState.root.children_order.includes(id);
				}
				var hasAllTags = true;
				var hasParentWithTag = false;
				if (state.tags.length) {
					hasAllTags = state.tags.every(function (tag) {
						return rootGetters.hasTag(id, tag);
					});
					hasParentWithTag = state.tags.every(function (tag) {
						return rootGetters.hasParentWithTag(id, tag);
					});
				}

				if (flat) {
					return hasAllTags && !hasHiddenTags;
				} else {
					return hasAllTags && !hasHiddenTags && !hasParentWithTag;
				}
			};
		},
		testAgainstDueDateSelection: function testAgainstDueDateSelection(state, getters, rootState, rootGetters) {
			return function (id) {
				var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { flat: false },
				    _ref4$flat = _ref4.flat,
				    flat = _ref4$flat === undefined ? false : _ref4$flat;

				var passedTest = true;
				if (getters.dueItemsFiltered) {
					passedTest = flat ? itemGetters[id].isDueFlat : itemGetters[id].isDueToday;
				}
				return passedTest;
			};
		},
		testAgainstDoneSelection: function testAgainstDoneSelection(state, getters, rootState, rootGetters) {
			return function (id) {
				var passedTest = true;
				var item = rootState.nodes[id];
				if (!item) {
					return false;
				}
				if (getters.doneFiltered) {
					passedTest = item.done ? true : false;
				} else {
					var doneDate = item.done_date ? item.done_date.replace(/-/g, "/") : "0000-00-00 00:00:00";

					var doneDateDiff = Object(__WEBPACK_IMPORTED_MODULE_2_date_fns_esm__["a" /* differenceInCalendarDays */])(new Date(doneDate), new Date());

					passedTest = !item.done || doneDateDiff >= 0 ? true : false;
				}
				return passedTest;
			};
		},
		testAgainstHiddenItems: function testAgainstHiddenItems(state, getters, rootState, rootGetters) {
			return function (id) {
				var passedTest = state.hiddenItems.every(function (i) {
					return i != id;
				});
				return passedTest;
			};
		},
		testAgainstAllSelection: function testAgainstAllSelection(state, getters, rootState, rootGetters) {
			return function (id) {
				var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { flat: false },
				    _ref5$flat = _ref5.flat,
				    flat = _ref5$flat === undefined ? false : _ref5$flat;

				console.log('running testAgainstAllSelection');
				var passedAllTests = true;
				if (flat) {
					passedAllTests = getters.testAgainstTagSelection(id, { flat: true }) && getters.testAgainstDueDateSelection(id, { flat: true }) && getters.testAgainstDoneSelection(id) && getters.testAgainstHiddenItems(id);
				} else {
					var passedDoneTest = getters.testAgainstDoneSelection(id);
					var passedHiddenItemsTest = getters.testAgainstHiddenItems(id);

					if (state.tags.length && getters.dueItemsFiltered) {
						var hasParentDueToday = itemGetters[id].hasParentDueToday;
						var hasParentWithTag = state.tags.every(function (tag) {
							return rootGetters.hasParentWithTag(id, tag);
						});
						if (hasParentDueToday && hasParentWithTag) {
							return false;
						}

						passedAllTests = getters.testAgainstTagSelection(id, { flat: true }) && getters.testAgainstDueDateSelection(id, { flat: true }) && passedDoneTest && passedHiddenItemsTest;
					} else {
							passedAllTests = getters.testAgainstTagSelection(id) && getters.testAgainstDueDateSelection(id) && passedDoneTest && passedHiddenItemsTest;
						}
				}
				return passedAllTests;
			};
		}
	}
});

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_globalFunctions_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__setDefaultItemValues_js__ = __webpack_require__(35);





var tempId = function tempId() {
	return 'tempItem_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
var initialState = function initialState() {
	return Object(__WEBPACK_IMPORTED_MODULE_3__setDefaultItemValues_js__["a" /* default */])({
		body: '',
		preparedTags: [],
		newItem: true,
		temp: true,
		id: tempId()
	});
};
/* harmony default export */ __webpack_exports__["a"] = ({
	namespaced: true,
	state: initialState(),
	mutations: {
		resetStateData: function resetStateData(state) {
			var newState = initialState();
			state = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(state, newState);
		},
		updateState: function updateState(state, payload) {
			var key = payload.field;
			var val = payload.value;
			if (!key && !val) {
				key = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(payload).filter(function (k) {
					return k != 'id';
				})[0];
				val = payload[key];
			}
			if (payload.id) {
				state.nodes[payload.id][key] = val;
				return;
			}
			state[key] = val;
		},
		deleteTag: function deleteTag(state, _ref) {
			var tag = _ref.tag;

			state.preparedTags = state.preparedTags.filter(function (t) {
				return t != tag;
			});
		}
	},
	actions: {
		someAction: function someAction(_ref2) {
			var state = _ref2.state,
			    rootState = _ref2.rootState,
			    getters = _ref2.getters,
			    rootGetters = _ref2.rootGetters,
			    dispatch = _ref2.dispatch,
			    commit = _ref2.commit;

			var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
			    id = _ref3.id;

			getters.someOtherGetter;
			rootGetters.someOtherGetter;

			dispatch('someOtherAction');
			dispatch('someOtherAction', null, { root: true });

			commit('someMutation');
			commit('someMutation', null, { root: true });
		}
	},
	getters: {
		someGetter: function someGetter(state, getters, rootState, rootGetters) {
			return function (id) {
				getters.someOtherGetter;
				rootGetters.someOtherGetter;
			};
		},
		parent_id: function parent_id(state, getters, rootState, rootGetters) {
			if (!rootState.addingNewUnder || rootState.addingNewUnder == rootState.root.id) {
				return rootState.root.id;
			}
			if (rootState.addingNewAsChild || rootState.addingNewAsFirstChild) {
				return rootState.addingNewUnder;
			}
			if (!rootState.nodes[rootState.addingNewUnder]) {
				return null;
			}
			return rootState.nodes[rootState.addingNewUnder].parent_id;
		},
		preparedPlusComputedTags: function preparedPlusComputedTags(state, getters, rootState, rootGetters) {
			var alltags = state.preparedTags;
			var parentTags = [];
			if (itemGetters[getters.parent_id]) {
				parentTags = itemGetters[getters.parent_id].tagsArray;
			}
			alltags = alltags.concat(parentTags);
			alltags = alltags.concat(rootState.selection.tags.map(function (tag) {
				return __WEBPACK_IMPORTED_MODULE_2__helpers_globalFunctions_js__["a" /* Utilities */].tagSlugToName(tag);
			}));

			alltags = Object(__WEBPACK_IMPORTED_MODULE_2__helpers_globalFunctions_js__["l" /* uniq */])(alltags);
			return alltags.sort();
		}
	}
});

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(347);



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

function load(component) {
  return function () {
    return __webpack_require__(348)("./" + component + '.vue');
  };
}

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({

  routes: [{ path: '/', component: load('Index'),
    children: [{ path: '', component: load('Listo') }, { path: 'login', component: load('Login') }, { path: 'register', component: load('Register') }]
  }, { path: '*', component: load('Error404') }]
}));

/***/ }),

/***/ 348:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Error404.vue": [
		373,
		6
	],
	"./Hello.vue": [
		374,
		5
	],
	"./Index.vue": [
		375,
		1
	],
	"./Listo.vue": [
		376,
		0
	],
	"./Login.vue": [
		377,
		3
	],
	"./QuasarSplash.vue": [
		378,
		4
	],
	"./Register.vue": [
		379,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 348;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setDefaultItemValues;
function setDefaultItemValues(item) {
	var t0 = performance.now();

	if (!item) {
		console.log('item undefffff');
	}
	item.depth = Number(item.depth);
	if (item.show_children == null) {
		item.show_children = 1;
	}
	if (!item.children) {
		item.children = [];
	}
	if (!item.due_date) {
		item.due_date = "0000-00-00 00:00:00";
	}
	if (!item.done_date) {
		item.done_date = "0000-00-00 00:00:00";
	}
	if (!item.done) {
		item.done = false;
	}
	if (!item.planned_time) {
		item.planned_time = 0;
	}
	if (!item.used_time) {
		item.used_time = 0;
	}
	if (!item.tagged) {
		item.tagged = [];
	}
	if (!item.children_order) {
		item.children_order = [];
	} else if (typeof item.children_order === 'string') {
		item.children_order = item.children_order.split(',').map(Number);
	}
	var t1 = performance.now();
	console.log("			Call to setDefaultItemValues took " + (t1 - t0) + " milliseconds.");
	return item;
}

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



var _class = function () {
	function _class() {
		__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, _class);

		this.iniKeydownListenerPause();
		this.iniKeyBindingListener();
	}

	__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(_class, [{
		key: 'keystroke',
		value: function keystroke(k) {
			if (store.state.selection.view == 'journal' && (k == 'arrowRight' || k == 'arrowLeft' || k == 'meta_arrowUp' || k == 'meta_arrowDown' || k == 'meta_arrowRight' || k == 'meta_arrowLeft' || k == 'spaceBar' || k == 'tab' || k == 'shift_tab' || k == 't' || k == '-' || k == 's')) {
				console.log('cannot use ' + k + ' in journal mode');
				var errMsg = store.getters.text.flashes.cannotDoThisInJournal;
				console.log(errMsg);
				store.dispatch('sendFlash', { type: 'warning', msg: errMsg });
				return;
			}
			console.log(k);
			if (k == 'meta_c') {
				store.dispatch('copyProgrammatic');
			} else if (k == 'arrowUp') {
				store.dispatch('selectItem', { direction: 'prev' });
			} else if (k == 'arrowDown') {
				store.dispatch('selectItem', { direction: 'next' });
			} else if (k == 'arrowRight') {
				store.dispatch('showChildren', { action: 'show' });
			} else if (k == 'arrowLeft') {
				store.dispatch('showChildren', { action: 'hide' });
			} else if (k == 'meta_arrowUp') {
				store.dispatch('moveItem', { direction: 'up' });
			} else if (k == 'meta_arrowDown') {
				store.dispatch('moveItem', { direction: 'down' });
			} else if (k == 'meta_arrowRight') {
				store.dispatch('indent');
			} else if (k == 'meta_arrowLeft') {
				store.dispatch('unindent');
			} else if (k == 'spaceBar') {
				store.dispatch('markDone');
			} else if (k == 'tab') {
				store.dispatch('indent');
			} else if (k == 'shift_tab') {
				store.dispatch('unindent');
			} else if (k == 'enter') {
				store.dispatch('showAddNewItem');
			} else if (k == 'shift_enter') {
				store.dispatch('showAddNewItem', { addAs: 'child' });
			} else if (k == 'meta_enter') {
				store.dispatch('startEdit');
			} else if (k == 'ctrl_u') {
				store.dispatch('startEdit');
			} else if (k == 't') {
				store.dispatch('setToday');
			} else if (k == '-') {
				store.dispatch('setTomorrow');
			} else if (k == 'shift_t') {
				store.dispatch('startEditTags');
			} else if (k == 's') {
				store.dispatch('addTimer');
			} else if (k == 'meta_shift_d') {
				store.dispatch('duplicate');
			} else if (k == 'meta_backspace') {
				store.dispatch('deleteItemDialogue');
			} else if (k == 'backspace') {
				store.dispatch('deleteItemDialogue');
			} else if (k == 'delete') {
				store.dispatch('deleteItemDialogue');
			}
		}
	}, {
		key: 'iniKeydownListenerPause',
		value: function iniKeydownListenerPause() {
			window.keydownListenerPaused = false;
			window.preventKeydownListener = function () {
				console.log('preventing keydown listener');
				window.keydownListenerPaused = true;
				setTimeout(function () {
					window.keydownListenerPaused = false;
				}.bind(this), 100);
			};
		}
	}, {
		key: 'iniKeyBindingListener',
		value: function iniKeyBindingListener() {
			var self = this;
			window.addEventListener('keydown', function (e) {
				if (keydownListenerPaused) {
					return;
				}
				var x = e.keyCode;
				if (document.activeElement.className == "flatpickr-days") {
					if (x == 9) {
						console.log('hiya!');
						e.preventDefault();
						return;
					}
				}
				if (store.state.popouts.delete.length || store.state.popouts.timer.length) {
					if (x == 27) {
						e.preventDefault();
						eventHub.$emit('clearAll');
						console.log('Escape');
					}
					if (x == 9) {
						e.preventDefault();
						if (e.shiftKey) {
							store.dispatch('focusElement', { el: '.btn-cancel' });
						} else {
							store.dispatch('focusElement', { el: '.btn-ok' });
						}
					}
					if (x == 37) {
						e.preventDefault();
						store.dispatch('focusElement', { el: '.btn-cancel' });
					}
					if (x == 39) {
						e.preventDefault();
						store.dispatch('focusElement', { el: '.btn-ok' });
					}
				} else if (store.state.editingItem || store.state.addingNewUnder || store.state.editingItemTags) {
					if (document.activeElement.nodeName != 'BUTTON') {
						return;
					}
					if (e.keyCode == 27) {
						if (store.state.editingItem) {
							store.dispatch('cancelEdit');
							console.log('escapeOnEditButtonFocus');
						} else if (store.state.addingNewUnder) {
							store.dispatch('cancelAddNew');
							console.log('escapeOnNewButtonFocus');
						}
					}
				} else if (document.activeElement.nodeName == 'INPUT' || document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'A' || document.activeElement.nodeName == 'BUTTON') {
					console.log('inputs or buttons are focussed!');
					return;
				} else {
					switch (e.keyCode) {
						case 37:
							e.preventDefault();
							if (e.ctrlKey || e.metaKey) {
								self.keystroke('meta_arrowLeft');
								break;
							}
							self.keystroke('arrowLeft');
							break;
						case 39:
							e.preventDefault();
							if (e.ctrlKey || e.metaKey) {
								self.keystroke('meta_arrowRight');
								break;
							}
							self.keystroke('arrowRight');
							break;
						case 38:
							e.preventDefault();
							if (e.ctrlKey || e.metaKey) {
								self.keystroke('meta_arrowUp');
								break;
							}
							self.keystroke('arrowUp');
							break;
						case 40:
							e.preventDefault();
							if (e.ctrlKey || e.metaKey) {
								self.keystroke('meta_arrowDown');
								break;
							}
							self.keystroke('arrowDown');
							break;
						case 32:
							e.preventDefault();
							self.keystroke('spaceBar');
							break;
						case 9:
							e.preventDefault();
							if (e.shiftKey) {
								self.keystroke('shift_tab');
								break;
							}
							self.keystroke('tab');
							break;
						case 13:
							e.preventDefault();
							if (e.ctrlKey || e.metaKey) {
								self.keystroke('meta_enter');
							} else if (e.shiftKey) {
								self.keystroke('shift_enter');
							} else {
								self.keystroke('enter');
							}
							break;
						case 84:
							e.preventDefault();
							if (e.ctrlKey || e.metaKey || e.shiftKey) {
								self.keystroke('shift_t');
							} else {
								self.keystroke('t');
							}
							break;
						case 83:
							self.keystroke('s');
							break;
						case 85:
							if (e.ctrlKey) {
								self.keystroke('ctrl_u');
								break;
							}
							self.keystroke('u');
							break;
						case 68:
							e.preventDefault();
							if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
								self.keystroke('meta_shift_d');
								break;
							}
							break;
						case 8:
							e.preventDefault();
							if (e.ctrlKey || e.metaKey) {
								self.keystroke('meta_backspace');
								break;
							}
							self.keystroke('backspace');
							break;
						case 46:
							e.preventDefault();
							self.keystroke('delete');
							break;
						case 67:
							if ((e.ctrlKey || e.metaKey) && window.getSelection().toString() == false) {
								e.preventDefault();
								self.keystroke('meta_c');
								break;
							}
							break;
						case 189:
							e.preventDefault();
							self.keystroke('-');
							break;
					}
				}
			});
		}
	}]);

	return _class;
}();

/* harmony default export */ __webpack_exports__["a"] = (_class);

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flatpickr__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_flatPickrOptions_js__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autosize__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autosize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_autosize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_autosize_input__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_autosize_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_autosize_input__);





/* harmony default export */ __webpack_exports__["a"] = ({
	install: function install(Vue) {
		window.eventHub = new Vue();
		Vue.prototype.$bus = window.eventHub;
		Vue.bus = window.eventHub;
		Vue.directive('flatpicky', {
			inserted: function inserted(el) {
				new __WEBPACK_IMPORTED_MODULE_0_flatpickr___default.a(el, __WEBPACK_IMPORTED_MODULE_1__config_flatPickrOptions_js__["a" /* default */]);
			}
		});
		Vue.directive('focus', {
			inserted: function inserted(el, binding) {
				if (binding.modifiers.noMobile && store.getters.mobile) {
					return;
				}
				if (binding.value || binding.value === undefined) {
					el.focus();
				}
			}
		});
		Vue.directive('autoheight', {
			inserted: function inserted(el, binding) {
				Vue.nextTick(function () {
					__WEBPACK_IMPORTED_MODULE_2_autosize___default()(el);
				});
			}
		});
		Vue.directive('autowidth', {
			inserted: function inserted(el, binding) {
				Vue.nextTick(function () {
					__WEBPACK_IMPORTED_MODULE_3_autosize_input___default()(el);
				});
			}
		});
		Vue.directive('btn-effect', {
			bind: function bind(el, binding) {
				el.addClass("btn").addClass("btn-dipclick");
				el.addEventListener('click', function btnEffect(event) {
					el.addClass("btn--click");
					setTimeout(function () {
						el.removeClass("btn--click");
					}, 400);
				});
			}
		});
		Vue.directive('ios-dblclick', {
			inserted: function inserted(el, binding) {}
		});
		Vue.directive('noClickFocus', {
			bind: function bind(el, binding) {
				el.addEventListener('click', function (event) {
					setTimeout(function () {
						document.activeElement.blur();
					}, 10);
				});
			}
		});
	}
});

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(367)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(368),
  /* template */
  __webpack_require__(369),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 367:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 369:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "q-app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 370:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function clipboardFormat(childrenArray) {
	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { depth: 0, includeChildren: false, first: false },
	    _ref$depth = _ref.depth,
	    depth = _ref$depth === undefined ? 0 : _ref$depth,
	    _ref$includeChildren = _ref.includeChildren,
	    includeChildren = _ref$includeChildren === undefined ? true : _ref$includeChildren,
	    _ref$first = _ref.first,
	    first = _ref$first === undefined ? false : _ref$first;

	var bulletin = store.state.userSettings.clipboardSettings.bulletin;
	var depthSpace = store.state.userSettings.clipboardSettings.depthSpace;
	var spaces = depthSpace.repeat(depth);
	var formattedList = childrenArray.reduce(function (all, val) {
		var list = all + '\n' + spaces + bulletin + val.body;
		var children = !itemGetters[val.id] ? [] : itemGetters[val.id].visibleDirectChildren;
		var childList = includeChildren && children.length ? clipboardFormat(children, { depth: depth + 1 }) : '';
		return list + childList;
	}, '');
	return !first ? formattedList : formattedList.substr(1);
}
/* harmony default export */ __webpack_exports__["a"] = (clipboardFormat);

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lang_js__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__keybindings_js__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__setDefaultItemValues_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ItemComputedProperties_js__ = __webpack_require__(32);






if (false) {
    window.apiBaseURL = 'http://api.lucaban.dev/';
}
if (true) {
    window.apiBaseURL = 'http://api.lucaban.com/';
}
var initialItem = Object(__WEBPACK_IMPORTED_MODULE_3__setDefaultItemValues_js__["a" /* default */])({ id: 'z', depth: 0, temp: true, body: 'ALL' });
var nodes = {};
nodes[initialItem.id] = initialItem;

if (false) {
    var aa = JSON.parse(_JSON$stringify(initialItem));
    var bb = JSON.parse(_JSON$stringify(initialItem));
    var cc = JSON.parse(_JSON$stringify(initialItem));
    aa.id = 'aa';
    bb.id = 'bb';
    cc.id = 'cc';
    aa.body = 'aa';
    bb.body = 'bb';
    cc.body = 'cc';
    aa.depth = 1;
    bb.depth = 1;
    cc.depth = 1;
    aa.temp = true;
    bb.temp = true;
    cc.temp = true;
    aa.parent_id = 'z';
    bb.parent_id = 'z';
    cc.parent_id = 'z';
    nodes[aa.id] = aa;
    nodes[bb.id] = bb;
    nodes[cc.id] = cc;
    nodes[initialItem.id].children = [aa, bb, cc];
    nodes[initialItem.id].children_order = [aa.id, bb.id, cc.id];
}

/* harmony default export */ __webpack_exports__["a"] = (function () {
    return {
        languageContents: __WEBPACK_IMPORTED_MODULE_1__lang_js__["a" /* default */],
        keybindings: __WEBPACK_IMPORTED_MODULE_2__keybindings_js__["a" /* default */],
        nodes: nodes,
        source: initialItem,
        root: initialItem,
        apiBaseURL: apiBaseURL,
        orphans: [],
        debug: false,
        doneData: null,
        addingNewUnder: null,
        addingNewAsChild: false,
        addingNewAsFirstChild: false,
        editingItem: null,
        editingItemTags: null,
        editingDoneDateItem: null,
        loading: false,
        patching: false,
        computing: false,
        allTags: [],
        popups: [],
        popouts: { 'delete': [], 'timer': [], 'edit': [], 'guide': false },
        flashes: [],
        timerItems: [],
        beforeEditCache_body: null,
        beforeEditCache_planned_time: null,
        fetchedDone: false,
        blockBlur: false,
        manualMobile: false,
        newTag: null,
        setLanguage: null
    };
});

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	'en': {
		'global': {
			'sec': 'sec',
			'min': 'min',
			'hour': 'hour',
			'm': 'm',
			'h': 'h',
			's': 's',
			'cancel': 'Cancel',
			'delete': 'Delete',
			'save': 'Save',
			'reload': 'Reload'
		},
		'user': {
			'login': 'Login',
			'logout': 'Logout',
			'register': 'Register',
			'email': 'Email Address',
			'password': 'Password',
			'passwordConfirm': 'Please type password again',
			'showpassword': 'Show password',
			'name': 'Name'
		},
		'menu': {
			'all': 'All',
			'today': 'Today',
			'journal': 'Journal',
			'?': '?',
			'usedTime': 'Used time',
			'timeLeft': 'Time left',
			'items': 'Items',
			'done': 'Done',
			'total': 'Total'
		},
		'card': {
			'duration': 'Duration:',
			'addTag': 'Add tag:',
			'edit': 'Edit',
			'copy': 'Copy',
			'setToday': 'Do today',
			'addAndContinue': 'Add and continue',
			'addAndClose': 'Add and close',
			'addNew': 'Add new...',
			'addingNewItem': 'Adding new item...'
		},
		'tags': {
			'done': 'Done',
			'today': 'Today'
		},
		'popouts': {
			'reset': 'Reset',
			'ok': 'Ok',
			'reallyDelete': 'Really delete',
			'andAllChildren': 'And all children',
			'overtime': 'overtime',
			'total': 'Total'
		},
		'popups': {
			'journalNotes': 'Journal notes',
			'journalNotesPopover': 'Edit journal notes',
			'completed': 'Completed',
			'completedB': '',
			'usedTime': 'Used time',
			'reset': 'Reset',
			'setNotDone': 'Undo completion'
		},
		'guide': {
			'action': 'Action',
			'key': 'Key',
			'keybindings': [{ 'key': 'T', 'note': 'Do <u>T</u>oday' }, { 'key': 'S', 'note': '<u>S</u>topwatch / Timer' }, { 'key': 'tab', 'note': 'Indent item' }, { 'key': 'enter', 'note': 'Add item' }, { 'key': 'cmd/ctrl + enter', 'note': 'Edit item' }, { 'key': 'shift + T', 'note': 'Edit tags' }, { 'key': 'alt + click on tag', 'note': 'Hide tag' }, { 'key': 'cmd/ctrl + ↑↓', 'note': 'Move item up/down' }, { 'key': 'ctrl + shift + D', 'note': 'Duplicate item' }],
			'hints': {
				'addItemHint': 'Add some items!'
			}
		},
		'flashes': {
			'moveTopLvlItem': 'You cannot move this item when there is a filter.',
			'cannotDoThisInJournal': 'You cannot do this in the Journal.',
			'ajaxError': 'Error with connection. Reloading in '
		}
	},
	'ja': {
		'global': {
			'sec': '秒',
			'min': '分',
			'hour': '時',
			'm': '分',
			'h': '時',
			's': '秒',
			'cancel': 'キャンセル',
			'delete': '削除',
			'save': '保存',
			'reload': '再読込'
		},
		'user': {
			'login': 'ログイン',
			'logout': 'ログアウト',
			'register': '登録',
			'email': 'メールアドレス',
			'password': 'パスワード',
			'passwordConfirm': 'パスワードを再度入力',
			'showpassword': 'パスワードを表示',
			'name': '名前'
		},
		'menu': {
			'all': '全て',
			'today': '今日',
			'journal': '日報',
			'?': '？',
			'usedTime': '使用時間',
			'timeLeft': '残時間',
			'items': 'アイテム',
			'done': '完了',
			'total': '合計'
		},
		'card': {
			'duration': '使用時間:',
			'addTag': 'タグを追加:',
			'edit': '編集',
			'copy': 'コピー',
			'setToday': '今日やる',
			'addAndContinue': '複数追加',
			'addAndClose': '追加して閉じる',
			'addNew': '追加...',
			'addingNewItem': '新しいアイテムを追加...'
		},
		'tags': {
			'done': '完了',
			'today': '今日'
		},
		'popouts': {
			'reset': 'リセット',
			'ok': 'Ok',
			'reallyDelete': '本当に削除しますか？',
			'andAllChildren': 'とその中の全てのアイテム',
			'overtime': 'オーバータイム',
			'total': '合計'
		},
		'popups': {
			'journalNotes': '日報メモ',
			'journalNotesPopover': '日報メモを編集',
			'completed': '',
			'completedB': 'を完了致しました',
			'usedTime': '使用時間',
			'reset': 'リセット',
			'setNotDone': '完了取り消し'
		},
		'guide': {
			'action': 'アクション',
			'key': 'ショートカットキー',
			'keybindings': [{ 'key': 'T', 'note': '今日のタスクとして設定' }, { 'key': 'S', 'note': 'ストップウォッチ / タイマー' }, { 'key': 'tab', 'note': 'アイテムを右へ' }, { 'key': 'enter', 'note': 'アイテムを追加' }, { 'key': 'cmd/ctrl + enter', 'note': 'アイテムを編集' }, { 'key': 'shift + T', 'note': 'タグを編集' }, { 'key': 'alt + click on tag', 'note': 'タグのアイテムを非表示' }, { 'key': 'cmd/ctrl + ↑↓', 'note': 'アイテムを上下へ移動' }, { 'key': 'ctrl + shift + D', 'note': 'アイテムを複製' }],
			'hints': {
				'addItemHint': 'アイテムを追加しよう！'
			}
		},
		'flashes': {
			'moveTopLvlItem': 'フィルタをかけた際、このアイテムは動かせません。',
			'cannotDoThisInJournal': '日報では機能しません。',
			'ajaxError': '接続エラー。再読込まで '
		}
	}
});

/***/ })

},[124]);