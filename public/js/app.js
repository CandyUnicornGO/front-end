(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("actions/account.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE = exports.LOGOUT = exports.LOGIN = undefined;
exports.login = login;
exports.logout = logout;
exports.update = update;
exports.signUp = signUp;

var _db = require('../utils/db');

var _db2 = _interopRequireDefault(_db);

var _smartUnicorn = require('../utils/smart-unicorn');

var _smartUnicorn2 = _interopRequireDefault(_smartUnicorn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGIN = exports.LOGIN = 'LOGIN';
var LOGOUT = exports.LOGOUT = 'LOGOUT';
var UPDATE = exports.UPDATE = 'UPDATE';

function login(account) {
  return { type: LOGIN, account: account };
}

function logout() {
  return { type: LOGOUT };
}

function update(account) {
  return { type: UPDATE, account: account };
}

function signUp(name, email, wallet) {
  return function (dispatch) {
    _db2.default.saveAccount({
      id: wallet, name: name, email: email
    }).then(function (result) {
      dispatch(login({
        id: wallet, name: name, email: email
      }));
    });
  };
}
});

;require.register("actions/login-popup.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showLoginPopup = showLoginPopup;
exports.hideLoginPopup = hideLoginPopup;
var SHOW_LOGIN_POPUP = exports.SHOW_LOGIN_POPUP = 'SHOW_LOGIN_POPUP';
var HIDE_LOGIN_POPUP = exports.HIDE_LOGIN_POPUP = 'HIDE_LOGIN_POPUP';

function showLoginPopup() {
  return { type: SHOW_LOGIN_POPUP };
}

function hideLoginPopup() {
  return { type: HIDE_LOGIN_POPUP };
}
});

;require.register("actions/metamask.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleMetamask = toggleMetamask;
exports.setMetamaskAccount = setMetamaskAccount;
exports.setMetamaskNetwork = setMetamaskNetwork;
var TOGGLE_METAMASK = exports.TOGGLE_METAMASK = 'TOGGLE_METAMASK';
var SET_METAMASK_ACCOUNT = exports.SET_METAMASK_ACCOUNT = 'SET_METAMASK_ACCOUNT';
var SET_METAMASK_NETWORK = exports.SET_METAMASK_NETWORK = 'SET_METAMASK_NETWORK';

function toggleMetamask() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return { type: TOGGLE_METAMASK, state: state };
}

function setMetamaskAccount(account) {
  return { type: SET_METAMASK_ACCOUNT, account: account };
}

function setMetamaskNetwork(network) {
  return { type: SET_METAMASK_NETWORK, network: network };
}
});

;require.register("components/app/Dates.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dates = function (_Component) {
    _inherits(Dates, _Component);

    function Dates() {
        _classCallCheck(this, Dates);

        return _possibleConstructorReturn(this, (Dates.__proto__ || Object.getPrototypeOf(Dates)).apply(this, arguments));
    }

    _createClass(Dates, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "footer_slider" },
                _react2.default.createElement(
                    "div",
                    { className: "swiper-container", "data-autoplay": "0", "data-loop": "1", "data-speed": "500", "data-center": "0", "data-slides-per-view": "responsive", "data-xs-slides": "4", "data-sm-slides": "8", "data-md-slides": "14", "data-lg-slides": "19", "data-add-slides": "19" },
                    _react2.default.createElement(
                        "div",
                        { className: "swiper-wrapper" },
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide active", "data-val": "0" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                "    ",
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f1.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "1" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f2.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "2" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f3.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "3" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f1.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "4" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f2.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "5" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f3.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "6" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f2.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "7" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f1.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "8" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f2.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "9" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f1.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "10" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f2.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "11" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f3.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "12" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f2.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "13" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f1.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "14" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f3.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "15" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f2.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "16" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f1.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "17" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f2.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "18" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f3.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "19" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f1.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "20" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f2.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "21" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f3.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "22" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f2.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-slide", "data-val": "23" },
                            _react2.default.createElement(
                                "a",
                                { href: "#" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/f3.jpg", alt: "" })
                            )
                        )
                    ),
                    _react2.default.createElement("div", { className: "pagination hidden" })
                )
            );
        }
    }]);

    return Dates;
}(_react.Component);

exports.default = Dates;
});

require.register("components/app/Footer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _Dates = require('./Dates');

var _Dates2 = _interopRequireDefault(_Dates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_Component) {
  _inherits(Footer, _Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'footer',
        null,
        _react2.default.createElement(_Dates2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'footer-main' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid custom-container' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-3 col-xl-4' },
                _react2.default.createElement(
                  'div',
                  { className: 'footer-block' },
                  _react2.default.createElement(
                    'h1',
                    { className: 'footer-title' },
                    'About Us'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Vestibulum tincidunt, augue fermentum accumsan viverra, eros dui rutrum libero, nec imperdiet felis sem in augue luctus ',
                    _react2.default.createElement(
                      'a',
                      { href: '#' },
                      'diam a porta'
                    ),
                    ' iaculis. Vivamus sit amet fermentum nisl. Duis id ',
                    _react2.default.createElement(
                      'a',
                      { href: '#' },
                      'massa id purus'
                    ),
                    ' tristique varius a sit amet est. Fusce dolor libero, efficitur et lobortis at, faucibus nec nunc.'
                  ),
                  _react2.default.createElement(
                    'ul',
                    { className: 'soc_buttons' },
                    _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '' },
                        _react2.default.createElement('i', { className: 'fa fa-github' })
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '' },
                        _react2.default.createElement('i', { className: 'fa fa-facebook' })
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '' },
                        _react2.default.createElement('i', { className: 'fa fa-twitter' })
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '' },
                        _react2.default.createElement('i', { className: 'fa fa-google-plus' })
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '' },
                        _react2.default.createElement('i', { className: 'fa fa-pinterest-p' })
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '' },
                        _react2.default.createElement('i', { className: 'fa fa-instagram' })
                      )
                    ),
                    _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '' },
                        _react2.default.createElement('i', { className: 'fa fa-linkedin' })
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-3 col-xl-2' },
                _react2.default.createElement(
                  'div',
                  { className: 'footer-block' },
                  _react2.default.createElement(
                    'h1',
                    { className: 'footer-title' },
                    'Some Links'
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row footer-list-footer' },
                    _react2.default.createElement(
                      'div',
                      { className: 'col-md-6' },
                      _react2.default.createElement(
                        'ul',
                        { className: 'link-list' },
                        _react2.default.createElement(
                          'li',
                          null,
                          _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '/about' },
                            'About Us'
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          null,
                          _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '/contact' },
                            'Contacts'
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          null,
                          _react2.default.createElement(
                            'a',
                            { href: '#' },
                            'We hire'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-md-6' },
                      _react2.default.createElement(
                        'ul',
                        { className: 'link-list' },
                        _react2.default.createElement(
                          'li',
                          null,
                          _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: '/faq' },
                            'FAQ'
                          )
                        ),
                        _react2.default.createElement(
                          'li',
                          null,
                          _react2.default.createElement(
                            'a',
                            { href: '#' },
                            'Help & Support'
                          )
                        )
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-3 galerry' },
                _react2.default.createElement(
                  'div',
                  { className: 'footer-block' },
                  _react2.default.createElement(
                    'h1',
                    { className: 'footer-title' },
                    'Most active users'
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g1.jpg', alt: '' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g2.jpg', alt: '' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g3.jpg', alt: '' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g4.jpg', alt: '' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g5.jpg', alt: '' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g6.jpg', alt: '' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g7.jpg', alt: '' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g8.jpg', alt: '' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g9.jpg', alt: '' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g10.jpg', alt: '' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g11.jpg', alt: '' })
                  ),
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    _react2.default.createElement('img', { src: 'img/g12.jpg', alt: '' })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-3' },
                _react2.default.createElement(
                  'div',
                  { className: 'footer-block' },
                  _react2.default.createElement(
                    'h1',
                    { className: 'footer-title' },
                    'Subscribe On Our News'
                  ),
                  _react2.default.createElement(
                    'form',
                    { action: './', className: 'subscribe-form' },
                    _react2.default.createElement('input', { type: 'text', placeholder: 'Your E-mail', required: true }),
                    _react2.default.createElement(
                      'div',
                      { className: 'submit-block' },
                      _react2.default.createElement('i', { className: 'fa fa-envelope-o' }),
                      _react2.default.createElement('input', { type: 'submit', value: '' })
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'soc-activity' },
                    _react2.default.createElement(
                      'div',
                      { className: 'soc_ico_triangle' },
                      _react2.default.createElement('i', { className: 'fa fa-twitter' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'message-soc' },
                      _react2.default.createElement(
                        'div',
                        { className: 'date' },
                        '16h ago'
                      ),
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'account' },
                        '@faq'
                      ),
                      ' vestibulum accumsan est ',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'heshtag' },
                        'hello world'
                      ),
                      ' sem auctor, eu aliquet nisi ornare leo sit amet varius egestas.'
                    )
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'footer-bottom' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid custom-container' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-12 footer-end clearfix' },
              _react2.default.createElement(
                'div',
                { className: 'left' },
                _react2.default.createElement(
                  'span',
                  { className: 'copy' },
                  '\xA9 2018. All rights reserved. ',
                  _react2.default.createElement(
                    'span',
                    { className: 'white' },
                    _react2.default.createElement(
                      'a',
                      { href: '#' },
                      ' UnicornGO'
                    )
                  )
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'created' },
                  'Created with LOVE by ',
                  _react2.default.createElement(
                    'span',
                    { className: 'white' },
                    _react2.default.createElement(
                      'a',
                      { href: '#' },
                      ' DreamTEAM'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'right' },
                _react2.default.createElement(
                  'a',
                  { className: 'btn color-7 size-2 hover-9' },
                  'About Us'
                ),
                _react2.default.createElement(
                  'a',
                  { className: 'btn color-7 size-2 hover-9' },
                  'Help'
                ),
                _react2.default.createElement(
                  'a',
                  { className: 'btn color-7 size-2 hover-9' },
                  'Privacy Policy'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Footer;
}(_react.Component);

exports.default = Footer;
});

require.register("components/app/Header.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Logo = require('./Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Preview = require('../user/Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _loginPopup = require('../../actions/login-popup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    account: state.account
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleLogin: function handleLogin(event) {
      event.preventDefault();
      dispatch((0, _loginPopup.showLoginPopup)());
    }
  };
};

var Header = exports.Header = function Header(_ref) {
  var account = _ref.account,
      handleLogin = _ref.handleLogin;

  var isLoggedIn = account !== undefined;
  return _react2.default.createElement(
    'header',
    null,
    _react2.default.createElement(
      'div',
      { className: 'container-fluid custom-container' },
      _react2.default.createElement(
        'div',
        { className: 'row no_row row-header' },
        _react2.default.createElement(_Logo2.default, null),
        _react2.default.createElement(_Menu2.default, { isFull: isLoggedIn }),
        _react2.default.createElement(_Preview2.default, { account: account, onLogin: handleLogin })
      )
    )
  );
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Header);
});

;require.register("components/app/Logo.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Logo = function (_Component) {
  _inherits(Logo, _Component);

  function Logo() {
    _classCallCheck(this, Logo);

    return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
  }

  _createClass(Logo, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "brand-be" },
        _react2.default.createElement(
          "a",
          { href: "#" },
          _react2.default.createElement("img", { className: "logo-c active be_logo", src: "img/logo.png", alt: "logo" })
        )
      );
    }
  }]);

  return Logo;
}(_react.Component);

exports.default = Logo;
});

require.register("components/app/Menu.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'header-menu-block' },
        _react2.default.createElement(
          'button',
          { className: 'cmn-toggle-switch cmn-toggle-switch__htx' },
          _react2.default.createElement('span', null)
        ),
        _react2.default.createElement(
          'ul',
          { className: 'header-menu', id: 'one' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/' },
              'Marketplace'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/stock' },
              'Stock'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/user' },
              'My Unicorns'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/actions' },
              _react2.default.createElement('i', { className: 'fa fa-flash' }),
              ' actions'
            )
          ),
          _react2.default.createElement(
            'li',
            { id: 'ad-work-li' },
            _react2.default.createElement(
              'a',
              { id: 'add-work-btn', className: 'btn color-1', href: '#' },
              _react2.default.createElement('i', { className: 'fa fa-life-ring' }),
              ' I NEED HELP '
            )
          )
        )
      );
    }
  }]);

  return Menu;
}(_react.Component);

exports.default = Menu;
});

