webpackJsonp([0],{

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(459)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(461),
  /* template */
  __webpack_require__(525),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(466)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(468),
  /* template */
  __webpack_require__(495),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(469)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(471),
  /* template */
  __webpack_require__(472),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(473)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(475),
  /* template */
  __webpack_require__(494),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(481)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(483),
  /* template */
  __webpack_require__(489),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(490)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(492),
  /* template */
  __webpack_require__(493),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(501)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(503),
  /* template */
  __webpack_require__(513),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(504)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(506),
  /* template */
  __webpack_require__(512),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(460);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("067e40c2", content, true);

/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-panel{background:#fff;padding:1rem;margin-bottom:4.5rem}.c-content-wrapper{max-width:50rem;margin:0 auto}.c-bottom-hint{position:fixed;right:4rem;bottom:4.5rem;z-index:-1;text-align:right;font-size:1.4rem;color:#acacac}", ""]);

// exports


/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_Cards_vue__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_Cards_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_Cards_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_TagsNav_vue__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_TagsNav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_TagsNav_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_StatsNav_vue__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_StatsNav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__vue_components_StatsNav_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_ItemEditAddBox_vue__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_ItemEditAddBox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__vue_components_ItemEditAddBox_vue__);








/* harmony default export */ __webpack_exports__["default"] = ({
	components: {
		TagsNav: __WEBPACK_IMPORTED_MODULE_2__vue_components_TagsNav_vue___default.a,
		StatsNav: __WEBPACK_IMPORTED_MODULE_3__vue_components_StatsNav_vue___default.a,
		ItemEditAddBox: __WEBPACK_IMPORTED_MODULE_4__vue_components_ItemEditAddBox_vue___default.a,
		Cards: __WEBPACK_IMPORTED_MODULE_1__vue_components_Cards_vue___default.a
	},
	mounted: function mounted() {
		if (!store.$refs) {
			store.$refs = {};
		}
		store.$refs = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(store.$refs, this.$refs);
		console.log('Mounted \'add-item-modal\'');
	},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		}
	}
});

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(463)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(465),
  /* template */
  __webpack_require__(514),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(464);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("0bd09258", content, true);

/***/ }),

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".l-children{width:100%}.journal-wrapper .l-children{margin-left:0}", ""]);

// exports


/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemEditAddWrapper_vue__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemEditAddWrapper_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ItemEditAddWrapper_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AddItemTease_vue__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AddItemTease_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__AddItemTease_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__JournalDay_vue__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__JournalDay_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__JournalDay_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_vue__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_vue__);







/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['item'],
	components: {
		ItemEditAddWrapper: __WEBPACK_IMPORTED_MODULE_0__ItemEditAddWrapper_vue___default.a, JournalDay: __WEBPACK_IMPORTED_MODULE_2__JournalDay_vue___default.a, Card: __WEBPACK_IMPORTED_MODULE_3__Card_vue___default.a, AddItemTease: __WEBPACK_IMPORTED_MODULE_1__AddItemTease_vue___default.a
	},
	data: function data() {
		return {};
	},

	computed: {
		id: function id() {
			return this.item.id;
		},
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		listIsEmpty: function listIsEmpty() {
			if (!this.get.filteredItemsTree.length) {
				return true;
			}
		},
		showingEditAddBox: function showingEditAddBox() {
			return this.state.addingNewUnder == this.item.id || this.listIsEmpty && !this.mobile && this.state.selection.view != 'journal';
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		}
	}
});

/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(467);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("253d9276", content, true);

/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-editadd-wrapper{margin-top:.3em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline;z-index:100;position:relative;background-color:#fff}.c-editadd-wrapper--child{margin-left:1.8em}.c-editadd-wrapper--mobile{border-top:thin solid #e6e6e6;margin-bottom:.5em}", ""]);

// exports


/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ItemToggles_vue__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ItemToggles_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ItemToggles_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ItemEditAddBox_vue__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ItemEditAddBox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ItemEditAddBox_vue__);





/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['item'],
	components: {
		ItemToggles: __WEBPACK_IMPORTED_MODULE_1__ItemToggles_vue___default.a, ItemEditAddBox: __WEBPACK_IMPORTED_MODULE_2__ItemEditAddBox_vue___default.a
	},
	data: function data() {
		return {};
	},
	mounted: function mounted() {
		if (!store.$refs) {
			store.$refs = {};
		}
		store.$refs = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(store.$refs, this.$refs);
	},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		showAddNewBox: function showAddNewBox() {
			return this.state.addingNewUnder && this.state.addingNewUnder == this.item.id;
		},
		showEditBox: function showEditBox() {
			return this.state.editingItem && this.item.id == this.state.editingItem || this.state.editingItemTags && this.item.id == this.state.editingItemTags;
		},
		style: function style() {
			var d = itemGetters[this.item.id].relativeDepth;
			var x = d ? d * 1.8 : 0;
			var s = 'width: calc(100vw - 2rem) !important;\n\t\t\t\t\t margin-left: -' + x + 'rem !important;';
			return this.get.mobile ? s : '';
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},
		clickOnEditOrAddCurtain: function clickOnEditOrAddCurtain(event) {
			if (!this.get.mobile) {
				return;
			}
			if (event && !event.srcElement.className.includes('js-popouts-mask')) {
				return;
			}
			this.dispatch('doneEditOrCancelNew');
		}
	}
});

/***/ }),

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(470);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("7505d86a", content, true);

/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".l-toggle-div{margin-right:.3em}.o-toggle-div{display:-webkit-box;display:-ms-flexbox;display:flex}.o-toggle__check{height:auto;width:1.6em;cursor:pointer;text-align:center;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none!important;background-color:transparent!important;margin-top:0!important}.o-toggle__check:after{content:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-2 -2 104 104\" ><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#ababab\" stroke-width=\"3\"/></svg>')}.o-toggle__check:checked:after{content:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-2 -2 104 104\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#bddad5\" stroke-width=\"3\"/><path fill=\"#5dc2af\" d=\"M72 25L42 71 27 56l-4 4 20 20 34-52z\"/></svg>')}.o-toggle__arrow-helper{display:none;cursor:pointer}.o-toggle__arrow-helper+.o-toggle__arrow:before{position:absolute;content:\"\";display:block;top:25%;left:30%;border-left:1px solid #000;border-bottom:1px solid #000;-webkit-transform:rotate(-135deg);transform:rotate(-135deg);width:.5em;height:.5em;transition:-webkit-transform .3s ease-in-out;transition:transform .3s ease-in-out;transition:transform .3s ease-in-out,-webkit-transform .3s ease-in-out}.o-toggle__arrow-helper:checked+.o-toggle__arrow:before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.o-toggle__arrow{display:block;position:relative;height:1.6em;width:1.6em;cursor:pointer}.o-toggle-div--both{margin-left:-1.5em}.o-toggle-div--both .o-toggle__check{margin-left:.4em}.o-toggle-div--both .o-toggle__arrow{margin-top:.1em;margin-left:.1em;margin-right:-.5em}", ""]);

// exports


/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'itemToggles',
	props: ['item'],
	computed: {
		state: function state() {
			return this.$store.state;
		},
		get: function get() {
			return this.$store.getters;
		},
		allChildrenAreDone: function allChildrenAreDone() {
			return itemGetters[this.item.id].allChildrenAreDone;
		}
	},
	methods: {
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},
		test: function test(val) {
			Vue.nextTick(function () {
				console.log('it works!');
			});
		}
	}
});

/***/ }),

/***/ 472:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.state.selection.view != 'journal') ? _c('div', {
    class: {
      'o-toggle-div': true,
      'l-toggle-div': true,
      'o-toggle-div--both': _vm.item.children_order.length > 0 &&
        (_vm.item.done == true || _vm.allChildrenAreDone)
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.item.show_children),
      expression: "item.show_children"
    }, {
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    staticClass: "o-toggle__arrow-helper js-toggle",
    attrs: {
      "type": "checkbox",
      "id": 'show_children_' + _vm.item.id
    },
    domProps: {
      "checked": Array.isArray(_vm.item.show_children) ? _vm._i(_vm.item.show_children, null) > -1 : (_vm.item.show_children)
    },
    on: {
      "change": function($event) {
        _vm.dispatch('patch', {
          id: _vm.item.id,
          field: 'show_children'
        })
      },
      "__c": function($event) {
        var $$a = _vm.item.show_children,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.item.show_children = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.item.show_children = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.item.show_children = $$c
        }
      }
    }
  }), _vm._v(" "), (_vm.item.children_order.length > 0) ? _c('label', {
    staticClass: "o-toggle__arrow",
    attrs: {
      "for": 'show_children_' + _vm.item.id
    }
  }) : _vm._e(), _vm._v(" "), (_vm.item.children_order.length == 0 ||
    _vm.item.done == true || _vm.allChildrenAreDone) ? _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.item.done),
      expression: "item.done"
    }, {
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    staticClass: "o-toggle__check js-toggle",
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.item.done) ? _vm._i(_vm.item.done, null) > -1 : (_vm.item.done)
    },
    on: {
      "change": function($event) {
        _vm.dispatch('prepareDonePatch', {
          id: _vm.item.id
        })
      },
      "__c": function($event) {
        var $$a = _vm.item.done,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.item.done = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.item.done = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.item.done = $$c
        }
      }
    }
  }) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.state.selection.view == 'journal') ? _c('div', {}) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(474);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("54ade255", content, true);

