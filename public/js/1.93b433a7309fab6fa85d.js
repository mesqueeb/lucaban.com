webpackJsonp([1],{

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(415)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(417),
  /* template */
  __webpack_require__(458),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(416);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("ecba7986", content, true);

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".layout-header{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px rgba(0,0,0,.04),0 1px 10px rgba(0,0,0,.02)!important}.layout-footer{box-shadow:0 -2px 4px -1px rgba(0,0,0,.2),0 -4px 5px rgba(0,0,0,.04),0 -1px 10px rgba(0,0,0,.02)!important}", ""]);

// exports


/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_components_Popups_vue__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_components_Popups_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__vue_components_Popups_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_Popouts_vue__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_Popouts_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_Popouts_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_Flashes_vue__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_Flashes_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_Flashes_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_LoadingSpinner_vue__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_LoadingSpinner_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__vue_components_LoadingSpinner_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_PanelNav_vue__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_PanelNav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__vue_components_PanelNav_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vue_components_MobileNav_Move_vue__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vue_components_MobileNav_Move_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__vue_components_MobileNav_Move_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vue_components_MobileNav_Add_vue__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vue_components_MobileNav_Add_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__vue_components_MobileNav_Add_vue__);









/* harmony default export */ __webpack_exports__["default"] = ({
	store: store,
	components: {
		PanelNav: __WEBPACK_IMPORTED_MODULE_4__vue_components_PanelNav_vue___default.a,
		Popups: __WEBPACK_IMPORTED_MODULE_0__vue_components_Popups_vue___default.a,
		Popouts: __WEBPACK_IMPORTED_MODULE_1__vue_components_Popouts_vue___default.a,
		Flashes: __WEBPACK_IMPORTED_MODULE_2__vue_components_Flashes_vue___default.a,
		LoadingSpinner: __WEBPACK_IMPORTED_MODULE_3__vue_components_LoadingSpinner_vue___default.a,
		MobileNavMove: __WEBPACK_IMPORTED_MODULE_5__vue_components_MobileNav_Move_vue___default.a,
		MobileNavAdd: __WEBPACK_IMPORTED_MODULE_6__vue_components_MobileNav_Add_vue___default.a
	},
	mounted: function mounted() {
		var self = this;
		eventHub.$on('confirm-ok', function (id) {
			console.log('computer says "ok"... {$id}');
			self.$store.dispatch('deleteItem', { id: id });
		});
		eventHub.$on('confirm-cancel', function (id) {
			console.log('computer says "no"... {$id}');return;
		});
		this.$store.dispatch('sortAllChildren');

		var localToken = localStorage.getItem('token');
		if (localToken) {
			console.log('old Token: ' + localToken);
			console.log('old Token Date: ' + localStorage.getItem('tokenTimeStamp'));
			axios.post(apiBaseURL + 'refreshToken', { token: localToken }).then(function (_ref) {
				var data = _ref.data;

				console.log('refreshed token:');
				console.log(data);
				window.axios.defaults.headers.common = {
					'X-Requested-With': 'XMLHttpRequest',
					'Authorization': "Bearer " + data
				};
				store.state.api.token = data;
				store.state.api.tokenTimeStamp = new Date();
				localStorage.setItem('token', data);
				localStorage.setItem('tokenTimeStamp', new Date());
				console.log('new Token: ' + store.state.token);
				console.log('new Token Date: ' + store.state.tokenTimeStamp);
				store.dispatch('fetchListo');
			});
		}
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

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(419)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(421),
  /* template */
  __webpack_require__(422),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(420);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("c200adfa", content, true);

/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, "#c-popups{top:0;position:fixed;z-index:5;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;background:hsla(0,0%,97%,.95);box-shadow:0 1px 0 rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.1)}#c-popups,.c-popup{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex}.c-popup{padding:.6em;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.c-popup__top{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-bottom:.5em}.c-popup__title{font-weight:600;margin:0 auto}.c-popup__body{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.c-popup input,.c-popup textarea{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;color:#4d4d4d;font-weight:300;-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;font-smoothing:antialiased;resize:none;padding:.3em;margin-right:1em;background:none;border:1px solid #929292;border-radius:.3em}.c-popup label.done-after-done{cursor:pointer;font-weight:inherit;border-bottom:1px solid}.c-popup label.done-after-done input{border:none}.c-popup__completion-memo,.c-popup__completion-memo__txtarea{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:2;-ms-flex-positive:2;flex-grow:2;margin-right:.3em}.mobile .popup .completion-memo{font-size:16px}.c-popup__close-button{padding-left:.5em;font-size:2em;color:#000}.c-popup__used-time{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0}.c-popup__used-time span{font-size:1.4em;margin-left:1em}.c-popup__used-time>div>div{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.c-popup__used-time button{padding:.3em .3em 0}", ""]);

// exports


/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_valueMorphers2_js__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autosize__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autosize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_autosize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_flatPickrOptions_js__ = __webpack_require__(122);






/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'Popups',
    template: '#popups-template',
    data: function data() {
        return { flatPickConfig: __WEBPACK_IMPORTED_MODULE_2__config_flatPickrOptions_js__["a" /* default */] };
    },

    computed: {
        get: function get() {
            return this.$store.getters;
        },
        state: function state() {
            return this.$store.state;
        },
        popups: function popups() {
            return this.state.popups;
        }
    },
    methods: {
        sec_to_hhmmss: __WEBPACK_IMPORTED_MODULE_0__helpers_valueMorphers2_js__["b" /* sec_to_hhmmss */], customCalendar: __WEBPACK_IMPORTED_MODULE_0__helpers_valueMorphers2_js__["a" /* customCalendar */],
        commit: function commit(action, payload) {
            this.$store.commit(action, payload);
        },
        dispatch: function dispatch(action, payload) {
            this.$store.dispatch(action, payload);
        },
        addPopup: function addPopup(popup) {
            this.commit('addPopup', { popup: popup });
        },
        removePopup: function removePopup(popup) {
            clearTimeout(popup.timer);
            if (popup.type == 'afterDone') {
                if (popup.item.used_time) {
                    this.dispatch('patch', { id: popup.item.id, field: 'used_time' });
                }
                if (popup.item.completion_memo) {
                    this.dispatch('patch', { id: popup.item.id, field: 'completion_memo' });
                }
            }
            var index = this.state.popups.indexOf(popup);
            this.commit('removePopup', { index: index });
            var self = this;
            Vue.nextTick(function () {
                if (self.state.popups.length) {
                    document.querySelector('#c-popups>div:first-child textarea').focus();
                }
            });
        },
        incrementUsedTime: function incrementUsedTime(item, amount) {
            if (!item.used_time) {
                item.used_time = amount;
            } else {
                item.used_time = parseFloat(item.used_time) + amount;
            }
        },
        setNotDone: function setNotDone(popup) {
            this.dispatch('markDone', { id: popup.item.id, markAs: 'notDone' });
            this.removePopup(popup);
        },
        resetUsedTime: function resetUsedTime(item) {
            item.used_time = 0;
        },
        keydownInCompletionMemo: function keydownInCompletionMemo(popup, e) {
            if (e.keyCode == 13 && (e.ctrlKey || e.metaKey) || e.keyCode == 27) {
                    this.removePopup(popup);
                }
        },
        keydownInPopup: function keydownInPopup(popup, e, field) {
            if (field == 'flatPickr') {
                if (e.keyCode == '9' && e.shiftKey) {
                    preventKeydownListener();
                    e.preventDefault();
                }
            }
            if (field == 'closeButton') {
                if (e.keyCode == '9' && !e.shiftKey) {
                    preventKeydownListener();
                    e.preventDefault();
                }
            }
            if (e.keyCode == 27) {
                    this.removePopup(popup);
                }
        }
    }
});

