"use strict";
var supabaseRealtime = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/tslib/tslib.es6.mjs
  var tslib_es6_exports = {};
  __export(tslib_es6_exports, {
    __addDisposableResource: () => __addDisposableResource,
    __assign: () => __assign,
    __asyncDelegator: () => __asyncDelegator,
    __asyncGenerator: () => __asyncGenerator,
    __asyncValues: () => __asyncValues,
    __await: () => __await,
    __awaiter: () => __awaiter,
    __classPrivateFieldGet: () => __classPrivateFieldGet,
    __classPrivateFieldIn: () => __classPrivateFieldIn,
    __classPrivateFieldSet: () => __classPrivateFieldSet,
    __createBinding: () => __createBinding,
    __decorate: () => __decorate,
    __disposeResources: () => __disposeResources,
    __esDecorate: () => __esDecorate,
    __exportStar: () => __exportStar,
    __extends: () => __extends,
    __generator: () => __generator,
    __importDefault: () => __importDefault,
    __importStar: () => __importStar,
    __makeTemplateObject: () => __makeTemplateObject,
    __metadata: () => __metadata,
    __param: () => __param,
    __propKey: () => __propKey,
    __read: () => __read,
    __rest: () => __rest,
    __rewriteRelativeImportExtension: () => __rewriteRelativeImportExtension,
    __runInitializers: () => __runInitializers,
    __setFunctionName: () => __setFunctionName,
    __spread: () => __spread,
    __spreadArray: () => __spreadArray,
    __spreadArrays: () => __spreadArrays,
    __values: () => __values,
    default: () => tslib_es6_default
  });
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }
  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  function __param(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  }
  function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
      if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
      return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function(f) {
        if (done) throw new TypeError("Cannot add initializers after decoration has completed");
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
        if (result === void 0) continue;
        if (result === null || typeof result !== "object") throw new TypeError("Object expected");
        if (_ = accept(result.get)) descriptor.get = _;
        if (_ = accept(result.set)) descriptor.set = _;
        if (_ = accept(result.init)) initializers.unshift(_);
      } else if (_ = accept(result)) {
        if (kind === "field") initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  }
  function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  }
  function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
  }
  function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
  }
  function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  }
  function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
    return ar;
  }
  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function awaitReturn(f) {
      return function(v) {
        return Promise.resolve(v).then(f, reject);
      };
    }
    function verb(n, f) {
      if (g[n]) {
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
        if (f) i[n] = f(i[n]);
      }
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  }
  function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
      throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
      return this;
    }, i;
    function verb(n, f) {
      i[n] = o[n] ? function(v) {
        return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
      } : f;
    }
  }
  function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({ value: v2, done: d });
      }, reject);
    }
  }
  function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  }
  function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
      for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
  }
  function __importDefault(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  }
  function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  }
  function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
  }
  function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
      if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
      var dispose, inner;
      if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
      }
      if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
        if (async) inner = dispose;
      }
      if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
      if (inner) dispose = function() {
        try {
          inner.call(this);
        } catch (e) {
          return Promise.reject(e);
        }
      };
      env.stack.push({ value, dispose, async });
    } else if (async) {
      env.stack.push({ async: true });
    }
    return value;
  }
  function __disposeResources(env) {
    function fail(e) {
      env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  }
  function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
        return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
      });
    }
    return path;
  }
  var extendStatics, __assign, __createBinding, __setModuleDefault, ownKeys, _SuppressedError, tslib_es6_default;
  var init_tslib_es6 = __esm({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/tslib/tslib.es6.mjs"() {
      extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      };
      ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
      };
      tslib_es6_default = {
        __extends,
        __assign,
        __rest,
        __decorate,
        __param,
        __esDecorate,
        __runInitializers,
        __propKey,
        __setFunctionName,
        __metadata,
        __awaiter,
        __generator,
        __createBinding,
        __exportStar,
        __values,
        __read,
        __spread,
        __spreadArrays,
        __spreadArray,
        __await,
        __asyncGenerator,
        __asyncDelegator,
        __asyncValues,
        __makeTemplateObject,
        __importStar,
        __importDefault,
        __classPrivateFieldGet,
        __classPrivateFieldSet,
        __classPrivateFieldIn,
        __addDisposableResource,
        __disposeResources,
        __rewriteRelativeImportExtension
      };
    }
  });

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/websocket-factory.js
  var require_websocket_factory = __commonJS({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/websocket-factory.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WebSocketFactory = void 0;
      var WebSocketFactory = class {
        static detectEnvironment() {
          var _a;
          if (typeof WebSocket !== "undefined") {
            return { type: "native", constructor: WebSocket };
          }
          if (typeof globalThis !== "undefined" && typeof globalThis.WebSocket !== "undefined") {
            return { type: "native", constructor: globalThis.WebSocket };
          }
          if (typeof global !== "undefined" && typeof global.WebSocket !== "undefined") {
            return { type: "native", constructor: global.WebSocket };
          }
          if (typeof globalThis !== "undefined" && typeof globalThis.WebSocketPair !== "undefined" && typeof globalThis.WebSocket === "undefined") {
            return {
              type: "cloudflare",
              error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
              workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
            };
          }
          if (typeof globalThis !== "undefined" && globalThis.EdgeRuntime || typeof navigator !== "undefined" && ((_a = navigator.userAgent) === null || _a === void 0 ? void 0 : _a.includes("Vercel-Edge"))) {
            return {
              type: "unsupported",
              error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
              workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
            };
          }
          if (typeof process !== "undefined") {
            const processVersions = process["versions"];
            if (processVersions && processVersions["node"]) {
              const versionString = processVersions["node"];
              const nodeVersion = parseInt(versionString.replace(/^v/, "").split(".")[0]);
              if (nodeVersion >= 22) {
                if (typeof globalThis.WebSocket !== "undefined") {
                  return { type: "native", constructor: globalThis.WebSocket };
                }
                return {
                  type: "unsupported",
                  error: `Node.js ${nodeVersion} detected but native WebSocket not found.`,
                  workaround: "Provide a WebSocket implementation via the transport option."
                };
              }
              return {
                type: "unsupported",
                error: `Node.js ${nodeVersion} detected without native WebSocket support.`,
                workaround: 'For Node.js < 22, install "ws" package and provide it via the transport option:\nimport ws from "ws"\nnew RealtimeClient(url, { transport: ws })'
              };
            }
          }
          return {
            type: "unsupported",
            error: "Unknown JavaScript runtime without WebSocket support.",
            workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
          };
        }
        static getWebSocketConstructor() {
          const env = this.detectEnvironment();
          if (env.constructor) {
            return env.constructor;
          }
          let errorMessage = env.error || "WebSocket not supported in this environment.";
          if (env.workaround) {
            errorMessage += `

Suggested solution: ${env.workaround}`;
          }
          throw new Error(errorMessage);
        }
        static createWebSocket(url, protocols) {
          const WS = this.getWebSocketConstructor();
          return new WS(url, protocols);
        }
        static isWebSocketSupported() {
          try {
            const env = this.detectEnvironment();
            return env.type === "native" || env.type === "ws";
          } catch (_a) {
            return false;
          }
        }
      };
      exports.WebSocketFactory = WebSocketFactory;
      exports.default = WebSocketFactory;
    }
  });

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/version.js
  var require_version = __commonJS({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.version = void 0;
      exports.version = "2.78.0";
    }
  });

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/constants.js
  var require_constants = __commonJS({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CONNECTION_STATE = exports.TRANSPORTS = exports.CHANNEL_EVENTS = exports.CHANNEL_STATES = exports.SOCKET_STATES = exports.MAX_PUSH_BUFFER_SIZE = exports.WS_CLOSE_NORMAL = exports.DEFAULT_TIMEOUT = exports.VERSION = exports.VSN = exports.DEFAULT_VERSION = void 0;
      var version_1 = require_version();
      exports.DEFAULT_VERSION = `realtime-js/${version_1.version}`;
      exports.VSN = "1.0.0";
      exports.VERSION = version_1.version;
      exports.DEFAULT_TIMEOUT = 1e4;
      exports.WS_CLOSE_NORMAL = 1e3;
      exports.MAX_PUSH_BUFFER_SIZE = 100;
      var SOCKET_STATES;
      (function(SOCKET_STATES2) {
        SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
        SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
        SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
        SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
      })(SOCKET_STATES || (exports.SOCKET_STATES = SOCKET_STATES = {}));
      var CHANNEL_STATES;
      (function(CHANNEL_STATES2) {
        CHANNEL_STATES2["closed"] = "closed";
        CHANNEL_STATES2["errored"] = "errored";
        CHANNEL_STATES2["joined"] = "joined";
        CHANNEL_STATES2["joining"] = "joining";
        CHANNEL_STATES2["leaving"] = "leaving";
      })(CHANNEL_STATES || (exports.CHANNEL_STATES = CHANNEL_STATES = {}));
      var CHANNEL_EVENTS;
      (function(CHANNEL_EVENTS2) {
        CHANNEL_EVENTS2["close"] = "phx_close";
        CHANNEL_EVENTS2["error"] = "phx_error";
        CHANNEL_EVENTS2["join"] = "phx_join";
        CHANNEL_EVENTS2["reply"] = "phx_reply";
        CHANNEL_EVENTS2["leave"] = "phx_leave";
        CHANNEL_EVENTS2["access_token"] = "access_token";
      })(CHANNEL_EVENTS || (exports.CHANNEL_EVENTS = CHANNEL_EVENTS = {}));
      var TRANSPORTS;
      (function(TRANSPORTS2) {
        TRANSPORTS2["websocket"] = "websocket";
      })(TRANSPORTS || (exports.TRANSPORTS = TRANSPORTS = {}));
      var CONNECTION_STATE;
      (function(CONNECTION_STATE2) {
        CONNECTION_STATE2["Connecting"] = "connecting";
        CONNECTION_STATE2["Open"] = "open";
        CONNECTION_STATE2["Closing"] = "closing";
        CONNECTION_STATE2["Closed"] = "closed";
      })(CONNECTION_STATE || (exports.CONNECTION_STATE = CONNECTION_STATE = {}));
    }
  });

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/serializer.js
  var require_serializer = __commonJS({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/serializer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Serializer = class {
        constructor() {
          this.HEADER_LENGTH = 1;
        }
        decode(rawPayload, callback) {
          if (rawPayload.constructor === ArrayBuffer) {
            return callback(this._binaryDecode(rawPayload));
          }
          if (typeof rawPayload === "string") {
            return callback(JSON.parse(rawPayload));
          }
          return callback({});
        }
        _binaryDecode(buffer) {
          const view = new DataView(buffer);
          const decoder = new TextDecoder();
          return this._decodeBroadcast(buffer, view, decoder);
        }
        _decodeBroadcast(buffer, view, decoder) {
          const topicSize = view.getUint8(1);
          const eventSize = view.getUint8(2);
          let offset = this.HEADER_LENGTH + 2;
          const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
          offset = offset + topicSize;
          const event = decoder.decode(buffer.slice(offset, offset + eventSize));
          offset = offset + eventSize;
          const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
          return { ref: null, topic, event, payload: data };
        }
      };
      exports.default = Serializer;
    }
  });

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/timer.js
  var require_timer = __commonJS({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/timer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Timer = class {
        constructor(callback, timerCalc) {
          this.callback = callback;
          this.timerCalc = timerCalc;
          this.timer = void 0;
          this.tries = 0;
          this.callback = callback;
          this.timerCalc = timerCalc;
        }
        reset() {
          this.tries = 0;
          clearTimeout(this.timer);
          this.timer = void 0;
        }
        // Cancels any previous scheduleTimeout and schedules callback
        scheduleTimeout() {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.tries = this.tries + 1;
            this.callback();
          }, this.timerCalc(this.tries + 1));
        }
      };
      exports.default = Timer;
    }
  });

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/transformers.js
  var require_transformers = __commonJS({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/transformers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.httpEndpointURL = exports.toTimestampString = exports.toArray = exports.toJson = exports.toNumber = exports.toBoolean = exports.convertCell = exports.convertColumn = exports.convertChangeData = exports.PostgresTypes = void 0;
      var PostgresTypes;
      (function(PostgresTypes2) {
        PostgresTypes2["abstime"] = "abstime";
        PostgresTypes2["bool"] = "bool";
        PostgresTypes2["date"] = "date";
        PostgresTypes2["daterange"] = "daterange";
        PostgresTypes2["float4"] = "float4";
        PostgresTypes2["float8"] = "float8";
        PostgresTypes2["int2"] = "int2";
        PostgresTypes2["int4"] = "int4";
        PostgresTypes2["int4range"] = "int4range";
        PostgresTypes2["int8"] = "int8";
        PostgresTypes2["int8range"] = "int8range";
        PostgresTypes2["json"] = "json";
        PostgresTypes2["jsonb"] = "jsonb";
        PostgresTypes2["money"] = "money";
        PostgresTypes2["numeric"] = "numeric";
        PostgresTypes2["oid"] = "oid";
        PostgresTypes2["reltime"] = "reltime";
        PostgresTypes2["text"] = "text";
        PostgresTypes2["time"] = "time";
        PostgresTypes2["timestamp"] = "timestamp";
        PostgresTypes2["timestamptz"] = "timestamptz";
        PostgresTypes2["timetz"] = "timetz";
        PostgresTypes2["tsrange"] = "tsrange";
        PostgresTypes2["tstzrange"] = "tstzrange";
      })(PostgresTypes || (exports.PostgresTypes = PostgresTypes = {}));
      var convertChangeData = (columns, record, options = {}) => {
        var _a;
        const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
        if (!record) {
          return {};
        }
        return Object.keys(record).reduce((acc, rec_key) => {
          acc[rec_key] = (0, exports.convertColumn)(rec_key, columns, record, skipTypes);
          return acc;
        }, {});
      };
      exports.convertChangeData = convertChangeData;
      var convertColumn = (columnName, columns, record, skipTypes) => {
        const column = columns.find((x) => x.name === columnName);
        const colType = column === null || column === void 0 ? void 0 : column.type;
        const value = record[columnName];
        if (colType && !skipTypes.includes(colType)) {
          return (0, exports.convertCell)(colType, value);
        }
        return noop(value);
      };
      exports.convertColumn = convertColumn;
      var convertCell = (type, value) => {
        if (type.charAt(0) === "_") {
          const dataType = type.slice(1, type.length);
          return (0, exports.toArray)(value, dataType);
        }
        switch (type) {
          case PostgresTypes.bool:
            return (0, exports.toBoolean)(value);
          case PostgresTypes.float4:
          case PostgresTypes.float8:
          case PostgresTypes.int2:
          case PostgresTypes.int4:
          case PostgresTypes.int8:
          case PostgresTypes.numeric:
          case PostgresTypes.oid:
            return (0, exports.toNumber)(value);
          case PostgresTypes.json:
          case PostgresTypes.jsonb:
            return (0, exports.toJson)(value);
          case PostgresTypes.timestamp:
            return (0, exports.toTimestampString)(value);
          // Format to be consistent with PostgREST
          case PostgresTypes.abstime:
          // To allow users to cast it based on Timezone
          case PostgresTypes.date:
          // To allow users to cast it based on Timezone
          case PostgresTypes.daterange:
          case PostgresTypes.int4range:
          case PostgresTypes.int8range:
          case PostgresTypes.money:
          case PostgresTypes.reltime:
          // To allow users to cast it based on Timezone
          case PostgresTypes.text:
          case PostgresTypes.time:
          // To allow users to cast it based on Timezone
          case PostgresTypes.timestamptz:
          // To allow users to cast it based on Timezone
          case PostgresTypes.timetz:
          // To allow users to cast it based on Timezone
          case PostgresTypes.tsrange:
          case PostgresTypes.tstzrange:
            return noop(value);
          default:
            return noop(value);
        }
      };
      exports.convertCell = convertCell;
      var noop = (value) => {
        return value;
      };
      var toBoolean = (value) => {
        switch (value) {
          case "t":
            return true;
          case "f":
            return false;
          default:
            return value;
        }
      };
      exports.toBoolean = toBoolean;
      var toNumber = (value) => {
        if (typeof value === "string") {
          const parsedValue = parseFloat(value);
          if (!Number.isNaN(parsedValue)) {
            return parsedValue;
          }
        }
        return value;
      };
      exports.toNumber = toNumber;
      var toJson = (value) => {
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch (error) {
            console.log(`JSON parse error: ${error}`);
            return value;
          }
        }
        return value;
      };
      exports.toJson = toJson;
      var toArray = (value, type) => {
        if (typeof value !== "string") {
          return value;
        }
        const lastIdx = value.length - 1;
        const closeBrace = value[lastIdx];
        const openBrace = value[0];
        if (openBrace === "{" && closeBrace === "}") {
          let arr;
          const valTrim = value.slice(1, lastIdx);
          try {
            arr = JSON.parse("[" + valTrim + "]");
          } catch (_) {
            arr = valTrim ? valTrim.split(",") : [];
          }
          return arr.map((val) => (0, exports.convertCell)(type, val));
        }
        return value;
      };
      exports.toArray = toArray;
      var toTimestampString = (value) => {
        if (typeof value === "string") {
          return value.replace(" ", "T");
        }
        return value;
      };
      exports.toTimestampString = toTimestampString;
      var httpEndpointURL = (socketUrl) => {
        const wsUrl = new URL(socketUrl);
        wsUrl.protocol = wsUrl.protocol.replace(/^ws/i, "http");
        wsUrl.pathname = wsUrl.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, "");
        if (wsUrl.pathname === "" || wsUrl.pathname === "/") {
          wsUrl.pathname = "/api/broadcast";
        } else {
          wsUrl.pathname = wsUrl.pathname + "/api/broadcast";
        }
        return wsUrl.href;
      };
      exports.httpEndpointURL = httpEndpointURL;
    }
  });

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/push.js
  var require_push = __commonJS({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/lib/push.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var constants_1 = require_constants();
      var Push = class {
        /**
         * Initializes the Push
         *
         * @param channel The Channel
         * @param event The event, for example `"phx_join"`
         * @param payload The payload, for example `{user_id: 123}`
         * @param timeout The push timeout in milliseconds
         */
        constructor(channel, event, payload = {}, timeout = constants_1.DEFAULT_TIMEOUT) {
          this.channel = channel;
          this.event = event;
          this.payload = payload;
          this.timeout = timeout;
          this.sent = false;
          this.timeoutTimer = void 0;
          this.ref = "";
          this.receivedResp = null;
          this.recHooks = [];
          this.refEvent = null;
        }
        resend(timeout) {
          this.timeout = timeout;
          this._cancelRefEvent();
          this.ref = "";
          this.refEvent = null;
          this.receivedResp = null;
          this.sent = false;
          this.send();
        }
        send() {
          if (this._hasReceived("timeout")) {
            return;
          }
          this.startTimeout();
          this.sent = true;
          this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload,
            ref: this.ref,
            join_ref: this.channel._joinRef()
          });
        }
        updatePayload(payload) {
          this.payload = Object.assign(Object.assign({}, this.payload), payload);
        }
        receive(status, callback) {
          var _a;
          if (this._hasReceived(status)) {
            callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
          }
          this.recHooks.push({ status, callback });
          return this;
        }
        startTimeout() {
          if (this.timeoutTimer) {
            return;
          }
          this.ref = this.channel.socket._makeRef();
          this.refEvent = this.channel._replyEventName(this.ref);
          const callback = (payload) => {
            this._cancelRefEvent();
            this._cancelTimeout();
            this.receivedResp = payload;
            this._matchReceive(payload);
          };
          this.channel._on(this.refEvent, {}, callback);
          this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
          }, this.timeout);
        }
        trigger(status, response) {
          if (this.refEvent)
            this.channel._trigger(this.refEvent, { status, response });
        }
        destroy() {
          this._cancelRefEvent();
          this._cancelTimeout();
        }
        _cancelRefEvent() {
          if (!this.refEvent) {
            return;
          }
          this.channel._off(this.refEvent, {});
        }
        _cancelTimeout() {
          clearTimeout(this.timeoutTimer);
          this.timeoutTimer = void 0;
        }
        _matchReceive({ status, response }) {
          this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
        }
        _hasReceived(status) {
          return this.receivedResp && this.receivedResp.status === status;
        }
      };
      exports.default = Push;
    }
  });

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/RealtimePresence.js
  var require_RealtimePresence = __commonJS({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/RealtimePresence.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.REALTIME_PRESENCE_LISTEN_EVENTS = void 0;
      var REALTIME_PRESENCE_LISTEN_EVENTS;
      (function(REALTIME_PRESENCE_LISTEN_EVENTS2) {
        REALTIME_PRESENCE_LISTEN_EVENTS2["SYNC"] = "sync";
        REALTIME_PRESENCE_LISTEN_EVENTS2["JOIN"] = "join";
        REALTIME_PRESENCE_LISTEN_EVENTS2["LEAVE"] = "leave";
      })(REALTIME_PRESENCE_LISTEN_EVENTS || (exports.REALTIME_PRESENCE_LISTEN_EVENTS = REALTIME_PRESENCE_LISTEN_EVENTS = {}));
      var RealtimePresence = class _RealtimePresence {
        /**
         * Initializes the Presence.
         *
         * @param channel - The RealtimeChannel
         * @param opts - The options,
         *        for example `{events: {state: 'state', diff: 'diff'}}`
         */
        constructor(channel, opts) {
          this.channel = channel;
          this.state = {};
          this.pendingDiffs = [];
          this.joinRef = null;
          this.enabled = false;
          this.caller = {
            onJoin: () => {
            },
            onLeave: () => {
            },
            onSync: () => {
            }
          };
          const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
            state: "presence_state",
            diff: "presence_diff"
          };
          this.channel._on(events.state, {}, (newState) => {
            const { onJoin, onLeave, onSync } = this.caller;
            this.joinRef = this.channel._joinRef();
            this.state = _RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
            this.pendingDiffs.forEach((diff) => {
              this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
            });
            this.pendingDiffs = [];
            onSync();
          });
          this.channel._on(events.diff, {}, (diff) => {
            const { onJoin, onLeave, onSync } = this.caller;
            if (this.inPendingSyncState()) {
              this.pendingDiffs.push(diff);
            } else {
              this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
              onSync();
            }
          });
          this.onJoin((key, currentPresences, newPresences) => {
            this.channel._trigger("presence", {
              event: "join",
              key,
              currentPresences,
              newPresences
            });
          });
          this.onLeave((key, currentPresences, leftPresences) => {
            this.channel._trigger("presence", {
              event: "leave",
              key,
              currentPresences,
              leftPresences
            });
          });
          this.onSync(() => {
            this.channel._trigger("presence", { event: "sync" });
          });
        }
        /**
         * Used to sync the list of presences on the server with the
         * client's state.
         *
         * An optional `onJoin` and `onLeave` callback can be provided to
         * react to changes in the client's local presences across
         * disconnects and reconnects with the server.
         *
         * @internal
         */
        static syncState(currentState, newState, onJoin, onLeave) {
          const state = this.cloneDeep(currentState);
          const transformedState = this.transformState(newState);
          const joins = {};
          const leaves = {};
          this.map(state, (key, presences) => {
            if (!transformedState[key]) {
              leaves[key] = presences;
            }
          });
          this.map(transformedState, (key, newPresences) => {
            const currentPresences = state[key];
            if (currentPresences) {
              const newPresenceRefs = newPresences.map((m) => m.presence_ref);
              const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
              const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
              const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
              if (joinedPresences.length > 0) {
                joins[key] = joinedPresences;
              }
              if (leftPresences.length > 0) {
                leaves[key] = leftPresences;
              }
            } else {
              joins[key] = newPresences;
            }
          });
          return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
        }
        /**
         * Used to sync a diff of presence join and leave events from the
         * server, as they happen.
         *
         * Like `syncState`, `syncDiff` accepts optional `onJoin` and
         * `onLeave` callbacks to react to a user joining or leaving from a
         * device.
         *
         * @internal
         */
        static syncDiff(state, diff, onJoin, onLeave) {
          const { joins, leaves } = {
            joins: this.transformState(diff.joins),
            leaves: this.transformState(diff.leaves)
          };
          if (!onJoin) {
            onJoin = () => {
            };
          }
          if (!onLeave) {
            onLeave = () => {
            };
          }
          this.map(joins, (key, newPresences) => {
            var _a;
            const currentPresences = (_a = state[key]) !== null && _a !== void 0 ? _a : [];
            state[key] = this.cloneDeep(newPresences);
            if (currentPresences.length > 0) {
              const joinedPresenceRefs = state[key].map((m) => m.presence_ref);
              const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
              state[key].unshift(...curPresences);
            }
            onJoin(key, currentPresences, newPresences);
          });
          this.map(leaves, (key, leftPresences) => {
            let currentPresences = state[key];
            if (!currentPresences)
              return;
            const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
            currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
            state[key] = currentPresences;
            onLeave(key, currentPresences, leftPresences);
            if (currentPresences.length === 0)
              delete state[key];
          });
          return state;
        }
        /** @internal */
        static map(obj, func) {
          return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
        }
        /**
         * Remove 'metas' key
         * Change 'phx_ref' to 'presence_ref'
         * Remove 'phx_ref' and 'phx_ref_prev'
         *
         * @example
         * // returns {
         *  abc123: [
         *    { presence_ref: '2', user_id: 1 },
         *    { presence_ref: '3', user_id: 2 }
         *  ]
         * }
         * RealtimePresence.transformState({
         *  abc123: {
         *    metas: [
         *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
         *      { phx_ref: '3', user_id: 2 }
         *    ]
         *  }
         * })
         *
         * @internal
         */
        static transformState(state) {
          state = this.cloneDeep(state);
          return Object.getOwnPropertyNames(state).reduce((newState, key) => {
            const presences = state[key];
            if ("metas" in presences) {
              newState[key] = presences.metas.map((presence) => {
                presence["presence_ref"] = presence["phx_ref"];
                delete presence["phx_ref"];
                delete presence["phx_ref_prev"];
                return presence;
              });
            } else {
              newState[key] = presences;
            }
            return newState;
          }, {});
        }
        /** @internal */
        static cloneDeep(obj) {
          return JSON.parse(JSON.stringify(obj));
        }
        /** @internal */
        onJoin(callback) {
          this.caller.onJoin = callback;
        }
        /** @internal */
        onLeave(callback) {
          this.caller.onLeave = callback;
        }
        /** @internal */
        onSync(callback) {
          this.caller.onSync = callback;
        }
        /** @internal */
        inPendingSyncState() {
          return !this.joinRef || this.joinRef !== this.channel._joinRef();
        }
      };
      exports.default = RealtimePresence;
    }
  });

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/RealtimeChannel.js
  var require_RealtimeChannel = __commonJS({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/RealtimeChannel.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.REALTIME_CHANNEL_STATES = exports.REALTIME_SUBSCRIBE_STATES = exports.REALTIME_LISTEN_TYPES = exports.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = void 0;
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var constants_1 = require_constants();
      var push_1 = tslib_1.__importDefault(require_push());
      var timer_1 = tslib_1.__importDefault(require_timer());
      var RealtimePresence_1 = tslib_1.__importDefault(require_RealtimePresence());
      var Transformers = tslib_1.__importStar(require_transformers());
      var transformers_1 = require_transformers();
      var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
      (function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2) {
        REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["ALL"] = "*";
        REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["INSERT"] = "INSERT";
        REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["UPDATE"] = "UPDATE";
        REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["DELETE"] = "DELETE";
      })(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (exports.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
      var REALTIME_LISTEN_TYPES;
      (function(REALTIME_LISTEN_TYPES2) {
        REALTIME_LISTEN_TYPES2["BROADCAST"] = "broadcast";
        REALTIME_LISTEN_TYPES2["PRESENCE"] = "presence";
        REALTIME_LISTEN_TYPES2["POSTGRES_CHANGES"] = "postgres_changes";
        REALTIME_LISTEN_TYPES2["SYSTEM"] = "system";
      })(REALTIME_LISTEN_TYPES || (exports.REALTIME_LISTEN_TYPES = REALTIME_LISTEN_TYPES = {}));
      var REALTIME_SUBSCRIBE_STATES;
      (function(REALTIME_SUBSCRIBE_STATES2) {
        REALTIME_SUBSCRIBE_STATES2["SUBSCRIBED"] = "SUBSCRIBED";
        REALTIME_SUBSCRIBE_STATES2["TIMED_OUT"] = "TIMED_OUT";
        REALTIME_SUBSCRIBE_STATES2["CLOSED"] = "CLOSED";
        REALTIME_SUBSCRIBE_STATES2["CHANNEL_ERROR"] = "CHANNEL_ERROR";
      })(REALTIME_SUBSCRIBE_STATES || (exports.REALTIME_SUBSCRIBE_STATES = REALTIME_SUBSCRIBE_STATES = {}));
      exports.REALTIME_CHANNEL_STATES = constants_1.CHANNEL_STATES;
      var RealtimeChannel = class _RealtimeChannel {
        constructor(topic, params = { config: {} }, socket) {
          var _a, _b;
          this.topic = topic;
          this.params = params;
          this.socket = socket;
          this.bindings = {};
          this.state = constants_1.CHANNEL_STATES.closed;
          this.joinedOnce = false;
          this.pushBuffer = [];
          this.subTopic = topic.replace(/^realtime:/i, "");
          this.params.config = Object.assign({
            broadcast: { ack: false, self: false },
            presence: { key: "", enabled: false },
            private: false
          }, params.config);
          this.timeout = this.socket.timeout;
          this.joinPush = new push_1.default(this, constants_1.CHANNEL_EVENTS.join, this.params, this.timeout);
          this.rejoinTimer = new timer_1.default(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
          this.joinPush.receive("ok", () => {
            this.state = constants_1.CHANNEL_STATES.joined;
            this.rejoinTimer.reset();
            this.pushBuffer.forEach((pushEvent) => pushEvent.send());
            this.pushBuffer = [];
          });
          this._onClose(() => {
            this.rejoinTimer.reset();
            this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
            this.state = constants_1.CHANNEL_STATES.closed;
            this.socket._remove(this);
          });
          this._onError((reason) => {
            if (this._isLeaving() || this._isClosed()) {
              return;
            }
            this.socket.log("channel", `error ${this.topic}`, reason);
            this.state = constants_1.CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
          });
          this.joinPush.receive("timeout", () => {
            if (!this._isJoining()) {
              return;
            }
            this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
            this.state = constants_1.CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
          });
          this.joinPush.receive("error", (reason) => {
            if (this._isLeaving() || this._isClosed()) {
              return;
            }
            this.socket.log("channel", `error ${this.topic}`, reason);
            this.state = constants_1.CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
          });
          this._on(constants_1.CHANNEL_EVENTS.reply, {}, (payload, ref) => {
            this._trigger(this._replyEventName(ref), payload);
          });
          this.presence = new RealtimePresence_1.default(this);
          this.broadcastEndpointURL = (0, transformers_1.httpEndpointURL)(this.socket.endPoint);
          this.private = this.params.config.private || false;
          if (!this.private && ((_b = (_a = this.params.config) === null || _a === void 0 ? void 0 : _a.broadcast) === null || _b === void 0 ? void 0 : _b.replay)) {
            throw `tried to use replay on public channel '${this.topic}'. It must be a private channel.`;
          }
        }
        /** Subscribe registers your client with the server */
        subscribe(callback, timeout = this.timeout) {
          var _a, _b, _c;
          if (!this.socket.isConnected()) {
            this.socket.connect();
          }
          if (this.state == constants_1.CHANNEL_STATES.closed) {
            const { config: { broadcast, presence, private: isPrivate } } = this.params;
            const postgres_changes = (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r) => r.filter)) !== null && _b !== void 0 ? _b : [];
            const presence_enabled = !!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] && this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0 || ((_c = this.params.config.presence) === null || _c === void 0 ? void 0 : _c.enabled) === true;
            const accessTokenPayload = {};
            const config = {
              broadcast,
              presence: Object.assign(Object.assign({}, presence), { enabled: presence_enabled }),
              postgres_changes,
              private: isPrivate
            };
            if (this.socket.accessTokenValue) {
              accessTokenPayload.access_token = this.socket.accessTokenValue;
            }
            this._onError((e) => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, e));
            this._onClose(() => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CLOSED));
            this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
            this.joinedOnce = true;
            this._rejoin(timeout);
            this.joinPush.receive("ok", async ({ postgres_changes: postgres_changes2 }) => {
              var _a2;
              this.socket.setAuth();
              if (postgres_changes2 === void 0) {
                callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
                return;
              } else {
                const clientPostgresBindings = this.bindings.postgres_changes;
                const bindingsLen = (_a2 = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a2 !== void 0 ? _a2 : 0;
                const newPostgresBindings = [];
                for (let i = 0; i < bindingsLen; i++) {
                  const clientPostgresBinding = clientPostgresBindings[i];
                  const { filter: { event, schema, table, filter } } = clientPostgresBinding;
                  const serverPostgresFilter = postgres_changes2 && postgres_changes2[i];
                  if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
                    newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
                  } else {
                    this.unsubscribe();
                    this.state = constants_1.CHANNEL_STATES.errored;
                    callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
                    return;
                  }
                }
                this.bindings.postgres_changes = newPostgresBindings;
                callback && callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
                return;
              }
            }).receive("error", (error) => {
              this.state = constants_1.CHANNEL_STATES.errored;
              callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(error).join(", ") || "error")));
              return;
            }).receive("timeout", () => {
              callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
              return;
            });
          }
          return this;
        }
        presenceState() {
          return this.presence.state;
        }
        async track(payload, opts = {}) {
          return await this.send({
            type: "presence",
            event: "track",
            payload
          }, opts.timeout || this.timeout);
        }
        async untrack(opts = {}) {
          return await this.send({
            type: "presence",
            event: "untrack"
          }, opts);
        }
        on(type, filter, callback) {
          if (this.state === constants_1.CHANNEL_STATES.joined && type === REALTIME_LISTEN_TYPES.PRESENCE) {
            this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`);
            this.unsubscribe().then(() => this.subscribe());
          }
          return this._on(type, filter, callback);
        }
        /**
         * Sends a broadcast message explicitly via REST API.
         *
         * This method always uses the REST API endpoint regardless of WebSocket connection state.
         * Useful when you want to guarantee REST delivery or when gradually migrating from implicit REST fallback.
         *
         * @param event The name of the broadcast event
         * @param payload Payload to be sent (required)
         * @param opts Options including timeout
         * @returns Promise resolving to object with success status, and error details if failed
         */
        async httpSend(event, payload, opts = {}) {
          var _a;
          const authorization = this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "";
          if (payload === void 0 || payload === null) {
            return Promise.reject("Payload is required for httpSend()");
          }
          const options = {
            method: "POST",
            headers: {
              Authorization: authorization,
              apikey: this.socket.apiKey ? this.socket.apiKey : "",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              messages: [
                {
                  topic: this.subTopic,
                  event,
                  payload,
                  private: this.private
                }
              ]
            })
          };
          const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
          if (response.status === 202) {
            return { success: true };
          }
          let errorMessage = response.statusText;
          try {
            const errorBody = await response.json();
            errorMessage = errorBody.error || errorBody.message || errorMessage;
          } catch (_b) {
          }
          return Promise.reject(new Error(errorMessage));
        }
        /**
         * Sends a message into the channel.
         *
         * @param args Arguments to send to channel
         * @param args.type The type of event to send
         * @param args.event The name of the event being sent
         * @param args.payload Payload to be sent
         * @param opts Options to be used during the send process
         */
        async send(args, opts = {}) {
          var _a, _b;
          if (!this._canPush() && args.type === "broadcast") {
            console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
            const { event, payload: endpoint_payload } = args;
            const authorization = this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "";
            const options = {
              method: "POST",
              headers: {
                Authorization: authorization,
                apikey: this.socket.apiKey ? this.socket.apiKey : "",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                messages: [
                  {
                    topic: this.subTopic,
                    event,
                    payload: endpoint_payload,
                    private: this.private
                  }
                ]
              })
            };
            try {
              const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
              await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
              return response.ok ? "ok" : "error";
            } catch (error) {
              if (error.name === "AbortError") {
                return "timed out";
              } else {
                return "error";
              }
            }
          } else {
            return new Promise((resolve) => {
              var _a2, _b2, _c;
              const push = this._push(args.type, args, opts.timeout || this.timeout);
              if (args.type === "broadcast" && !((_c = (_b2 = (_a2 = this.params) === null || _a2 === void 0 ? void 0 : _a2.config) === null || _b2 === void 0 ? void 0 : _b2.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
                resolve("ok");
              }
              push.receive("ok", () => resolve("ok"));
              push.receive("error", () => resolve("error"));
              push.receive("timeout", () => resolve("timed out"));
            });
          }
        }
        updateJoinPayload(payload) {
          this.joinPush.updatePayload(payload);
        }
        /**
         * Leaves the channel.
         *
         * Unsubscribes from server events, and instructs channel to terminate on server.
         * Triggers onClose() hooks.
         *
         * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
         * channel.unsubscribe().receive("ok", () => alert("left!") )
         */
        unsubscribe(timeout = this.timeout) {
          this.state = constants_1.CHANNEL_STATES.leaving;
          const onClose = () => {
            this.socket.log("channel", `leave ${this.topic}`);
            this._trigger(constants_1.CHANNEL_EVENTS.close, "leave", this._joinRef());
          };
          this.joinPush.destroy();
          let leavePush = null;
          return new Promise((resolve) => {
            leavePush = new push_1.default(this, constants_1.CHANNEL_EVENTS.leave, {}, timeout);
            leavePush.receive("ok", () => {
              onClose();
              resolve("ok");
            }).receive("timeout", () => {
              onClose();
              resolve("timed out");
            }).receive("error", () => {
              resolve("error");
            });
            leavePush.send();
            if (!this._canPush()) {
              leavePush.trigger("ok", {});
            }
          }).finally(() => {
            leavePush === null || leavePush === void 0 ? void 0 : leavePush.destroy();
          });
        }
        /**
         * Teardown the channel.
         *
         * Destroys and stops related timers.
         */
        teardown() {
          this.pushBuffer.forEach((push) => push.destroy());
          this.pushBuffer = [];
          this.rejoinTimer.reset();
          this.joinPush.destroy();
          this.state = constants_1.CHANNEL_STATES.closed;
          this.bindings = {};
        }
        /** @internal */
        async _fetchWithTimeout(url, options, timeout) {
          const controller = new AbortController();
          const id = setTimeout(() => controller.abort(), timeout);
          const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), { signal: controller.signal }));
          clearTimeout(id);
          return response;
        }
        /** @internal */
        _push(event, payload, timeout = this.timeout) {
          if (!this.joinedOnce) {
            throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
          }
          let pushEvent = new push_1.default(this, event, payload, timeout);
          if (this._canPush()) {
            pushEvent.send();
          } else {
            this._addToPushBuffer(pushEvent);
          }
          return pushEvent;
        }
        /** @internal */
        _addToPushBuffer(pushEvent) {
          pushEvent.startTimeout();
          this.pushBuffer.push(pushEvent);
          if (this.pushBuffer.length > constants_1.MAX_PUSH_BUFFER_SIZE) {
            const removedPush = this.pushBuffer.shift();
            if (removedPush) {
              removedPush.destroy();
              this.socket.log("channel", `discarded push due to buffer overflow: ${removedPush.event}`, removedPush.payload);
            }
          }
        }
        /**
         * Overridable message hook
         *
         * Receives all events for specialized message handling before dispatching to the channel callbacks.
         * Must return the payload, modified or unmodified.
         *
         * @internal
         */
        _onMessage(_event, payload, _ref) {
          return payload;
        }
        /** @internal */
        _isMember(topic) {
          return this.topic === topic;
        }
        /** @internal */
        _joinRef() {
          return this.joinPush.ref;
        }
        /** @internal */
        _trigger(type, payload, ref) {
          var _a, _b;
          const typeLower = type.toLocaleLowerCase();
          const { close, error, leave, join } = constants_1.CHANNEL_EVENTS;
          const events = [close, error, leave, join];
          if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
            return;
          }
          let handledPayload = this._onMessage(typeLower, payload, ref);
          if (payload && !handledPayload) {
            throw "channel onMessage callbacks must return the payload, modified or unmodified";
          }
          if (["insert", "update", "delete"].includes(typeLower)) {
            (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter((bind) => {
              var _a2, _b2, _c;
              return ((_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event) === "*" || ((_c = (_b2 = bind.filter) === null || _b2 === void 0 ? void 0 : _b2.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
            }).map((bind) => bind.callback(handledPayload, ref));
          } else {
            (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
              var _a2, _b2, _c, _d, _e, _f;
              if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
                if ("id" in bind) {
                  const bindId = bind.id;
                  const bindEvent = (_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event;
                  return bindId && ((_b2 = payload.ids) === null || _b2 === void 0 ? void 0 : _b2.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
                } else {
                  const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
                  return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
                }
              } else {
                return bind.type.toLocaleLowerCase() === typeLower;
              }
            }).map((bind) => {
              if (typeof handledPayload === "object" && "ids" in handledPayload) {
                const postgresChanges = handledPayload.data;
                const { schema, table, commit_timestamp, type: type2, errors } = postgresChanges;
                const enrichedPayload = {
                  schema,
                  table,
                  commit_timestamp,
                  eventType: type2,
                  new: {},
                  old: {},
                  errors
                };
                handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
              }
              bind.callback(handledPayload, ref);
            });
          }
        }
        /** @internal */
        _isClosed() {
          return this.state === constants_1.CHANNEL_STATES.closed;
        }
        /** @internal */
        _isJoined() {
          return this.state === constants_1.CHANNEL_STATES.joined;
        }
        /** @internal */
        _isJoining() {
          return this.state === constants_1.CHANNEL_STATES.joining;
        }
        /** @internal */
        _isLeaving() {
          return this.state === constants_1.CHANNEL_STATES.leaving;
        }
        /** @internal */
        _replyEventName(ref) {
          return `chan_reply_${ref}`;
        }
        /** @internal */
        _on(type, filter, callback) {
          const typeLower = type.toLocaleLowerCase();
          const binding = {
            type: typeLower,
            filter,
            callback
          };
          if (this.bindings[typeLower]) {
            this.bindings[typeLower].push(binding);
          } else {
            this.bindings[typeLower] = [binding];
          }
          return this;
        }
        /** @internal */
        _off(type, filter) {
          const typeLower = type.toLocaleLowerCase();
          if (this.bindings[typeLower]) {
            this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
              var _a;
              return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower && _RealtimeChannel.isEqual(bind.filter, filter));
            });
          }
          return this;
        }
        /** @internal */
        static isEqual(obj1, obj2) {
          if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
          }
          for (const k in obj1) {
            if (obj1[k] !== obj2[k]) {
              return false;
            }
          }
          return true;
        }
        /** @internal */
        _rejoinUntilConnected() {
          this.rejoinTimer.scheduleTimeout();
          if (this.socket.isConnected()) {
            this._rejoin();
          }
        }
        /**
         * Registers a callback that will be executed when the channel closes.
         *
         * @internal
         */
        _onClose(callback) {
          this._on(constants_1.CHANNEL_EVENTS.close, {}, callback);
        }
        /**
         * Registers a callback that will be executed when the channel encounteres an error.
         *
         * @internal
         */
        _onError(callback) {
          this._on(constants_1.CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
        }
        /**
         * Returns `true` if the socket is connected and the channel has been joined.
         *
         * @internal
         */
        _canPush() {
          return this.socket.isConnected() && this._isJoined();
        }
        /** @internal */
        _rejoin(timeout = this.timeout) {
          if (this._isLeaving()) {
            return;
          }
          this.socket._leaveOpenTopic(this.topic);
          this.state = constants_1.CHANNEL_STATES.joining;
          this.joinPush.resend(timeout);
        }
        /** @internal */
        _getPayloadRecords(payload) {
          const records = {
            new: {},
            old: {}
          };
          if (payload.type === "INSERT" || payload.type === "UPDATE") {
            records.new = Transformers.convertChangeData(payload.columns, payload.record);
          }
          if (payload.type === "UPDATE" || payload.type === "DELETE") {
            records.old = Transformers.convertChangeData(payload.columns, payload.old_record);
          }
          return records;
        }
      };
      exports.default = RealtimeChannel;
    }
  });

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/RealtimeClient.js
  var require_RealtimeClient = __commonJS({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/RealtimeClient.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var websocket_factory_1 = tslib_1.__importDefault(require_websocket_factory());
      var constants_1 = require_constants();
      var serializer_1 = tslib_1.__importDefault(require_serializer());
      var timer_1 = tslib_1.__importDefault(require_timer());
      var transformers_1 = require_transformers();
      var RealtimeChannel_1 = tslib_1.__importDefault(require_RealtimeChannel());
      var noop = () => {
      };
      var CONNECTION_TIMEOUTS = {
        HEARTBEAT_INTERVAL: 25e3,
        RECONNECT_DELAY: 10,
        HEARTBEAT_TIMEOUT_FALLBACK: 100
      };
      var RECONNECT_INTERVALS = [1e3, 2e3, 5e3, 1e4];
      var DEFAULT_RECONNECT_FALLBACK = 1e4;
      var WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
      var RealtimeClient = class {
        /**
         * Initializes the Socket.
         *
         * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
         * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
         * @param options.transport The Websocket Transport, for example WebSocket. This can be a custom implementation
         * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
         * @param options.params The optional params to pass when connecting.
         * @param options.headers Deprecated: headers cannot be set on websocket connections and this option will be removed in the future.
         * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
         * @param options.heartbeatCallback The optional function to handle heartbeat status.
         * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
         * @param options.logLevel Sets the log level for Realtime
         * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
         * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
         * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
         * @param options.worker Use Web Worker to set a side flow. Defaults to false.
         * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
         */
        constructor(endPoint, options) {
          var _a;
          this.accessTokenValue = null;
          this.apiKey = null;
          this.channels = new Array();
          this.endPoint = "";
          this.httpEndpoint = "";
          this.headers = {};
          this.params = {};
          this.timeout = constants_1.DEFAULT_TIMEOUT;
          this.transport = null;
          this.heartbeatIntervalMs = CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
          this.heartbeatTimer = void 0;
          this.pendingHeartbeatRef = null;
          this.heartbeatCallback = noop;
          this.ref = 0;
          this.reconnectTimer = null;
          this.logger = noop;
          this.conn = null;
          this.sendBuffer = [];
          this.serializer = new serializer_1.default();
          this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: []
          };
          this.accessToken = null;
          this._connectionState = "disconnected";
          this._wasManualDisconnect = false;
          this._authPromise = null;
          this._resolveFetch = (customFetch) => {
            let _fetch;
            if (customFetch) {
              _fetch = customFetch;
            } else if (typeof fetch === "undefined") {
              _fetch = (...args) => Promise.resolve(`${"@supabase/node-fetch"}`).then((s) => tslib_1.__importStar(__require(s))).then(({ default: fetch2 }) => fetch2(...args)).catch((error) => {
                throw new Error(`Failed to load @supabase/node-fetch: ${error.message}. This is required for HTTP requests in Node.js environments without native fetch.`);
              });
            } else {
              _fetch = fetch;
            }
            return (...args) => _fetch(...args);
          };
          if (!((_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.apikey)) {
            throw new Error("API key is required to connect to Realtime");
          }
          this.apiKey = options.params.apikey;
          this.endPoint = `${endPoint}/${constants_1.TRANSPORTS.websocket}`;
          this.httpEndpoint = (0, transformers_1.httpEndpointURL)(endPoint);
          this._initializeOptions(options);
          this._setupReconnectionTimer();
          this.fetch = this._resolveFetch(options === null || options === void 0 ? void 0 : options.fetch);
        }
        /**
         * Connects the socket, unless already connected.
         */
        connect() {
          if (this.isConnecting() || this.isDisconnecting() || this.conn !== null && this.isConnected()) {
            return;
          }
          this._setConnectionState("connecting");
          this._setAuthSafely("connect");
          if (this.transport) {
            this.conn = new this.transport(this.endpointURL());
          } else {
            try {
              this.conn = websocket_factory_1.default.createWebSocket(this.endpointURL());
            } catch (error) {
              this._setConnectionState("disconnected");
              const errorMessage = error.message;
              if (errorMessage.includes("Node.js")) {
                throw new Error(`${errorMessage}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`);
              }
              throw new Error(`WebSocket not available: ${errorMessage}`);
            }
          }
          this._setupConnectionHandlers();
        }
        /**
         * Returns the URL of the websocket.
         * @returns string The URL of the websocket.
         */
        endpointURL() {
          return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: constants_1.VSN }));
        }
        /**
         * Disconnects the socket.
         *
         * @param code A numeric status code to send on disconnect.
         * @param reason A custom reason for the disconnect.
         */
        disconnect(code, reason) {
          if (this.isDisconnecting()) {
            return;
          }
          this._setConnectionState("disconnecting", true);
          if (this.conn) {
            const fallbackTimer = setTimeout(() => {
              this._setConnectionState("disconnected");
            }, 100);
            this.conn.onclose = () => {
              clearTimeout(fallbackTimer);
              this._setConnectionState("disconnected");
            };
            if (code) {
              this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
            } else {
              this.conn.close();
            }
            this._teardownConnection();
          } else {
            this._setConnectionState("disconnected");
          }
        }
        /**
         * Returns all created channels
         */
        getChannels() {
          return this.channels;
        }
        /**
         * Unsubscribes and removes a single channel
         * @param channel A RealtimeChannel instance
         */
        async removeChannel(channel) {
          const status = await channel.unsubscribe();
          if (this.channels.length === 0) {
            this.disconnect();
          }
          return status;
        }
        /**
         * Unsubscribes and removes all channels
         */
        async removeAllChannels() {
          const values_1 = await Promise.all(this.channels.map((channel) => channel.unsubscribe()));
          this.channels = [];
          this.disconnect();
          return values_1;
        }
        /**
         * Logs the message.
         *
         * For customized logging, `this.logger` can be overridden.
         */
        log(kind, msg, data) {
          this.logger(kind, msg, data);
        }
        /**
         * Returns the current state of the socket.
         */
        connectionState() {
          switch (this.conn && this.conn.readyState) {
            case constants_1.SOCKET_STATES.connecting:
              return constants_1.CONNECTION_STATE.Connecting;
            case constants_1.SOCKET_STATES.open:
              return constants_1.CONNECTION_STATE.Open;
            case constants_1.SOCKET_STATES.closing:
              return constants_1.CONNECTION_STATE.Closing;
            default:
              return constants_1.CONNECTION_STATE.Closed;
          }
        }
        /**
         * Returns `true` is the connection is open.
         */
        isConnected() {
          return this.connectionState() === constants_1.CONNECTION_STATE.Open;
        }
        /**
         * Returns `true` if the connection is currently connecting.
         */
        isConnecting() {
          return this._connectionState === "connecting";
        }
        /**
         * Returns `true` if the connection is currently disconnecting.
         */
        isDisconnecting() {
          return this._connectionState === "disconnecting";
        }
        channel(topic, params = { config: {} }) {
          const realtimeTopic = `realtime:${topic}`;
          const exists = this.getChannels().find((c) => c.topic === realtimeTopic);
          if (!exists) {
            const chan = new RealtimeChannel_1.default(`realtime:${topic}`, params, this);
            this.channels.push(chan);
            return chan;
          } else {
            return exists;
          }
        }
        /**
         * Push out a message if the socket is connected.
         *
         * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
         */
        push(data) {
          const { topic, event, payload, ref } = data;
          const callback = () => {
            this.encode(data, (result) => {
              var _a;
              (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
            });
          };
          this.log("push", `${topic} ${event} (${ref})`, payload);
          if (this.isConnected()) {
            callback();
          } else {
            this.sendBuffer.push(callback);
          }
        }
        /**
         * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
         *
         * If param is null it will use the `accessToken` callback function or the token set on the client.
         *
         * On callback used, it will set the value of the token internal to the client.
         *
         * @param token A JWT string to override the token set on the client.
         */
        async setAuth(token = null) {
          this._authPromise = this._performAuth(token);
          try {
            await this._authPromise;
          } finally {
            this._authPromise = null;
          }
        }
        /**
         * Sends a heartbeat message if the socket is connected.
         */
        async sendHeartbeat() {
          var _a;
          if (!this.isConnected()) {
            try {
              this.heartbeatCallback("disconnected");
            } catch (e) {
              this.log("error", "error in heartbeat callback", e);
            }
            return;
          }
          if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
            this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            try {
              this.heartbeatCallback("timeout");
            } catch (e) {
              this.log("error", "error in heartbeat callback", e);
            }
            this._wasManualDisconnect = false;
            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(constants_1.WS_CLOSE_NORMAL, "heartbeat timeout");
            setTimeout(() => {
              var _a2;
              if (!this.isConnected()) {
                (_a2 = this.reconnectTimer) === null || _a2 === void 0 ? void 0 : _a2.scheduleTimeout();
              }
            }, CONNECTION_TIMEOUTS.HEARTBEAT_TIMEOUT_FALLBACK);
            return;
          }
          this.pendingHeartbeatRef = this._makeRef();
          this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: this.pendingHeartbeatRef
          });
          try {
            this.heartbeatCallback("sent");
          } catch (e) {
            this.log("error", "error in heartbeat callback", e);
          }
          this._setAuthSafely("heartbeat");
        }
        onHeartbeat(callback) {
          this.heartbeatCallback = callback;
        }
        /**
         * Flushes send buffer
         */
        flushSendBuffer() {
          if (this.isConnected() && this.sendBuffer.length > 0) {
            this.sendBuffer.forEach((callback) => callback());
            this.sendBuffer = [];
          }
        }
        /**
         * Return the next message ref, accounting for overflows
         *
         * @internal
         */
        _makeRef() {
          let newRef = this.ref + 1;
          if (newRef === this.ref) {
            this.ref = 0;
          } else {
            this.ref = newRef;
          }
          return this.ref.toString();
        }
        /**
         * Unsubscribe from channels with the specified topic.
         *
         * @internal
         */
        _leaveOpenTopic(topic) {
          let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
          if (dupChannel) {
            this.log("transport", `leaving duplicate topic "${topic}"`);
            dupChannel.unsubscribe();
          }
        }
        /**
         * Removes a subscription from the socket.
         *
         * @param channel An open subscription.
         *
         * @internal
         */
        _remove(channel) {
          this.channels = this.channels.filter((c) => c.topic !== channel.topic);
        }
        /** @internal */
        _onConnMessage(rawMessage) {
          this.decode(rawMessage.data, (msg) => {
            if (msg.topic === "phoenix" && msg.event === "phx_reply") {
              try {
                this.heartbeatCallback(msg.payload.status === "ok" ? "ok" : "error");
              } catch (e) {
                this.log("error", "error in heartbeat callback", e);
              }
            }
            if (msg.ref && msg.ref === this.pendingHeartbeatRef) {
              this.pendingHeartbeatRef = null;
            }
            const { topic, event, payload, ref } = msg;
            const refString = ref ? `(${ref})` : "";
            const status = payload.status || "";
            this.log("receive", `${status} ${topic} ${event} ${refString}`.trim(), payload);
            this.channels.filter((channel) => channel._isMember(topic)).forEach((channel) => channel._trigger(event, payload, ref));
            this._triggerStateCallbacks("message", msg);
          });
        }
        /**
         * Clear specific timer
         * @internal
         */
        _clearTimer(timer) {
          var _a;
          if (timer === "heartbeat" && this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = void 0;
          } else if (timer === "reconnect") {
            (_a = this.reconnectTimer) === null || _a === void 0 ? void 0 : _a.reset();
          }
        }
        /**
         * Clear all timers
         * @internal
         */
        _clearAllTimers() {
          this._clearTimer("heartbeat");
          this._clearTimer("reconnect");
        }
        /**
         * Setup connection handlers for WebSocket events
         * @internal
         */
        _setupConnectionHandlers() {
          if (!this.conn)
            return;
          if ("binaryType" in this.conn) {
            ;
            this.conn.binaryType = "arraybuffer";
          }
          this.conn.onopen = () => this._onConnOpen();
          this.conn.onerror = (error) => this._onConnError(error);
          this.conn.onmessage = (event) => this._onConnMessage(event);
          this.conn.onclose = (event) => this._onConnClose(event);
        }
        /**
         * Teardown connection and cleanup resources
         * @internal
         */
        _teardownConnection() {
          if (this.conn) {
            this.conn.onopen = null;
            this.conn.onerror = null;
            this.conn.onmessage = null;
            this.conn.onclose = null;
            this.conn = null;
          }
          this._clearAllTimers();
          this.channels.forEach((channel) => channel.teardown());
        }
        /** @internal */
        _onConnOpen() {
          this._setConnectionState("connected");
          this.log("transport", `connected to ${this.endpointURL()}`);
          this.flushSendBuffer();
          this._clearTimer("reconnect");
          if (!this.worker) {
            this._startHeartbeat();
          } else {
            if (!this.workerRef) {
              this._startWorkerHeartbeat();
            }
          }
          this._triggerStateCallbacks("open");
        }
        /** @internal */
        _startHeartbeat() {
          this.heartbeatTimer && clearInterval(this.heartbeatTimer);
          this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        /** @internal */
        _startWorkerHeartbeat() {
          if (this.workerUrl) {
            this.log("worker", `starting worker for from ${this.workerUrl}`);
          } else {
            this.log("worker", `starting default worker`);
          }
          const objectUrl = this._workerObjectUrl(this.workerUrl);
          this.workerRef = new Worker(objectUrl);
          this.workerRef.onerror = (error) => {
            this.log("worker", "worker error", error.message);
            this.workerRef.terminate();
          };
          this.workerRef.onmessage = (event) => {
            if (event.data.event === "keepAlive") {
              this.sendHeartbeat();
            }
          };
          this.workerRef.postMessage({
            event: "start",
            interval: this.heartbeatIntervalMs
          });
        }
        /** @internal */
        _onConnClose(event) {
          var _a;
          this._setConnectionState("disconnected");
          this.log("transport", "close", event);
          this._triggerChanError();
          this._clearTimer("heartbeat");
          if (!this._wasManualDisconnect) {
            (_a = this.reconnectTimer) === null || _a === void 0 ? void 0 : _a.scheduleTimeout();
          }
          this._triggerStateCallbacks("close", event);
        }
        /** @internal */
        _onConnError(error) {
          this._setConnectionState("disconnected");
          this.log("transport", `${error}`);
          this._triggerChanError();
          this._triggerStateCallbacks("error", error);
        }
        /** @internal */
        _triggerChanError() {
          this.channels.forEach((channel) => channel._trigger(constants_1.CHANNEL_EVENTS.error));
        }
        /** @internal */
        _appendParams(url, params) {
          if (Object.keys(params).length === 0) {
            return url;
          }
          const prefix = url.match(/\?/) ? "&" : "?";
          const query = new URLSearchParams(params);
          return `${url}${prefix}${query}`;
        }
        _workerObjectUrl(url) {
          let result_url;
          if (url) {
            result_url = url;
          } else {
            const blob = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
            result_url = URL.createObjectURL(blob);
          }
          return result_url;
        }
        /**
         * Set connection state with proper state management
         * @internal
         */
        _setConnectionState(state, manual = false) {
          this._connectionState = state;
          if (state === "connecting") {
            this._wasManualDisconnect = false;
          } else if (state === "disconnecting") {
            this._wasManualDisconnect = manual;
          }
        }
        /**
         * Perform the actual auth operation
         * @internal
         */
        async _performAuth(token = null) {
          let tokenToSend;
          if (token) {
            tokenToSend = token;
          } else if (this.accessToken) {
            tokenToSend = await this.accessToken();
          } else {
            tokenToSend = this.accessTokenValue;
          }
          if (this.accessTokenValue != tokenToSend) {
            this.accessTokenValue = tokenToSend;
            this.channels.forEach((channel) => {
              const payload = {
                access_token: tokenToSend,
                version: constants_1.DEFAULT_VERSION
              };
              tokenToSend && channel.updateJoinPayload(payload);
              if (channel.joinedOnce && channel._isJoined()) {
                channel._push(constants_1.CHANNEL_EVENTS.access_token, {
                  access_token: tokenToSend
                });
              }
            });
          }
        }
        /**
         * Wait for any in-flight auth operations to complete
         * @internal
         */
        async _waitForAuthIfNeeded() {
          if (this._authPromise) {
            await this._authPromise;
          }
        }
        /**
         * Safely call setAuth with standardized error handling
         * @internal
         */
        _setAuthSafely(context = "general") {
          this.setAuth().catch((e) => {
            this.log("error", `error setting auth in ${context}`, e);
          });
        }
        /**
         * Trigger state change callbacks with proper error handling
         * @internal
         */
        _triggerStateCallbacks(event, data) {
          try {
            this.stateChangeCallbacks[event].forEach((callback) => {
              try {
                callback(data);
              } catch (e) {
                this.log("error", `error in ${event} callback`, e);
              }
            });
          } catch (e) {
            this.log("error", `error triggering ${event} callbacks`, e);
          }
        }
        /**
         * Setup reconnection timer with proper configuration
         * @internal
         */
        _setupReconnectionTimer() {
          this.reconnectTimer = new timer_1.default(async () => {
            setTimeout(async () => {
              await this._waitForAuthIfNeeded();
              if (!this.isConnected()) {
                this.connect();
              }
            }, CONNECTION_TIMEOUTS.RECONNECT_DELAY);
          }, this.reconnectAfterMs);
        }
        /**
         * Initialize client options with defaults
         * @internal
         */
        _initializeOptions(options) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j;
          this.transport = (_a = options === null || options === void 0 ? void 0 : options.transport) !== null && _a !== void 0 ? _a : null;
          this.timeout = (_b = options === null || options === void 0 ? void 0 : options.timeout) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_TIMEOUT;
          this.heartbeatIntervalMs = (_c = options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) !== null && _c !== void 0 ? _c : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL;
          this.worker = (_d = options === null || options === void 0 ? void 0 : options.worker) !== null && _d !== void 0 ? _d : false;
          this.accessToken = (_e = options === null || options === void 0 ? void 0 : options.accessToken) !== null && _e !== void 0 ? _e : null;
          this.heartbeatCallback = (_f = options === null || options === void 0 ? void 0 : options.heartbeatCallback) !== null && _f !== void 0 ? _f : noop;
          if (options === null || options === void 0 ? void 0 : options.params)
            this.params = options.params;
          if (options === null || options === void 0 ? void 0 : options.logger)
            this.logger = options.logger;
          if ((options === null || options === void 0 ? void 0 : options.logLevel) || (options === null || options === void 0 ? void 0 : options.log_level)) {
            this.logLevel = options.logLevel || options.log_level;
            this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel });
          }
          this.reconnectAfterMs = (_g = options === null || options === void 0 ? void 0 : options.reconnectAfterMs) !== null && _g !== void 0 ? _g : ((tries) => {
            return RECONNECT_INTERVALS[tries - 1] || DEFAULT_RECONNECT_FALLBACK;
          });
          this.encode = (_h = options === null || options === void 0 ? void 0 : options.encode) !== null && _h !== void 0 ? _h : ((payload, callback) => {
            return callback(JSON.stringify(payload));
          });
          this.decode = (_j = options === null || options === void 0 ? void 0 : options.decode) !== null && _j !== void 0 ? _j : this.serializer.decode.bind(this.serializer);
          if (this.worker) {
            if (typeof window !== "undefined" && !window.Worker) {
              throw new Error("Web Worker is not supported");
            }
            this.workerUrl = options === null || options === void 0 ? void 0 : options.workerUrl;
          }
        }
      };
      exports.default = RealtimeClient;
    }
  });

  // C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/index.js
  var require_index = __commonJS({
    "C:/Users/ricky/AppData/Local/Temp/realtime-install/node_modules/@supabase/realtime-js/dist/main/index.js"(exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WebSocketFactory = exports.REALTIME_CHANNEL_STATES = exports.REALTIME_SUBSCRIBE_STATES = exports.REALTIME_PRESENCE_LISTEN_EVENTS = exports.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = exports.REALTIME_LISTEN_TYPES = exports.RealtimeClient = exports.RealtimeChannel = exports.RealtimePresence = void 0;
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var RealtimeClient_1 = tslib_1.__importDefault(require_RealtimeClient());
      exports.RealtimeClient = RealtimeClient_1.default;
      var RealtimeChannel_1 = tslib_1.__importStar(require_RealtimeChannel());
      exports.RealtimeChannel = RealtimeChannel_1.default;
      Object.defineProperty(exports, "REALTIME_LISTEN_TYPES", { enumerable: true, get: function() {
        return RealtimeChannel_1.REALTIME_LISTEN_TYPES;
      } });
      Object.defineProperty(exports, "REALTIME_POSTGRES_CHANGES_LISTEN_EVENT", { enumerable: true, get: function() {
        return RealtimeChannel_1.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
      } });
      Object.defineProperty(exports, "REALTIME_SUBSCRIBE_STATES", { enumerable: true, get: function() {
        return RealtimeChannel_1.REALTIME_SUBSCRIBE_STATES;
      } });
      Object.defineProperty(exports, "REALTIME_CHANNEL_STATES", { enumerable: true, get: function() {
        return RealtimeChannel_1.REALTIME_CHANNEL_STATES;
      } });
      var RealtimePresence_1 = tslib_1.__importStar(require_RealtimePresence());
      exports.RealtimePresence = RealtimePresence_1.default;
      Object.defineProperty(exports, "REALTIME_PRESENCE_LISTEN_EVENTS", { enumerable: true, get: function() {
        return RealtimePresence_1.REALTIME_PRESENCE_LISTEN_EVENTS;
      } });
      var websocket_factory_1 = tslib_1.__importDefault(require_websocket_factory());
      exports.WebSocketFactory = websocket_factory_1.default;
    }
  });
  return require_index();
})();