/***/ }),

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-editaddbox{width:100%;font-size:.8em;padding:.5em;border:thin solid hsla(47,87%,70%,.5)}.c-editaddbox--mobile{font-size:14px;padding:1.5em;border:none}.c-editaddbox__body{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-bottom:thin solid #ededed}.c-editaddbox__textarea{width:100%;outline:0!important;padding:.5em;resize:none}.c-editaddbox__body--editing-tags{background-color:#fff;font-size:14px;padding:.5em}.c-editaddbox__lower-body{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.c-editaddbox__lower-body>div{padding:.3em}.c-language-picker{width:100%;text-align:end}.c-language-picker__a{text-decoration:none;color:#5dc2af}.c-mobile-buttonrow{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:100%;margin-top:.3em;margin-bottom:-.5em;padding:0!important}.c-mobile-buttonrow button{padding:.3em;padding-bottom:0;font-size:1.2em}", ""]);

// exports


/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemUpdatePlannedTime_vue__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemUpdatePlannedTime_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ItemUpdatePlannedTime_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ItemTagsStrip_vue__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ItemTagsStrip_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ItemTagsStrip_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ItemAddTag_vue__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ItemAddTag_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ItemAddTag_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_globalFunctions_js__ = __webpack_require__(10);







/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['item'],
	components: { ItemUpdatePlannedTime: __WEBPACK_IMPORTED_MODULE_0__ItemUpdatePlannedTime_vue___default.a, ItemTagsStrip: __WEBPACK_IMPORTED_MODULE_1__ItemTagsStrip_vue___default.a, ItemAddTag: __WEBPACK_IMPORTED_MODULE_2__ItemAddTag_vue___default.a },
	data: function data() {
		return {
			newItem: {
				body: '',
				due_date: '0000-00-00 00:00:00',
				done_date: '0000-00-00 00:00:00',
				done: false,
				planned_time: '',
				preparedTags: [],
				children: ''
			},
			newTag: null
		};
	},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		text: function text() {
			return this.get.text;
		},
		mobile: function mobile() {
			return this.get.mobile;
		},
		listIsEmpty: function listIsEmpty() {
			return this.$parent.listIsEmpty;
		},
		itemAddingUnder: function itemAddingUnder() {
			return this.state.nodes[this.state.addingNewUnder];
		},
		isProject: function isProject() {
			if (this.item.newItem) {
				return false;
			}
			return itemGetters[this.item.id].isProject;
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},
		clickOnEditOrAddCurtain: function clickOnEditOrAddCurtain(item, event) {
			if (!this.get.mobile) {
				return;
			}
			if (event && event.srcElement.nodeName != 'FORM') {
				return;
			}
			this.dispatch('doneEditOrCancelNew');
		},
		newItemIndent: function newItemIndent() {
			if (!this.item.newItem) {
				return;
			}
			if (!this.itemAddingUnder.children.length || !this.itemAddingUnder.show_children) {
				this.commit('updateState', { addingNewAsChild: true });
				return;
			}
			var previousItemGetters = itemGetters[this.state.addingNewUnder];
			if (!previousItemGetters) {
				return;
			}
			var lastChildId = previousItemGetters.findDeepestVisibleChild;
			this.dispatch('showAddNewItem', { id: lastChildId });
		},
		newItemUnindent: function newItemUnindent() {
			if (!this.item.newItem) {
				return;
			}
			if (this.state.addingNewAsChild) {
				this.commit('updateState', { addingNewAsChild: false });
				this.commit('updateState', { addingNewAsFirstChild: false });
				return;
			}
			if (this.state.selection.view == 'journal') {
				return;
			}
			this.dispatch('showAddNewItem', { id: this.itemAddingUnder.parent_id });
		},
		enter: function enter(e) {
			if (!e.shiftKey && !e.altKey && !e.metaKey && !e.ctrlKey) {
				if (this.get.mobile) {
					return;
				}
				e.preventDefault();
				if (!this.item.body) {
					return;
				}
				if (this.item.newItem) {
					this.dispatch('addNew');
				} else {
					this.dispatch('doneEdit');
				}
				return;
			} else if (e.metaKey || e.ctrlKey) {
				e.preventDefault();
				if (!this.item.body) {
					return;
				}
				this.dispatch('addNew', { addNextItemAs: 'child' });
				return;
			}
		},
		arrow: function arrow(direction, e) {
			if (this.item.body) {
				return;
			}
			e.preventDefault();
			if (direction == 'up') {
				preventKeydownListener();
				this.dispatch('cancelEditOrAdd');
			}
			if (direction == 'down') {
				this.dispatch('focusElement', { el: '#card-' + this.get.editingOrAddingId + ' .js-update-planned-time__button' });
			}
			if (direction == 'right') {
				this.newItemIndent();
			}
			if (direction == 'left') {
				this.newItemUnindent();
			}
		}
	}
});

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(477)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(479),
  /* template */
  __webpack_require__(480),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(478);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("0d4f9288", content, true);

/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-update-planned-time{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.c-update-planned-time>div:last-child{margin-left:.2em}.c-update-planned-time__input{outline:0!important;border-bottom:1px solid #5dacce;width:2em;text-align:center;padding:0}.c-update-planned-time__clear{color:dimgray;padding:.4em}.c-update-planned-time__inputClear{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-update-planned-time__label:after{content:\"min\";position:absolute;margin-left:-2em}.c-update-planned-time__button{color:#5dacce;padding:0 .2em;min-height:2.1em}.c-update-planned-time__currentDuration{background:#5dacce;padding:.1em .5em;margin:.1em;border-radius:.3em;color:#fff}", ""]);

// exports


/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {};
	},

	props: ['item'],
	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		text: function text() {
			return this.get.text;
		},
		mobile: function mobile() {
			return this.get.mobile;
		},
		mobileSmall: function mobileSmall() {
			return this.get.mobileSmall;
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},
		setPlannedTime: function setPlannedTime(item, event, newTime) {
			this.dispatch('blockBlur');
			event.preventDefault();
			console.log('launching setPlannedTime with ' + newTime);

			if (newTime || newTime == 0) {
				this.item.planned_time = newTime;
			}
			var npt = !this.item.planned_time ? 0 : parseFloat(this.item.planned_time);
			this.item.planned_time = npt;

			var plsFocus = '.js-add-tag';
			Vue.nextTick(function () {
				console.log('plsFocus');
				console.log(plsFocus);
				console.log(document.querySelector(plsFocus));
				console.log(document.querySelector('.js-add-tag'));
				document.querySelector(plsFocus).focus();

				console.log('returning to editting: ' + plsFocus);
			}.bind(this));
		}
	}
});

/***/ }),