/***/ }),

/***/ 422:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "c-popups"
    }
  }, _vm._l((_vm.popups), function(popup) {
    return _c('div', {
      class: popup.type ? popup.type : 'secondary',
      attrs: {
        "transition": "fade"
      }
    }, [(popup.type == 'afterDone') ? _c('div', {
      staticClass: "c-popup callout animated"
    }, [_c('div', {
      staticClass: "c-popup__top"
    }, [_c('div', {
      staticClass: "c-popup__title"
    }, [_vm._v(_vm._s(_vm.get.text.popups.completed) + " " + _vm._s(popup.item.body) + " " + _vm._s(_vm.get.text.popups.completedB) + "\n            "), _c('label', {
      staticClass: "done-after-done",
      on: {
        "keydown": function($event) {
          _vm.keydownInPopup(popup, $event, 'flatPicker')
        }
      }
    }, [_vm._v(_vm._s(_vm.customCalendar(popup.item.done_date)) + "\n                "), _c('input', {
      directives: [{
        name: "flatpicky",
        rawName: "v-flatpicky"
      }, {
        name: "model",
        rawName: "v-model",
        value: (popup.item.done_date),
        expression: "popup.item.done_date"
      }],
      staticClass: "flatpickr",
      attrs: {
        "id": 'done-date-edit-' + popup.item.id,
        "name": popup.item.id
      },
      domProps: {
        "value": (popup.item.done_date)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          popup.item.done_date = $event.target.value
        }
      }
    })])])]), _vm._v(" "), _c('div', {
      staticClass: "c-popup__body"
    }, [_c('div', {
      staticClass: "c-popup__completion-memo"
    }, [_c('label', [_vm._v(_vm._s(_vm.get.text.popups.journalNotes))]), _vm._v(" "), _c('textarea', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (popup.item.completion_memo),
        expression: "popup.item.completion_memo"
      }, {
        name: "focus",
        rawName: "v-focus.noMobile",
        modifiers: {
          "noMobile": true
        }
      }, {
        name: "autoheight",
        rawName: "v-autoheight"
      }],
      staticClass: "js-popup__completion_memo__txtarea",
      attrs: {
        "name": "c-popup__completion_memo__txtarea"
      },
      domProps: {
        "value": (popup.item.completion_memo)
      },
      on: {
        "keydown": function($event) {
          _vm.keydownInCompletionMemo(popup, $event)
        },
        "input": function($event) {
          if ($event.target.composing) { return; }
          popup.item.completion_memo = $event.target.value
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "c-popup__used-time"
    }, [_c('div', [_c('label', {}, [_vm._v(_vm._s(_vm.get.text.popups.usedTime))]), _vm._v(" "), _c('span', {}, [_vm._v(_vm._s(_vm.sec_to_hhmmss(popup.item.used_time)))])]), _vm._v(" "), _c('div', {
      staticClass: "buttons"
    }, [_c('div', [_c('button', {
      staticClass: "o-btn forward",
      on: {
        "click": function($event) {
          _vm.incrementUsedTime(popup.item, 60)
        },
        "keydown": function($event) {
          _vm.keydownInPopup(popup, $event, 'forward')
        }
      }
    }, [_vm._v("+1 " + _vm._s(_vm.get.text.global.min))]), _vm._v(" "), _c('button', {
      staticClass: "o-btn forward",
      on: {
        "click": function($event) {
          _vm.incrementUsedTime(popup.item, 300)
        },
        "keydown": function($event) {
          _vm.keydownInPopup(popup, $event, 'forward')
        }
      }
    }, [_vm._v("+5 " + _vm._s(_vm.get.text.global.min))]), _vm._v(" "), _c('button', {
      staticClass: "o-btn forward",
      on: {
        "click": function($event) {
          _vm.incrementUsedTime(popup.item, 600)
        },
        "keydown": function($event) {
          _vm.keydownInPopup(popup, $event, 'forward')
        }
      }
    }, [_vm._v("+10 " + _vm._s(_vm.get.text.global.min))])]), _c('div', [_c('button', {
      staticClass: "o-btn forward",
      on: {
        "click": function($event) {
          _vm.incrementUsedTime(popup.item, 1800)
        },
        "keydown": function($event) {
          _vm.keydownInPopup(popup, $event, 'forward')
        }
      }
    }, [_vm._v("+30 " + _vm._s(_vm.get.text.global.min))]), _vm._v(" "), _c('button', {
      staticClass: "o-btn reset",
      on: {
        "click": function($event) {
          _vm.resetUsedTime(popup.item)
        },
        "keydown": function($event) {
          _vm.keydownInPopup(popup, $event, 'reset')
        }
      }
    }, [_vm._v(_vm._s(_vm.get.text.popups.reset))]), _vm._v(" "), _c('button', {
      staticClass: "o-btn undo-completion",
      on: {
        "click": function($event) {
          _vm.setNotDone(popup)
        },
        "keydown": function($event) {
          _vm.keydownInPopup(popup, $event, 'setNotDone')
        }
      }
    }, [_vm._v(_vm._s(_vm.get.text.popups.setNotDone))])])])])]), _vm._v(" "), _c('button', {
      staticClass: "o-btn c-popup__close-button",
      attrs: {
        "aria-label": "Close alert",
        "type": "button"
      },
      on: {
        "click": function($event) {
          _vm.removePopup(popup)
        },
        "keydown": function($event) {
          _vm.keydownInPopup(popup, $event, 'closeButton')
        }
      }
    }, [_c('span', {
      attrs: {
        "aria-hidden": "true"
      }
    }, [_vm._v("×")])])]) : _vm._e()])
  }))
},staticRenderFns: []}

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(424)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(426),
  /* template */
  __webpack_require__(427),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(425);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("5513d198", content, true);

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-popouts-mask,.turnofflights{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;z-index:5;position:fixed;width:100vw;height:100vh;background-color:rgba(0,0,0,.5);transition:opacity .3s ease;top:-100px;left:-100px;box-sizing:content-box;padding:100px}.c-guide__table tr>td:first-child{border-right:thin solid #d3d3d3}.c-guide__table td,th{border-bottom:thin solid #d3d3d3;padding:.2rem .3rem}.c-popout{box-sizing:border-box;z-index:5;background:#fff;border-radius:.3em;margin:1em}.c-popout__bodybox{border-bottom:1px solid #e3e3e3;font-size:1.1em;padding:1em;width:100%;word-break:break-word}.c-popout__bodybox,.c-popout__nav{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex}.c-popout__nav{padding:.6em 1em;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.c-timer__body{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-timer__time{font-size:4em;margin:0 auto;padding:.3em .8em 0;line-height:normal}.c-timer__overtime-notice{color:#e65e4d;font-size:.3em;width:100%}.c-timer__time--overtime{color:#e65e4d}.l-toggle-div--popout{margin-top:-.2em;margin-right:.5em}.c-popout button{font-size:1.1em;padding:0 .4em;margin:0 .3em}.c-popout button.pause,.c-popout button.play{font-size:1.3em}.c-popout--done{color:#d9d9d9;text-decoration:line-through}", ""]);

// exports


/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_quasar__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_valueMorphers2_js__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_autosize__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_autosize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_autosize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__ = __webpack_require__(10);



var formatDate = __WEBPACK_IMPORTED_MODULE_1_quasar__["s" /* date */].formatDate;





/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'Popouts',
	template: '#popouts-template',
	data: function data() {
		return {
			timerRunning: true
		};
	},
	created: function created() {
		this.$bus.$on('playTimer', this.playTimer);
		this.$bus.$on('clearAll', this.clearAll);
	},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		popouts: function popouts() {
			return this.state.popouts;
		},
		popoutExists: function popoutExists() {
			return this.popouts.timer.length || this.popouts.delete.length || this.popouts.edit.length || this.popouts.guide;
		},
		guide: function guide() {
			var _this = this;

			return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(this.state.keybindings).filter(function (k) {
				return _this.state.keybindings[k][_this.get.oS];
			});
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},

		sec_to_hhmmss: __WEBPACK_IMPORTED_MODULE_2__helpers_valueMorphers2_js__["b" /* sec_to_hhmmss */], customCalendar: __WEBPACK_IMPORTED_MODULE_2__helpers_valueMorphers2_js__["a" /* customCalendar */], stringToKeyboardKeys: __WEBPACK_IMPORTED_MODULE_4__helpers_globalFunctions_js__["k" /* stringToKeyboardKeys */],
		countdownTimer: function countdownTimer(used_time, planned_time) {
			var secondsLeft = planned_time * 60 - used_time;
			if (secondsLeft > 0) {
				return this.sec_to_hhmmss(secondsLeft);
			} else {
				return this.sec_to_hhmmss(used_time - planned_time * 60);
			}
		},
		removePopout: function removePopout(item) {
			this.timerRunning = false;
			var index = this.state.popouts.timer.indexOf(item);
			if (index == -1) {
				index = this.state.popouts.delete.indexOf(item);
				this.commit('removePopout', { type: 'delete', index: index });
				return;
			}
			this.commit('removePopout', { type: 'timer', index: index });
		},
		popoutCall: function popoutCall(msg, item) {
			Vue.bus.$emit(msg, item.id);
			this.removePopout(item);
		},
		maskClick: function maskClick(event) {
			if (event.target.id == 'js-popouts-mask') {
				this.clearAll();
			}
		},
		clearAll: function clearAll(event) {
			var _this2 = this;

			this.commit('updatePopouts', { delete: [] });
			this.state.popouts.timer.forEach(function (item) {
				return _this2.closeTimer(item);
			});

			this.commit('updatePopouts', { guide: false });
			window.timers = {};
		},
		updateDone: function updateDone(item) {
			this.pauseTimer(item);
			this.dispatch('prepareDonePatch', { id: item.id });
			document.querySelector('.js-btn-ok').focus();
		},
		timerNav: function timerNav(button, item, value) {
			if (button == 'play') {
				this.playTimer(item);
			}
			if (button == 'pause') {
				this.pauseTimer(item);
			}
			if (button == 'forward') {
				this.forwardTimer(item, value);
			}
			if (button == 'reset') {
				this.resetTimer(item);
			}
			if (button == 'close') {
				this.closeTimer(item);
			}
		},
		playTimer: function playTimer(item) {
			item = item ? item : this.timer[0] ? this.timer[0] : null;
			if (!item) {
				console.log('no timer item');return;
			}

			console.log("timer started: " + formatDate(new Date(), 'HH:mm:ss'));
			this.timerRunning = true;
			var update = function update() {
				if (item.planned_time > 0) {
					item.used_time = ++item.used_time;
				} else {
					item.used_time = ++item.used_time;
				}
			};
			window.timers = !window.timers ? {} : timers;
			if (timers[item.id]) {
				return;
			}
			timers[item.id] = setInterval(update, 1000);
		},
		pauseTimer: function pauseTimer(item) {
			console.log("timer paused: " + formatDate(new Date(), 'HH:mm:ss'));
			this.timerRunning = false;
			if (!window.timers) {
				return;
			}
			if (!window.timers[item.id]) {
				return;
			}
			clearInterval(window.timers[item.id]);
			delete window.timers[item.id];
			this.dispatch('patch', { id: item.id, field: 'used_time' });
		},
		forwardTimer: function forwardTimer(item, time) {
			time = time * 60;
			item.used_time = item.used_time + time;
		},
		resetTimer: function resetTimer(item) {
			console.log("timer reset: " + formatDate(new Date(), 'HH:mm:ss'));
			item.used_time = 0;
			this.dispatch('patch', { id: item.id, field: 'used_time' });
		},
		closeTimer: function closeTimer(item) {
			console.log("timer closed: " + formatDate(new Date(), 'HH:mm:ss'));
			if (window.timers && window.timers[item.id]) {
				clearInterval(window.timers[item.id]);
				delete window.timers[item.id];
			}
			if (item.used_time < 5) {
				item.used_time = 0;
			} else {
				this.dispatch('patch', { id: item.id, field: 'used_time' });
			}
			this.removePopout(item);
		}
	}
});

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.popoutExists) ? _c('div', {
    staticClass: "c-popouts-mask",
    attrs: {
      "id": "js-popouts-mask"
    },
    on: {
      "click": function($event) {
        _vm.maskClick($event)
      }
    }
  }, [_vm._l((_vm.popouts.delete), function(item) {
    return (_vm.popouts.delete.length) ? _c('div', {
      staticClass: "c-popout"
    }, [_c('div', {
      staticClass: "c-popout__delete"
    }, [_c('div', {
      staticClass: "c-popout__bodybox"
    }, [_vm._v(_vm._s(_vm.get.text.popouts.reallyDelete) + "「" + _vm._s(item.body) + "」"), (item.children.length) ? _c('strong', {
      staticStyle: {
        "padding-left": "0 0.3em"
      }
    }, [_vm._v(" " + _vm._s(_vm.get.text.popouts.andAllChildren))]) : _vm._e(), _vm._v("?\n\t\t\t")]), _vm._v(" "), _c('div', {
      staticClass: "c-popout__nav"
    }, [_c('button', {
      staticClass: "o-btn btn-cancel",
      on: {
        "click": function($event) {
          _vm.popoutCall('confirm-cancel', item)
        }
      }
    }, [_vm._v(_vm._s(_vm.get.text.global.cancel))]), _vm._v(" "), _c('button', {
      directives: [{
        name: "focus",
        rawName: "v-focus.noMobile",
        modifiers: {
          "noMobile": true
        }
      }],
      staticClass: "o-btn o-btn--warning btn-ok js-btn-ok",
      on: {
        "click": function($event) {
          _vm.popoutCall('confirm-ok', item)
        }
      }
    }, [_vm._v(_vm._s(_vm.get.text.global.delete))])])])]) : _vm._e()
  }), _vm._v(" "), (_vm.popouts.guide) ? _c('div', {
    staticClass: "c-popout"
  }, [_c('div', {
    staticClass: "c-guide"
  }, [_c('div', {
    staticClass: "c-popout__bodybox"
  }, [_c('table', {
    staticClass: "c-guide__table"
  }, [_c('tr', [_c('th', [_vm._v(_vm._s(_vm.get.text.guide.action))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.get.text.guide.key))])]), _vm._v(" "), _vm._l((_vm.guide), function(k) {
    return _c('tr', [_c('td', {
      domProps: {
        "innerHTML": _vm._s(_vm.state.keybindings[k].guide[_vm.get.language])
      }
    }), _vm._v(" "), (_vm.state.keybindings[k][_vm.get.oS].includes('click')) ? _c('td', [_c('span', {
      domProps: {
        "innerHTML": _vm._s(_vm.stringToKeyboardKeys(_vm.state.keybindings[k][_vm.get.oS]))
      }
    }), _c('q-icon', {
      attrs: {
        "name": "mouse"
      }
    })], 1) : _c('td', {
      domProps: {
        "innerHTML": _vm._s(_vm.stringToKeyboardKeys(_vm.state.keybindings[k][_vm.get.oS]))
      }
    })])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "c-popout__nav"
  }, [_c('button', {
    directives: [{
      name: "focus",
      rawName: "v-focus.noMobile",
      modifiers: {
        "noMobile": true
      }
    }],
    staticClass: "o-btn btn-ok js-btn-ok",
    on: {
      "click": this.clearAll
    }
  }, [_vm._v(_vm._s(_vm.get.text.popouts.ok))])])])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.popouts.timer), function(item) {
    return (_vm.popouts.timer.length) ? _c('div', {
      staticClass: "c-popout"
    }, [_c('div', {
      class: {
        'c-timer': true,
      }
    }, [_c('div', {
      staticClass: "c-timer__body"
    }, [_c('div', {
      staticClass: "c-popout__bodybox"
    }, [_c('div', {
      staticClass: "l-toggle-div--popout o-toggle-div"
    }, [(item.children_order.length == 0 || item.done == true) ? _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.done),
        expression: "item.done"
      }],
      staticClass: "o-toggle__check",
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "checked": Array.isArray(item.done) ? _vm._i(item.done, null) > -1 : (item.done)
      },
      on: {
        "change": function($event) {
          _vm.updateDone(item)
        },
        "__c": function($event) {
          var $$a = item.done,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = null,
              $$i = _vm._i($$a, $$v);
            if ($$c) {
              $$i < 0 && (item.done = $$a.concat($$v))
            } else {
              $$i > -1 && (item.done = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            item.done = $$c
          }
        }
      }
    }) : _vm._e()]), _vm._v(" "), _c('span', {
      class: {
        'c-popout--done': item.done
      }
    }), _vm._v(_vm._s(item.body) + "\n\t\t\t\t")]), _vm._v(" "), (!item.planned_time) ? _c('div', {
      staticClass: "c-timer__time"
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.sec_to_hhmmss(item.used_time)) + "\n\t\t\t\t")]) : _vm._e(), _vm._v(" "), (item.planned_time) ? _c('div', {
      class: {
        'c-timer__time': true,
        'countdown': true,
        'c-timer__time--overtime': item.used_time > item.planned_time * 60,
      }
    }, [(item.used_time > item.planned_time * 60) ? _c('div', {
      staticClass: "c-timer__overtime-notice"
    }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.get.text.popouts.overtime) + "\n\t\t\t\t\t")]) : _vm._e(), _vm._v(" "), _c('div', [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.countdownTimer(item.used_time, item.planned_time)) + "\n\t\t\t\t\t")])]) : _vm._e(), _vm._v(" "), (item.used_time > item.planned_time * 60 && item.planned_time) ? _c('div', [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.get.text.popouts.total) + "  " + _vm._s(_vm.sec_to_hhmmss(item.used_time)) + "\n\t\t\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "c-popout__nav"
    }, [_c('button', {
      directives: [{
        name: "btn-effect",
        rawName: "v-btn-effect"
      }, {
        name: "show",
        rawName: "v-show",
        value: (!_vm.timerRunning),
        expression: "!timerRunning"
      }],
      staticClass: "o-btn play",
      on: {
        "click": function($event) {
          _vm.timerNav('play', item)
        }
      }
    }, [_c('q-icon', {
      attrs: {
        "name": "ion-ios-play"
      }
    })], 1), _vm._v(" "), _c('button', {
      directives: [{
        name: "btn-effect",
        rawName: "v-btn-effect"
      }, {
        name: "show",
        rawName: "v-show",
        value: (_vm.timerRunning),
        expression: "timerRunning"
      }],
      staticClass: "o-btn pause",
      on: {
        "click": function($event) {
          _vm.timerNav('pause', item)
        }
      }
    }, [_c('q-icon', {
      attrs: {
        "name": "ion-ios-pause"
      }
    })], 1), _vm._v(" "), _c('button', {
      directives: [{
        name: "btn-effect",
        rawName: "v-btn-effect"
      }],
      staticClass: "o-btn forward",
      on: {
        "click": function($event) {
          _vm.timerNav('forward', item, 1)
        }
      }
    }, [_c('q-icon', {
      attrs: {
        "name": "ion-ios-fastforward"
      }
    }), _vm._v(" "), ( false) ? _c('span', [_vm._v("-")]) : _c('span'), _vm._v("\n\t\t\t\t1 " + _vm._s(_vm.get.text.global.min) + "\n\t\t\t\t")], 1), _vm._v(" "), _c('button', {
      directives: [{
        name: "btn-effect",
        rawName: "v-btn-effect"
      }],
      staticClass: "o-btn forward",
      on: {
        "click": function($event) {
          _vm.timerNav('forward', item, 5)
        }
      }
    }, [_c('q-icon', {
      attrs: {
        "name": "ion-ios-fastforward"
      }
    }), _vm._v(" "), ( false) ? _c('span', [_vm._v("-")]) : _c('span'), _vm._v("\n\t\t\t\t5 " + _vm._s(_vm.get.text.global.min) + "\n\t\t\t\t")], 1), _vm._v(" "), _c('button', {
      directives: [{
        name: "btn-effect",
        rawName: "v-btn-effect"
      }],
      staticClass: "o-btn reset",
      on: {
        "click": function($event) {
          _vm.timerNav('reset', item)
        }
      }
    }, [_vm._v(_vm._s(_vm.get.text.popouts.reset))]), _vm._v(" "), _c('button', {
      staticClass: "o-btn btn-ok js-btn-ok",
      on: {
        "click": function($event) {
          _vm.timerNav('close', item)
        }
      }
    }, [_vm._v(_vm._s(_vm.get.text.popouts.ok))])])])]) : _vm._e()
  })], 2) : _vm._e()
},staticRenderFns: []}

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(429)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(431),
  /* template */
  __webpack_require__(437),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(430);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("5a409c11", content, true);

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".fade-enter-active,.fade-leave-active{transition:opacity .5s}.fade-enter,.fade-leave-to{opacity:0}.c-flashes-mask{position:fixed;width:100%;top:0;z-index:10;margin-top:2rem}", ""]);