require.register("components/app/app.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Full = require('../unicorn/Full');

var _Full2 = _interopRequireDefault(_Full);

var _Invite = require('../popups/Invite');

var _Invite2 = _interopRequireDefault(_Invite);

var _Register = require('../popups/Register');

var _Register2 = _interopRequireDefault(_Register);

var _Marketplace = require('../../pages/Marketplace');

var _Marketplace2 = _interopRequireDefault(_Marketplace);

var _Stock = require('../../pages/Stock');

var _Stock2 = _interopRequireDefault(_Stock);

var _Laboratory = require('../../pages/Laboratory');

var _Laboratory2 = _interopRequireDefault(_Laboratory);

var _User = require('../../pages/User');

var _User2 = _interopRequireDefault(_User);

var _Actions = require('../../pages/Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _Faq = require('../../pages/Faq');

var _Faq2 = _interopRequireDefault(_Faq);

var _About = require('../../pages/About');

var _About2 = _interopRequireDefault(_About);

var _Contact = require('../../pages/Contact');

var _Contact2 = _interopRequireDefault(_Contact);

var _Privacy_policy = require('../../pages/Privacy_policy');

var _Privacy_policy2 = _interopRequireDefault(_Privacy_policy);

var _smartUnicorn = require('../../utils/smart-unicorn');

var _smartUnicorn2 = _interopRequireDefault(_smartUnicorn);

var _db = require('../../utils/db');

var _db2 = _interopRequireDefault(_db);

var _account = require('../../actions/account');

var _metamask = require('../../actions/metamask');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.handleMetamask = _this.handleMetamask.bind(_this);
    _this.handleAccount = _this.handleAccount.bind(_this);
    _this.handleNetwork = _this.handleNetwork.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _smartUnicorn2.default.on('metamask', this.handleMetamask);
      _smartUnicorn2.default.on('account', this.handleAccount);
      _smartUnicorn2.default.on('network', this.handleNetwork);
      var info = _smartUnicorn2.default.info();
      if (info.metamask === true) {
        this.handleMetamask();
      }
      if (info.wallet) {
        this.handleAccount(info.wallet);
      }
    }
  }, {
    key: 'handleMetamask',
    value: function handleMetamask() {
      this.props.dispatch((0, _metamask.toggleMetamask)(true));
    }
  }, {
    key: 'handleAccount',
    value: function handleAccount(wallet) {
      var _this2 = this;

      this.props.dispatch((0, _metamask.setMetamaskAccount)(wallet));
      _db2.default.findAccount(wallet || '').then(function (result) {
        if (result.length > 0) {
          var account = result[0];
          _this2.props.dispatch((0, _account.login)(account));
        } else {
          _this2.props.dispatch((0, _account.logout)());
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'handleNetwork',
    value: function handleNetwork(network) {
      this.props.dispatch((0, _metamask.setMetamaskNetwork)(network));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'main',
        null,
        _react2.default.createElement(_Header2.default, null),
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Marketplace2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/stock', component: _Stock2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/laboratory', component: _Laboratory2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/unicorn', component: _Full2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/owner', component: _User2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/actions', component: _Actions2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/faq', component: _Faq2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/about', component: _About2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/contact', component: _Contact2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/privacy_policy', component: _Privacy_policy2.default }),
        _react2.default.createElement(_Footer2.default, null),
        _react2.default.createElement(_Invite2.default, null),
        _react2.default.createElement(_Register2.default, null)
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()(App);
});

;require.register("components/popups/Invite.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopupInvite = function (_Component) {
  _inherits(PopupInvite, _Component);

  function PopupInvite() {
    _classCallCheck(this, PopupInvite);

    return _possibleConstructorReturn(this, (PopupInvite.__proto__ || Object.getPrototypeOf(PopupInvite)).apply(this, arguments));
  }

  _createClass(PopupInvite, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "large-popup login" },
        _react2.default.createElement("div", { className: "large-popup-fixed" }),
        _react2.default.createElement(
          "div",
          { className: "container large-popup-container" },
          _react2.default.createElement(
            "div",
            { className: "row" },
            _react2.default.createElement(
              "div",
              { className: "col-md-8 col-md-push-2 col-lg-6 col-lg-push-3  large-popup-content" },
              _react2.default.createElement(
                "div",
                { className: "row" },
                _react2.default.createElement(
                  "div",
                  { className: "col-md-12" },
                  _react2.default.createElement("i", { className: "fa fa-times close-button" }),
                  _react2.default.createElement(
                    "h5",
                    { className: "large-popup-title" },
                    "Exit"
                  )
                ),
                _react2.default.createElement(
                  "form",
                  { action: "./", className: "popup-input-search" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-md-12" },
                    _react2.default.createElement("input", { className: "input-signtype", type: "text", required: "", placeholder: "Email" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-md-12" },
                    _react2.default.createElement("input", { className: "input-signtype", type: "text", required: "", placeholder: "Email" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-md-12" },
                    _react2.default.createElement("input", { className: "input-signtype", type: "text", required: "", placeholder: "Email" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-md-12" },
                    _react2.default.createElement("input", { className: "input-signtype", type: "text", required: "", placeholder: "Email" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-xs-6" },
                    _react2.default.createElement(
                      "div",
                      { className: "be-checkbox" },
                      _react2.default.createElement(
                        "span",
                        { className: "large-popup-text" },
                        "Tollaty you have 100 points"
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-xs-6 for-signin" },
                    _react2.default.createElement("input", { type: "submit", className: "be-popup-sign-button", value: "send Invitation" })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PopupInvite;
}(_react.Component);

exports.default = PopupInvite;
});

require.register("components/popups/Register.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopupRegister = function (_Component) {
  _inherits(PopupRegister, _Component);

  function PopupRegister() {
    _classCallCheck(this, PopupRegister);

    return _possibleConstructorReturn(this, (PopupRegister.__proto__ || Object.getPrototypeOf(PopupRegister)).apply(this, arguments));
  }

  _createClass(PopupRegister, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "large-popup register" },
        _react2.default.createElement("div", { className: "large-popup-fixed" }),
        _react2.default.createElement(
          "div",
          { className: "container large-popup-container" },
          _react2.default.createElement(
            "div",
            { className: "row" },
            _react2.default.createElement(
              "div",
              { className: "col-md-10 col-md-push-1 col-lg-8 col-lg-push-2 large-popup-content" },
              _react2.default.createElement(
                "div",
                { className: "row" },
                _react2.default.createElement(
                  "div",
                  { className: "col-md-12" },
                  _react2.default.createElement("i", { className: "fa fa-times close-button" }),
                  _react2.default.createElement(
                    "h5",
                    { className: "large-popup-title" },
                    "Register"
                  )
                ),
                _react2.default.createElement(
                  "form",
                  { action: "./", className: "popup-input-search" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-md-12" },
                    _react2.default.createElement("input", { className: "input-signtype", type: "text", required: "", placeholder: "Wallet" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-md-6" },
                    _react2.default.createElement("input", { className: "input-signtype", type: "text", required: "", placeholder: "Nick Name" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-md-6" },
                    _react2.default.createElement("input", { className: "input-signtype", type: "text", required: "", placeholder: "Email" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-md-6" },
                    _react2.default.createElement(
                      "div",
                      { className: "be-checkbox" },
                      _react2.default.createElement(
                        "label",
                        { className: "check-box" },
                        _react2.default.createElement("input", { className: "checkbox-input", type: "checkbox", required: "", value: "" }),
                        " ",
                        _react2.default.createElement("span", { className: "check-box-sign" })
                      ),
                      _react2.default.createElement(
                        "span",
                        { className: "large-popup-text" },
                        "I have read and agree to the ",
                        _react2.default.createElement(
                          "a",
                          { className: "be-popup-terms", href: "blog-detail-2.html" },
                          "Terms of Use"
                        ),
                        " and ",
                        _react2.default.createElement(
                          "a",
                          { className: "be-popup-terms", href: "blog-detail-2.html" },
                          "Privacy Policy"
                        ),
                        "."
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-md-6 for-signin" },
                    _react2.default.createElement("input", { type: "submit", className: "be-popup-sign-button", value: "SIGN IN" })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PopupRegister;
}(_react.Component);

exports.default = PopupRegister;
});

require.register("components/ui/Button.js", function(exports, require, module) {
"use strict";
});

;require.register("components/ui/Dropdown.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_Component) {
	_inherits(Dropdown, _Component);

	function Dropdown() {
		_classCallCheck(this, Dropdown);

		return _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).apply(this, arguments));
	}

	_createClass(Dropdown, [{
		key: "render",
		value: function render() {

			return _react2.default.createElement(
				"div",
				{ className: "be-drop-down" },
				_react2.default.createElement("i", { className: "icon-creative" }),
				_react2.default.createElement(
					"span",
					{ className: "be-dropdown-content" },
					"All Gens"
				),
				_react2.default.createElement(
					"ul",
					{ className: "drop-down-list" },
					_react2.default.createElement(
						"li",
						{ className: "filter", "data-filter": ".category-4" },
						_react2.default.createElement(
							"a",
							null,
							"All Gens"
						)
					),
					_react2.default.createElement(
						"li",
						{ className: "filter", "data-filter": ".category-5" },
						_react2.default.createElement(
							"a",
							null,
							"Gen - 0"
						)
					),
					_react2.default.createElement(
						"li",
						{ className: "filter", "data-filter": ".category-1" },
						_react2.default.createElement(
							"a",
							null,
							"Gen - 1"
						)
					)
				)
			);
		}
	}]);

	return Dropdown;
}(_react.Component);

exports.default = Dropdown;
});

require.register("components/ui/Search.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_Component) {
  _inherits(Search, _Component);

  function Search() {
    _classCallCheck(this, Search);

    return _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));
  }

  _createClass(Search, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "form",
        { action: "./", className: "input-search" },
        _react2.default.createElement("input", { type: "text", required: "", placeholder: "Enter Unicorn Name" }),
        _react2.default.createElement("i", { className: "fa fa-search" }),
        _react2.default.createElement("input", { type: "submit", value: "" })
      );
    }
  }]);

  return Search;
}(_react.Component);

exports.default = Search;
});

require.register("components/ui/SelectColor.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectColor = function (_Component) {
  _inherits(SelectColor, _Component);

  function SelectColor() {
    _classCallCheck(this, SelectColor);

    return _possibleConstructorReturn(this, (SelectColor.__proto__ || Object.getPrototypeOf(SelectColor)).apply(this, arguments));
  }

  _createClass(SelectColor, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "filter-block" },
        _react2.default.createElement(
          "ul",
          null,
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              null,
              _react2.default.createElement("i", { className: "fa fa-paint-brush" }),
              "Color"
            ),
            _react2.default.createElement(
              "div",
              { className: "be-popup be-color-picker" },
              _react2.default.createElement(
                "h3",
                { className: "letf-menu-article" },
                "Choose color"
              ),
              _react2.default.createElement(
                "div",
                { className: "for-colors" },
                _react2.default.createElement(
                  "ul",
                  { className: "colors  cfix" },
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-0-0" }),
                  _react2.default.createElement("li", { "data-filter": ".category-2", className: "color filter color-0-1" }),
                  _react2.default.createElement("li", { "data-filter": ".category-3", className: "color filter color-0-2" }),
                  _react2.default.createElement("li", { "data-filter": ".category-4", className: "color filter color-0-3" }),
                  _react2.default.createElement("li", { "data-filter": ".category-5", className: "color filter color-0-4" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-0-5" }),
                  _react2.default.createElement("li", { "data-filter": ".category-2", className: "color filter color-0-6" }),
                  _react2.default.createElement("li", { "data-filter": ".category-3", className: "color filter color-0-7" }),
                  _react2.default.createElement("li", { "data-filter": ".category-4", className: "color filter color-0-8" }),
                  _react2.default.createElement("li", { "data-filter": ".category-5", className: "color filter color-0-9" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-0-10" }),
                  _react2.default.createElement("li", { "data-filter": ".category-5", className: "color filter color-0-11" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-1-0" }),
                  _react2.default.createElement("li", { "data-filter": ".category-2", className: "color filter color-1-1" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-1-2" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-1-3" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-1-4" }),
                  _react2.default.createElement("li", { "data-filter": ".category-4", className: "color filter color-1-5" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-1-6" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-1-7" }),
                  _react2.default.createElement("li", { "data-filter": ".category-6", className: "color filter color-1-8" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-1-9" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-1-10" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-1-11" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-0" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-1" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-2" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-3" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-4" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-5" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-6" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-7" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-8" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-9" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-10" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-2-11" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-0" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-1" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-2" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-3" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-4" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-5" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-6" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-7" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-8" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-9" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-10" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-3-11" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-0" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-1" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-2" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-3" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-4" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-5" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-6" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-7" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-8" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-9" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-10" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-4-11" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-0" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-1" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-2" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-3" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-4" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-5" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-6" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-7" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-8" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-9" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-10" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-5-11" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-6-0" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-6-1" }),
                  _react2.default.createElement("li", { "data-filter": ".category-6", className: "color filter color-6-2" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-6-3" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-6-4" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-6-5" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-6-6" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-6-7" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-6-8" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-6-9" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-6-10" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-6-11" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-0" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-1" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-2" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-3" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-4" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-5" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-6" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-7" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-8" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-9" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-10" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-7-11" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-8-0" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-8-1" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-8-2" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-8-3" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-8-4" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-8-5" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-8-6" }),
                  _react2.default.createElement("li", { "data-filter": ".category-6", className: "color filter color-8-7" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-8-8" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-8-9" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-8-10" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-8-11" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-9-0" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-9-1" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-9-2" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-9-3" }),
                  _react2.default.createElement("li", { "data-filter": ".category-6", className: "color filter color-9-4" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-9-5" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-9-6" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-9-7" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-9-8" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-9-9" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-9-10" }),
                  _react2.default.createElement("li", { "data-filter": ".category-1", className: "color filter color-9-11" })
                )
              ),
              _react2.default.createElement("i", { className: "fa fa-times" })
            )
          )
        )
      );
    }
  }]);

  return SelectColor;
}(_react.Component);

exports.default = SelectColor;
});

require.register("components/ui/SidebarMenu.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SidebarMenu = function (_Component) {
	_inherits(SidebarMenu, _Component);

	function SidebarMenu() {
		_classCallCheck(this, SidebarMenu);

		return _possibleConstructorReturn(this, (SidebarMenu.__proto__ || Object.getPrototypeOf(SidebarMenu)).apply(this, arguments));
	}

	_createClass(SidebarMenu, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "be-vidget" },
				_react2.default.createElement(
					"h3",
					{ className: "letf-menu-article" },
					"Coldown"
				),
				_react2.default.createElement(
					"div",
					{ className: "creative_filds_block" },
					_react2.default.createElement(
						"div",
						{ className: "ul" },
						_react2.default.createElement(
							"a",
							{ "data-filter": ".category-1", className: "filter" },
							"Fast  "
						),
						_react2.default.createElement(
							"a",
							{ "data-filter": ".category-2", className: "filter" },
							"Swift   "
						),
						_react2.default.createElement(
							"a",
							{ "data-filter": ".category-3", className: "filter" },
							"Snappy "
						),
						_react2.default.createElement(
							"a",
							{ "data-filter": ".category-4", className: "filter" },
							"Brisk  "
						),
						_react2.default.createElement(
							"a",
							{ "data-filter": ".category-5", className: "filter" },
							"Plodding  "
						)
					)
				)
			);
		}
	}]);

	return SidebarMenu;
}(_react.Component);

exports.default = SidebarMenu;
});

require.register("components/ui/Tags.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tags = function (_Component) {
  _inherits(Tags, _Component);

  function Tags() {
    _classCallCheck(this, Tags);

    return _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).apply(this, arguments));
  }

  _createClass(Tags, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "tags_block clearfix" },
        _react2.default.createElement(
          "ul",
          null,
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { href: "#", className: "be-post-tag" },
              "Nice"
            ),
            " "
          ),
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { href: "#", className: "be-post-tag" },
              "Gute"
            ),
            " "
          ),
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { href: "#", className: "be-post-tag" },
              "Usual"
            )
          ),
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { href: "#", className: "be-post-tag" },
              "Just"
            ),
            " "
          ),
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { href: "#", className: "be-post-tag" },
              "Angry"
            )
          )
        )
      );
    }
  }]);

  return Tags;
}(_react.Component);

exports.default = Tags;
});

require.register("components/ui/ToggleSlide.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleSlide = function (_Component) {
  _inherits(ToggleSlide, _Component);

  function ToggleSlide() {
    _classCallCheck(this, ToggleSlide);

    return _possibleConstructorReturn(this, (ToggleSlide.__proto__ || Object.getPrototypeOf(ToggleSlide)).apply(this, arguments));
  }

  _createClass(ToggleSlide, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "acc-panel" },
        _react2.default.createElement(
          "div",
          { className: "acc-title" },
          _react2.default.createElement("span", { className: "acc-icon" }),
          "Integer in augue at justo tempor vestibulum"
        ),
        _react2.default.createElement(
          "div",
          { className: "acc-body" },
          _react2.default.createElement(
            "p",
            null,
            "Fusce placerat quis lectus sit amet aliquam. In quis pulvinar ante, sed faucibus nibh. Etiam gravida tortor ut quam tincidunt consectetur. Cras pulvinar, sem vitae facilisis placerat, purus libero consequat erat, euismod sollicitudin mauris odio non sem. Donec a turpis vitae arcu imperdiet facilisis."
          ),
          _react2.default.createElement(
            "p",
            null,
            "Ut suscipit ex eu elit tempus, et rutrum mi iaculis. In at lacus diam. In sit amet justo rhoncus magna maximus semper. Praesent dapibus aliquet feugiat. Praesent bibendum massa sed quam eleifend, convallis hendrerit est porttitor. Vivamus quis cursus justo. Duis bibendum magna non lorem sodales, ac tempus orci elementum. Etiam vehicula congue sapien eget luctus. Mauris tincidunt ex enim, ut dictum erat congue vel. Ut non neque velit. Morbi vehicula diam at ultricies mattis."
          )
        )
      );
    }
  }]);

  return ToggleSlide;
}(_react.Component);

exports.default = ToggleSlide;
});

require.register("components/unicorn/Comments.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Comment = require('../user/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnicornComments = function (_Component) {
  _inherits(UnicornComments, _Component);

  function UnicornComments() {
    _classCallCheck(this, UnicornComments);

    return _possibleConstructorReturn(this, (UnicornComments.__proto__ || Object.getPrototypeOf(UnicornComments)).apply(this, arguments));
  }

  _createClass(UnicornComments, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'be-comment-block' },
        _react2.default.createElement(
          'h1',
          { className: 'comments-title' },
          'Comments (3)'
        ),
        _react2.default.createElement(
          'p',
          { className: 'about-comment-block' },
          'Price for comment is ',
          _react2.default.createElement(
            'a',
            { href: '#', className: 'be-signup-link' },
            '0.00000054312 ',
            _react2.default.createElement('i', { className: 'fa fa-btc' })
          )
        ),
        _react2.default.createElement(
          'form',
          { className: 'form-block' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs-12' },
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement('textarea', { className: 'form-input', required: '', placeholder: 'Your text' })
              )
            ),
            _react2.default.createElement(
              'a',
              { className: 'btn color-1 size-2 hover-1 pull-right' },
              'submit'
            )
          )
        ),
        _react2.default.createElement(_Comment2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'be-comment' },
          _react2.default.createElement(
            'div',
            { className: 'be-img-comment' },
            _react2.default.createElement(
              'a',
              { href: 'blog-detail-2.html' },
              _react2.default.createElement('img', { src: 'img/c2.png', alt: '', className: 'be-ava-comment' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'be-comment-content' },
            _react2.default.createElement(
              'span',
              { className: 'be-comment-name' },
              _react2.default.createElement(
                'a',
                { href: 'blog-detail-2.html' },
                'Phoenix, the Creative Studio'
              )
            ),
            _react2.default.createElement(
              'span',
              { className: 'be-comment-time' },
              _react2.default.createElement('i', { className: 'fa fa-clock-o' }),
              'May 27, 2015 at 3:14am'
            ),
            _react2.default.createElement(
              'p',
              { className: 'be-comment-text' },
              'Nunc ornare sed dolor sed mattis. In scelerisque dui a arcu mattis, at maximus eros commodo. Cras magna nunc, cursus lobortis luctus at, sollicitudin vel neque. Duis eleifend lorem non ant. Proin ut ornare lectus, vel eleifend est. Fusce hendrerit dui in turpis tristique blandit.'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'be-comment' },
          _react2.default.createElement(
            'div',
            { className: 'be-img-comment' },
            _react2.default.createElement(
              'a',
              { href: 'blog-detail-2.html' },
              _react2.default.createElement('img', { src: 'img/c3.png', alt: '', className: 'be-ava-comment' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'be-comment-content' },
            _react2.default.createElement(
              'span',
              { className: 'be-comment-name' },
              _react2.default.createElement(
                'a',
                { href: 'blog-detail-2.html' },
                'Dorian Camp'
              )
            ),
            _react2.default.createElement(
              'span',
              { className: 'be-comment-time' },
              _react2.default.createElement('i', { className: 'fa fa-clock-o' }),
              'May 27, 2015 at 3:14am'
            ),
            _react2.default.createElement(
              'p',
              { className: 'be-comment-text' },
              'Cras magna nunc, cursus lobortis luctus at, sollicitudin vel neque. Duis eleifend lorem non ant'
            )
          )
        )
      );
    }
  }]);

  return UnicornComments;
}(_react.Component);

exports.default = UnicornComments;
});

require.register("components/unicorn/Full.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tags = require('../ui/Tags');

var _Tags2 = _interopRequireDefault(_Tags);

var _Preview = require('../user/Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _LikesViewsComments = require('./LikesViewsComments');

var _LikesViewsComments2 = _interopRequireDefault(_LikesViewsComments);

var _Preview3 = require('./Preview');

var _Preview4 = _interopRequireDefault(_Preview3);

var _Gen = require('./Gen');

var _Gen2 = _interopRequireDefault(_Gen);

var _Name = require('./Name');

var _Name2 = _interopRequireDefault(_Name);

var _Share = require('./Share');

var _Share2 = _interopRequireDefault(_Share);

var _Comments = require('./Comments');

var _Comments2 = _interopRequireDefault(_Comments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnicornFull = function (_Component) {
  _inherits(UnicornFull, _Component);

  function UnicornFull() {
    _classCallCheck(this, UnicornFull);

    return _possibleConstructorReturn(this, (UnicornFull.__proto__ || Object.getPrototypeOf(UnicornFull)).apply(this, arguments));
  }

  _createClass(UnicornFull, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'content-block' },
        _react2.default.createElement(
          'div',
          { className: 'container custom-container be-detail-container' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-9 col-md-push-3' },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement('div', { id: 'chartContainer' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'be-large-post' },
                _react2.default.createElement(_LikesViewsComments2.default, null),
                _react2.default.createElement(
                  'div',
                  { className: 'blog-content popup-gallery be-large-post-align' },
                  _react2.default.createElement(_Name2.default, null),
                  _react2.default.createElement(
                    'span',
                    { className: 'just_part' },
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                      ' +23.4453'
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                      ' Gen-3'
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement('i', { className: 'fa fa-clock-o' }),
                      ' May 27, 2015'
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement('i', { className: 'fa fa-transgender' }),
                      ' Swift'
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement('i', { className: 'fa fa-globe' }),
                      ' USA'
                    )
                  ),
                  _react2.default.createElement('div', { className: 'clear' }),
                  _react2.default.createElement('img', { src: 'img/unicorn.png', alt: '' })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'be-large-post-align' },
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'div',
                      { className: 'col-xs-12 col-sm-6' },
                      _react2.default.createElement(
                        'div',
                        { className: 'be-bottom' },
                        _react2.default.createElement(
                          'h4',
                          { className: 'be-bottom-title' },
                          'Tags'
                        ),
                        _react2.default.createElement(_Tags2.default, null)
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-xs-12 col-sm-6' },
                      _react2.default.createElement(_Share2.default, null)
                    )
                  )
                ),
                _react2.default.createElement(_Gen2.default, null)
              ),
              _react2.default.createElement(_Comments2.default, null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-md-3 col-md-pull-9 left-feild' },
              _react2.default.createElement(
                'a',
                { href: '#', className: 'be-button-vidget like-btn blue-style' },
                _react2.default.createElement('i', { className: 'fa fa-heart-o' }),
                'LIKE ME'
              ),
              _react2.default.createElement(
                'a',
                { href: '#', className: 'be-button-vidget like-btn blue-style' },
                _react2.default.createElement('i', { className: 'fa fa-bullhorn' }),
                ' ',
                _react2.default.createElement(
                  'small',
                  null,
                  'promote for'
                ),
                ' ',
                _react2.default.createElement(
                  'span',
                  null,
                  ' 0.00000012 ',
                  _react2.default.createElement('i', { className: 'fa fa-btc' })
                )
              ),
              _react2.default.createElement(
                'a',
                { href: '#', className: 'be-button-vidget like-btn blue-style' },
                _react2.default.createElement('i', { className: 'fa fa-tag' }),
                ' ',
                _react2.default.createElement(
                  'small',
                  null,
                  'buy for'
                ),
                ' ',
                _react2.default.createElement(
                  'span',
                  null,
                  ' 0.042 ',
                  _react2.default.createElement('i', { className: 'fa fa-btc' }),
                  ' ',
                  _react2.default.createElement('i', { className: 'fa fa-cog' })
                )
              ),
              _react2.default.createElement(
                'a',
                { href: '#', className: 'be-button-vidget add-btn grey-style' },
                _react2.default.createElement('i', { className: 'fa fa fa-venus-mars' }),
                ' ',
                _react2.default.createElement(
                  'small',
                  null,
                  'modify for'
                ),
                ' ',
                _react2.default.createElement(
                  'span',
                  null,
                  ' 0.000027 ',
                  _react2.default.createElement('i', { className: 'fa fa-btc' }),
                  ' ',
                  _react2.default.createElement('i', { className: 'fa fa-cog' })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'info-block style-2' },
                _react2.default.createElement(
                  'h3',
                  { className: 'info-block-label' },
                  _react2.default.createElement('i', { className: 'fa fa-child' }),
                  ' Owner'
                )
              ),
              _react2.default.createElement(_Preview4.default, null),
              _react2.default.createElement('br', null),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'h3',
                { className: 'letf-menu-article text-center' },
                'Parents'
              ),
              _react2.default.createElement(
                'div',
                { className: 'swiper-container', 'data-loop': '1', 'data-speed': '500', 'data-center': '0', 'data-slides-per-view': '1' },
                _react2.default.createElement(
                  'div',
                  { className: 'swiper-wrapper' },
                  _react2.default.createElement(
                    'div',
                    { className: 'swiper-slide' },
                    _react2.default.createElement(_Preview4.default, null)
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'swiper-slide' },
                    _react2.default.createElement(_Preview4.default, null)
                  )
                ),
                _react2.default.createElement('div', { className: 'pagination' })
              ),
              _react2.default.createElement(
                'h3',
                { className: 'letf-menu-article text-center' },
                'Children'
              ),
              _react2.default.createElement(
                'div',
                { className: 'swiper-container', 'data-loop': '1', 'data-speed': '500', 'data-center': '0', 'data-slides-per-view': '1' },
                _react2.default.createElement(
                  'div',
                  { className: 'swiper-wrapper' },
                  _react2.default.createElement(
                    'div',
                    { className: 'swiper-slide' },
                    _react2.default.createElement(_Preview4.default, null)
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'swiper-slide' },
                    _react2.default.createElement(_Preview4.default, null)
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'swiper-slide' },
                    _react2.default.createElement(_Preview4.default, null)
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'swiper-slide' },
                    _react2.default.createElement(_Preview4.default, null)
                  )
                ),
                _react2.default.createElement('div', { className: 'pagination' })
              )
            )
          )
        )
      );
    }
  }]);

  return UnicornFull;
}(_react.Component);

