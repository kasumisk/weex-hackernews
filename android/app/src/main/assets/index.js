// { "framework": "Vue" }

/******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};

    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {

        /******/ 		// Check if module is in cache
        /******/ 		if(installedModules[moduleId])
        /******/ 			return installedModules[moduleId].exports;

        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = installedModules[moduleId] = {
            /******/ 			i: moduleId,
            /******/ 			l: false,
            /******/ 			exports: {}
            /******/ 		};

        /******/ 		// Execute the module function
        /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        /******/ 		// Flag the module as loaded
        /******/ 		module.l = true;

        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}


    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;

    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;

    /******/ 	// identity function for calling harmony imports with the correct context
    /******/ 	__webpack_require__.i = function(value) { return value; };

    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
        /******/ 		if(!__webpack_require__.o(exports, name)) {
            /******/ 			Object.defineProperty(exports, name, {
                /******/ 				configurable: false,
                /******/ 				enumerable: true,
                /******/ 				get: getter
                /******/ 			});
            /******/ 		}
        /******/ 	};

    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
        /******/ 		var getter = module && module.__esModule ?
            /******/ 			function getDefault() { return module['default']; } :
            /******/ 			function getModuleExports() { return module; };
        /******/ 		__webpack_require__.d(getter, 'a', getter);
        /******/ 		return getter;
        /******/ 	};

    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";

    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 104);
    /******/ })
/************************************************************************/
/******/ ([
    /* 0 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
        /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
        /**
         * vuex v2.2.1
         * (c) 2017 Evan You
         * @license MIT
         */
        var applyMixin = function (Vue) {
            var version = Number(Vue.version.split('.')[0]);

            if (version >= 2) {
                var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
                Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
            } else {
                // override init and inject vuex init procedure
                // for 1.x backwards compatibility.
                var _init = Vue.prototype._init;
                Vue.prototype._init = function (options) {
                    if ( options === void 0 ) options = {};

                    options.init = options.init
                        ? [vuexInit].concat(options.init)
                        : vuexInit;
                    _init.call(this, options);
                };
            }

            /**
             * Vuex init hook, injected into each instances init hooks list.
             */

            function vuexInit () {
                var options = this.$options;
                // store injection
                if (options.store) {
                    this.$store = options.store;
                } else if (options.parent && options.parent.$store) {
                    this.$store = options.parent.$store;
                }
            }
        };

        var devtoolHook =
            typeof window !== 'undefined' &&
            window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

        function devtoolPlugin (store) {
            if (!devtoolHook) { return }

            store._devtoolHook = devtoolHook;

            devtoolHook.emit('vuex:init', store);

            devtoolHook.on('vuex:travel-to-state', function (targetState) {
                store.replaceState(targetState);
            });

            store.subscribe(function (mutation, state) {
                devtoolHook.emit('vuex:mutation', mutation, state);
            });
        }

        /**
         * Get the first item that pass the test
         * by second argument function
         *
         * @param {Array} list
         * @param {Function} f
         * @return {*}
         */
        /**
         * Deep copy the given object considering circular structure.
         * This function caches all nested objects and its copies.
         * If it detects circular structure, use cached copy to avoid infinite loop.
         *
         * @param {*} obj
         * @param {Array<Object>} cache
         * @return {*}
         */


        /**
         * forEach for object
         */
        function forEachValue (obj, fn) {
            Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
        }

        function isObject (obj) {
            return obj !== null && typeof obj === 'object'
        }

        function isPromise (val) {
            return val && typeof val.then === 'function'
        }

        function assert (condition, msg) {
            if (!condition) { throw new Error(("[vuex] " + msg)) }
        }

        var Module = function Module (rawModule, runtime) {
            this.runtime = runtime;
            this._children = Object.create(null);
            this._rawModule = rawModule;
        };

        var prototypeAccessors$1 = { state: {},namespaced: {} };

        prototypeAccessors$1.state.get = function () {
            return this._rawModule.state || {}
        };

        prototypeAccessors$1.namespaced.get = function () {
            return !!this._rawModule.namespaced
        };

        Module.prototype.addChild = function addChild (key, module) {
            this._children[key] = module;
        };

        Module.prototype.removeChild = function removeChild (key) {
            delete this._children[key];
        };

        Module.prototype.getChild = function getChild (key) {
            return this._children[key]
        };

        Module.prototype.update = function update (rawModule) {
            this._rawModule.namespaced = rawModule.namespaced;
            if (rawModule.actions) {
                this._rawModule.actions = rawModule.actions;
            }
            if (rawModule.mutations) {
                this._rawModule.mutations = rawModule.mutations;
            }
            if (rawModule.getters) {
                this._rawModule.getters = rawModule.getters;
            }
        };

        Module.prototype.forEachChild = function forEachChild (fn) {
            forEachValue(this._children, fn);
        };

        Module.prototype.forEachGetter = function forEachGetter (fn) {
            if (this._rawModule.getters) {
                forEachValue(this._rawModule.getters, fn);
            }
        };

        Module.prototype.forEachAction = function forEachAction (fn) {
            if (this._rawModule.actions) {
                forEachValue(this._rawModule.actions, fn);
            }
        };

        Module.prototype.forEachMutation = function forEachMutation (fn) {
            if (this._rawModule.mutations) {
                forEachValue(this._rawModule.mutations, fn);
            }
        };

        Object.defineProperties( Module.prototype, prototypeAccessors$1 );

        var ModuleCollection = function ModuleCollection (rawRootModule) {
            var this$1 = this;

            // register root module (Vuex.Store options)
            this.root = new Module(rawRootModule, false);

            // register all nested modules
            if (rawRootModule.modules) {
                forEachValue(rawRootModule.modules, function (rawModule, key) {
                    this$1.register([key], rawModule, false);
                });
            }
        };

        ModuleCollection.prototype.get = function get (path) {
            return path.reduce(function (module, key) {
                return module.getChild(key)
            }, this.root)
        };

        ModuleCollection.prototype.getNamespace = function getNamespace (path) {
            var module = this.root;
            return path.reduce(function (namespace, key) {
                module = module.getChild(key);
                return namespace + (module.namespaced ? key + '/' : '')
            }, '')
        };

        ModuleCollection.prototype.update = function update$1 (rawRootModule) {
            update(this.root, rawRootModule);
        };

        ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
            var this$1 = this;
            if ( runtime === void 0 ) runtime = true;

            var parent = this.get(path.slice(0, -1));
            var newModule = new Module(rawModule, runtime);
            parent.addChild(path[path.length - 1], newModule);

            // register nested modules
            if (rawModule.modules) {
                forEachValue(rawModule.modules, function (rawChildModule, key) {
                    this$1.register(path.concat(key), rawChildModule, runtime);
                });
            }
        };

        ModuleCollection.prototype.unregister = function unregister (path) {
            var parent = this.get(path.slice(0, -1));
            var key = path[path.length - 1];
            if (!parent.getChild(key).runtime) { return }

            parent.removeChild(key);
        };

        function update (targetModule, newModule) {
            // update target module
            targetModule.update(newModule);

            // update nested modules
            if (newModule.modules) {
                for (var key in newModule.modules) {
                    if (!targetModule.getChild(key)) {
                        console.warn(
                            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
                            'manual reload is needed'
                        );
                        return
                    }
                    update(targetModule.getChild(key), newModule.modules[key]);
                }
            }
        }

        var Vue; // bind on install

        var Store = function Store (options) {
            var this$1 = this;
            if ( options === void 0 ) options = {};

            assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
            assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

            var state = options.state; if ( state === void 0 ) state = {};
            var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
            var strict = options.strict; if ( strict === void 0 ) strict = false;

            // store internal state
            this._committing = false;
            this._actions = Object.create(null);
            this._mutations = Object.create(null);
            this._wrappedGetters = Object.create(null);
            this._modules = new ModuleCollection(options);
            this._modulesNamespaceMap = Object.create(null);
            this._subscribers = [];
            this._watcherVM = new Vue();

            // bind commit and dispatch to self
            var store = this;
            var ref = this;
            var dispatch = ref.dispatch;
            var commit = ref.commit;
            this.dispatch = function boundDispatch (type, payload) {
                return dispatch.call(store, type, payload)
            };
            this.commit = function boundCommit (type, payload, options) {
                return commit.call(store, type, payload, options)
            };

            // strict mode
            this.strict = strict;

            // init root module.
            // this also recursively registers all sub-modules
            // and collects all module getters inside this._wrappedGetters
            installModule(this, state, [], this._modules.root);

            // initialize the store vm, which is responsible for the reactivity
            // (also registers _wrappedGetters as computed properties)
            resetStoreVM(this, state);

            // apply plugins
            plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
        };

        var prototypeAccessors = { state: {} };

        prototypeAccessors.state.get = function () {
            return this._vm._data.$$state
        };

        prototypeAccessors.state.set = function (v) {
            assert(false, "Use store.replaceState() to explicit replace store state.");
        };

        Store.prototype.commit = function commit (_type, _payload, _options) {
            var this$1 = this;

            // check object-style commit
            var ref = unifyObjectStyle(_type, _payload, _options);
            var type = ref.type;
            var payload = ref.payload;
            var options = ref.options;

            var mutation = { type: type, payload: payload };
            var entry = this._mutations[type];
            if (!entry) {
                console.error(("[vuex] unknown mutation type: " + type));
                return
            }
            this._withCommit(function () {
                entry.forEach(function commitIterator (handler) {
                    handler(payload);
                });
            });
            this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

            if (options && options.silent) {
                console.warn(
                    "[vuex] mutation type: " + type + ". Silent option has been removed. " +
                    'Use the filter functionality in the vue-devtools'
                );
            }
        };

        Store.prototype.dispatch = function dispatch (_type, _payload) {
            // check object-style dispatch
            var ref = unifyObjectStyle(_type, _payload);
            var type = ref.type;
            var payload = ref.payload;

            var entry = this._actions[type];
            if (!entry) {
                console.error(("[vuex] unknown action type: " + type));
                return
            }
            return entry.length > 1
                ? Promise.all(entry.map(function (handler) { return handler(payload); }))
                : entry[0](payload)
        };

        Store.prototype.subscribe = function subscribe (fn) {
            var subs = this._subscribers;
            if (subs.indexOf(fn) < 0) {
                subs.push(fn);
            }
            return function () {
                var i = subs.indexOf(fn);
                if (i > -1) {
                    subs.splice(i, 1);
                }
            }
        };

        Store.prototype.watch = function watch (getter, cb, options) {
            var this$1 = this;

            assert(typeof getter === 'function', "store.watch only accepts a function.");
            return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
        };

        Store.prototype.replaceState = function replaceState (state) {
            var this$1 = this;

            this._withCommit(function () {
                this$1._vm._data.$$state = state;
            });
        };

        Store.prototype.registerModule = function registerModule (path, rawModule) {
            if (typeof path === 'string') { path = [path]; }
            assert(Array.isArray(path), "module path must be a string or an Array.");
            this._modules.register(path, rawModule);
            installModule(this, this.state, path, this._modules.get(path));
            // reset store to update getters...
            resetStoreVM(this, this.state);
        };

        Store.prototype.unregisterModule = function unregisterModule (path) {
            var this$1 = this;

            if (typeof path === 'string') { path = [path]; }
            assert(Array.isArray(path), "module path must be a string or an Array.");
            this._modules.unregister(path);
            this._withCommit(function () {
                var parentState = getNestedState(this$1.state, path.slice(0, -1));
                Vue.delete(parentState, path[path.length - 1]);
            });
            resetStore(this);
        };

        Store.prototype.hotUpdate = function hotUpdate (newOptions) {
            this._modules.update(newOptions);
            resetStore(this, true);
        };

        Store.prototype._withCommit = function _withCommit (fn) {
            var committing = this._committing;
            this._committing = true;
            fn();
            this._committing = committing;
        };

        Object.defineProperties( Store.prototype, prototypeAccessors );

        function resetStore (store, hot) {
            store._actions = Object.create(null);
            store._mutations = Object.create(null);
            store._wrappedGetters = Object.create(null);
            store._modulesNamespaceMap = Object.create(null);
            var state = store.state;
            // init all modules
            installModule(store, state, [], store._modules.root, true);
            // reset vm
            resetStoreVM(store, state, hot);
        }

        function resetStoreVM (store, state, hot) {
            var oldVm = store._vm;

            // bind store public getters
            store.getters = {};
            var wrappedGetters = store._wrappedGetters;
            var computed = {};
            forEachValue(wrappedGetters, function (fn, key) {
                // use computed to leverage its lazy-caching mechanism
                computed[key] = function () { return fn(store); };
                Object.defineProperty(store.getters, key, {
                    get: function () { return store._vm[key]; },
                    enumerable: true // for local getters
                });
            });

            // use a Vue instance to store the state tree
            // suppress warnings just in case the user has added
            // some funky global mixins
            var silent = Vue.config.silent;
            Vue.config.silent = true;
            store._vm = new Vue({
                data: {
                    $$state: state
                },
                computed: computed
            });
            Vue.config.silent = silent;

            // enable strict mode for new vm
            if (store.strict) {
                enableStrictMode(store);
            }

            if (oldVm) {
                if (hot) {
                    // dispatch changes in all subscribed watchers
                    // to force getter re-evaluation for hot reloading.
                    store._withCommit(function () {
                        oldVm._data.$$state = null;
                    });
                }
                Vue.nextTick(function () { return oldVm.$destroy(); });
            }
        }

        function installModule (store, rootState, path, module, hot) {
            var isRoot = !path.length;
            var namespace = store._modules.getNamespace(path);

            // register in namespace map
            if (namespace) {
                store._modulesNamespaceMap[namespace] = module;
            }

            // set state
            if (!isRoot && !hot) {
                var parentState = getNestedState(rootState, path.slice(0, -1));
                var moduleName = path[path.length - 1];
                store._withCommit(function () {
                    Vue.set(parentState, moduleName, module.state);
                });
            }

            var local = module.context = makeLocalContext(store, namespace, path);

            module.forEachMutation(function (mutation, key) {
                var namespacedType = namespace + key;
                registerMutation(store, namespacedType, mutation, local);
            });

            module.forEachAction(function (action, key) {
                var namespacedType = namespace + key;
                registerAction(store, namespacedType, action, local);
            });

            module.forEachGetter(function (getter, key) {
                var namespacedType = namespace + key;
                registerGetter(store, namespacedType, getter, local);
            });

            module.forEachChild(function (child, key) {
                installModule(store, rootState, path.concat(key), child, hot);
            });
        }

        /**
         * make localized dispatch, commit, getters and state
         * if there is no namespace, just use root ones
         */
        function makeLocalContext (store, namespace, path) {
            var noNamespace = namespace === '';

            var local = {
                dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
                    var args = unifyObjectStyle(_type, _payload, _options);
                    var payload = args.payload;
                    var options = args.options;
                    var type = args.type;

                    if (!options || !options.root) {
                        type = namespace + type;
                        if (!store._actions[type]) {
                            console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
                            return
                        }
                    }

                    return store.dispatch(type, payload)
                },

                commit: noNamespace ? store.commit : function (_type, _payload, _options) {
                    var args = unifyObjectStyle(_type, _payload, _options);
                    var payload = args.payload;
                    var options = args.options;
                    var type = args.type;

                    if (!options || !options.root) {
                        type = namespace + type;
                        if (!store._mutations[type]) {
                            console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
                            return
                        }
                    }

                    store.commit(type, payload, options);
                }
            };

            // getters and state object must be gotten lazily
            // because they will be changed by vm update
            Object.defineProperties(local, {
                getters: {
                    get: noNamespace
                        ? function () { return store.getters; }
                        : function () { return makeLocalGetters(store, namespace); }
                },
                state: {
                    get: function () { return getNestedState(store.state, path); }
                }
            });

            return local
        }

        function makeLocalGetters (store, namespace) {
            var gettersProxy = {};

            var splitPos = namespace.length;
            Object.keys(store.getters).forEach(function (type) {
                // skip if the target getter is not match this namespace
                if (type.slice(0, splitPos) !== namespace) { return }

                // extract local getter type
                var localType = type.slice(splitPos);

                // Add a port to the getters proxy.
                // Define as getter property because
                // we do not want to evaluate the getters in this time.
                Object.defineProperty(gettersProxy, localType, {
                    get: function () { return store.getters[type]; },
                    enumerable: true
                });
            });

            return gettersProxy
        }

        function registerMutation (store, type, handler, local) {
            var entry = store._mutations[type] || (store._mutations[type] = []);
            entry.push(function wrappedMutationHandler (payload) {
                handler(local.state, payload);
            });
        }

        function registerAction (store, type, handler, local) {
            var entry = store._actions[type] || (store._actions[type] = []);
            entry.push(function wrappedActionHandler (payload, cb) {
                var res = handler({
                    dispatch: local.dispatch,
                    commit: local.commit,
                    getters: local.getters,
                    state: local.state,
                    rootGetters: store.getters,
                    rootState: store.state
                }, payload, cb);
                if (!isPromise(res)) {
                    res = Promise.resolve(res);
                }
                if (store._devtoolHook) {
                    return res.catch(function (err) {
                        store._devtoolHook.emit('vuex:error', err);
                        throw err
                    })
                } else {
                    return res
                }
            });
        }

        function registerGetter (store, type, rawGetter, local) {
            if (store._wrappedGetters[type]) {
                console.error(("[vuex] duplicate getter key: " + type));
                return
            }
            store._wrappedGetters[type] = function wrappedGetter (store) {
                return rawGetter(
                    local.state, // local state
                    local.getters, // local getters
                    store.state, // root state
                    store.getters // root getters
                )
            };
        }

        function enableStrictMode (store) {
            store._vm.$watch(function () { return this._data.$$state }, function () {
                assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
            }, { deep: true, sync: true });
        }

        function getNestedState (state, path) {
            return path.length
                ? path.reduce(function (state, key) { return state[key]; }, state)
                : state
        }

        function unifyObjectStyle (type, payload, options) {
            if (isObject(type) && type.type) {
                options = payload;
                payload = type;
                type = type.type;
            }

            assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

            return { type: type, payload: payload, options: options }
        }

        function install (_Vue) {
            if (Vue) {
                console.error(
                    '[vuex] already installed. Vue.use(Vuex) should be called only once.'
                );
                return
            }
            Vue = _Vue;
            applyMixin(Vue);
        }

// auto install in dist mode
        if (typeof window !== 'undefined' && window.Vue) {
            install(window.Vue);
        }

        var mapState = normalizeNamespace(function (namespace, states) {
            var res = {};
            normalizeMap(states).forEach(function (ref) {
                var key = ref.key;
                var val = ref.val;

                res[key] = function mappedState () {
                    var state = this.$store.state;
                    var getters = this.$store.getters;
                    if (namespace) {
                        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
                        if (!module) {
                            return
                        }
                        state = module.context.state;
                        getters = module.context.getters;
                    }
                    return typeof val === 'function'
                        ? val.call(this, state, getters)
                        : state[val]
                };
                // mark vuex getter for devtools
                res[key].vuex = true;
            });
            return res
        });

        var mapMutations = normalizeNamespace(function (namespace, mutations) {
            var res = {};
            normalizeMap(mutations).forEach(function (ref) {
                var key = ref.key;
                var val = ref.val;

                val = namespace + val;
                res[key] = function mappedMutation () {
                    var args = [], len = arguments.length;
                    while ( len-- ) args[ len ] = arguments[ len ];

                    if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
                        return
                    }
                    return this.$store.commit.apply(this.$store, [val].concat(args))
                };
            });
            return res
        });

        var mapGetters = normalizeNamespace(function (namespace, getters) {
            var res = {};
            normalizeMap(getters).forEach(function (ref) {
                var key = ref.key;
                var val = ref.val;

                val = namespace + val;
                res[key] = function mappedGetter () {
                    if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
                        return
                    }
                    if (!(val in this.$store.getters)) {
                        console.error(("[vuex] unknown getter: " + val));
                        return
                    }
                    return this.$store.getters[val]
                };
                // mark vuex getter for devtools
                res[key].vuex = true;
            });
            return res
        });

        var mapActions = normalizeNamespace(function (namespace, actions) {
            var res = {};
            normalizeMap(actions).forEach(function (ref) {
                var key = ref.key;
                var val = ref.val;

                val = namespace + val;
                res[key] = function mappedAction () {
                    var args = [], len = arguments.length;
                    while ( len-- ) args[ len ] = arguments[ len ];

                    if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
                        return
                    }
                    return this.$store.dispatch.apply(this.$store, [val].concat(args))
                };
            });
            return res
        });

        function normalizeMap (map) {
            return Array.isArray(map)
                ? map.map(function (key) { return ({ key: key, val: key }); })
                : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
        }

        function normalizeNamespace (fn) {
            return function (namespace, map) {
                if (typeof namespace !== 'string') {
                    map = namespace;
                    namespace = '';
                } else if (namespace.charAt(namespace.length - 1) !== '/') {
                    namespace += '/';
                }
                return fn(namespace, map)
            }
        }

        function getModuleByNamespace (store, helper, namespace) {
            var module = store._modulesNamespaceMap[namespace];
            if (!module) {
                console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
            }
            return module
        }

        var index_esm = {
            Store: Store,
            install: install,
            version: '2.2.1',
            mapState: mapState,
            mapMutations: mapMutations,
            mapGetters: mapGetters,
            mapActions: mapActions
        };

        /* harmony default export */ __webpack_exports__["default"] = index_esm;


        /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.fetch = fetch;
        exports.fetchIdsByType = fetchIdsByType;
        exports.fetchItem = fetchItem;
        exports.fetchItems = fetchItems;
        exports.fetchUser = fetchUser;
        exports.fetchAccount = fetchAccount;
        exports.fetchInvest = fetchInvest;
        exports.fetchprojects = fetchprojects;
        exports.fetch_login = fetch_login;

        var _querystring = __webpack_require__(74);

        var _querystring2 = _interopRequireDefault(_querystring);

        var _util = __webpack_require__(2);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var stream = weex.requireModule('stream');
        var baseURL = 'http://192.168.2.113:1337/dist/json';

        var defaultParams = {
            v: '1.0',
            bizContent: {}
        };

//
// export function fetch ({path , params , commit}) {
//   return new Promise((resolve, reject) => {
//           commit('START_LOADING');
//           stream.fetch({
//             method: 'get',
//             url: `${baseURL}/${path}.json`,
//             headers: {'Content-Type':'application/x-www-form-urlencoded'},
//             // headers: {'Content-Type':'application/json'},
//             // url: config.api,
//             type: 'json',
//             // body:body
//           }, (response) => {
//               console.log(response);
//               setTimeout(function () {
//                   commit('FINISH_LOADING');
//                   if (response.status == 200) {
//                       resolve(response.data)
//                   }else {
//                     reject(response)
//                   }
//               },2000)
//           }, () => {})
//   })
// }
//
        function fetch(_ref) {
            var path = _ref.path,
                params = _ref.params,
                commit = _ref.commit;

            return new Promise(function (resolve, reject) {
                (0, _util.Encrypt)(params, function (res) {
                    var body = _querystring2.default.stringify(res);
                    commit('START_LOADING');
                    stream.fetch({
                        method: 'POST',
                        //   url: `${baseURL}/${path}.json`,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        //   headers: {'Content-Type':'application/json'},
                        url: _util.config.api,
                        type: 'json',
                        body: body
                    }, function (response) {
                        console.log(response);
                        setTimeout(function () {
                            commit('FINISH_LOADING');
                            if (response.status == 200) {
                                resolve(response.data);
                            } else {
                                reject(response);
                            }
                        }, 2000);
                    }, function () {});
                });
            });
        }

        function fetchIdsByType(type) {
            return fetch(type + 'stories');
        }

        function fetchItem(id) {
            return fetch('item/' + id);
        }

        function fetchItems(ids) {
            return Promise.all(ids.map(function (id) {
                return fetchItem(id);
            }));
        }

        function fetchUser(id) {
            return fetch('user/' + id);
        }