// exports


/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Flash_vue__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Flash_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Flash_vue__);



/* harmony default export */ __webpack_exports__["default"] = ({
	components: {
		Flash: __WEBPACK_IMPORTED_MODULE_0__Flash_vue___default.a
	},
	data: function data() {
		return {
			timerRunning: true
		};
	},
	mounted: function mounted() {
		if (!window.timers) {
			window.timers = {};
		}
		eventHub.$on('clearAll', this.clearAll);
	},

	computed: {
		get: function get() {
			return this.$store.getters;
		},
		state: function state() {
			return this.$store.state;
		},
		flashes: function flashes() {
			return this.state.flashes;
		}
	},
	methods: {
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},
		maskClick: function maskClick(event) {
			if (event.target.id == 'c-flashes-mask') {}
		},
		clearAll: function clearAll(event) {
			this.commit('updateState', { flashes: [] });
			window.timers = {};
		}
	}
});

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(433)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(435),
  /* template */
  __webpack_require__(436),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(434);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("99038d6e", content, true);

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".o-flash{margin:.5rem;background-color:#fff;box-shadow:0 2px 4px 0 hsla(0,0%,53%,.5);display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;transition:all .35s}.o-flash__button{padding:0 .5rem}.o-flash__countdown{width:100%;height:2px;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.o-flash__body{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:.5em;white-space:pre}", ""]);