exports.default = UnicornFull;
});

require.register("components/unicorn/Gen.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnicornGen = function (_Component) {
  _inherits(UnicornGen, _Component);

  function UnicornGen() {
    _classCallCheck(this, UnicornGen);

    return _possibleConstructorReturn(this, (UnicornGen.__proto__ || Object.getPrototypeOf(UnicornGen)).apply(this, arguments));
  }

  _createClass(UnicornGen, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("img", { src: "img/gen.png" });
    }
  }]);

  return UnicornGen;
}(_react.Component);

exports.default = UnicornGen;
});

require.register("components/unicorn/LikesViewsComments.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnicornLikesViewsComments = function (_Component) {
  _inherits(UnicornLikesViewsComments, _Component);

  function UnicornLikesViewsComments() {
    _classCallCheck(this, UnicornLikesViewsComments);

    return _possibleConstructorReturn(this, (UnicornLikesViewsComments.__proto__ || Object.getPrototypeOf(UnicornLikesViewsComments)).apply(this, arguments));
  }

  _createClass(UnicornLikesViewsComments, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "info-block" },
        _react2.default.createElement(
          "div",
          { className: "be-large-post-align" },
          _react2.default.createElement(
            "span",
            null,
            _react2.default.createElement("i", { className: "fa fa-heart-o", "aria-hidden": "true" }),
            " 253"
          ),
          _react2.default.createElement(
            "span",
            null,
            _react2.default.createElement("i", { className: "fa fa-eye" }),
            " 753"
          ),
          _react2.default.createElement(
            "span",
            null,
            _react2.default.createElement("i", { className: "fa fa-comment-o" }),
            " 50"
          )
        )
      );
    }
  }]);

  return UnicornLikesViewsComments;
}(_react.Component);

exports.default = UnicornLikesViewsComments;
});

require.register("components/unicorn/Name.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnicornName = function (_Component) {
  _inherits(UnicornName, _Component);

  function UnicornName() {
    _classCallCheck(this, UnicornName);

    return _possibleConstructorReturn(this, (UnicornName.__proto__ || Object.getPrototypeOf(UnicornName)).apply(this, arguments));
  }

  _createClass(UnicornName, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "h5",
        { className: "be-post-title to" },
        "Mr. Incredible Unicorn"
      );
    }
  }]);

  return UnicornName;
}(_react.Component);

exports.default = UnicornName;
});

require.register("components/unicorn/Preview.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _Tags = require('../ui/Tags');

var _Tags2 = _interopRequireDefault(_Tags);

var _LikesViewsComments = require('./LikesViewsComments');

var _LikesViewsComments2 = _interopRequireDefault(_LikesViewsComments);

var _Name = require('./Name');

var _Name2 = _interopRequireDefault(_Name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnicornPreview = function (_Component) {
  _inherits(UnicornPreview, _Component);

  function UnicornPreview() {
    _classCallCheck(this, UnicornPreview);

    return _possibleConstructorReturn(this, (UnicornPreview.__proto__ || Object.getPrototypeOf(UnicornPreview)).apply(this, arguments));
  }

  _createClass(UnicornPreview, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'be-post' },
        _react2.default.createElement(
          'div',
          { className: 'info-block' },
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('i', { className: 'fa fa-tag' }),
            ' 0.042 ',
            _react2.default.createElement('i', { className: 'fa fa-btc' })
          ),
          _react2.default.createElement(
            'span',
            null,
            'extra ',
            _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
            _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
            ' 0.00093 ',
            _react2.default.createElement('i', { className: 'fa fa-btc' })
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'be-img-block' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/unicorn' },
            _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
          )
        ),
        _react2.default.createElement(_Name2.default, null),
        _react2.default.createElement(
          'span',
          { className: 'just_part' },
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
            ' +23.4453'
          ),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('i', { className: 'fa fa-cubes' }),
            ' Gen-1'
          )
        ),
        _react2.default.createElement(_Tags2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'author-post' },
          _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
          _react2.default.createElement(
            'span',
            null,
            'by ',
            _react2.default.createElement(
              'a',
              { href: 'page1.html' },
              'Alex Alexeev ',
              _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('i', { className: 'fa fa-globe' }),
                ' USA'
              )
            )
          )
        ),
        _react2.default.createElement(_LikesViewsComments2.default, null)
      );
    }
  }]);

  return UnicornPreview;
}(_react.Component);

exports.default = UnicornPreview;
});

require.register("components/unicorn/Share.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnicornShare = function (_Component) {
  _inherits(UnicornShare, _Component);

  function UnicornShare() {
    _classCallCheck(this, UnicornShare);

    return _possibleConstructorReturn(this, (UnicornShare.__proto__ || Object.getPrototypeOf(UnicornShare)).apply(this, arguments));
  }

  _createClass(UnicornShare, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "be-bottom right" },
        _react2.default.createElement(
          "h4",
          { className: "be-bottom-title" },
          "Share"
        ),
        _react2.default.createElement(
          "ul",
          { className: "soc_buttons light" },
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { href: "" },
              _react2.default.createElement("i", { className: "fa fa-facebook" })
            )
          ),
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { href: "" },
              _react2.default.createElement("i", { className: "fa fa-twitter" })
            )
          ),
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { href: "" },
              _react2.default.createElement("i", { className: "fa fa-google-plus" })
            )
          ),
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { href: "" },
              _react2.default.createElement("i", { className: "fa fa-pinterest-p" })
            )
          ),
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { href: "" },
              _react2.default.createElement("i", { className: "fa fa-instagram" })
            )
          ),
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { href: "" },
              _react2.default.createElement("i", { className: "fa fa-linkedin" })
            )
          )
        )
      );
    }
  }]);

  return UnicornShare;
}(_react.Component);

exports.default = UnicornShare;
});

require.register("components/unicorn/Unicorn.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_Component) {
  _inherits(Item, _Component);

  function Item(props) {
    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

    _this.state = { value: '' };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Item, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      this.props.smart.make(this.state.value);
      console.log('formed NOW');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$gen = this.props.gen,
          head = _props$gen.head,
          hair = _props$gen.hair,
          corn = _props$gen.corn,
          ears = _props$gen.ears,
          eyes = _props$gen.eyes;
      var color = this.props.color;


      var colorValue = function colorValue(hue) {
        return 'hsl(' + hue + ', 50%, 50%)';
      };

      return _react2.default.createElement(
        'div',
        { className: 'unicorn' },
        _react2.default.createElement(
          'div',
          { className: 'head' },
          _react2.default.createElement(
            'svg',
            { xmlnsXlink: 'http://www.w3.org/2000/svg', height: '322', width: '252' },
            head === 1 && _react2.default.createElement('path', { fill: colorValue(color.head), d: 'm41.979998,202.12l20.86,68.29s41.36,22.27 62.16,32.59c20.8,-10.32 62.17,-32.59 62.17,-32.59l20.85,-68.29l-83.02,-112.19l-83.02,112.19zm136.86,-201.12l-107.68,0l-54.67,117.63l25.49,83.49l83.02,-112.19l83.02,112.19l25.49,-83.49l-54.67,-117.63z' }),
            head === 2 && _react2.default.createElement('path', { fill: colorValue(color.head), d: 'm184.91,0.01l-174.27,0c-0.53,50.74 -4.64,101.86 -4.64,152.87c0,29.37 0.84,53.8 2.7,74.12c25.74,-35.67 73.54,-46.98 116.3,-45.68c42.76,-1.3 90.56,10.01 116.3,45.68c1.86,-20.32 2.7,-44.75 2.7,-74.12c0,-51.01 -4.12,-102.13 -4.64,-152.87l-54.45,0z' }),
            head === 3 && _react2.default.createElement('path', { fill: colorValue(color.head), d: 'm197.26,117.58c0.53,-0.26 1.03,-0.53 1.53,-0.82c0.73,-19.1 4.43,-38.01 12.16,-54.11c-23.05,-11.19 -41.26,-31.82 -45.9,-56.5c-13.38,-0.31 -26.76,-2.06 -40.05,-4.15c-13.29,2.09 -26.67,3.84 -40.05,4.15c-4.64,24.68 -22.85,45.31 -45.9,56.5c7.49,15.6 11.2,33.83 12.08,52.32c36.85,34.12 103.1,25.12 146.13,2.61zm1.39,6.27c0,-2.36 0.05,-4.73 0.14,-7.09c-0.5,0.29 -1,0.56 -1.53,0.82c-43.03,22.51 -109.28,31.51 -146.13,-2.61c0.14,2.96 0.22,5.92 0.22,8.88c0,72.49 -26.85,78.53 -26.85,109.81c0,43.81 51.55,81.34 95.84,81.34c1.56,0 3.11,-0.06 4.66,-0.16c1.55,0.1 3.1,0.16 4.66,0.16c44.29,0 95.84,-37.53 95.84,-81.34c0,-31.28 -26.85,-37.32 -26.85,-109.81z' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'hair' },
          _react2.default.createElement(
            'svg',
            { xmlnsXlink: 'http://www.w3.org/2000/svg', height: '162', width: '282' },
            hair === 1 && _react2.default.createElement('path', { fill: colorValue(color.hair), d: 'm139.994997,68.2l-123.49,19.8l60.62,-88l125.75,0l60.62,88l-123.5,-19.8z' }),
            hair === 2 && _react2.default.createElement('path', { fill: colorValue(color.hair), d: 'm140.000003,106.02a37.981,37.981 0 0 1 -8.82,-9.27a37.424,37.424 0 0 1 -13.39,11.67c-1.95,-9.37 -6.78,-19.21 -15.18,-22.7a27.381,27.381 0 0 1 2.9,12.04a21.172,21.172 0 0 1 -2.59,10.4a19.575,19.575 0 0 0 -17.07,-9.19a18.555,18.555 0 0 0 -8.25,1.72c5.57,3.24 9.34,9.63 9.34,14.86c0,5.1 -3.13,9.63 -7.25,13.21c-0.71,-3.54 -3.1,-6.28 -6.37,-6.28c-11.75,0 -17.78,12.98 -24.44,22.92a53.454,53.454 0 0 0 -3.8,6.6a50.884,50.884 0 0 1 -3.96,-20.06a60.441,60.441 0 0 1 1.71,-14.14a41.609,41.609 0 0 0 -20.1,27.34a64.028,64.028 0 0 1 -3.98,-20.8a37.759,37.759 0 0 1 3.87,-17.43a47.355,47.355 0 0 0 -19.62,5.21a59.6,59.6 0 0 1 14.46,-19.35c10.27,-9.19 22.34,-15.5 34.96,-19.93c6.91,-2.42 12.3,-10.47 12.3,-18.77a17.7,17.7 0 0 0 -2.33,-8.89c5.5,2.35 11.07,5.26 13.27,11.14a50.905,50.905 0 0 0 1.34,-11.54c0,-8.11 -2.05,-16.21 -7.17,-21.9a31.315,31.315 0 0 1 19.5,7.66c3.74,-12.64 11.3,-24 21.71,-30.55a44.3,44.3 0 0 0 -5.07,20.28a59.584,59.584 0 0 1 -1.73,15.82a33.256,33.256 0 0 0 9.95,-11.7a17.313,17.313 0 0 0 11,10.27a36.131,36.131 0 0 1 14.81,-12.8a36.131,36.131 0 0 1 14.81,12.8a17.336,17.336 0 0 0 11,-10.27a33.256,33.256 0 0 0 9.95,11.7a59.584,59.584 0 0 1 -1.73,-15.82a44.3,44.3 0 0 0 -5.07,-20.28c10.41,6.55 17.97,17.91 21.71,30.55a31.315,31.315 0 0 1 19.5,-7.66c-5.12,5.69 -7.18,13.79 -7.18,21.9a50.907,50.907 0 0 0 1.35,11.54c2.2,-5.88 7.77,-8.79 13.27,-11.14a17.7,17.7 0 0 0 -2.33,8.89c0,8.3 5.39,16.35 12.3,18.77c12.62,4.43 24.68,10.74 34.96,19.93a59.6,59.6 0 0 1 14.46,19.35a47.355,47.355 0 0 0 -19.62,-5.21a37.759,37.759 0 0 1 3.87,17.43a64.028,64.028 0 0 1 -3.98,20.8a41.609,41.609 0 0 0 -20.1,-27.34a60.441,60.441 0 0 1 1.71,14.14a50.884,50.884 0 0 1 -3.96,20.06a53.454,53.454 0 0 0 -3.8,-6.6c-6.66,-9.94 -12.69,-22.92 -24.44,-22.92c-3.27,0 -5.66,2.74 -6.37,6.28c-4.12,-3.58 -7.25,-8.11 -7.25,-13.21c0,-5.23 3.77,-11.62 9.34,-14.86a18.555,18.555 0 0 0 -8.25,-1.72a19.562,19.562 0 0 0 -17.07,9.19a21.172,21.172 0 0 1 -2.59,-10.4a27.381,27.381 0 0 1 2.9,-12.04c-8.4,3.49 -13.23,13.33 -15.18,22.7a37.424,37.424 0 0 1 -13.39,-11.67a37.981,37.981 0 0 1 -8.82,9.27z' }),
            hair === 3 && _react2.default.createElement('path', { fill: colorValue(color.hair), d: 'm140.44884,85a97.459,97.459 0 0 1 -22.2,-3.36c1.1,0.3 -18.56,-8.83 -14.42,-1.75c-1.78,-3.06 -4.54,-6.11 -4.99,-10.46c-4.64,1.47 -7.99,5.45 -9.79,10.28c-3.86,-5.14 -3.16,-11.65 -2.36,-17.59c-4.4,1.56 -6.08,1.87 -8.02,7.08c-2.5,-4.8 2.96,-69.2 0.3,-69.2l15.61,0q53.685,0 107.35,0c0.38,8.66 -0.76,17.21 -1.31,25.83c-0.57,8.95 2.24,19.82 -0.83,28.2c-1.18,-2.66 -6.64,-4.39 -7.14,-5.71c1.74,4.62 3.07,10.88 1.78,15.75c-2.38,-1.33 -4.54,-4.34 -7.65,-5.18c2.11,3.25 1.16,7.23 0,10.71c-1.54,-9.85 -12.67,4.71 -17.25,7.41c-8.8,5.21 -18.91,7.61 -29.08,7.99z' })
          )
        ),
        _react2.default.createElement('div', { className: 'corn type-' + corn }),
        _react2.default.createElement('div', { className: 'ears type-' + ears }),
        _react2.default.createElement('div', { className: 'eyes type-' + eyes }),
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          _react2.default.createElement('input', { type: 'text', onChange: this.handleChange }),
          _react2.default.createElement(
            'button',
            null,
            'buy'
          )
        )
      );
    }
  }]);

  return Item;
}(_react.Component);

exports.default = Item;
});

require.register("components/user/Comment.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserComment = function (_Component) {
  _inherits(UserComment, _Component);

  function UserComment() {
    _classCallCheck(this, UserComment);

    return _possibleConstructorReturn(this, (UserComment.__proto__ || Object.getPrototypeOf(UserComment)).apply(this, arguments));
  }

  _createClass(UserComment, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "be-comment" },
        _react2.default.createElement(
          "div",
          { className: "be-img-comment" },
          _react2.default.createElement(
            "a",
            { href: "blog-detail-2.html" },
            _react2.default.createElement("img", { src: "img/c1.png", alt: "", className: "be-ava-comment" })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "be-comment-content" },
          _react2.default.createElement(
            "span",
            { className: "be-comment-name" },
            _react2.default.createElement(
              "a",
              { href: "blog-detail-2.html" },
              "Ravi Sah 111"
            )
          ),
          _react2.default.createElement(
            "span",
            { className: "be-comment-time" },
            _react2.default.createElement("i", { className: "fa fa-clock-o" }),
            "May 27, 2015 at 3:14am"
          ),
          _react2.default.createElement(
            "p",
            { className: "be-comment-text" },
            "Pellentesque gravida tristique ultrices. Sed blandit varius mauris, vel volutpat urna hendrerit id. Curabitur rutrum dolor gravida turpis tristique efficitur."
          )
        )
      );
    }
  }]);

  return UserComment;
}(_react.Component);

exports.default = UserComment;
});

