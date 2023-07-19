// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"cx2iR":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "fb254f80464ee2bb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"4QcUr":[function(require,module,exports) {
/*!
 * Datepicker for Bootstrap v1.9.0 (https://github.com/uxsolutions/bootstrap-datepicker)
 *
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */ (function(factory) {
    if (typeof define === "function" && define.amd) define([
        "jquery"
    ], factory);
    else factory(require("e4085978bcb239c1"));
})(function($, undefined) {
    function UTCDate() {
        return new Date(Date.UTC.apply(Date, arguments));
    }
    function UTCToday() {
        var today = new Date();
        return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
    }
    function isUTCEquals(date1, date2) {
        return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate();
    }
    function alias(method, deprecationMsg) {
        return function() {
            if (deprecationMsg !== undefined) $.fn.datepicker.deprecated(deprecationMsg);
            return this[method].apply(this, arguments);
        };
    }
    function isValidDate(d) {
        return d && !isNaN(d.getTime());
    }
    var DateArray = function() {
        var extras = {
            get: function(i) {
                return this.slice(i)[0];
            },
            contains: function(d) {
                // Array.indexOf is not cross-browser;
                // $.inArray doesn't work with Dates
                var val = d && d.valueOf();
                for(var i = 0, l = this.length; i < l; i++)// Use date arithmetic to allow dates with different times to match
                if (0 <= this[i].valueOf() - val && this[i].valueOf() - val < 86400000) return i;
                return -1;
            },
            remove: function(i) {
                this.splice(i, 1);
            },
            replace: function(new_array) {
                if (!new_array) return;
                if (!$.isArray(new_array)) new_array = [
                    new_array
                ];
                this.clear();
                this.push.apply(this, new_array);
            },
            clear: function() {
                this.length = 0;
            },
            copy: function() {
                var a = new DateArray();
                a.replace(this);
                return a;
            }
        };
        return function() {
            var a = [];
            a.push.apply(a, arguments);
            $.extend(a, extras);
            return a;
        };
    }();
    // Picker object
    var Datepicker = function(element, options) {
        $.data(element, "datepicker", this);
        this._events = [];
        this._secondaryEvents = [];
        this._process_options(options);
        this.dates = new DateArray();
        this.viewDate = this.o.defaultViewDate;
        this.focusDate = null;
        this.element = $(element);
        this.isInput = this.element.is("input");
        this.inputField = this.isInput ? this.element : this.element.find("input");
        this.component = this.element.hasClass("date") ? this.element.find(".add-on, .input-group-addon, .input-group-append, .input-group-prepend, .btn") : false;
        if (this.component && this.component.length === 0) this.component = false;
        this.isInline = !this.component && this.element.is("div");
        this.picker = $(DPGlobal.template);
        // Checking templates and inserting
        if (this._check_template(this.o.templates.leftArrow)) this.picker.find(".prev").html(this.o.templates.leftArrow);
        if (this._check_template(this.o.templates.rightArrow)) this.picker.find(".next").html(this.o.templates.rightArrow);
        this._buildEvents();
        this._attachEvents();
        if (this.isInline) this.picker.addClass("datepicker-inline").appendTo(this.element);
        else this.picker.addClass("datepicker-dropdown dropdown-menu");
        if (this.o.rtl) this.picker.addClass("datepicker-rtl");
        if (this.o.calendarWeeks) this.picker.find(".datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function(i, val) {
            return Number(val) + 1;
        });
        this._process_options({
            startDate: this._o.startDate,
            endDate: this._o.endDate,
            daysOfWeekDisabled: this.o.daysOfWeekDisabled,
            daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
            datesDisabled: this.o.datesDisabled
        });
        this._allow_update = false;
        this.setViewMode(this.o.startView);
        this._allow_update = true;
        this.fillDow();
        this.fillMonths();
        this.update();
        if (this.isInline) this.show();
    };
    Datepicker.prototype = {
        constructor: Datepicker,
        _resolveViewName: function(view) {
            $.each(DPGlobal.viewModes, function(i, viewMode) {
                if (view === i || $.inArray(view, viewMode.names) !== -1) {
                    view = i;
                    return false;
                }
            });
            return view;
        },
        _resolveDaysOfWeek: function(daysOfWeek) {
            if (!$.isArray(daysOfWeek)) daysOfWeek = daysOfWeek.split(/[,\s]*/);
            return $.map(daysOfWeek, Number);
        },
        _check_template: function(tmp) {
            try {
                // If empty
                if (tmp === undefined || tmp === "") return false;
                // If no html, everything ok
                if ((tmp.match(/[<>]/g) || []).length <= 0) return true;
                // Checking if html is fine
                var jDom = $(tmp);
                return jDom.length > 0;
            } catch (ex) {
                return false;
            }
        },
        _process_options: function(opts) {
            // Store raw options for reference
            this._o = $.extend({}, this._o, opts);
            // Processed options
            var o = this.o = $.extend({}, this._o);
            // Check if "de-DE" style date is available, if not language should
            // fallback to 2 letter code eg "de"
            var lang = o.language;
            if (!dates[lang]) {
                lang = lang.split("-")[0];
                if (!dates[lang]) lang = defaults.language;
            }
            o.language = lang;
            // Retrieve view index from any aliases
            o.startView = this._resolveViewName(o.startView);
            o.minViewMode = this._resolveViewName(o.minViewMode);
            o.maxViewMode = this._resolveViewName(o.maxViewMode);
            // Check view is between min and max
            o.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, o.startView));
            // true, false, or Number > 0
            if (o.multidate !== true) {
                o.multidate = Number(o.multidate) || false;
                if (o.multidate !== false) o.multidate = Math.max(0, o.multidate);
            }
            o.multidateSeparator = String(o.multidateSeparator);
            o.weekStart %= 7;
            o.weekEnd = (o.weekStart + 6) % 7;
            var format = DPGlobal.parseFormat(o.format);
            if (o.startDate !== -Infinity) {
                if (!!o.startDate) {
                    if (o.startDate instanceof Date) o.startDate = this._local_to_utc(this._zero_time(o.startDate));
                    else o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
                } else o.startDate = -Infinity;
            }
            if (o.endDate !== Infinity) {
                if (!!o.endDate) {
                    if (o.endDate instanceof Date) o.endDate = this._local_to_utc(this._zero_time(o.endDate));
                    else o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
                } else o.endDate = Infinity;
            }
            o.daysOfWeekDisabled = this._resolveDaysOfWeek(o.daysOfWeekDisabled || []);
            o.daysOfWeekHighlighted = this._resolveDaysOfWeek(o.daysOfWeekHighlighted || []);
            o.datesDisabled = o.datesDisabled || [];
            if (!$.isArray(o.datesDisabled)) o.datesDisabled = o.datesDisabled.split(",");
            o.datesDisabled = $.map(o.datesDisabled, function(d) {
                return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
            });
            var plc = String(o.orientation).toLowerCase().split(/\s+/g), _plc = o.orientation.toLowerCase();
            plc = $.grep(plc, function(word) {
                return /^auto|left|right|top|bottom$/.test(word);
            });
            o.orientation = {
                x: "auto",
                y: "auto"
            };
            if (!_plc || _plc === "auto") ; // no action
            else if (plc.length === 1) switch(plc[0]){
                case "top":
                case "bottom":
                    o.orientation.y = plc[0];
                    break;
                case "left":
                case "right":
                    o.orientation.x = plc[0];
                    break;
            }
            else {
                _plc = $.grep(plc, function(word) {
                    return /^left|right$/.test(word);
                });
                o.orientation.x = _plc[0] || "auto";
                _plc = $.grep(plc, function(word) {
                    return /^top|bottom$/.test(word);
                });
                o.orientation.y = _plc[0] || "auto";
            }
            if (o.defaultViewDate instanceof Date || typeof o.defaultViewDate === "string") o.defaultViewDate = DPGlobal.parseDate(o.defaultViewDate, format, o.language, o.assumeNearbyYear);
            else if (o.defaultViewDate) {
                var year = o.defaultViewDate.year || new Date().getFullYear();
                var month = o.defaultViewDate.month || 0;
                var day = o.defaultViewDate.day || 1;
                o.defaultViewDate = UTCDate(year, month, day);
            } else o.defaultViewDate = UTCToday();
        },
        _applyEvents: function(evs) {
            for(var i = 0, el, ch, ev; i < evs.length; i++){
                el = evs[i][0];
                if (evs[i].length === 2) {
                    ch = undefined;
                    ev = evs[i][1];
                } else if (evs[i].length === 3) {
                    ch = evs[i][1];
                    ev = evs[i][2];
                }
                el.on(ev, ch);
            }
        },
        _unapplyEvents: function(evs) {
            for(var i = 0, el, ev, ch; i < evs.length; i++){
                el = evs[i][0];
                if (evs[i].length === 2) {
                    ch = undefined;
                    ev = evs[i][1];
                } else if (evs[i].length === 3) {
                    ch = evs[i][1];
                    ev = evs[i][2];
                }
                el.off(ev, ch);
            }
        },
        _buildEvents: function() {
            var events = {
                keyup: $.proxy(function(e) {
                    if ($.inArray(e.keyCode, [
                        27,
                        37,
                        39,
                        38,
                        40,
                        32,
                        13,
                        9
                    ]) === -1) this.update();
                }, this),
                keydown: $.proxy(this.keydown, this),
                paste: $.proxy(this.paste, this)
            };
            if (this.o.showOnFocus === true) events.focus = $.proxy(this.show, this);
            if (this.isInput) this._events = [
                [
                    this.element,
                    events
                ]
            ];
            else if (this.component && this.inputField.length) this._events = [
                // For components that are not readonly, allow keyboard nav
                [
                    this.inputField,
                    events
                ],
                [
                    this.component,
                    {
                        click: $.proxy(this.show, this)
                    }
                ]
            ];
            else this._events = [
                [
                    this.element,
                    {
                        click: $.proxy(this.show, this),
                        keydown: $.proxy(this.keydown, this)
                    }
                ]
            ];
            this._events.push(// Component: listen for blur on element descendants
            [
                this.element,
                "*",
                {
                    blur: $.proxy(function(e) {
                        this._focused_from = e.target;
                    }, this)
                }
            ], // Input: listen for blur on element
            [
                this.element,
                {
                    blur: $.proxy(function(e) {
                        this._focused_from = e.target;
                    }, this)
                }
            ]);
            if (this.o.immediateUpdates) // Trigger input updates immediately on changed year/month
            this._events.push([
                this.element,
                {
                    "changeYear changeMonth": $.proxy(function(e) {
                        this.update(e.date);
                    }, this)
                }
            ]);
            this._secondaryEvents = [
                [
                    this.picker,
                    {
                        click: $.proxy(this.click, this)
                    }
                ],
                [
                    this.picker,
                    ".prev, .next",
                    {
                        click: $.proxy(this.navArrowsClick, this)
                    }
                ],
                [
                    this.picker,
                    ".day:not(.disabled)",
                    {
                        click: $.proxy(this.dayCellClick, this)
                    }
                ],
                [
                    $(window),
                    {
                        resize: $.proxy(this.place, this)
                    }
                ],
                [
                    $(document),
                    {
                        "mousedown touchstart": $.proxy(function(e) {
                            // Clicked outside the datepicker, hide it
                            if (!(this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.isInline)) this.hide();
                        }, this)
                    }
                ]
            ];
        },
        _attachEvents: function() {
            this._detachEvents();
            this._applyEvents(this._events);
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events);
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents();
            this._applyEvents(this._secondaryEvents);
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents);
        },
        _trigger: function(event, altdate) {
            var date = altdate || this.dates.get(-1), local_date = this._utc_to_local(date);
            this.element.trigger({
                type: event,
                date: local_date,
                viewMode: this.viewMode,
                dates: $.map(this.dates, this._utc_to_local),
                format: $.proxy(function(ix, format) {
                    if (arguments.length === 0) {
                        ix = this.dates.length - 1;
                        format = this.o.format;
                    } else if (typeof ix === "string") {
                        format = ix;
                        ix = this.dates.length - 1;
                    }
                    format = format || this.o.format;
                    var date = this.dates.get(ix);
                    return DPGlobal.formatDate(date, format, this.o.language);
                }, this)
            });
        },
        show: function() {
            if (this.inputField.is(":disabled") || this.inputField.prop("readonly") && this.o.enableOnReadonly === false) return;
            if (!this.isInline) this.picker.appendTo(this.o.container);
            this.place();
            this.picker.show();
            this._attachSecondaryEvents();
            this._trigger("show");
            if ((window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard) $(this.element).blur();
            return this;
        },
        hide: function() {
            if (this.isInline || !this.picker.is(":visible")) return this;
            this.focusDate = null;
            this.picker.hide().detach();
            this._detachSecondaryEvents();
            this.setViewMode(this.o.startView);
            if (this.o.forceParse && this.inputField.val()) this.setValue();
            this._trigger("hide");
            return this;
        },
        destroy: function() {
            this.hide();
            this._detachEvents();
            this._detachSecondaryEvents();
            this.picker.remove();
            delete this.element.data().datepicker;
            if (!this.isInput) delete this.element.data().date;
            return this;
        },
        paste: function(e) {
            var dateString;
            if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types && $.inArray("text/plain", e.originalEvent.clipboardData.types) !== -1) dateString = e.originalEvent.clipboardData.getData("text/plain");
            else if (window.clipboardData) dateString = window.clipboardData.getData("Text");
            else return;
            this.setDate(dateString);
            this.update();
            e.preventDefault();
        },
        _utc_to_local: function(utc) {
            if (!utc) return utc;
            var local = new Date(utc.getTime() + utc.getTimezoneOffset() * 60000);
            if (local.getTimezoneOffset() !== utc.getTimezoneOffset()) local = new Date(utc.getTime() + local.getTimezoneOffset() * 60000);
            return local;
        },
        _local_to_utc: function(local) {
            return local && new Date(local.getTime() - local.getTimezoneOffset() * 60000);
        },
        _zero_time: function(local) {
            return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
        },
        _zero_utc_time: function(utc) {
            return utc && UTCDate(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
        },
        getDates: function() {
            return $.map(this.dates, this._utc_to_local);
        },
        getUTCDates: function() {
            return $.map(this.dates, function(d) {
                return new Date(d);
            });
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate());
        },
        getUTCDate: function() {
            var selected_date = this.dates.get(-1);
            if (selected_date !== undefined) return new Date(selected_date);
            else return null;
        },
        clearDates: function() {
            this.inputField.val("");
            this.update();
            this._trigger("changeDate");
            if (this.o.autoclose) this.hide();
        },
        setDates: function() {
            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, args);
            this._trigger("changeDate");
            this.setValue();
            return this;
        },
        setUTCDates: function() {
            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
            this.setDates.apply(this, $.map(args, this._utc_to_local));
            return this;
        },
        setDate: alias("setDates"),
        setUTCDate: alias("setUTCDates"),
        remove: alias("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead"),
        setValue: function() {
            var formatted = this.getFormattedDate();
            this.inputField.val(formatted);
            return this;
        },
        getFormattedDate: function(format) {
            if (format === undefined) format = this.o.format;
            var lang = this.o.language;
            return $.map(this.dates, function(d) {
                return DPGlobal.formatDate(d, format, lang);
            }).join(this.o.multidateSeparator);
        },
        getStartDate: function() {
            return this.o.startDate;
        },
        setStartDate: function(startDate) {
            this._process_options({
                startDate: startDate
            });
            this.update();
            this.updateNavArrows();
            return this;
        },
        getEndDate: function() {
            return this.o.endDate;
        },
        setEndDate: function(endDate) {
            this._process_options({
                endDate: endDate
            });
            this.update();
            this.updateNavArrows();
            return this;
        },
        setDaysOfWeekDisabled: function(daysOfWeekDisabled) {
            this._process_options({
                daysOfWeekDisabled: daysOfWeekDisabled
            });
            this.update();
            return this;
        },
        setDaysOfWeekHighlighted: function(daysOfWeekHighlighted) {
            this._process_options({
                daysOfWeekHighlighted: daysOfWeekHighlighted
            });
            this.update();
            return this;
        },
        setDatesDisabled: function(datesDisabled) {
            this._process_options({
                datesDisabled: datesDisabled
            });
            this.update();
            return this;
        },
        place: function() {
            if (this.isInline) return this;
            var calendarWidth = this.picker.outerWidth(), calendarHeight = this.picker.outerHeight(), visualPadding = 10, container = $(this.o.container), windowWidth = container.width(), scrollTop = this.o.container === "body" ? $(document).scrollTop() : container.scrollTop(), appendOffset = container.offset();
            var parentsZindex = [
                0
            ];
            this.element.parents().each(function() {
                var itemZIndex = $(this).css("z-index");
                if (itemZIndex !== "auto" && Number(itemZIndex) !== 0) parentsZindex.push(Number(itemZIndex));
            });
            var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
            var offset = this.component ? this.component.parent().offset() : this.element.offset();
            var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
            var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
            var left = offset.left - appendOffset.left;
            var top = offset.top - appendOffset.top;
            if (this.o.container !== "body") top += scrollTop;
            this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left");
            if (this.o.orientation.x !== "auto") {
                this.picker.addClass("datepicker-orient-" + this.o.orientation.x);
                if (this.o.orientation.x === "right") left -= calendarWidth - width;
            } else {
                if (offset.left < 0) {
                    // component is outside the window on the left side. Move it into visible range
                    this.picker.addClass("datepicker-orient-left");
                    left -= offset.left - visualPadding;
                } else if (left + calendarWidth > windowWidth) {
                    // the calendar passes the widow right edge. Align it to component right side
                    this.picker.addClass("datepicker-orient-right");
                    left += width - calendarWidth;
                } else if (this.o.rtl) // Default to right
                this.picker.addClass("datepicker-orient-right");
                else // Default to left
                this.picker.addClass("datepicker-orient-left");
            }
            // auto y orientation is best-situation: top or bottom, no fudging,
            // decision based on which shows more of the calendar
            var yorient = this.o.orientation.y, top_overflow;
            if (yorient === "auto") {
                top_overflow = -scrollTop + top - calendarHeight;
                yorient = top_overflow < 0 ? "bottom" : "top";
            }
            this.picker.addClass("datepicker-orient-" + yorient);
            if (yorient === "top") top -= calendarHeight + parseInt(this.picker.css("padding-top"));
            else top += height;
            if (this.o.rtl) {
                var right = windowWidth - (left + width);
                this.picker.css({
                    top: top,
                    right: right,
                    zIndex: zIndex
                });
            } else this.picker.css({
                top: top,
                left: left,
                zIndex: zIndex
            });
            return this;
        },
        _allow_update: true,
        update: function() {
            if (!this._allow_update) return this;
            var oldDates = this.dates.copy(), dates = [], fromArgs = false;
            if (arguments.length) {
                $.each(arguments, $.proxy(function(i, date) {
                    if (date instanceof Date) date = this._local_to_utc(date);
                    dates.push(date);
                }, this));
                fromArgs = true;
            } else {
                dates = this.isInput ? this.element.val() : this.element.data("date") || this.inputField.val();
                if (dates && this.o.multidate) dates = dates.split(this.o.multidateSeparator);
                else dates = [
                    dates
                ];
                delete this.element.data().date;
            }
            dates = $.map(dates, $.proxy(function(date) {
                return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
            }, this));
            dates = $.grep(dates, $.proxy(function(date) {
                return !this.dateWithinRange(date) || !date;
            }, this), true);
            this.dates.replace(dates);
            if (this.o.updateViewDate) {
                if (this.dates.length) this.viewDate = new Date(this.dates.get(-1));
                else if (this.viewDate < this.o.startDate) this.viewDate = new Date(this.o.startDate);
                else if (this.viewDate > this.o.endDate) this.viewDate = new Date(this.o.endDate);
                else this.viewDate = this.o.defaultViewDate;
            }
            if (fromArgs) {
                // setting date by clicking
                this.setValue();
                this.element.change();
            } else if (this.dates.length) // setting date by typing
            {
                if (String(oldDates) !== String(this.dates) && fromArgs) {
                    this._trigger("changeDate");
                    this.element.change();
                }
            }
            if (!this.dates.length && oldDates.length) {
                this._trigger("clearDate");
                this.element.change();
            }
            this.fill();
            return this;
        },
        fillDow: function() {
            if (this.o.showWeekDays) {
                var dowCnt = this.o.weekStart, html = "<tr>";
                if (this.o.calendarWeeks) html += '<th class="cw">&#160;</th>';
                while(dowCnt < this.o.weekStart + 7){
                    html += '<th class="dow';
                    if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) !== -1) html += " disabled";
                    html += '">' + dates[this.o.language].daysMin[dowCnt++ % 7] + "</th>";
                }
                html += "</tr>";
                this.picker.find(".datepicker-days thead").append(html);
            }
        },
        fillMonths: function() {
            var localDate = this._utc_to_local(this.viewDate);
            var html = "";
            var focused;
            for(var i = 0; i < 12; i++){
                focused = localDate && localDate.getMonth() === i ? " focused" : "";
                html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i] + "</span>";
            }
            this.picker.find(".datepicker-months td").html(html);
        },
        setRange: function(range) {
            if (!range || !range.length) delete this.range;
            else this.range = $.map(range, function(d) {
                return d.valueOf();
            });
            this.fill();
        },
        getClassNames: function(date) {
            var cls = [], year = this.viewDate.getUTCFullYear(), month = this.viewDate.getUTCMonth(), today = UTCToday();
            if (date.getUTCFullYear() < year || date.getUTCFullYear() === year && date.getUTCMonth() < month) cls.push("old");
            else if (date.getUTCFullYear() > year || date.getUTCFullYear() === year && date.getUTCMonth() > month) cls.push("new");
            if (this.focusDate && date.valueOf() === this.focusDate.valueOf()) cls.push("focused");
            // Compare internal UTC date with UTC today, not local today
            if (this.o.todayHighlight && isUTCEquals(date, today)) cls.push("today");
            if (this.dates.contains(date) !== -1) cls.push("active");
            if (!this.dateWithinRange(date)) cls.push("disabled");
            if (this.dateIsDisabled(date)) cls.push("disabled", "disabled-date");
            if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1) cls.push("highlighted");
            if (this.range) {
                if (date > this.range[0] && date < this.range[this.range.length - 1]) cls.push("range");
                if ($.inArray(date.valueOf(), this.range) !== -1) cls.push("selected");
                if (date.valueOf() === this.range[0]) cls.push("range-start");
                if (date.valueOf() === this.range[this.range.length - 1]) cls.push("range-end");
            }
            return cls;
        },
        _fill_yearsView: function(selector, cssClass, factor, year, startYear, endYear, beforeFn) {
            var html = "";
            var step = factor / 10;
            var view = this.picker.find(selector);
            var startVal = Math.floor(year / factor) * factor;
            var endVal = startVal + step * 9;
            var focusedVal = Math.floor(this.viewDate.getFullYear() / step) * step;
            var selected = $.map(this.dates, function(d) {
                return Math.floor(d.getUTCFullYear() / step) * step;
            });
            var classes, tooltip, before;
            for(var currVal = startVal - step; currVal <= endVal + step; currVal += step){
                classes = [
                    cssClass
                ];
                tooltip = null;
                if (currVal === startVal - step) classes.push("old");
                else if (currVal === endVal + step) classes.push("new");
                if ($.inArray(currVal, selected) !== -1) classes.push("active");
                if (currVal < startYear || currVal > endYear) classes.push("disabled");
                if (currVal === focusedVal) classes.push("focused");
                if (beforeFn !== $.noop) {
                    before = beforeFn(new Date(currVal, 0, 1));
                    if (before === undefined) before = {};
                    else if (typeof before === "boolean") before = {
                        enabled: before
                    };
                    else if (typeof before === "string") before = {
                        classes: before
                    };
                    if (before.enabled === false) classes.push("disabled");
                    if (before.classes) classes = classes.concat(before.classes.split(/\s+/));
                    if (before.tooltip) tooltip = before.tooltip;
                }
                html += '<span class="' + classes.join(" ") + '"' + (tooltip ? ' title="' + tooltip + '"' : "") + ">" + currVal + "</span>";
            }
            view.find(".datepicker-switch").text(startVal + "-" + endVal);
            view.find("td").html(html);
        },
        fill: function() {
            var d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth(), startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity, startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity, endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity, endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity, todaytxt = dates[this.o.language].today || dates["en"].today || "", cleartxt = dates[this.o.language].clear || dates["en"].clear || "", titleFormat = dates[this.o.language].titleFormat || dates["en"].titleFormat, todayDate = UTCToday(), titleBtnVisible = (this.o.todayBtn === true || this.o.todayBtn === "linked") && todayDate >= this.o.startDate && todayDate <= this.o.endDate && !this.weekOfDateIsDisabled(todayDate), tooltip, before;
            if (isNaN(year) || isNaN(month)) return;
            this.picker.find(".datepicker-days .datepicker-switch").text(DPGlobal.formatDate(d, titleFormat, this.o.language));
            this.picker.find("tfoot .today").text(todaytxt).css("display", titleBtnVisible ? "table-cell" : "none");
            this.picker.find("tfoot .clear").text(cleartxt).css("display", this.o.clearBtn === true ? "table-cell" : "none");
            this.picker.find("thead .datepicker-title").text(this.o.title).css("display", typeof this.o.title === "string" && this.o.title !== "" ? "table-cell" : "none");
            this.updateNavArrows();
            this.fillMonths();
            var prevMonth = UTCDate(year, month, 0), day = prevMonth.getUTCDate();
            prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
            var nextMonth = new Date(prevMonth);
            if (prevMonth.getUTCFullYear() < 100) nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var weekDay, clsName;
            while(prevMonth.valueOf() < nextMonth){
                weekDay = prevMonth.getUTCDay();
                if (weekDay === this.o.weekStart) {
                    html.push("<tr>");
                    if (this.o.calendarWeeks) {
                        // ISO 8601: First week contains first thursday.
                        // ISO also states week starts on Monday, but we can be more abstract here.
                        var // Start of current week: based on weekstart/current date
                        ws = new Date(+prevMonth + (this.o.weekStart - weekDay - 7) % 7 * 864e5), // Thursday of this week
                        th = new Date(Number(ws) + (11 - ws.getUTCDay()) % 7 * 864e5), // First Thursday of year, year from thursday
                        yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (11 - yth.getUTCDay()) % 7 * 864e5), // Calendar week: ms between thursdays, div ms per day, div 7 days
                        calWeek = (th - yth) / 864e5 / 7 + 1;
                        html.push('<td class="cw">' + calWeek + "</td>");
                    }
                }
                clsName = this.getClassNames(prevMonth);
                clsName.push("day");
                var content = prevMonth.getUTCDate();
                if (this.o.beforeShowDay !== $.noop) {
                    before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
                    if (before === undefined) before = {};
                    else if (typeof before === "boolean") before = {
                        enabled: before
                    };
                    else if (typeof before === "string") before = {
                        classes: before
                    };
                    if (before.enabled === false) clsName.push("disabled");
                    if (before.classes) clsName = clsName.concat(before.classes.split(/\s+/));
                    if (before.tooltip) tooltip = before.tooltip;
                    if (before.content) content = before.content;
                }
                //Check if uniqueSort exists (supported by jquery >=1.12 and >=2.2)
                //Fallback to unique function for older jquery versions
                if ($.isFunction($.uniqueSort)) clsName = $.uniqueSort(clsName);
                else clsName = $.unique(clsName);
                html.push('<td class="' + clsName.join(" ") + '"' + (tooltip ? ' title="' + tooltip + '"' : "") + ' data-date="' + prevMonth.getTime().toString() + '">' + content + "</td>");
                tooltip = null;
                if (weekDay === this.o.weekEnd) html.push("</tr>");
                prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
            }
            this.picker.find(".datepicker-days tbody").html(html.join(""));
            var monthsTitle = dates[this.o.language].monthsTitle || dates["en"].monthsTitle || "Months";
            var months = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? monthsTitle : year).end().find("tbody span").removeClass("active");
            $.each(this.dates, function(i, d) {
                if (d.getUTCFullYear() === year) months.eq(d.getUTCMonth()).addClass("active");
            });
            if (year < startYear || year > endYear) months.addClass("disabled");
            if (year === startYear) months.slice(0, startMonth).addClass("disabled");
            if (year === endYear) months.slice(endMonth + 1).addClass("disabled");
            if (this.o.beforeShowMonth !== $.noop) {
                var that = this;
                $.each(months, function(i, month) {
                    var moDate = new Date(year, i, 1);
                    var before = that.o.beforeShowMonth(moDate);
                    if (before === undefined) before = {};
                    else if (typeof before === "boolean") before = {
                        enabled: before
                    };
                    else if (typeof before === "string") before = {
                        classes: before
                    };
                    if (before.enabled === false && !$(month).hasClass("disabled")) $(month).addClass("disabled");
                    if (before.classes) $(month).addClass(before.classes);
                    if (before.tooltip) $(month).prop("title", before.tooltip);
                });
            }
            // Generating decade/years picker
            this._fill_yearsView(".datepicker-years", "year", 10, year, startYear, endYear, this.o.beforeShowYear);
            // Generating century/decades picker
            this._fill_yearsView(".datepicker-decades", "decade", 100, year, startYear, endYear, this.o.beforeShowDecade);
            // Generating millennium/centuries picker
            this._fill_yearsView(".datepicker-centuries", "century", 1000, year, startYear, endYear, this.o.beforeShowCentury);
        },
        updateNavArrows: function() {
            if (!this._allow_update) return;
            var d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth(), startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity, startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity, endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity, endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity, prevIsDisabled, nextIsDisabled, factor = 1;
            switch(this.viewMode){
                case 4:
                    factor *= 10;
                /* falls through */ case 3:
                    factor *= 10;
                /* falls through */ case 2:
                    factor *= 10;
                /* falls through */ case 1:
                    prevIsDisabled = Math.floor(year / factor) * factor <= startYear;
                    nextIsDisabled = Math.floor(year / factor) * factor + factor > endYear;
                    break;
                case 0:
                    prevIsDisabled = year <= startYear && month <= startMonth;
                    nextIsDisabled = year >= endYear && month >= endMonth;
                    break;
            }
            this.picker.find(".prev").toggleClass("disabled", prevIsDisabled);
            this.picker.find(".next").toggleClass("disabled", nextIsDisabled);
        },
        click: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var target, dir, day, year, month;
            target = $(e.target);
            // Clicked on the switch
            if (target.hasClass("datepicker-switch") && this.viewMode !== this.o.maxViewMode) this.setViewMode(this.viewMode + 1);
            // Clicked on today button
            if (target.hasClass("today") && !target.hasClass("day")) {
                this.setViewMode(0);
                this._setDate(UTCToday(), this.o.todayBtn === "linked" ? null : "view");
            }
            // Clicked on clear button
            if (target.hasClass("clear")) this.clearDates();
            if (!target.hasClass("disabled")) // Clicked on a month, year, decade, century
            {
                if (target.hasClass("month") || target.hasClass("year") || target.hasClass("decade") || target.hasClass("century")) {
                    this.viewDate.setUTCDate(1);
                    day = 1;
                    if (this.viewMode === 1) {
                        month = target.parent().find("span").index(target);
                        year = this.viewDate.getUTCFullYear();
                        this.viewDate.setUTCMonth(month);
                    } else {
                        month = 0;
                        year = Number(target.text());
                        this.viewDate.setUTCFullYear(year);
                    }
                    this._trigger(DPGlobal.viewModes[this.viewMode - 1].e, this.viewDate);
                    if (this.viewMode === this.o.minViewMode) this._setDate(UTCDate(year, month, day));
                    else {
                        this.setViewMode(this.viewMode - 1);
                        this.fill();
                    }
                }
            }
            if (this.picker.is(":visible") && this._focused_from) this._focused_from.focus();
            delete this._focused_from;
        },
        dayCellClick: function(e) {
            var $target = $(e.currentTarget);
            var timestamp = $target.data("date");
            var date = new Date(timestamp);
            if (this.o.updateViewDate) {
                if (date.getUTCFullYear() !== this.viewDate.getUTCFullYear()) this._trigger("changeYear", this.viewDate);
                if (date.getUTCMonth() !== this.viewDate.getUTCMonth()) this._trigger("changeMonth", this.viewDate);
            }
            this._setDate(date);
        },
        // Clicked on prev or next
        navArrowsClick: function(e) {
            var $target = $(e.currentTarget);
            var dir = $target.hasClass("prev") ? -1 : 1;
            if (this.viewMode !== 0) dir *= DPGlobal.viewModes[this.viewMode].navStep * 12;
            this.viewDate = this.moveMonth(this.viewDate, dir);
            this._trigger(DPGlobal.viewModes[this.viewMode].e, this.viewDate);
            this.fill();
        },
        _toggle_multidate: function(date) {
            var ix = this.dates.contains(date);
            if (!date) this.dates.clear();
            if (ix !== -1) {
                if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive) this.dates.remove(ix);
            } else if (this.o.multidate === false) {
                this.dates.clear();
                this.dates.push(date);
            } else this.dates.push(date);
            if (typeof this.o.multidate === "number") while(this.dates.length > this.o.multidate)this.dates.remove(0);
        },
        _setDate: function(date, which) {
            if (!which || which === "date") this._toggle_multidate(date && new Date(date));
            if (!which && this.o.updateViewDate || which === "view") this.viewDate = date && new Date(date);
            this.fill();
            this.setValue();
            if (!which || which !== "view") this._trigger("changeDate");
            this.inputField.trigger("change");
            if (this.o.autoclose && (!which || which === "date")) this.hide();
        },
        moveDay: function(date, dir) {
            var newDate = new Date(date);
            newDate.setUTCDate(date.getUTCDate() + dir);
            return newDate;
        },
        moveWeek: function(date, dir) {
            return this.moveDay(date, dir * 7);
        },
        moveMonth: function(date, dir) {
            if (!isValidDate(date)) return this.o.defaultViewDate;
            if (!dir) return date;
            var new_date = new Date(date.valueOf()), day = new_date.getUTCDate(), month = new_date.getUTCMonth(), mag = Math.abs(dir), new_month, test;
            dir = dir > 0 ? 1 : -1;
            if (mag === 1) {
                test = dir === -1 ? function() {
                    return new_date.getUTCMonth() === month;
                } : function() {
                    return new_date.getUTCMonth() !== new_month;
                };
                new_month = month + dir;
                new_date.setUTCMonth(new_month);
                // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
                new_month = (new_month + 12) % 12;
            } else {
                // For magnitudes >1, move one month at a time...
                for(var i = 0; i < mag; i++)// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
                new_date = this.moveMonth(new_date, dir);
                // ...then reset the day, keeping it in the new month
                new_month = new_date.getUTCMonth();
                new_date.setUTCDate(day);
                test = function() {
                    return new_month !== new_date.getUTCMonth();
                };
            }
            // Common date-resetting loop -- if date is beyond end of month, make it
            // end of month
            while(test()){
                new_date.setUTCDate(--day);
                new_date.setUTCMonth(new_month);
            }
            return new_date;
        },
        moveYear: function(date, dir) {
            return this.moveMonth(date, dir * 12);
        },
        moveAvailableDate: function(date, dir, fn) {
            do {
                date = this[fn](date, dir);
                if (!this.dateWithinRange(date)) return false;
                fn = "moveDay";
            }while (this.dateIsDisabled(date));
            return date;
        },
        weekOfDateIsDisabled: function(date) {
            return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
        },
        dateIsDisabled: function(date) {
            return this.weekOfDateIsDisabled(date) || $.grep(this.o.datesDisabled, function(d) {
                return isUTCEquals(date, d);
            }).length > 0;
        },
        dateWithinRange: function(date) {
            return date >= this.o.startDate && date <= this.o.endDate;
        },
        keydown: function(e) {
            if (!this.picker.is(":visible")) {
                if (e.keyCode === 40 || e.keyCode === 27) {
                    this.show();
                    e.stopPropagation();
                }
                return;
            }
            var dateChanged = false, dir, newViewDate, focusDate = this.focusDate || this.viewDate;
            switch(e.keyCode){
                case 27:
                    if (this.focusDate) {
                        this.focusDate = null;
                        this.viewDate = this.dates.get(-1) || this.viewDate;
                        this.fill();
                    } else this.hide();
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                case 37:
                case 38:
                case 39:
                case 40:
                    if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7) break;
                    dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
                    if (this.viewMode === 0) {
                        if (e.ctrlKey) {
                            newViewDate = this.moveAvailableDate(focusDate, dir, "moveYear");
                            if (newViewDate) this._trigger("changeYear", this.viewDate);
                        } else if (e.shiftKey) {
                            newViewDate = this.moveAvailableDate(focusDate, dir, "moveMonth");
                            if (newViewDate) this._trigger("changeMonth", this.viewDate);
                        } else if (e.keyCode === 37 || e.keyCode === 39) newViewDate = this.moveAvailableDate(focusDate, dir, "moveDay");
                        else if (!this.weekOfDateIsDisabled(focusDate)) newViewDate = this.moveAvailableDate(focusDate, dir, "moveWeek");
                    } else if (this.viewMode === 1) {
                        if (e.keyCode === 38 || e.keyCode === 40) dir = dir * 4;
                        newViewDate = this.moveAvailableDate(focusDate, dir, "moveMonth");
                    } else if (this.viewMode === 2) {
                        if (e.keyCode === 38 || e.keyCode === 40) dir = dir * 4;
                        newViewDate = this.moveAvailableDate(focusDate, dir, "moveYear");
                    }
                    if (newViewDate) {
                        this.focusDate = this.viewDate = newViewDate;
                        this.setValue();
                        this.fill();
                        e.preventDefault();
                    }
                    break;
                case 13:
                    if (!this.o.forceParse) break;
                    focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
                    if (this.o.keyboardNavigation) {
                        this._toggle_multidate(focusDate);
                        dateChanged = true;
                    }
                    this.focusDate = null;
                    this.viewDate = this.dates.get(-1) || this.viewDate;
                    this.setValue();
                    this.fill();
                    if (this.picker.is(":visible")) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (this.o.autoclose) this.hide();
                    }
                    break;
                case 9:
                    this.focusDate = null;
                    this.viewDate = this.dates.get(-1) || this.viewDate;
                    this.fill();
                    this.hide();
                    break;
            }
            if (dateChanged) {
                if (this.dates.length) this._trigger("changeDate");
                else this._trigger("clearDate");
                this.inputField.trigger("change");
            }
        },
        setViewMode: function(viewMode) {
            this.viewMode = viewMode;
            this.picker.children("div").hide().filter(".datepicker-" + DPGlobal.viewModes[this.viewMode].clsName).show();
            this.updateNavArrows();
            this._trigger("changeViewMode", new Date(this.viewDate));
        }
    };
    var DateRangePicker = function(element, options) {
        $.data(element, "datepicker", this);
        this.element = $(element);
        this.inputs = $.map(options.inputs, function(i) {
            return i.jquery ? i[0] : i;
        });
        delete options.inputs;
        this.keepEmptyValues = options.keepEmptyValues;
        delete options.keepEmptyValues;
        datepickerPlugin.call($(this.inputs), options).on("changeDate", $.proxy(this.dateUpdated, this));
        this.pickers = $.map(this.inputs, function(i) {
            return $.data(i, "datepicker");
        });
        this.updateDates();
    };
    DateRangePicker.prototype = {
        updateDates: function() {
            this.dates = $.map(this.pickers, function(i) {
                return i.getUTCDate();
            });
            this.updateRanges();
        },
        updateRanges: function() {
            var range = $.map(this.dates, function(d) {
                return d.valueOf();
            });
            $.each(this.pickers, function(i, p) {
                p.setRange(range);
            });
        },
        clearDates: function() {
            $.each(this.pickers, function(i, p) {
                p.clearDates();
            });
        },
        dateUpdated: function(e) {
            // `this.updating` is a workaround for preventing infinite recursion
            // between `changeDate` triggering and `setUTCDate` calling.  Until
            // there is a better mechanism.
            if (this.updating) return;
            this.updating = true;
            var dp = $.data(e.target, "datepicker");
            if (dp === undefined) return;
            var new_date = dp.getUTCDate(), keep_empty_values = this.keepEmptyValues, i = $.inArray(e.target, this.inputs), j = i - 1, k = i + 1, l = this.inputs.length;
            if (i === -1) return;
            $.each(this.pickers, function(i, p) {
                if (!p.getUTCDate() && (p === dp || !keep_empty_values)) p.setUTCDate(new_date);
            });
            if (new_date < this.dates[j]) // Date being moved earlier/left
            while(j >= 0 && new_date < this.dates[j])this.pickers[j--].setUTCDate(new_date);
            else if (new_date > this.dates[k]) // Date being moved later/right
            while(k < l && new_date > this.dates[k])this.pickers[k++].setUTCDate(new_date);
            this.updateDates();
            delete this.updating;
        },
        destroy: function() {
            $.map(this.pickers, function(p) {
                p.destroy();
            });
            $(this.inputs).off("changeDate", this.dateUpdated);
            delete this.element.data().datepicker;
        },
        remove: alias("destroy", "Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead")
    };
    function opts_from_el(el, prefix) {
        // Derive options from element data-attrs
        var data = $(el).data(), out = {}, inkey, replace = new RegExp("^" + prefix.toLowerCase() + "([A-Z])");
        prefix = new RegExp("^" + prefix.toLowerCase());
        function re_lower(_, a) {
            return a.toLowerCase();
        }
        for(var key in data)if (prefix.test(key)) {
            inkey = key.replace(replace, re_lower);
            out[inkey] = data[key];
        }
        return out;
    }
    function opts_from_locale(lang) {
        // Derive options from locale plugins
        var out = {};
        // Check if "de-DE" style date is available, if not language should
        // fallback to 2 letter code eg "de"
        if (!dates[lang]) {
            lang = lang.split("-")[0];
            if (!dates[lang]) return;
        }
        var d = dates[lang];
        $.each(locale_opts, function(i, k) {
            if (k in d) out[k] = d[k];
        });
        return out;
    }
    var old = $.fn.datepicker;
    var datepickerPlugin = function(option) {
        var args = Array.apply(null, arguments);
        args.shift();
        var internal_return;
        this.each(function() {
            var $this = $(this), data = $this.data("datepicker"), options = typeof option === "object" && option;
            if (!data) {
                var elopts = opts_from_el(this, "date"), // Preliminary otions
                xopts = $.extend({}, defaults, elopts, options), locopts = opts_from_locale(xopts.language), // Options priority: js args, data-attrs, locales, defaults
                opts = $.extend({}, defaults, locopts, elopts, options);
                if ($this.hasClass("input-daterange") || opts.inputs) {
                    $.extend(opts, {
                        inputs: opts.inputs || $this.find("input").toArray()
                    });
                    data = new DateRangePicker(this, opts);
                } else data = new Datepicker(this, opts);
                $this.data("datepicker", data);
            }
            if (typeof option === "string" && typeof data[option] === "function") internal_return = data[option].apply(data, args);
        });
        if (internal_return === undefined || internal_return instanceof Datepicker || internal_return instanceof DateRangePicker) return this;
        if (this.length > 1) throw new Error("Using only allowed for the collection of a single element (" + option + " function)");
        else return internal_return;
    };
    $.fn.datepicker = datepickerPlugin;
    var defaults = $.fn.datepicker.defaults = {
        assumeNearbyYear: false,
        autoclose: false,
        beforeShowDay: $.noop,
        beforeShowMonth: $.noop,
        beforeShowYear: $.noop,
        beforeShowDecade: $.noop,
        beforeShowCentury: $.noop,
        calendarWeeks: false,
        clearBtn: false,
        toggleActive: false,
        daysOfWeekDisabled: [],
        daysOfWeekHighlighted: [],
        datesDisabled: [],
        endDate: Infinity,
        forceParse: true,
        format: "mm/dd/yyyy",
        keepEmptyValues: false,
        keyboardNavigation: true,
        language: "en",
        minViewMode: 0,
        maxViewMode: 4,
        multidate: false,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: false,
        startDate: -Infinity,
        startView: 0,
        todayBtn: false,
        todayHighlight: false,
        updateViewDate: true,
        weekStart: 0,
        disableTouchKeyboard: false,
        enableOnReadonly: true,
        showOnFocus: true,
        zIndexOffset: 10,
        container: "body",
        immediateUpdates: false,
        title: "",
        templates: {
            leftArrow: "&#x00AB;",
            rightArrow: "&#x00BB;"
        },
        showWeekDays: true
    };
    var locale_opts = $.fn.datepicker.locale_opts = [
        "format",
        "rtl",
        "weekStart"
    ];
    $.fn.datepicker.Constructor = Datepicker;
    var dates = $.fn.datepicker.dates = {
        en: {
            days: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            daysShort: [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            daysMin: [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
            ],
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            monthsShort: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
            today: "Today",
            clear: "Clear",
            titleFormat: "MM yyyy"
        }
    };
    var DPGlobal = {
        viewModes: [
            {
                names: [
                    "days",
                    "month"
                ],
                clsName: "days",
                e: "changeMonth"
            },
            {
                names: [
                    "months",
                    "year"
                ],
                clsName: "months",
                e: "changeYear",
                navStep: 1
            },
            {
                names: [
                    "years",
                    "decade"
                ],
                clsName: "years",
                e: "changeDecade",
                navStep: 10
            },
            {
                names: [
                    "decades",
                    "century"
                ],
                clsName: "decades",
                e: "changeCentury",
                navStep: 100
            },
            {
                names: [
                    "centuries",
                    "millennium"
                ],
                clsName: "centuries",
                e: "changeMillennium",
                navStep: 1000
            }
        ],
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
        parseFormat: function(format) {
            if (typeof format.toValue === "function" && typeof format.toDisplay === "function") return format;
            // IE treats \0 as a string end in inputs (truncating the value),
            // so it's a bad format delimiter, anyway
            var separators = format.replace(this.validParts, "\x00").split("\x00"), parts = format.match(this.validParts);
            if (!separators || !separators.length || !parts || parts.length === 0) throw new Error("Invalid date format.");
            return {
                separators: separators,
                parts: parts
            };
        },
        parseDate: function(date, format, language, assumeNearby) {
            if (!date) return undefined;
            if (date instanceof Date) return date;
            if (typeof format === "string") format = DPGlobal.parseFormat(format);
            if (format.toValue) return format.toValue(date, format, language);
            var fn_map = {
                d: "moveDay",
                m: "moveMonth",
                w: "moveWeek",
                y: "moveYear"
            }, dateAliases = {
                yesterday: "-1d",
                today: "+0d",
                tomorrow: "+1d"
            }, parts, part, dir, i, fn;
            if (date in dateAliases) date = dateAliases[date];
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(date)) {
                parts = date.match(/([\-+]\d+)([dmwy])/gi);
                date = new Date();
                for(i = 0; i < parts.length; i++){
                    part = parts[i].match(/([\-+]\d+)([dmwy])/i);
                    dir = Number(part[1]);
                    fn = fn_map[part[2].toLowerCase()];
                    date = Datepicker.prototype[fn](date, dir);
                }
                return Datepicker.prototype._zero_utc_time(date);
            }
            parts = date && date.match(this.nonpunctuation) || [];
            function applyNearbyYear(year, threshold) {
                if (threshold === true) threshold = 10;
                // if year is 2 digits or less, than the user most likely is trying to get a recent century
                if (year < 100) {
                    year += 2000;
                    // if the new year is more than threshold years in advance, use last century
                    if (year > new Date().getFullYear() + threshold) year -= 100;
                }
                return year;
            }
            var parsed = {}, setters_order = [
                "yyyy",
                "yy",
                "M",
                "MM",
                "m",
                "mm",
                "d",
                "dd"
            ], setters_map = {
                yyyy: function(d, v) {
                    return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
                },
                m: function(d, v) {
                    if (isNaN(d)) return d;
                    v -= 1;
                    while(v < 0)v += 12;
                    v %= 12;
                    d.setUTCMonth(v);
                    while(d.getUTCMonth() !== v)d.setUTCDate(d.getUTCDate() - 1);
                    return d;
                },
                d: function(d, v) {
                    return d.setUTCDate(v);
                }
            }, val, filtered;
            setters_map["yy"] = setters_map["yyyy"];
            setters_map["M"] = setters_map["MM"] = setters_map["mm"] = setters_map["m"];
            setters_map["dd"] = setters_map["d"];
            date = UTCToday();
            var fparts = format.parts.slice();
            // Remove noop parts
            if (parts.length !== fparts.length) fparts = $(fparts).filter(function(i, p) {
                return $.inArray(p, setters_order) !== -1;
            }).toArray();
            // Process remainder
            function match_part() {
                var m = this.slice(0, parts[i].length), p = parts[i].slice(0, m.length);
                return m.toLowerCase() === p.toLowerCase();
            }
            if (parts.length === fparts.length) {
                var cnt;
                for(i = 0, cnt = fparts.length; i < cnt; i++){
                    val = parseInt(parts[i], 10);
                    part = fparts[i];
                    if (isNaN(val)) switch(part){
                        case "MM":
                            filtered = $(dates[language].months).filter(match_part);
                            val = $.inArray(filtered[0], dates[language].months) + 1;
                            break;
                        case "M":
                            filtered = $(dates[language].monthsShort).filter(match_part);
                            val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                            break;
                    }
                    parsed[part] = val;
                }
                var _date, s;
                for(i = 0; i < setters_order.length; i++){
                    s = setters_order[i];
                    if (s in parsed && !isNaN(parsed[s])) {
                        _date = new Date(date);
                        setters_map[s](_date, parsed[s]);
                        if (!isNaN(_date)) date = _date;
                    }
                }
            }
            return date;
        },
        formatDate: function(date, format, language) {
            if (!date) return "";
            if (typeof format === "string") format = DPGlobal.parseFormat(format);
            if (format.toDisplay) return format.toDisplay(date, format, language);
            var val = {
                d: date.getUTCDate(),
                D: dates[language].daysShort[date.getUTCDay()],
                DD: dates[language].days[date.getUTCDay()],
                m: date.getUTCMonth() + 1,
                M: dates[language].monthsShort[date.getUTCMonth()],
                MM: dates[language].months[date.getUTCMonth()],
                yy: date.getUTCFullYear().toString().substring(2),
                yyyy: date.getUTCFullYear()
            };
            val.dd = (val.d < 10 ? "0" : "") + val.d;
            val.mm = (val.m < 10 ? "0" : "") + val.m;
            date = [];
            var seps = $.extend([], format.separators);
            for(var i = 0, cnt = format.parts.length; i <= cnt; i++){
                if (seps.length) date.push(seps.shift());
                date.push(val[format.parts[i]]);
            }
            return date.join("");
        },
        headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">' + defaults.templates.leftArrow + "</th>" + '<th colspan="5" class="datepicker-switch"></th>' + '<th class="next">' + defaults.templates.rightArrow + "</th>" + "</tr>" + "</thead>",
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
    DPGlobal.template = '<div class="datepicker"><div class="datepicker-days"><table class="table-condensed">' + DPGlobal.headTemplate + "<tbody></tbody>" + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datepicker-months">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datepicker-years">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datepicker-decades">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + '<div class="datepicker-centuries">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table>" + "</div>" + "</div>";
    $.fn.datepicker.DPGlobal = DPGlobal;
    /* DATEPICKER NO CONFLICT
	* =================== */ $.fn.datepicker.noConflict = function() {
        $.fn.datepicker = old;
        return this;
    };
    /* DATEPICKER VERSION
	 * =================== */ $.fn.datepicker.version = "1.9.0";
    $.fn.datepicker.deprecated = function(msg) {
        var console = window.console;
        if (console && console.warn) console.warn("DEPRECATED: " + msg);
    };
    /* DATEPICKER DATA-API
	* ================== */ $(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
        var $this = $(this);
        if ($this.data("datepicker")) return;
        e.preventDefault();
        // component click requires us to explicitly show it
        datepickerPlugin.call($this, "show");
    });
    $(function() {
        datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
    });
});

},{"e4085978bcb239c1":"hgMhh"}]},["cx2iR","4QcUr"], "4QcUr", "parcelRequire8d29")

//# sourceMappingURL=student.464ee2bb.js.map