// exports


/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['flash', 'index'],
  data: function data() {
    return {
      countDown: 100
    };
  },

  computed: {
    get: function get() {
      return this.$store.getters;
    },
    state: function state() {
      return this.$store.state;
    },
    countDownPercentage: function countDownPercentage() {
      return 40 / this.countDown * 100;
    }
  },
  mounted: function mounted() {
    var self = this;
    if (this.flash.type == 'ajaxError') {
      window.timers['flash-' + self.index] = window.setInterval(function () {
        self.countDown--;
        if (self.countDown == 0) {
          self.closeSelf();
        }
      }, 100);
      return;
    }
    window.timers['flash-' + self.index] = window.setInterval(function () {
      self.countDown = self.countDown - 0.5;
      if (self.countDown == 0) {
        self.closeSelf();
      }
    }, 15);
  },

  methods: {
    commit: function commit(action, payload) {
      this.$store.commit(action, payload);
    },
    dispatch: function dispatch(action, payload) {
      this.$store.dispatch(action, payload);
    },
    closeSelf: function closeSelf() {
      if (window.timers['flash-' + this.index]) {
        clearInterval(window.timers['flash-' + this.index]);
        delete window.timers['flash-' + this.index];
      }
      this.commit('closeFlash', { flash: this.flash });
    },
    reload: function reload() {
      location.reload();
    }
  }
});