/***/ 480:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: {
      'c-update-planned-time': true,
      'c-update-planned-time--mobile': (_vm.mobile)
    }
  }, [_vm._v("\n\t" + _vm._s(_vm.text.card.duration) + "\n\t"), _vm._l((_vm.state.userSettings.plannedDurations), function(dur) {
    return _c('button', {
      class: [
        'o-btn', 'c-update-planned-time__button', 'js-update-planned-time__button',
        {
          'c-update-planned-time__currentDuration': _vm.item.planned_time == dur
        }
      ],
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.setPlannedTime(_vm.item, $event, dur)
        },
        "blur": function($event) {
          _vm.dispatch('blurOnEditOrAdd')
        },
        "keydown": [function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
          _vm.dispatch('cancelEditOrAdd')
        }, function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
          _vm.setPlannedTime(_vm.item, $event, dur)
        }, function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
          _vm.dispatch('focusElement', {
            el: ("#card-" + (_vm.get.editingOrAddingId) + " .js-edit-body")
          })
        }, function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
          _vm.dispatch('focusElement', {
            el: ("#card-" + (_vm.get.editingOrAddingId) + " .js-add-tag")
          })
        }]
      }
    }, [_vm._v(_vm._s(dur) + " " + _vm._s((_vm.mobileSmall) ? _vm.text.global.m : _vm.text.global.min))])
  }), _vm._v(" "), _c('div', {
    staticClass: "c-update-planned-time__inputClear"
  }, [_c('input', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (true),
      expression: "true"
    }, {
      name: "model",
      rawName: "v-model",
      value: (_vm.item.planned_time),
      expression: "item.planned_time"
    }],
    staticClass: "c-update-planned-time__input",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.item.planned_time)
    },
    on: {
      "blur": [function($event) {
        _vm.dispatch('blurOnEditOrAdd')
      }, function($event) {
        _vm.$forceUpdate()
      }],
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.dispatch('cancelEditOrAdd')
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.setPlannedTime(_vm.item, $event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        $event.preventDefault();
        _vm.dispatch('focusElement', {
          el: ("#card-" + (_vm.get.editingOrAddingId) + " .js-edit-body")
        })
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        $event.preventDefault();
        _vm.dispatch('focusElement', {
          el: ("#card-" + (_vm.get.editingOrAddingId) + " .js-add-tag")
        })
      }],
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.item.planned_time = $event.target.value
      }
    }
  }), _vm._v(_vm._s(_vm.text.global.min) + "\n\t\t"), (_vm.item.planned_time && _vm.item.planned_time != '0') ? _c('button', {
    staticClass: "o-btn c-update-planned-time__clear",
    on: {
      "blur": function($event) {
        _vm.dispatch('blurOnEditOrAdd')
      },
      "click": function($event) {
        $event.preventDefault();
        _vm.setPlannedTime(_vm.item, $event, 0)
      },
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.dispatch('cancelEditOrAdd')
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46])) { return null; }
        $event.preventDefault();
        _vm.setPlannedTime(_vm.item, $event, 0)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.setPlannedTime(_vm.item, $event, 0)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "space", 32)) { return null; }
        $event.preventDefault();
        _vm.setPlannedTime(_vm.item, $event, 0)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        $event.preventDefault();
        _vm.dispatch('focusElement', {
          el: ("#card-" + (_vm.get.editingOrAddingId) + " .js-edit-body")
        })
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        $event.preventDefault();
        _vm.dispatch('focusElement', {
          el: ("#card-" + (_vm.get.editingOrAddingId) + " .js-add-tag")
        })
      }]
    }
  }, [_c('q-icon', {
    attrs: {
      "name": "ion-close-circled"
    }
  })], 1) : _vm._e()])], 2)
},staticRenderFns: []}

/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(482);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("0e20ecfa", content, true);

/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-item-tags{white-space:nowrap;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-item-tags button{color:#fff;margin-left:.5em;padding:0}.c-item-tags--updating-tags{margin:.3em 0}.c-item-tags--mobile-editing span{font-size:.8em}", ""]);

// exports


/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_valueMorphers2_js__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_globalFunctions_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TagPill_vue__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TagPill_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__TagPill_vue__);






/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['item'],
	data: function data() {
		return {};
	},

	components: { TagPill: __WEBPACK_IMPORTED_MODULE_2__TagPill_vue___default.a },
	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		parentTags: function parentTags() {
			if (this.item.newItem) {
				return itemGetters[this.get['newItem/parent_id']].tagsArray;
			} else {
				if (this.get.filteredIdsFlat.includes(this.item.parent_id)) {
					if (!itemGetters[this.item.parent_id]) {
						return [];
					}
					return itemGetters[this.item.parent_id].tagsArray;
				}
				return [];
			}
		},
		secLeft: function secLeft() {
			if (this.item.newItem) {
				return 0;
			}
			return itemGetters[this.item.id].secLeft;
		},
		totalTimeDifferentFromParent: function totalTimeDifferentFromParent() {
			if (this.item.newItem) {
				return 0;
			}
			return itemGetters[this.item.id].totalTimeDifferentFromParent;
		},
		totalSecLeft: function totalSecLeft() {
			if (this.item.newItem) {
				return 0;
			}
			return itemGetters[this.item.id].totalSecLeft;
		},
		hasDueDate: function hasDueDate() {
			return this.item.due_date && this.item.due_date != '0000-00-00 00:00:00';
		},
		tagArray: function tagArray() {
			var _this = this;

			if (this.item.newItem) {
				return this.get['newItem/preparedPlusComputedTags'];
			}
			return this.item.tagged.map(function (t) {
				return t.tag_name;
			}).filter(function (t) {
				return itemGetters[_this.item.id].isTopLvlItemInFilteredRoot || !_this.parentTags.includes(t);
			});
		},
		mobileEditing: function mobileEditing() {
			if (!this.get.mobile) {
				return false;
			}
			if (this.state.editingItem == this.item.id || this.item.newItem) {
				return true;
			}
		}
	},
	methods: {
		customCalendar: __WEBPACK_IMPORTED_MODULE_0__helpers_valueMorphers2_js__["a" /* customCalendar */], sec_to_hourminsec: __WEBPACK_IMPORTED_MODULE_0__helpers_valueMorphers2_js__["d" /* sec_to_hourminsec */],
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		}
	}
});

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(485)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(487),
  /* template */
  __webpack_require__(488),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(486);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("ce72e01e", content, true);

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_globalFunctions_js__ = __webpack_require__(10);




/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['tag', 'index', 'item', 'tagArray', 'parentTags'],
	data: function data() {
		return {};
	},
	created: function created() {},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},
		tab: function tab(index, e) {
			if (index + 1 == this.tagArray.length && !e.shiftKey) {
				e.preventDefault();
			}
		},
		tagDblClick: function tagDblClick(tag, event) {
			if (this.state.editingItem || this.state.editingItemTags || this.state.addingNewUnder) {
				return;
			}
			this.dispatch('filterItems', { keyword: 'tag', value: __WEBPACK_IMPORTED_MODULE_0__helpers_globalFunctions_js__["a" /* Utilities */].tagNameToSlug(tag), event: event });
		},
		deleteTag: function deleteTag(id, tag, event) {
			this.dispatch('blockBlur');
			var plsFocus = '#card-' + this.get.editingOrAddingId + ' .js-add-tag';
			document.querySelector(plsFocus).focus();
			if (this.state.editingItemTags || this.state.editingItem) {
				var plsHide = this.getTagPillElement(event.srcElement);
				console.log(plsHide);
				plsHide.hidden = true;
				this.dispatch('tagItem', { id: id, tags: tag, requestType: 'untag' });
			} else if (this.item.newItem) {
				this.commit('newItem/deleteTag', { tag: tag });
			}
		},
		deletableTag: function deletableTag(tag) {
			if ((this.state.editingItem == this.item.id || this.state.editingItemTags == this.item.id) && !this.parentTags.includes(tag)) {
				return true;
			} else if (this.item.newItem && this.state.newItem.preparedTags.includes(tag)) {
				return true;
			}
			return false;
		},
		getTagPillElement: function getTagPillElement(element) {
			if (element.nodeName == 'BUTTON') {
				return element.parentNode;
			} else {
				return this.getTagPillElement(element.parentNode);
			}
		}
	}
});

/***/ }),