require.register("components/user/Full.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserFull = function (_Component) {
  _inherits(UserFull, _Component);

  function UserFull() {
    _classCallCheck(this, UserFull);

    return _possibleConstructorReturn(this, (UserFull.__proto__ || Object.getPrototypeOf(UserFull)).apply(this, arguments));
  }

  _createClass(UserFull, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "col-xs-12 col-md-4 left-feild" },
        _react2.default.createElement(
          "div",
          { className: "be-user-block style-3" },
          _react2.default.createElement(
            "div",
            { className: "be-user-detail" },
            _react2.default.createElement(
              "span",
              { className: "be-ava-user style-2" },
              _react2.default.createElement("img", { src: "img/ava_10.jpg", alt: "" }),
              _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                  "a",
                  { className: "settings", href: "#" },
                  _react2.default.createElement("i", { className: "fa fa-times" })
                ),
                _react2.default.createElement(
                  "a",
                  { className: "settings", href: "#" },
                  _react2.default.createElement("i", { className: "fa fa-upload" })
                )
              )
            ),
            _react2.default.createElement(
              "p",
              { className: "be-use-name" },
              "Alex Alexeev ",
              _react2.default.createElement(
                "a",
                { className: "settings", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-cog" })
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "form-group" },
              _react2.default.createElement("input", { className: "form-input", type: "text", placeholder: "Alex Alexeev" })
            ),
            _react2.default.createElement(
              "a",
              { className: "btn color-1 size-3 hover-1" },
              "save"
            ),
            _react2.default.createElement(
              "a",
              { className: "btn color-4 size-3 hover-7" },
              "cancel"
            ),
            _react2.default.createElement("div", { className: "clear" }),
            _react2.default.createElement(
              "div",
              { className: "be-user-info" },
              "Barnsley, United Kingdom",
              _react2.default.createElement(
                "a",
                { className: "settings", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-times" })
              ),
              _react2.default.createElement(
                "a",
                { className: "settings", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-map-marker" })
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "be-user-social" },
              _react2.default.createElement(
                "a",
                { className: "social-btn color-1", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-facebook" })
              ),
              _react2.default.createElement(
                "a",
                { className: "social-btn color-2", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-twitter" })
              ),
              _react2.default.createElement(
                "a",
                { className: "social-btn color-3", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-google-plus" })
              ),
              _react2.default.createElement(
                "a",
                { className: "social-btn color-4", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-pinterest-p" })
              ),
              _react2.default.createElement(
                "a",
                { className: "social-btn color-5", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-instagram" })
              ),
              _react2.default.createElement(
                "a",
                { className: "social-btn color-6", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-linkedin" })
              ),
              _react2.default.createElement(
                "a",
                { className: "settings", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-cog" })
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "dit-user-social" },
              _react2.default.createElement(
                "div",
                { className: "social-input form-group focus-2" },
                _react2.default.createElement(
                  "div",
                  { className: "s_icon" },
                  _react2.default.createElement(
                    "div",
                    { className: "social-bars" },
                    _react2.default.createElement("i", { className: "fa fa-bars" })
                  ),
                  _react2.default.createElement(
                    "a",
                    { className: "social-btn color-1", href: "#" },
                    _react2.default.createElement("i", { className: "fa fa-facebook" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "s_input" },
                  _react2.default.createElement("input", { className: "form-input", type: "text", value: "http:// facebook.com/taylor" })
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "social-input form-group focus-2" },
                _react2.default.createElement(
                  "div",
                  { className: "s_icon" },
                  _react2.default.createElement(
                    "div",
                    { className: "social-bars" },
                    _react2.default.createElement("i", { className: "fa fa-bars" })
                  ),
                  _react2.default.createElement(
                    "a",
                    { className: "social-btn color-2", href: "#" },
                    _react2.default.createElement("i", { className: "fa fa-twitter" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "s_input" },
                  _react2.default.createElement("input", { className: "form-input", type: "text", value: "http:// twitter.com/taylor" })
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "social-input form-group focus-2" },
                _react2.default.createElement(
                  "div",
                  { className: "s_icon" },
                  _react2.default.createElement(
                    "div",
                    { className: "social-bars" },
                    _react2.default.createElement("i", { className: "fa fa-bars" })
                  ),
                  _react2.default.createElement(
                    "a",
                    { className: "social-btn color-3", href: "#" },
                    _react2.default.createElement("i", { className: "fa fa-google-plus" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "s_input" },
                  _react2.default.createElement("input", { className: "form-input", type: "text", value: "http:// googleplus.com/taylor" })
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "social-input form-group focus-2" },
                _react2.default.createElement(
                  "div",
                  { className: "s_icon" },
                  _react2.default.createElement(
                    "div",
                    { className: "social-bars" },
                    _react2.default.createElement("i", { className: "fa fa-bars" })
                  ),
                  _react2.default.createElement(
                    "a",
                    { className: "social-btn color-4", href: "#" },
                    _react2.default.createElement("i", { className: "fa fa-pinterest-p" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "s_input" },
                  _react2.default.createElement("input", { className: "form-input", type: "text", value: "http:// pinterest.com/taylor" })
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "social-input form-group focus-2" },
                _react2.default.createElement(
                  "div",
                  { className: "s_icon" },
                  _react2.default.createElement(
                    "div",
                    { className: "social-bars" },
                    _react2.default.createElement("i", { className: "fa fa-bars" })
                  ),
                  _react2.default.createElement(
                    "a",
                    { className: "social-btn color-5", href: "#" },
                    _react2.default.createElement("i", { className: "fa fa-instagram" })
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "s_input" },
                  _react2.default.createElement("input", { className: "form-input", type: "text", value: "http:// instagram.com/taylor" })
                )
              ),
              _react2.default.createElement(
                "a",
                { className: "btn color-1 size-3 hover-1" },
                "save"
              ),
              _react2.default.createElement(
                "a",
                { className: "btn color-4 size-3 hover-7" },
                "cancel"
              ),
              _react2.default.createElement("div", { className: "clear" })
            ),
            _react2.default.createElement(
              "a",
              { className: "be-user-site", href: "http://www.unicorn.go" },
              _react2.default.createElement("i", { className: "fa fa-link" }),
              " http://www.unicorn.go"
            ),
            _react2.default.createElement(
              "a",
              { className: "settings", href: "#" },
              _react2.default.createElement("i", { className: "fa fa-cog" })
            ),
            _react2.default.createElement(
              "div",
              { className: "form-group fg_icon" },
              _react2.default.createElement("input", { className: "form-input", type: "text", placeholder: "http://www.unicorn.go" }),
              _react2.default.createElement("i", { className: "form-group-icon fa fa-link" })
            ),
            _react2.default.createElement(
              "a",
              { className: "btn color-1 size-3 hover-1" },
              "save"
            ),
            _react2.default.createElement(
              "a",
              { className: "btn color-4 size-3 hover-7" },
              "cancel"
            ),
            _react2.default.createElement("div", { className: "clear" })
          ),
          _react2.default.createElement(
            "div",
            { className: "be-user-statistic" },
            _react2.default.createElement(
              "div",
              { className: "stat-row clearfix" },
              _react2.default.createElement("i", { className: "stat-icon icon-views" }),
              " ",
              _react2.default.createElement(
                "small",
                null,
                "my"
              ),
              " Views",
              _react2.default.createElement(
                "span",
                { className: "stat-counter" },
                "218098\xA0\xA0\xA0\xA0 ",
                _react2.default.createElement(
                  "a",
                  { className: "settings", href: "#" },
                  " ",
                  _react2.default.createElement("i", { className: "fa fa-toggle-on" })
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "stat-row clearfix" },
              _react2.default.createElement("i", { className: "stat-icon icon-like" }),
              " ",
              _react2.default.createElement(
                "small",
                null,
                "my"
              ),
              " Likes",
              _react2.default.createElement(
                "span",
                { className: "stat-counter" },
                "14335\xA0\xA0\xA0\xA0 ",
                _react2.default.createElement(
                  "a",
                  { className: "settings", href: "#" },
                  " ",
                  _react2.default.createElement("i", { className: "fa fa-toggle-on" })
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "stat-row clearfix" },
              _react2.default.createElement("i", { className: "stat-icon icon-comment" }),
              " ",
              _react2.default.createElement(
                "small",
                null,
                "my"
              ),
              " Comments",
              _react2.default.createElement(
                "span",
                { className: "stat-counter" },
                "14335\xA0\xA0\xA0\xA0 ",
                _react2.default.createElement(
                  "a",
                  { className: "settings", href: "#" },
                  " ",
                  _react2.default.createElement("i", { className: "fa fa-toggle-on" })
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "stat-row clearfix" },
              _react2.default.createElement("i", { className: "stat-icon fa fa-line-chart" }),
              " ",
              _react2.default.createElement(
                "small",
                null,
                "my"
              ),
              " Storage",
              _react2.default.createElement(
                "span",
                { className: "stat-counter" },
                "14335\xA0\xA0\xA0\xA0 ",
                _react2.default.createElement(
                  "a",
                  { className: "settings", href: "#" },
                  " ",
                  _react2.default.createElement("i", { className: "fa fa-toggle-on" })
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "be-desc-block" },
          _react2.default.createElement(
            "div",
            { className: "be-desc-author" },
            _react2.default.createElement(
              "div",
              { className: "be-desc-label" },
              "About Me ",
              _react2.default.createElement(
                "a",
                { className: "settings", href: "#" },
                _react2.default.createElement("i", { className: "fa fa-cog" })
              )
            ),
            _react2.default.createElement("div", { className: "clearfix" }),
            _react2.default.createElement(
              "div",
              { className: "be-desc-text" },
              "Nam sit amet massa commodo, tristique metus at, consequat turpis. In vulputate justo at auctor mollis. Aliquam non sagittis tortor. Duis tristique suscipit risus, quis facilisis nisl congue vitae. Nunc varius pellentesque scelerisque. Etiam quis massa vitae lectus placerat ullamcorper pellentesque vel nisl."
            ),
            _react2.default.createElement(
              "div",
              { className: "form-group" },
              _react2.default.createElement(
                "textarea",
                { className: "form-input", type: "text" },
                "Nam sit amet massa commodo, tristique metus at, consequat turpis. In vulputate justo at auctor mollis. Aliquam non sagittis tortor. Duis tristique suscipit risus, quis facilisis nisl congue vitae. Nunc varius pellentesque scelerisque. Etiam quis massa vitae lectus placerat ullamcorper pellentesque vel nisl."
              ),
              _react2.default.createElement(
                "center",
                null,
                _react2.default.createElement(
                  "a",
                  { className: "btn color-1 size-3 hover-1" },
                  "save"
                ),
                _react2.default.createElement(
                  "a",
                  { className: "btn color-4 size-3 hover-7" },
                  "cancel"
                )
              )
            )
          )
        )
      );
    }
  }]);

  return UserFull;
}(_react.Component);

exports.default = UserFull;
});

require.register("components/user/Preview.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserPreview = function UserPreview(_ref) {
  var account = _ref.account,
      onLogin = _ref.onLogin;

  var isLoggedIn = account !== null;
  return _react2.default.createElement(
    "div",
    { className: "login-header-block" },
    _react2.default.createElement(
      "div",
      { className: "login_block" },
      isLoggedIn ? _react2.default.createElement(
        "div",
        { className: "be-drop-down login-user-down" },
        _react2.default.createElement("img", { className: "login-user", src: "img/login.jpg", alt: "" }),
        _react2.default.createElement(
          "span",
          { className: "be-dropdown-content" },
          "Hi, ",
          _react2.default.createElement(
            "span",
            null,
            account.name
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "drop-down-list a-list" },
          _react2.default.createElement(
            "a",
            { href: "#" },
            "Edit"
          ),
          _react2.default.createElement(
            "a",
            { href: "#" },
            "Invite"
          )
        )
      ) : _react2.default.createElement(
        "a",
        { className: "btn-login btn color-1 size-2 hover-2", href: "", onClick: onLogin },
        _react2.default.createElement("i", { className: "fa fa-user" }),
        "Sign Up"
      )
    )
  );
};

exports.default = UserPreview;
});

require.register("components/user/login.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserLogin = function UserLogin(_ref) {
  var onLogin = _ref.onLogin;
  return _react2.default.createElement(
    "div",
    { className: "login-header-block" },
    _react2.default.createElement(
      "div",
      { className: "login_block" },
      _react2.default.createElement(
        "a",
        { className: "btn-login btn color-1 size-2 hover-2", href: "", onClick: onLogin },
        _react2.default.createElement("i", { className: "fa fa-user" }),
        " Log in"
      )
    )
  );
};

exports.default = UserLogin;
});

require.register("main.js", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _redux = require('redux');

var _reduxDevtoolsExtension = require('redux-devtools-extension');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _app = require('./components/app/app');

var _app2 = _interopRequireDefault(_app);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducers2.default, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk2.default)));

_reactDom2.default.render(_react2.default.createElement(
  _reactRouterDom.BrowserRouter,
  null,
  _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_app2.default, null)
  )
), document.getElementById('root'));
});

require.register("pages/About.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageAbout = function (_Component) {
    _inherits(PageAbout, _Component);

    function PageAbout() {
        _classCallCheck(this, PageAbout);

        return _possibleConstructorReturn(this, (PageAbout.__proto__ || Object.getPrototypeOf(PageAbout)).apply(this, arguments));
    }

    _createClass(PageAbout, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "content-block" },
                _react2.default.createElement(
                    "div",
                    { className: "head-bg style-3 ab-us" },
                    _react2.default.createElement(
                        "div",
                        { className: "swiper-container", "data-autoplay": "2000", "data-loop": "0", "data-speed": "500", "data-center": "0", "data-slides-per-view": "1" },
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-wrapper" },
                            _react2.default.createElement(
                                "div",
                                { className: "swiper-slide head-bg-img ", "data-val": "0" },
                                _react2.default.createElement("img", { className: "center-image", src: "img/bg-3.jpg", alt: "" })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "swiper-slide head-bg-img", "data-val": "1" },
                                _react2.default.createElement("img", { className: "center-image", src: "img/bg-2.jpg", alt: "" })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "swiper-slide head-bg-img", "data-val": "2" },
                                _react2.default.createElement("img", { className: "center-image", src: "img/bg-5.jpg", alt: "" })
                            )
                        ),
                        _react2.default.createElement("div", { className: "pagination hidden" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "head-bg-content" },
                        _react2.default.createElement("div", { className: "swiper-arrow-left type-2 be-out" }),
                        _react2.default.createElement("div", { className: "swiper-arrow-right type-2 be-out" }),
                        _react2.default.createElement(
                            "h1",
                            null,
                            "Some Information about our Company"
                        ),
                        _react2.default.createElement(
                            "p",
                            null,
                            "Donec in rhoncus tortor. Sed tristique auctor ligula vel viverra"
                        ),
                        _react2.default.createElement(
                            "a",
                            { className: "be-register btn color-3 size-1 hover-6" },
                            _react2.default.createElement("i", { className: "fa fa-lock" }),
                            "join now"
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "container" },
                    _react2.default.createElement(
                        "div",
                        { className: "about-description" },
                        _react2.default.createElement("img", { className: "img-responsive", src: "img/about.jpg", alt: "" }),
                        _react2.default.createElement(
                            "div",
                            { className: "row" },
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-12 col-md-10 col-md-offset-1" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "about-text" },
                                    "Duis pretium diam auctor velit tempus imperdiet. Duis velit ipsum, consequat vitae bibendum in, vestibulum sit amet turpis. Fusce venenatis egestas ultrices. Nam nec porttitor metus. Ut eros arcu, pretium at nunc eu, vulputate efficitur tellus. Vivamus tempus sem et metus euismod, a facilisis est egestas. Ut nunc eros, suscipit vitae tincidunt ut, dapibus a eros. Cras euismod dui sapien.Vestibulum varius ultrices arcu. Sed semper leo ex, sit amet rutrum est blandit sit amet. Ut magna neque, congue at augue eget, ullamcorper luctus ligula. Cras scelerisque nisi at nibh gravida consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet nulla nunc. Curabitur risus sapien, convallis non tortor eget, interdum tempus ligula. "
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "block" },
                        _react2.default.createElement(
                            "h3",
                            { className: "block-title" },
                            "Our Team As They Are"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "block-subtitle" },
                            "Cras vel dui tempor lorem ultrices eleifend non nec enim. Aliquam condimentum at diam vitae vulputate."
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "row" },
                            _react2.default.createElement(
                                "div",
                                { className: "col-ml-12 col-xs-6 col-sm-6 col-md-3" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "team-entry" },
                                    _react2.default.createElement(
                                        "a",
                                        { href: "blog-detail-2.html" },
                                        _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/team_1.jpg", alt: "" })
                                    ),
                                    _react2.default.createElement(
                                        "h4",
                                        { className: "team-name" },
                                        "Marcus Finderman"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "team-position" },
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html", className: "be-post-tag" },
                                            "Art Director"
                                        ),
                                        ",",
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html", className: "be-post-tag" },
                                            "Creative  Designer"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "team-social" },
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-facebook" })
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-twitter" })
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-google-plus" })
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-ml-12 col-xs-6 col-sm-6 col-md-3" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "team-entry" },
                                    _react2.default.createElement(
                                        "a",
                                        { href: "blog-detail-2.html" },
                                        _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/team_2.jpg", alt: "" })
                                    ),
                                    _react2.default.createElement(
                                        "h4",
                                        { className: "team-name" },
                                        "Boney mcFannin"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "team-position" },
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html", className: "be-post-tag" },
                                            "Web Developer"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "team-social" },
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-facebook" })
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-twitter" })
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-google-plus" })
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-ml-12 col-xs-6 col-sm-6 col-md-3" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "team-entry" },
                                    _react2.default.createElement(
                                        "a",
                                        { href: "blog-detail-2.html" },
                                        _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/team_5.jpg", alt: "" })
                                    ),
                                    _react2.default.createElement(
                                        "h4",
                                        { className: "team-name" },
                                        "Jerremy Dawson"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "team-position" },
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html", className: "be-post-tag" },
                                            "Illustrator"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "team-social" },
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-facebook" })
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-twitter" })
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-google-plus" })
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-ml-12 col-xs-6 col-sm-6 col-md-3" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "team-entry" },
                                    _react2.default.createElement(
                                        "a",
                                        { href: "blog-detail-2.html" },
                                        _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/team_4.jpg", alt: "" })
                                    ),
                                    _react2.default.createElement(
                                        "h4",
                                        { className: "team-name" },
                                        "Jhon Makauer"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "team-position" },
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html", className: "be-post-tag" },
                                            "Manager"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "team-social" },
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-facebook" })
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-twitter" })
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { href: "blog-detail-2.html" },
                                            _react2.default.createElement("i", { className: "fa fa-google-plus" })
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "counters-block number-counters" },
                    _react2.default.createElement("img", { className: "center-image", src: "img/bg-5.jpg", alt: "" }),
                    _react2.default.createElement(
                        "div",
                        { className: "container" },
                        _react2.default.createElement(
                            "div",
                            { className: "row" },
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-6 col-md-3" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "counter-entry" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "stat-number", "data-to": "135", "data-speed": "3000" },
                                        "0"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "counter-label" },
                                        "SME Resolution"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "counter-text" },
                                        "Pellentesque gravida tristique ultrices. Sed blandit varius mauris, vel volutpat"
                                    ),
                                    _react2.default.createElement(
                                        "a",
                                        { className: "btn color-3 size-2 hover-8" },
                                        "read more"
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-6 col-md-3" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "counter-entry" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "stat-number", "data-to": "75", "data-speed": "3000" },
                                        "0"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "counter-label" },
                                        "Actions"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "counter-text" },
                                        "Fusce dolor libero, efficitur et lobortis at, faucibus nec nunc. Proin fermentum"
                                    ),
                                    _react2.default.createElement(
                                        "a",
                                        { className: "btn color-3 size-2 hover-8" },
                                        "read more"
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-6 col-md-3" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "counter-entry" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "stat-number", "data-to": "41", "data-speed": "3000" },
                                        "0"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "counter-label" },
                                        "Purchases in year"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "counter-text" },
                                        "Donec sed lobortis tortor. Ut nec lacinia sapien, sit amet dapibus magna"
                                    ),
                                    _react2.default.createElement(
                                        "a",
                                        { className: "btn color-3 size-2 hover-8" },
                                        "read more"
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-6 col-md-3" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "counter-entry" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "stat-number", "data-to": "66", "data-speed": "3000" },
                                        "0"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "counter-label" },
                                        "Handworks"
                                    ),
                                    _react2.default.createElement(
                                        "div",
                                        { className: "counter-text" },
                                        "Sed ultricies luctus ipsum in placerat. Mauris ultrices pharetra lectus sit amet"
                                    ),
                                    _react2.default.createElement(
                                        "a",
                                        { className: "btn color-3 size-2 hover-8" },
                                        "read more"
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "container" },
                    _react2.default.createElement(
                        "div",
                        { className: "block" },
                        _react2.default.createElement(
                            "h3",
                            { className: "block-title" },
                            "Services"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "block-subtitle" },
                            "Nulla id risus urna. Ut commodo leo quis "
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-container", "data-autoplay": "5000", "data-loop": "0", "data-speed": "300", "data-center": "0", "data-slides-per-view": "responsive", "data-xs-slides": "1", "data-sm-slides": "2", "data-md-slides": "3", "data-lg-slides": "3", "data-add-slides": "3" },
                            _react2.default.createElement(
                                "div",
                                { className: "swiper-wrapper" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "swiper-slide", "data-val": "0" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "service-entry" },
                                        _react2.default.createElement("img", { className: "service-icon", src: "img/service_1.png", alt: "" }),
                                        _react2.default.createElement(
                                            "h4",
                                            { className: "service-title" },
                                            "Ideas for everyone"
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "service-text" },
                                            "Morbi efficitur feugiat erat a efficitur. Donec interdum, nunc ac elementum auctor, dui nisl placerat odio"
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { className: "btn color-1 size-2 hover-1" },
                                            "read more"
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "swiper-slide", "data-val": "1" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "service-entry" },
                                        _react2.default.createElement("img", { className: "service-icon", src: "img/service_2.png", alt: "" }),
                                        _react2.default.createElement(
                                            "h4",
                                            { className: "service-title" },
                                            "Developing pages"
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "service-text" },
                                            "Fusce id euismod diam, quis venenatis ipsum. Quisque lacinia non dui id fermentum. Ut libero nulla, auctor nec"
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { className: "btn color-1 size-2 hover-1" },
                                            "read more"
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "swiper-slide", "data-val": "2" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "service-entry" },
                                        _react2.default.createElement("img", { className: "service-icon", src: "img/service_3.png", alt: "" }),
                                        _react2.default.createElement(
                                            "h4",
                                            { className: "service-title" },
                                            "Easy in touch"
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "service-text" },
                                            "Curabitur tincidunt eros et felis eleifend, sed pharetra leo scelerisque. In accumsa"
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { className: "btn color-1 size-2 hover-1" },
                                            "read more"
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "swiper-slide", "data-val": "3" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "service-entry" },
                                        _react2.default.createElement("img", { className: "service-icon", src: "img/service_1.png", alt: "" }),
                                        _react2.default.createElement(
                                            "h4",
                                            { className: "service-title" },
                                            "Ideas for everyone"
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "service-text" },
                                            "Morbi efficitur feugiat erat a efficitur. Donec interdum, nunc ac elementum auctor, dui nisl placerat odio"
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { className: "btn color-1 size-2 hover-1" },
                                            "read more"
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "swiper-slide", "data-val": "4" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "service-entry" },
                                        _react2.default.createElement("img", { className: "service-icon", src: "img/service_2.png", alt: "" }),
                                        _react2.default.createElement(
                                            "h4",
                                            { className: "service-title" },
                                            "Developing pages"
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "service-text" },
                                            "Fusce id euismod diam, quis venenatis ipsum. Quisque lacinia non dui id fermentum. Ut libero nulla, auctor nec"
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { className: "btn color-1 size-2 hover-1" },
                                            "read more"
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "swiper-slide", "data-val": "5" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "service-entry" },
                                        _react2.default.createElement("img", { className: "service-icon", src: "img/service_3.png", alt: "" }),
                                        _react2.default.createElement(
                                            "h4",
                                            { className: "service-title" },
                                            "Easy in touch"
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "service-text" },
                                            "Curabitur tincidunt eros et felis eleifend, sed pharetra leo scelerisque. In accumsa"
                                        ),
                                        _react2.default.createElement(
                                            "a",
                                            { className: "btn color-1 size-2 hover-1" },
                                            "read more"
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement("div", { className: "pagination" })
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "container-fluid" },
                    _react2.default.createElement(
                        "div",
                        { className: "info-blocks" },
                        _react2.default.createElement(
                            "div",
                            { className: "info-entry left table-block" },
                            _react2.default.createElement(
                                "div",
                                { className: "row table-row" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "table-cell col-xs-12 col-sm-6" },
                                    _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/info_block_1.jpg", alt: "" })
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "table-cell col-xs-12 col-sm-6" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "info-text" },
                                        _react2.default.createElement(
                                            "h3",
                                            { className: "block-title" },
                                            "Work With Us"
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "row" },
                                            _react2.default.createElement(
                                                "div",
                                                { className: "col-xs-12 col-sm-6" },
                                                _react2.default.createElement(
                                                    "h4",
                                                    null,
                                                    "Why our team"
                                                ),
                                                _react2.default.createElement(
                                                    "p",
                                                    null,
                                                    "Aliquam id rhoncus enim, non malesuada dui. Phasellus at orci sed justo pharetra aliquet sed non urna. Aliquam erat volutpat. Cras feugiat ullamcorper nunc id tempor. Etiam et sapien consectetur, vehicula purus quis, ultrices lectus. Praesent congue lectus sit amet eros sagittis consequat. Phasellus nec diam non enim condimentum dapibus id non ligula. Sed euismod vitae odio vitae condimentum."
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "col-xs-12 col-sm-6" },
                                                _react2.default.createElement(
                                                    "h4",
                                                    null,
                                                    "Your career"
                                                ),
                                                _react2.default.createElement(
                                                    "p",
                                                    null,
                                                    "Proin ullamcorper nibh eget posuere congue. Nullam mollis tempus dictum. Suspendisse nisl dui, sollicitudin vel massa ac, luctus suscipit enim. Morbi vehicula massa a metus dapibus, et mattis ex aliquet."
                                                ),
                                                _react2.default.createElement(
                                                    "p",
                                                    null,
                                                    "Suspendisse potenti. Etiam congue, lectus in euismod facilisis, diam odio vulputate mauris, nec accumsan nulla libero vitae velit. In hac habitasse platea dictumst."
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "info-entry right table-block" },
                            _react2.default.createElement(
                                "div",
                                { className: "row table-row" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "table-cell col-xs-12 col-sm-6" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "info-text" },
                                        _react2.default.createElement(
                                            "h3",
                                            { className: "block-title" },
                                            "Work With Us"
                                        ),
                                        _react2.default.createElement(
                                            "h4",
                                            null,
                                            _react2.default.createElement("i", { className: "fa fa-camera" }),
                                            " Photoshoot as work"
                                        ),
                                        _react2.default.createElement(
                                            "p",
                                            null,
                                            "Aliquam id rhoncus enim, non malesuada dui. Phasellus at orci sed justo pharetra aliquet sed non urna. Aliquam erat volutpat. Cras feugiat ullamcorper nunc id tempor. Etiam et sapien consectetur, vehicula purus quis, ultrices lectus. Praesent congue lectus sit amet eros sagittis consequat. Phasellus nec diam non enim condimentum dapibus id non ligula. Sed euismod vitae odio vitae condimentum."
                                        ),
                                        _react2.default.createElement(
                                            "h4",
                                            null,
                                            _react2.default.createElement("i", { className: "fa fa-thumb-tack" }),
                                            " Pushpin to desk in a room"
                                        ),
                                        _react2.default.createElement(
                                            "p",
                                            null,
                                            "Proin ullamcorper nibh eget posuere congue. Nullam mollis tempus dictum. Suspendisse nisl dui, sollicitudin vel massa ac, luctus suscipit enim. Morbi vehicula massa a metus dapibus, et mattis ex aliquet."
                                        ),
                                        _react2.default.createElement(
                                            "p",
                                            null,
                                            "Suspendisse potenti. Etiam congue, lectus in euismod facilisis, diam odio vulputate mauris, nec accumsan nulla libero vitae velit. In hac habitasse platea dictumst."
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "table-cell col-xs-12 col-sm-6" },
                                    _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/info_block_2.jpg", alt: "" })
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "container" },
                    _react2.default.createElement(
                        "div",
                        { className: "team-block block" },
                        _react2.default.createElement(
                            "h3",
                            { className: "block-title" },
                            "Testimonials"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "block-subtitle" },
                            "Curabitur tincidunt eros et felis eleifend, sed pharetra leo scelerisque."
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "swiper-container", "data-autoplay": "5000", "data-loop": "0", "data-speed": "300", "data-center": "0", "data-slides-per-group": "2", "data-slides-per-view": "responsive", "data-xs-slides": "1", "data-sm-slides": "2", "data-md-slides": "2", "data-lg-slides": "2", "data-add-slides": "2" },
                            _react2.default.createElement(
                                "div",
                                { className: "swiper-wrapper" },
                                _react2.default.createElement(
                                    "div",
                                    { className: "swiper-slide" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "testimonals-block" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "testimonals-entry" },
                                            _react2.default.createElement("img", { className: "testimonals-img", src: "img/testimonals_1.jpg", alt: "" }),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-name" },
                                                "Samara Kechton"
                                            ),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-text profes" },
                                                "Make-up designer"
                                            ),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-text" },
                                                "Nulla id risus urna. Ut commodo leo quis dolor sollicitudin, nec elementum ipsum porta. Duis in nisi nisi. Vestibulum in mauris vitae odio sagittis interdum a ut purus. Suspendisse in molestie leo, at pulvinar massa. Aenean convallis nunc eros, nec efficitur nulla congue sed"
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "swiper-slide" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "testimonals-block" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "testimonals-entry" },
                                            _react2.default.createElement("img", { className: "testimonals-img", src: "img/testimonals_2.jpg", alt: "" }),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-name" },
                                                "Jhon Makauer"
                                            ),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-text profes" },
                                                "Philosopher"
                                            ),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-text" },
                                                "Phasellus sem massa, scelerisque at libero sit amet, laoreet placerat erat. Donec dictum sapien ac accumsan luctus. Fusce id euismod diam, quis venenatis ipsum.Quisque lacinia non dui id fermentum. Ut libero nulla"
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "swiper-slide" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "testimonals-block" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "testimonals-entry" },
                                            _react2.default.createElement("img", { className: "testimonals-img", src: "img/testimonals_1.jpg", alt: "" }),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-name" },
                                                "Samara Kechton"
                                            ),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-text profes" },
                                                "Make-up designer"
                                            ),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-text" },
                                                "Nulla id risus urna. Ut commodo leo quis dolor sollicitudin, nec elementum ipsum porta. Duis in nisi nisi. Vestibulum in mauris vitae odio sagittis interdum a ut purus. Suspendisse in molestie leo, at pulvinar massa. Aenean convallis nunc eros, nec efficitur nulla congue sed"
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "div",
                                    { className: "swiper-slide" },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "testimonals-block" },
                                        _react2.default.createElement(
                                            "div",
                                            { className: "testimonals-entry" },
                                            _react2.default.createElement("img", { className: "testimonals-img", src: "img/testimonals_2.jpg", alt: "" }),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-name" },
                                                "Jhon Makauer"
                                            ),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-text profes" },
                                                "Philosopher"
                                            ),
                                            _react2.default.createElement(
                                                "div",
                                                { className: "testimonals-text" },
                                                "Phasellus sem massa, scelerisque at libero sit amet, laoreet placerat erat. Donec dictum sapien ac accumsan luctus. Fusce id euismod diam, quis venenatis ipsum.Quisque lacinia non dui id fermentum. Ut libero nulla"
                                            )
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement("div", { className: "pagination" })
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "clients-block" },
                        _react2.default.createElement(
                            "div",
                            { className: "row" },
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-4 col-sm-2" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/client_1.jpg", alt: "" })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-4  col-sm-2" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/client_2.jpg", alt: "" })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-4  col-sm-2" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/client_3.jpg", alt: "" })
                            ),
                            _react2.default.createElement("div", { className: "clearfix visible-xs-block" }),
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-4  col-sm-2" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/client_4.jpg", alt: "" })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-4  col-sm-2" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/client_5.jpg", alt: "" })
                            ),
                            _react2.default.createElement(
                                "div",
                                { className: "col-xs-4  col-sm-2" },
                                _react2.default.createElement("img", { className: "img-responsive img-full", src: "img/client_6.jpg", alt: "" })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PageAbout;
}(_react.Component);