/***/ }),

/***/ 436:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "o-flash",
    class: 'o-flash--' + _vm.flash.type
  }, [_c('div', {
    staticClass: "o-flash__body",
    domProps: {
      "innerHTML": _vm._s(_vm.flash.msg)
    }
  }, [(_vm.flash.type == 'ajaxError') ? _c('span', [_vm._v(_vm._s(_vm.countDown))]) : _vm._e()]), _vm._v(" "), (_vm.flash.type == 'ajaxError') ? _c('button', {
    staticClass: "o-btn o-flash__button ml-auto",
    on: {
      "click": _vm.reload
    }
  }, [_vm._v(_vm._s(_vm.get.text.global.reload))]) : _vm._e(), _vm._v(" "), _c('button', {
    staticClass: "o-btn o-flash__button",
    on: {
      "click": _vm.closeSelf
    }
  }, [_vm._v("✗")]), _vm._v(" "), _c('q-progress', {
    staticClass: "o-flash__countdown",
    attrs: {
      "percentage": _vm.countDown,
      "color": "teal-3"
    }
  })], 1)
},staticRenderFns: []}

/***/ }),

/***/ 437:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "c-flashes-mask"
  }, [_c('transition-group', {
    attrs: {
      "name": "fade"
    }
  }, _vm._l((_vm.flashes), function(flash, index) {
    return _c('Flash', {
      key: 'flash-' + index,
      attrs: {
        "flash": flash,
        "index": index
      }
    })
  }))], 1)
},staticRenderFns: []}

