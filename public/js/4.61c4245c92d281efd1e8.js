webpackJsonp([4],{

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(530)
}
var Component = __webpack_require__(118)(
  /* script */
  __webpack_require__(532),
  /* template */
  __webpack_require__(533),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(531);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(374)("11ebb5f1", content, true);

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(373)(undefined);
// imports


// module
exports.push([module.i, ".logo-container{width:192px;height:268px;-webkit-perspective:800px;perspective:800px;position:absolute;top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.logo{position:absolute;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}", ""]);

// exports


/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quasar__ = __webpack_require__(20);


var moveForce = 30;
var rotateForce = 40;
var RAD_TO_DEG = 180 / Math.PI;



function getRotationFromAccel(accelX, accelY, accelZ) {
  var sign = accelZ > 0 ? 1 : -1;
  var miu = 0.001;

  return {
    roll: Math.atan2(accelY, sign * Math.sqrt(Math.pow(accelZ, 2) + miu * Math.pow(accelX, 2))) * RAD_TO_DEG,
    pitch: -Math.atan2(accelX, Math.sqrt(Math.pow(accelY, 2) + Math.pow(accelZ, 2))) * RAD_TO_DEG
  };
}

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      orienting: window.DeviceOrientationEvent && !__WEBPACK_IMPORTED_MODULE_0_quasar__["a" /* Platform */].is.desktop,
      rotating: window.DeviceMotionEvent && !__WEBPACK_IMPORTED_MODULE_0_quasar__["a" /* Platform */].is.desktop,
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
    move: function move(evt) {
      var _Utils$dom$viewport = __WEBPACK_IMPORTED_MODULE_0_quasar__["Utils"].dom.viewport(),
          width = _Utils$dom$viewport.width,
          height = _Utils$dom$viewport.height;

      var _Utils$event$position = __WEBPACK_IMPORTED_MODULE_0_quasar__["Utils"].event.position(evt),
          top = _Utils$event$position.top,
          left = _Utils$event$position.left;

      var halfH = height / 2;
      var halfW = width / 2;

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
        var accelX = evt.acceleration.x || evt.accelerationIncludingGravity.x;
        var accelY = evt.acceleration.y || evt.accelerationIncludingGravity.y;
        var accelZ = evt.acceleration.z || evt.accelerationIncludingGravity.z - 9.81;

        var rotation = getRotationFromAccel(accelX, accelY, accelZ);
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

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('q-layout', [_c('div', {
    staticClass: "toolbar",
    slot: "header"
  }, [_c('q-toolbar-title', {
    attrs: {
      "padding": 0
    }
  }, [_vm._v("\n      Quasar Framework v" + _vm._s(_vm.$q.version) + "\n    ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "layout-view"
  }, [_c('div', {
    staticClass: "logo-container non-selectable no-pointer-events"
  }, [_c('div', {
    staticClass: "logo",
    style: (_vm.position)
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(534)
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "caption text-center"
  }, [(_vm.orienting || _vm.rotating) ? _c('span', [_vm._v("Tilt your device.")]) : [_c('span', {
    staticClass: "desktop-only"
  }, [_vm._v("Move your mouse.")]), _vm._v(" "), _c('span', {
    staticClass: "touch-only"
  }, [_vm._v("Touch screen and move.")])]], 2)])])])])
},staticRenderFns: []}

/***/ }),

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/listo-logo-s.69eff1c.png";

/***/ })

});