exports.default = PageAbout;
});

require.register("pages/Actions.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageActions = function (_Component) {
  _inherits(PageActions, _Component);

  function PageActions() {
    _classCallCheck(this, PageActions);

    return _possibleConstructorReturn(this, (PageActions.__proto__ || Object.getPrototypeOf(PageActions)).apply(this, arguments));
  }

  _createClass(PageActions, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { id: "content-block" },
        _react2.default.createElement(
          "div",
          { className: "container-fluid custom-container be-detail-container" },
          _react2.default.createElement(
            "div",
            { className: "subblock" },
            _react2.default.createElement(
              "div",
              { className: "alert style-1 fade in", role: "alert" },
              _react2.default.createElement(
                "button",
                { type: "button", className: "close", "data-dismiss": "alert", "aria-label": "Close" },
                _react2.default.createElement("i", { className: "fa fa-times" })
              ),
              _react2.default.createElement(
                "div",
                { className: "alert-title" },
                "New Unicornt borned!"
              ),
              "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.  Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime."
            ),
            _react2.default.createElement(
              "div",
              { className: "alert style-2 fade in", role: "alert" },
              _react2.default.createElement(
                "button",
                { type: "button", className: "close", "data-dismiss": "alert", "aria-label": "Close" },
                _react2.default.createElement("i", { className: "fa fa-times" })
              ),
              _react2.default.createElement(
                "div",
                { className: "alert-title" },
                "Youve bought Unicorn"
              ),
              "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.  Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime."
            ),
            _react2.default.createElement(
              "div",
              { className: "alert style-3 fade in", role: "alert" },
              _react2.default.createElement(
                "button",
                { type: "button", className: "close", "data-dismiss": "alert", "aria-label": "Close" },
                _react2.default.createElement("i", { className: "fa fa-times" })
              ),
              _react2.default.createElement(
                "div",
                { className: "alert-title" },
                "Sombody loves you"
              ),
              "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.  Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime."
            )
          )
        )
      );
    }
  }]);

  return PageActions;
}(_react.Component);

exports.default = PageActions;
});