/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(439)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(441),
  /* template */
  __webpack_require__(442),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(440);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("45302889", content, true);

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-spinner__wrapper{z-index:6;position:fixed;right:1em;top:1em}.c-spinner{color:#5dc2af}.c-spinner__patching-error{color:#e65e4d;font-weight:600}.c-spinner--fullscreen{top:0;bottom:0;left:0;right:0;background-color:hsla(0,0%,100%,.95);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-spinner--fullscreen svg{width:50vw;height:auto}", ""]);

// exports


/***/ }),

/***/ 441:
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

/***/ 442:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: {
      'c-spinner__wrapper': true, 'c-spinner--fullscreen': _vm.state.loading
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.state.patching || _vm.state.loading),
      expression: "state.patching || state.loading"
    }],
    staticClass: "c-spinner__svg-wrapper",
    attrs: {
      "title": "loading",
      "alt": "Loading"
    }
  }, [_c('q-spinner-oval', {
    staticClass: "c-spinner",
    attrs: {
      "size": "2.5rem"
    }
  })], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.state.patching == 'error'),
      expression: "state.patching == 'error'"
    }],
    staticClass: "c-spinner__patching-error"
  }, [_vm._v("Error!")])])
},staticRenderFns: []}

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(444)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(446),
  /* template */
  __webpack_require__(447),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(445);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("55a795dc", content, true);

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-panel__navigation{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:.1em .3em;background-color:hsla(0,0%,100%,.95)}.c-panel__navigation a,.c-panel__navigation button{transition:all .35s;text-decoration:none;color:#4d4d4d!important;margin:0 .2em;padding:.3em;background:none;border:none;color:#4d4d4d}.c-panel__navigation a:hover,.c-panel__navigation button:hover{color:#5dc2af!important}.c-panel__navigation a:focus,.c-panel__navigation button:focus{outline:none}.c-panel__navigation .active,.c-panel__navigation .router-link-active{color:#5dc2af!important}.c-panel__navigation .filtered-out{text-decoration:line-through;color:#e65e4d}.c-panel-navigation__spinner{color:#5dc2af;margin-left:auto;margin-right:.1em}", ""]);

// exports


/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_globalFunctions_js__ = __webpack_require__(10);




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
		router: function (_router) {
			function router() {
				return _router.apply(this, arguments);
			}

			router.toString = function () {
				return _router.toString();
			};

			return router;
		}(function () {
			return router;
		}),
		DEV: function (_DEV) {
			function DEV() {
				return _DEV.apply(this, arguments);
			}

			DEV.toString = function () {
				return _DEV.toString();
			};

			return DEV;
		}(function () {
			return false;
		})
	},
	methods: {
		test: function test() {
			console.log(this.$route);
		},
		commit: function commit(action, payload) {
			this.$store.commit(action, payload);
		},
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		},
		openMenu: function openMenu(menu, event) {
			if (this.$route.path != '/') {
				router.push('/');
			}
			if (menu == 'All') {
				this.dispatch('filterItems', { keyword: 'all', event: event });
			} else if (menu == 'Today') {
				this.dispatch('filterItems', { keyword: 'duedate', value: new Date(), event: event });
			} else if (menu == 'Journal') {
				this.dispatch('filterItems', { keyword: 'journal', value: new Date(), event: event });
			}
		}
	}
});