/***/ 488:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "o-pill--custom-tag",
    on: {
      "dblclick": function($event) {
        $event.preventDefault();
        _vm.tagDblClick(_vm.tag, $event)
      }
    }
  }, [_vm._v("\n\t" + _vm._s(_vm.tag) + "\n\t"), (_vm.deletableTag(_vm.tag)) ? _c('button', {
    staticClass: "o-btn delete-tag",
    on: {
      "blur": function($event) {
        _vm.dispatch('blurOnEditOrAdd', {
          id: _vm.item.id
        })
      },
      "click": function($event) {
        $event.preventDefault();
        _vm.deleteTag(_vm.item.id, _vm.tag, $event)
      },
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46])) { return null; }
        $event.preventDefault();
        _vm.deleteTag(_vm.item.id, _vm.tag, $event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.deleteTag(_vm.item.id, _vm.tag, $event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "space", 32)) { return null; }
        $event.preventDefault();
        _vm.deleteTag(_vm.item.id, _vm.tag, $event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        $event.preventDefault();
        _vm.dispatch('cancelEditOrAdd')
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "tab", 9)) { return null; }
        _vm.tab(_vm.index, $event)
      }]
    }
  }, [_c('q-icon', {
    attrs: {
      "name": "ion-close-circled"
    }
  })], 1) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 489:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['c-item-tags', 'js-item-tags',
      {
        'c-item-tags--updating-tags': _vm.item.id == _vm.state.editingItemTags,
        'c-item-tags--mobile-editing': _vm.mobileEditing
      }
    ]
  }, [(_vm.item.done &&
    _vm.item.id != _vm.state.editingDoneDateItem &&
    _vm.state.selection.view != 'journal') ? _c('label', {
    staticClass: "o-pill--done"
  }, [_vm._v("\n\t\t" + _vm._s(_vm.get.text.tags.done) + " " + _vm._s(_vm.customCalendar(_vm.item.done_date)) + "\n\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.item.done_date),
      expression: "item.done_date"
    }, {
      name: "flatpicky",
      rawName: "v-flatpicky"
    }],
    staticClass: "flatpickr",
    attrs: {
      "id": 'done-date-edit-' + _vm.item.id,
      "name": _vm.item.id
    },
    domProps: {
      "value": (_vm.item.done_date)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.item.done_date = $event.target.value
      }
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.totalSecLeft > 0 &&
    _vm.totalSecLeft > _vm.secLeft &&
    _vm.totalTimeDifferentFromParent &&
    !_vm.item.done) ? _c('span', {
    staticClass: "o-pill--total-duration"
  }, [_vm._v("\n\t\t" + _vm._s(_vm.sec_to_hourminsec(_vm.totalSecLeft)) + "\n\t")]) : _vm._e(), _vm._v(" "), (_vm.item.id != _vm.state.editingItem &&
    _vm.secLeft > 0 &&
    !_vm.item.done &&
    _vm.item.id != _vm.state.editingItemTags) ? _c('span', {
    staticClass: "o-pill--duration"
  }, [_vm._v("\n\t\t" + _vm._s(_vm.sec_to_hourminsec(_vm.secLeft)) + "\n\t")]) : _vm._e(), _vm._v(" "), (_vm.hasDueDate && !_vm.item.done &&
    _vm.item.id != _vm.state.editingItemTags) ? _c('span', {
    staticClass: "o-pill--duedate"
  }, [_vm._v("\n\t\t" + _vm._s(_vm.customCalendar(_vm.item.due_date)) + "\n\t")]) : _vm._e(), _vm._v(" "), (_vm.item.dueDateParent && !_vm.item.done &&
    _vm.item.id != _vm.state.editingItemTags) ? _c('span', {
    staticClass: "o-pill--duedate-parent"
  }, [_vm._v("\n\t\t" + _vm._s(_vm.customCalendar(_vm.item.dueDateParent)) + "\n\t")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.tagArray), function(tag, index) {
    return (_vm.tagArray) ? _c('tag-pill', {
      key: _vm.item.id + '_' + tag,
      attrs: {
        "tag": tag,
        "item": _vm.item,
        "tagArray": _vm.tagArray,
        "parentTags": _vm.parentTags,
        "index": index
      }
    }) : _vm._e()
  })], 2)
},staticRenderFns: []}

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(491);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("0a236234", content, true);

/***/ }),

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-add-tag__wrapper>label{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.c-add-tag__input{border-bottom:thin solid #5dc2af;margin:0 .3em;min-width:2em;outline:0!important}.c-add-tag__input::-webkit-input-placeholder{color:#fff}", ""]);

// exports


/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['item'],
	data: function data() {
		return {};
	},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		text: function text() {
			return this.get.text;
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},
		enter: function enter() {
			preventKeydownListener();
			if (!this.state.newTag) {
				if (this.item.newItem && !this.item.body) {
					return;
				}
				this.dispatch('doneEditOrAddNew');
				return;
			}
			if (this.state.newTag) {
				this.state.newTag = this.state.newTag.trim();
			}
			if (this.item.newItem) {
				this.dispatch('prepareTag');
				return;
			}
			this.dispatch('tagItem', { id: this.item.id, tags: this.state.newTag });
		},
		tab: function tab(e) {
			if (this.state.editingItemTags && e.shiftKey) {
				e.preventDefault();
			}
			if (!document.querySelectorAll('#card-' + this.get.editingOrAddingId + ' .js-item-tags i').length && !this.state.editingItemTags && !e.shiftKey) {
				e.preventDefault();
			}
		},
		arrow: function arrow(direction, e) {
			if (this.state.newTag) {
				return;
			}
			e.preventDefault();
			if (this.state.editingItemTags) {
				this.commit('updateState', { editingItemTags: null });
				return;
			}
			if (direction == 'up') {
				this.up(e);
			}
			if (direction == 'down') {
				this.down(e);
			}
		},
		up: function up(e) {
			if (this.state.editingItemTags) {
				return;
			}
			this.dispatch('focusElement', { el: '#card-' + this.get.editingOrAddingId + ' .js-update-planned-time__button' });
		},
		down: function down(e) {
			if (this.state.editingItemTags) {
				return;
			}
			if (this.item.newItem && !this.state.newTag) {
				this.dispatch('cancelEditOrAdd');
				return;
			}
			this.dispatch('focusElement', { el: '#card-' + this.get.editingOrAddingId + ' .js-edit-body' });
		}
	}
});

/***/ }),

/***/ 493:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "c-add-tag__wrapper"
  }, [_c('label', [_vm._v(_vm._s(_vm.text.card.addTag) + "\n\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.state.newTag),
      expression: "state.newTag"
    }, {
      name: "autowidth",
      rawName: "v-autowidth"
    }, {
      name: "focus",
      rawName: "v-focus",
      value: (_vm.state.editingItemTags),
      expression: "state.editingItemTags"
    }],
    staticClass: "c-add-tag__input js-add-tag",
    attrs: {
      "placeholder": "...",
      "type": "text"
    },
    domProps: {
      "value": (_vm.state.newTag)
    },
    on: {
      "blur": function($event) {
        _vm.dispatch('blurOnEditOrAdd', {
          field: 'add-tag'
        })
      },
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.dispatch('cancelEditOrAdd')
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.enter($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        _vm.arrow('up', $event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        _vm.arrow('down', $event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "tab", 9)) { return null; }
        _vm.tab($event)
      }],
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.state.newTag = $event.target.value
      }
    }
  })])])
},staticRenderFns: []}

/***/ }),

