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
})({"5W3P2":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "e3a347406d1c4a40";
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

},{}],"aK5oB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _jquery = require("jquery");
var _jqueryDefault = parcelHelpers.interopDefault(_jquery);
const indexElm = (0, _jqueryDefault.default)("#index");
const UserNameElm = (0, _jqueryDefault.default)("#Uname");
const addressElm = (0, _jqueryDefault.default)("#address");
//const birthdayElm=$('#birthday');
const genderElms = (0, _jqueryDefault.default)('input[name="gender"]');
const guaranteeNameElm = (0, _jqueryDefault.default)("#Gname");
const guaranteeContactElm = (0, _jqueryDefault.default)("#Gcontact");
const btnSave = (0, _jqueryDefault.default)("#save");
const btnAddImg = (0, _jqueryDefault.default)("#btnAddImg");
const imgInputElm = (0, _jqueryDefault.default)("#fileInput");
const tableBodyElm = (0, _jqueryDefault.default)("#tbody");
const tFootElm = (0, _jqueryDefault.default)("#tFoot");
const searchElm = (0, _jqueryDefault.default)("#search");
const tableElm = (0, _jqueryDefault.default)("#tableElement");
const imgInput = (0, _jqueryDefault.default)("#imgInput");
let x = [];
let update = false;
let imgUpload = false;
let btnSaveClick = false;
let getImage = false;
let deleteImage = true; // Flag to determine if the image should be deleted
let indexVariable;
let selectedFile;
let fileName;
let files;
let imgFiles = [];
const inputElements = [
    indexElm,
    UserNameElm,
    addressElm,
    guaranteeNameElm,
    guaranteeContactElm
];
addDataToTable();
(0, _jqueryDefault.default)(window).on("resize", adjustTrashPosition);
(0, _jqueryDefault.default)(document).ready(function() {
    // Get the logout link element
    const logoutLink = (0, _jqueryDefault.default)("#logout-link");
    // Add a click event listener to the logout link
    logoutLink.on("click", function(event) {
        event.preventDefault();
        (0, _jqueryDefault.default).ajax({
            url: "http://localhost:8080/app/api/v1/adding/logout",
            method: "GET",
            success: function(response) {
                window.location.href = "login.html"; // Redirect the user to the login page
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });
});
(0, _jqueryDefault.default)(document).on("click", ".trash", function(evt) {
    clearImage();
    (0, _jqueryDefault.default)(this).remove();
});
tableBodyElm.on("click", ".delete", (evt)=>{
    const idElm = (0, _jqueryDefault.default)(evt.target).closest("tr").children().first();
    console.log(idElm);
    // console.log(idElm);
    const idValue = idElm.text();
    console.log(idValue);
    deleteElements(idValue);
});
tableBodyElm.on("click", ".edit", (evt)=>{
    update = true;
    const allTd = (0, _jqueryDefault.default)(evt.target).closest("tr").children();
    allTd.each(function() {
        const element = (0, _jqueryDefault.default)(this).text();
        x.push(element);
    });
    indexElm.val(x[0]);
    UserNameElm.val(x[1]);
    addressElm.val(x[2]);
    genderElms.filter(function() {
        return (0, _jqueryDefault.default)(this).val() === x[3];
    }).prop("checked", true);
    guaranteeNameElm.val(x[4]);
    guaranteeContactElm.val(x[5]);
    updateElements(x[0]);
    getUrl(x[0]);
    x.length = 0; // all element inside the array is deleted
});
searchElm.on("input", (evt)=>{
    addDataToTable();
});
// $('input[name="gender"]').on('click', () => {
//     const genderElm = $('input[name="gender"]:checked');
//
// });
// listners
btnAddImg.on("click", (evt)=>{
    imgInputElm.trigger("click");
});
btnSave.on("click", (evt)=>{
    if (validation()) {
        btnSaveClick = true;
        imgInput.css({
            "background-image": `url()`
        });
        imgInput.find(".trash").remove();
    }
    if (!update) {
        sendData();
        deleteImage = false;
    // location.reload(); //to reload the web page
    } else updateElements(indexVariable);
});
window.addEventListener("beforeunload", function(event) {
    if (deleteImage) clearImage();
});
imgInputElm.on("change", (evt)=>{
    imgUpload = true;
    files = evt.target.files;
    // console.log(files);
    uploadImages(files);
});
inputElements.forEach((elements)=>{
    elements.on("input", (evt)=>{
        elements.closest(".inputElm").find(".errorcode").remove();
    });
});
function validation() {
    let validate = true;
    inputElements.forEach((elements)=>{
        elements.closest(".inputElm").find(".errorcode").remove();
    });
    const studentIndexNo = indexElm.val();
    const fullName = UserNameElm.val();
    const address = addressElm.val();
    //   const birthday = birthdayElm.val();
    const guaranteeName = guaranteeNameElm.val();
    const guaranteeContact = guaranteeContactElm.val();
    if (!studentIndexNo) validate = addingErrorClass(indexElm, "Index can not be empty");
    else if (!/^S\d{3,}$/.test(studentIndexNo)) validate = addingErrorClass(indexElm, "Please add correct format");
    if (!fullName) validate = addingErrorClass(UserNameElm, "User name can not be empty");
    else if (!/^[A-Za-z ]+$/.test(fullName)) validate = addingErrorClass(UserNameElm, "Please add correct format");
    if (!address) validate = addingErrorClass(addressElm, "Address can not be empty");
    else if (!/^[A-Za-z ]+$/.test(address)) validate = addingErrorClass(addressElm, "Please add correct format");
    //
    // // if(!birthday){
    // //     validate= addingErrorClass(birthdayElm,"Birthday can not be empty")
    //
    // }
    if (!guaranteeName) validate = addingErrorClass(guaranteeNameElm, "Guarantee name can not be empty");
    else if (!/^[A-Za-z ]+$/.test(guaranteeName)) validate = addingErrorClass(guaranteeNameElm, "Please add correct format");
    if (!guaranteeContact) validate = addingErrorClass(guaranteeContactElm, "Guarantee contact can not be empty");
    else if (!/^\d{3}-\d{7}$/.test(guaranteeContact)) validate = addingErrorClass(guaranteeContactElm, "Please add correct format");
    return validate;
}
function addingErrorClass(element, message) {
    element.closest(".inputElm").append(`<div class="errorcode">${message}</div>`);
    element.addClass("animate__jello");
    return false;
}
function sendData() {
    const studentIndexNo = indexElm.val();
    const fullName = UserNameElm.val();
    const address = addressElm.val();
    //  const birthday = birthdayElm.val();
    const genderElm = (0, _jqueryDefault.default)('input[name="gender"]:checked').val();
    const guaranteeName = guaranteeNameElm.val();
    const guaranteeContact = guaranteeContactElm.val();
    const studentInformation = {
        studentIndexNo,
        fullName,
        address,
        gender: genderElm,
        guaranteeName,
        guaranteeContact,
        fileName
    };
    if (!validation()) return;
    // btnAddImg.removeAttr('disabled');
    // console.log("after validation");
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=>{
        // console.log(birthday);
        if (xhr.readyState === 4 && xhr.status === 201) {
            resetForm();
            addDataToTable();
            console.log("inside send data");
            showToast("success", "Saved", "Data has been saved");
            setTimeout(function() {
                location.reload();
            }, 1000);
        }
    });
    xhr.open("POST", "http://localhost:8080/app/students/save", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(studentInformation));
}
function resetForm() {
    indexElm.val("");
    UserNameElm.val("");
    addressElm.val("");
    //birthdayElm.val("");
    guaranteeNameElm.val("");
    guaranteeContactElm.val("");
}
function addDataToTable() {
    const searchValue = searchElm.val();
    const query = searchValue ? `${searchValue}` : "";
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", (evt)=>{
        if (xhr.status === 200 && xhr.readyState === 4) {
            tableBodyElm.empty();
            const responseObject = JSON.parse(xhr.responseText);
            if (responseObject.length) tFootElm.remove();
            else tableElm.append(tFootElm);
            responseObject.forEach((responses)=>{
                tableBodyElm.append(`
           <tr>
        <td scope="row">${responses.studentIndexNo}</td>
        <td>${responses.fullName}</td>
        <td>${responses.address}</td>
        <td>${responses.gender}</td>
        <td>${responses.guaranteeName}</td>
        <td>${responses.guaranteeContact}</td>

        <td>
            <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                 className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
        
            <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3"
                 viewBox="0 0 16 16">
                <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
        </td>

    </tr>  
        `);
            });
        }
    });
    xhr.open("GET", `http://localhost:8080/app/students?q=${query}`, true, query);
    xhr.send();
}
function addImages(url) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", (evt)=>{
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseUrls = JSON.parse(xhr.response);
            imgInput.css({
                "background-image": `url(${responseUrls[0]})`,
                "background-size": "cover",
                "background-repeat": "no-repeat"
            });
            imgInput.append(`<div class="trash"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg></div>`);
        }
    });
    if (url == null) xhr.open("GET", `http://localhost:8080/app/students/images?q=${fileName}`, true);
    else xhr.open("GET", `http://localhost:8080/app/students/images?q=${url}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
function getUrl(index) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", (evt)=>{
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = xhr.responseText;
            if (response.trim().length === 0) console.log("okay");
            else addImages(response);
        }
    });
    xhr.open("GET", `http://localhost:8080/app/students/url?q=${index}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
function deleteElements(value) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", (evt)=>{
        if (xhr.readyState === 4 && xhr.status === 204) {
            showToast("warning", "DELETE", "Selected data has been deleted");
            setTimeout(function() {
                location.reload();
            }, 1000);
        }
    });
    xhr.open("DELETE", `http://localhost:8080/app/students/${value}`, true);
    xhr.send();
}
function updateElements(studentIndexNo) {
    indexVariable = studentIndexNo;
    console.log(indexVariable);
    const fullName = UserNameElm.val();
    const address = addressElm.val();
    const genderElm = (0, _jqueryDefault.default)('input[name="gender"]:checked').val();
    const guaranteeName = guaranteeNameElm.val();
    const guaranteeContact = guaranteeContactElm.val();
    const studentDetails = {
        indexVariable,
        fullName,
        address,
        gender: genderElm,
        guaranteeName,
        guaranteeContact,
        fileName
    };
    console.log(studentDetails);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", (evt)=>{
        if (xhr.readyState === 4 && xhr.status === 202) {
            const responseObject = JSON.parse(xhr.responseText);
            const fileName1 = responseObject.fileName;
            resetForm();
            showToast("success", "Updated", "Saved data has been updated");
            console.log(btnSaveClick);
            addDataToTable();
        }
    });
    if (update && btnSaveClick) {
        xhr.open("PATCH", `http://localhost:8080/app/students/${indexVariable}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(studentDetails));
    }
}
function showToast(toastType, header, message) {
    const toast = (0, _jqueryDefault.default)("#toast .toast");
    toast.removeClass("text-bg-success", "text-bg-warning", "text-bg-danger");
    switch(toastType){
        case "success":
            toast.addClass("text-bg-success");
            break;
        case "warning":
            toast.addClass("text-bg-warning");
            break;
        case "error":
            toast.addClass("text-bg-danger");
            break;
        default:
    }
    (0, _jqueryDefault.default)("#toast .toast-header > strong").text(header);
    (0, _jqueryDefault.default)("#toast .toast-body").text(message);
    toast.addClass("show");
    setTimeout(function() {
        toast.removeClass("show");
    }, 2000);
}
function uploadImages(allFiles) {
    const formData = new FormData();
    const selectedFile = allFiles[0];
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", (evt)=>{
        if (xhr.status === 201 && xhr.readyState === 4) {
            const url = xhr.responseText;
            fileName = url.substring(url.lastIndexOf("/") + 1);
            console.log("inside uploadImages");
            addImages();
        }
    });
    if (imgUpload) {
        formData.append("img", selectedFile);
        xhr.open("POST", "http://localhost:8080/app/students", true);
        console.log("formdat:" + formData);
        xhr.send(formData);
    }
}
function clearImage() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", (evt)=>{
        if (xhr.status === 204 && xhr.readyState === 4) {
            imgInput.css({
                "background-image": `url()`
            });
            showToast("warning", "Deleted", "Image Successfully Deleted ");
        }
    });
    console.log(fileName);
    xhr.open("DELETE", `http://localhost:8080/app/students/images/${fileName}`);
    xhr.send();
}
function adjustTrashPosition() {
    const imgInput = (0, _jqueryDefault.default)("#imgInput");
    const trash = imgInput.find(".trash");
    const imgInputPosition = imgInput.position();
    const imgInputTop = imgInputPosition.top;
    const imgInputLeft = imgInputPosition.left;
    trash.css({
        top: imgInputTop + 50 + "px",
        left: imgInputLeft + imgInput.width() + 100 + "px"
    });
}

},{"jquery":"hgMhh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["5W3P2","aK5oB"], "aK5oB", "parcelRequire8d29")

//# sourceMappingURL=student.6d1c4a40.js.map
