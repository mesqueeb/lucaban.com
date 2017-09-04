webpackJsonp([5],{

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(408)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(410),
  /* template */
  __webpack_require__(411),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(409);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(372)("0edaaa1e", content, true);

/***/ }),

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(371)(undefined);
// imports


// module
exports.push([module.i, ".logo-container{width:255px;height:242px;-webkit-perspective:800px;perspective:800px;position:absolute;top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.logo{position:absolute;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}", ""]);

// exports


/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quasar__ = __webpack_require__(31);




var viewport = __WEBPACK_IMPORTED_MODULE_0_quasar__["t" /* dom */].viewport,
    position = __WEBPACK_IMPORTED_MODULE_0_quasar__["u" /* event */].position,
    moveForce = 30,
    rotateForce = 40,
    RAD_TO_DEG = 180 / Math.PI;


function getRotationFromAccel(accelX, accelY, accelZ) {
  var sign = accelZ > 0 ? 1 : -1;
  var miu = 0.001;

  return {
    roll: Math.atan2(accelY, sign * Math.sqrt(Math.pow(accelZ, 2) + miu * Math.pow(accelX, 2))) * RAD_TO_DEG,
    pitch: -Math.atan2(accelX, Math.sqrt(Math.pow(accelY, 2) + Math.pow(accelZ, 2))) * RAD_TO_DEG
  };
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'index',
  components: {
    QLayout: __WEBPACK_IMPORTED_MODULE_0_quasar__["h" /* QLayout */],
    QToolbar: __WEBPACK_IMPORTED_MODULE_0_quasar__["o" /* QToolbar */],
    QToolbarTitle: __WEBPACK_IMPORTED_MODULE_0_quasar__["p" /* QToolbarTitle */],
    QBtn: __WEBPACK_IMPORTED_MODULE_0_quasar__["b" /* QBtn */],
    QIcon: __WEBPACK_IMPORTED_MODULE_0_quasar__["d" /* QIcon */],
    QList: __WEBPACK_IMPORTED_MODULE_0_quasar__["i" /* QList */],
    QListHeader: __WEBPACK_IMPORTED_MODULE_0_quasar__["j" /* QListHeader */],
    QItem: __WEBPACK_IMPORTED_MODULE_0_quasar__["e" /* QItem */],
    QItemSide: __WEBPACK_IMPORTED_MODULE_0_quasar__["g" /* QItemSide */],
    QItemMain: __WEBPACK_IMPORTED_MODULE_0_quasar__["f" /* QItemMain */]
  },
  data: function data() {
    return {
      orienting: window.DeviceOrientationEvent && !this.$q.platform.is.desktop,
      rotating: window.DeviceMotionEvent && !this.$q.platform.is.desktop,
      moveX: 0,
      moveY: 0,
      rotateY: 0,
      rotateX: 0
    };
  },

  computed: {
    position: function position() {
      var transform = 'rotateX(' + this.rotateX + 'deg) rotateY(' + this.rotateY + 'deg)';
      return {
        top: this.moveY + 'px',
        left: this.moveX + 'px',
        '-webkit-transform': transform,
        '-ms-transform': transform,
        transform: transform
      };
    }
  },
  methods: {
    launch: function launch(url) {
      Object(__WEBPACK_IMPORTED_MODULE_0_quasar__["v" /* openURL */])(url);
    },
    move: function move(evt) {
      var _viewport = viewport(),
          width = _viewport.width,
          height = _viewport.height,
          _position = position(evt),
          top = _position.top,
          left = _position.left,
          halfH = height / 2,
          halfW = width / 2;

      this.moveX = (left - halfW) / halfW * -moveForce;
      this.moveY = (top - halfH) / halfH * -moveForce;
      this.rotateY = left / width * rotateForce * 2 - rotateForce;
      this.rotateX = -(top / height * rotateForce * 2 - rotateForce);
    },
    rotate: function rotate(evt) {
      if (evt.rotationRate && evt.rotationRate.beta !== null && evt.rotationRate.gamma !== null) {
        this.rotateX = evt.rotationRate.beta * 0.7;
        this.rotateY = evt.rotationRate.gamma * -0.7;
      } else {
        var accelX = evt.acceleration.x || evt.accelerationIncludingGravity.x,
            accelY = evt.acceleration.y || evt.accelerationIncludingGravity.y,
            accelZ = evt.acceleration.z || evt.accelerationIncludingGravity.z - 9.81,
            rotation = getRotationFromAccel(accelX, accelY, accelZ);

        this.rotateX = rotation.roll * 0.7;
        this.rotateY = rotation.pitch * -0.7;
      }
    },
    orient: function orient(evt) {
      if (evt.beta === null || evt.gamma === null) {
        window.removeEventListener('deviceorientation', this.orient, false);
        this.orienting = false;

        window.addEventListener('devicemotion', this.rotate, false);
      } else {
        this.rotateX = evt.beta * 0.7;
        this.rotateY = evt.gamma * -0.7;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.orienting) {
        window.addEventListener('deviceorientation', _this.orient, false);
      } else if (_this.rotating) {
        window.addEventListener('devicemove', _this.rotate, false);
      } else {
        document.addEventListener('mousemove', _this.move);
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.orienting) {
      window.removeEventListener('deviceorientation', this.orient, false);
    } else if (this.rotating) {
      window.removeEventListener('devicemove', this.rotate, false);
    } else {
      document.removeEventListener('mousemove', this.move);
    }
  }
});

/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('q-layout', {
    ref: "layout",
    attrs: {
      "view": "lHh Lpr fff",
      "left-class": {
        'bg-grey-2': true
      }
    }
  }, [_c('q-toolbar', {
    staticClass: "glossy",
    slot: "header"
  }, [_c('q-btn', {
    attrs: {
      "flat": ""
    },
    on: {
      "click": function($event) {
        _vm.$refs.layout.toggleLeft()
      }
    }
  }, [_c('q-icon', {
    attrs: {
      "name": "menu"
    }
  })], 1), _vm._v(" "), _c('q-toolbar-title', [_vm._v("\n      Quasar App\n      "), _c('div', {
    slot: "subtitle"
  }, [_vm._v("Running on Quasar v" + _vm._s(_vm.$q.version))])])], 1), _vm._v(" "), _c('div', {
    slot: "left"
  }, [_c('q-list', {
    attrs: {
      "no-border": "",
      "link": "",
      "inset-delimiter": ""
    }
  }, [_c('q-list-header', [_vm._v("Essential Links")]), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.launch('http://quasar-framework.org')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "school"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Docs",
      "sublabel": "quasar-framework.org"
    }
  })], 1), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.launch('http://forum.quasar-framework.org')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "record_voice_over"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Forum",
      "sublabel": "forum.quasar-framework.org"
    }
  })], 1), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.launch('https://gitter.im/quasarframework/Lobby')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "chat"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Gitter Channel",
      "sublabel": "Quasar Lobby"
    }
  })], 1), _vm._v(" "), _c('q-item', {
    on: {
      "click": function($event) {
        _vm.launch('https://twitter.com/quasarframework')
      }
    }
  }, [_c('q-item-side', {
    attrs: {
      "icon": "rss feed"
    }
  }), _vm._v(" "), _c('q-item-main', {
    attrs: {
      "label": "Twitter",
      "sublabel": "@quasarframework"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "layout-padding logo-container non-selectable no-pointer-events"
  }, [_c('div', {
    staticClass: "logo",
    style: (_vm.position)
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(412)
    }
  })])])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/quasar-logo-full.c3e8865.svg";

/***/ })

});