/***/ 494:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    class: [
      'c-editaddbox', 'js-editaddbox', {
        'c-editaddbox--mobile': (_vm.mobile)
      }
    ],
    on: {
      "submit": function($event) {
        $event.preventDefault();
      }
    }
  }, [(!_vm.state.editingItemTags) ? _c('div', {
    class: [
      'c-editaddbox__body',
      {
        'c-editaddbox__body--mobile': (_vm.mobile)
      }
    ]
  }, [(_vm.listIsEmpty && _vm.mobile) ? _c('div', {
    staticClass: "c-language-picker w-100"
  }, [(_vm.get.language != 'ja') ? _c('a', {
    staticClass: "c-language-picker__a",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.commit('updateState', {
          setLanguage: 'ja'
        })
      }
    }
  }, [_vm._v("日本語")]) : _vm._e(), _vm._v(" "), (_vm.get.language != 'en') ? _c('a', {
    staticClass: "c-language-picker__a",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.commit('updateState', {
          setLanguage: 'en'
        })
      }
    }
  }, [_vm._v("English")]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "focus",
      rawName: "v-focus"
    }, {
      name: "autoheight",
      rawName: "v-autoheight"
    }, {
      name: "model",
      rawName: "v-model",
      value: (_vm.item.body),
      expression: "item.body"
    }],
    staticClass: "js-edit-body c-editaddbox__textarea",
    attrs: {
      "placeholder": "...　　",
      "rows": "1",
      "autocomplete": "off"
    },
    domProps: {
      "value": (_vm.item.body)
    },
    on: {
      "blur": function($event) {
        _vm.dispatch('blurOnEditOrAdd')
      },
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.dispatch('cancelEditOrAdd')
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.enter($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        _vm.arrow('up', $event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        _vm.arrow('down', $event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "right", 39)) { return null; }
        if ('button' in $event && $event.button !== 2) { return null; }
        _vm.arrow('right', $event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "left", 37)) { return null; }
        if ('button' in $event && $event.button !== 0) { return null; }
        _vm.arrow('left', $event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "tab", 9)) { return null; }
        if (!$event.shiftKey) { return null; }
        $event.preventDefault();
      }],
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.item.body = $event.target.value
      }
    }
  })]) : _c('div', {
    class: ['c-editaddbox__body', 'c-editaddbox__body--editing-tags',
      {
        'c-body-text--project': _vm.isProject
      }
    ]
  }, [_c('div', {
    class: {
      'u-lightgray': (_vm.item.temp && _vm.get['user/loggedIn']),
      'c-body-text--done': _vm.item.done
    }
  }, [_vm._v(_vm._s(_vm.item.body))]), _vm._v(" "), (_vm.item.completion_memo) ? _c('div', {
    staticClass: "l-completion-notes c-completion-notes bodybox"
  }, [_vm._v(_vm._s(_vm.item.completion_memo))]) : _vm._e()]), _vm._v(" "), _c('div', {
    class: {
      'c-editaddbox__lower-body': true,
      'c-editaddbox__lower-body--mobile': (_vm.mobile),
    }
  }, [(_vm.state.selection.view != 'journal' && !_vm.state.editingItemTags) ? _c('Item-Update-Planned-Time', {
    attrs: {
      "item": _vm.item
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    class: {
      'c-item-tags': true,
      'c-editaddbox__item-tags': true,
      'c-editaddbox__item-tags--mobile': (_vm.mobile)
    }
  }, [_c('Item-Add-Tag', {
    attrs: {
      "item": _vm.item
    }
  }), _vm._v(" "), _c('Item-Tags-Strip', {
    attrs: {
      "item": _vm.item
    }
  })], 1), _vm._v(" "), (_vm.mobile) ? _c('div', {
    staticClass: "c-mobile-buttonrow"
  }, [(!_vm.listIsEmpty) ? _c('button', {
    staticClass: "o-btn",
    on: {
      "click": function($event) {
        _vm.dispatch('cancelEditOrAdd')
      }
    }
  }, [_vm._v(_vm._s(_vm.text.global.cancel))]) : _vm._e(), _vm._v(" "), (_vm.item.newItem) ? _c('button', {
    staticClass: "o-btn",
    on: {
      "click": function($event) {
        _vm.dispatch('addNew')
      }
    }
  }, [_vm._v(_vm._s(_vm.text.card.addAndContinue))]) : _vm._e(), _vm._v(" "), (_vm.item.newItem) ? _c('button', {
    staticClass: "o-btn",
    on: {
      "click": function($event) {
        _vm.dispatch('addNew', {
          addNextItemAs: 'stop'
        })
      }
    }
  }, [_vm._v(_vm._s(_vm.text.card.addAndClose))]) : _vm._e(), _vm._v(" "), (!_vm.item.newItem) ? _c('button', {
    staticClass: "o-btn",
    on: {
      "click": function($event) {
        _vm.dispatch('doneEdit')
      }
    }
  }, [_vm._v(_vm._s(_vm.text.global.save))]) : _vm._e()]) : _vm._e()], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 495:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['full-width', {
      'order-last': (_vm.showAddNewBox && !_vm.state.addingNewAsChild)
    }]
  }, [(_vm.get.mobile && (_vm.showEditBox || _vm.showAddNewBox)) ? _c('div', {
    staticClass: "c-popouts-mask js-popouts-mask",
    on: {
      "click": function($event) {
        _vm.clickOnEditOrAddCurtain($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), ((_vm.showEditBox || _vm.showAddNewBox) && _vm.get.mobile) ? _c('div', {
    class: ['c-item-card',
      {
        'c-editadd-wrapper--child': _vm.state.addingNewAsChild
      }
    ]
  }, [(_vm.showAddNewBox) ? _c('Item-Toggles', {
    attrs: {
      "item": _vm.state.newItem
    }
  }) : _vm._e(), _vm._v(" "), (_vm.showAddNewBox) ? _c('div', {
    staticClass: "c-body-div textarea-wrap u-selected"
  }, [_c('div', {
    staticClass: "c-body-text"
  }, [_vm._v(_vm._s(_vm.get.text.card.addingNewItem))])]) : _vm._e()], 1) : _vm._e(), _vm._v(" "), ((_vm.showEditBox || _vm.showAddNewBox)) ? _c('div', {
    class: ['c-editadd-wrapper', {
      'c-editadd-wrapper--child': _vm.state.addingNewAsChild && !_vm.get.mobile,
      'c-editadd-wrapper--mobile': _vm.get.mobile,
      'shadow-5': _vm.get.mobile,
    }],
    style: (_vm.style)
  }, [(_vm.showEditBox && !_vm.get.mobile) ? _c('Item-Toggles', {
    attrs: {
      "item": _vm.item
    }
  }) : _vm._e(), _vm._v(" "), (_vm.showEditBox) ? _c('Item-Edit-Add-Box', {
    attrs: {
      "item": _vm.item
    }
  }) : _vm._e(), _vm._v(" "), (_vm.showAddNewBox && !_vm.get.mobile) ? _c('Item-Toggles', {
    attrs: {
      "item": _vm.state.newItem
    }
  }) : _vm._e(), _vm._v(" "), (_vm.showAddNewBox) ? _c('Item-Edit-Add-Box', {
    attrs: {
      "item": _vm.state.newItem
    }
  }) : _vm._e()], 1) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(497)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(499),
  /* template */
  __webpack_require__(500),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(498);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("135869a9", content, true);

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-addteasebox__cloak{width:100%;height:3em;position:relative;margin-top:-2.5em;background:hsla(0,0%,100%,.6);cursor:pointer}.c-addteasebox__cloak:hover{background:hsla(0,0%,100%,.2)}.c-addtease-wrapper,.c-addtease-wrapper__outer{width:100%;margin-top:.3em}.c-addtease-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding-left:2em}.c-addteasebox__body{width:100%;padding:.3em;border-bottom:thin solid #ededed}", ""]);

// exports


/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {};
	},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		text: function text() {
			return this.get.text;
		},
		mobile: function mobile() {
			return this.get.mobile;
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		}
	}
});

/***/ }),

/***/ 500:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "c-addtease-wrapper__outer"
  }, [_c('div', {
    staticClass: "c-addtease-wrapper"
  }, [_c('div', {
    class: [
      'c-addteasebox__body',
      {
        'c-addteasebox__body--mobile': (_vm.mobile)
      }
    ]
  }, [_vm._v("\n\t\t" + _vm._s(_vm.text.card.addNew) + "\n\t")])]), _vm._v(" "), _c('div', {
    staticClass: "c-addteasebox__cloak",
    on: {
      "click": function($event) {
        _vm.dispatch('showAddNewItem', {
          id: _vm.state.root.id
        })
      }
    }
  })])
},staticRenderFns: []}

/***/ }),

/***/ 501:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(502);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("8abab87c", content, true);

/***/ }),

/***/ 502:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-journal-day{border-bottom:1px solid #ededed;padding-bottom:.7rem}.c-journal-date,.c-journal-day{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.c-journal-date{color:#5dc2af;font-size:1.2em;text-align:left;margin-top:1rem;width:100%;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.c-journal-date__subtitle{color:#e6e6e6;font-size:.8em;margin-left:.5em}.c-journal-day__entries,.c-journal-entry{width:100%}.c-journal-entry__parent-body{display:initial;padding:0 .5em;border-top:none;border-left:none;color:#ababab}.c-journal-entry__item{margin-left:1em}.c-journal-used-time{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;color:#4d4d4d;font-weight:300;-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;font-smoothing:antialiased;resize:none;margin-right:.3em}", ""]);

// exports


/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_date_fns_esm__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_valueMorphers2_js__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_globalFunctions_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_vue__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Card_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Card_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_clipboardFormat_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_quasar__ = __webpack_require__(20);









/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['day'],
	components: {
		Card: __WEBPACK_IMPORTED_MODULE_3__Card_vue___default.a
	},
	data: function data() {
		return {};
	},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		sortedParentBodyEntries: function sortedParentBodyEntries() {
			return Object(__WEBPACK_IMPORTED_MODULE_2__helpers_globalFunctions_js__["j" /* sortObjectArrayByProperty */])(this.day.items, 'parents_bodies', 'desc');
		},
		usedTime: function usedTime() {
			return this.day.items.reduce(function (result, pbodyItem) {
				var totalUsedTimeParentBodyItem = pbodyItem.items.reduce(function (result, item) {
					return result + item.used_time ? parseFloat(item.used_time) : 0;
				}, 0);
				return result + totalUsedTimeParentBodyItem ? parseFloat(totalUsedTimeParentBodyItem) : 0;
			}, 0);
		},
		clipboardTextJournalDay: function clipboardTextJournalDay() {
			var text = '\u25C6 ' + this.day.date + '\n' + this.get.text.menu.usedTime + ': ' + this.sec_to_hourmin(this.usedTime) + '\n';
			this.day.items.forEach(function (section) {
				if (section.parentBody && section.parentBody != 'null_no_parent_body') {
					text += '\n' + section.parentBody + ':' + Object(__WEBPACK_IMPORTED_MODULE_4__helpers_clipboardFormat_js__["a" /* default */])(section.items);
				}
			});
			return text;
		}
	},
	methods: {
		customCalendar: __WEBPACK_IMPORTED_MODULE_1__helpers_valueMorphers2_js__["a" /* customCalendar */],
		sec_to_hourmin: __WEBPACK_IMPORTED_MODULE_1__helpers_valueMorphers2_js__["c" /* sec_to_hourmin */],
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},
		clipboardSuccess: function clipboardSuccess() {
			__WEBPACK_IMPORTED_MODULE_5_quasar__["q" /* Toast */].create(this.state.keybindings.copyClipboard.success[this.l] + '\n\n' + itemGetters[this.item.id].clipboardText);
		},
		clipboardError: function clipboardError() {
			__WEBPACK_IMPORTED_MODULE_5_quasar__["q" /* Toast */].create('' + this.state.keybindings.copyClipboard.error[this.l]);
		}
	}
});