/***/ }),

/***/ 447:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "c-panel__navigation"
  }, [_c('a', {
    directives: [{
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    class: {
      'active':
      _vm.get['selection/noFiltersSelected'] &&
        _vm.selection.view == 'tree' &&
        _vm.$route.path == '/'
    },
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.openMenu('All', $event)
      }
    }
  }, [_vm._v(_vm._s(_vm.get.text.menu.all))]), _vm._v(" "), _c('a', {
    directives: [{
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    class: {
      'active':
      _vm.get['selection/dueItemsFiltered'] &&
        _vm.$route.path == '/'
    },
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.openMenu('Today', $event)
      }
    }
  }, [_vm._v(_vm._s(_vm.get.text.menu.today))]), _vm._v(" "), _c('a', {
    directives: [{
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    class: {
      'active':
      _vm.selection.view == 'journal' &&
        _vm.$route.path == '/',
        'filtered-out': _vm.selection.hiddenBookmarks.includes('journal')
    },
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.openMenu('Journal', $event)
      }
    }
  }, [_vm._v(_vm._s(_vm.get.text.menu.journal))]), _vm._v(" "), (!_vm.get.mobile) ? _c('a', {
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.commit('updatePopouts', {
          guide: true
        })
      }
    }
  }, [_vm._v("?")]) : _vm._e(), _vm._v(" "), (_vm.get.language != 'ja') ? _c('button', {
    directives: [{
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    on: {
      "click": function($event) {
        _vm.commit('updateState', {
          setLanguage: 'ja'
        })
      }
    }
  }, [_vm._v("日本語")]) : _vm._e(), _vm._v(" "), (_vm.get.language != 'en') ? _c('button', {
    directives: [{
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    on: {
      "click": function($event) {
        _vm.commit('updateState', {
          setLanguage: 'en'
        })
      }
    }
  }, [_vm._v("English")]) : _vm._e(), _vm._v(" "), (!_vm.get['user/loggedIn']) ? _c('router-link', {
    directives: [{
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    class: {
      'active':
      _vm.$route.path.includes('login')
    },
    attrs: {
      "to": 'login'
    }
  }, [_vm._v(_vm._s(_vm.get.text.user.login))]) : _vm._e(), _vm._v(" "), (!_vm.get['user/loggedIn']) ? _c('router-link', {
    directives: [{
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    class: {
      'active':
      _vm.$route.path.includes('register')
    },
    attrs: {
      "to": 'register'
    }
  }, [_vm._v(_vm._s(_vm.get.text.user.register))]) : _vm._e(), _vm._v(" "), (_vm.get['user/loggedIn']) ? _c('a', {
    directives: [{
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.dispatch('logout')
      }
    }
  }, [_vm._v(_vm._s(_vm.get.text.user.logout))]) : _vm._e(), _vm._v(" "), (_vm.state.debug && _vm.DEV) ? _c('a', {
    directives: [{
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    attrs: {
      "href": "#",
      "id": "js-copy__1068"
    },
    on: {
      "click": _vm.test
    }
  }, [_vm._v("TEST")]) : _vm._e(), _vm._v(" "), (_vm.DEV) ? _c('a', {
    directives: [{
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    style: ((_vm.state.debug) ? 'color:red !important; border: thin solid; padding: 0 0.2em; margin: auto;' : ''),
    attrs: {
      "href": "#",
      "id": "js-copy__1063"
    },
    on: {
      "click": function($event) {
        _vm.state.debug = !_vm.state.debug
      }
    }
  }, [_vm._v("Debug")]) : _vm._e(), _vm._v(" "), (_vm.state.computing) ? _c('q-spinner-oval', {
    directives: [{
      name: "noClickFocus",
      rawName: "v-noClickFocus"
    }],
    staticClass: "c-panel-navigation__spinner",
    attrs: {
      "size": "1.5em"
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(449)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(451),
  /* template */
  __webpack_require__(452),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(450);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("62ee903c", content, true);

/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".playstation-controller{color:#5dc2af;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.playstation-controller button{margin:2px 0;background-color:#fff;font-size:3em;height:.8em;border-radius:1em!important}.playstation-controller button i{position:relative;top:-.1em}.playstation-controller>div{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;width:2.5em}", ""]);

// exports


/***/ }),

/***/ 451:
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
		selection: function selection() {
			return this.state.selection;
		},
		isFirstItem: function isFirstItem() {
			return itemGetters[this.selection.selectedId].isFirstItem;
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

/***/ 452:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "playstation-controller"
  }, [_c('button', {
    class: {
      'o-btn': true,
      'u-disabled': (_vm.get.filteredIdsTree.includes(_vm.selection.selectedId))
    },
    attrs: {
      "id": "",
      "disabled": _vm.get.filteredIdsTree.includes(_vm.selection.selectedId)
    },
    on: {
      "click": function($event) {
        _vm.dispatch('unindent')
      }
    }
  }, [_c('q-icon', {
    attrs: {
      "name": "ion-android-arrow-dropleft-circle"
    }
  })], 1), _vm._v(" "), _c('div', [_c('button', {
    class: {
      'o-btn': true,
      'u-disabled': (_vm.get.firstItem == _vm.selection.selectedId)
    },
    attrs: {
      "id": "",
      "disabled": _vm.get.firstItem == _vm.selection.selectedId
    },
    on: {
      "click": function($event) {
        _vm.dispatch('moveItem', {
          direction: 'up'
        })
      }
    }
  }, [_c('q-icon', {
    attrs: {
      "name": "ion-android-arrow-dropup-circle"
    }
  })], 1), _vm._v(" "), _c('button', {
    class: {
      'o-btn': true,
      'u-disabled': (_vm.get.lastItems.includes(_vm.selection.selectedId))
    },
    attrs: {
      "id": "",
      "disabled": _vm.get.lastItems.includes(_vm.selection.selectedId)
    },
    on: {
      "click": function($event) {
        _vm.dispatch('moveItem', {
          direction: 'down'
        })
      }
    }
  }, [_c('q-icon', {
    attrs: {
      "name": "ion-android-arrow-dropdown-circle"
    }
  })], 1)]), _vm._v(" "), _c('button', {
    class: {
      'o-btn': true,
      'u-disabled': (_vm.isFirstItem)
    },
    attrs: {
      "id": "",
      "disabled": _vm.isFirstItem
    },
    on: {
      "click": function($event) {
        _vm.dispatch('indent')
      }
    }
  }, [_c('q-icon', {
    attrs: {
      "name": "ion-android-arrow-dropright-circle"
    }
  })], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(454)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(456),
  /* template */
  __webpack_require__(457),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(455);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("04932e8f", content, true);

/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".c-floating-add-btn{color:#5dc2af;background-color:#fff;font-size:3em;height:.8em;border-radius:1em!important}.c-floating-add-btn i{position:relative;top:-.1em}", ""]);

// exports


/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {};
	},

	methods: {
		dispatch: function dispatch(action, payload) {
			this.$store.dispatch(action, payload);
		}
	}
});

/***/ }),

/***/ 457:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "o-btn c-floating-add-btn",
    on: {
      "click": function($event) {
        _vm.dispatch('showAddNewItem')
      }
    }
  }, [_c('q-icon', {
    attrs: {
      "name": "ion-plus-circled"
    }
  })], 1)
},staticRenderFns: []}

/***/ }),