//发起请求

        function fetchAccount(_ref2) {
            var commit = _ref2.commit,
                sessionId = _ref2.sessionId;

            var params = {
                method: 'user.investorAccount',
                v: '1.0',
                bizContent: {}
            };
            return fetch({ path: 'investorAccount', params: params, commit: commit });
        }

        function fetchInvest(_ref3) {
            var commit = _ref3.commit;

            return fetch({ path: 'investList', commit: commit });
        }

        function fetchprojects(_ref4, _ref5) {
            var commit = _ref4.commit;
            var pageNum = _ref5.pageNum,
                pageSize = _ref5.pageSize;

            var params = {
                method: 'general.projectsList',
                v: '1.0',
                bizContent: {
                    pageNum: pageNum,
                    pageSize: pageSize
                }
            };
            return fetch({ path: 'projects', params: params, commit: commit });
        }

        function fetch_login(_ref6, _ref7) {
            var commit = _ref6.commit;
            var userName = _ref7.userName,
                password = _ref7.password;

            var params = {
                method: 'user.login',
                v: '1.0',
                bizContent: {
                    'userName': userName,
                    'password': password
                }
            };
            console.log('用户名', userName);
            console.log('密码', password);
            return fetch({ path: 'investList', params: params, commit: commit });
        }

        /***/ }),
    /* 2 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var CryptoJS = __webpack_require__(103);
        var storage = weex.requireModule('storage');
        var config = {
            // api : 'https://bank.mindai.com/api',
            // api: "http://127.0.0.1:8000/api/",
            resouce: 'http://192.168.2.113:1337/dist/',
            // api : 'https://121.196.208.139/api',
            // api : 'http://121.196.208.139/api',
            api: 'http://121.196.215.15:8087/api',
            // api : 'http://192.168.2.32:8087/api',
            appKey: '00000004',
            appKeySecret: 'O2F2L0I84LC9U1KP',
            format: 'json',
            locale: 'cn',
            timestamp: getBJTime(),
            method: 'POST',
            data: {
                method: '',
                v: '1.0',
                sessionId: "",
                bizContent: {}
            }
        };

        function setLocationStroage(key, value) {
            return new Promise(function (resolve, reject) {
                storage.setItem(key, value, function (e) {
                    if (e.result === 'success') {
                        resolve(e.data);
                    } else {
                        reject(e.data);
                    }
                });
            });
        }

        function getLocationStorage(key) {
            return new Promise(function (resolve, reject) {
                storage.getItem(key, function (e) {
                    if (e.result === 'success') {
                        resolve(e.data);
                    } else {
                        resolve('');
                    }
                });
            });
        }
        function getBJTime() {
            var localDate = new Date(),
                utc = localDate.getTime() + localDate.getTimezoneOffset() * 60000,
                BJDate = new Date(utc + 3600000 * 8),
                format = "yyyy-MM-dd hh:mm:ss",
                o = {
                    'M+': BJDate.getMonth() + 1,
                    'd+': BJDate.getDate(),
                    'h+': BJDate.getHours(),
                    'm+': BJDate.getMinutes(),
                    's+': BJDate.getSeconds(),
                    'q+': Math.floor((BJDate.getMonth() + 3) / 3),
                    'S': BJDate.getMilliseconds()
                };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (BJDate.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
                }
            }
            return format;
        }

        function aesEncrypt(data, keyStr, ivStr) {
            var sendData = CryptoJS.enc.Utf8.parse(data);
            var key = CryptoJS.enc.Utf8.parse(keyStr);
            var iv = CryptoJS.enc.Utf8.parse(ivStr);
            var encrypted = CryptoJS.AES.encrypt(sendData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
        }

        function Encrypt(options, callback) {
            options.bizContent.deviceType = 'ios';

            var config1 = Object.assign({}, config.data, options);
            config.data = config1;

            console.log('配置:', options);
            console.log('内容:', config);

            getLocationStorage("sessionId").then(function (sessionId) {
                console.log('bizContent:', config.data.bizContent);
                var bizContent = aesEncrypt(JSON.stringify(config.data.bizContent), config.appKeySecret, config.appKeySecret),
                    signStr = config.appKeySecret + 'appKey' + config.appKey + 'bizContent' + bizContent + 'formatjsonlocalecnmethod' + config.data.method + 'sessionId' + sessionId + 'timestamp' + config.timestamp + 'v' + config.data.v + config.appKeySecret,
                    sign = CryptoJS.SHA1(signStr).toString().toUpperCase();

                var body = {
                    method: config.data.method,
                    v: config.data.v,
                    sessionId: sessionId,
                    bizContent: bizContent,
                    appKey: config.appKey,
                    format: config.format,
                    locale: config.locale,
                    timestamp: config.timestamp,
                    sign: sign
                };
                callback && callback(body);
            });
        }

        function ajax(options, noReturn) {}
        /**
         * 处理金额格式，示例123456789==>123,456,789
         * @param  {[type]} money [description]
         * @return {[type]}       [description]
         */
        function moneyFormat(money) {
            var money = money;
            if (typeof money == 'number' || typeof money == 'string') {
                money = money.toString();
            } else {
                console.error("金额格式不正确");
                return;
            }
            money = money.split("").reverse().join("");
            money = money.replace(/(\d{3})/g, "$1,");
            money = money.split("").reverse().join("");
            if (money.indexOf(',') == 0) {
                money = money.replace(/,/, '');
            }
            return money;
        }

        /**
         *@residentId {string} 身份证号码
         */
        function residentId(residentId) {
            //var idcard = $('#' + card_id);
            var idcard_val = residentId;
            // 构造函数，变量为15位或者18位的身份证号码
            function clsIDCard(CardNo) {
                this.Valid = false;
                this.ID15 = '';
                this.ID18 = '';
                this.Local = '';
                if (CardNo != null) this.SetCardNo(CardNo);
            }
            // 设置身份证号码，15位或者18位
            clsIDCard.prototype.SetCardNo = function (CardNo) {
                this.ID15 = '';
                this.ID18 = '';
                this.Local = '';
                CardNo = CardNo.replace(" ", "");
                var strCardNo;
                if (CardNo.length == 18) {
                    //pattern = /^\d{17}(\d|x|X)$/;
                    pattern = /^\d{17}(\d|X)$/;
                    if (pattern.exec(CardNo) == null) return;
                    strCardNo = CardNo.toUpperCase();
                } else {
                    pattern = /^\d{15}$/;
                    if (pattern.exec(CardNo) == null) return;
                    strCardNo = CardNo.substr(0, 6) + '19' + CardNo.substr(6, 9);
                    strCardNo += this.GetVCode(strCardNo);
                }

                this.Valid = this.CheckValid(strCardNo);
            };
            // 校验身份证有效性
            clsIDCard.prototype.IsValid = function () {
                return this.Valid;
            };
            // 返回生日字符串，格式如下，1981-10-10
            clsIDCard.prototype.GetBirthDate = function () {
                var BirthDate = '';
                if (this.Valid) BirthDate = this.GetBirthYear() + '-' + this.GetBirthMonth() + '-' + this.GetBirthDay();
                return BirthDate;
            };
            // 返回生日中的年，格式如下，1981
            clsIDCard.prototype.GetBirthYear = function () {
                var BirthYear = '';
                if (this.Valid) BirthYear = this.ID18.substr(6, 4);
                return BirthYear;
            };
            // 返回生日中的月，格式如下，10
            clsIDCard.prototype.GetBirthMonth = function () {
                var BirthMonth = '';
                if (this.Valid) BirthMonth = this.ID18.substr(10, 2);
                if (BirthMonth.charAt(0) == '0') BirthMonth = BirthMonth.charAt(1);
                return BirthMonth;
            };
            // 返回生日中的日，格式如下，10
            clsIDCard.prototype.GetBirthDay = function () {
                var BirthDay = '';
                if (this.Valid) BirthDay = this.ID18.substr(12, 2);
                return BirthDay;
            };
            // 返回性别，1：男，0：女
            clsIDCard.prototype.GetSex = function () {
                var Sex = '';
                if (this.Valid) Sex = this.ID18.charAt(16) % 2;
                return Sex;
            };
            // 返回15位身份证号码
            clsIDCard.prototype.Get15 = function () {
                var ID15 = '';
                if (this.Valid) ID15 = this.ID15;
                return ID15;
            };
            // 返回18位身份证号码
            clsIDCard.prototype.Get18 = function () {
                var ID18 = '';
                if (this.Valid) ID18 = this.ID18;
                return ID18;
            };
            // 返回所在省，例如：上海市、浙江省
            clsIDCard.prototype.GetLocal = function () {
                var Local = '';
                if (this.Valid) Local = this.Local;
                return Local;
            };
            clsIDCard.prototype.GetVCode = function (CardNo17) {
                var Wi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
                var Ai = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var cardNoSum = 0;
                for (var i = 0; i < CardNo17.length; i++) {
                    cardNoSum += CardNo17.charAt(i) * Wi[i];
                }var seq = cardNoSum % 11;
                return Ai[seq];
            };
            clsIDCard.prototype.CheckValid = function (CardNo18) {
                if (this.GetVCode(CardNo18.substr(0, 17)) != CardNo18.charAt(17)) return false;
                if (!this.IsDate(CardNo18.substr(6, 8))) return false;
                var aCity = {
                    11: "北京",
                    12: "天津",
                    13: "河北",
                    14: "山西",
                    15: "内蒙古",
                    21: "辽宁",
                    22: "吉林",
                    23: "黑龙江 ",
                    31: "上海",
                    32: "江苏",
                    33: "浙江",
                    34: "安徽",
                    35: "福建",
                    36: "江西",
                    37: "山东",
                    41: "河南",
                    42: "湖北 ",
                    43: "湖南",
                    44: "广东",
                    45: "广西",
                    46: "海南",
                    50: "重庆",
                    51: "四川",
                    52: "贵州",
                    53: "云南",
                    54: "西藏 ",
                    61: "陕西",
                    62: "甘肃",
                    63: "青海",
                    64: "宁夏",
                    65: "新疆",
                    71: "台湾",
                    81: "香港",
                    82: "澳门",
                    91: "国外"
                };
                if (aCity[parseInt(CardNo18.substr(0, 2))] == null) return false;
                this.ID18 = CardNo18;
                this.ID15 = CardNo18.substr(0, 6) + CardNo18.substr(8, 9);
                this.Local = aCity[parseInt(CardNo18.substr(0, 2))];
                return true;
            };
            clsIDCard.prototype.IsDate = function (strDate) {
                var r = strDate.match(/^(\d{1,4})(\d{1,2})(\d{1,2})$/);
                if (r == null) return false;
                var d = new Date(r[1], r[2] - 1, r[3]);
                return d.getFullYear() == r[1] && d.getMonth() + 1 == r[2] && d.getDate() == r[3];
            };
            var checkFlag = new clsIDCard(idcard_val);
            if (!checkFlag.IsValid()) {
                return false;
            } else {
                return true;
            }
        }

        function formatName(str) {
            switch (str.length) {
                case 0:
                    str = "";
                    break;
                case 2:
                    str = str.substring(0, 1) + "*";
                    break;
                case 3:
                    str = str.substring(0, 1) + "**";
                    break;
                default:
                    str = str.substring(0, 1) + "**";
            }

            return str;
        }

        function formatPhone(str) {
            return str.substring(0, 3) + "*****" + str.substring(str.length - 3);
        }

        module.exports = {
            moneyFormat: moneyFormat,
            residentId: residentId,
            formatName: formatName,
            formatPhone: formatPhone,
            Encrypt: Encrypt,
            getBJTime: getBJTime,
            config: config,
            setLocationStroage: setLocationStroage,
            getLocationStorage: getLocationStorage
        };

        /***/ }),
    /* 3 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(40)
        )

        /* template */
        var __vue_template__ = __webpack_require__(58)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\components\\app-header.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 4 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(42)
        )

        /* script */
        __vue_exports__ = __webpack_require__(16)

        /* template */
        var __vue_template__ = __webpack_require__(61)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\components\\app-tabbar.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 5 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });


        var config = {
            env: 'dev',
            resouce: 'http://192.168.2.113:1337/dist/',
            clientHeight: function () {
                var env = weex.config.env || WXEnvironment;
                var clientHeight;
                // open a new window (tab) on the web
                if (env.platform === 'Web') {
                    clientHeight = weex.config.env.deviceHeight - 100;
                } else {
                    clientHeight = weex.config.env.deviceHeight - 228;
                }
                return clientHeight;
            }(),
            // api: "http://192.168.2.113:4000/testpost"
            api: "http://121.196.208.139/api"
        };

        exports.default = config;

        /***/ }),
    /* 6 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _vuex = __webpack_require__(0);

        var _vuex2 = _interopRequireDefault(_vuex);

        var _index = __webpack_require__(92);

        var _index2 = _interopRequireDefault(_index);

        var _index3 = __webpack_require__(100);

        var _index4 = _interopRequireDefault(_index3);

        var _index5 = __webpack_require__(96);

        var _index6 = _interopRequireDefault(_index5);

        var _config = __webpack_require__(5);

        var _config2 = _interopRequireDefault(_config);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Vuex is auto installed on the web
        if (WXEnvironment.platform !== 'Web') {
            Vue.use(_vuex2.default);
        } // import Vue from 'vue'


        var store = new _vuex2.default.Store({
            actions: _index2.default,
            mutations: _index4.default,
            getters: _index6.default,
            state: {
                loading: false,
                login: false,
                sessionId: '',
                user: {
                    account: {},
                    invests: {
                        lists: {},
                        tab_cur: 0
                    },
                    repackets: []
                },
                clientHeight: _config2.default.clientHeight,
                projects: {
                    list: [],
                    pageNum: 1,
                    pageSize: 10
                },
                counts: {
                    top: 20,
                    new: 20,
                    show: 15,
                    ask: 15,
                    job: 15
                },
                lists: {
                    projects: [],
                    repackets: [],
                    show: [],
                    ask: [],
                    job: []
                }
            }
        });

        exports.default = store;

        /***/ }),
    /* 7 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* script */
        __vue_exports__ = __webpack_require__(18)

        /* template */
        var __vue_template__ = __webpack_require__(59)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\components\\jump-web.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 8 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(48)
        )

        /* script */
        __vue_exports__ = __webpack_require__(19)

        /* template */
        var __vue_template__ = __webpack_require__(68)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\components\\story.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 9 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* script */
        __vue_exports__ = __webpack_require__(15)

        /* template */
        var __vue_template__ = __webpack_require__(66)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\App.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 10 */
    /***/ (function(module, exports) {

        exports.sync = function (store, router, options) {
            var moduleName = (options || {}).moduleName || 'route'

            store.registerModule(moduleName, {
                state: cloneRoute(router.currentRoute),
                mutations: {
                    'router/ROUTE_CHANGED': function (state, transition) {
                        store.state[moduleName] = cloneRoute(transition.to, transition.from)
                    }
                }
            })

            var isTimeTraveling = false
            var currentPath

            // sync router on store change
            store.watch(
                function (state) { return state[moduleName] },
                function (route) {
                    if (route.fullPath === currentPath) {
                        return
                    }
                    isTimeTraveling = true
                    currentPath = route.fullPath
                    router.push(route)
                },
                { sync: true }
            )

            // sync store on router navigation
            router.afterEach(function (to, from) {
                if (isTimeTraveling) {
                    isTimeTraveling = false
                    return
                }
                currentPath = to.fullPath
                store.commit('router/ROUTE_CHANGED', { to: to, from: from })
            })
        }

        function cloneRoute (to, from) {
            var clone = {
                name: to.name,
                path: to.path,
                hash: to.hash,
                query: to.query,
                params: to.params,
                fullPath: to.fullPath,
                meta: to.meta
            }
            if (from) {
                clone.from = cloneRoute(from)
            }
            return Object.freeze(clone)
        }


        /***/ }),
    /* 11 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.host = host;
        exports.https = https;
        exports.timeAgo = timeAgo;
        exports.unescape = unescape;
        function host(url) {
            if (!url) return '';
            var host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
            var parts = host.split('.').slice(-3);
            if (parts[0] === 'www') parts.shift();
            return parts.join('.');
        }

        function https(url) {
            if (WXEnvironment.platform === 'iOS' && typeof url === 'string') {
                return url.replace(/^http\:/, 'https:');
            }
            return '';
        }

        function timeAgo(time) {
            var between = Date.now() / 1000 - Number(time);
            if (between < 3600) {
                return pluralize(~~(between / 60), ' minute');
            } else if (between < 86400) {
                return pluralize(~~(between / 3600), ' hour');
            } else {
                return pluralize(~~(between / 86400), ' day');
            }
        }

        function pluralize(time, label) {
            if (time === 1) {
                return time + label;
            }
            return time + label + 's';
        }

        function unescape(text) {
            var res = text || '';[['<p>', '\n'], ['&amp;', '&'], ['&amp;', '&'], ['&apos;', '\''], ['&#x27;', '\''], ['&#x2F;', '/'], ['&#39;', '\''], ['&#47;', '/'], ['&lt;', '<'], ['&gt;', '>'], ['&nbsp;', ' '], ['&quot;', '"']].forEach(function (pair) {
                res = res.replace(new RegExp(pair[0], 'ig'), pair[1]);
            });

            return res;
        }

        /***/ }),
    /* 12 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            methods: {
                jump: function jump(to) {
                    if (this.$router) {
                        this.$router.push(to);
                    }
                },
                getdeviceHeight: function getdeviceHeight() {
                    console.log(WXEnvironment.platform);
                    if (WXEnvironment.platform === 'Web') {
                        console.log(document.body.offsetHeight);
                        return document.body.offsetHeight;
                    }
                    return weex.config.env.deviceHeight;
                }
            }
        };

        /***/ }),
    /* 13 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _vueRouter = __webpack_require__(90);

        var _vueRouter2 = _interopRequireDefault(_vueRouter);

        var _StoriesView = __webpack_require__(81);

        var _StoriesView2 = _interopRequireDefault(_StoriesView);

        var _ArticleView = __webpack_require__(77);

        var _ArticleView2 = _interopRequireDefault(_ArticleView);

        var _CommentView = __webpack_require__(78);

        var _CommentView2 = _interopRequireDefault(_CommentView);

        var _UserView = __webpack_require__(82);

        var _UserView2 = _interopRequireDefault(_UserView);

        var _Index = __webpack_require__(79);

        var _Index2 = _interopRequireDefault(_Index);

        var _Account = __webpack_require__(76);

        var _Account2 = _interopRequireDefault(_Account);

        var _More = __webpack_require__(80);

        var _More2 = _interopRequireDefault(_More);

        var _Cash = __webpack_require__(83);

        var _Cash2 = _interopRequireDefault(_Cash);

        var _Recharge = __webpack_require__(85);

        var _Recharge2 = _interopRequireDefault(_Recharge);

        var _Invest = __webpack_require__(84);

        var _Invest2 = _interopRequireDefault(_Invest);

        var _Register = __webpack_require__(88);

        var _Register2 = _interopRequireDefault(_Register);

        var _Login = __webpack_require__(87);

        var _Login2 = _interopRequireDefault(_Login);

        var _Register3 = __webpack_require__(86);

        var _Register4 = _interopRequireDefault(_Register3);

        var _web = __webpack_require__(89);

        var _web2 = _interopRequireDefault(_web);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import UserInfoView from './views/user/Info.vue'
// depositary

// import RedpacketView from './views/account/Redpacket.vue'
//user


//tabbar
        Vue.use(_vueRouter2.default);

// Story view factory

//account
// import Vue from 'vue'
        function createStoriesView(type) {
            return {
                name: type + '-stories-view',
                render: function render(createElement) {
                    return createElement(_StoriesView2.default, { props: { type: type } });
                }
            };
        }
        function createInvestView(type) {
            return {
                name: type + '-stories-view',
                render: function render(createElement) {
                    return createElement(_Invest2.default, { props: { type: type } });
                }
            };
        }

        exports.default = new _vueRouter2.default({
            // mode: 'abstract',
            routes: [{ path: '/top', component: createStoriesView('top') }, { path: '/new', component: createStoriesView('new') }, { path: '/show', component: createStoriesView('show') }, { path: '/ask', component: createStoriesView('ask') }, { path: '/job', component: createStoriesView('job') }, { path: '/article/:url(.*)?', component: _ArticleView2.default }, { path: '/item/:id(\\d+)', component: _CommentView2.default }, { path: '/users/:id', component: _UserView2.default },
                // { path: '/', redirect: '/account' },
                // tabbar
                { path: '/', component: _Index2.default }, { path: '/more', component: _More2.default }, { path: '/account', component: _Account2.default }, { path: '/web/:url(.*)?', component: _web2.default },
                // account
                { path: '/cach', component: _Cash2.default }, { path: '/recharge', component: _Recharge2.default }, { path: '/invest/0', component: createInvestView("all") }, { path: '/invest/1', component: createInvestView("none") }, { path: '/invest/2', component: createInvestView("done") },
                // { path: '/redpacket', component: RedpacketView },
                // user
                { path: '/user/register', component: _Register2.default }, { path: '/user/login', component: _Login2.default },
                // { path: '/user/info', component: AccountView },
                // depositary
                { path: '/depositary/register', component: _Register4.default }]
        });

        /***/ }),
    /* 14 */
    /***/ (function(module, exports) {

// shim for using process in browser
        var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

        var cachedSetTimeout;
        var cachedClearTimeout;

        function defaultSetTimout() {
            throw new Error('setTimeout has not been defined');
        }
        function defaultClearTimeout () {
            throw new Error('clearTimeout has not been defined');
        }
        (function () {
            try {
                if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        } ())
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
                //normal enviroments in sane situations
                return setTimeout(fun, 0);
            }
            // if setTimeout wasn't available but was latter defined
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedSetTimeout(fun, 0);
            } catch(e){
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                    return cachedSetTimeout.call(null, fun, 0);
                } catch(e){
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }


        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
                //normal enviroments in sane situations
                return clearTimeout(marker);
            }
            // if clearTimeout wasn't available but was latter defined
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedClearTimeout(marker);
            } catch (e){
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                    return cachedClearTimeout.call(null, marker);
                } catch (e){
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                    // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                    return cachedClearTimeout.call(this, marker);
                }
            }



        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;

        function cleanUpNextTick() {
            if (!draining || !currentQueue) {
                return;
            }
            draining = false;
            if (currentQueue.length) {
                queue = currentQueue.concat(queue);
            } else {
                queueIndex = -1;
            }
            if (queue.length) {
                drainQueue();
            }
        }

        function drainQueue() {
            if (draining) {
                return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;

            var len = queue.length;
            while(len) {
                currentQueue = queue;
                queue = [];
                while (++queueIndex < len) {
                    if (currentQueue) {
                        currentQueue[queueIndex].run();
                    }
                }
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }

        process.nextTick = function (fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
                runTimeout(drainQueue);
            }
        };

// v8 likes predictible objects
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function () {
            this.fun.apply(null, this.array);
        };
        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = ''; // empty string to avoid regexp issues
        process.versions = {};

        function noop() {}

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;

        process.binding = function (name) {
            throw new Error('process.binding is not supported');
        };

        process.cwd = function () { return '/' };
        process.chdir = function (dir) {
            throw new Error('process.chdir is not supported');
        };
        process.umask = function() { return 0; };


        /***/ }),
    /* 15 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
//
//
//
//
//
//

        exports.default = {
            methods: {
                back: function back() {
                    this.$router.back();
                }
            }
        };

        /***/ }),
    /* 16 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _config = __webpack_require__(5);

        var _config2 = _interopRequireDefault(_config);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = {
            name: 'tabbar',
            data: function data() {
                return {
                    resouce: "http://192.168.2.113:1337/dist/",
                    configEnv: {},
                    deviceHeight: 0
                };
            },
            init: function init() {},
            created: function created() {
                this.deviceHeight = _config2.default.clientHeight;
                //   this.configEnv = weex.config.env;
                //   this.configEnv.deviceHeight -= 96;
                //   console.log(weex.config.env);
                //   console.log(this.getEnv());
                // this.deviceHeight = this.getdeviceHeight() - 100;
                //   this.configEnv = this.$getConfig().env
                //   this.deviceHeight = this.$getConfig().env.deviceHeight - 96;
                //   console.log(this.deviceHeight);
            },

            computed: {},

            methods: {}

        }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

        /***/ }),
    /* 17 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _store = __webpack_require__(6);

        var _store2 = _interopRequireDefault(_store);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = {
            name: 'comment',
            props: {
                id: {
                    type: [Number, String],
                    required: true,
                    default: '13230551'
                },
                depth: {
                    type: [Number, String],
                    default: 1
                }
            },

            data: function data() {
                return {
                    collapsed: false
                };
            },


            computed: {
                className: function className() {
                    return Number(this.depth) > 1 ? ['deep-comment'] : ['comment'];
                },
                indent: function indent() {
                    return Number(this.depth) > 4 ? 0 : '50px';
                },
                comment: function comment() {
                    return _store2.default.state.items[this.id];
                }
            },

            methods: {
                toggle: function toggle(state) {
                    this.collapsed = state === undefined ? !this.collapsed : state;
                }
            }
        }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

        /***/ }),
    /* 18 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
//
//
//
//
//
//

        exports.default = {
            props: ['url'],
            methods: {
                open: function open() {
                    // get the environment variables
                    var env = weex.config.env || WXEnvironment;

                    // open a new window (tab) on the web
                    if (env.platform === 'Web') {
                        window.open(this.url);
                        return;
                    }

                    // change router path on native (Android & iOS)
                    this.jump('/web/' + this.url);
                }
            }
        };

        /***/ }),
    /* 19 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _jumpWeb = __webpack_require__(7);

        var _jumpWeb2 = _interopRequireDefault(_jumpWeb);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = {
            components: { jumpWeb: _jumpWeb2.default },
            props: {
                story: {
                    type: Object,
                    required: true
                },
                'no-comment': {
                    type: [String, Boolean],
                    default: false
                }
            }
        }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

        /***/ }),
    /* 20 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _vuex = __webpack_require__(0);

        var _appTabbar = __webpack_require__(4);

        var _appTabbar2 = _interopRequireDefault(_appTabbar);

        var _util = __webpack_require__(2);

        var _util2 = _interopRequireDefault(_util);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var modal = weex.requireModule('modal'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// var storage = __weex_require_module__('storage');
// var stream = __weex_require_module__('stream');
// var util = require('../utils/util.js');
        exports.default = {
            components: {
                AppTabBar: _appTabbar2.default
            },
            data: function data() {
                return {
                    default: 0,
                    refreshing: false,
                    sessionId: ''
                };
            },

            // computed: {
            //     account() {
            //         return this.$store.getters.account
            //     }
            //
            // },
            computed: (0, _vuex.mapGetters)({
                account: 'account',
                clientHeight: 'clientHeight',
                loading: 'loading'
            }),

            created: function created() {
                // this.login = true;
                var _this = this;
                _this.fetchAccount(false, this.sessionId);
                // util.getLocationStorage('sessionId').then((res) =>{
                //     _this.sessionId = res
                // })
                //     modal.toast({
                //      message: 'This is a toast',
                //      duration: 0.3
                //    })
            },

            methods: {
                fetchAccount: function fetchAccount(boolean, sessionId) {
                    if (!this.loading && !this.account.userId || boolean) {
                        console.log('加载');
                        this.$store.dispatch('FETCH_ACCOUNT', { sessionId: sessionId }).then(function () {});
                    }
                }
            }
        };

        /***/ }),
    /* 21 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

        exports.default = {
            computed: {
                url: function url() {
                    if (this.$route && this.$route.params) {
                        return this.$route.params.url;
                    }
                    return 'https://www.alibaba.com/';
                }
            }
        };

        /***/ }),
    /* 22 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _appHeader = __webpack_require__(3);

        var _appHeader2 = _interopRequireDefault(_appHeader);

        var _story = __webpack_require__(8);

        var _story2 = _interopRequireDefault(_story);

        var _comment = __webpack_require__(75);

        var _comment2 = _interopRequireDefault(_comment);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = {
            components: { AppHeader: _appHeader2.default, Story: _story2.default, Comment: _comment2.default },
            data: function data() {
                return {
                    loading: true
                };
            },


            computed: {
                id: function id() {
                    if (this.$route && this.$route.params) {
                        return this.$route.params.id;
                    }
                    return '12922141';
                },
                story: function story() {
                    return this.$store.state.items[this.id];
                }
            },

            methods: {
                fetchItem: function fetchItem() {
                    return this.$store.dispatch('FETCH_ITEMS', {
                        ids: [this.id]
                    });
                },
                fetchComments: function fetchComments(item) {
                    var _this = this;

                    if (item.kids) {
                        return this.$store.dispatch('FETCH_ITEMS', {
                            ids: item.kids
                        }).then(function () {
                            return Promise.all(item.kids.map(function (id) {
                                return _this.fetchComments(_this.$store.state.items[id]);
                            }));
                        });
                    }
                },
                fetchItemAndComments: function fetchItemAndComments() {
                    var _this2 = this;

                    return this.fetchItem().then(function () {
                        var _$store$state = _this2.$store.state,
                            items = _$store$state.items,
                            route = _$store$state.route;

                        return _this2.fetchComments(items[_this2.id]);
                    });
                }
            },

            created: function created() {
                var _this3 = this;

                this.fetchItemAndComments().then(function () {
                    _this3.loading = false;
                });
            }
        }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

        /***/ }),
    /* 23 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var _vuex = __webpack_require__(0);

        var _appTabbar = __webpack_require__(4);

        var _appTabbar2 = _interopRequireDefault(_appTabbar);

        var _config = __webpack_require__(5);

        var _config2 = _interopRequireDefault(_config);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        module.exports = {
            components: {
                AppTabBar: _appTabbar2.default
            },
            data: function data() {
                return {
                    refreshing: false,
                    loading_display: 'hide'
                };
            },

            created: function created() {
                this.fetchInvest();
            },
            computed: (0, _vuex.mapGetters)({
                projects: 'projects',
                clientHeight: 'clientHeight',
                loading: 'loading'
            }),
            methods: {
                fetchInvest: function fetchInvest() {
                    var _this = this;

                    this.refreshing = true;
                    console.log(this.projects.pageNum);
                    if (!this.loading) {
                        this.$store.dispatch('FETCH_PROJECTS', { pageNum: this.projects.pageNum, pageSize: this.projects.pageSize }).then(function () {
                            _this.refreshing = false;
                            console.log(_this.projects);
                        });
                    }
                },
                loadMoreinvests: function loadMoreinvests() {
                    var _this2 = this;

                    console.log('loadmore');
                    console.log(this.loading);
                    this.loading_display = 'show';
                    if (!this.loading) {
                        this.$store.dispatch('LOAD_MORE_PROJECTS', { pageNum: this.projects.pageNum, pageSize: this.projects.pageSize }).then(function () {
                            _this2.loading_display = 'hide';
                        });
                    }
                }
            }
        }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

        /***/ }),
    /* 24 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var _jumpWeb = __webpack_require__(7);

        var _jumpWeb2 = _interopRequireDefault(_jumpWeb);

        var _appTabbar = __webpack_require__(4);

        var _appTabbar2 = _interopRequireDefault(_appTabbar);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// var apis = require('./common/api');
        module.exports = {
            components: { AppTabBar: _appTabbar2.default, jumpWeb: _jumpWeb2.default },
            props: {
                lists: {
                    default: function _default() {
                        return [];
                    }
                }
            },
            created: function created() {
                //   var bundleUrl = this.$getConfig().bundleUrl;
                //   console.log('hit', bundleUrl);
                //   var nativeBase;
                //   var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;
                //   var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
                //   if (isAndroidAssets) {
                //     nativeBase = 'file://assets/';
                //   }
                //   else if (isiOSAssets) {
                //     // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
                //     // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
                //     nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
                //   }
                //   else {
                //     var host = 'localhost:12580';
                //     var matches = /\/\/([^\/]+?)\//.exec(this.$getConfig().bundleUrl);
                //     if (matches && matches.length >= 2) {
                //       host = matches[1];
                //     }
                //     nativeBase = 'http://' + host + '/' + this.dir + '/build/';
                //   }
                //   var h5Base = './' + this.dir + '/build/';
                //   // in Native
                //   var base = nativeBase;
                //   if (typeof window === 'object') {
                //     // in Browser or WebView
                //     base = h5Base;
                //   }
                //
                //   for(var i = 0; i < this.tabItems.length; i++) {
                //       var tabItem = this.tabItems[i];
                //       tabItem.src = base + tabItem.src;
                //   }
                // see log in Android Logcat
                //if (this.items.length) console.log('hit', this.items[0].url);

            },
            methods: {
                ready: function ready(e) {
                    var vm = this;
                    vm.$on('tabBar.onClick', function (e) {
                        var detail = e.detail;
                        nativeLog('tabBar.onClick ' + detail.index);
                    });
                }
            }
        };

        /***/ }),
    /* 25 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _appHeader = __webpack_require__(3);

        var _appHeader2 = _interopRequireDefault(_appHeader);

        var _story = __webpack_require__(8);

        var _story2 = _interopRequireDefault(_story);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//

        exports.default = {
            components: { AppHeader: _appHeader2.default, Story: _story2.default },
            props: {
                type: {
                    type: String,
                    required: true,
                    default: 'top'
                }
            },
            data: function data() {
                return {
                    loading: true
                };
            },


            computed: {
                stories: function stories() {
                    return this.$store.getters.activeItems;
                }
            },

            methods: {
                fetchListData: function fetchListData() {
                    var _this = this;

                    this.loading = true;
                    this.$store.dispatch('FETCH_LIST_DATA', {
                        type: this.type
                    }).then(function () {
                        _this.loading = false;
                    });
                },
                loadMoreStories: function loadMoreStories() {
                    var _this2 = this;

                    this.loading = true;
                    this.$store.dispatch('LOAD_MORE_ITEMS').then(function () {
                        _this2.loading = false;
                    });
                }
            },

            created: function created() {
                this.fetchListData();
            }
        };

        /***/ }),
    /* 26 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _appHeader = __webpack_require__(3);

        var _appHeader2 = _interopRequireDefault(_appHeader);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = {
            components: { AppHeader: _appHeader2.default },
            computed: {
                userId: function userId() {
                    if (this.$route && this.$route.params) {
                        return this.$route.params.id;
                    }
                    return 'Hanks10100';
                },
                user: function user() {
                    return this.$store.state.users[this.userId];
                }
            },

            created: function created() {
                this.$store.dispatch('FETCH_USER', { id: this.userId });
            }
        }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

        /***/ }),
    /* 27 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


        module.exports = {
            components: {
                // wxcButton: require('weex-vue-components/button.vue')
            },
            data: function data() {
                return {
                    userInfo: {
                        userName: '',
                        userId: '',
                        phone: '',
                        realName: '',
                        cardId: '',
                        money: '',
                        isRealNameAuth: '',
                        bankCardNum: '',
                        modal: false,
                        imgWidth: '0'
                    },
                    money: '',
                    modal: false,
                    bankLogo: 'http://192.168.2.113:8080/dist/images/bank/bankLogo_01.png'
                };
            },

            created: function created() {},
            methods: {
                imgLoad: function imgLoad(e) {
                    // console.log(e);
                    // if (e.success) {
                    //     var imgWidth = e.size.naturalWidth / e.size.naturalHeight * 60;
                    //     console.log(imgWidth);
                    //     this.imgWidth = imgWidth;
                    // }
                }
            }
        };

        /***/ }),
    /* 28 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var _vuex = __webpack_require__(0);

        module.exports = {
            props: {
                type: {
                    type: String,
                    required: true,
                    default: 'all'
                }
            },
            data: function data() {
                return {
                    refresh_display: 'hide',
                    loading_display: 'hide'
                };
            },

            created: function created() {
                this.fetchInvest();
            },
            computed: (0, _vuex.mapGetters)({
                invests: 'invests',
                tab_cur: 'invest_tab_cur',
                loading: 'loading'
            }),
            methods: {
                tabChange: function tabChange(tab_cur) {
                    var _this = this;

                    if (!this.loading) {
                        this.$store.dispatch('TAB_INVESTLIST', {
                            tab_cur: tab_cur
                        }).then(function () {
                            _this.loading_display = 'hide';
                        });
                    }
                },
                fetchInvest: function fetchInvest() {
                    var _this2 = this;

                    this.refresh_display = 'show';
                    if (!this.loading) {
                        this.$store.dispatch('FETCH_INVESTLIST', { tab_cur: this.tab_cur }).then(function () {
                            _this2.refresh_display = 'hide';
                        });
                    }
                },
                loadMoreinvests: function loadMoreinvests() {
                    var _this3 = this;

                    console.log('loadmore');
                    this.loading_display = 'show';
                    console.log(this.loading);
                    if (!this.loading) {
                        this.$store.dispatch('LOAD_MORE_INVESTLIST', { tab_cur: this.tab_cur }).then(function () {
                            _this3.loading_display = 'hide';
                        });
                    }
                }
            }
        }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

        /***/ }),
    /* 29 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


        module.exports = {
            components: {
                // wxcButton: require('weex-vue-components/button.vue')
            },
            data: function data() {
                return {
                    userInfo: {
                        userName: '',
                        userId: '',
                        phone: '',
                        realName: '',
                        cardId: '',
                        money: '',
                        isRealNameAuth: '',
                        bankCardNum: '',
                        modal: false,
                        imgWidth: '0'
                    },
                    money: '',
                    modal: false,
                    bankLogo: 'http://192.168.2.113:8080/dist/images/bank/bankLogo_01.png'
                };
            },

            created: function created() {},
            methods: {
                imgLoad: function imgLoad(e) {
                    // console.log(e);
                    // if (e.success) {
                    //     var imgWidth = e.size.naturalWidth / e.size.naturalHeight * 60;
                    //     console.log(imgWidth);
                    //     this.imgWidth = imgWidth;
                    // }
                }
            }
        };

        /***/ }),
    /* 30 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var _vuex = __webpack_require__(0);

// var util = require('./utils/util.js');
        var picker = weex.requireModule('picker'); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

        module.exports = {
            data: function data() {
                return {
                    userName: '',
                    userId: '',
                    phone: '',
                    realName: '',
                    cardId: '',
                    isRealNameAuth: '',
                    bankCardNum: '',
                    provinceValue: '',
                    regionValue: '',
                    bankPhone: '',
                    smsCode: ''
                };
            },

            computed: (0, _vuex.mapGetters)({
                clientHeight: 'clientHeight'
            }),
            created: function created() {},
            methods: {
                region: function region() {
                    var items = new Array("广西", "广东", "江西", "湖南", "湖北", "云南", "山西", "");
                    var self = this;
                    picker.pick({
                        'items': items,
                        'index': self.index
                    }, function (ret) {
                        var result = ret.result;
                        if (result == 'success') {
                            self.regionValue = items[ret.data];
                            self.index = ret.data;
                        }
                    });
                },
                province: function province() {
                    var items = new Array("广西", "广东", "江西", "湖南", "湖北", "云南", "山西", "");
                    var self = this;
                    picker.pick({
                        'items': items,
                        'index': self.index
                    }, function (ret) {
                        var result = ret.result;
                        if (result == 'success') {
                            self.provinceValue = items[ret.data];
                            self.index = ret.data;
                        }
                    });
                }

            }
        };

        /***/ }),
    /* 31 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var _vuex = __webpack_require__(0);

        var _util = __webpack_require__(2);

        var _util2 = _interopRequireDefault(_util);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

        module.exports = {
            // props: {
            //     userName: {
            //         type: String,
            //         default: ''
            //     },
            //     password: {
            //         type: String,
            //         default: ''
            //     }
            // },
            data: function data() {
                return {
                    userName: '',
                    password: '',
                    passwordType: 'password',
                    switchOn: false
                };
            },

            computed: (0, _vuex.mapGetters)({
                loading: 'loading'
            }),
            created: function created() {
                // 页面初始化 options为页面跳转所带来的参数

            },
            methods: {
                login: function login() {
                    if (!this.loading) {
                        this.$store.dispatch('LOGIN_ACTION', { userName: this.userName, password: this.password }).then(function () {
                            _util2.default.getLocationStorage('sessionId').then(function (res) {
                                console.log(res);
                            });
                        });
                    }
                },
                clear: function clear(type) {
                    if (type == 'userName') {
                        this.userName = '';
                    } else {
                        this.password = '';
                    }
                },

                switchTab: function switchTab() {
                    this.switchOn = !this.switchOn;
                    this.passwordType = this.passwordType == 'text' ? 'password' : 'text';
                },
                inputUserName: function inputUserName(e) {
                    this.userName = e.value;
                    console.log(this.userName);
                },
                inputPassWord: function inputPassWord(e) {
                    this.password = e.value;
                }
            }
        };

        /***/ }),
    /* 32 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// var apis = require('./common/api');

        module.exports = {
            data: function data() {
                return {
                    switchOn: false,
                    passwordType: 'password',
                    username: '',
                    password: '',
                    smscode: '',
                    inviter: '',
                    getSmsText: '获取',
                    getSmsClass: true,
                    nameStauts: false,
                    regStatus: false,
                    url: 'http://app1.mindai.com/'
                };
            },

            created: function created() {},
            methods: {
                created: function created(e) {}
            }
        };

        /***/ }),
    /* 33 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

        exports.default = {
            computed: {
                url: function url() {
                    if (this.$route && this.$route.params) {
                        return this.$route.params.url;
                    }
                    return 'https://www.alibaba.com/';
                }
            }
        };

        /***/ }),
    /* 34 */
    /***/ (function(module, exports) {

        module.exports = {
            "user-info": {
                "paddingTop": 60,
                "paddingLeft": 80,
                "paddingRight": 60
            },
            "user-name": {
                "fontSize": 72,
                "fontWeight": "bold",
                "marginBottom": 60
            },
            "loading-text": {
                "fontFamily": "Verdana, Geneva, sans-serif",
                "fontSize": 44,
                "color": "#BBBBBB"
            },
            "meta-label": {
                "fontFamily": "Verdana, Geneva, sans-serif",
                "fontSize": 32,
                "marginBottom": 15,
                "color": "#333333"
            },
            "user-about": {
                "marginTop": 20,
                "fontSize": 28,
                "color": "#666666"
            }
        }

        /***/ }),
    /* 35 */
    /***/ (function(module, exports) {

        module.exports = {
            "webview": {
                "flex": 1
            },
            "fixed-button": {
                "position": "absolute",
                "bottom": 50,
                "right": 50,
                "backgroundColor": "#FC6621",
                "borderRadius": 10,
                "width": 120,
                "padding": 15,
                "color": "#FFFFFF",
                "textAlign": "center"
            }
        }

        /***/ }),
    /* 36 */
    /***/ (function(module, exports) {

        module.exports = {
            "container": {
                "backgroundColor": "#f2f3f7"
            },
            "text-center": {
                "textAlign": "center"
            },
            "white-bg": {
                "backgroundColor": "#ffffff"
            },
            "mt30": {
                "marginTop": 30
            },
            "flex-row": {
                "flexDirection": "row"
            },
            "flex-1": {
                "flex": 1
            },
            "bank": {
                "paddingTop": 30,
                "paddingBottom": 30,
                "paddingRight": 30,
                "paddingLeft": 30
            },
            "padding": {
                "paddingTop": 10,
                "paddingBottom": 10,
                "paddingRight": 30,
                "paddingLeft": 30
            },
            "just-start": {
                "justifyContent": "flex-start"
            },
            "logo": {
                "height": 60,
                "width": 500
            },
            "card": {
                "flexDirection": "row",
                "justifyContent": "space-between",
                "marginTop": 30
            },
            "card-text": {
                "fontSize": 46,
                "color": "#888888",
                "textAlign": "center"
            },
            "input": {
                "marginLeft": 10,
                "paddingLeft": 10,
                "fontSize": 28,
                "height": 80,
                "lineHeight": 80
            },
            "button": {
                "marginTop": 30,
                "marginLeft": 30,
                "backgroundColor": "#32c1d4",
                "paddingTop": 25,
                "paddingBottom": 25,
                "width": 690,
                "fontSize": 40,
                "borderRadius": 10,
                "borderWidth": 0
            },
            "button-text": {
                "color": "#ffffff",
                "fontSize": 32,
                "fontWeight": "bold",
                "textAlign": "center"
            },
            "sub-text": {
                "fontSize": 24,
                "color": "#888888",
                "marginTop": 20,
                "marginBottom": 20,
                "marginLeft": 20,
                "marginRight": 20
            },
            "main-text": {
                "fontSize": 28,
                "color": "#888888",
                "marginTop": 20,
                "marginBottom": 20,
                "marginLeft": 20,
                "marginRight": 20
            }
        }

        /***/ }),
    /* 37 */
    /***/ (function(module, exports) {

        module.exports = {
            "container": {
                "backgroundColor": "#f2f3f7"
            },
            "text-center": {
                "textAlign": "center"
            },
            "flex-row": {
                "flexDirection": "row"
            },
            "flex-1": {
                "flex": 1
            },
            "main-text": {
                "fontSize": 40,
                "alignItems": "flex-end"
            },
            "align-end": {
                "alignItems": "flex-end"
            },
            "main-sub-text": {
                "fontSize": 28,
                "display": "flex",
                "marginBottom": 8
            },
            "item": {
                "paddingTop": 20,
                "paddingBottom": 20,
                "paddingLeft": 20,
                "paddingRight": 20,
                "backgroundColor": "#ffffff",
                "marginTop": 30
            },
            "item-header": {
                "justifyContent": "space-between"
            },
            "item-body": {
                "marginTop": 20,
                "marginBottom": 20,
                "alignItems": "center"
            },
            "item-footer": {
                "justifyContent": "space-between"
            },
            "rate": {
                "borderWidth": 5,
                "borderStyle": "solid",
                "borderColor": "#32c1d4",
                "borderRadius": 40,
                "width": 80,
                "height": 80
            },
            "rate-text": {
                "fontSize": 24,
                "textAlign": "center",
                "alignItems": "center",
                "color": "#32c1d4",
                "paddingTop": 20,
                "paddingBottom": 20
            },
            "status": {
                "textAlign": "right"
            },
            "time": {
                "fontSize": 24,
                "color": "#888888"
            },
            "refresh-view": {
                "width": 750,
                "height": 100,
                "display": "flex",
                "MsFlexAlign": "center",
                "WebkitAlignItems": "center",
                "WebkitBoxAlign": "center",
                "alignItems": "center"
            },
            "loading-view": {
                "width": 750,
                "height": 100,
                "display": "flex",
                "MsFlexAlign": "center",
                "WebkitAlignItems": "center",
                "WebkitBoxAlign": "center",
                "alignItems": "center"
            },
            "indicator": {
                "height": 60,
                "width": 60,
                "color": "#889967"
            },
            "refresh-arrow": {
                "fontSize": 30,
                "color": "#45b5f0"
            }
        }

        /***/ }),
    /* 38 */
    /***/ (function(module, exports) {

        module.exports = {
            "bg-inner": {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": 750
            },
            "justify-center": {
                "justifyContent": "center"
            },
            "logo": {
                "height": 116,
                "width": 112,
                "marginLeft": 319,
                "marginTop": 100,
                "marginBottom": 140,
                "flexDirection": "column"
            },
            "forms-gray": {
                "backgroundColor": "rgba(255,255,255,0.8)"
            },
            "forms-mh30": {
                "marginLeft": 60,
                "marginRight": 60
            },
            "forms-radius": {
                "borderRadius": 10
            },
            "form": {
                "paddingLeft": 30,
                "paddingRight": 30,
                "height": 100,
                "flexDirection": "row",
                "borderBottomWidth": 2,
                "borderBottomStyle": "solid",
                "borderBottomColor": "#cccccc",
                "alignItems": "center"
            },
            "form-hd": {
                "width": 30,
                "height": 36,
                "marginRight": 40
            },
            "form-bd": {
                "flex": 1
            },
            "form-clear": {
                "width": 32,
                "height": 32
            },
            "form-icon": {
                "width": 30,
                "height": 36
            },
            "input-text": {
                "fontSize": 28,
                "background": "none",
                "border": 0,
                "height": 100,
                "lineHeight": 100,
                "border:focus": 0
            },
            "switch": {
                "width": 68,
                "height": 36,
                "marginTop": 32,
                "marginLeft": 20,
                "padding": 4,
                "borderRadius": 20
            },
            "switch-img": {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": 68,
                "height": 36
            },
            "switch-off": {
                "left": 4
            },
            "switch-on": {
                "left": 36
            },
            "switch-handle": {
                "position": "absolute",
                "top": 4,
                "width": 28,
                "height": 28,
                "borderRadius": 14,
                "backgroundColor": "#ffffff"
            },
            "get-sms-code": {
                "fontSize": 24,
                "borderWidth": 1,
                "borderStyle": "solid",
                "borderColor": "#32c1d4",
                "color": "#32c1d4",
                "width": 116,
                "paddingTop": 15,
                "paddingBottom": 15,
                "textAlign": "center",
                "borderRadius": 10
            },
            "register": {
                "fontSize": 36,
                "color": "#ffffff",
                "backgroundColor": "#32c1d4",
                "height": 80,
                "paddingTop": 17,
                "paddingBottom": 17,
                "marginLeft": 60,
                "marginRight": 60,
                "marginTop": 30,
                "textAlign": "center",
                "marginBottom": 30,
                "borderRadius": 10
            },
            "agreement": {
                "paddingTop": 30,
                "paddingBottom": 30,
                "fontSize": 24,
                "color": "#aaaaaa",
                "textAlign": "center"
            }
        }

        /***/ }),
    /* 39 */
    /***/ (function(module, exports) {

        module.exports = {
            "container": {
                "backgroundColor": "#f2f3f7"
            },
            "text-center": {
                "textAlign": "center"
            },
            "flex-row": {
                "flexDirection": "row"
            },
            "flex-1": {
                "flex": 1
            },
            "border-top": {
                "borderTopWidth": 1,
                "borderTopColor": "#cccccc",
                "borderTopStyle": "solid"
            },
            "line": {
                "height": 36,
                "width": 1,
                "backgroundColor": "#cccccc"
            },
            "count": {
                "paddingTop": 60,
                "paddingBottom": 60,
                "backgroundColor": "#ffffff"
            },
            "color-blue": {
                "color": "#32c1d4",
                "fontSize": 32
            },
            "tab": {
                "backgroundColor": "#ffffff"
            },
            "tab-nav": {
                "textAlign": "center",
                "paddingTop": 25,
                "paddingBottom": 25
            },
            "tab-line": {
                "height": 5,
                "backgroundColor": "#32c1d4",
                "width": 100,
                "marginLeft": 75
            },
            "main-sub-text": {
                "fontSize": 24,
                "color": "#888888"
            },
            "item": {
                "paddingTop": 20,
                "paddingBottom": 20,
                "paddingLeft": 20,
                "paddingRight": 20,
                "backgroundColor": "#ffffff",
                "marginTop": 30
            },
            "item-header": {
                "justifyContent": "space-between"
            },
            "item-body": {
                "marginTop": 12,
                "marginBottom": 12
            },
            "status": {
                "textAlign": "right"
            },
            "time": {
                "fontSize": 28,
                "color": "#888888"
            },
            "refresh-view": {
                "width": 750,
                "height": 100,
                "display": "flex",
                "MsFlexAlign": "center",
                "WebkitAlignItems": "center",
                "WebkitBoxAlign": "center",
                "alignItems": "center"
            },
            "loading-view": {
                "width": 750,
                "height": 100,
                "display": "flex",
                "MsFlexAlign": "center",
                "WebkitAlignItems": "center",
                "WebkitBoxAlign": "center",
                "alignItems": "center"
            },
            "indicator": {
                "height": 60,
                "width": 60,
                "color": "#889967"
            },
            "refresh-arrow": {
                "fontSize": 30,
                "color": "#45b5f0"
            }
        }

        /***/ }),
    /* 40 */
    /***/ (function(module, exports) {

        module.exports = {
            "header": {
                "position": "relative",
                "height": 120,
                "marginBottom": 3,
                "borderBottomWidth": 2,
                "borderBottomStyle": "solid",
                "borderBottomColor": "#DDDDDD",
                "backgroundColor": "#FF6600"
            },
            "logo": {
                "position": "relative",
                "width": 50,
                "height": 50,
                "top": 35,
                "left": 35,
                "borderWidth": 3,
                "borderStyle": "solid",
                "borderColor": "#FFFFFF"
            },
            "image": {
                "width": 44,
                "height": 44
            },
            "nav": {
                "display": "flex",
                "position": "absolute",
                "left": 120,
                "top": 35,
                "flexDirection": "row",
                "flexWrap": "nowrap",
                "justifyContent": "flex-start",
                "alignItems": "center"
            },
            "link": {
                "paddingLeft": 15,
                "paddingRight": 15
            },
            "title": {
                "fontFamily": "Verdana, Geneva, sans-serif",
                "fontSize": 32,
                "lineHeight": 44,
                "color": "#FFFFFF"
            }
        }

        /***/ }),
    /* 41 */
    /***/ (function(module, exports) {

        module.exports = {
            "container": {
                "backgroundColor": "#f2f3f7"
            },
            "bgc-white": {
                "backgroundColor": "#ffffff"
            },
            "flex-row": {
                "flexDirection": "row"
            },
            "flex-1": {
                "flex": 1
            },
            "border-top": {
                "borderTopWidth": 1,
                "borderTopColor": "#cccccc",
                "borderTopStyle": "solid"
            },
            "line": {
                "height": 36,
                "width": 1,
                "backgroundColor": "#cccccc"
            },
            "flex-center": {
                "alignItems": "center"
            },
            "just-center": {
                "justifyContent": "center"
            },
            "text-center": {
                "textAlign": "center"
            },
            "cell-access": {
                "paddingTop": 30,
                "paddingRight": 20,
                "paddingBottom": 30,
                "paddingLeft": 30,
                "flexDirection": "row"
            },
            "cell-hd": {
                "marginRight": 30
            },
            "cell-bd": {
                "flex": 1
            },
            "arrow-right": {
                "width": 40,
                "height": 40
            },
            "mt30": {
                "marginTop": 30
            },
            "sub-info": {
                "fontSize": 24,
                "marginTop": 10
            },
            "account-amount": {
                "left": 0,
                "top": 0,
                "width": 750
            },
            "amount-other": {
                "paddingBottom": 40
            },
            "depository-no": {
                "paddingTop": 70,
                "paddingBottom": 70,
                "textAlign": "center",
                "alignItems": "center",
                "marginTop": -100
            },
            "amount-all": {
                "justifyContent": "center",
                "marginTop": 30,
                "marginBottom": 30
            },
            "c-orange": {
                "color": "#ff871f",
                "fontSize": 40,
                "marginTop": 10
            },
            "zs-logo": {
                "width": 120,
                "height": 40,
                "marginTop": 20,
                "marginRight": 20,
                "marginLeft": 20
            },
            "btn": {
                "width": 400,
                "height": 84,
                "borderWidth": 2,
                "borderColor": "#32c1d4",
                "borderStyle": "solid",
                "paddingTop": 20,
                "paddingBottom": 20,
                "borderRadius": 10,
                "fontSize": 40,
                "fontWeight": "700",
                "color": "#32c1d4",
                "textAlign": "center",
                "alignItems": "center"
            },
            "btn-sub": {
                "color": "#32c1d4",
                "paddingTop": 24,
                "paddingBottom": 24,
                "fontSize": 36,
                "textAlign": "center"
            },
            "main-txt": {
                "fontSize": 32
            },
            "main-sub-info": {
                "marginTop": 20,
                "fontSize": 24,
                "color": "#aaaaaa"
            },
            "safety": {
                "width": 750,
                "color": "#888888",
                "fontSize": 24,
                "textAlign": "center",
                "marginBottom": 12,
                "marginTop": 30
            }
        }

        /***/ }),
    /* 42 */
    /***/ (function(module, exports) {

        module.exports = {
            "tabbar": {
                "position": "absolute",
                "width": 750,
                "height": 96,
                "borderTopWidth": 2,
                "borderTopStyle": "solid",
                "borderTopColor": "#ffbe23",
                "backgroundColor": "#ffffff",
                "flexDirection": "row"
            },
            "jump-app": {
                "width": 120,
                "height": 96,
                "borderWidth": 3,
                "borderStyle": "solid",
                "borderColor": "#FFFFFF",
                "backgroundColor": "#f3f3f3"
            },
            "image": {
                "width": 44,
                "height": 44,
                "marginLeft": 55,
                "marginTop": 14
            },
            "nav": {
                "display": "flex",
                "flexDirection": "column",
                "flexWrap": "nowrap",
                "justifyContent": "flex-start",
                "alignItems": "center",
                "flex": 1
            },
            "nav-container": {
                "flexDirection": "row",
                "width": 630
            },
            "link": {
                "flex": 1,
                "justifyContent": "center"
            },
            "title": {
                "fontFamily": "Verdana, Geneva, sans-serif",
                "fontSize": 24,
                "lineHeight": 36,
                "color": "#888888",
                "textAlign": "center"
            }
        }

        /***/ }),
    /* 43 */
    /***/ (function(module, exports) {

        module.exports = {
            "container": {
                "backgroundColor": "#f2f3f7"
            },
            "text-center": {
                "textAlign": "center"
            },
            "white-bg": {
                "backgroundColor": "#ffffff"
            },
            "mt30": {
                "marginTop": 30
            },
            "flex-row": {
                "flexDirection": "row"
            },
            "flex-1": {
                "flex": 1
            },
            "c-color": {
                "color": "#ff871f",
                "marginRight": 0,
                "marginLeft": 0
            },
            "bank": {
                "paddingTop": 30,
                "paddingBottom": 30,
                "paddingRight": 30,
                "paddingLeft": 30
            },
            "padding": {
                "paddingTop": 10,
                "paddingBottom": 10,
                "paddingRight": 30,
                "paddingLeft": 30
            },
            "just-start": {
                "justifyContent": "flex-start"
            },
            "logo": {
                "height": 60,
                "width": 500
            },
            "card": {
                "flexDirection": "row",
                "justifyContent": "space-between",
                "marginTop": 30
            },
            "card-text": {
                "fontSize": 46,
                "color": "#888888",
                "textAlign": "center"
            },
            "input": {
                "marginLeft": 10,
                "paddingLeft": 10,
                "fontSize": 28,
                "height": 80,
                "lineHeight": 80
            },
            "button": {
                "marginTop": 30,
                "marginLeft": 30,
                "backgroundColor": "#32c1d4",
                "paddingTop": 25,
                "paddingBottom": 25,
                "width": 690,
                "fontSize": 40,
                "borderRadius": 10,
                "borderWidth": 0,
                "backgroundColor:active": "#FF0000"
            },
            "button-text": {
                "color": "#ffffff",
                "fontSize": 32,
                "fontWeight": "bold",
                "textAlign": "center"
            },
            "sub-text": {
                "fontSize": 24,
                "color": "#888888",
                "marginTop": 20,
                "marginBottom": 20,
                "marginLeft": 20,
                "marginRight": 20
            },
            "main-text": {
                "fontSize": 28,
                "color": "#888888",
                "marginTop": 20,
                "marginBottom": 20,
                "marginLeft": 20,
                "marginRight": 20
            }
        }

        /***/ }),
    /* 44 */
    /***/ (function(module, exports) {

        module.exports = {
            "commont-view": {
                "backgroundColor": "#F5F5F5"
            },
            "story-cell": {
                "marginBottom": 3,
                "borderBottomWidth": 2,
                "borderBottomStyle": "solid",
                "borderBottomColor": "#DDDDDD",
                "backgroundColor": "#FFFFFF"
            },
            "comments-box": {
                "marginTop": 20,
                "backgroundColor": "#FFFFFF",
                "paddingLeft": 35,
                "paddingRight": 35
            },
            "comment-count": {
                "fontSize": 36,
                "paddingTop": 30,
                "paddingBottom": 30,
                "borderBottomStyle": "solid",
                "borderBottomWidth": 2,
                "borderBottomColor": "#EEEEEE",
                "marginBottom": 30
            }
        }

        /***/ }),
    /* 45 */
    /***/ (function(module, exports) {

        module.exports = {
            "container": {
                "backgroundColor": "#f2f3f7"
            },
            "text-center": {
                "textAlign": "center"
            },
            "text-right": {
                "textAlign": "right"
            },
            "text-left": {
                "textAlign": "left"
            },
            "flex-row": {
                "flexDirection": "row"
            },
            "flex-1": {
                "flex": 1
            },
            "grev": {
                "color": "#888888"
            },
            "mt30": {
                "marginTop": 30
            },
            "cell": {
                "backgroundColor": "#ffffff",
                "width": 750,
                "alignItems": "center",
                "borderBottomWidth": 1,
                "borderBottomStyle": "solid",
                "borderBottomColor": "#e6e6e6",
                "paddingTop": 24,
                "paddingBottom": 24,
                "paddingRight": 20,
                "paddingLeft": 20,
                "flexDirection": "row",
                "justifyContent": "space-between"
            },
            "banner": {
                "height": 200,
                "width": 750,
                "alignItems": "center",
                "justifyContent": "center"
            },
            "logo": {
                "width": 240,
                "height": 90
            },
            "icon": {
                "width": 40,
                "height": 40
            },
            "input": {
                "marginLeft": 10,
                "paddingLeft": 10,
                "fontSize": 32,
                "height": 80,
                "lineHeight": 80
            },
            "text": {
                "fontSize": 32,
                "color": "#888888"
            },
            "getSmsCode": {
                "width": 200,
                "borderRadius": 6,
                "backgroundColor": "#32c1d4",
                "borderWidth": 0
            },
            "smsCode-text": {
                "color": "#ffffff",
                "fontSize": 28,
                "paddingTop": 14,
                "paddingBottom": 14,
                "fontWeight": "bold",
                "textAlign": "center"
            },
            "button": {
                "marginTop": 30,
                "marginLeft": 30,
                "marginBottom": 30,
                "backgroundColor": "#32c1d4",
                "paddingTop": 25,
                "paddingBottom": 25,
                "width": 690,
                "fontSize": 40,
                "borderRadius": 10,
                "borderWidth": 0
            },
            "button-text": {
                "color": "#ffffff",
                "fontSize": 32,
                "fontWeight": "bold",
                "textAlign": "center"
            }
        }

        /***/ }),
    /* 46 */
    /***/ (function(module, exports) {

        module.exports = {
            "webview": {
                "flex": 1
            },
            "fixed-button": {
                "position": "absolute",
                "bottom": 50,
                "right": 50,
                "backgroundColor": "#FC6621",
                "borderRadius": 10,
                "width": 120,
                "padding": 15,
                "color": "#FFFFFF",
                "textAlign": "center"
            }
        }

        /***/ }),
    /* 47 */
    /***/ (function(module, exports) {

        module.exports = {
            "bg-inner": {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": 750,
                "minHeight": 660
            },
            "justify-center": {
                "justifyContent": "center"
            },
            "logo": {
                "height": 116,
                "width": 112,
                "marginLeft": 319,
                "marginTop": 100,
                "marginBottom": 140,
                "flexDirection": "column"
            },
            "forms-gray": {
                "backgroundColor": "rgba(255,255,255,0.8)"
            },
            "forms-mh30": {
                "marginLeft": 60,
                "marginRight": 60
            },
            "forms-radius": {
                "borderRadius": 10,
                "overflow": "hidden"
            },
            "form": {
                "paddingLeft": 30,
                "paddingRight": 30,
                "height": 100,
                "flexDirection": "row",
                "alignItems": "center"
            },
            "form-hd": {
                "width": 30,
                "height": 36,
                "marginRight": 40
            },
            "form-bd": {
                "flex": 1
            },
            "form-clear": {
                "width": 32,
                "height": 32
            },
            "form-icon": {
                "width": 30,
                "height": 36
            },
            "input-text": {
                "fontSize": 28,
                "background": "none",
                "border": 0,
                "height": 100,
                "lineHeight": 100,
                "border:focus": 0
            },
            "switch": {
                "width": 68,
                "height": 36,
                "marginTop": 32,
                "marginLeft": 20,
                "borderRadius": 20,
                "backgroundColor": "#32c1d4"
            },
            "switch-img": {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": 68,
                "height": 36
            },
            "switch-off": {
                "left": 4
            },
            "switch-on": {
                "left": 36
            },
            "switch-handle": {
                "position": "absolute",
                "top": 4,
                "width": 28,
                "height": 28,
                "borderRadius": 14,
                "backgroundColor": "#ffffff",
                "WebkitTransition": "all 0.3s"
            },
            "@TRANSITION": {
                "switch-handle": {
                    "duration": 300
                }
            },
            "button": {
                "fontSize": 36,
                "color": "#ffffff",
                "backgroundColor": "#32c1d4",
                "paddingTop": 16,
                "paddingBottom": 16,
                "marginLeft": 60,
                "marginRight": 60,
                "marginTop": 30,
                "marginBottom": 30,
                "textAlign": "center",
                "borderRadius": 10
            }
        }

        /***/ }),
    /* 48 */
    /***/ (function(module, exports) {

        module.exports = {
            "cell-item": {
                "position": "relative",
                "paddingTop": 20,
                "paddingBottom": 25,
                "paddingLeft": 100,
                "paddingRight": 40
            },
            "story-score": {
                "position": "absolute",
                "width": 100,
                "textAlign": "center",
                "left": 0,
                "top": 20,
                "fontSize": 32,
                "fontWeight": "bold",
                "color": "#FF6600"
            },
            "story-link": {
                "marginBottom": 25,
                "width": 610
            },
            "story-title": {
                "fontSize": 33,
                "color": "#404040"
            },
            "small-text": {
                "color": "#BBBBBB",
                "fontSize": 22,
                "marginBottom": 0,
                "fontFamily": "Verdana, Geneva, sans-serif"
            },
            "link-text": {
                "textDecoration": "underline"
            },
            "text-group": {
                "display": "flex",
                "flexDirection": "row",
                "flexWrap": "nowrap",
                "justifyContent": "flex-start",
                "alignItems": "center"
            },
            "text-cell": {
                "flexGrow": 0
            }
        }

        /***/ }),
    /* 49 */
    /***/ (function(module, exports) {

        module.exports = {
            "comment": {
                "paddingBottom": 25,
                "borderBottomWidth": 1,
                "borderBottomStyle": "solid",
                "borderBottomColor": "#DDDDDD",
                "marginBottom": 35,
                "position": "relative"
            },
            "deep-comment": {
                "marginTop": 25,
                "position": "relative"
            },
            "text-group": {
                "display": "flex",
                "flexDirection": "row",
                "justifyContent": "flex-start",
                "alignItems": "center"
            },
            "text-cell": {
                "flexGrow": 0
            },
            "small-text": {
                "color": "#BBBBBB",
                "fontSize": 22,
                "lineHeight": 22,
                "marginBottom": 10,
                "fontFamily": "Verdana, Geneva, sans-serif"
            },
            "link": {
                "textDecoration": "underline"
            },
            "comment-btn": {
                "position": "absolute",
                "fontFamily": "Consolas, \"Liberation Mono\", Menlo, Courier, monospace"
            },
            "comment-title": {
                "fontSize": 26,
                "color": "#404040"
            }
        }

        /***/ }),
    /* 50 */
    /***/ (function(module, exports) {

        module.exports = {
            "stories-view": {
                "height": 100
            },
            "story-cell": {
                "marginBottom": 3,
                "borderBottomWidth": 2,
                "borderBottomStyle": "solid",
                "borderBottomColor": "#DDDDDD",
                "backgroundColor": "#FFFFFF"
            },
            "loading": {
                "width": 750,
                "height": 120,
                "display": "flex",
                "alignItems": "center",
                "justifyContent": "center"
            },
            "loading-text": {
                "textAlign": "center",
                "fontSize": 40,
                "color": "#BBBBBB"
            }
        }

        /***/ }),
    /* 51 */
    /***/ (function(module, exports) {

        module.exports = {
            "container": {
                "backgroundColor": "#f5f5f5",
                "position": "absolute"
            },
            "mr25": {
                "marginRight": 25
            },
            "mt20": {
                "marginTop": 20
            },
            "cell-access": {
                "width": 750,
                "backgroundColor": "#ffffff",
                "paddingLeft": 25,
                "paddingTop": 12,
                "paddingBottom": 12,
                "paddingRight": 25,
                "flexDirection": "row",
                "borderBottomWidth": 1,
                "borderBottomStyle": "solid",
                "borderBottomColor": "#cccccc",
                "alignItems": "center"
            },
            "cell": {
                "flexDirection": "column",
                "height": 80,
                "flex": 1
            },
            "cell-grow": {
                "width": 40
            },
            "justify-space": {
                "justifyContent": "space-between"
            },
            "text-right": {
                "textAlign": "right"
            },
            "icon": {
                "width": 40,
                "height": 40,
                "marginRight": 25
            },
            "text": {
                "fontSize": 34,
                "fontWeight": "400",
                "textAlign": "left",
                "paddingTop": 23,
                "paddingBottom": 23,
                "color": "#000000",
                "height": 80
            },
            "arrow-right": {
                "width": 40,
                "height": 40
            }
        }

        /***/ }),
    /* 52 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["user-view"]
            }, [_c('app-header'), _c('div', {
                staticClass: ["user-info"]
            }, [_c('text', {
                staticClass: ["user-name"]
            }, [_vm._v(_vm._s(_vm.userId))]), (_vm.user) ? _c('div', {
                staticClass: ["user-meta"]
            }, [_c('text', {
                staticClass: ["meta-label"]
            }, [_vm._v("Created: " + _vm._s(_vm._f("timeAgo")(_vm.user.created)) + " ago")]), _c('text', {
                staticClass: ["meta-label"]
            }, [_vm._v("Karma:   " + _vm._s(_vm.user.karma))]), (_vm.user.about) ? _c('text', {
                staticClass: ["meta-label", "user-about"]
            }, [_vm._v(_vm._s(_vm._f("unescape")(_vm.user.about)))]) : _vm._e()]) : _c('div', {
                staticClass: ["loading"]
            }, [_c('text', {
                staticClass: ["loading-text"]
            }, [_vm._v("loading ...")])])])], 1)
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 53 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', [_c('web', {
                staticClass: ["webview"],
                attrs: {
                    "src": _vm._f("https")(_vm.url)
                }
            }), _c('text', {
                staticClass: ["fixed-button"],
                on: {
                    "click": function($event) {
                        _vm.jump("/")
                    }
                }
            }, [_vm._v("back")])], 1)
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 54 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["container"]
            }, [_c('div', {
                staticClass: ["bank", "mt30", "white-bg"]
            }, [_c('div', {
                staticClass: ["just-start"]
            }, [_c('image', {
                staticClass: ["logo"],
                attrs: {
                    "src": _vm.bankLogo,
                    "resize": "contain"
                },
                on: {
                    "load": _vm.imgLoad
                }
            })]), _vm._m(0)]), _c('div', {
                staticClass: ["padding", "white-bg", "mt30", "flex-row"],
                staticStyle: {
                    alignItems: "center"
                }
            }, [_c('text', {
                staticStyle: {
                    width: "140px"
                }
            }, [_vm._v("充值金额")]), _c('input', {
                staticClass: ["input", "flex-1"],
                attrs: {
                    "type": "text",
                    "name": "",
                    "value": _vm.money,
                    "placeholder": "请输入充值金额"
                }
            })]), _c('text', {
                staticClass: ["sub-text"]
            }, [_vm._v("账户余额：0.00元")]), _c('div', {
                staticClass: ["button"],
                nativeOn: {
                    "click": function($event) {
                        _vm.signup($event)
                    }
                }
            }, [_c('text', {
                staticClass: ["button-text"]
            }, [_vm._v("确认提现")])]), _vm._m(1)])
        },staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["card"]
            }, [_c('text', {
                staticClass: ["card-text", "flex-1"]
            }, [_vm._v("6217")]), _c('text', {
                staticClass: ["card-text", "flex-1"]
            }, [_vm._v("****")]), _c('text', {
                staticClass: ["card-text", "flex-1"]
            }, [_vm._v("****")]), _c('text', {
                staticClass: ["card-text", "flex-1"]
            }, [_vm._v("1320")])])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["mt30"]
            }, [_c('text', {
                staticClass: ["main-text"]
            }, [_vm._v("温馨提示：")]), _c('text', {
                staticClass: ["main-text"]
            }, [_vm._v("1、当日充值的资金不可提现但可用于投资，充值成功后，待T+1工作日充值清算后可提现。")]), _c('text', {
                staticClass: ["main-text"]
            }, [_vm._v("2、充值金额只能用于平台投资，不可作为借款人还款金额。")])])
        }]}
        module.exports.render._withStripped = true

        /***/ }),
    /* 55 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["container"]
            }, [_c('scroller', {
                staticClass: ["scroller"],
                style: {
                    width: '750px',
                    height: _vm.clientHeight + 'px'
                },
                attrs: {
                    "loadmoreoffset": "80"
                },
                on: {
                    "loadmore": _vm.loadMoreinvests
                }
            }, [_c('refresh', {
                staticClass: ["refresh-view"],
                attrs: {
                    "display": _vm.refreshing ? 'show' : 'hide'
                },
                on: {
                    "refresh": _vm.fetchInvest
                }
            }, [((!_vm.refreshing)) ? _c('text', [_vm._v("↓ pull to refresh")]) : _vm._e(), _c('loading-indicator', {
                staticClass: ["indicator"]
            })], 1), _vm._m(0), _vm._l((_vm.projects.list), function(item) {
                return _c('div', {
                    key: item.id,
                    staticClass: ["cell"],
                    appendAsTree: true,
                    attrs: {
                        "append": "tree"
                    }
                }, [_c('div', {
                    staticClass: ["item"]
                }, [_c('div', {
                    staticClass: ["item-header", "flex-row"]
                }, [_c('text', {
                    staticClass: ["title", "flex-1"]
                }, [_vm._v(_vm._s(item.projectId))]), _c('text', {
                    staticClass: ["status", "flex-1"]
                }, [_vm._v(_vm._s(item.status))])]), _c('div', {
                    staticClass: ["item-body", "flex-row"]
                }, [_c('div', {
                    staticClass: ["principal", "flex-1"]
                }, [_c('text', {
                    staticClass: ["main-text"]
                }, [_vm._v(_vm._s(item.rate) + "%")])]), _c('div', {
                    staticClass: ["flex-1"]
                }, [_c('div', {
                    staticClass: ["flex-row", "align-end"]
                }, [_c('text', {
                    staticClass: ["main-text"]
                }, [_vm._v(_vm._s(item.term))]), _c('text', {
                    staticClass: ["main-sub-text"]
                }, [_vm._v("个月")])])]), _c('div', {
                    staticClass: ["rate"]
                }, [_c('text', {
                    staticClass: ["rate-text"]
                }, [_vm._v(_vm._s(Math.floor(item.progress)) + "%")])])]), _c('div', {
                    staticClass: ["item-footer", "flex-row"]
                }, [_c('div', {
                    staticClass: ["flex-1"]
                }, [_c('text', {
                    staticClass: ["time"]
                }, [_vm._v(_vm._s(item.minAmount) + "起投，限投" + _vm._s(item.maxAmount) + "元")])]), _c('div', {
                    staticClass: ["flex-1"]
                }, [_c('text', {
                    staticClass: ["time"],
                    staticStyle: {
                        textAlign: "right"
                    }
                }, [_vm._v("剩余" + _vm._s(item.surplusAmount) + "元/" + _vm._s(item.totalAmount) + "万")])])])])])
            }), _c('loading', {
                staticClass: ["loading-view"],
                attrs: {
                    "display": _vm.loading_display
                }
            }, [((_vm.loading_display === 'hide')) ? _c('text', [_vm._v("↑ Loadmore")]) : _vm._e(), _c('loading-indicator', {
                staticClass: ["indicator"]
            })], 1)], 2), _c('AppTabBar')], 1)
        },staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["header"]
            }, [_c('image', {
                staticClass: ["banner"],
                staticStyle: {
                    width: "750px",
                    height: "200px"
                },
                attrs: {
                    "src": "http://120.25.77.23:3131/mz/images/banner.png",
                    "resize": "cover"
                }
            }), _c('image', {
                staticClass: ["sub-banner"],
                staticStyle: {
                    width: "750px",
                    height: "220px"
                },
                attrs: {
                    "src": "http://120.25.77.23:3131/mz/images/cunguan.png",
                    "resize": "cover"
                }
            })])
        }]}
        module.exports.render._withStripped = true

        /***/ }),
    /* 56 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["container"]
            }, [_c('image', {
                staticStyle: {
                    width: "750px",
                    height: "853px"
                },
                attrs: {
                    "src": _vm.url + 'images/login-bg.png',
                    "alt": "",
                    "resize": "cover"
                }
            }), _c('div', {
                staticClass: ["bg-inner"]
            }, [_vm._m(0), _c('div', {
                staticClass: ["forms-mh30", "forms-gray", "forms-radius"]
            }, [_c('div', {
                staticClass: ["form"]
            }, [_vm._m(1), _c('div', {
                staticClass: ["form-bd"]
            }, [_c('input', {
                ref: "userName",
                staticClass: ["input-text"],
                attrs: {
                    "type": "text",
                    "value": _vm.userName,
                    "placeholder": "手机号/用户名",
                    "maxlength": "20"
                },
                on: {
                    "input": _vm.listenerUserName
                }
            })]), _c('div', {
                staticClass: ["form-ft"]
            }, [_c('image', {
                class: [_vm.userName == '' ? '' : 'form-clear', 'ng-hide'],
                attrs: {
                    "src": "http://app1.mindai.com/images/x-29.png"
                },
                on: {
                    "click": _vm.clearUserName
                }
            })])]), _c('div', {
                staticClass: ["form"]
            }, [_vm._m(2), _c('div', {
                staticClass: ["form-bd"]
            }, [_c('input', {
                staticClass: ["input-text"],
                attrs: {
                    "type": _vm.passwordType,
                    "value": _vm.password,
                    "placeholder": "请输入密码",
                    "maxlength": "20"
                },
                on: {
                    "input": _vm.listenerPassword
                }
            })]), _c('div', {
                staticClass: ["form-ft"]
            }, [_c('div', {
                staticStyle: {
                    flexDirection: "row"
                }
            }, [_c('image', {
                class: [_vm.password == '' ? '' : 'form-clear', 'ng-hide'],
                attrs: {
                    "src": "http://app1.mindai.com/images/x-29.png"
                },
                on: {
                    "click": _vm.clearPassword
                }
            }), _c('div', {
                staticClass: ["switch"],
                style: {
                    backgroundColor: _vm.switchOn != false ? '#32c1d4' : '#ccc'
                }
            }, [_c('div', {
                class: ['switch-handle', _vm.switchOn != false ? 'switch-on' : 'switch-off']
            }), _c('image', {
                staticClass: ["switch-img"],
                attrs: {
                    "src": _vm.switchOn != false ? 'http://192.168.2.113:1337/dist/images/switch-1_01.png' : 'http://192.168.2.113:1337/dist/images/switch-1_02.png'
                }
            })])])])]), _c('div', {
                staticClass: ["form"],
                staticStyle: {
                    borderBottomWidth: "0"
                }
            }, [_vm._m(3), _c('div', {
                staticClass: ["form-bd"]
            }, [_c('input', {
                staticClass: ["input-text"],
                attrs: {
                    "type": "text",
                    "value": _vm.userName,
                    "placeholder": "请输入验证码",
                    "maxlength": "20"
                },
                on: {
                    "input": _vm.listenerUserName
                }
            })]), _c('div', {
                staticClass: ["form-ft"]
            }, [_c('text', {
                staticClass: ["get-sms-code"]
            }, [_vm._v(_vm._s(_vm.getSmsText))])])])]), _c('div', {
                staticClass: ["forms-mh30", "forms-gray", "forms-radius"],
                staticStyle: {
                    marginTop: "30px"
                }
            }, [_c('div', {
                staticClass: ["form"],
                staticStyle: {
                    borderBottomWidth: "0"
                }
            }, [_vm._m(4), _c('div', {
                staticClass: ["form-bd"]
            }, [_c('input', {
                staticClass: ["input-text"],
                attrs: {
                    "type": "text",
                    "placeholder": "推荐人用户名/手机号（选填）",
                    "maxlength": "20",
                    "bindinput": "listenerInviter",
                    "value": _vm.inviter,
                    "ngEnter": ""
                }
            })]), _c('div', {
                staticClass: ["form-ft"]
            }, [_c('div', {
                ref: "inviterClear",
                class: [_vm.inviter == '' ? '' : 'form-clear', 'ng-hide'],
                attrs: {
                    "dataClear": "inviter",
                    "bindtap": "clear"
                }
            })])])]), _c('text', {
                staticClass: ["register"]
            }, [_vm._v("注册")]), _c('text', {
                staticClass: ["agreement", "mt15"]
            }, [_vm._v("点击上述按钮，即表示你同意《民贷天下注册协议》")])])])
        },staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["justify-center"]
            }, [_c('image', {
                staticClass: ["logo"],
                attrs: {
                    "src": "http://app1.mindai.com/images/logo.png"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["form-hd"]
            }, [_c('image', {
                staticClass: ["icon", "form-icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/icons-1_01.png"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["form-hd"]
            }, [_c('image', {
                staticClass: ["icon", "form-icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/icons-1_02.png"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["form-hd"]
            }, [_c('image', {
                staticClass: ["icon", "form-icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/icons-1_03.png"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["form-hd"]
            }, [_c('image', {
                staticClass: ["icon", "form-icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/icons-1_04.png"
                }
            })])
        }]}
        module.exports.render._withStripped = true

        /***/ }),
    /* 57 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["container"]
            }, [_c('div', {
                staticClass: ["count", "flex-row"]
            }, [_c('div', {
                staticClass: ["flex-1"]
            }, [_c('text', {
                staticClass: ["main-sub-text", "text-center"]
            }, [_vm._v("累计已投")]), _c('text', {
                staticClass: ["color-blue", "text-center"]
            }, [_vm._v(_vm._s(_vm.invests.totalAmount))])]), _c('div', {
                staticClass: ["line"]
            }), _c('div', {
                staticClass: ["flex-1"]
            }, [_c('text', {
                staticClass: ["main-sub-text", "text-center"]
            }, [_vm._v("累计已赚收益")]), _c('text', {
                staticClass: ["color-blue", "text-center"]
            }, [_vm._v(_vm._s(_vm.invests.totalInterest))])])]), _c('div', {
                staticClass: ["tab", "border-top", "flex-row"]
            }, [_c('div', {
                staticClass: ["flex-1"]
            }, [_c('text', {
                staticClass: ["tab-nav"],
                on: {
                    "click": function($event) {
                        _vm.jump('/invest/0')
                    }
                }
            }, [_vm._v("全部")]), (_vm.type == 'all') ? _c('div', {
                staticClass: ["tab-line"]
            }) : _vm._e()]), _c('div', {
                staticClass: ["flex-1"]
            }, [_c('text', {
                staticClass: ["tab-nav"],
                on: {
                    "click": function($event) {
                        _vm.jump('/invest/1')
                    }
                }
            }, [_vm._v("未还完")]), (_vm.type == 'none') ? _c('div', {
                staticClass: ["tab-line"]
            }) : _vm._e()]), _c('div', {
                staticClass: ["flex-1"]
            }, [_c('text', {
                staticClass: ["tab-nav"],
                on: {
                    "click": function($event) {
                        _vm.jump('/invest/2')
                    }
                }
            }, [_vm._v("已还完")]), (_vm.type == 'done') ? _c('div', {
                staticClass: ["tab-line"]
            }) : _vm._e()])]), _c('list', {
                staticClass: ["list"],
                attrs: {
                    "loadmoreoffset": "80"
                },
                on: {
                    "loadmore": _vm.loadMoreinvests
                }
            }, [_vm._l((_vm.invests.list), function(item) {
                return _c('cell', {
                    key: item.id,
                    staticClass: ["cell"],
                    appendAsTree: true,
                    attrs: {
                        "append": "tree"
                    }
                }, [_c('div', {
                    staticClass: ["item"]
                }, [_c('div', {
                    staticClass: ["item-header", "flex-row"]
                }, [_c('text', {
                    staticClass: ["title", "flex-1"]
                }, [_vm._v(_vm._s(item.orderId))]), _c('text', {
                    staticClass: ["status", "flex-1"]
                }, [_vm._v(_vm._s(item.status))])]), _c('div', {
                    staticClass: ["item-body", "flex-row"]
                }, [_c('div', {
                    staticClass: ["principal", "flex-1"]
                }, [_c('text', {
                    staticClass: ["main-sub-text"]
                }, [_vm._v("投资本金")]), _c('text', {
                    staticClass: ["main-text"]
                }, [_vm._v(_vm._s(item.amount) + "元")])]), _c('div', {
                    staticClass: ["rate", "flex-1"]
                }, [_c('text', {
                    staticClass: ["main-sub-text"]
                }, [_vm._v("年利率")]), _c('text', {
                    staticClass: ["main-text"]
                }, [_vm._v(_vm._s(item.rate) + "%")])])]), _c('div', {
                    staticClass: ["item-footer"]
                }, [_c('text', {
                    staticClass: ["time"]
                }, [_vm._v(_vm._s(item.startDate) + "起息 ~  " + _vm._s(item.endDate) + "到期")])])])])
            }), _c('loading', {
                staticClass: ["loading-view"],
                attrs: {
                    "display": _vm.loading_display
                }
            }, [((_vm.loading_display === 'hide')) ? _c('text', [_vm._v("↑ Loadmore")]) : _vm._e(), _c('loading-indicator', {
                staticClass: ["indicator"]
            })], 1)], 2)])
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 58 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["header"]
            }, [_c('div', {
                staticClass: ["logo"],
                on: {
                    "click": function($event) {
                        _vm.jump('/')
                    }
                }
            }, [_c('image', {
                staticClass: ["image"],
                attrs: {
                    "src": "https://news.ycombinator.com/favicon.ico"
                }
            })]), _c('div', {
                staticClass: ["nav"]
            }, [_c('div', {
                staticClass: ["link"],
                on: {
                    "click": function($event) {
                        _vm.jump('/top')
                    }
                }
            }, [_c('text', {
                staticClass: ["title"]
            }, [_vm._v("Top")])]), _c('div', {
                staticClass: ["link"],
                on: {
                    "click": function($event) {
                        _vm.jump('/new')
                    }
                }
            }, [_c('text', {
                staticClass: ["title"]
            }, [_vm._v("New")])]), _c('div', {
                staticClass: ["link"],
                on: {
                    "click": function($event) {
                        _vm.jump('/show')
                    }
                }
            }, [_c('text', {
                staticClass: ["title"]
            }, [_vm._v("Show")])]), _c('div', {
                staticClass: ["link"],
                on: {
                    "click": function($event) {
                        _vm.jump('/ask')
                    }
                }
            }, [_c('text', {
                staticClass: ["title"]
            }, [_vm._v("Ask")])]), _c('div', {
                staticClass: ["link"],
                on: {
                    "click": function($event) {
                        _vm.jump('/job')
                    }
                }
            }, [_c('text', {
                staticClass: ["title"]
            }, [_vm._v("Job")])])])])
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 59 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                on: {
                    "click": _vm.open
                }
            }, [_vm._t("default")], 2)
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 60 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["container"]
            }, [(!_vm.loading) ? _c('div', {
                staticClass: ["login"]
            }, [_c('scroller', {
                staticClass: ["scroller"],
                style: {
                    width: '750px',
                    height: _vm.clientHeight + 'px'
                }
            }, [_c('refresh', {
                staticClass: ["refresh-view"],
                attrs: {
                    "display": _vm.refreshing ? 'show' : 'hide'
                },
                on: {
                    "refresh": function($event) {
                        _vm.fetchAccount(true, _vm.sessionId)
                    }
                }
            }, [((!_vm.refreshing)) ? _c('text', [_vm._v("↓ pull to refresh")]) : _vm._e(), _c('loading-indicator', {
                staticClass: ["indicator"]
            })], 1), _c('div', {
                staticClass: ["cells", "cell-user", "bgc-white"]
            }, [_c('a', {
                staticClass: ["cell-access", "flex", "flex-center"],
                attrs: {
                    "url": "/pages/user/my-info"
                }
            }, [_c('div', {
                staticClass: ["cell-hd"],
                staticStyle: {
                    marginRight: "20px"
                }
            }, [_c('div', {
                staticClass: ["cell-icon"]
            }, [_c('image', {
                staticStyle: {
                    width: "70px",
                    height: "70px"
                },
                attrs: {
                    "src": _vm.account.headImgUrl || 'http://192.168.2.113:1337/dist/images/head_img_member.png'
                }
            })])]), _c('div', {
                staticClass: ["cell-bd"]
            }, [_c('text', {
                staticClass: ["main-txt"]
            }, [_vm._v(_vm._s(_vm.account.realName))]), _c('text', {
                staticClass: ["sub-info"]
            }, [_vm._v(_vm._s(_vm.account.phone))])]), _c('div', {
                staticClass: ["cell-ft"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])])], 1), _c('div', {
                staticClass: ["cells", "mt30", "bgc-white"]
            }, [(_vm.account.isDepository == 0) ? _c('image', {
                staticStyle: {
                    width: "750px",
                    height: "80px"
                },
                attrs: {
                    "src": _vm.account.headImgUrl || 'http://120.25.77.23:3131/mz/images/zs-logo-3.png'
                }
            }) : _vm._e(), _c('div', {
                staticClass: ["account-amount"]
            }, [(_vm.account.isDepository == 0) ? _c('div', {
                staticClass: ["depository-no"]
            }, [_c('text', {
                staticStyle: {
                    fontSize: "50px",
                    fontWeight: "bold"
                }
            }, [_vm._v("开通存管账户")]), _c('text', {
                staticStyle: {
                    paddingTop: "30px",
                    paddingBottom: "40px",
                    fontSize: "40px"
                }
            }, [_vm._v("投资及账户资金更安全")]), _c('div', {
                staticClass: ["btn"],
                on: {
                    "click": function($event) {
                        _vm.jump('/depositary/register')
                    }
                }
            }, [_c('text', {
                staticStyle: {
                    color: "#32c1d4",
                    textAlign: "center"
                }
            }, [_vm._v("我要开通")])])]) : _vm._e(), (_vm.account.isDepository != 0) ? _c('div', {
                staticClass: ["depository-yes"]
            }, [_c('div', {
                staticClass: ["zs-card-num", "flex-row"]
            }, [_c('image', {
                staticClass: ["zs-logo"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/zsLogo.png",
                    "resize": "contain"
                }
            }), _c('text', {
                staticClass: ["main-sub-info"]
            }, [_vm._v("存管帐号  " + _vm._s(_vm.account.depositoryId))])]), _c('div', {
                staticClass: ["amount-all"]
            }, [_c('text', {
                staticClass: ["main-sub-info", "text-center"]
            }, [_vm._v("存管总资产(元)")]), _c('text', {
                staticClass: ["c-orange", "text-center"]
            }, [_vm._v(_vm._s(_vm.account.allAmount))])]), _c('div', {
                staticClass: ["amount-other", "flex-row"]
            }, [_c('div', {
                staticClass: ["flex-1"]
            }, [_c('text', {
                staticClass: ["main-sub-info", "text-center"]
            }, [_vm._v("可用余额 (元)")]), _c('text', {
                staticClass: ["amount-other-num", "text-center"]
            }, [_vm._v(_vm._s(_vm.account.surplusAmount))])]), _c('div', {
                staticClass: ["flex-1"]
            }, [_c('text', {
                staticClass: ["main-sub-info", "text-center"]
            }, [_vm._v("待收本金 (元)")]), _c('text', {
                staticClass: ["amount-other-num", "text-center"]
            }, [_vm._v(_vm._s(_vm.account.reclaimPrincipal))])])]), _c('div', {
                staticClass: ["border-top", "flex-row", "flex-center"]
            }, [_c('div', {
                staticClass: ["flex-1"],
                on: {
                    "click": function($event) {
                        _vm.jump('/recharge')
                    }
                }
            }, [_c('text', {
                staticClass: ["btn-sub"]
            }, [_vm._v("充值")])]), _c('div', {
                staticClass: ["line"]
            }), _c('div', {
                staticClass: ["flex-1"],
                on: {
                    "click": function($event) {
                        _vm.jump('/cach')
                    }
                }
            }, [_c('text', {
                staticClass: ["btn-sub"]
            }, [_vm._v("提现")])])])]) : _vm._e()])]), _c('div', {
                staticClass: ["cells", "cell-main", "cells-hasIcon", "mt30", "bgc-white"]
            }, [_c('div', {
                staticClass: ["cell-access", "flex", "flex-center"],
                staticStyle: {
                    borderBottomWidth: "2px",
                    borderBottomStyle: "solid",
                    borderBottomColor: "#e6e6e6"
                },
                on: {
                    "click": function($event) {
                        _vm.jump('/invest/0')
                    }
                }
            }, [_vm._m(0), _c('div', {
                staticClass: ["cell-bd"]
            }, [_c('text', {
                staticClass: ["main-txt"]
            }, [_vm._v("项目投资")]), _c('text', {
                staticClass: ["main-sub-info"]
            }, [_vm._v("累计已投" + _vm._s(_vm.account.allInvestAmount) + "元，已赚" + _vm._s(_vm.account.hasGotInterest) + "元")])]), _vm._m(1)]), _c('div', {
                staticClass: ["cell-access", "flex", "flex-center"],
                attrs: {
                    "url": "/pages/my-account/recovery-list"
                }
            }, [_vm._m(2), _c('div', {
                staticClass: ["cell-bd"]
            }, [_c('text', {
                staticClass: ["main-txt"]
            }, [_vm._v("回款计划")]), _c('text', {
                staticClass: ["main-sub-info"]
            }, [_vm._v("待收本金" + _vm._s(_vm.account.reclaimPrincipal) + "元，利息" + _vm._s(_vm.account.reclaimInterest) + "元")])]), _vm._m(3)])]), _vm._m(4), _vm._m(5), _vm._m(6), _vm._m(7)], 1)]) : _vm._e(), _c('AppTabBar')], 1)
        },staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cell-hd"]
            }, [_c('image', {
                staticClass: ["cell-icon", "icon-rmb"],
                staticStyle: {
                    width: "34px",
                    height: "42px"
                },
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/icon-rmb.png"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cell-ft"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cell-hd"]
            }, [_c('image', {
                staticClass: ["cell-icon", "icon-check"],
                staticStyle: {
                    width: "34px",
                    height: "42px"
                },
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/icon-check.png"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cell-ft"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cells", "cell-main", "cells-hasIcon", "mt30", "bgc-white"],
                staticStyle: {
                    borderBottomWidth: "2px",
                    borderBottomStyle: "solid",
                    borderBottomColor: "#e6e6e6"
                }
            }, [_c('div', {
                staticClass: ["cell-access", "flex", "flex-center"],
                attrs: {
                    "url": "/pages/my-account/transaction-record"
                }
            }, [_c('div', {
                staticClass: ["cell-hd"]
            }, [_c('image', {
                staticClass: ["cell-icon", "icon-list"],
                staticStyle: {
                    width: "34px",
                    height: "42px"
                },
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/icon-list.png"
                }
            })]), _c('div', {
                staticClass: ["cell-bd"]
            }, [_c('text', {
                staticClass: ["main-txt"]
            }, [_vm._v("交易记录")])]), _c('div', {
                staticClass: ["cell-ft"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])])])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cells", "cell-main", "cells-hasIcon", "bgc-white"]
            }, [_c('div', {
                staticClass: ["cell-access", "flex", "flex-center"],
                attrs: {
                    "href": "http://192.168.2.113:1337/dist/account/redpacket.js"
                }
            }, [_c('div', {
                staticClass: ["cell-hd"]
            }, [_c('image', {
                staticClass: ["cell-icon", "icon-repacket"],
                staticStyle: {
                    width: "34px",
                    height: "42px"
                },
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/icon-repacket.png"
                }
            })]), _c('div', {
                staticClass: ["cell-bd"]
            }, [_c('text', {
                staticClass: ["main-txt"]
            }, [_vm._v("我的红包")])]), _c('div', {
                staticClass: ["cell-ft"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])])])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cells", "cell-main", "cells-hasIcon", "mt30", "bgc-white"]
            }, [_c('div', {
                staticClass: ["cell-access", "flex", "flex-center"],
                attrs: {
                    "url": "/pages/my-account/transaction-record"
                }
            }, [_c('div', {
                staticClass: ["cell-hd"]
            }, [_c('image', {
                staticClass: ["cell-icon", "icon-repacket"],
                staticStyle: {
                    width: "34px",
                    height: "42px"
                },
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/icon-repacket.png"
                }
            })]), _c('div', {
                staticClass: ["cell-bd"]
            }, [_c('text', {
                staticClass: ["main-txt"]
            }, [_vm._v("我的红包")])]), _c('div', {
                staticClass: ["cell-ft"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])])])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["flex-row"]
            }, [_c('text', {
                staticClass: ["safety"]
            }, [_vm._v("交易与账户安全由中国人民保险公司全程担保")])])
        }]}
        module.exports.render._withStripped = true

        /***/ }),
    /* 61 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["tabbar"],
                style: {
                    top: _vm.deviceHeight + 'px'
                }
            }, [_c('div', {
                staticClass: ["nav"]
            }, [_c('div', {
                staticClass: ["nav-container"]
            }, [_c('div', {
                staticClass: ["link"],
                on: {
                    "click": function($event) {
                        _vm.jump('/')
                    }
                }
            }, [_c('image', {
                staticClass: ["image"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/openIcon2.png",
                    "resize": "contain"
                }
            }), _c('text', {
                staticClass: ["title"]
            }, [_vm._v("首页")])]), _c('div', {
                staticClass: ["link"],
                on: {
                    "click": function($event) {
                        _vm.jump('/account')
                    }
                }
            }, [_c('image', {
                staticClass: ["image"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/openIcon3.png",
                    "resize": "contain"
                }
            }), _c('text', {
                staticClass: ["title"]
            }, [_vm._v("转让市场")])]), _c('div', {
                staticClass: ["link"],
                on: {
                    "click": function($event) {
                        _vm.jump('/account')
                    }
                }
            }, [_c('image', {
                staticClass: ["image"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/openIcon4.png",
                    "resize": "contain"
                }
            }), _c('text', {
                staticClass: ["title"]
            }, [_vm._v("账户")])]), _c('div', {
                staticClass: ["link"],
                on: {
                    "click": function($event) {
                        _vm.jump('/more')
                    }
                }
            }, [_c('image', {
                staticClass: ["image"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/openIcon5.png",
                    "resize": "contain"
                }
            }), _c('text', {
                staticClass: ["title"]
            }, [_vm._v("更多")])])])]), _c('div', {
                staticClass: ["jump-app"],
                on: {
                    "click": function($event) {
                        _vm.jump('/')
                    }
                }
            }, [_c('image', {
                staticClass: ["image"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/openIcon1.png",
                    "resize": "contain"
                }
            })])])
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 62 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["container"]
            }, [_c('div', {
                staticClass: ["bank", "mt30", "white-bg"]
            }, [_c('div', {
                staticClass: ["just-start"]
            }, [_c('image', {
                staticClass: ["logo"],
                style: {
                    width: _vm.imgWidth
                },
                attrs: {
                    "src": _vm.bankLogo,
                    "resize": "contain"
                },
                on: {
                    "load": _vm.imgLoad
                }
            })]), _vm._m(0)]), _vm._m(1), _c('div', {
                staticClass: ["padding", "white-bg", "mt30", "flex-row"],
                staticStyle: {
                    alignItems: "center"
                }
            }, [_c('text', {
                staticStyle: {
                    width: "140px"
                }
            }, [_vm._v("提现金额")]), _c('input', {
                staticClass: ["input", "flex-1"],
                attrs: {
                    "type": "text",
                    "name": "",
                    "value": _vm.money,
                    "placeholder": "请输入提现金额"
                }
            })]), _c('text', {
                staticClass: ["sub-text"]
            }, [_vm._v("本次提现手续费：0.00元")]), _c('div', {
                staticClass: ["button"],
                nativeOn: {
                    "click": function($event) {
                        _vm.signup($event)
                    }
                }
            }, [_c('text', {
                staticClass: ["button-text"]
            }, [_vm._v("确认提现")])]), _vm._m(2)])
        },staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["card"]
            }, [_c('text', {
                staticClass: ["card-text", "flex-1"]
            }, [_vm._v("6217")]), _c('text', {
                staticClass: ["card-text", "flex-1"]
            }, [_vm._v("****")]), _c('text', {
                staticClass: ["card-text", "flex-1"]
            }, [_vm._v("****")]), _c('text', {
                staticClass: ["card-text", "flex-1"]
            }, [_vm._v("1320")])])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["flex-row"]
            }, [_c('text', {
                staticClass: ["sub-text"]
            }, [_vm._v("可提现金额：")]), _c('text', {
                staticClass: ["sub-text", "c-color"]
            }, [_vm._v("0.00")]), _c('text', {
                staticClass: ["sub-text"]
            }, [_vm._v("元")])])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["mt30"]
            }, [_c('text', {
                staticClass: ["main-text"]
            }, [_vm._v("温馨提示：")]), _c('text', {
                staticClass: ["main-text"]
            }, [_vm._v("1、当日充值的资金不可提现，充值成功后，待T+1工作日充值清算后可提。")]), _c('text', {
                staticClass: ["main-text"]
            }, [_vm._v("2、提现返回结果显示提现成功仅表示提现交易已成功受理，资金入账时间以实际处理时间为准。")])])
        }]}
        module.exports.render._withStripped = true

        /***/ }),
    /* 63 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["commont-view"]
            }, [_c('app-header'), _c('scroller', [(_vm.story) ? _c('div', {
                staticClass: ["story-cell"]
            }, [_c('story', {
                staticClass: ["comment-story"],
                attrs: {
                    "story": _vm.story,
                    "noComment": "true"
                }
            })], 1) : _vm._e(), (_vm.story && _vm.story.kids) ? _c('div', {
                staticClass: ["comments-box"]
            }, [(_vm.story.descendants) ? _c('text', {
                staticClass: ["comment-count"]
            }, [_vm._v(_vm._s(_vm.story.descendants) + " comments")]) : _c('text', {
                staticClass: ["comment-count"]
            }, [_vm._v("no comments")]), _c('div', {
                staticClass: ["comment-list"]
            }, _vm._l((_vm.story.kids), function(id) {
                return _c('comment', {
                    key: id,
                    attrs: {
                        "id": id
                    }
                })
            }))]) : _vm._e()])], 1)
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 64 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["container"]
            }, [_c('scroller', {
                staticClass: ["scroller"],
                style: {
                    width: '750px',
                    height: _vm.clientHeight + 'px'
                }
            }, [_vm._m(0), _c('div', {
                staticClass: ["cell"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:8080/dist/images/openIcon1.png",
                    "resize": "contain"
                }
            }), _c('input', {
                staticClass: ["input", "flex-1"],
                attrs: {
                    "type": "text",
                    "name": "",
                    "value": _vm.realName,
                    "placeholder": "请输入真实姓名"
                }
            })]), _c('div', {
                staticClass: ["cell"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:8080/dist/images/openIcon2.png",
                    "resize": "contain"
                }
            }), _c('input', {
                staticClass: ["input", "flex-1"],
                attrs: {
                    "type": "text",
                    "name": "",
                    "value": _vm.cardId,
                    "placeholder": "请输入身份证号"
                }
            })]), _c('div', {
                staticClass: ["cell", "mt30"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:8080/dist/images/openIcon5.png",
                    "resize": "contain"
                }
            }), _c('input', {
                staticClass: ["input", "flex-1"],
                attrs: {
                    "type": "text",
                    "name": "",
                    "value": _vm.bankCardNum,
                    "placeholder": "请输入银行卡号"
                }
            })]), _c('div', {
                staticClass: ["cell", "flex-row"],
                staticStyle: {
                    backgroundColor: "transparent"
                }
            }, [_c('div', {
                staticClass: ["flex-1", "flex-row"],
                on: {
                    "click": _vm.province
                }
            }, [_c('image', {
                staticClass: ["icon"],
                staticStyle: {
                    marginRight: "20px"
                },
                attrs: {
                    "src": "http://192.168.2.113:8080/dist/images/openIcon3.png",
                    "resize": "contain"
                }
            }), _c('text', {
                staticClass: ["text"]
            }, [_vm._v(_vm._s(_vm.provinceValue || "银行开户省份"))])]), _c('div', {
                staticClass: ["flex-1"],
                on: {
                    "click": _vm.region
                }
            }, [_c('text', {
                staticClass: ["text"]
            }, [_vm._v(_vm._s(_vm.regionValue || "银行开户地区"))])])]), _c('div', {
                staticClass: ["cell"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:8080/dist/images/openIcon6.png",
                    "resize": "contain"
                }
            }), _c('input', {
                staticClass: ["input", "flex-1"],
                attrs: {
                    "type": "text",
                    "name": "",
                    "value": _vm.bankPhone,
                    "placeholder": "请输入银行卡预留手机号"
                }
            })]), _c('div', {
                staticClass: ["cell"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:8080/dist/images/openIcon7.png",
                    "resize": "contain"
                }
            }), _c('input', {
                staticClass: ["input", "flex-1"],
                attrs: {
                    "type": "text",
                    "name": "",
                    "value": _vm.smsCode,
                    "placeholder": "请输入短信验证码"
                }
            }), _c('div', {
                staticClass: ["getSmsCode"],
                nativeOn: {
                    "click": function($event) {
                        _vm.signup($event)
                    }
                }
            }, [_c('text', {
                staticClass: ["smsCode-text"]
            }, [_vm._v("获取验证码")])])]), _c('div', {
                staticClass: ["button"],
                nativeOn: {
                    "click": function($event) {
                        _vm.signup($event)
                    }
                }
            }, [_c('text', {
                staticClass: ["button-text"]
            }, [_vm._v("开通存管账户")])]), _c('text', {
                staticStyle: {
                    color: "#888",
                    fontSize: "24px",
                    marginTop: "20px",
                    marginRight: "30px",
                    marginLeft: "30px"
                }
            }, [_vm._v("温馨提示：请填写您的个人真实信息，存管账户开通后将无法修改。")])])])
        },staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["banner"]
            }, [_c('image', {
                staticClass: ["logo"],
                attrs: {
                    "src": "http://192.168.2.113:8080/dist/images/zs-logo-4.png",
                    "resize": "contain"
                }
            })])
        }]}
        module.exports.render._withStripped = true

        /***/ }),
    /* 65 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', [_c('web', {
                staticClass: ["webview"],
                attrs: {
                    "src": _vm._f("https")(_vm.url)
                }
            }), _c('text', {
                staticClass: ["fixed-button"],
                on: {
                    "click": function($event) {
                        _vm.jump("/")
                    }
                }
            }, [_vm._v("back")])], 1)
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 66 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                on: {
                    "androidback": _vm.back
                }
            }, [_c('router-view', {
                staticStyle: {
                    flex: "1"
                }
            })], 1)
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 67 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["container"]
            }, [_c('image', {
                staticStyle: {
                    width: "750px",
                    height: "573px"
                },
                attrs: {
                    "src": "http://app1.mindai.com/images/login-bg.png",
                    "alt": "",
                    "resize": "cover"
                }
            }), _c('div', {
                staticClass: ["bg-inner"]
            }, [_vm._m(0), _c('div', {
                staticClass: ["forms-mh30", "forms-gray", "forms-radius"]
            }, [_c('div', {
                staticClass: ["form"],
                staticStyle: {
                    borderBottomColor: "#ccc",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "2px"
                }
            }, [_vm._m(1), _c('div', {
                staticClass: ["form-bd"]
            }, [_c('input', {
                staticClass: ["input-text"],
                attrs: {
                    "type": "text",
                    "placeholder": "手机号/用户名"
                },
                on: {
                    "input": _vm.inputUserName
                }
            })]), _c('div', {
                staticClass: ["form-ft"]
            }, [(_vm.userName) ? _c('image', {
                attrs: {
                    "src": "http://app1.mindai.com/images/x-29.png"
                },
                on: {
                    "click": function($event) {
                        _vm.clear('userName')
                    }
                }
            }) : _vm._e()])]), _c('div', {
                staticClass: ["form"]
            }, [_vm._m(2), _c('div', {
                staticClass: ["form-bd"]
            }, [_c('input', {
                staticClass: ["input-text"],
                attrs: {
                    "type": _vm.passwordType,
                    "placeholder": "请输入密码"
                },
                on: {
                    "input": _vm.inputPassWord
                }
            })]), _c('div', {
                staticClass: ["form-ft"]
            }, [_c('div', {
                staticStyle: {
                    flexDirection: "row"
                }
            }, [(_vm.password) ? _c('image', {
                attrs: {
                    "src": "http://app1.mindai.com/images/x-29.png"
                },
                on: {
                    "click": function($event) {
                        _vm.clear('password')
                    }
                }
            }) : _vm._e(), _c('div', {
                staticClass: ["switch"],
                style: {
                    backgroundColor: _vm.switchOn != false ? '#32c1d4' : '#ccc'
                },
                on: {
                    "click": _vm.switchTab
                }
            }, [_c('div', {
                class: ['switch-handle', _vm.switchOn != false ? 'switch-on' : 'switch-off']
            }), _c('image', {
                staticClass: ["switch-img"],
                attrs: {
                    "src": _vm.switchOn != false ? 'http://192.168.2.113:1337/dist/images/switch-1_01.png' : 'http://192.168.2.113:1337/dist/images/switch-1_02.png'
                }
            })])])])])]), _c('text', {
                staticClass: ["button"],
                on: {
                    "click": _vm.login
                }
            }, [_vm._v("登录")]), _c('a', {
                staticClass: ["reg-link", "mt30"],
                attrs: {
                    "href": "./register.js"
                }
            }, [_c('text', {
                staticStyle: {
                    textAlign: "center"
                }
            }, [_vm._v("没有账号？立即注册")])])], 1)])
        },staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["justify-center"]
            }, [_c('image', {
                staticClass: ["logo"],
                attrs: {
                    "src": "http://app1.mindai.com/images/logo.png"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["form-hd"]
            }, [_c('image', {
                staticClass: ["icon", "form-icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/icons-1_01.png"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["form-hd"]
            }, [_c('image', {
                staticClass: ["icon", "form-icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/icons-1_02.png"
                }
            })])
        }]}
        module.exports.render._withStripped = true

        /***/ }),
    /* 68 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cell-item"]
            }, [_c('text', {
                staticClass: ["story-score"]
            }, [_vm._v(_vm._s(_vm.story.score))]), _c('jump-web', {
                staticClass: ["story-link"],
                attrs: {
                    "url": _vm.story.url
                }
            }, [_c('text', {
                staticClass: ["story-title"]
            }, [_vm._v(_vm._s(_vm.story.title))]), (_vm.story.url) ? _c('text', {
                staticClass: ["small-text"]
            }, [_vm._v("(" + _vm._s(_vm._f("host")(_vm.story.url)) + ")")]) : _vm._e()]), _c('div', {
                staticClass: ["text-group"]
            }, [_c('text', {
                staticClass: ["small-text", "text-cell"]
            }, [_vm._v("by ")]), _c('div', {
                staticClass: ["text-cell"],
                on: {
                    "click": function($event) {
                        _vm.jump(("/user/" + (_vm.story.by)))
                    }
                }
            }, [_c('text', {
                staticClass: ["small-text", "link-text"]
            }, [_vm._v(_vm._s(_vm.story.by))])]), _c('text', {
                staticClass: ["small-text", "text-cell"]
            }, [_vm._v(" | " + _vm._s(_vm._f("timeAgo")(_vm.story.time)) + " ago")]), (!_vm.noComment) ? _c('text', {
                staticClass: ["small-text", "text-cell"]
            }, [_vm._v(" | ")]) : _vm._e(), (!_vm.noComment) ? _c('div', {
                staticClass: ["text-cell"],
                on: {
                    "click": function($event) {
                        _vm.jump(("/item/" + (_vm.story.id)))
                    }
                }
            }, [_c('text', {
                staticClass: ["small-text", "link-text"]
            }, [_vm._v(_vm._s(_vm.story.descendants) + " comments")])]) : _vm._e()])], 1)
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 69 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return (_vm.comment) ? _c('div', {
                class: _vm.className
            }, [(_vm.collapsed) ? _c('text', {
                staticClass: ["small-text", "comment-btn"],
                on: {
                    "click": function($event) {
                        _vm.toggle(false)
                    }
                }
            }, [_vm._v("[+]")]) : _c('text', {
                staticClass: ["small-text", "comment-btn"],
                on: {
                    "click": function($event) {
                        _vm.toggle(true)
                    }
                }
            }, [_vm._v("[-]")]), _c('div', {
                staticClass: ["text-group"],
                style: {
                    marginLeft: _vm.indent
                }
            }, [_c('text', {
                staticClass: ["text-cell", "small-text"]
            }, [_vm._v("by ")]), _c('div', {
                staticClass: ["text-cell"],
                on: {
                    "click": function($event) {
                        _vm.jump(("/user/" + (_vm.comment.by)))
                    }
                }
            }, [_c('text', {
                staticClass: ["small-text", "link"]
            }, [_vm._v(_vm._s(_vm.comment.by))])]), _c('text', {
                staticClass: ["text-cell", "small-text"]
            }, [_vm._v(" | " + _vm._s(_vm._f("timeAgo")(_vm.comment.time)) + " ago")]), _c('text', {
                staticClass: ["text-cell", "small-text"]
            }, [_vm._v(_vm._s(_vm.collapsed ? '  (collapsed)' : ''))])]), (!_vm.collapsed) ? _c('div', {
                staticClass: ["comment-inner"],
                style: {
                    marginLeft: _vm.indent
                }
            }, [_c('text', {
                staticClass: ["comment-title"]
            }, [_vm._v(_vm._s(_vm._f("unescape")(_vm.comment.text)))]), _c('div', {
                staticClass: ["comment-list"]
            }, _vm._l((_vm.comment.kids), function(id) {
                return _c('comment', {
                    key: id,
                    attrs: {
                        "id": id,
                        "depth": _vm.depth + 1
                    }
                })
            }))]) : _vm._e()]) : _vm._e()
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 70 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["stories-view"],
                appendAsTree: true,
                attrs: {
                    "append": "tree"
                }
            }, [_c('app-header'), _c('list', {
                staticClass: ["story-list"],
                attrs: {
                    "loadmoreoffset": "50"
                },
                on: {
                    "loadmore": _vm.loadMoreStories
                }
            }, _vm._l((_vm.stories), function(story) {
                return _c('cell', {
                    key: story.id,
                    staticClass: ["story-cell"],
                    appendAsTree: true,
                    attrs: {
                        "append": "tree"
                    }
                }, [_c('story', {
                    attrs: {
                        "story": story
                    }
                })], 1)
            })), (_vm.loading) ? _c('div', {
                staticClass: ["loading"]
            }, [_c('text', {
                staticClass: ["loading-text"]
            }, [_vm._v("loading ...")])]) : _vm._e()], 1)
        },staticRenderFns: []}
        module.exports.render._withStripped = true

        /***/ }),
    /* 71 */
    /***/ (function(module, exports) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["container"]
            }, [_vm._m(0), _c('a', {
                staticClass: ["cell-access", "justify-space"],
                attrs: {
                    "href": ""
                }
            }, [_c('div', {
                staticClass: ["cell-grow", "mr25"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/more2.png",
                    "resize": "contain"
                }
            })]), _c('div', {
                staticClass: ["cell"]
            }, [_c('text', {
                staticClass: ["text"]
            }, [_vm._v("帮助中心")])]), _c('div', {
                staticClass: ["text-right", "cell-grow"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])]), _c('jump-web', {
                staticClass: ["cell-access", "justify-space"],
                staticStyle: {
                    borderBottomWidth: "0"
                },
                attrs: {
                    "href": "",
                    "url": "https://www.baidu.com/"
                }
            }, [_c('div', {
                staticClass: ["cell-grow", "mr25"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/more3.png",
                    "resize": "contain"
                }
            })]), _c('div', {
                staticClass: ["cell"]
            }, [_c('text', {
                staticClass: ["text"]
            }, [_vm._v("联系我们")])]), _c('div', {
                staticClass: ["text-right", "cell-grow"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])]), _c('a', {
                staticClass: ["cell-access", "justify-space", "mt20"],
                attrs: {
                    "href": ""
                }
            }, [_c('div', {
                staticClass: ["cell-grow", "mr25"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/more4.png",
                    "resize": "contain"
                }
            })]), _c('div', {
                staticClass: ["cell"]
            }, [_c('text', {
                staticClass: ["text"]
            }, [_vm._v("平台介绍")])]), _c('div', {
                staticClass: ["text-right", "cell-grow"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])]), _c('a', {
                staticClass: ["cell-access", "justify-space"],
                attrs: {
                    "href": ""
                }
            }, [_c('div', {
                staticClass: ["cell-grow", "mr25"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/more5.png",
                    "resize": "contain"
                }
            })]), _c('div', {
                staticClass: ["cell"]
            }, [_c('text', {
                staticClass: ["text"]
            }, [_vm._v("安全保障")])]), _c('div', {
                staticClass: ["text-right", "cell-grow"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])]), _c('a', {
                staticClass: ["cell-access", "justify-space"],
                staticStyle: {
                    borderBottomWidth: "0"
                },
                attrs: {
                    "href": ""
                }
            }, [_c('div', {
                staticClass: ["cell-grow", "mr25"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/more6.png",
                    "resize": "contain"
                }
            })]), _c('div', {
                staticClass: ["cell"]
            }, [_c('text', {
                staticClass: ["text"]
            }, [_vm._v("服务协议")])]), _c('div', {
                staticClass: ["text-right", "cell-grow"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])]), _c('div', {
                staticClass: ["cell-access", "justify-space", "mt20"],
                on: {
                    "click": function($event) {
                        _vm.jump('/user/login')
                    }
                }
            }, [_vm._m(1), _vm._m(2), _vm._m(3)]), _c('div', {
                staticClass: ["cell-access", "justify-space"],
                on: {
                    "click": function($event) {
                        _vm.jump('/user/register')
                    }
                }
            }, [_vm._m(4), _vm._m(5), _vm._m(6)]), _c('AppTabBar')], 1)
        },staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cell-access", "justify-space"],
                staticStyle: {
                    paddingRight: "10px"
                }
            }, [_c('div', {
                staticClass: ["cell-grow", "mr25"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/more1.png",
                    "resize": "contain"
                }
            })]), _c('div', {
                staticClass: ["cell"]
            }, [_c('text', {
                staticClass: ["text"]
            }, [_vm._v("客服热线")])]), _c('div', {
                staticClass: ["cell"],
                staticStyle: {
                    textAlign: "right",
                    flex: "3"
                }
            }, [_c('text', {
                staticStyle: {
                    color: "#32c1d4",
                    fontSize: "36px",
                    marginTop: "4px",
                    marginBottom: "10px",
                    textAlign: "right"
                }
            }, [_vm._v("4008-726-799")]), _c('text', {
                staticStyle: {
                    fontSize: "24px",
                    color: "#888",
                    textAlign: "right"
                }
            }, [_vm._v("工作日09:00～21:00 节假日09:00～18:00")])])])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cell-grow", "mr25"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/more7.png",
                    "resize": "contain"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cell"]
            }, [_c('text', {
                staticClass: ["text"]
            }, [_vm._v("登录")])])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["text-right", "cell-grow"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cell-grow", "mr25"]
            }, [_c('image', {
                staticClass: ["icon"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/more8.png",
                    "resize": "contain"
                }
            })])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["cell"]
            }, [_c('text', {
                staticClass: ["text"]
            }, [_vm._v("注册")])])
        },function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: ["text-right", "cell-grow"]
            }, [_c('image', {
                staticClass: ["arrow-right"],
                attrs: {
                    "src": "http://192.168.2.113:1337/dist/images/rightArrow.png",
                    "resize": "contain"
                }
            })])
        }]}
        module.exports.render._withStripped = true

        /***/ }),
    /* 72 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
        function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        }

        module.exports = function(qs, sep, eq, options) {
            sep = sep || '&';
            eq = eq || '=';
            var obj = {};

            if (typeof qs !== 'string' || qs.length === 0) {
                return obj;
            }

            var regexp = /\+/g;
            qs = qs.split(sep);

            var maxKeys = 1000;
            if (options && typeof options.maxKeys === 'number') {
                maxKeys = options.maxKeys;
            }

            var len = qs.length;
            // maxKeys <= 0 means that we should not limit keys count
            if (maxKeys > 0 && len > maxKeys) {
                len = maxKeys;
            }

            for (var i = 0; i < len; ++i) {
                var x = qs[i].replace(regexp, '%20'),
                    idx = x.indexOf(eq),
                    kstr, vstr, k, v;

                if (idx >= 0) {
                    kstr = x.substr(0, idx);
                    vstr = x.substr(idx + 1);
                } else {
                    kstr = x;
                    vstr = '';
                }

                k = decodeURIComponent(kstr);
                v = decodeURIComponent(vstr);

                if (!hasOwnProperty(obj, k)) {
                    obj[k] = v;
                } else if (isArray(obj[k])) {
                    obj[k].push(v);
                } else {
                    obj[k] = [obj[k], v];
                }
            }

            return obj;
        };

        var isArray = Array.isArray || function (xs) {
                return Object.prototype.toString.call(xs) === '[object Array]';
            };


        /***/ }),
    /* 73 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



        var stringifyPrimitive = function(v) {
            switch (typeof v) {
                case 'string':
                    return v;

                case 'boolean':
                    return v ? 'true' : 'false';

                case 'number':
                    return isFinite(v) ? v : '';

                default:
                    return '';
            }
        };

        module.exports = function(obj, sep, eq, name) {
            sep = sep || '&';
            eq = eq || '=';
            if (obj === null) {
                obj = undefined;
            }

            if (typeof obj === 'object') {
                return map(objectKeys(obj), function(k) {
                    var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                    if (isArray(obj[k])) {
                        return map(obj[k], function(v) {
                            return ks + encodeURIComponent(stringifyPrimitive(v));
                        }).join(sep);
                    } else {
                        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                    }
                }).join(sep);

            }

            if (!name) return '';
            return encodeURIComponent(stringifyPrimitive(name)) + eq +
                encodeURIComponent(stringifyPrimitive(obj));
        };

        var isArray = Array.isArray || function (xs) {
                return Object.prototype.toString.call(xs) === '[object Array]';
            };

        function map (xs, f) {
            if (xs.map) return xs.map(f);
            var res = [];
            for (var i = 0; i < xs.length; i++) {
                res.push(f(xs[i], i));
            }
            return res;
        }

        var objectKeys = Object.keys || function (obj) {
                var res = [];
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
                }
                return res;
            };


        /***/ }),
    /* 74 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        exports.decode = exports.parse = __webpack_require__(72);
        exports.encode = exports.stringify = __webpack_require__(73);


        /***/ }),
    /* 75 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(49)
        )

        /* script */
        __vue_exports__ = __webpack_require__(17)

        /* template */
        var __vue_template__ = __webpack_require__(69)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\components\\comment.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 76 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(41)
        )

        /* script */
        __vue_exports__ = __webpack_require__(20)

        /* template */
        var __vue_template__ = __webpack_require__(60)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\Account.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 77 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(35)
        )

        /* script */
        __vue_exports__ = __webpack_require__(21)

        /* template */
        var __vue_template__ = __webpack_require__(53)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\ArticleView.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 78 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(44)
        )

        /* script */
        __vue_exports__ = __webpack_require__(22)

        /* template */
        var __vue_template__ = __webpack_require__(63)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\CommentView.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 79 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(37)
        )

        /* script */
        __vue_exports__ = __webpack_require__(23)

        /* template */
        var __vue_template__ = __webpack_require__(55)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\Index.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 80 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(51)
        )

        /* script */
        __vue_exports__ = __webpack_require__(24)

        /* template */
        var __vue_template__ = __webpack_require__(71)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\More.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 81 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(50)
        )

        /* script */
        __vue_exports__ = __webpack_require__(25)

        /* template */
        var __vue_template__ = __webpack_require__(70)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\StoriesView.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 82 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(34)
        )

        /* script */
        __vue_exports__ = __webpack_require__(26)

        /* template */
        var __vue_template__ = __webpack_require__(52)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\UserView.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 83 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(43)
        )

        /* script */
        __vue_exports__ = __webpack_require__(27)

        /* template */
        var __vue_template__ = __webpack_require__(62)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\account\\Cash.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 84 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(39)
        )

        /* script */
        __vue_exports__ = __webpack_require__(28)

        /* template */
        var __vue_template__ = __webpack_require__(57)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\account\\Invest.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 85 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(36)
        )

        /* script */
        __vue_exports__ = __webpack_require__(29)

        /* template */
        var __vue_template__ = __webpack_require__(54)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\account\\Recharge.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 86 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(45)
        )

        /* script */
        __vue_exports__ = __webpack_require__(30)

        /* template */
        var __vue_template__ = __webpack_require__(64)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\depositary\\Register.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 87 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(47)
        )

        /* script */
        __vue_exports__ = __webpack_require__(31)

        /* template */
        var __vue_template__ = __webpack_require__(67)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\user\\Login.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 88 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(38)
        )

        /* script */
        __vue_exports__ = __webpack_require__(32)

        /* template */
        var __vue_template__ = __webpack_require__(56)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\user\\Register.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 89 */
    /***/ (function(module, exports, __webpack_require__) {

        var __vue_exports__, __vue_options__
        var __vue_styles__ = []

        /* styles */
        __vue_styles__.push(__webpack_require__(46)
        )

        /* script */
        __vue_exports__ = __webpack_require__(33)

        /* template */
        var __vue_template__ = __webpack_require__(65)
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}
        if (
            typeof __vue_exports__.default === "object" ||
            typeof __vue_exports__.default === "function"
        ) {
            if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
            __vue_options__ = __vue_exports__ = __vue_exports__.default
        }
        if (typeof __vue_options__ === "function") {
            __vue_options__ = __vue_options__.options
        }
        __vue_options__.__file = "E:\\weex\\weex-hackernews\\src\\views\\web.vue"
        __vue_options__.render = __vue_template__.render
        __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
        __vue_options__.style = __vue_options__.style || {}
        __vue_styles__.forEach(function (module) {
            for (var name in module) {
                __vue_options__.style[name] = module[name]
            }
        })

        module.exports = __vue_exports__


        /***/ }),
    /* 90 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

        "use strict";
        /* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
            /**
             * vue-router v2.2.1
             * (c) 2017 Evan You
             * @license MIT
             */
            /*  */

            function assert (condition, message) {
                if (!condition) {
                    throw new Error(("[vue-router] " + message))
                }
            }

            function warn (condition, message) {
                if (!condition) {
                    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
                }
            }

            var View = {
                name: 'router-view',
                functional: true,
                props: {
                    name: {
                        type: String,
                        default: 'default'
                    }
                },
                render: function render (h, ref) {
                    var props = ref.props;
                    var children = ref.children;
                    var parent = ref.parent;
                    var data = ref.data;

                    data.routerView = true;

                    var name = props.name;
                    var route = parent.$route;
                    var cache = parent._routerViewCache || (parent._routerViewCache = {});

                    // determine current view depth, also check to see if the tree
                    // has been toggled inactive but kept-alive.
                    var depth = 0;
                    var inactive = false;
                    while (parent) {
                        if (parent.$vnode && parent.$vnode.data.routerView) {
                            depth++;
                        }
                        if (parent._inactive) {
                            inactive = true;
                        }
                        parent = parent.$parent;
                    }
                    data.routerViewDepth = depth;

                    // render previous view if the tree is inactive and kept-alive
                    if (inactive) {
                        return h(cache[name], data, children)
                    }

                    var matched = route.matched[depth];
                    // render empty node if no matched route
                    if (!matched) {
                        cache[name] = null;
                        return h()
                    }

                    var component = cache[name] = matched.components[name];

                    // inject instance registration hooks
                    var hooks = data.hook || (data.hook = {});
                    hooks.init = function (vnode) {
                        matched.instances[name] = vnode.child;
                    };
                    hooks.prepatch = function (oldVnode, vnode) {
                        matched.instances[name] = vnode.child;
                    };
                    hooks.destroy = function (vnode) {
                        if (matched.instances[name] === vnode.child) {
                            matched.instances[name] = undefined;
                        }
                    };

                    // resolve props
                    data.props = resolveProps(route, matched.props && matched.props[name]);

                    return h(component, data, children)
                }
            };

            function resolveProps (route, config) {
                switch (typeof config) {
                    case 'undefined':
                        return
                    case 'object':
                        return config
                    case 'function':
                        return config(route)
                    case 'boolean':
                        return config ? route.params : undefined
                    default:
                        warn(false, ("props in \"" + (route.path) + "\" is a " + (typeof config) + ", expecting an object, function or boolean."));
                }
            }

            /*  */

            var encodeReserveRE = /[!'()*]/g;
            var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
            var commaRE = /%2C/g;

// fixed encodeURIComponent which is more comformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
            var encode = function (str) { return encodeURIComponent(str)
                .replace(encodeReserveRE, encodeReserveReplacer)
                .replace(commaRE, ','); };

            var decode = decodeURIComponent;

            function resolveQuery (
                query,
                extraQuery
            ) {
                if ( extraQuery === void 0 ) extraQuery = {};

                if (query) {
                    var parsedQuery;
                    try {
                        parsedQuery = parseQuery(query);
                    } catch (e) {
                        process.env.NODE_ENV !== 'production' && warn(false, e.message);
                        parsedQuery = {};
                    }
                    for (var key in extraQuery) {
                        parsedQuery[key] = extraQuery[key];
                    }
                    return parsedQuery
                } else {
                    return extraQuery
                }
            }

            function parseQuery (query) {
                var res = {};

                query = query.trim().replace(/^(\?|#|&)/, '');

                if (!query) {
                    return res
                }

                query.split('&').forEach(function (param) {
                    var parts = param.replace(/\+/g, ' ').split('=');
                    var key = decode(parts.shift());
                    var val = parts.length > 0
                        ? decode(parts.join('='))
                        : null;

                    if (res[key] === undefined) {
                        res[key] = val;
                    } else if (Array.isArray(res[key])) {
                        res[key].push(val);
                    } else {
                        res[key] = [res[key], val];
                    }
                });

                return res
            }

            function stringifyQuery (obj) {
                var res = obj ? Object.keys(obj).map(function (key) {
                    var val = obj[key];

                    if (val === undefined) {
                        return ''
                    }

                    if (val === null) {
                        return encode(key)
                    }

                    if (Array.isArray(val)) {
                        var result = [];
                        val.slice().forEach(function (val2) {
                            if (val2 === undefined) {
                                return
                            }
                            if (val2 === null) {
                                result.push(encode(key));
                            } else {
                                result.push(encode(key) + '=' + encode(val2));
                            }
                        });
                        return result.join('&')
                    }

                    return encode(key) + '=' + encode(val)
                }).filter(function (x) { return x.length > 0; }).join('&') : null;
                return res ? ("?" + res) : ''
            }

            /*  */

            var trailingSlashRE = /\/?$/;

            function createRoute (
                record,
                location,
                redirectedFrom
            ) {
                var route = {
                    name: location.name || (record && record.name),
                    meta: (record && record.meta) || {},
                    path: location.path || '/',
                    hash: location.hash || '',
                    query: location.query || {},
                    params: location.params || {},
                    fullPath: getFullPath(location),
                    matched: record ? formatMatch(record) : []
                };
                if (redirectedFrom) {
                    route.redirectedFrom = getFullPath(redirectedFrom);
                }
                return Object.freeze(route)
            }

// the starting route that represents the initial state
            var START = createRoute(null, {
                path: '/'
            });

            function formatMatch (record) {
                var res = [];
                while (record) {
                    res.unshift(record);
                    record = record.parent;
                }
                return res
            }

            function getFullPath (ref) {
                var path = ref.path;
                var query = ref.query; if ( query === void 0 ) query = {};
                var hash = ref.hash; if ( hash === void 0 ) hash = '';

                return (path || '/') + stringifyQuery(query) + hash
            }

            function isSameRoute (a, b) {
                if (b === START) {
                    return a === b
                } else if (!b) {
                    return false
                } else if (a.path && b.path) {
                    return (
                        a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
                        a.hash === b.hash &&
                        isObjectEqual(a.query, b.query)
                    )
                } else if (a.name && b.name) {
                    return (
                        a.name === b.name &&
                        a.hash === b.hash &&
                        isObjectEqual(a.query, b.query) &&
                        isObjectEqual(a.params, b.params)
                    )
                } else {
                    return false
                }
            }

            function isObjectEqual (a, b) {
                if ( a === void 0 ) a = {};
                if ( b === void 0 ) b = {};

                var aKeys = Object.keys(a);
                var bKeys = Object.keys(b);
                if (aKeys.length !== bKeys.length) {
                    return false
                }
                return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
            }

            function isIncludedRoute (current, target) {
                return (
                    current.path.replace(trailingSlashRE, '/').indexOf(
                        target.path.replace(trailingSlashRE, '/')
                    ) === 0 &&
                    (!target.hash || current.hash === target.hash) &&
                    queryIncludes(current.query, target.query)
                )
            }

            function queryIncludes (current, target) {
                for (var key in target) {
                    if (!(key in current)) {
                        return false
                    }
                }
                return true
            }

            /*  */

// work around weird flow bug
            var toTypes = [String, Object];
            var eventTypes = [String, Array];

            var Link = {
                name: 'router-link',
                props: {
                    to: {
                        type: toTypes,
                        required: true
                    },
                    tag: {
                        type: String,
                        default: 'a'
                    },
                    exact: Boolean,
                    append: Boolean,
                    replace: Boolean,
                    activeClass: String,
                    event: {
                        type: eventTypes,
                        default: 'click'
                    }
                },
                render: function render (h) {
                    var this$1 = this;

                    var router = this.$router;
                    var current = this.$route;
                    var ref = router.resolve(this.to, current, this.append);
                    var location = ref.location;
                    var route = ref.route;
                    var href = ref.href;
                    var classes = {};
                    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active';
                    var compareTarget = location.path ? createRoute(null, location) : route;
                    classes[activeClass] = this.exact
                        ? isSameRoute(current, compareTarget)
                        : isIncludedRoute(current, compareTarget);

                    var handler = function (e) {
                        if (guardEvent(e)) {
                            if (this$1.replace) {
                                router.replace(location);
                            } else {
                                router.push(location);
                            }
                        }
                    };

                    var on = { click: guardEvent };
                    if (Array.isArray(this.event)) {
                        this.event.forEach(function (e) { on[e] = handler; });
                    } else {
                        on[this.event] = handler;
                    }

                    var data = {
                        class: classes
                    };

                    if (this.tag === 'a') {
                        data.on = on;
                        data.attrs = { href: href };
                    } else {
                        // find the first <a> child and apply listener and href
                        var a = findAnchor(this.$slots.default);
                        if (a) {
                            // in case the <a> is a static node
                            a.isStatic = false;
                            var extend = _Vue.util.extend;
                            var aData = a.data = extend({}, a.data);
                            aData.on = on;
                            var aAttrs = a.data.attrs = extend({}, a.data.attrs);
                            aAttrs.href = href;
                        } else {
                            // doesn't have <a> child, apply listener to self
                            data.on = on;
                        }
                    }

                    return h(this.tag, data, this.$slots.default)
                }
            };

            function guardEvent (e) {
                // don't redirect with control keys
                if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
                // don't redirect when preventDefault called
                if (e.defaultPrevented) { return }
                // don't redirect on right click
                if (e.button !== undefined && e.button !== 0) { return }
                // don't redirect if `target="_blank"`
                if (e.target && e.target.getAttribute) {
                    var target = e.target.getAttribute('target');
                    if (/\b_blank\b/i.test(target)) { return }
                }
                // this may be a Weex event which doesn't have this method
                if (e.preventDefault) {
                    e.preventDefault();
                }
                return true
            }

            function findAnchor (children) {
                if (children) {
                    var child;
                    for (var i = 0; i < children.length; i++) {
                        child = children[i];
                        if (child.tag === 'a') {
                            return child
                        }
                        if (child.children && (child = findAnchor(child.children))) {
                            return child
                        }
                    }
                }
            }

            var _Vue;

            function install (Vue) {
                if (install.installed) { return }
                install.installed = true;

                _Vue = Vue;

                Object.defineProperty(Vue.prototype, '$router', {
                    get: function get () { return this.$root._router }
                });

                Object.defineProperty(Vue.prototype, '$route', {
                    get: function get () { return this.$root._route }
                });

                Vue.mixin({
                    beforeCreate: function beforeCreate () {
                        if (this.$options.router) {
                            this._router = this.$options.router;
                            this._router.init(this);
                            Vue.util.defineReactive(this, '_route', this._router.history.current);
                        }
                    }
                });

                Vue.component('router-view', View);
                Vue.component('router-link', Link);

                var strats = Vue.config.optionMergeStrategies;
                // use the same hook merging strategy for route hooks
                strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
            }

            /*  */

            var inBrowser = typeof window !== 'undefined';

            /*  */

            function resolvePath (
                relative,
                base,
                append
            ) {
                if (relative.charAt(0) === '/') {
                    return relative
                }

                if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
                    return base + relative
                }

                var stack = base.split('/');

                // remove trailing segment if:
                // - not appending
                // - appending to trailing slash (last segment is empty)
                if (!append || !stack[stack.length - 1]) {
                    stack.pop();
                }

                // resolve relative path
                var segments = relative.replace(/^\//, '').split('/');
                for (var i = 0; i < segments.length; i++) {
                    var segment = segments[i];
                    if (segment === '.') {
                        continue
                    } else if (segment === '..') {
                        stack.pop();
                    } else {
                        stack.push(segment);
                    }
                }

                // ensure leading slash
                if (stack[0] !== '') {
                    stack.unshift('');
                }

                return stack.join('/')
            }

            function parsePath (path) {
                var hash = '';
                var query = '';

                var hashIndex = path.indexOf('#');
                if (hashIndex >= 0) {
                    hash = path.slice(hashIndex);
                    path = path.slice(0, hashIndex);
                }

                var queryIndex = path.indexOf('?');
                if (queryIndex >= 0) {
                    query = path.slice(queryIndex + 1);
                    path = path.slice(0, queryIndex);
                }

                return {
                    path: path,
                    query: query,
                    hash: hash
                }
            }

            function cleanPath (path) {
                return path.replace(/\/\//g, '/')
            }

            /*  */

            function createRouteMap (
                routes,
                oldPathMap,
                oldNameMap
            ) {
                var pathMap = oldPathMap || Object.create(null);
                var nameMap = oldNameMap || Object.create(null);

                routes.forEach(function (route) {
                    addRouteRecord(pathMap, nameMap, route);
                });

                return {
                    pathMap: pathMap,
                    nameMap: nameMap
                }
            }

            function addRouteRecord (
                pathMap,
                nameMap,
                route,
                parent,
                matchAs
            ) {
                var path = route.path;
                var name = route.name;
                if (process.env.NODE_ENV !== 'production') {
                    assert(path != null, "\"path\" is required in a route configuration.");
                    assert(
                        typeof route.component !== 'string',
                        "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
                        "string id. Use an actual component instead."
                    );
                }

                var record = {
                    path: normalizePath(path, parent),
                    components: route.components || { default: route.component },
                    instances: {},
                    name: name,
                    parent: parent,
                    matchAs: matchAs,
                    redirect: route.redirect,
                    beforeEnter: route.beforeEnter,
                    meta: route.meta || {},
                    props: route.props == null
                        ? {}
                        : route.components
                        ? route.props
                        : { default: route.props }
                };

                if (route.children) {
                    // Warn if route is named and has a default child route.
                    // If users navigate to this route by name, the default child will
                    // not be rendered (GH Issue #629)
                    if (process.env.NODE_ENV !== 'production') {
                        if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
                            warn(
                                false,
                                "Named Route '" + (route.name) + "' has a default child route. " +
                                "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
                                "the default child route will not be rendered. Remove the name from " +
                                "this route and use the name of the default child route for named " +
                                "links instead."
                            );
                        }
                    }
                    route.children.forEach(function (child) {
                        var childMatchAs = matchAs
                            ? cleanPath((matchAs + "/" + (child.path)))
                            : undefined;
                        addRouteRecord(pathMap, nameMap, child, record, childMatchAs);
                    });
                }

                if (route.alias !== undefined) {
                    if (Array.isArray(route.alias)) {
                        route.alias.forEach(function (alias) {
                            var aliasRoute = {
                                path: alias,
                                children: route.children
                            };
                            addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
                        });
                    } else {
                        var aliasRoute = {
                            path: route.alias,
                            children: route.children
                        };
                        addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
                    }
                }

                if (!pathMap[record.path]) {
                    pathMap[record.path] = record;
                }

                if (name) {
                    if (!nameMap[name]) {
                        nameMap[name] = record;
                    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
                        warn(
                            false,
                            "Duplicate named routes definition: " +
                            "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
                        );
                    }
                }
            }

            function normalizePath (path, parent) {
                path = path.replace(/\/$/, '');
                if (path[0] === '/') { return path }
                if (parent == null) { return path }
                return cleanPath(((parent.path) + "/" + path))
            }

            var index$1 = Array.isArray || function (arr) {
                    return Object.prototype.toString.call(arr) == '[object Array]';
                };

            var isarray = index$1;

            /**
             * Expose `pathToRegexp`.
             */
            var index = pathToRegexp;
            var parse_1 = parse;
            var compile_1 = compile;
            var tokensToFunction_1 = tokensToFunction;
            var tokensToRegExp_1 = tokensToRegExp;

            /**
             * The main path matching regexp utility.
             *
             * @type {RegExp}
             */
            var PATH_REGEXP = new RegExp([
                // Match escaped characters that would otherwise appear in future matches.
                // This allows the user to escape special characters that won't transform.
                '(\\\\.)',
                // Match Express-style parameters and un-named parameters with a prefix
                // and optional suffixes. Matches appear as:
                //
                // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
                // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
                // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
                '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
            ].join('|'), 'g');

            /**
             * Parse a string for the raw tokens.
             *
             * @param  {string}  str
             * @param  {Object=} options
             * @return {!Array}
             */
            function parse (str, options) {
                var tokens = [];
                var key = 0;
                var index = 0;
                var path = '';
                var defaultDelimiter = options && options.delimiter || '/';
                var res;

                while ((res = PATH_REGEXP.exec(str)) != null) {
                    var m = res[0];
                    var escaped = res[1];
                    var offset = res.index;
                    path += str.slice(index, offset);
                    index = offset + m.length;

                    // Ignore already escaped sequences.
                    if (escaped) {
                        path += escaped[1];
                        continue
                    }

                    var next = str[index];
                    var prefix = res[2];
                    var name = res[3];
                    var capture = res[4];
                    var group = res[5];
                    var modifier = res[6];
                    var asterisk = res[7];

                    // Push the current path onto the tokens.
                    if (path) {
                        tokens.push(path);
                        path = '';
                    }

                    var partial = prefix != null && next != null && next !== prefix;
                    var repeat = modifier === '+' || modifier === '*';
                    var optional = modifier === '?' || modifier === '*';
                    var delimiter = res[2] || defaultDelimiter;
                    var pattern = capture || group;

                    tokens.push({
                        name: name || key++,
                        prefix: prefix || '',
                        delimiter: delimiter,
                        optional: optional,
                        repeat: repeat,
                        partial: partial,
                        asterisk: !!asterisk,
                        pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
                    });
                }

                // Match any characters still remaining.
                if (index < str.length) {
                    path += str.substr(index);
                }

                // If the path exists, push it onto the end.
                if (path) {
                    tokens.push(path);
                }

                return tokens
            }

            /**
             * Compile a string to a template function for the path.
             *
             * @param  {string}             str
             * @param  {Object=}            options
             * @return {!function(Object=, Object=)}
             */
            function compile (str, options) {
                return tokensToFunction(parse(str, options))
            }

            /**
             * Prettier encoding of URI path segments.
             *
             * @param  {string}
             * @return {string}
             */
            function encodeURIComponentPretty (str) {
                return encodeURI(str).replace(/[\/?#]/g, function (c) {
                    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
                })
            }

            /**
             * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
             *
             * @param  {string}
             * @return {string}
             */
            function encodeAsterisk (str) {
                return encodeURI(str).replace(/[?#]/g, function (c) {
                    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
                })
            }

            /**
             * Expose a method for transforming tokens into the path function.
             */
            function tokensToFunction (tokens) {
                // Compile all the tokens into regexps.
                var matches = new Array(tokens.length);

                // Compile all the patterns before compilation.
                for (var i = 0; i < tokens.length; i++) {
                    if (typeof tokens[i] === 'object') {
                        matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
                    }
                }

                return function (obj, opts) {
                    var path = '';
                    var data = obj || {};
                    var options = opts || {};
                    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

                    for (var i = 0; i < tokens.length; i++) {
                        var token = tokens[i];

                        if (typeof token === 'string') {
                            path += token;

                            continue
                        }

                        var value = data[token.name];
                        var segment;

                        if (value == null) {
                            if (token.optional) {
                                // Prepend partial segment prefixes.
                                if (token.partial) {
                                    path += token.prefix;
                                }

                                continue
                            } else {
                                throw new TypeError('Expected "' + token.name + '" to be defined')
                            }
                        }

                        if (isarray(value)) {
                            if (!token.repeat) {
                                throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
                            }

                            if (value.length === 0) {
                                if (token.optional) {
                                    continue
                                } else {
                                    throw new TypeError('Expected "' + token.name + '" to not be empty')
                                }
                            }

                            for (var j = 0; j < value.length; j++) {
                                segment = encode(value[j]);

                                if (!matches[i].test(segment)) {
                                    throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
                                }

                                path += (j === 0 ? token.prefix : token.delimiter) + segment;
                            }

                            continue
                        }

                        segment = token.asterisk ? encodeAsterisk(value) : encode(value);

                        if (!matches[i].test(segment)) {
                            throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
                        }

                        path += token.prefix + segment;
                    }

                    return path
                }
            }

            /**
             * Escape a regular expression string.
             *
             * @param  {string} str
             * @return {string}
             */
            function escapeString (str) {
                return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
            }

            /**
             * Escape the capturing group by escaping special characters and meaning.
             *
             * @param  {string} group
             * @return {string}
             */
            function escapeGroup (group) {
                return group.replace(/([=!:$\/()])/g, '\\$1')
            }

            /**
             * Attach the keys as a property of the regexp.
             *
             * @param  {!RegExp} re
             * @param  {Array}   keys
             * @return {!RegExp}
             */
            function attachKeys (re, keys) {
                re.keys = keys;
                return re
            }

            /**
             * Get the flags for a regexp from the options.
             *
             * @param  {Object} options
             * @return {string}
             */
            function flags (options) {
                return options.sensitive ? '' : 'i'
            }

            /**
             * Pull out keys from a regexp.
             *
             * @param  {!RegExp} path
             * @param  {!Array}  keys
             * @return {!RegExp}
             */
            function regexpToRegexp (path, keys) {
                // Use a negative lookahead to match only capturing groups.
                var groups = path.source.match(/\((?!\?)/g);

                if (groups) {
                    for (var i = 0; i < groups.length; i++) {
                        keys.push({
                            name: i,
                            prefix: null,
                            delimiter: null,
                            optional: false,
                            repeat: false,
                            partial: false,
                            asterisk: false,
                            pattern: null
                        });
                    }
                }

                return attachKeys(path, keys)
            }

            /**
             * Transform an array into a regexp.
             *
             * @param  {!Array}  path
             * @param  {Array}   keys
             * @param  {!Object} options
             * @return {!RegExp}
             */
            function arrayToRegexp (path, keys, options) {
                var parts = [];

                for (var i = 0; i < path.length; i++) {
                    parts.push(pathToRegexp(path[i], keys, options).source);
                }

                var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

                return attachKeys(regexp, keys)
            }

            /**
             * Create a path regexp from string input.
             *
             * @param  {string}  path
             * @param  {!Array}  keys
             * @param  {!Object} options
             * @return {!RegExp}
             */
            function stringToRegexp (path, keys, options) {
                return tokensToRegExp(parse(path, options), keys, options)
            }

            /**
             * Expose a function for taking tokens and returning a RegExp.
             *
             * @param  {!Array}          tokens
             * @param  {(Array|Object)=} keys
             * @param  {Object=}         options
             * @return {!RegExp}
             */
            function tokensToRegExp (tokens, keys, options) {
                if (!isarray(keys)) {
                    options = /** @type {!Object} */ (keys || options);
                    keys = [];
                }

                options = options || {};

                var strict = options.strict;
                var end = options.end !== false;
                var route = '';

                // Iterate over the tokens and create our regexp string.
                for (var i = 0; i < tokens.length; i++) {
                    var token = tokens[i];

                    if (typeof token === 'string') {
                        route += escapeString(token);
                    } else {
                        var prefix = escapeString(token.prefix);
                        var capture = '(?:' + token.pattern + ')';

                        keys.push(token);

                        if (token.repeat) {
                            capture += '(?:' + prefix + capture + ')*';
                        }

                        if (token.optional) {
                            if (!token.partial) {
                                capture = '(?:' + prefix + '(' + capture + '))?';
                            } else {
                                capture = prefix + '(' + capture + ')?';
                            }
                        } else {
                            capture = prefix + '(' + capture + ')';
                        }

                        route += capture;
                    }
                }

                var delimiter = escapeString(options.delimiter || '/');
                var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

                // In non-strict mode we allow a slash at the end of match. If the path to
                // match already ends with a slash, we remove it for consistency. The slash
                // is valid at the end of a path match, not in the middle. This is important
                // in non-ending mode, where "/test/" shouldn't match "/test//route".
                if (!strict) {
                    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
                }

                if (end) {
                    route += '$';
                } else {
                    // In non-ending mode, we need the capturing groups to match as much as
                    // possible by using a positive lookahead to the end or next path segment.
                    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
                }

                return attachKeys(new RegExp('^' + route, flags(options)), keys)
            }

            /**
             * Normalize the given path string, returning a regular expression.
             *
             * An empty array can be passed in for the keys, which will hold the
             * placeholder key descriptions. For example, using `/user/:id`, `keys` will
             * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
             *
             * @param  {(string|RegExp|Array)} path
             * @param  {(Array|Object)=}       keys
             * @param  {Object=}               options
             * @return {!RegExp}
             */
            function pathToRegexp (path, keys, options) {
                if (!isarray(keys)) {
                    options = /** @type {!Object} */ (keys || options);
                    keys = [];
                }

                options = options || {};

                if (path instanceof RegExp) {
                    return regexpToRegexp(path, /** @type {!Array} */ (keys))
                }

                if (isarray(path)) {
                    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
                }

                return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
            }

            index.parse = parse_1;
            index.compile = compile_1;
            index.tokensToFunction = tokensToFunction_1;
            index.tokensToRegExp = tokensToRegExp_1;

            /*  */

            var regexpCache = Object.create(null);

            function getRouteRegex (path) {
                var hit = regexpCache[path];
                var keys, regexp;

                if (hit) {
                    keys = hit.keys;
                    regexp = hit.regexp;
                } else {
                    keys = [];
                    regexp = index(path, keys);
                    regexpCache[path] = { keys: keys, regexp: regexp };
                }

                return { keys: keys, regexp: regexp }
            }

            var regexpCompileCache = Object.create(null);

            function fillParams (
                path,
                params,
                routeMsg
            ) {
                try {
                    var filler =
                        regexpCompileCache[path] ||
                        (regexpCompileCache[path] = index.compile(path));
                    return filler(params || {}, { pretty: true })
                } catch (e) {
                    if (process.env.NODE_ENV !== 'production') {
                        warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
                    }
                    return ''
                }
            }

            /*  */

            function normalizeLocation (
                raw,
                current,
                append
            ) {
                var next = typeof raw === 'string' ? { path: raw } : raw;
                // named target
                if (next.name || next._normalized) {
                    return next
                }

                // relative params
                if (!next.path && next.params && current) {
                    next = assign({}, next);
                    next._normalized = true;
                    var params = assign(assign({}, current.params), next.params);
                    if (current.name) {
                        next.name = current.name;
                        next.params = params;
                    } else if (current.matched) {
                        var rawPath = current.matched[current.matched.length - 1].path;
                        next.path = fillParams(rawPath, params, ("path " + (current.path)));
                    } else if (process.env.NODE_ENV !== 'production') {
                        warn(false, "relative params navigation requires a current route.");
                    }
                    return next
                }

                var parsedPath = parsePath(next.path || '');
                var basePath = (current && current.path) || '/';
                var path = parsedPath.path
                    ? resolvePath(parsedPath.path, basePath, append || next.append)
                    : (current && current.path) || '/';
                var query = resolveQuery(parsedPath.query, next.query);
                var hash = next.hash || parsedPath.hash;
                if (hash && hash.charAt(0) !== '#') {
                    hash = "#" + hash;
                }

                return {
                    _normalized: true,
                    path: path,
                    query: query,
                    hash: hash
                }
            }

            function assign (a, b) {
                for (var key in b) {
                    a[key] = b[key];
                }
                return a
            }

            /*  */

            function createMatcher (routes) {
                var ref = createRouteMap(routes);
                var pathMap = ref.pathMap;
                var nameMap = ref.nameMap;

                function addRoutes (routes) {
                    createRouteMap(routes, pathMap, nameMap);
                }

                function match (
                    raw,
                    currentRoute,
                    redirectedFrom
                ) {
                    var location = normalizeLocation(raw, currentRoute);
                    var name = location.name;

                    if (name) {
                        var record = nameMap[name];
                        if (process.env.NODE_ENV !== 'production') {
                            warn(record, ("Route with name '" + name + "' does not exist"));
                        }
                        var paramNames = getRouteRegex(record.path).keys
                            .filter(function (key) { return !key.optional; })
                            .map(function (key) { return key.name; });

                        if (typeof location.params !== 'object') {
                            location.params = {};
                        }

                        if (currentRoute && typeof currentRoute.params === 'object') {
                            for (var key in currentRoute.params) {
                                if (!(key in location.params) && paramNames.indexOf(key) > -1) {
                                    location.params[key] = currentRoute.params[key];
                                }
                            }
                        }

                        if (record) {
                            location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
                            return _createRoute(record, location, redirectedFrom)
                        }
                    } else if (location.path) {
                        location.params = {};
                        for (var path in pathMap) {
                            if (matchRoute(path, location.params, location.path)) {
                                return _createRoute(pathMap[path], location, redirectedFrom)
                            }
                        }
                    }
                    // no match
                    return _createRoute(null, location)
                }

                function redirect (
                    record,
                    location
                ) {
                    var originalRedirect = record.redirect;
                    var redirect = typeof originalRedirect === 'function'
                        ? originalRedirect(createRoute(record, location))
                        : originalRedirect;

                    if (typeof redirect === 'string') {
                        redirect = { path: redirect };
                    }

                    if (!redirect || typeof redirect !== 'object') {
                        process.env.NODE_ENV !== 'production' && warn(
                            false, ("invalid redirect option: " + (JSON.stringify(redirect)))
                        );
                        return _createRoute(null, location)
                    }

                    var re = redirect;
                    var name = re.name;
                    var path = re.path;
                    var query = location.query;
                    var hash = location.hash;
                    var params = location.params;
                    query = re.hasOwnProperty('query') ? re.query : query;
                    hash = re.hasOwnProperty('hash') ? re.hash : hash;
                    params = re.hasOwnProperty('params') ? re.params : params;

                    if (name) {
                        // resolved named direct
                        var targetRecord = nameMap[name];
                        if (process.env.NODE_ENV !== 'production') {
                            assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
                        }
                        return match({
                            _normalized: true,
                            name: name,
                            query: query,
                            hash: hash,
                            params: params
                        }, undefined, location)
                    } else if (path) {
                        // 1. resolve relative redirect
                        var rawPath = resolveRecordPath(path, record);
                        // 2. resolve params
                        var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
                        // 3. rematch with existing query and hash
                        return match({
                            _normalized: true,
                            path: resolvedPath,
                            query: query,
                            hash: hash
                        }, undefined, location)
                    } else {
                        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
                        return _createRoute(null, location)
                    }
                }

                function alias (
                    record,
                    location,
                    matchAs
                ) {
                    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
                    var aliasedMatch = match({
                        _normalized: true,
                        path: aliasedPath
                    });
                    if (aliasedMatch) {
                        var matched = aliasedMatch.matched;
                        var aliasedRecord = matched[matched.length - 1];
                        location.params = aliasedMatch.params;
                        return _createRoute(aliasedRecord, location)
                    }
                    return _createRoute(null, location)
                }

                function _createRoute (
                    record,
                    location,
                    redirectedFrom
                ) {
                    if (record && record.redirect) {
                        return redirect(record, redirectedFrom || location)
                    }
                    if (record && record.matchAs) {
                        return alias(record, location, record.matchAs)
                    }
                    return createRoute(record, location, redirectedFrom)
                }

                return {
                    match: match,
                    addRoutes: addRoutes
                }
            }

            function matchRoute (
                path,
                params,
                pathname
            ) {
                var ref = getRouteRegex(path);
                var regexp = ref.regexp;
                var keys = ref.keys;
                var m = pathname.match(regexp);

                if (!m) {
                    return false
                } else if (!params) {
                    return true
                }

                for (var i = 1, len = m.length; i < len; ++i) {
                    var key = keys[i - 1];
                    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
                    if (key) { params[key.name] = val; }
                }

                return true
            }

            function resolveRecordPath (path, record) {
                return resolvePath(path, record.parent ? record.parent.path : '/', true)
            }

            /*  */


            var positionStore = Object.create(null);

            function setupScroll () {
                window.addEventListener('popstate', function (e) {
                    saveScrollPosition();
                    if (e.state && e.state.key) {
                        setStateKey(e.state.key);
                    }
                });
            }

            function handleScroll (
                router,
                to,
                from,
                isPop
            ) {
                if (!router.app) {
                    return
                }

                var behavior = router.options.scrollBehavior;
                if (!behavior) {
                    return
                }

                if (process.env.NODE_ENV !== 'production') {
                    assert(typeof behavior === 'function', "scrollBehavior must be a function");
                }

                // wait until re-render finishes before scrolling
                router.app.$nextTick(function () {
                    var position = getScrollPosition();
                    var shouldScroll = behavior(to, from, isPop ? position : null);
                    if (!shouldScroll) {
                        return
                    }
                    var isObject = typeof shouldScroll === 'object';
                    if (isObject && typeof shouldScroll.selector === 'string') {
                        var el = document.querySelector(shouldScroll.selector);
                        if (el) {
                            position = getElementPosition(el);
                        } else if (isValidPosition(shouldScroll)) {
                            position = normalizePosition(shouldScroll);
                        }
                    } else if (isObject && isValidPosition(shouldScroll)) {
                        position = normalizePosition(shouldScroll);
                    }

                    if (position) {
                        window.scrollTo(position.x, position.y);
                    }
                });
            }

            function saveScrollPosition () {
                var key = getStateKey();
                if (key) {
                    positionStore[key] = {
                        x: window.pageXOffset,
                        y: window.pageYOffset
                    };
                }
            }

            function getScrollPosition () {
                var key = getStateKey();
                if (key) {
                    return positionStore[key]
                }
            }

            function getElementPosition (el) {
                var docEl = document.documentElement;
                var docRect = docEl.getBoundingClientRect();
                var elRect = el.getBoundingClientRect();
                return {
                    x: elRect.left - docRect.left,
                    y: elRect.top - docRect.top
                }
            }

            function isValidPosition (obj) {
                return isNumber(obj.x) || isNumber(obj.y)
            }

            function normalizePosition (obj) {
                return {
                    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
                    y: isNumber(obj.y) ? obj.y : window.pageYOffset
                }
            }

            function isNumber (v) {
                return typeof v === 'number'
            }

            /*  */

            var supportsPushState = inBrowser && (function () {
                    var ua = window.navigator.userAgent;

                    if (
                        (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
                        ua.indexOf('Mobile Safari') !== -1 &&
                        ua.indexOf('Chrome') === -1 &&
                        ua.indexOf('Windows Phone') === -1
                    ) {
                        return false
                    }

                    return window.history && 'pushState' in window.history
                })();

// use User Timing api (if present) for more accurate key precision
            var Time = inBrowser && window.performance && window.performance.now
                ? window.performance
                : Date;

            var _key = genKey();

            function genKey () {
                return Time.now().toFixed(3)
            }

            function getStateKey () {
                return _key
            }

            function setStateKey (key) {
                _key = key;
            }

            function pushState (url, replace) {
                saveScrollPosition();
                // try...catch the pushState call to get around Safari
                // DOM Exception 18 where it limits to 100 pushState calls
                var history = window.history;
                try {
                    if (replace) {
                        history.replaceState({ key: _key }, '', url);
                    } else {
                        _key = genKey();
                        history.pushState({ key: _key }, '', url);
                    }
                } catch (e) {
                    window.location[replace ? 'replace' : 'assign'](url);
                }
            }

            function replaceState (url) {
                pushState(url, true);
            }

            /*  */

            function runQueue (queue, fn, cb) {
                var step = function (index) {
                    if (index >= queue.length) {
                        cb();
                    } else {
                        if (queue[index]) {
                            fn(queue[index], function () {
                                step(index + 1);
                            });
                        } else {
                            step(index + 1);
                        }
                    }
                };
                step(0);
            }

            /*  */


            var History = function History (router, base) {
                this.router = router;
                this.base = normalizeBase(base);
                // start with a route object that stands for "nowhere"
                this.current = START;
                this.pending = null;
                this.ready = false;
                this.readyCbs = [];
            };

            History.prototype.listen = function listen (cb) {
                this.cb = cb;
            };

            History.prototype.onReady = function onReady (cb) {
                if (this.ready) {
                    cb();
                } else {
                    this.readyCbs.push(cb);
                }
            };

            History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
                var this$1 = this;

                var route = this.router.match(location, this.current);
                this.confirmTransition(route, function () {
                    this$1.updateRoute(route);
                    onComplete && onComplete(route);
                    this$1.ensureURL();

                    // fire ready cbs once
                    if (!this$1.ready) {
                        this$1.ready = true;
                        this$1.readyCbs.forEach(function (cb) {
                            cb(route);
                        });
                    }
                }, onAbort);
            };

            History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
                var this$1 = this;

                var current = this.current;
                var abort = function () { onAbort && onAbort(); };
                if (
                    isSameRoute(route, current) &&
                    // in the case the route map has been dynamically appended to
                    route.matched.length === current.matched.length
                ) {
                    this.ensureURL();
                    return abort()
                }

                var ref = resolveQueue(this.current.matched, route.matched);
                var updated = ref.updated;
                var deactivated = ref.deactivated;
                var activated = ref.activated;

                var queue = [].concat(
                    // in-component leave guards
                    extractLeaveGuards(deactivated),
                    // global before hooks
                    this.router.beforeHooks,
                    // in-component update hooks
                    extractUpdateHooks(updated),
                    // in-config enter guards
                    activated.map(function (m) { return m.beforeEnter; }),
                    // async components
                    resolveAsyncComponents(activated)
                );

                this.pending = route;
                var iterator = function (hook, next) {
                    if (this$1.pending !== route) {
                        return abort()
                    }
                    hook(route, current, function (to) {
                        if (to === false) {
                            // next(false) -> abort navigation, ensure current URL
                            this$1.ensureURL(true);
                            abort();
                        } else if (typeof to === 'string' || typeof to === 'object') {
                            // next('/') or next({ path: '/' }) -> redirect
                            (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to);
                            abort();
                        } else {
                            // confirm transition and pass on the value
                            next(to);
                        }
                    });
                };

                runQueue(queue, iterator, function () {
                    var postEnterCbs = [];
                    var isValid = function () { return this$1.current === route; };
                    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
                    // wait until async components are resolved before
                    // extracting in-component enter guards
                    runQueue(enterGuards, iterator, function () {
                        if (this$1.pending !== route) {
                            return abort()
                        }
                        this$1.pending = null;
                        onComplete(route);
                        if (this$1.router.app) {
                            this$1.router.app.$nextTick(function () {
                                postEnterCbs.forEach(function (cb) { return cb(); });
                            });
                        }
                    });
                });
            };

            History.prototype.updateRoute = function updateRoute (route) {
                var prev = this.current;
                this.current = route;
                this.cb && this.cb(route);
                this.router.afterHooks.forEach(function (hook) {
                    hook && hook(route, prev);
                });
            };

            function normalizeBase (base) {
                if (!base) {
                    if (inBrowser) {
                        // respect <base> tag
                        var baseEl = document.querySelector('base');
                        base = (baseEl && baseEl.getAttribute('href')) || '/';
                    } else {
                        base = '/';
                    }
                }
                // make sure there's the starting slash
                if (base.charAt(0) !== '/') {
                    base = '/' + base;
                }
                // remove trailing slash
                return base.replace(/\/$/, '')
            }

            function resolveQueue (
                current,
                next
            ) {
                var i;
                var max = Math.max(current.length, next.length);
                for (i = 0; i < max; i++) {
                    if (current[i] !== next[i]) {
                        break
                    }
                }
                return {
                    updated: next.slice(0, i),
                    activated: next.slice(i),
                    deactivated: current.slice(i)
                }
            }

            function extractGuards (
                records,
                name,
                bind,
                reverse
            ) {
                var guards = flatMapComponents(records, function (def, instance, match, key) {
                    var guard = extractGuard(def, name);
                    if (guard) {
                        return Array.isArray(guard)
                            ? guard.map(function (guard) { return bind(guard, instance, match, key); })
                            : bind(guard, instance, match, key)
                    }
                });
                return flatten(reverse ? guards.reverse() : guards)
            }

            function extractGuard (
                def,
                key
            ) {
                if (typeof def !== 'function') {
                    // extend now so that global mixins are applied.
                    def = _Vue.extend(def);
                }
                return def.options[key]
            }

            function extractLeaveGuards (deactivated) {
                return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
            }

            function extractUpdateHooks (updated) {
                return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
            }

            function bindGuard (guard, instance) {
                return function boundRouteGuard () {
                    return guard.apply(instance, arguments)
                }
            }

            function extractEnterGuards (
                activated,
                cbs,
                isValid
            ) {
                return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
                    return bindEnterGuard(guard, match, key, cbs, isValid)
                })
            }

            function bindEnterGuard (
                guard,
                match,
                key,
                cbs,
                isValid
            ) {
                return function routeEnterGuard (to, from, next) {
                    return guard(to, from, function (cb) {
                        next(cb);
                        if (typeof cb === 'function') {
                            cbs.push(function () {
                                // #750
                                // if a router-view is wrapped with an out-in transition,
                                // the instance may not have been registered at this time.
                                // we will need to poll for registration until current route
                                // is no longer valid.
                                poll(cb, match.instances, key, isValid);
                            });
                        }
                    })
                }
            }

            function poll (
                cb, // somehow flow cannot infer this is a function
                instances,
                key,
                isValid
            ) {
                if (instances[key]) {
                    cb(instances[key]);
                } else if (isValid()) {
                    setTimeout(function () {
                        poll(cb, instances, key, isValid);
                    }, 16);
                }
            }

            function resolveAsyncComponents (matched) {
                return flatMapComponents(matched, function (def, _, match, key) {
                    // if it's a function and doesn't have Vue options attached,
                    // assume it's an async component resolve function.
                    // we are not using Vue's default async resolving mechanism because
                    // we want to halt the navigation until the incoming component has been
                    // resolved.
                    if (typeof def === 'function' && !def.options) {
                        return function (to, from, next) {
                            var resolve = once(function (resolvedDef) {
                                match.components[key] = resolvedDef;
                                next();
                            });

                            var reject = once(function (reason) {
                                warn(false, ("Failed to resolve async component " + key + ": " + reason));
                                next(false);
                            });

                            var res = def(resolve, reject);
                            if (res && typeof res.then === 'function') {
                                res.then(resolve, reject);
                            }
                        }
                    }
                })
            }

            function flatMapComponents (
                matched,
                fn
            ) {
                return flatten(matched.map(function (m) {
                    return Object.keys(m.components).map(function (key) { return fn(
                        m.components[key],
                        m.instances[key],
                        m, key
                    ); })
                }))
            }

            function flatten (arr) {
                return Array.prototype.concat.apply([], arr)
            }

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
            function once (fn) {
                var called = false;
                return function () {
                    if (called) { return }
                    called = true;
                    return fn.apply(this, arguments)
                }
            }

            /*  */


            var HTML5History = (function (History$$1) {
                function HTML5History (router, base) {
                    var this$1 = this;

                    History$$1.call(this, router, base);

                    var expectScroll = router.options.scrollBehavior;

                    if (expectScroll) {
                        setupScroll();
                    }

                    window.addEventListener('popstate', function (e) {
                        this$1.transitionTo(getLocation(this$1.base), function (route) {
                            if (expectScroll) {
                                handleScroll(router, route, this$1.current, true);
                            }
                        });
                    });
                }

                if ( History$$1 ) HTML5History.__proto__ = History$$1;
                HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
                HTML5History.prototype.constructor = HTML5History;

                HTML5History.prototype.go = function go (n) {
                    window.history.go(n);
                };

                HTML5History.prototype.push = function push (location, onComplete, onAbort) {
                    var this$1 = this;

                    this.transitionTo(location, function (route) {
                        pushState(cleanPath(this$1.base + route.fullPath));
                        handleScroll(this$1.router, route, this$1.current, false);
                        onComplete && onComplete(route);
                    }, onAbort);
                };

                HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
                    var this$1 = this;

                    this.transitionTo(location, function (route) {
                        replaceState(cleanPath(this$1.base + route.fullPath));
                        handleScroll(this$1.router, route, this$1.current, false);
                        onComplete && onComplete(route);
                    }, onAbort);
                };

                HTML5History.prototype.ensureURL = function ensureURL (push) {
                    if (getLocation(this.base) !== this.current.fullPath) {
                        var current = cleanPath(this.base + this.current.fullPath);
                        push ? pushState(current) : replaceState(current);
                    }
                };

                HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
                    return getLocation(this.base)
                };

                return HTML5History;
            }(History));

            function getLocation (base) {
                var path = window.location.pathname;
                if (base && path.indexOf(base) === 0) {
                    path = path.slice(base.length);
                }
                return (path || '/') + window.location.search + window.location.hash
            }

            /*  */


            var HashHistory = (function (History$$1) {
                function HashHistory (router, base, fallback) {
                    History$$1.call(this, router, base);
                    // check history fallback deeplinking
                    if (fallback && checkFallback(this.base)) {
                        return
                    }
                    ensureSlash();
                }

                if ( History$$1 ) HashHistory.__proto__ = History$$1;
                HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
                HashHistory.prototype.constructor = HashHistory;

                // this is delayed until the app mounts
                // to avoid the hashchange listener being fired too early
                HashHistory.prototype.setupListeners = function setupListeners () {
                    var this$1 = this;

                    window.addEventListener('hashchange', function () {
                        if (!ensureSlash()) {
                            return
                        }
                        this$1.transitionTo(getHash(), function (route) {
                            replaceHash(route.fullPath);
                        });
                    });
                };

                HashHistory.prototype.push = function push (location, onComplete, onAbort) {
                    this.transitionTo(location, function (route) {
                        pushHash(route.fullPath);
                        onComplete && onComplete(route);
                    }, onAbort);
                };

                HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
                    this.transitionTo(location, function (route) {
                        replaceHash(route.fullPath);
                        onComplete && onComplete(route);
                    }, onAbort);
                };

                HashHistory.prototype.go = function go (n) {
                    window.history.go(n);
                };

                HashHistory.prototype.ensureURL = function ensureURL (push) {
                    var current = this.current.fullPath;
                    if (getHash() !== current) {
                        push ? pushHash(current) : replaceHash(current);
                    }
                };

                HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
                    return getHash()
                };

                return HashHistory;
            }(History));

            function checkFallback (base) {
                var location = getLocation(base);
                if (!/^\/#/.test(location)) {
                    window.location.replace(
                        cleanPath(base + '/#' + location)
                    );
                    return true
                }
            }

            function ensureSlash () {
                var path = getHash();
                if (path.charAt(0) === '/') {
                    return true
                }
                replaceHash('/' + path);
                return false
            }

            function getHash () {
                // We can't use window.location.hash here because it's not
                // consistent across browsers - Firefox will pre-decode it!
                var href = window.location.href;
                var index = href.indexOf('#');
                return index === -1 ? '' : href.slice(index + 1)
            }

            function pushHash (path) {
                window.location.hash = path;
            }

            function replaceHash (path) {
                var i = window.location.href.indexOf('#');
                window.location.replace(
                    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
                );
            }

            /*  */


            var AbstractHistory = (function (History$$1) {
                function AbstractHistory (router, base) {
                    History$$1.call(this, router, base);
                    this.stack = [];
                    this.index = -1;
                }

                if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
                AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
                AbstractHistory.prototype.constructor = AbstractHistory;

                AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
                    var this$1 = this;

                    this.transitionTo(location, function (route) {
                        this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
                        this$1.index++;
                        onComplete && onComplete(route);
                    }, onAbort);
                };

                AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
                    var this$1 = this;

                    this.transitionTo(location, function (route) {
                        this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
                        onComplete && onComplete(route);
                    }, onAbort);
                };

                AbstractHistory.prototype.go = function go (n) {
                    var this$1 = this;

                    var targetIndex = this.index + n;
                    if (targetIndex < 0 || targetIndex >= this.stack.length) {
                        return
                    }
                    var route = this.stack[targetIndex];
                    this.confirmTransition(route, function () {
                        this$1.index = targetIndex;
                        this$1.updateRoute(route);
                    });
                };

                AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
                    var current = this.stack[this.stack.length - 1];
                    return current ? current.fullPath : '/'
                };

                AbstractHistory.prototype.ensureURL = function ensureURL () {
                    // noop
                };

                return AbstractHistory;
            }(History));

            /*  */

            var VueRouter = function VueRouter (options) {
                if ( options === void 0 ) options = {};

                this.app = null;
                this.apps = [];
                this.options = options;
                this.beforeHooks = [];
                this.afterHooks = [];
                this.matcher = createMatcher(options.routes || []);

                var mode = options.mode || 'hash';
                this.fallback = mode === 'history' && !supportsPushState;
                if (this.fallback) {
                    mode = 'hash';
                }
                if (!inBrowser) {
                    mode = 'abstract';
                }
                this.mode = mode;

                switch (mode) {
                    case 'history':
                        this.history = new HTML5History(this, options.base);
                        break
                    case 'hash':
                        this.history = new HashHistory(this, options.base, this.fallback);
                        break
                    case 'abstract':
                        this.history = new AbstractHistory(this, options.base);
                        break
                    default:
                        if (process.env.NODE_ENV !== 'production') {
                            assert(false, ("invalid mode: " + mode));
                        }
                }
            };

            var prototypeAccessors = { currentRoute: {} };

            VueRouter.prototype.match = function match (
                raw,
                current,
                redirectedFrom
            ) {
                return this.matcher.match(raw, current, redirectedFrom)
            };

            prototypeAccessors.currentRoute.get = function () {
                return this.history && this.history.current
            };

            VueRouter.prototype.init = function init (app /* Vue component instance */) {
                var this$1 = this;

                process.env.NODE_ENV !== 'production' && assert(
                    install.installed,
                    "not installed. Make sure to call `Vue.use(VueRouter)` " +
                    "before creating root instance."
                );

                this.apps.push(app);

                // main app already initialized.
                if (this.app) {
                    return
                }

                this.app = app;

                var history = this.history;

                if (history instanceof HTML5History) {
                    history.transitionTo(history.getCurrentLocation());
                } else if (history instanceof HashHistory) {
                    var setupHashListener = function () {
                        history.setupListeners();
                    };
                    history.transitionTo(
                        history.getCurrentLocation(),
                        setupHashListener,
                        setupHashListener
                    );
                }

                history.listen(function (route) {
                    this$1.apps.forEach(function (app) {
                        app._route = route;
                    });
                });
            };

            VueRouter.prototype.beforeEach = function beforeEach (fn) {
                this.beforeHooks.push(fn);
            };

            VueRouter.prototype.afterEach = function afterEach (fn) {
                this.afterHooks.push(fn);
            };

            VueRouter.prototype.onReady = function onReady (cb) {
                this.history.onReady(cb);
            };

            VueRouter.prototype.push = function push (location, onComplete, onAbort) {
                this.history.push(location, onComplete, onAbort);
            };

            VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
                this.history.replace(location, onComplete, onAbort);
            };

            VueRouter.prototype.go = function go (n) {
                this.history.go(n);
            };

            VueRouter.prototype.back = function back () {
                this.go(-1);
            };

            VueRouter.prototype.forward = function forward () {
                this.go(1);
            };

            VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
                var route = to
                    ? this.resolve(to).route
                    : this.currentRoute;
                if (!route) {
                    return []
                }
                return [].concat.apply([], route.matched.map(function (m) {
                    return Object.keys(m.components).map(function (key) {
                        return m.components[key]
                    })
                }))
            };

            VueRouter.prototype.resolve = function resolve (
                to,
                current,
                append
            ) {
                var location = normalizeLocation(to, current || this.history.current, append);
                var route = this.match(location, current);
                var fullPath = route.redirectedFrom || route.fullPath;
                var base = this.history.base;
                var href = createHref(base, fullPath, this.mode);
                return {
                    location: location,
                    route: route,
                    href: href,
                    // for backwards compat
                    normalizedTo: location,
                    resolved: route
                }
            };

            VueRouter.prototype.addRoutes = function addRoutes (routes) {
                this.matcher.addRoutes(routes);
                if (this.history.current !== START) {
                    this.history.transitionTo(this.history.getCurrentLocation());
                }
            };

            Object.defineProperties( VueRouter.prototype, prototypeAccessors );

            function createHref (base, fullPath, mode) {
                var path = mode === 'hash' ? '#' + fullPath : fullPath;
                return base ? cleanPath(base + '/' + path) : path
            }

            VueRouter.install = install;
            VueRouter.version = '2.2.1';

            if (inBrowser && window.Vue) {
                window.Vue.use(VueRouter);
            }

            /* harmony default export */ __webpack_exports__["default"] = VueRouter;

            /* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(14)))

        /***/ }),
    /* 91 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.FETCH_ACCOUNT = FETCH_ACCOUNT;

        var _fetch = __webpack_require__(1);

        function FETCH_ACCOUNT(_ref, _ref2) {
            var commit = _ref.commit,
                dispatch = _ref.dispatch,
                state = _ref.state;
            var sessionId = _ref2.sessionId;

            return (0, _fetch.fetchAccount)({ commit: commit, sessionId: sessionId }).then(function (account) {
                return commit("SET_ACCOUNT", { account: account });
            });
            // .then(() => dispatch(''))
        }

        /***/ }),
    /* 92 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _account = __webpack_require__(91);

        var account = _interopRequireWildcard(_account);

        var _invests = __webpack_require__(93);

        var invests = _interopRequireWildcard(_invests);

        var _projects = __webpack_require__(94);

        var projects = _interopRequireWildcard(_projects);

        var _fetch = __webpack_require__(1);

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

        var total = {
            LOGIN_ACTION: function LOGIN_ACTION(_ref, _ref2) {
                var commit = _ref.commit,
                    state = _ref.state;
                var userName = _ref2.userName,
                    password = _ref2.password;

                return (0, _fetch.fetch_login)({ commit: commit }, { userName: userName, password: password }).then(function (reslogin) {
                    return commit("SET_LOGIN_STATUS", { reslogin: reslogin });
                });
            }
        };

        var actions = Object.assign({}, total, account, invests, projects);

        exports.default = actions;

        /***/ }),
    /* 93 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.FETCH_INVESTLIST = FETCH_INVESTLIST;
        exports.TAB_INVESTLIST = TAB_INVESTLIST;
        exports.LOAD_MORE_INVESTLIST = LOAD_MORE_INVESTLIST;

        var _fetch = __webpack_require__(1);

        function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

        function FETCH_INVESTLIST(_ref, _ref2) {
            var commit = _ref.commit,
                dispatch = _ref.dispatch,
                state = _ref.state;

            _objectDestructuringEmpty(_ref2);

            return (0, _fetch.fetchInvest)({ commit: commit }).then(function (invests) {
                return commit("SET_INVESTLIST", { invests: invests });
            });
            // .then(() => dispatch(''))
        }

        function TAB_INVESTLIST(_ref3, _ref4) {
            var commit = _ref3.commit,
                dispatch = _ref3.dispatch,
                state = _ref3.state;
            var tab_cur = _ref4.tab_cur;

            commit('SET_ACTIVE_TAB', { tab_cur: tab_cur });
            return (0, _fetch.fetchInvest)({ commit: commit }).then(function (invests) {
                return commit("SET_INVESTLIST", { invests: invests });
            });
        }

        function LOAD_MORE_INVESTLIST(_ref5, _ref6) {
            var commit = _ref5.commit,
                dispatch = _ref5.dispatch,
                getters = _ref5.getters;
            var tab_cur = _ref6.tab_cur;

            return (0, _fetch.fetchInvest)({ commit: commit }).then(function (invests) {
                return commit("SET_INVESTLIST", { invests: invests, lists: getters.invests.list });
            });
        }

        /***/ }),
    /* 94 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.FETCH_PROJECTS = FETCH_PROJECTS;
        exports.LOAD_MORE_PROJECTS = LOAD_MORE_PROJECTS;

        var _fetch = __webpack_require__(1);

        function FETCH_PROJECTS(_ref, _ref2) {
            var commit = _ref.commit,
                dispatch = _ref.dispatch,
                state = _ref.state;
            var pageNum = _ref2.pageNum,
                pageSize = _ref2.pageSize;

            return (0, _fetch.fetchprojects)({ commit: commit }, { pageNum: pageNum, pageSize: pageSize }).then(function (projects) {
                return commit("SET_PROJECTSLIST", { projects: projects });
            });
            // .then(() => dispatch(''))
        }

        function LOAD_MORE_PROJECTS(_ref3, _ref4) {
            var commit = _ref3.commit,
                dispatch = _ref3.dispatch,
                getters = _ref3.getters;
            var pageNum = _ref4.pageNum,
                pageSize = _ref4.pageSize;

            return (0, _fetch.fetchprojects)({ commit: commit }, { pageNum: pageNum, pageSize: pageSize }).then(function (projects) {
                return commit("SET_PROJECTSLIST", { projects: projects, lists: getters.projects.list });
            });
        }

        /***/ }),
    /* 95 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.account = account;
        function account(state) {
            return state.login ? state.user.account : {};
        }

        /***/ }),
    /* 96 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _account = __webpack_require__(95);

        var account = _interopRequireWildcard(_account);

        var _invests = __webpack_require__(97);

        var invests = _interopRequireWildcard(_invests);

        var _projects = __webpack_require__(98);

        var projects = _interopRequireWildcard(_projects);

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

        var total = {
            clientHeight: function clientHeight(state) {
                return state.clientHeight;
            },
            loading: function loading(state) {
                return state.loading;
            },
            loginStatus: function loginStatus(state) {}
        };

        var getters = Object.assign({}, total, account, invests, projects);

        exports.default = getters;

        /***/ }),
    /* 97 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.invests = invests;
        exports.invest_tab_cur = invest_tab_cur;
        function invests(state) {
            return state.user.invests.lists;
        }

        function invest_tab_cur(state) {
            return state.user.invests.tab_cur;
        }

        /***/ }),
    /* 98 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.projects = projects;
        function projects(state) {
            return state.projects;
        }

        /***/ }),
    /* 99 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.SET_ACCOUNT = SET_ACCOUNT;
        function SET_ACCOUNT(state, _ref) {
            var account = _ref.account;

            if (account.code === '0000') {
                state.user.account = account.data;
                state.login = true;
            }
        }

        /***/ }),
    /* 100 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _account = __webpack_require__(99);

        var account = _interopRequireWildcard(_account);

        var _invests = __webpack_require__(101);

        var invests = _interopRequireWildcard(_invests);

        var _projects = __webpack_require__(102);

        var projects = _interopRequireWildcard(_projects);

        var _util = __webpack_require__(2);

        var _util2 = _interopRequireDefault(_util);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

        var total = {
            START_LOADING: function START_LOADING(state) {
                state.loading = true;
            },
            FINISH_LOADING: function FINISH_LOADING(state) {
                state.loading = false;
            },
            SET_LOGIN_STATUS: function SET_LOGIN_STATUS(state, _ref) {
                var reslogin = _ref.reslogin;

                if (reslogin.code === '0000') {
                    state.login = true;
                    state.sessionId = reslogin.data.sessionId;
                    _util2.default.setLocationStroage('sessionId', reslogin.data.sessionId);
                }
            }
        };

        var mutations = Object.assign({}, total, account, invests, projects);

        exports.default = mutations;

        /***/ }),
    /* 101 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.SET_INVESTLIST = SET_INVESTLIST;
        exports.SET_ACTIVE_TAB = SET_ACTIVE_TAB;
        function SET_INVESTLIST(state, _ref) {
            var invests = _ref.invests,
                lists = _ref.lists;

            if (lists) {
                console.log(state);
                state.user.invests.lists.list = state.user.invests.lists.list.concat(invests.list);
            } else {
                state.user.invests.lists = invests;
            }
        }

        function SET_ACTIVE_TAB(state, _ref2) {
            var tab_cur = _ref2.tab_cur;

            state.user.invests.tab_cur = tab_cur;
            state.user.invests.lists.list = [];
        }

        /***/ }),
    /* 102 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.SET_PROJECTSLIST = SET_PROJECTSLIST;
        function SET_PROJECTSLIST(state, _ref) {
            var projects = _ref.projects,
                lists = _ref.lists;

            console.log(projects);
            if (projects.code === '0000') {
                if (lists) {
                    state.projects.pageNum++;
                    state.projects.totalNum == projects.data.totalNum;
                    state.projects.totalPage == projects.data.totalPage;
                    state.projects.list = state.projects.list.concat(projects.data.list);
                } else {
                    state.projects.pageNum = 1;
                    state.projects.list = projects.data.list;
                    console.log(state.projects.list);
                }
            }
        }

        /***/ }),
    /* 103 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        /*
         CryptoJS v3.1.2
         code.google.com/p/crypto-js
         (c) 2009-2013 by Jeff Mott. All rights reserved.
         code.google.com/p/crypto-js/wiki/License
         */
        var CryptoJS = CryptoJS || function (e, m) {
                var p = {},
                    j = p.lib = {},
                    l = function l() {},
                    f = j.Base = {
                        extend: function extend(a) {
                            l.prototype = this;
                            var c = new l();
                            a && c.mixIn(a);
                            c.hasOwnProperty("init") || (c.init = function () {
                                c.$super.init.apply(this, arguments);
                            });
                            c.init.prototype = c;
                            c.$super = this;
                            return c;
                        },
                        create: function create() {
                            var a = this.extend();
                            a.init.apply(a, arguments);
                            return a;
                        },
                        init: function init() {},
                        mixIn: function mixIn(a) {
                            for (var c in a) {
                                a.hasOwnProperty(c) && (this[c] = a[c]);
                            }a.hasOwnProperty("toString") && (this.toString = a.toString);
                        },
                        clone: function clone() {
                            return this.init.prototype.extend(this);
                        }
                    },
                    n = j.WordArray = f.extend({
                        init: function init(a, c) {
                            a = this.words = a || [];
                            this.sigBytes = c != m ? c : 4 * a.length;
                        },
                        toString: function toString(a) {
                            return (a || h).stringify(this);
                        },
                        concat: function concat(a) {
                            var c = this.words,
                                q = a.words,
                                d = this.sigBytes;
                            a = a.sigBytes;
                            this.clamp();
                            if (d % 4) for (var b = 0; b < a; b++) {
                                c[d + b >>> 2] |= (q[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((d + b) % 4);
                            } else if (65535 < q.length) for (b = 0; b < a; b += 4) {
                                c[d + b >>> 2] = q[b >>> 2];
                            } else c.push.apply(c, q);
                            this.sigBytes += a;
                            return this;
                        },
                        clamp: function clamp() {
                            var a = this.words,
                                c = this.sigBytes;
                            a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4);
                            a.length = e.ceil(c / 4);
                        },
                        clone: function clone() {
                            var a = f.clone.call(this);
                            a.words = this.words.slice(0);
                            return a;
                        },
                        random: function random(a) {
                            for (var c = [], b = 0; b < a; b += 4) {
                                c.push(4294967296 * e.random() | 0);
                            }return new n.init(c, a);
                        }
                    }),
                    b = p.enc = {},
                    h = b.Hex = {
                        stringify: function stringify(a) {
                            var c = a.words;
                            a = a.sigBytes;
                            for (var b = [], d = 0; d < a; d++) {
                                var f = c[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                                b.push((f >>> 4).toString(16));
                                b.push((f & 15).toString(16));
                            }
                            return b.join("");
                        },
                        parse: function parse(a) {
                            for (var c = a.length, b = [], d = 0; d < c; d += 2) {
                                b[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
                            }return new n.init(b, c / 2);
                        }
                    },
                    g = b.Latin1 = {
                        stringify: function stringify(a) {
                            var c = a.words;
                            a = a.sigBytes;
                            for (var b = [], d = 0; d < a; d++) {
                                b.push(String.fromCharCode(c[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
                            }return b.join("");
                        },
                        parse: function parse(a) {
                            for (var c = a.length, b = [], d = 0; d < c; d++) {
                                b[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4);
                            }return new n.init(b, c);
                        }
                    },
                    r = b.Utf8 = {
                        stringify: function stringify(a) {
                            try {
                                return decodeURIComponent(escape(g.stringify(a)));
                            } catch (c) {
                                throw Error("Malformed UTF-8 data");
                            }
                        },
                        parse: function parse(a) {
                            return g.parse(unescape(encodeURIComponent(a)));
                        }
                    },
                    k = j.BufferedBlockAlgorithm = f.extend({
                        reset: function reset() {
                            this._data = new n.init();
                            this._nDataBytes = 0;
                        },
                        _append: function _append(a) {
                            "string" == typeof a && (a = r.parse(a));
                            this._data.concat(a);
                            this._nDataBytes += a.sigBytes;
                        },
                        _process: function _process(a) {
                            var c = this._data,
                                b = c.words,
                                d = c.sigBytes,
                                f = this.blockSize,
                                h = d / (4 * f),
                                h = a ? e.ceil(h) : e.max((h | 0) - this._minBufferSize, 0);
                            a = h * f;
                            d = e.min(4 * a, d);
                            if (a) {
                                for (var g = 0; g < a; g += f) {
                                    this._doProcessBlock(b, g);
                                }g = b.splice(0, a);
                                c.sigBytes -= d;
                            }
                            return new n.init(g, d);
                        },
                        clone: function clone() {
                            var a = f.clone.call(this);
                            a._data = this._data.clone();
                            return a;
                        },
                        _minBufferSize: 0
                    });
                j.Hasher = k.extend({
                    cfg: f.extend(),
                    init: function init(a) {
                        this.cfg = this.cfg.extend(a);
                        this.reset();
                    },
                    reset: function reset() {
                        k.reset.call(this);
                        this._doReset();
                    },
                    update: function update(a) {
                        this._append(a);
                        this._process();
                        return this;
                    },
                    finalize: function finalize(a) {
                        a && this._append(a);
                        return this._doFinalize();
                    },
                    blockSize: 16,
                    _createHelper: function _createHelper(a) {
                        return function (c, b) {
                            return new a.init(b).finalize(c);
                        };
                    },
                    _createHmacHelper: function _createHmacHelper(a) {
                        return function (b, f) {
                            return new s.HMAC.init(a, f).finalize(b);
                        };
                    }
                });
                var s = p.algo = {};
                return p;
            }(Math);
        (function () {
            var e = CryptoJS,
                m = e.lib,
                p = m.WordArray,
                j = m.Hasher,
                l = [],
                m = e.algo.SHA1 = j.extend({
                    _doReset: function _doReset() {
                        this._hash = new p.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
                    },
                    _doProcessBlock: function _doProcessBlock(f, n) {
                        for (var b = this._hash.words, h = b[0], g = b[1], e = b[2], k = b[3], j = b[4], a = 0; 80 > a; a++) {
                            if (16 > a) l[a] = f[n + a] | 0;else {
                                var c = l[a - 3] ^ l[a - 8] ^ l[a - 14] ^ l[a - 16];
                                l[a] = c << 1 | c >>> 31;
                            }
                            c = (h << 5 | h >>> 27) + j + l[a];
                            c = 20 > a ? c + ((g & e | ~g & k) + 1518500249) : 40 > a ? c + ((g ^ e ^ k) + 1859775393) : 60 > a ? c + ((g & e | g & k | e & k) - 1894007588) : c + ((g ^ e ^ k) - 899497514);
                            j = k;
                            k = e;
                            e = g << 30 | g >>> 2;
                            g = h;
                            h = c;
                        }
                        b[0] = b[0] + h | 0;
                        b[1] = b[1] + g | 0;
                        b[2] = b[2] + e | 0;
                        b[3] = b[3] + k | 0;
                        b[4] = b[4] + j | 0;
                    },
                    _doFinalize: function _doFinalize() {
                        var f = this._data,
                            e = f.words,
                            b = 8 * this._nDataBytes,
                            h = 8 * f.sigBytes;
                        e[h >>> 5] |= 128 << 24 - h % 32;
                        e[(h + 64 >>> 9 << 4) + 14] = Math.floor(b / 4294967296);
                        e[(h + 64 >>> 9 << 4) + 15] = b;
                        f.sigBytes = 4 * e.length;
                        this._process();
                        return this._hash;
                    },
                    clone: function clone() {
                        var e = j.clone.call(this);
                        e._hash = this._hash.clone();
                        return e;
                    }
                });
            e.SHA1 = j._createHelper(m);
            e.HmacSHA1 = j._createHmacHelper(m);
        })();

        /*
         CryptoJS v3.0.2
         code.google.com/p/crypto-js
         (c) 2009-2012 by Jeff Mott. All rights reserved.
         code.google.com/p/crypto-js/wiki/License
         */
        var CryptoJS = CryptoJS || function (p, h) {
                var i = {},
                    l = i.lib = {},
                    r = l.Base = function () {
                        function a() {}
                        return {
                            extend: function extend(e) {
                                a.prototype = this;
                                var c = new a();
                                e && c.mixIn(e);
                                c.$super = this;
                                return c;
                            },
                            create: function create() {
                                var a = this.extend();
                                a.init.apply(a, arguments);
                                return a;
                            },
                            init: function init() {},
                            mixIn: function mixIn(a) {
                                for (var c in a) {
                                    a.hasOwnProperty(c) && (this[c] = a[c]);
                                }a.hasOwnProperty("toString") && (this.toString = a.toString);
                            },
                            clone: function clone() {
                                return this.$super.extend(this);
                            }
                        };
                    }(),
                    o = l.WordArray = r.extend({
                        init: function init(a, e) {
                            a = this.words = a || [];
                            this.sigBytes = e != h ? e : 4 * a.length;
                        },
                        toString: function toString(a) {
                            return (a || s).stringify(this);
                        },
                        concat: function concat(a) {
                            var e = this.words,
                                c = a.words,
                                b = this.sigBytes,
                                a = a.sigBytes;
                            this.clamp();
                            if (b % 4) for (var d = 0; d < a; d++) {
                                e[b + d >>> 2] |= (c[d >>> 2] >>> 24 - 8 * (d % 4) & 255) << 24 - 8 * ((b + d) % 4);
                            } else if (65535 < c.length) for (d = 0; d < a; d += 4) {
                                e[b + d >>> 2] = c[d >>> 2];
                            } else e.push.apply(e, c);
                            this.sigBytes += a;
                            return this;
                        },
                        clamp: function clamp() {
                            var a = this.words,
                                e = this.sigBytes;
                            a[e >>> 2] &= 4294967295 << 32 - 8 * (e % 4);
                            a.length = p.ceil(e / 4);
                        },
                        clone: function clone() {
                            var a = r.clone.call(this);
                            a.words = this.words.slice(0);
                            return a;
                        },
                        random: function random(a) {
                            for (var e = [], c = 0; c < a; c += 4) {
                                e.push(4294967296 * p.random() | 0);
                            }return o.create(e, a);
                        }
                    }),
                    m = i.enc = {},
                    s = m.Hex = {
                        stringify: function stringify(a) {
                            for (var e = a.words, a = a.sigBytes, c = [], b = 0; b < a; b++) {
                                var d = e[b >>> 2] >>> 24 - 8 * (b % 4) & 255;
                                c.push((d >>> 4).toString(16));
                                c.push((d & 15).toString(16));
                            }
                            return c.join("");
                        },
                        parse: function parse(a) {
                            for (var e = a.length, c = [], b = 0; b < e; b += 2) {
                                c[b >>> 3] |= parseInt(a.substr(b, 2), 16) << 24 - 4 * (b % 8);
                            }return o.create(c, e / 2);
                        }
                    },
                    n = m.Latin1 = {
                        stringify: function stringify(a) {
                            for (var e = a.words, a = a.sigBytes, c = [], b = 0; b < a; b++) {
                                c.push(String.fromCharCode(e[b >>> 2] >>> 24 - 8 * (b % 4) & 255));
                            }return c.join("");
                        },
                        parse: function parse(a) {
                            for (var e = a.length, c = [], b = 0; b < e; b++) {
                                c[b >>> 2] |= (a.charCodeAt(b) & 255) << 24 - 8 * (b % 4);
                            }return o.create(c, e);
                        }
                    },
                    k = m.Utf8 = {
                        stringify: function stringify(a) {
                            try {
                                return decodeURIComponent(escape(n.stringify(a)));
                            } catch (e) {
                                throw Error("Malformed UTF-8 data");
                            }
                        },
                        parse: function parse(a) {
                            return n.parse(unescape(encodeURIComponent(a)));
                        }
                    },
                    f = l.BufferedBlockAlgorithm = r.extend({
                        reset: function reset() {
                            this._data = o.create();
                            this._nDataBytes = 0;
                        },
                        _append: function _append(a) {
                            "string" == typeof a && (a = k.parse(a));
                            this._data.concat(a);
                            this._nDataBytes += a.sigBytes;
                        },
                        _process: function _process(a) {
                            var e = this._data,
                                c = e.words,
                                b = e.sigBytes,
                                d = this.blockSize,
                                q = b / (4 * d),
                                q = a ? p.ceil(q) : p.max((q | 0) - this._minBufferSize, 0),
                                a = q * d,
                                b = p.min(4 * a, b);
                            if (a) {
                                for (var j = 0; j < a; j += d) {
                                    this._doProcessBlock(c, j);
                                }j = c.splice(0, a);
                                e.sigBytes -= b;
                            }
                            return o.create(j, b);
                        },
                        clone: function clone() {
                            var a = r.clone.call(this);
                            a._data = this._data.clone();
                            return a;
                        },
                        _minBufferSize: 0
                    });
                l.Hasher = f.extend({
                    init: function init() {
                        this.reset();
                    },
                    reset: function reset() {
                        f.reset.call(this);
                        this._doReset();
                    },
                    update: function update(a) {
                        this._append(a);
                        this._process();
                        return this;
                    },
                    finalize: function finalize(a) {
                        a && this._append(a);
                        this._doFinalize();
                        return this._hash;
                    },
                    clone: function clone() {
                        var a = f.clone.call(this);
                        a._hash = this._hash.clone();
                        return a;
                    },
                    blockSize: 16,
                    _createHelper: function _createHelper(a) {
                        return function (e, c) {
                            return a.create(c).finalize(e);
                        };
                    },
                    _createHmacHelper: function _createHmacHelper(a) {
                        return function (e, c) {
                            return g.HMAC.create(a, c).finalize(e);
                        };
                    }
                });
                var g = i.algo = {};
                return i;
            }(Math);
        (function () {
            var p = CryptoJS,
                h = p.lib.WordArray;
            p.enc.Base64 = {
                stringify: function stringify(i) {
                    var l = i.words,
                        h = i.sigBytes,
                        o = this._map;
                    i.clamp();
                    for (var i = [], m = 0; m < h; m += 3) {
                        for (var s = (l[m >>> 2] >>> 24 - 8 * (m % 4) & 255) << 16 | (l[m + 1 >>> 2] >>> 24 - 8 * ((m + 1) % 4) & 255) << 8 | l[m + 2 >>> 2] >>> 24 - 8 * ((m + 2) % 4) & 255, n = 0; 4 > n && m + 0.75 * n < h; n++) {
                            i.push(o.charAt(s >>> 6 * (3 - n) & 63));
                        }
                    }if (l = o.charAt(64)) for (; i.length % 4;) {
                        i.push(l);
                    }return i.join("");
                },
                parse: function parse(i) {
                    var i = i.replace(/\s/g, ""),
                        l = i.length,
                        r = this._map,
                        o = r.charAt(64);
                    o && (o = i.indexOf(o), -1 != o && (l = o));
                    for (var o = [], m = 0, s = 0; s < l; s++) {
                        if (s % 4) {
                            var n = r.indexOf(i.charAt(s - 1)) << 2 * (s % 4),
                                k = r.indexOf(i.charAt(s)) >>> 6 - 2 * (s % 4);
                            o[m >>> 2] |= (n | k) << 24 - 8 * (m % 4);
                            m++;
                        }
                    }return h.create(o, m);
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
            };
        })();
        (function (p) {
            function h(f, g, a, e, c, b, d) {
                f = f + (g & a | ~g & e) + c + d;
                return (f << b | f >>> 32 - b) + g;
            }

            function i(f, g, a, e, c, b, d) {
                f = f + (g & e | a & ~e) + c + d;
                return (f << b | f >>> 32 - b) + g;
            }

            function l(f, g, a, e, c, b, d) {
                f = f + (g ^ a ^ e) + c + d;
                return (f << b | f >>> 32 - b) + g;
            }

            function r(f, g, a, e, c, b, d) {
                f = f + (a ^ (g | ~e)) + c + d;
                return (f << b | f >>> 32 - b) + g;
            }
            var o = CryptoJS,
                m = o.lib,
                s = m.WordArray,
                m = m.Hasher,
                n = o.algo,
                k = [];
            (function () {
                for (var f = 0; 64 > f; f++) {
                    k[f] = 4294967296 * p.abs(p.sin(f + 1)) | 0;
                }
            })();
            n = n.MD5 = m.extend({
                _doReset: function _doReset() {
                    this._hash = s.create([1732584193, 4023233417, 2562383102, 271733878]);
                },
                _doProcessBlock: function _doProcessBlock(f, g) {
                    for (var a = 0; 16 > a; a++) {
                        var e = g + a,
                            c = f[e];
                        f[e] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
                    }
                    for (var e = this._hash.words, c = e[0], b = e[1], d = e[2], q = e[3], a = 0; 64 > a; a += 4) {
                        16 > a ? (c = h(c, b, d, q, f[g + a], 7, k[a]), q = h(q, c, b, d, f[g + a + 1], 12, k[a + 1]), d = h(d, q, c, b, f[g + a + 2], 17, k[a + 2]), b = h(b, d, q, c, f[g + a + 3], 22, k[a + 3])) : 32 > a ? (c = i(c, b, d, q, f[g + (a + 1) % 16], 5, k[a]), q = i(q, c, b, d, f[g + (a + 6) % 16], 9, k[a + 1]), d = i(d, q, c, b, f[g + (a + 11) % 16], 14, k[a + 2]), b = i(b, d, q, c, f[g + a % 16], 20, k[a + 3])) : 48 > a ? (c = l(c, b, d, q, f[g + (3 * a + 5) % 16], 4, k[a]), q = l(q, c, b, d, f[g + (3 * a + 8) % 16], 11, k[a + 1]), d = l(d, q, c, b, f[g + (3 * a + 11) % 16], 16, k[a + 2]), b = l(b, d, q, c, f[g + (3 * a + 14) % 16], 23, k[a + 3])) : (c = r(c, b, d, q, f[g + 3 * a % 16], 6, k[a]), q = r(q, c, b, d, f[g + (3 * a + 7) % 16], 10, k[a + 1]), d = r(d, q, c, b, f[g + (3 * a + 14) % 16], 15, k[a + 2]), b = r(b, d, q, c, f[g + (3 * a + 5) % 16], 21, k[a + 3]));
                    }e[0] = e[0] + c | 0;
                    e[1] = e[1] + b | 0;
                    e[2] = e[2] + d | 0;
                    e[3] = e[3] + q | 0;
                },
                _doFinalize: function _doFinalize() {
                    var f = this._data,
                        g = f.words,
                        a = 8 * this._nDataBytes,
                        e = 8 * f.sigBytes;
                    g[e >>> 5] |= 128 << 24 - e % 32;
                    g[(e + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
                    f.sigBytes = 4 * (g.length + 1);
                    this._process();
                    f = this._hash.words;
                    for (g = 0; 4 > g; g++) {
                        a = f[g], f[g] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
                    }
                }
            });
            o.MD5 = m._createHelper(n);
            o.HmacMD5 = m._createHmacHelper(n);
        })(Math);
        (function () {
            var p = CryptoJS,
                h = p.lib,
                i = h.Base,
                l = h.WordArray,
                h = p.algo,
                r = h.EvpKDF = i.extend({
                    cfg: i.extend({ keySize: 4, hasher: h.MD5, iterations: 1 }),
                    init: function init(i) {
                        this.cfg = this.cfg.extend(i);
                    },
                    compute: function compute(i, m) {
                        for (var h = this.cfg, n = h.hasher.create(), k = l.create(), f = k.words, g = h.keySize, h = h.iterations; f.length < g;) {
                            a && n.update(a);
                            var a = n.update(i).finalize(m);
                            n.reset();
                            for (var e = 1; e < h; e++) {
                                a = n.finalize(a), n.reset();
                            }k.concat(a);
                        }
                        k.sigBytes = 4 * g;
                        return k;
                    }
                });
            p.EvpKDF = function (i, l, h) {
                return r.create(h).compute(i, l);
            };
        })();
        CryptoJS.lib.Cipher || function (p) {
            var h = CryptoJS,
                i = h.lib,
                l = i.Base,
                r = i.WordArray,
                o = i.BufferedBlockAlgorithm,
                m = h.enc.Base64,
                s = h.algo.EvpKDF,
                n = i.Cipher = o.extend({
                    cfg: l.extend(),
                    createEncryptor: function createEncryptor(b, d) {
                        return this.create(this._ENC_XFORM_MODE, b, d);
                    },
                    createDecryptor: function createDecryptor(b, d) {
                        return this.create(this._DEC_XFORM_MODE, b, d);
                    },
                    init: function init(b, d, a) {
                        this.cfg = this.cfg.extend(a);
                        this._xformMode = b;
                        this._key = d;
                        this.reset();
                    },
                    reset: function reset() {
                        o.reset.call(this);
                        this._doReset();
                    },
                    process: function process(b) {
                        this._append(b);
                        return this._process();
                    },
                    finalize: function finalize(b) {
                        b && this._append(b);
                        return this._doFinalize();
                    },
                    keySize: 4,
                    ivSize: 4,
                    _ENC_XFORM_MODE: 1,
                    _DEC_XFORM_MODE: 2,
                    _createHelper: function () {
                        return function (b) {
                            return {
                                encrypt: function encrypt(a, q, j) {
                                    return ("string" == typeof q ? c : e).encrypt(b, a, q, j);
                                },
                                decrypt: function decrypt(a, q, j) {
                                    return ("string" == typeof q ? c : e).decrypt(b, a, q, j);
                                }
                            };
                        };
                    }()
                });
            i.StreamCipher = n.extend({
                _doFinalize: function _doFinalize() {
                    return this._process(!0);
                },
                blockSize: 1
            });
            var k = h.mode = {},
                f = i.BlockCipherMode = l.extend({
                    createEncryptor: function createEncryptor(b, a) {
                        return this.Encryptor.create(b, a);
                    },
                    createDecryptor: function createDecryptor(b, a) {
                        return this.Decryptor.create(b, a);
                    },
                    init: function init(b, a) {
                        this._cipher = b;
                        this._iv = a;
                    }
                }),
                k = k.CBC = function () {
                    function b(b, a, d) {
                        var c = this._iv;
                        c ? this._iv = p : c = this._prevBlock;
                        for (var e = 0; e < d; e++) {
                            b[a + e] ^= c[e];
                        }
                    }
                    var a = f.extend();
                    a.Encryptor = a.extend({
                        processBlock: function processBlock(a, d) {
                            var c = this._cipher,
                                e = c.blockSize;
                            b.call(this, a, d, e);
                            c.encryptBlock(a, d);
                            this._prevBlock = a.slice(d, d + e);
                        }
                    });
                    a.Decryptor = a.extend({
                        processBlock: function processBlock(a, d) {
                            var c = this._cipher,
                                e = c.blockSize,
                                f = a.slice(d, d + e);
                            c.decryptBlock(a, d);
                            b.call(this, a, d, e);
                            this._prevBlock = f;
                        }
                    });
                    return a;
                }(),
                g = (h.pad = {}).Pkcs7 = {
                    pad: function pad(b, a) {
                        for (var c = 4 * a, c = c - b.sigBytes % c, e = c << 24 | c << 16 | c << 8 | c, f = [], g = 0; g < c; g += 4) {
                            f.push(e);
                        }c = r.create(f, c);
                        b.concat(c);
                    },
                    unpad: function unpad(b) {
                        b.sigBytes -= b.words[b.sigBytes - 1 >>> 2] & 255;
                    }
                };
            i.BlockCipher = n.extend({
                cfg: n.cfg.extend({ mode: k, padding: g }),
                reset: function reset() {
                    n.reset.call(this);
                    var b = this.cfg,
                        a = b.iv,
                        b = b.mode;
                    if (this._xformMode == this._ENC_XFORM_MODE) var c = b.createEncryptor;else c = b.createDecryptor, this._minBufferSize = 1;
                    this._mode = c.call(b, this, a && a.words);
                },
                _doProcessBlock: function _doProcessBlock(b, a) {
                    this._mode.processBlock(b, a);
                },
                _doFinalize: function _doFinalize() {
                    var b = this.cfg.padding;
                    if (this._xformMode == this._ENC_XFORM_MODE) {
                        b.pad(this._data, this.blockSize);
                        var a = this._process(!0);
                    } else a = this._process(!0), b.unpad(a);
                    return a;
                },
                blockSize: 4
            });
            var a = i.CipherParams = l.extend({
                    init: function init(a) {
                        this.mixIn(a);
                    },
                    toString: function toString(a) {
                        return (a || this.formatter).stringify(this);
                    }
                }),
                k = (h.format = {}).OpenSSL = {
                    stringify: function stringify(a) {
                        var d = a.ciphertext,
                            a = a.salt,
                            d = (a ? r.create([1398893684, 1701076831]).concat(a).concat(d) : d).toString(m);
                        return d = d.replace(/(.{64})/g, "$1\n");
                    },
                    parse: function parse(b) {
                        var b = m.parse(b),
                            d = b.words;
                        if (1398893684 == d[0] && 1701076831 == d[1]) {
                            var c = r.create(d.slice(2, 4));
                            d.splice(0, 4);
                            b.sigBytes -= 16;
                        }
                        return a.create({ ciphertext: b, salt: c });
                    }
                },
                e = i.SerializableCipher = l.extend({
                    cfg: l.extend({ format: k }),
                    encrypt: function encrypt(b, d, c, e) {
                        var e = this.cfg.extend(e),
                            f = b.createEncryptor(c, e),
                            d = f.finalize(d),
                            f = f.cfg;
                        return a.create({
                            ciphertext: d,
                            key: c,
                            iv: f.iv,
                            algorithm: b,
                            mode: f.mode,
                            padding: f.padding,
                            blockSize: b.blockSize,
                            formatter: e.format
                        });
                    },
                    decrypt: function decrypt(a, c, e, f) {
                        f = this.cfg.extend(f);
                        c = this._parse(c, f.format);
                        return a.createDecryptor(e, f).finalize(c.ciphertext);
                    },
                    _parse: function _parse(a, c) {
                        return "string" == typeof a ? c.parse(a) : a;
                    }
                }),
                h = (h.kdf = {}).OpenSSL = {
                    compute: function compute(b, c, e, f) {
                        f || (f = r.random(8));
                        b = s.create({ keySize: c + e }).compute(b, f);
                        e = r.create(b.words.slice(c), 4 * e);
                        b.sigBytes = 4 * c;
                        return a.create({ key: b, iv: e, salt: f });
                    }
                },
                c = i.PasswordBasedCipher = e.extend({
                    cfg: e.cfg.extend({ kdf: h }),
                    encrypt: function encrypt(a, c, f, j) {
                        j = this.cfg.extend(j);
                        f = j.kdf.compute(f, a.keySize, a.ivSize);
                        j.iv = f.iv;
                        a = e.encrypt.call(this, a, c, f.key, j);
                        a.mixIn(f);
                        return a;
                    },
                    decrypt: function decrypt(a, c, f, j) {
                        j = this.cfg.extend(j);
                        c = this._parse(c, j.format);
                        f = j.kdf.compute(f, a.keySize, a.ivSize, c.salt);
                        j.iv = f.iv;
                        return e.decrypt.call(this, a, c, f.key, j);
                    }
                });
        }();
        (function () {
            var p = CryptoJS,
                h = p.lib.BlockCipher,
                i = p.algo,
                l = [],
                r = [],
                o = [],
                m = [],
                s = [],
                n = [],
                k = [],
                f = [],
                g = [],
                a = [];
            (function () {
                for (var c = [], b = 0; 256 > b; b++) {
                    c[b] = 128 > b ? b << 1 : b << 1 ^ 283;
                }for (var d = 0, e = 0, b = 0; 256 > b; b++) {
                    var j = e ^ e << 1 ^ e << 2 ^ e << 3 ^ e << 4,
                        j = j >>> 8 ^ j & 255 ^ 99;
                    l[d] = j;
                    r[j] = d;
                    var i = c[d],
                        h = c[i],
                        p = c[h],
                        t = 257 * c[j] ^ 16843008 * j;
                    o[d] = t << 24 | t >>> 8;
                    m[d] = t << 16 | t >>> 16;
                    s[d] = t << 8 | t >>> 24;
                    n[d] = t;
                    t = 16843009 * p ^ 65537 * h ^ 257 * i ^ 16843008 * d;
                    k[j] = t << 24 | t >>> 8;
                    f[j] = t << 16 | t >>> 16;
                    g[j] = t << 8 | t >>> 24;
                    a[j] = t;
                    d ? (d = i ^ c[c[c[p ^ i]]], e ^= c[c[e]]) : d = e = 1;
                }
            })();
            var e = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                i = i.AES = h.extend({
                    _doReset: function _doReset() {
                        for (var c = this._key, b = c.words, d = c.sigBytes / 4, c = 4 * ((this._nRounds = d + 6) + 1), i = this._keySchedule = [], j = 0; j < c; j++) {
                            if (j < d) i[j] = b[j];else {
                                var h = i[j - 1];
                                j % d ? 6 < d && 4 == j % d && (h = l[h >>> 24] << 24 | l[h >>> 16 & 255] << 16 | l[h >>> 8 & 255] << 8 | l[h & 255]) : (h = h << 8 | h >>> 24, h = l[h >>> 24] << 24 | l[h >>> 16 & 255] << 16 | l[h >>> 8 & 255] << 8 | l[h & 255], h ^= e[j / d | 0] << 24);
                                i[j] = i[j - d] ^ h;
                            }
                        }b = this._invKeySchedule = [];
                        for (d = 0; d < c; d++) {
                            j = c - d, h = d % 4 ? i[j] : i[j - 4], b[d] = 4 > d || 4 >= j ? h : k[l[h >>> 24]] ^ f[l[h >>> 16 & 255]] ^ g[l[h >>> 8 & 255]] ^ a[l[h & 255]];
                        }
                    },
                    encryptBlock: function encryptBlock(a, b) {
                        this._doCryptBlock(a, b, this._keySchedule, o, m, s, n, l);
                    },
                    decryptBlock: function decryptBlock(c, b) {
                        var d = c[b + 1];
                        c[b + 1] = c[b + 3];
                        c[b + 3] = d;
                        this._doCryptBlock(c, b, this._invKeySchedule, k, f, g, a, r);
                        d = c[b + 1];
                        c[b + 1] = c[b + 3];
                        c[b + 3] = d;
                    },
                    _doCryptBlock: function _doCryptBlock(a, b, d, e, f, h, i, g) {
                        for (var l = this._nRounds, k = a[b] ^ d[0], m = a[b + 1] ^ d[1], o = a[b + 2] ^ d[2], n = a[b + 3] ^ d[3], p = 4, r = 1; r < l; r++) {
                            var s = e[k >>> 24] ^ f[m >>> 16 & 255] ^ h[o >>> 8 & 255] ^ i[n & 255] ^ d[p++],
                                u = e[m >>> 24] ^ f[o >>> 16 & 255] ^ h[n >>> 8 & 255] ^ i[k & 255] ^ d[p++],
                                v = e[o >>> 24] ^ f[n >>> 16 & 255] ^ h[k >>> 8 & 255] ^ i[m & 255] ^ d[p++],
                                n = e[n >>> 24] ^ f[k >>> 16 & 255] ^ h[m >>> 8 & 255] ^ i[o & 255] ^ d[p++],
                                k = s,
                                m = u,
                                o = v;
                        }s = (g[k >>> 24] << 24 | g[m >>> 16 & 255] << 16 | g[o >>> 8 & 255] << 8 | g[n & 255]) ^ d[p++];
                        u = (g[m >>> 24] << 24 | g[o >>> 16 & 255] << 16 | g[n >>> 8 & 255] << 8 | g[k & 255]) ^ d[p++];
                        v = (g[o >>> 24] << 24 | g[n >>> 16 & 255] << 16 | g[k >>> 8 & 255] << 8 | g[m & 255]) ^ d[p++];
                        n = (g[n >>> 24] << 24 | g[k >>> 16 & 255] << 16 | g[m >>> 8 & 255] << 8 | g[o & 255]) ^ d[p++];
                        a[b] = s;
                        a[b + 1] = u;
                        a[b + 2] = v;
                        a[b + 3] = n;
                    },
                    keySize: 8
                });
            p.AES = h._createHelper(i);
        })();
        module.exports = CryptoJS;

        /***/ }),
    /* 104 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var _App = __webpack_require__(9);

        var _App2 = _interopRequireDefault(_App);

        var _router = __webpack_require__(13);

        var _router2 = _interopRequireDefault(_router);

        var _store = __webpack_require__(6);

        var _store2 = _interopRequireDefault(_store);

        var _vuexRouterSync = __webpack_require__(10);

        var _filters = __webpack_require__(11);

        var filters = _interopRequireWildcard(_filters);

        var _mixins = __webpack_require__(12);

        var _mixins2 = _interopRequireDefault(_mixins);

        function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// sync the router with the vuex store.
// this registers `store.state.route`
// import Vue from 'vue'
        (0, _vuexRouterSync.sync)(_store2.default, _router2.default);

// register global utility filters.
        Object.keys(filters).forEach(function (key) {
            Vue.filter(key, filters[key]);
        });

// register global mixins.
        Vue.mixin(_mixins2.default);

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
        new Vue(Vue.util.extend({ el: '#root', router: _router2.default, store: _store2.default }, _App2.default));

//路由拦截器
        _router2.default.beforeEach(function (to, from, next) {
            console.log(from);
            next();
        });
        _router2.default.push('/');

        /***/ })
    /******/ ]);