/***/ }),

/***/ 504:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(505);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("2f5c0bf2", content, true);

/***/ }),

/***/ 505:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".l-children{width:100%}.l-children .l-children{margin-left:1.8rem}.c-item-card{margin:0}.c-body-div,.c-item-card{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-body-div{border-bottom:thin solid #ededed;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:.3em}.c-body-div--updating-tags{-ms-flex-wrap:wrap;flex-wrap:wrap;background:none;border-bottom:thin solid hsla(47,87%,70%,.7)}.c-body-text{padding:.2em;display:inline-block;white-space:pre-line;word-break:break-word;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.c-body-text--project{font-weight:600}.c-body-text--updating-tags{width:100%;background:hsla(47,87%,70%,.5)}.c-body-text--done{color:#d9d9d9;text-decoration:line-through}.l-completion-notes{padding:2px 0 0 2em;width:100%}.c-completion-notes{color:#a2999a;background:none!important;overflow:hidden}.c-completion-notes__showHide{text-align:right;cursor:pointer}.journal-wrapper .l-children{margin-left:0}.journal-wrapper .c-item-card{-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}.journal-wrapper .c-body-text--done{color:inherit;text-decoration:none}.journal-wrapper .c-body-div{border-bottom:none}.journal-wrapper .c-completion-notes{color:#a2999a;padding:2px 0 0 2em}", ""]);

// exports


/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemNav_vue__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemNav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ItemNav_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ItemToggles_vue__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ItemToggles_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ItemToggles_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ItemEditAddWrapper_vue__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ItemEditAddWrapper_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ItemEditAddWrapper_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ItemAddTag_vue__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ItemAddTag_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ItemAddTag_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ItemTagsStrip_vue__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ItemTagsStrip_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ItemTagsStrip_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__JournalDay_vue__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__JournalDay_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__JournalDay_vue__);









/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'Card',
	template: '#items-card-template',
	props: ['item'],
	components: {
		ItemNav: __WEBPACK_IMPORTED_MODULE_0__ItemNav_vue___default.a, ItemToggles: __WEBPACK_IMPORTED_MODULE_1__ItemToggles_vue___default.a, ItemEditAddWrapper: __WEBPACK_IMPORTED_MODULE_2__ItemEditAddWrapper_vue___default.a, ItemTagsStrip: __WEBPACK_IMPORTED_MODULE_4__ItemTagsStrip_vue___default.a, ItemAddTag: __WEBPACK_IMPORTED_MODULE_3__ItemAddTag_vue___default.a, JournalDay: __WEBPACK_IMPORTED_MODULE_5__JournalDay_vue___default.a
	},
	data: function data() {
		return { showCompletionNotes: false };
	},

	computed: {
		id: function id() {
			return this.item.id;
		},
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		isProject: function isProject() {
			return itemGetters[this.item.id].isProject;
		},
		visibleDirectChildren: function visibleDirectChildren() {
			return itemGetters[this.item.id].visibleDirectChildren;
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},
		selectItem: function selectItem() {
			this.dispatch('selectItem', { id: this.item.id });
		},
		dblclick: function dblclick(e) {
			if (e.target.nodeName == 'I' || e.target.nodeName == 'BUTTON') {
				return;
			}
			this.dispatch('startEdit', { item: this.item });
		}
	}
});

/***/ }),

/***/ 507:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(508)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(510),
  /* template */
  __webpack_require__(511),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(509);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("94727c40", content, true);

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-item-nav{margin-left:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.c-item-nav button{margin:0 .3rem;padding:.1rem .2rem}.c-item-nav__icon{font-size:1.5em}.c-item-nav__delete{color:rgba(231,76,60,.3)}.o-popmenu__item{white-space:nowrap}.o-popmenu__hotkey{font-size:.8em}", ""]);

// exports


/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_clipboard__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_clipboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_clipboard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_globalFunctions_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_ItemComputedProperties_js__ = __webpack_require__(32);






/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'itemNav',
	props: ['item', 'clipboardTextJournal'],
	data: function data() {
		return { copySuccess: false };
	},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		l: function l() {
			return this.get.language;
		},
		oS: function oS() {
			return this.get.oS;
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},

		stringToKeyboardKeys: __WEBPACK_IMPORTED_MODULE_1__helpers_globalFunctions_js__["k" /* stringToKeyboardKeys */]
	}
});

/***/ }),