/***/ 458:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('q-layout', {
    ref: "layout",
    staticClass: "gradient1",
    attrs: {
      "view": "HHH LpR FFF"
    }
  }, [_c('div', {
    class: {
      'mobile': _vm.get.mobile
    },
    slot: "header"
  }, [_c('Loading-Spinner'), _vm._v(" "), _c('Flashes'), _vm._v(" "), _c('Popups'), _vm._v(" "), _c('Popouts'), _vm._v(" "), (!_vm.get.mobile) ? _c('Panel-Nav') : _vm._e()], 1), _vm._v(" "), _c('router-view'), _vm._v(" "), (_vm.get.mobile) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.get.editingOrAddingId),
      expression: "!get.editingOrAddingId"
    }],
    slot: "footer"
  }, [_c('Panel-Nav')], 1) : _vm._e(), _vm._v(" "), (_vm.$route.path == '/' && _vm.get.mobile) ? _c('q-fixed-position', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.get.editingOrAddingId),
      expression: "!get.editingOrAddingId"
    }],
    attrs: {
      "corner": "bottom-right",
      "offset": [18, 18]
    }
  }, [_c('Mobile-Nav-Add')], 1) : _vm._e(), _vm._v(" "), (_vm.$route.path == '/' && _vm.get.mobile && _vm.state.selection.view != 'journal' &&
    _vm.get.itemCount && _vm.state.selection.selectedId) ? _c('q-fixed-position', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.get.editingOrAddingId),
      expression: "!get.editingOrAddingId"
    }],
    attrs: {
      "corner": "bottom-left",
      "offset": [18, 15]
    }
  }, [_c('Mobile-Nav-Move')], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ })

});