require.register("pages/Contact.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageContact = function (_Component) {
  _inherits(PageContact, _Component);

  function PageContact() {
    _classCallCheck(this, PageContact);

    return _possibleConstructorReturn(this, (PageContact.__proto__ || Object.getPrototypeOf(PageContact)).apply(this, arguments));
  }

  _createClass(PageContact, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { id: "content-block" },
        _react2.default.createElement(
          "div",
          { className: "head-bg style-2" },
          _react2.default.createElement(
            "div",
            { className: "head-bg-img" },
            _react2.default.createElement("img", { className: "center-image", src: "img/bg-4.jpg", alt: "" })
          ),
          _react2.default.createElement(
            "div",
            { className: "head-bg-content" },
            _react2.default.createElement(
              "h1",
              null,
              "You may find us easily"
            ),
            _react2.default.createElement(
              "p",
              null,
              "Donec in rhoncus tortor. Sed tristique auctor ligula vel viverra"
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "container be-detail-container" },
          _react2.default.createElement(
            "div",
            { className: "block" },
            _react2.default.createElement(
              "h2",
              { className: "content-title" },
              "Contact Information"
            ),
            _react2.default.createElement(
              "div",
              { className: "block-subtitle" },
              "className aptent taciti sociosqu ad litora torquent per conubia nostra"
            ),
            _react2.default.createElement(
              "div",
              { className: "contact-info block" },
              _react2.default.createElement(
                "div",
                { className: "contact-header" },
                _react2.default.createElement(
                  "div",
                  { className: "row" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-4" },
                    _react2.default.createElement(
                      "div",
                      { className: "contact-entry" },
                      _react2.default.createElement(
                        "h4",
                        { className: "contact-label" },
                        _react2.default.createElement("img", { src: "img/marker.png", alt: "" }),
                        " Contact address"
                      ),
                      _react2.default.createElement(
                        "div",
                        { className: "contact-text" },
                        _react2.default.createElement(
                          "p",
                          null,
                          "Beverly Hills 42, California"
                        ),
                        _react2.default.createElement(
                          "p",
                          null,
                          "New York, Guerlain Street 87"
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-4" },
                    _react2.default.createElement(
                      "div",
                      { className: "contact-entry" },
                      _react2.default.createElement(
                        "h4",
                        { className: "contact-label" },
                        _react2.default.createElement("img", { src: "img/phone-ico.png", alt: "" }),
                        " Phones"
                      ),
                      _react2.default.createElement(
                        "div",
                        { className: "contact-text" },
                        _react2.default.createElement(
                          "p",
                          null,
                          _react2.default.createElement(
                            "a",
                            { href: "tel:+99123456789001" },
                            "+99 (123) 456 789 001"
                          )
                        ),
                        _react2.default.createElement(
                          "p",
                          null,
                          _react2.default.createElement(
                            "a",
                            { href: "tel:+1234556789" },
                            "+1 (23) 45 567 89"
                          )
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-4" },
                    _react2.default.createElement(
                      "div",
                      { className: "contact-entry" },
                      _react2.default.createElement(
                        "h4",
                        { className: "contact-label" },
                        _react2.default.createElement("img", { src: "img/mail-ico.png", alt: "" }),
                        " Email"
                      ),
                      _react2.default.createElement(
                        "div",
                        { className: "contact-text" },
                        _react2.default.createElement(
                          "p",
                          null,
                          _react2.default.createElement(
                            "a",
                            { href: "mailto:#" },
                            "info@unicorn.go"
                          )
                        ),
                        _react2.default.createElement(
                          "p",
                          null,
                          _react2.default.createElement(
                            "a",
                            { href: "mailto:#" },
                            "support@unicorn.go"
                          )
                        )
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement("div", { id: "map-canvas", "data-lat": "40.669096", "data-lng": "-73.987733", "data-zoom": "15" }),
              _react2.default.createElement(
                "div",
                { className: "addresses-block" },
                _react2.default.createElement("a", { "data-lat": "40.669096", "data-lng": "-73.987733", "data-string": "1. Here is some address or email or phone or something else..." })
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "block" },
            _react2.default.createElement(
              "h2",
              { className: "content-title" },
              "Leave a message"
            ),
            _react2.default.createElement(
              "div",
              { className: "block-subtitle" },
              "Maecenas et mollis ligula. Donec finibus feugiat laoreet."
            ),
            _react2.default.createElement(
              "div",
              { className: "contect-form" },
              _react2.default.createElement(
                "form",
                { className: "form-block" },
                _react2.default.createElement(
                  "div",
                  { className: "row" },
                  _react2.default.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-6" },
                    _react2.default.createElement(
                      "div",
                      { className: "form-group fl_icon" },
                      _react2.default.createElement(
                        "div",
                        { className: "icon" },
                        _react2.default.createElement("img", { src: "img/user-g-ico.png", alt: "" })
                      ),
                      _react2.default.createElement("input", { className: "form-input", type: "text", required: "", placeholder: "Your name" })
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-6 fl_icon" },
                    _react2.default.createElement(
                      "div",
                      { className: "form-group fl_icon" },
                      _react2.default.createElement(
                        "div",
                        { className: "icon" },
                        _react2.default.createElement("img", { src: "img/subject-ico.png", alt: "" })
                      ),
                      _react2.default.createElement("input", { className: "form-input", type: "text", required: "", placeholder: "Subject" })
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-6 fl_icon" },
                    _react2.default.createElement(
                      "div",
                      { className: "form-group fl_icon" },
                      _react2.default.createElement(
                        "div",
                        { className: "icon" },
                        _react2.default.createElement("img", { src: "img/mail-g-ico.png", alt: "" })
                      ),
                      _react2.default.createElement("input", { className: "form-input", type: "text", required: "", placeholder: "Your email" })
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-6 fl_icon" },
                    _react2.default.createElement(
                      "div",
                      { className: "form-group fl_icon" },
                      _react2.default.createElement(
                        "div",
                        { className: "icon" },
                        _react2.default.createElement("img", { src: "img/phone-g-ico.png", alt: "" })
                      ),
                      _react2.default.createElement("input", { className: "form-input", type: "text", required: "", placeholder: "Your phone" })
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "col-xs-12" },
                    _react2.default.createElement(
                      "div",
                      { className: "form-group" },
                      _react2.default.createElement("textarea", { className: "form-input", required: "", placeholder: "Your message" })
                    )
                  ),
                  _react2.default.createElement(
                    "button",
                    { className: "btn color-1 size-2 hover-1 pull-right" },
                    "submit"
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PageContact;
}(_react.Component);

exports.default = PageContact;
});

require.register("pages/Faq.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SidebarMenu = require('../components/ui/SidebarMenu');

var _SidebarMenu2 = _interopRequireDefault(_SidebarMenu);

var _ToggleSlide = require('../components/ui/ToggleSlide');

var _ToggleSlide2 = _interopRequireDefault(_ToggleSlide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageFaq = function (_Component) {
  _inherits(PageFaq, _Component);

  function PageFaq() {
    _classCallCheck(this, PageFaq);

    return _possibleConstructorReturn(this, (PageFaq.__proto__ || Object.getPrototypeOf(PageFaq)).apply(this, arguments));
  }

  _createClass(PageFaq, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'content-block' },
        _react2.default.createElement(
          'div',
          { className: 'container be-detail-container' },
          _react2.default.createElement(
            'h2',
            { className: 'content-title' },
            'FAQs'
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'left-feild col-xs-12 col-sm-3' },
              _react2.default.createElement(_SidebarMenu2.default, null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-xs-12 col-sm-9' },
              _react2.default.createElement(
                'div',
                { className: 'accordion style-2' },
                _react2.default.createElement(_ToggleSlide2.default, null),
                _react2.default.createElement(_ToggleSlide2.default, null),
                _react2.default.createElement(_ToggleSlide2.default, null),
                _react2.default.createElement(_ToggleSlide2.default, null),
                _react2.default.createElement(_ToggleSlide2.default, null),
                _react2.default.createElement(_ToggleSlide2.default, null),
                _react2.default.createElement(_ToggleSlide2.default, null),
                _react2.default.createElement(_ToggleSlide2.default, null),
                _react2.default.createElement(_ToggleSlide2.default, null),
                _react2.default.createElement(_ToggleSlide2.default, null),
                _react2.default.createElement(_ToggleSlide2.default, null),
                _react2.default.createElement(_ToggleSlide2.default, null)
              )
            )
          )
        )
      );
    }
  }]);

  return PageFaq;
}(_react.Component);

exports.default = PageFaq;
});

require.register("pages/Filter.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Preview = require('../components/unicorn/Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _SidebarMenu = require('../components/ui/SidebarMenu');

var _SidebarMenu2 = _interopRequireDefault(_SidebarMenu);

var _Search = require('../components/ui/Search');

var _Search2 = _interopRequireDefault(_Search);

var _Dropdown = require('../components/ui/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Tags = require('../components/ui/Tags');

var _Tags2 = _interopRequireDefault(_Tags);

var _SelectColor = require('../components/ui/SelectColor');

var _SelectColor2 = _interopRequireDefault(_SelectColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter() {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).apply(this, arguments));
  }

  _createClass(Filter, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'div',
          { className: 'container-fluid cd-main-content custom-container' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-2 left-feild' },
              _react2.default.createElement(_Search2.default, null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-md-10 ' },
              _react2.default.createElement(
                'div',
                { className: 'for-be-dropdowns' },
                _react2.default.createElement(_Dropdown2.default, null),
                _react2.default.createElement(_Dropdown2.default, null)
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 's_keywords' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid custom-container' },
            _react2.default.createElement(
              'a',
              { className: 'btn color-1 size-3 hover-10' },
              _react2.default.createElement('i', { className: 'fa fa-trash-o' }),
              'clear all filters'
            ),
            _react2.default.createElement(
              'a',
              { className: 'btn color-6 size-3 hover-10' },
              'gen-0 ',
              _react2.default.createElement('i', { className: 'fa keyword fa-times' })
            ),
            _react2.default.createElement(
              'a',
              { className: 'btn color-6 size-3 hover-10' },
              'nice ',
              _react2.default.createElement('i', { className: 'fa keyword fa-times' })
            ),
            _react2.default.createElement(
              'a',
              { className: 'btn color-6 size-3 hover-10' },
              'swift ',
              _react2.default.createElement('i', { className: 'fa keyword fa-times' })
            ),
            _react2.default.createElement(
              'a',
              { className: 'btn color-6 size-3 hover-10' },
              '#ffffff ',
              _react2.default.createElement('i', { className: 'fa keyword fa-times' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'container-fluid custom-container' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-md-2 left-feild' },
              _react2.default.createElement(_SidebarMenu2.default, null),
              _react2.default.createElement(
                'div',
                { className: 'be-vidget' },
                _react2.default.createElement(
                  'h3',
                  { className: 'letf-menu-article' },
                  'Popular Tags'
                ),
                _react2.default.createElement(_Tags2.default, null)
              ),
              _react2.default.createElement(
                'div',
                { className: 'be-vidget' },
                _react2.default.createElement(
                  'h3',
                  { className: 'letf-menu-article' },
                  'More Filtres'
                ),
                _react2.default.createElement(_SelectColor2.default, null)
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-md-10' },
              _react2.default.createElement(
                'div',
                { id: 'container-mix', className: 'row _post-container_' },
                _react2.default.createElement(
                  'div',
                  { className: 'category-1 mix custom-column-5' },
                  _react2.default.createElement(_Preview2.default, null)
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-2 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'fast ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-3 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'swift ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-4 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'slow ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-clock-o' }),
                        ' > 24h.'
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-5 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'extra ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-clock-o' }),
                        ' ... '
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-6 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'extra ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-5 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'extra ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-3 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'extra ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-2 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'extra ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-4 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'extra ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-6 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'extra ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-2 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'extra ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-1 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'extra ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-3 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'extra ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'category-1 mix custom-column-5' },
                  _react2.default.createElement(
                    'div',
                    { className: 'be-post' },
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-tag' }),
                        ' 0.042 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        'extra ',
                        _react2.default.createElement('i', { className: 'fa fa-info-circle' }),
                        _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                        ' 0.00093 ',
                        _react2.default.createElement('i', { className: 'fa fa-btc' })
                      )
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '#', className: 'be-img-block' },
                      _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: 'page1.html', className: 'be-post-title' },
                      'Mr. Incredible Unicorn'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'just_part' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                        ' +23.4453'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                        ' Gen-1'
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Nice'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Gute'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Usual'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Just'
                      ),
                      ',',
                      _react2.default.createElement(
                        'a',
                        { href: '#', className: 'be-post-tag' },
                        'Angry'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'author-post' },
                      _react2.default.createElement('img', { src: 'img/a1.png', alt: '', className: 'ava-author' }),
                      _react2.default.createElement(
                        'span',
                        null,
                        'by ',
                        _react2.default.createElement(
                          'a',
                          { href: 'page1.html' },
                          'Alex Alexeev ',
                          _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('i', { className: 'fa fa-globe' }),
                            ' USA'
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'info-block' },
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                        ' 360'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-eye' }),
                        ' 789'
                      ),
                      _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                        ' 20'
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Filter;
}(_react.Component);

exports.default = Filter;
});

require.register("pages/Hero.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loginPopup = require('../actions/login-popup');

var _account = require('../actions/account');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var signUpStep = function signUpStep(metamask, loginPopup) {
  if (loginPopup.isOpen) {
    if (metamask.isOn) {
      if (metamask.network === 'main') {
        if (metamask.account !== undefined) {
          return 4;
        } else {
          return 5;
        }
      } else {
        return 3;
      }
    } else {
      return 2;
    }
  } else {
    return 1;
  }
};

var heroHeader = {
  1: ['#1 Welcome to KickAss blockchain game', '#1 Do not miss the revolution that is happening right now with UnicornGO!'],
  2: ['#2 Welcome to KickAss blockchain game', '#2 Do not miss the revolution that is happening right now with UnicornGO!'],
  3: ['#3 Welcome to KickAss blockchain game', '#3 Do not miss the revolution that is happening right now with UnicornGO!'],
  4: ['#4 Welcome to KickAss blockchain game', '#4 Do not miss the revolution that is happening right now with UnicornGO!'],
  5: ['#5 Welcome to KickAss blockchain game', '#5 Do not miss the revolution that is happening right now with UnicornGO!']
};

var Hero = function (_Component) {
  _inherits(Hero, _Component);

  function Hero(props) {
    _classCallCheck(this, Hero);

    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, props));

    _this.handleSignUp = _this.handleSignUp.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.state = {
      name: '',
      email: ''
    };
    return _this;
  }

  _createClass(Hero, [{
    key: 'handleSignUp',
    value: function handleSignUp(event) {
      event.preventDefault();
      this.props.dispatch((0, _loginPopup.showLoginPopup)());
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState(_defineProperty({}, event.target.name, event.target.value));
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      var _state = this.state,
          name = _state.name,
          email = _state.email;

      var wallet = this.props.metamask.account;
      this.props.dispatch((0, _account.signUp)(name, email, wallet));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          metamask = _props.metamask,
          loginPopup = _props.loginPopup;

      var step = signUpStep(metamask, loginPopup);
      return _react2.default.createElement(
        'div',
        { className: 'head-bg' },
        _react2.default.createElement('div', { className: 'head-bg-img' }),
        _react2.default.createElement(
          'div',
          { className: 'head-bg-content' },
          _react2.default.createElement(
            'h1',
            null,
            heroHeader[step][0]
          ),
          _react2.default.createElement(
            'p',
            null,
            heroHeader[step][1]
          ),
          step === 1 && _react2.default.createElement(
            'div',
            { className: 'step' },
            _react2.default.createElement(
              'a',
              { className: 'be-register btn color-3 size-1 hover-6', onClick: this.handleSignUp },
              _react2.default.createElement('i', { className: 'fa fa-lock' }),
              'sign up now'
            )
          ),
          step === 2 && _react2.default.createElement(
            'div',
            { className: 'step' },
            _react2.default.createElement(
              'div',
              { className: 'head-bg-video' },
              _react2.default.createElement('iframe', { width: '560', height: '315', src: 'https://www.youtube.com/embed/tfETpi-9ORs?rel=0', frameBorder: '0', allow: 'autoplay; encrypted-media', allowFullScreen: true })
            ),
            _react2.default.createElement(
              'a',
              { className: 'be-register btn color-1 size-1 hover-6' },
              _react2.default.createElement('i', { className: 'fa fa-cloud-download' }),
              'install metamask'
            ),
            _react2.default.createElement(
              'a',
              { className: 'be-register btn color-3 size-1 hover-6' },
              _react2.default.createElement('i', { className: 'fa fa-thumbs-up' }),
              'i had metamask'
            )
          ),
          step === 3 && _react2.default.createElement(
            'div',
            { className: 'step' },
            _react2.default.createElement('img', { src: 'img/wrong-network.png', alt: '' })
          ),
          step === 4 && _react2.default.createElement(
            'div',
            { className: 'step' },
            _react2.default.createElement(
              'form',
              { className: 'form-block register_me', onSubmit: this.handleSubmit },
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 col-sm-12' },
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group fl_icon' },
                    _react2.default.createElement(
                      'div',
                      { className: 'icon' },
                      _react2.default.createElement('img', { src: 'img/subject-ico.png', alt: '' })
                    ),
                    _react2.default.createElement('input', {
                      className: 'form-input',
                      type: 'text',
                      required: '',
                      readOnly: true,
                      placeholder: 'Your Wallet',
                      value: metamask.account
                    })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 col-sm-6 fl_icon' },
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group fl_icon' },
                    _react2.default.createElement(
                      'div',
                      { className: 'icon' },
                      _react2.default.createElement('img', { src: 'img/user-g-ico.png', alt: '' })
                    ),
                    _react2.default.createElement('input', {
                      className: 'form-input',
                      name: 'name',
                      type: 'text',
                      required: '',
                      value: this.state.name,
                      placeholder: 'Your Name',
                      onChange: this.handleChange
                    })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-xs-12 col-sm-6 fl_icon' },
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group fl_icon' },
                    _react2.default.createElement(
                      'div',
                      { className: 'icon' },
                      _react2.default.createElement('img', { src: 'img/mail-g-ico.png', alt: '' })
                    ),
                    _react2.default.createElement('input', {
                      className: 'form-input',
                      name: 'email',
                      type: 'text',
                      required: '',
                      value: this.state.email,
                      placeholder: 'Your email',
                      onChange: this.handleChange
                    })
                  )
                ),
                _react2.default.createElement(
                  'button',
                  { className: 'btn color-1 size-2 hover-1 pull-right' },
                  'submit'
                )
              )
            )
          ),
          step === 5 && _react2.default.createElement(
            'div',
            { className: 'step' },
            _react2.default.createElement('img', { src: 'img/login-metamask.png', alt: '' })
          )
        )
      );
    }
  }]);

  return Hero;
}(_react.Component);

exports.default = Hero;
});

require.register("pages/Laboratory.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageLaboratory = function (_Component) {
  _inherits(PageLaboratory, _Component);

  function PageLaboratory() {
    _classCallCheck(this, PageLaboratory);

    return _possibleConstructorReturn(this, (PageLaboratory.__proto__ || Object.getPrototypeOf(PageLaboratory)).apply(this, arguments));
  }

  _createClass(PageLaboratory, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { id: "content-block", className: "work-box" },
        _react2.default.createElement(
          "div",
          { className: "editor-menu" },
          _react2.default.createElement(
            "div",
            { className: "container" },
            _react2.default.createElement(
              "ul",
              { className: "editor-nav" },
              _react2.default.createElement(
                "li",
                { id: "content-w", className: "en-nav active" },
                "1. Content"
              ),
              _react2.default.createElement(
                "li",
                { id: "cover-w", className: "en-nav" },
                "2. Cover"
              ),
              _react2.default.createElement(
                "li",
                { id: "setting-w", className: "en-nav" },
                "3. Setting"
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "buttons-navbar" },
              _react2.default.createElement(
                "button",
                { type: "button", className: "btn btn-default" },
                "Previous"
              ),
              _react2.default.createElement(
                "button",
                { type: "button", className: "btn btn-primary" },
                "Save"
              ),
              _react2.default.createElement(
                "button",
                { type: "button", className: "btn btn-success" },
                "Next"
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "work-area" },
          _react2.default.createElement(
            "div",
            { className: "cover-popup" },
            _react2.default.createElement(
              "div",
              { className: "cover-box" },
              _react2.default.createElement(
                "form",
                { action: "#" },
                _react2.default.createElement("img", { src: "https://mir-s3-cdn-cf.behance.net/projects/202/b252d929064253.55e0104b21931.png", alt: "" }),
                _react2.default.createElement("textarea", { placeholder: "Title Project" })
              ),
              _react2.default.createElement(
                "a",
                { href: "#", className: "anothel-upload" },
                _react2.default.createElement("i", { className: "fa fa-cloud-upload" }),
                " Upload New Image"
              ),
              _react2.default.createElement("input", { className: "file", type: "file" }),
              _react2.default.createElement("br", null),
              _react2.default.createElement(
                "div",
                { className: "btn-row" },
                _react2.default.createElement(
                  "button",
                  { type: "button", className: "btn btn-primary" },
                  "Cancel"
                ),
                _react2.default.createElement(
                  "button",
                  { type: "button", className: "btn btn-success" },
                  "Continue"
                )
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "setting-popup" },
            _react2.default.createElement(
              "div",
              { className: "cover-box s-cover-box" },
              _react2.default.createElement(
                "div",
                { className: "setting-form" },
                _react2.default.createElement(
                  "form",
                  null,
                  _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                      "label",
                      { htmlFor: "in1" },
                      "Creative Fields"
                    ),
                    _react2.default.createElement("input", { type: "text", className: "form-control", id: "in1" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                      "label",
                      null,
                      "Project Tags"
                    ),
                    _react2.default.createElement("textarea", null)
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "form-group" },
                    _react2.default.createElement(
                      "label",
                      null,
                      "Email address"
                    ),
                    _react2.default.createElement("textarea", null)
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "setting-block" },
                _react2.default.createElement(
                  "div",
                  { className: "settings-row cfix" },
                  _react2.default.createElement(
                    "div",
                    { className: "left settings-label" },
                    "Extra Info:"
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "left settings-option" },
                    _react2.default.createElement(
                      "div",
                      { className: "settings-sub-option cfix" },
                      _react2.default.createElement(
                        "div",
                        { className: "left settings-note st-label" },
                        _react2.default.createElement(
                          "span",
                          { className: "grey" },
                          "For a Brand/Company"
                        )
                      ),
                      _react2.default.createElement(
                        "div",
                        { className: "right fake-link", id: "add-brand" },
                        "+ Add Brand"
                      )
                    ),
                    _react2.default.createElement(
                      "div",
                      { className: "settings-sub-option cfix" },
                      _react2.default.createElement(
                        "div",
                        { className: "left settings-note st-label" },
                        _react2.default.createElement(
                          "span",
                          { className: "grey" },
                          "For an Agency"
                        )
                      ),
                      _react2.default.createElement(
                        "div",
                        { className: "right fake-link", id: "add-agency" },
                        "+ Add Agency"
                      )
                    ),
                    _react2.default.createElement(
                      "div",
                      { className: "settings-sub-option cfix" },
                      _react2.default.createElement(
                        "div",
                        { className: "left settings-note st-label" },
                        _react2.default.createElement(
                          "span",
                          { className: "grey" },
                          "For a School"
                        )
                      ),
                      _react2.default.createElement(
                        "div",
                        { className: "right fake-link", id: "add-school" },
                        "+ Add School"
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "left settings-label" },
                    "Tools Used:"
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "left settings-option" },
                    _react2.default.createElement(
                      "div",
                      { className: "settings-sub-option cfix" },
                      _react2.default.createElement(
                        "div",
                        { className: "left settings-note st-label" },
                        _react2.default.createElement(
                          "span",
                          { className: "grey" },
                          "Software, Hardware, Materials..."
                        )
                      ),
                      _react2.default.createElement(
                        "div",
                        { className: "right fake-link", id: "tools" },
                        "+ Add Tools"
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "left settings-label" },
                    "For a Team:"
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "left settings-option" },
                    _react2.default.createElement(
                      "div",
                      { className: "settings-sub-option cfix" },
                      _react2.default.createElement(
                        "div",
                        { className: "left settings-note st-label" },
                        _react2.default.createElement(
                          "span",
                          { className: "grey" },
                          "This project isnt on any team."
                        )
                      ),
                      _react2.default.createElement(
                        "div",
                        { className: "right fake-link", id: "team" },
                        "+ Add Team"
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "popup-buttons right-buttons" },
                _react2.default.createElement(
                  "button",
                  { type: "button", className: "btn btn-primary" },
                  "Save Changes"
                ),
                _react2.default.createElement(
                  "button",
                  { type: "button", className: "btn btn-success" },
                  "Publish"
                )
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "container be-detail-container" },
            _react2.default.createElement(
              "div",
              { className: "row" },
              _react2.default.createElement(
                "div",
                { className: "col-xs-12 col-md-3 st-col left-feild" },
                _react2.default.createElement(
                  "div",
                  { className: "be-vidget behance-style" },
                  _react2.default.createElement(
                    "h3",
                    { className: "letf-menu-article" },
                    "ADD MEDIA"
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "creative_filds_block" },
                    _react2.default.createElement(
                      "ul",
                      { className: "ul nav b-work-list" },
                      _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                          "a",
                          { href: "#" },
                          _react2.default.createElement("i", { className: "fa fa-cloud-upload" }),
                          "Upload Files"
                        ),
                        _react2.default.createElement("input", { className: "file", type: "file" })
                      ),
                      _react2.default.createElement(
                        "li",
                        { id: "media" },
                        _react2.default.createElement(
                          "a",
                          { href: "#" },
                          _react2.default.createElement("i", { className: "fa fa-pencil-square-o" }),
                          "Embed media"
                        )
                      ),
                      _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                          "a",
                          { href: "#" },
                          _react2.default.createElement("i", { className: "fa fa-text-width" }),
                          "Add text"
                        )
                      ),
                      _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                          "a",
                          { href: "#" },
                          _react2.default.createElement("i", { className: "fa fa-cloud" }),
                          "Creative cloud"
                        )
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "be-vidget  behance-style" },
                  _react2.default.createElement(
                    "h3",
                    { className: "letf-menu-article" },
                    "CUSTOMIZE DESIGN"
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "creative_filds_block" },
                    _react2.default.createElement(
                      "ul",
                      { className: "ul nav b-work-list b-work-list-no" },
                      _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                          "a",
                          { className: "open-custom", href: "#" },
                          "Dividers & Spacing ",
                          _react2.default.createElement("i", { className: "fa fa-chevron-down" })
                        ),
                        _react2.default.createElement(
                          "div",
                          { className: "inner-filter-info" },
                          _react2.default.createElement(
                            "div",
                            { className: "inner-filter-inner inner-d" },
                            _react2.default.createElement("input", { type: "radio", id: "d1", className: "ch", name: "divider" }),
                            _react2.default.createElement(
                              "label",
                              { htmlFor: "d1" },
                              "No Divider"
                            )
                          ),
                          _react2.default.createElement(
                            "div",
                            { className: "inner-filter-inner inner-d" },
                            _react2.default.createElement(
                              "div",
                              { className: "label-box " },
                              _react2.default.createElement("input", { type: "radio", id: "d2", className: "ch", name: "divider" }),
                              _react2.default.createElement("label", { htmlFor: "d2" })
                            ),
                            _react2.default.createElement(
                              "div",
                              { className: "label-box" },
                              _react2.default.createElement("input", { type: "radio", id: "d3", className: "ch", name: "divider" }),
                              _react2.default.createElement("label", { htmlFor: "d3" })
                            ),
                            _react2.default.createElement(
                              "div",
                              { className: "label-box" },
                              _react2.default.createElement("input", { type: "radio", id: "d4", className: "ch", name: "divider" }),
                              _react2.default.createElement("label", { htmlFor: "d4" })
                            )
                          ),
                          _react2.default.createElement(
                            "div",
                            { className: "inner-filter-inner inner-filter-inner-mod" },
                            _react2.default.createElement(
                              "span",
                              null,
                              "Spacing"
                            ),
                            _react2.default.createElement(
                              "div",
                              { className: "range" },
                              _react2.default.createElement("div", { className: "slider-range-max", id: "slider-range-max" }),
                              _react2.default.createElement("input", { type: "text", className: "amount", id: "amount", readOnly: true })
                            )
                          ),
                          _react2.default.createElement(
                            "div",
                            { className: "inner-filter-inner inner-filter-inner-mod" },
                            _react2.default.createElement(
                              "span",
                              null,
                              "Header"
                            ),
                            _react2.default.createElement(
                              "div",
                              { className: "range" },
                              _react2.default.createElement("div", { className: "slider-range-max", id: "slider-head" }),
                              _react2.default.createElement("input", { type: "text", className: "amount", id: "amount-h", readOnly: true })
                            )
                          ),
                          _react2.default.createElement(
                            "div",
                            { className: "inner-filter-inner" },
                            _react2.default.createElement(
                              "span",
                              null,
                              "Color"
                            ),
                            " ",
                            _react2.default.createElement("input", { className: "color-i no-alpha", value: "#B6BD79" })
                          )
                        )
                      ),
                      _react2.default.createElement(
                        "li",
                        null,
                        _react2.default.createElement(
                          "a",
                          { className: "open-custom", href: "#" },
                          "Background ",
                          _react2.default.createElement("i", { className: "fa fa-chevron-down" })
                        ),
                        _react2.default.createElement(
                          "div",
                          { className: "inner-filter-info" },
                          _react2.default.createElement(
                            "div",
                            { className: "inner-filter-inner " },
                            _react2.default.createElement(
                              "span",
                              null,
                              "Color"
                            ),
                            " ",
                            _react2.default.createElement("input", { id: "color", className: "color-i no-alpha", value: "#B6BD79" })
                          ),
                          _react2.default.createElement(
                            "div",
                            { className: "inner-filter-inner" },
                            _react2.default.createElement(
                              "span",
                              null,
                              "Image"
                            ),
                            _react2.default.createElement(
                              "div",
                              { className: "up-image" },
                              "image",
                              _react2.default.createElement("input", { className: "file", type: "file" })
                            )
                          )
                        )
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "col-xs-12 col-md-9 _editor-content_" },
                _react2.default.createElement(
                  "div",
                  { className: "sec", "data-sec": "basic-information" },
                  _react2.default.createElement(
                    "div",
                    { className: "be-large-post large-area" },
                    _react2.default.createElement(
                      "div",
                      { className: "info-block style-2" },
                      _react2.default.createElement(
                        "div",
                        { className: "be-large-post-align " },
                        _react2.default.createElement(
                          "h3",
                          { className: "info-block-label" },
                          "Work name"
                        )
                      )
                    ),
                    _react2.default.createElement(
                      "div",
                      { className: "be-large-post-align" },
                      _react2.default.createElement(
                        "div",
                        { className: "upload-zone" },
                        _react2.default.createElement("i", { className: "fa center-i fa-cloud-upload" }),
                        _react2.default.createElement("input", { className: "file", type: "file" })
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PageLaboratory;
}(_react.Component);

exports.default = PageLaboratory;
});

require.register("pages/Marketplace.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Hero = require('./Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Filter = require('./Filter');

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    account: state.account,
    loginPopup: state.loginPopup
  };
};

var Marketplace = function (_Component) {
  _inherits(Marketplace, _Component);

  function Marketplace() {
    _classCallCheck(this, Marketplace);

    return _possibleConstructorReturn(this, (Marketplace.__proto__ || Object.getPrototypeOf(Marketplace)).apply(this, arguments));
  }

  _createClass(Marketplace, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          account = _props.account,
          dispatch = _props.dispatch,
          metamask = _props.metamask,
          loginPopup = _props.loginPopup;

      return _react2.default.createElement(
        'div',
        { id: 'content-block' },
        !account && _react2.default.createElement(_Hero2.default, {
          dispatch: dispatch,
          metamask: metamask,
          loginPopup: loginPopup
        }),
        _react2.default.createElement(_Filter2.default, null)
      );
    }
  }]);

  return Marketplace;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Marketplace);
});

require.register("pages/Privacy_policy.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PagePrivacy_policy = function (_Component) {
  _inherits(PagePrivacy_policy, _Component);

  function PagePrivacy_policy() {
    _classCallCheck(this, PagePrivacy_policy);

    return _possibleConstructorReturn(this, (PagePrivacy_policy.__proto__ || Object.getPrototypeOf(PagePrivacy_policy)).apply(this, arguments));
  }

  _createClass(PagePrivacy_policy, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { id: "content-block" },
        _react2.default.createElement(
          "div",
          { className: "container be-detail-container" },
          _react2.default.createElement(
            "div",
            { className: "blog-wrapper blog-list blog-fullwith" },
            _react2.default.createElement(
              "div",
              { className: "row" },
              _react2.default.createElement(
                "div",
                { className: "col-xs-12 col-md-10 col-md-offset-1" },
                _react2.default.createElement(
                  "div",
                  { className: "blog-post be-large-post type-2" },
                  _react2.default.createElement(
                    "div",
                    { className: "be-large-post-align blog-content" },
                    _react2.default.createElement(
                      "div",
                      { className: "be-text-tags clearfix custom-a-b" },
                      _react2.default.createElement(
                        "div",
                        { className: "post-date" },
                        _react2.default.createElement("i", { className: "fa fa-clock-o" }),
                        " January 01, 2018"
                      ),
                      _react2.default.createElement(
                        "div",
                        { className: "author-post" },
                        _react2.default.createElement("img", { src: "img/a1.png", alt: "", className: "ava-author" }),
                        _react2.default.createElement(
                          "span",
                          null,
                          "by ",
                          _react2.default.createElement(
                            "a",
                            { href: "#" },
                            "Hoang Nguyen"
                          )
                        )
                      )
                    ),
                    _react2.default.createElement(
                      "h3",
                      { className: "be-post-title" },
                      "Privacy Policy"
                    ),
                    _react2.default.createElement(
                      "div",
                      { className: "post-text" },
                      _react2.default.createElement(
                        "p",
                        null,
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec felis efficitur, lobortis erat et, placerat elit. Proin at ligula lorem. In viverra neque auctor metus consectetur varius. Cras sollicitudin arcu eu tincidunt tristique. Donec accumsan hendrerit nunc sit amet interdum. Donec rhoncus a lacus quis imperdiet.Nam tempus vitae sem pellentesque aliquam."
                      )
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "embed-responsive embed-responsive-16by9" },
                    _react2.default.createElement("iframe", { src: "https://player.vimeo.com/video/63528500" })
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "blog-content be-large-post-align" },
                    _react2.default.createElement(
                      "div",
                      { className: "post-text " },
                      _react2.default.createElement(
                        "p",
                        null,
                        "Phasellus feugiat pulvinar sagittis. Vivamus sit amet purus quis magna laoreet suscipit in sit amet nisl. Etiam tempus tortor in interdum consectetur. Etiam gravida tellus leo. Mauris pulvinar ut leo in varius. Mauris iaculis bibendum tempus. Proin eget dolor lobortis, facilisis nisi sit amet, varius quam. Nam eu facilisis lorem. In hac habitasse platea dictumst. Aenean enim massa, viverra in diam ac, gravida egestas risus."
                      ),
                      _react2.default.createElement(
                        "p",
                        null,
                        "Morbi quis ante erat. Nulla sodales, diam at accumsan mattis, dolor eros accumsan nisi, non porttitor ipsum nunc sit amet dolor.Duis vehicula odio sed consectetur tincidunt. Vestibulum vitae elementum ipsum. Nam porttitor quam vitae ex sollicitudin, bibendum fermentum nulla aliquet. Proin gravida ac risus eu scelerisque. Cras placerat vehicula arcu sed luctus."
                      ),
                      _react2.default.createElement("img", { className: "img-leftblog", src: "img/blog_img_3.jpg", alt: "" }),
                      _react2.default.createElement(
                        "p",
                        null,
                        "Sed laoreet tincidunt purus, tempus viverra sapien fringilla sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec in sem lectus. Sed ut augue suscipit, vehicula ante sit amet"
                      ),
                      _react2.default.createElement(
                        "p",
                        null,
                        "Sed laoreet tincidunt purus, tempus viverra sapien fringilla sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec in sem lectus. Sed ut augue suscipit, vehicula ante sit amet"
                      ),
                      _react2.default.createElement(
                        "p",
                        null,
                        "Sed laoreet tincidunt purus, tempus viverra sapien fringilla sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec in sem lectus. Sed ut augue suscipit, vehicula ante sit amet"
                      ),
                      _react2.default.createElement(
                        "p",
                        null,
                        "Quisque eget cursus nulla, sit amet sodales odio. Phasellus faucibus efficitur est a posuere. Donec tristique nisl eu ornare fringilla. Vivamus lacinia accumsan odio, in semper nunc.  Donec tristique nisl eu ornare fringilla. Vivamus lacinia accumsan odio, in semper nunc"
                      ),
                      _react2.default.createElement(
                        "p",
                        null,
                        "Aliquam et sem quis risus ornare ullamcorper eu non elit. In egestas porttitor hendrerit. Fusce lacinia iaculis nibh, quis consectetur neque volutpat nec."
                      ),
                      _react2.default.createElement("img", { className: "img-fullblog", src: "img/blog_img_4.jpg", alt: "" }),
                      _react2.default.createElement(
                        "p",
                        null,
                        "Duis vehicula odio sed consectetur tincidunt. Vestibulum vitae elementum ipsum. Nam porttitor quam vitae ex sollicitudin, bibendum fermentum nulla aliquet. Proin gravida ac risus eu scelerisque. Cras placerat vehicula arcu sed luctus. Vivamus ullamcorper convallis tortor in faucibus. tempus. Eget pharetra ex interdum."
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PagePrivacy_policy;
}(_react.Component);

exports.default = PagePrivacy_policy;
});

require.register("pages/Stock.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageStock = function (_Component) {
  _inherits(PageStock, _Component);

  function PageStock() {
    _classCallCheck(this, PageStock);

    return _possibleConstructorReturn(this, (PageStock.__proto__ || Object.getPrototypeOf(PageStock)).apply(this, arguments));
  }

  _createClass(PageStock, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { id: "content-block" },
        _react2.default.createElement(
          "div",
          { className: "container-fluid be-detail-container" },
          _react2.default.createElement(
            "div",
            { className: "row" },
            _react2.default.createElement(
              "div",
              { className: "col-xs-12 col-lg-12" },
              _react2.default.createElement(
                "div",
                { className: "be-large-post" },
                _react2.default.createElement(
                  "div",
                  { className: "info-block style-2" },
                  _react2.default.createElement(
                    "div",
                    { className: "be-large-post-align" },
                    _react2.default.createElement(
                      "div",
                      { className: "info-block-right" },
                      "in last ",
                      _react2.default.createElement(
                        "span",
                        { className: "num-data" },
                        "30"
                      ),
                      " days"
                    ),
                    _react2.default.createElement(
                      "h3",
                      { className: "info-block-label" },
                      "Unicorn Rating"
                    )
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { className: "be-large-post-align" },
                  _react2.default.createElement(
                    "div",
                    { className: "table-responsive" },
                    _react2.default.createElement(
                      "table",
                      { className: "table table-sotring tablesorter" },
                      _react2.default.createElement(
                        "thead",
                        null,
                        _react2.default.createElement(
                          "tr",
                          null,
                          _react2.default.createElement(
                            "th",
                            { className: "col-xs-1 text-center" },
                            _react2.default.createElement(
                              "span",
                              null,
                              _react2.default.createElement("i", { className: "fa fa-line-chart" }),
                              _react2.default.createElement("i", { className: "fa fa-chevron-up" })
                            )
                          ),
                          _react2.default.createElement(
                            "th",
                            { className: "col-xs-4" },
                            "Unicorn ",
                            _react2.default.createElement("i", { className: "fa fa-clock-o" }),
                            " ",
                            _react2.default.createElement("i", { className: "fa fa-chevron-down" })
                          ),
                          _react2.default.createElement(
                            "th",
                            { className: "col-xs-1 text-center" },
                            _react2.default.createElement("i", { className: "fa fa-heart-o" }),
                            " ",
                            _react2.default.createElement("i", { className: "fa fa-chevron-down" })
                          ),
                          _react2.default.createElement(
                            "th",
                            { className: "col-xs-1 text-center" },
                            _react2.default.createElement("i", { className: "fa fa fa-eye" }),
                            " ",
                            _react2.default.createElement("i", { className: "fa fa-chevron-down" })
                          ),
                          _react2.default.createElement(
                            "th",
                            { className: "col-xs-1 text-center" },
                            _react2.default.createElement("i", { className: "fa fa-comment-o" }),
                            " ",
                            _react2.default.createElement("i", { className: "fa fa-chevron-down" })
                          ),
                          _react2.default.createElement(
                            "th",
                            { className: "col-xs-1 text-center" },
                            _react2.default.createElement("i", { className: "fa fa-btc " }),
                            " ",
                            _react2.default.createElement("i", { className: "fa fa-chevron-down" })
                          ),
                          _react2.default.createElement(
                            "th",
                            { className: "col-xs-5" },
                            "Owners Story "
                          )
                        )
                      ),
                      _react2.default.createElement(
                        "tbody",
                        null,
                        _react2.default.createElement(
                          "tr",
                          null,
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "+200.456"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "col-xs-4" },
                            _react2.default.createElement(
                              "div",
                              { className: "t_project clearfix" },
                              _react2.default.createElement(
                                "a",
                                { href: "blog-detail-2.html" },
                                _react2.default.createElement("img", { className: "t_project-img", src: "img/t_project_1.jpg", alt: "" })
                              ),
                              _react2.default.createElement(
                                "div",
                                { className: "t_project-desc" },
                                _react2.default.createElement(
                                  "a",
                                  { className: "t_project-title", href: "blog-detail-2.html" },
                                  "Mr Unicorn III"
                                ),
                                _react2.default.createElement(
                                  "div",
                                  { className: "t_project-date" },
                                  _react2.default.createElement("i", { className: "fa fa-clock-o" }),
                                  " May 27, 2015"
                                )
                              )
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "41"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "15"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "30"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "420.456"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            null,
                            _react2.default.createElement(
                              "a",
                              { className: "t_project_icon", href: "blog-detail-2.html" },
                              _react2.default.createElement("img", { src: "img/project_1.jpg", alt: "" })
                            ),
                            _react2.default.createElement(
                              "a",
                              { className: "t_project_icon", href: "blog-detail-2.html" },
                              _react2.default.createElement("img", { src: "img/project_2.jpg", alt: "" })
                            )
                          )
                        ),
                        _react2.default.createElement(
                          "tr",
                          null,
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "+200.456"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "col-xs-4" },
                            _react2.default.createElement(
                              "div",
                              { className: "t_project clearfix" },
                              _react2.default.createElement(
                                "a",
                                { href: "blog-detail-2.html" },
                                _react2.default.createElement("img", { className: "t_project-img", src: "img/t_project_2.jpg", alt: "" })
                              ),
                              _react2.default.createElement(
                                "div",
                                { className: "t_project-desc" },
                                _react2.default.createElement(
                                  "a",
                                  { className: "t_project-title", href: "#" },
                                  "Vincent van Goge"
                                ),
                                _react2.default.createElement(
                                  "div",
                                  { className: "t_project-date" },
                                  _react2.default.createElement("i", { className: "fa fa-clock-o" }),
                                  " May 27, 2015"
                                )
                              )
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "39"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "23"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "102"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "54.456"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            null,
                            _react2.default.createElement(
                              "a",
                              { className: "t_project_icon", href: "blog-detail-2.html" },
                              _react2.default.createElement("img", { src: "img/project_1.jpg", alt: "" })
                            )
                          )
                        ),
                        _react2.default.createElement(
                          "tr",
                          null,
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "+200.456"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "col-xs-4" },
                            _react2.default.createElement(
                              "div",
                              { className: "t_project clearfix" },
                              _react2.default.createElement(
                                "a",
                                { href: "blog-detail-2.html" },
                                _react2.default.createElement("img", { className: "t_project-img", src: "img/t_project_3.jpg", alt: "" })
                              ),
                              _react2.default.createElement(
                                "div",
                                { className: "t_project-desc" },
                                _react2.default.createElement(
                                  "a",
                                  { className: "t_project-title", href: "blog-detail-2.html" },
                                  "Satoshi"
                                ),
                                _react2.default.createElement(
                                  "div",
                                  { className: "t_project-date" },
                                  _react2.default.createElement("i", { className: "fa fa-clock-o" }),
                                  " May 27, 2015"
                                )
                              )
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "32"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "78"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "5"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "122.456"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            null,
                            _react2.default.createElement(
                              "a",
                              { className: "t_project_icon", href: "blog-detail-2.html" },
                              _react2.default.createElement("img", { src: "img/project_1.jpg", alt: "" })
                            ),
                            _react2.default.createElement(
                              "a",
                              { className: "t_project_icon", href: "blog-detail-2.html" },
                              _react2.default.createElement("img", { src: "img/project_2.jpg", alt: "" })
                            )
                          )
                        ),
                        _react2.default.createElement(
                          "tr",
                          null,
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "+200.456"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "col-xs-4" },
                            _react2.default.createElement(
                              "div",
                              { className: "t_project clearfix" },
                              _react2.default.createElement(
                                "a",
                                { href: "blog-detail-2.html" },
                                _react2.default.createElement("img", { className: "t_project-img", src: "img/t_project_4.jpg", alt: "" })
                              ),
                              _react2.default.createElement(
                                "div",
                                { className: "t_project-desc" },
                                _react2.default.createElement(
                                  "a",
                                  { className: "t_project-title", href: "blog-detail-2.html" },
                                  "Model #45354342234"
                                ),
                                _react2.default.createElement(
                                  "div",
                                  { className: "t_project-date" },
                                  _react2.default.createElement("i", { className: "fa fa-clock-o" }),
                                  " May 27, 2015"
                                )
                              )
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "11"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "20"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "46"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            { className: "text-center" },
                            _react2.default.createElement(
                              "strong",
                              null,
                              "230.456"
                            )
                          ),
                          _react2.default.createElement(
                            "td",
                            null,
                            _react2.default.createElement(
                              "a",
                              { className: "t_project_icon", href: "blog-detail-2.html" },
                              _react2.default.createElement("img", { src: "img/project_1.jpg", alt: "" })
                            ),
                            _react2.default.createElement(
                              "a",
                              { className: "t_project_icon", href: "blog-detail-2.html" },
                              _react2.default.createElement("img", { src: "img/project_4.jpg", alt: "" })
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PageStock;
}(_react.Component);

exports.default = PageStock;
});

require.register("pages/Support.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageSupport = function (_Component) {
  _inherits(PageSupport, _Component);

  function PageSupport() {
    _classCallCheck(this, PageSupport);

    return _possibleConstructorReturn(this, (PageSupport.__proto__ || Object.getPrototypeOf(PageSupport)).apply(this, arguments));
  }

  _createClass(PageSupport, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'PageSupport'
      );
    }
  }]);

  return PageSupport;
}(_react.Component);

exports.default = PageSupport;
});

require.register("pages/User.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Full = require('../components/user/Full');

var _Full2 = _interopRequireDefault(_Full);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageUser = function (_Component) {
    _inherits(PageUser, _Component);

    function PageUser() {
        _classCallCheck(this, PageUser);

        return _possibleConstructorReturn(this, (PageUser.__proto__ || Object.getPrototypeOf(PageUser)).apply(this, arguments));
    }

    _createClass(PageUser, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { id: 'content-block' },
                _react2.default.createElement(
                    'div',
                    { className: 'container be-detail-container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(_Full2.default, null),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-12 col-md-8' },
                            _react2.default.createElement(
                                'div',
                                { className: 'tab-wrapper style-1' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'tab-nav-wrapper' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'nav-tab  clearfix' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'nav-tab-item active' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                'all_Unicorns'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'nav-tab-item ' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                'on_Modification'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'nav-tab-item ' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                'for_Sale'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'nav-tab-item ' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                'for_Modification'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'nav-tab-item ' },
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                                                ' favorites'
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'tabs-content clearfix' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'tab-info active' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'row' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-ml-12 col-xs-6 col-sm-4' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'be-post' },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'info-block' },
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-tag' }),
                                                            ' 0.042 ',
                                                            _react2.default.createElement('i', { className: 'fa fa-btc' })
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            'fast ',
                                                            _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                                                            ' 0.00093 ',
                                                            _react2.default.createElement('i', { className: 'fa fa-btc' })
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'a',
                                                        { href: '#', className: 'be-img-block' },
                                                        _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                                                    ),
                                                    _react2.default.createElement(
                                                        'a',
                                                        { href: '#', className: 'be-post-title' },
                                                        'Mr. Incredible Unicorn'
                                                    ),
                                                    _react2.default.createElement(
                                                        'span',
                                                        { className: 'just_part' },
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                                                            ' +23.4453'
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                                                            ' Gen-1'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'span',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Nice'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Gute'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Usual'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Just'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Angry'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'info-block' },
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                                                            ' 360'
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-eye' }),
                                                            ' 789'
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                                                            ' 20'
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-ml-12 col-xs-6 col-sm-4' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'be-post' },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'info-block' },
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-tag' }),
                                                            ' 0.042 ',
                                                            _react2.default.createElement('i', { className: 'fa fa-btc' })
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            'extra ',
                                                            _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                                                            _react2.default.createElement('i', { className: 'fa fa-clock-o' }),
                                                            ' 10min. '
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'a',
                                                        { href: '#', className: 'be-img-block' },
                                                        _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                                                    ),
                                                    _react2.default.createElement(
                                                        'a',
                                                        { href: '#', className: 'be-post-title' },
                                                        'Mr. Incredible Unicorn'
                                                    ),
                                                    _react2.default.createElement(
                                                        'span',
                                                        { className: 'just_part' },
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                                                            ' +23.4453'
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                                                            ' Gen-1'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'span',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Nice'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Gute'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Usual'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Just'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Angry'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'info-block' },
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                                                            ' 360'
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-eye' }),
                                                            ' 789'
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                                                            ' 20'
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'col-ml-12 col-xs-6 col-sm-4' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'be-post' },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'info-block' },
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-tag' }),
                                                            ' 0.042 ',
                                                            _react2.default.createElement('i', { className: 'fa fa-btc' })
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            'slow ',
                                                            _react2.default.createElement('i', { className: 'fa fa-venus-mars' }),
                                                            ' 0.00093 ',
                                                            _react2.default.createElement('i', { className: 'fa fa-btc' })
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'a',
                                                        { href: '#', className: 'be-img-block' },
                                                        _react2.default.createElement('img', { src: 'img/p1.jpg', alt: 'omg' })
                                                    ),
                                                    _react2.default.createElement(
                                                        'a',
                                                        { href: '#', className: 'be-post-title' },
                                                        'Mr. Incredible Unicorn'
                                                    ),
                                                    _react2.default.createElement(
                                                        'span',
                                                        { className: 'just_part' },
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-line-chart' }),
                                                            ' +23.4453'
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-cubes' }),
                                                            ' Gen-1'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'span',
                                                        null,
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Nice'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Gute'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Usual'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Just'
                                                        ),
                                                        ',',
                                                        _react2.default.createElement(
                                                            'a',
                                                            { href: '#', className: 'be-post-tag' },
                                                            'Angry'
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'info-block' },
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-heart-o', 'aria-hidden': 'true' }),
                                                            ' 360'
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-eye' }),
                                                            ' 789'
                                                        ),
                                                        _react2.default.createElement(
                                                            'span',
                                                            null,
                                                            _react2.default.createElement('i', { className: 'fa fa-comment-o' }),
                                                            ' 20'
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'tab-info' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'row' },
                                            '...'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'tab-info' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'row' },
                                            '...'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'tab-info' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'row' },
                                            '...'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PageUser;
}(_react.Component);

exports.default = PageUser;
});

require.register("reducers/account.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _account = require('../actions/account');

function accountReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];

  switch (action.type) {
    case _account.LOGIN:
      return action.account;
    case _account.LOGOUT:
      return null;
    case _account.UPDATE:
      return action.account;
    default:
      return state;
  }
}

exports.default = accountReducer;
});

;require.register("reducers/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _metamask = require('./metamask');

var _metamask2 = _interopRequireDefault(_metamask);

var _loginPopup = require('./login-popup');

var _loginPopup2 = _interopRequireDefault(_loginPopup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  account: _account2.default,
  metamask: _metamask2.default,
  loginPopup: _loginPopup2.default
});
});

;require.register("reducers/login-popup.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loginPopup = require('../actions/login-popup');

var initialState = {
  isOpen: false
};

function loginPopupReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _loginPopup.SHOW_LOGIN_POPUP:
      return { isOpen: true };
    case _loginPopup.HIDE_LOGIN_POPUP:
      return { isOpen: false };
    default:
      return state;
  }
}

exports.default = loginPopupReducer;
});

;require.register("reducers/metamask.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _metamask = require('../actions/metamask');

var initialState = {
  account: undefined,
  network: 'main',
  isOn: false
};

function metamaskReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _metamask.TOGGLE_METAMASK:
      return Object.assign({}, state, {
        isOn: action.state
      });
    case _metamask.SET_METAMASK_ACCOUNT:
      return Object.assign({}, state, {
        account: action.account
      });
    case _metamask.SET_METAMASK_NETWORK:
      return Object.assign({}, state, {
        network: action.network
      });
    default:
      return state;
  }
}

exports.default = metamaskReducer;
});

;require.register("utils/db.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dexie = require('dexie');

var _dexie2 = _interopRequireDefault(_dexie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DB = function () {
  function DB() {
    _classCallCheck(this, DB);

    this.db = new _dexie2.default('unicorn');
    this.db.version(1).stores({
      accounts: 'id'
    });
  }

  _createClass(DB, [{
    key: 'saveAccount',
    value: function saveAccount(account) {
      return this.db.accounts.add(account);
    }
  }, {
    key: 'findAccount',
    value: function findAccount(id) {
      return this.db.accounts.where('id').equals(id).toArray();
    }
  }]);

  return DB;
}();

exports.default = new DB();
});

;require.register("utils/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _web = require("web3");

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Here's how we would access our contract:
var ABI = [{
	"constant": true,
	"inputs": [{
		"name": "",
		"type": "uint256"
	}],
	"name": "zombies",
	"outputs": [{
		"name": "name",
		"type": "string"
	}, {
		"name": "dna",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "zombieId",
		"type": "uint256"
	}, {
		"indexed": false,
		"name": "name",
		"type": "string"
	}, {
		"indexed": false,
		"name": "dna",
		"type": "uint256"
	}],
	"name": "NewZombie",
	"type": "event"
}, {
	"constant": false,
	"inputs": [{
		"name": "_name",
		"type": "string"
	}],
	"name": "createRandomZombie",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}];

var CONTRACT_ADDRESS = '0x07dB39EeA5e6418197d84d3fC7fd2aBf3D7e1b91';

var repeatString = function repeatString(str, size) {
	var result = str;
	while (result.length < size) {
		result += str;
	}
	return result;
};

var web3 = typeof web3 !== 'undefined' ? new _web2.default(web3.currentProvider) : new _web2.default(new _web2.default.providers.HttpProvider("http://localhost:3333/"));

var SmartUnicorn = function () {
	function SmartUnicorn() {
		_classCallCheck(this, SmartUnicorn);

		this.account = web3.eth.accounts[0];
		this.events = {
			login: [],
			logout: [],
			ready: []
		};
	}

	_createClass(SmartUnicorn, [{
		key: "getAccount",
		value: function getAccount() {
			web3.eth.accounts[0];
			web3.eth.getBalance('0x00b7FBed82AB6416E02b6aaaD85B7C94Cf83327F', function (error, result) {
				alert(result);
			});
		}
	}, {
		key: "initFactory",
		value: function initFactory() {
			var _this = this;

			var contract = web3.eth.contract(ABI);
			var factory = contract.at(CONTRACT_ADDRESS);
			this.contract = contract;
			this.factory = factory;
			this.event = factory.NewZombie(function (error, result) {
				if (error) return;
				var details = _this.generate(result.args.zombieId, result.args.name, result.args.dna);
				if (typeof _this.callback === 'function') {
					_this.callback(details);
				}
			});
		}
	}, {
		key: "make",
		value: function make(name) {
			this.factory.createRandomZombie(name, function (error, result) {
				console.log(error, result);
			});
		}
	}, {
		key: "bind",
		value: function bind(event, callback) {
			this.events[event].push(callback);
		}
	}, {
		key: "generate",
		value: function generate(id, name, dna) {
			var dnaStr = repeatString(String(dna), 16);
			var details = {
				headChoice: dnaStr.substring(0, 2) % 3 + 1,
				hairChoice: dnaStr.substring(2, 4) % 3 + 1,
				cornChoice: dnaStr.substring(4, 6) % 1 + 1,
				earsChoice: dnaStr.substring(6, 8) % 1 + 1,
				eyesChoise: dnaStr.substring(8, 10) % 1 + 1,
				headColor: parseInt(dnaStr.substring(10, 12) / 100 * 360),
				hairColor: parseInt(dnaStr.substring(12, 14) / 100 * 360),
				zombieName: name
			};
			return details;
		}
	}]);

	return SmartUnicorn;
}();

var smartUnicorn = new SmartUnicorn();

exports.default = smartUnicorn;
});

;require.register("utils/smart-unicorn.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _web = require("web3");

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Here's how we would access our contract:
var ABI = [{
	"constant": true,
	"inputs": [{
		"name": "",
		"type": "uint256"
	}],
	"name": "zombies",
	"outputs": [{
		"name": "name",
		"type": "string"
	}, {
		"name": "dna",
		"type": "uint256"
	}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"anonymous": false,
	"inputs": [{
		"indexed": false,
		"name": "zombieId",
		"type": "uint256"
	}, {
		"indexed": false,
		"name": "name",
		"type": "string"
	}, {
		"indexed": false,
		"name": "dna",
		"type": "uint256"
	}],
	"name": "NewZombie",
	"type": "event"
}, {
	"constant": false,
	"inputs": [{
		"name": "_name",
		"type": "string"
	}],
	"name": "createRandomZombie",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}];

var CONTRACT_ADDRESS = '0x07dB39EeA5e6418197d84d3fC7fd2aBf3D7e1b91';

var repeatString = function repeatString(str, size) {
	var result = str;
	while (result.length < size) {
		result += str;
	}
	return result;
};

var makeUnicorn = function makeUnicorn(zombieId, name, dna) {
	var dnaStr = repeatString(String(dna), 16);
	return {
		headChoice: dnaStr.substring(0, 2) % 3 + 1,
		hairChoice: dnaStr.substring(2, 4) % 3 + 1,
		cornChoice: dnaStr.substring(4, 6) % 1 + 1,
		earsChoice: dnaStr.substring(6, 8) % 1 + 1,
		eyesChoise: dnaStr.substring(8, 10) % 1 + 1,
		headColor: parseInt(dnaStr.substring(10, 12) / 100 * 360),
		hairColor: parseInt(dnaStr.substring(12, 14) / 100 * 360),
		zombieName: name
	};
};

var SmartUnicorn = function () {
	function SmartUnicorn() {
		_classCallCheck(this, SmartUnicorn);

		this.handleAccount = this.handleAccount.bind(this);
		this.handleMetamask = this.handleMetamask.bind(this);
		this.watchForAccount = this.watchForAccount.bind(this);
		this.watchForNetwork = this.watchForNetwork.bind(this);
		this.watchForMetamask = this.watchForMetamask.bind(this);
		this.events = {
			'metamask': [this.handleMetamask],
			'account': [this.handleAccount]
		};
		this.network = 1;
		this.watchForMetamask();
	}

	_createClass(SmartUnicorn, [{
		key: "watchForMetamask",
		value: function watchForMetamask() {
			if (typeof web3 !== 'undefined' && web3.currentProvider.isMetaMask) {
				this.trigger('metamask');
			} else {
				setTimeout(this.watchForMetamask, 100);
			}
		}
	}, {
		key: "watchForAccount",
		value: function watchForAccount() {
			var _this = this;

			this.web3.eth.getAccounts().then(function (accounts) {
				if (accounts.length > 0) {
					if (_this.web3.eth.defaultAccount !== accounts[0]) {
						_this.web3.eth.defaultAccount = accounts[0];
						_this.trigger('account', accounts[0]);
					}
				} else {
					if (_this.web3.eth.defaultAccount != undefined) {
						_this.web3.eth.defaultAccount = undefined;
						_this.trigger('account', undefined);
					}
				}
				setTimeout(_this.watchForAccount, 500);
			});
		}
	}, {
		key: "watchForNetwork",
		value: function watchForNetwork() {
			var _this2 = this;

			var net = this.web3.eth.net;

			net.getId().then(function (id) {
				if (_this2.network !== id) {
					_this2.network = id;
					switch (id) {
						case 1:
							_this2.trigger('network', 'main');
							break;
						default:
							_this2.trigger('network', 'wrong');
					}
				}
				setTimeout(_this2.watchForNetwork, 200);
			});
		}
	}, {
		key: "handleMetamask",
		value: function handleMetamask() {
			this.web3 = new _web2.default(web3.currentProvider);
			this.watchForAccount();
			this.watchForNetwork();
		}
	}, {
		key: "signMessage",
		value: function signMessage(message) {
			var address = this.web3.eth.defaultAccount;
			return this.web3.eth.sign(message, address);
		}
	}, {
		key: "handleAccount",
		value: function handleAccount() {
			//this.initFactory()
		}
	}, {
		key: "initFactory",
		value: function initFactory() {
			var _this3 = this;

			var contract = this.web3.eth.contract(ABI);
			this.factory = contract.at(CONTRACT_ADDRESS);
			this.factory.NewZombie(function (error, result) {
				if (!error) {
					var _result$args = result.args,
					    zombieId = _result$args.zombieId,
					    name = _result$args.name,
					    dna = _result$args.dna;

					var details = makeUnicorn(zombieId, name, dna);
					_this3.trigger('created', details);
				}
			});
		}
	}, {
		key: "make",
		value: function make(name) {
			this.factory.createRandomZombie(name, function (error, result) {
				console.log(error, result);
			});
		}
	}, {
		key: "on",
		value: function on(event, callback) {
			if (typeof this.events[event] !== 'undefined') {
				this.events[event].push(callback);
			} else {
				this.events[event] = [callback];
			}
		}
	}, {
		key: "trigger",
		value: function trigger(event, data) {
			if (typeof this.events[event] !== 'undefined') {
				this.events[event].forEach(function (callback) {
					if (typeof callback === 'function') {
						callback(data);
					}
				});
			}
		}
	}, {
		key: "info",
		value: function info() {
			var metamask = typeof this.web3 !== 'undefined';
			return {
				metamask: metamask,
				wallet: metamask ? this.web3.eth.defaultAccount : undefined
			};
		}
	}]);

	return SmartUnicorn;
}();

exports.default = new SmartUnicorn();
});

;require.alias("buffer/index.js", "buffer");
require.alias("crypto-browserify/index.js", "crypto");
require.alias("events/events.js", "events");
require.alias("process/browser.js", "process");
require.alias("stream-browserify/index.js", "stream");
require.alias("node-browser-modules/node_modules/string_decoder/index.js", "string_decoder");
require.alias("vm-browserify/index.js", "vm");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map