/***/ 511:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (
        _vm.state.editingItem != _vm.item.id &&
        _vm.state.editingItemTags != _vm.item.id &&
        _vm.state.selection.selectedId == _vm.item.id),
      expression: "\n\t\tstate.editingItem != item.id\n\t\t&& state.editingItemTags != item.id\n\t\t&& state.selection.selectedId == item.id"
    }],
    staticClass: "c-item-nav"
  }, [(_vm.get.mobile && _vm.state.selection.view != 'journal') ? _c('button', {
    staticClass: "o-btn",
    on: {
      "click": function($event) {
        _vm.dispatch('setToday', {
          id: _vm.item.id
        })
      }
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.state.keybindings.setToday.name[_vm.l]) + "\n\t")]) : _vm._e(), _vm._v(" "), (!_vm.item.done) ? _c('button', {
    staticClass: "o-btn c-item-nav__icon btn btn-dipclick",
    on: {
      "click": function($event) {
        _vm.dispatch('addTimer', {
          id: _vm.item.id
        })
      }
    }
  }, [_c('q-icon', {
    attrs: {
      "name": "ion-ios-timer-outline"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('button', {
    staticClass: "o-btn c-item-nav__icon"
  }, [_c('q-icon', {
    attrs: {
      "name": "ion-ios-more"
    }
  }), _vm._v(" "), _c('q-popover', {
    ref: "popover",
    staticClass: "o-popmenu",
    attrs: {
      "anchor": "bottom right",
      "self": "top right"
    }
  }, [_c('div', {
    staticClass: "o-popmenu__body"
  }, [_c('div', {
    staticClass: "o-popmenu__item",
    on: {
      "click": function($event) {
        _vm.dispatch('copyProgrammatic'), _vm.copySuccess = true
      }
    }
  }, [(_vm.copySuccess) ? _c('q-icon', {
    attrs: {
      "name": "ion-ios-checkmark-empty"
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    class: {
      'u-color-success': _vm.copySuccess
    },
    domProps: {
      "innerHTML": _vm._s(_vm.state.keybindings.copyClipboard.popmenu[_vm.l])
    }
  }), _vm._v(" "), (!_vm.get.mobile) ? _c('div') : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "o-popmenu__item",
    on: {
      "click": function($event) {
        _vm.dispatch('startEdit', {
          item: _vm.item
        }), _vm.$refs.popover.close()
      }
    }
  }, [_c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.state.keybindings.edit.popmenu[_vm.l])
    }
  }), _vm._v(" "), (!_vm.get.mobile) ? _c('div', {
    staticClass: "o-popmenu__hotkey",
    domProps: {
      "innerHTML": _vm._s(_vm.stringToKeyboardKeys(_vm.state.keybindings.edit[_vm.oS]))
    }
  }) : _vm._e()]), _vm._v(" "), (_vm.item.done) ? _c('div', {
    staticClass: "o-popmenu__item",
    on: {
      "click": function($event) {
        _vm.dispatch('popup', {
          id: _vm.item.id,
          type: 'afterDone'
        }), _vm.$refs.popover.close()
      }
    }
  }, [_c('div', [_vm._v(_vm._s(_vm.get.text.popups.journalNotesPopover))]), _vm._v(" "), (!_vm.get.mobile) ? _c('div') : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.state.selection.view != 'journal') ? _c('div', {
    staticClass: "o-popmenu__item",
    on: {
      "click": function($event) {
        _vm.dispatch('setToday', {
          id: _vm.item.id
        }), _vm.$refs.popover.close()
      }
    }
  }, [_c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.state.keybindings.setToday.popmenu[_vm.l])
    }
  }), _vm._v(" "), (!_vm.get.mobile) ? _c('div', {
    staticClass: "o-popmenu__hotkey",
    domProps: {
      "innerHTML": _vm._s(_vm.stringToKeyboardKeys(_vm.state.keybindings.setToday[_vm.oS]))
    }
  }) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.get['user/loggedIn'] && _vm.state.selection.view != 'journal') ? _c('div', {
    staticClass: "o-popmenu__item",
    on: {
      "click": function($event) {
        _vm.dispatch('duplicate', {
          id: _vm.item.id
        }), _vm.$refs.popover.close()
      }
    }
  }, [_c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.state.keybindings.duplicate.popmenu[_vm.l])
    }
  }), _vm._v(" "), (!_vm.get.mobile) ? _c('div', {
    staticClass: "o-popmenu__hotkey",
    domProps: {
      "innerHTML": _vm._s(_vm.stringToKeyboardKeys(_vm.state.keybindings.duplicate[_vm.oS]))
    }
  }) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "o-popmenu__item",
    on: {
      "click": function($event) {
        _vm.dispatch('deleteItemDialogue', {
          id: _vm.item.id
        }), _vm.$refs.popover.close()
      }
    }
  }, [_c('div', [_c('q-icon', {
    attrs: {
      "name": "ion-trash-a"
    }
  }), _vm._v(" " + _vm._s(_vm.state.keybindings.delete.popmenu[_vm.l]))], 1), _vm._v(" "), (!_vm.get.mobile) ? _c('div', {
    staticClass: "o-popmenu__hotkey",
    domProps: {
      "innerHTML": _vm._s(_vm.stringToKeyboardKeys(_vm.state.keybindings.delete[_vm.oS]))
    }
  }) : _vm._e()])])])], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 512:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['items-card', {
      'journal-wrapper': _vm.state.selection.view == 'journal'
    }],
    attrs: {
      "id": 'card-' + _vm.item.id,
      "refs": _vm.item.id
    }
  }, [_c('div', {
    staticClass: "d-flex flex-wrap"
  }, [((_vm.item.id != _vm.state.editingItem && _vm.item.id != _vm.state.editingItemTags) || _vm.get.mobile) ? _c('div', {
    class: {
      'c-item-card': true,
      'show_children': _vm.item.show_children,
    },
    attrs: {
      "id": 'item-body-' + _vm.item.id
    }
  }, [_c('Item-Toggles', {
    attrs: {
      "item": _vm.item
    }
  }), _vm._v(" "), _c('div', {
    class: {
      'c-body-div': true,
      'textarea-wrap': true,
      'u-selected': _vm.item.id == _vm.state.selection.selectedId,
    },
    on: {
      "dblclick": function($event) {
        _vm.dblclick($event)
      },
      "click": _vm.selectItem
    }
  }, [_c('div', {
    class: {
      'c-body-text': true,
      'c-body-text--project': _vm.isProject,
    }
  }, [_c('div', {
    class: {
      'u-lightgray': (_vm.item.temp && _vm.get['user/loggedIn']),
      'c-body-text--done': _vm.item.done
    }
  }, [_vm._v(_vm._s(_vm.item.body))]), _vm._v(" "), (_vm.item.completion_memo) ? _c('div', {
    staticClass: "l-completion-notes c-completion-notes bodybox",
    style: ((_vm.showCompletionNotes) ? '' : 'height:3.4em;'),
    on: {
      "click": _vm.selectItem
    }
  }, [_vm._v(_vm._s(_vm.item.completion_memo))]) : _vm._e(), _vm._v(" "), (_vm.item.completion_memo && _vm.item.completion_memo.length > 80) ? _c('div', {
    staticClass: "c-completion-notes c-completion-notes__showHide",
    on: {
      "click": function($event) {
        _vm.showCompletionNotes = !_vm.showCompletionNotes
      }
    }
  }, [_vm._v(_vm._s((_vm.showCompletionNotes) ? _vm.get.text.card.showLess : _vm.get.text.card.showMore))]) : _vm._e()]), _vm._v(" "), (_vm.state.debug) ? _c('span', {
    staticClass: "d-inline-flex"
  }, [_vm._v("\n\t\t\t\t(" + _vm._s(_vm.item.id) + ") D-" + _vm._s(_vm.item.depth) + ")\n\t\t\t\t"), (_vm.item.children_order.length) ? _c('span', [_vm._v("[" + _vm._s(_vm.item.children_order) + "]")]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.item.id != _vm.state.editingItem) ? _c('Item-Tags-Strip', {
    staticStyle: {
      "padding": "0.2em"
    },
    attrs: {
      "item": _vm.item
    }
  }) : _vm._e(), _vm._v(" "), _c('Item-Nav', {
    attrs: {
      "item": _vm.item
    }
  })], 1)], 1) : _vm._e(), _vm._v(" "), _c('Item-Edit-Add-Wrapper', {
    attrs: {
      "item": _vm.item
    }
  }), _vm._v(" "), (_vm.item.children.length) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.item.show_children),
      expression: "item.show_children"
    }],
    staticClass: "l-children"
  }, _vm._l((_vm.visibleDirectChildren), function(childCard) {
    return (_vm.state.selection.view != 'journal') ? _c('Card', {
      key: childCard.id,
      attrs: {
        "item": childCard
      }
    }) : _vm._e()
  })) : _vm._e()], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 513:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "c-journal-day"
  }, [_c('div', {
    staticClass: "c-journal-date"
  }, [_c('span', [_vm._v(_vm._s(_vm.customCalendar(_vm.day.date)))]), _vm._v(" "), (_vm.day.date != _vm.customCalendar(_vm.day.date)) ? _c('span', {
    staticClass: "c-journal-date__subtitle"
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.day.date) + "\n\t\t")]) : _vm._e(), _vm._v(" "), _c('button', {
    directives: [{
      name: "btn-effect",
      rawName: "v-btn-effect"
    }],
    staticClass: "o-btn ml-auto",
    on: {
      "click": function($event) {
        _vm.dispatch('copyProgrammatic', {
          text: _vm.clipboardTextJournalDay
        })
      }
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.get.text.card.copy) + "\n\t\t")]), _vm._v(" "), (_vm.usedTime) ? _c('div', {
    staticClass: "w-100 d-flex"
  }, [_c('span', {
    staticClass: "c-journal-used-time"
  }, [_vm._v(_vm._s(_vm.get.text.menu.usedTime) + ": ")]), _vm._v(" "), _c('span', {
    staticClass: "o-pill--used-time"
  }, [_vm._v(_vm._s(_vm.sec_to_hourmin(_vm.usedTime)))])]) : _vm._e()]), _vm._v(" "), (_vm.day.items.length && _vm.day.items[0].parentBody) ? _c('div', {
    staticClass: "c-journal-day__entries"
  }, _vm._l((_vm.sortedParentBodyEntries), function(parentBodyEntry) {
    return _c('div', {
      staticClass: "c-journal-entry"
    }, [(parentBodyEntry.parentBody != 'null_no_parent_body') ? _c('div', {
      staticClass: "c-journal-entry__parent-body"
    }, [_vm._v("\n\t\t\t\t" + _vm._s(parentBodyEntry.parentBody) + "\n\t\t\t")]) : _vm._e(), _vm._v(" "), _vm._l((parentBodyEntry.items), function(item) {
      return _c('Card', {
        key: item.id,
        staticClass: "c-journal-entry__item",
        attrs: {
          "item": item
        }
      })
    })], 2)
  })) : _c('div', {
    staticClass: "c-journal-day__entries"
  }, _vm._l((_vm.day.items), function(item) {
    return _c('Card', {
      key: item.id,
      staticClass: "c-journal-entry__item",
      attrs: {
        "item": item
      }
    })
  }))])
},staticRenderFns: []}

/***/ }),

/***/ 514:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.item || _vm.listIsEmpty) ? _c('div', {
    class: {
      'items-card': true,
      'journal-wrapper': _vm.state.selection.view == 'journal'
    },
    attrs: {
      "id": 'card-' + _vm.item.id
    }
  }, [_c('div', {
    staticClass: "d-flex flex-wrap"
  }, [(_vm.item.children.length) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.item.show_children),
      expression: "item.show_children"
    }],
    staticClass: "l-children"
  }, [_vm._l((_vm.get.filteredItemsTree), function(childCard) {
    return (_vm.state.selection.view != 'journal') ? _c('Card', {
      key: childCard.id,
      attrs: {
        "item": childCard
      }
    }) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.get.filteredItemsJournal), function(childCard) {
    return (_vm.state.selection.view == 'journal') ? _c('Journal-Day', {
      attrs: {
        "day": childCard
      }
    }) : _vm._e()
  })], 2) : _vm._e(), _vm._v(" "), (_vm.state.addingNewUnder != _vm.state.root.id) ? _c('Add-Item-Tease') : _vm._e(), _vm._v(" "), _c('Item-Edit-Add-Wrapper', {
    attrs: {
      "item": _vm.item
    }
  })], 1)]) : _vm._e()
},staticRenderFns: []}

/***/ }),

/***/ 515:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(516)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(518),
  /* template */
  __webpack_require__(519),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(517);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("15e6221b", content, true);

/***/ }),

/***/ 517:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-navigation__tag-menu{margin-left:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;margin-bottom:.2em}.c-navigation__tag-menu a{text-decoration:none;color:#4d4d4d;transition:all .35s;margin:0 .2em;padding:.3em}.c-tag-menu--active,.c-tag-menu__tag:hover{color:#5dc2af!important}.c-tag-menu--active:hover{color:#4d4d4d!important}.c-tag-menu--filtered-out{text-decoration:line-through!important;color:#e65e4d!important}.c-tag-menu--filtered-out:hover{color:#4d4d4d!important;text-decoration:none!important}", ""]);

// exports


/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_globalFunctions_js__ = __webpack_require__(10);



var tagSlugToName = __WEBPACK_IMPORTED_MODULE_0__helpers_globalFunctions_js__["a" /* Utilities */].tagSlugToName;

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {};
	},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		selection: function selection() {
			return this.state.selection;
		},
		doc: function doc() {
			return document;
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},

		tagSlugToName: tagSlugToName

	}
});

/***/ }),

/***/ 519:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "c-navigation__tag-menu"
  }, [_vm._l((_vm.get.allTagsComputed), function(tag) {
    return _c('a', {
      class: ['c-tag-menu__tag', {
        'c-tag-menu--active': _vm.selection.tags.includes(tag.slug)
      }],
      attrs: {
        "href": "#",
        "value": tag.slug
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.dispatch('doneEditOrCancelNew');
          _vm.state.computing = true;
          _vm.dispatch('filterItems', {
            keyword: 'tag',
            value: tag.slug,
            event: $event
          });
          _vm.doc.activeElement.blur()
        }
      }
    }, [_vm._v(_vm._s(tag.name))])
  }), _vm._v(" "), _vm._l((_vm.selection.hiddenTags), function(tag) {
    return _c('a', {
      staticClass: "c-tag-menu--filtered-out",
      attrs: {
        "href": "#"
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.dispatch('removeHiddenTag', {
            tag: tag
          })
        }
      }
    }, [_vm._v(_vm._s(_vm.tagSlugToName(tag)))])
  })], 2)
},staticRenderFns: []}

/***/ }),

/***/ 520:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(521)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(523),
  /* template */
  __webpack_require__(524),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 521:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(522);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("4c195c14", content, true);

/***/ }),

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-panel-title{text-align:center;font-size:1.2em;padding:6px 0 0}.c-panel-title__tag{cursor:pointer}.c-panel-title__tag:hover{color:#ababab}.c-panel-title__hidden-tag{text-decoration:line-through;cursor:pointer}.c-panel-title__hidden-tag:hover{text-decoration:none;color:dimgray}.c-panel__stats{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;border-bottom:1px solid #ededed;padding:.4em}.c-panel__stats,.c-stats{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.c-stats>div{margin:.2em}.c-stats>div>div{position:relative;padding:.2em .5em;border-radius:.3em;color:#fff;font-size:.9em}.c-stats__used-time{background-color:#5d67b3}.c-stats__time-left{background-color:#4679a7}.c-stats__children-amount{background-color:#5dc2af}.c-stats__done-children-amount{background-color:#1e824c}.c-stats__copy-btn{padding-top:.18em}.c-panel-title__selection-divider{padding-right:.2em}", ""]);

// exports


/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_globalFunctions_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_valueMorphers2_js__ = __webpack_require__(119);





/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {};
	},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		selection: function selection() {
			return this.state.selection;
		},
		text: function text() {
			return this.get.text;
		},
		totalUsedTime: function totalUsedTime() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__helpers_valueMorphers2_js__["c" /* sec_to_hourmin */])(this.get.filteredItemsUsedSec);
		},
		totalTimeLeft: function totalTimeLeft() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__helpers_valueMorphers2_js__["c" /* sec_to_hourmin */])(this.get.filteredItemsSecLeft);
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},
		copyAll: function copyAll() {
			var text = this.get['selection/dueDateFiltered'] ? this.get.clipboardTextDue : itemGetters[this.state.root.id].clipboardText;
			this.dispatch('copyProgrammatic', { text: text });
		},
		tagSlugToName: function tagSlugToName(tag) {
			return __WEBPACK_IMPORTED_MODULE_0__helpers_globalFunctions_js__["a" /* Utilities */].tagSlugToName(tag);
		}
	}
});

/***/ }),

/***/ 524:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "c-panel-title"
  }, [_c('div', {
    staticClass: "c-panel-title__tags"
  }, [(_vm.get['selection/noFilterOrTag']) ? _c('span', [_vm._v(_vm._s(_vm.text.menu.all))]) : _vm._e(), _vm._v(" "), (_vm.state.selection.view == 'journal') ? _c('span', [_vm._v(_vm._s(_vm.text.menu.journal))]) : _vm._e(), _vm._v(" "), (_vm.get['selection/dueItemsFiltered']) ? _c('span', [_vm._v(_vm._s(_vm.text.menu.today))]) : _vm._e(), _vm._v(" "), _vm._l((_vm.selection.tags), function(tag, index) {
    return (_vm.selection.tags.length) ? _c('span', {
      staticClass: "c-panel-title__tag",
      on: {
        "click": function($event) {
          _vm.dispatch('filterItems', {
            keyword: 'tag',
            value: tag,
            event: $event
          })
        }
      }
    }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.tagSlugToName(tag))), (index + 1 != _vm.selection.tags.length) ? _c('span', {
      staticClass: "c-panel-title__selection-divider"
    }, [_vm._v(", ")]) : _vm._e()]) : _vm._e()
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "c-panel-title__hidden-tags"
  }, _vm._l((_vm.selection.hiddenTags), function(hiddenTag, index) {
    return (_vm.selection.hiddenTags.length) ? _c('span', {
      staticClass: "c-panel-title__hidden-tag",
      on: {
        "click": function($event) {
          _vm.dispatch('removeHiddenTag', {
            tag: hiddenTag
          })
        }
      }
    }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.tagSlugToName(hiddenTag))), (index + 1 != _vm.selection.hiddenTags.length) ? _c('span', {
      staticClass: "c-panel-title__selection-divider"
    }, [_vm._v(", ")]) : _vm._e()]) : _vm._e()
  }))]), _vm._v(" "), _c('div', {
    staticClass: "c-panel__stats"
  }, [_c('div', {
    staticStyle: {
      "width": "2rem"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "c-stats"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.totalUsedTime && _vm.selection.view != 'journal'),
      expression: "totalUsedTime && selection.view != 'journal'"
    }]
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.text.menu.usedTime) + "\n\t\t\t\t"), _c('div', {
    staticClass: "c-stats__used-time"
  }, [_vm._v(_vm._s(_vm.totalUsedTime))])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.totalTimeLeft && _vm.selection.view != 'journal'),
      expression: "totalTimeLeft && selection.view != 'journal'"
    }]
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.text.menu.timeLeft) + "\n\t\t\t\t"), _c('div', {
    staticClass: "c-stats__time-left"
  }, [_vm._v(_vm._s(_vm.totalTimeLeft))])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.selection.view != 'journal'),
      expression: "selection.view != 'journal'"
    }]
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.text.menu.items) + "\n\t\t\t\t"), _c('div', {
    staticClass: "c-stats__children-amount"
  }, [_vm._v(_vm._s(_vm.get.itemCount))])]), _vm._v(" "), (_vm.get.doneItemsCountFlat) ? _c('div', [_vm._v("\n\t\t\t\t" + _vm._s((_vm.selection.view != 'journal') ? _vm.text.menu.done : _vm.text.menu.total) + "\n\t\t\t\t"), _c('div', {
    staticClass: "c-stats__done-children-amount"
  }, [_vm._v(_vm._s(_vm.get.doneItemsCountFlat))])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticStyle: {
      "min-width": "2rem"
    }
  }, [(_vm.selection.view != 'journal' && this.get.filteredIdsFlat.length) ? _c('button', {
    directives: [{
      name: "btn-effect",
      rawName: "v-btn-effect"
    }],
    staticClass: "o-btn c-stats__copy-btn",
    on: {
      "click": _vm.copyAll
    }
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.text.card.copy) + "\n\t\t\t")]) : _vm._e()])])])
},staticRenderFns: []}

/***/ }),

/***/ 525:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "c-panel"
  }, [_c('Tags-Nav'), _vm._v(" "), _c('div', {
    staticClass: "u-line"
  }), _vm._v(" "), _c('Stats-Nav'), _vm._v(" "), _c('div', {
    staticClass: "layout-view c-content-wrapper"
  }, [_c('Cards', {
    ref: "root",
    attrs: {
      "item": _vm.state.root
    }
  })], 1), _vm._v(" "), (_vm.get.mobile) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.get.itemCount),
      expression: "!get.itemCount"
    }],
    staticClass: "c-bottom-hint"
  }, [_vm._v(_vm._s(_vm.get.text.guide.hints.addItemHint)), _c('br'), _vm._v("➘")]) : _vm._e()], 1)
},staticRenderFns: []}

/***/ })

});