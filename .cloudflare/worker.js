var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .svelte-kit/output/server/chunks/utils.js
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
function fallback(value, fallback2, lazy = false) {
  return value === void 0 ? lazy ? (
    /** @type {() => V} */
    fallback2()
  ) : (
    /** @type {V} */
    fallback2
  ) : value;
}
var is_array, index_of, array_from, define_property, get_descriptor, object_prototype, array_prototype, get_prototype_of, is_extensible, noop;
var init_utils = __esm({
  ".svelte-kit/output/server/chunks/utils.js"() {
    is_array = Array.isArray;
    index_of = Array.prototype.indexOf;
    array_from = Array.from;
    define_property = Object.defineProperty;
    get_descriptor = Object.getOwnPropertyDescriptor;
    object_prototype = Object.prototype;
    array_prototype = Array.prototype;
    get_prototype_of = Object.getPrototypeOf;
    is_extensible = Object.isExtensible;
    noop = () => {
    };
  }
});

// .svelte-kit/output/server/chunks/equality.js
function equals(value) {
  return value === this.v;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}
var init_equality = __esm({
  ".svelte-kit/output/server/chunks/equality.js"() {
  }
});

// .svelte-kit/output/server/chunks/index2.js
function lifecycle_outside_component(name) {
  {
    throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
  }
}
function is_void(name) {
  return VOID_ELEMENT_NAMES.includes(name) || name.toLowerCase() === "!doctype";
}
function is_boolean_attribute(name) {
  return DOM_BOOLEAN_ATTRIBUTES.includes(name);
}
function is_passive_event(name) {
  return PASSIVE_EVENTS.includes(name);
}
function is_raw_text_element(name) {
  return RAW_TEXT_ELEMENTS.includes(
    /** @type {RAW_TEXT_ELEMENTS[number]} */
    name
  );
}
function escape_html(value, is_attr) {
  const str = String(value ?? "");
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx$1() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean) return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
function clsx(value) {
  if (typeof value === "object") {
    return clsx$1(value);
  } else {
    return value ?? "";
  }
}
function to_class(value, hash2, directives) {
  var classname = value == null ? "" : "" + value;
  if (directives) {
    for (var key2 in directives) {
      if (directives[key2]) {
        classname = classname ? classname + " " + key2 : key2;
      } else if (classname.length) {
        var len = key2.length;
        var a = 0;
        while ((a = classname.indexOf(key2, a)) >= 0) {
          var b = a + len;
          if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
            classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
          } else {
            a = b;
          }
        }
      }
    }
  }
  return classname === "" ? null : classname;
}
function to_style(value, styles) {
  return value == null ? null : String(value);
}
function getContext(key2) {
  const context_map = get_or_init_context_map();
  const result = (
    /** @type {T} */
    context_map.get(key2)
  );
  return result;
}
function setContext(key2, context2) {
  get_or_init_context_map().set(key2, context2);
  return context2;
}
function get_or_init_context_map(name) {
  if (current_component === null) {
    lifecycle_outside_component();
  }
  return current_component.c ??= new Map(get_parent_context(current_component) || void 0);
}
function push(fn) {
  current_component = { p: current_component, c: null, d: null };
}
function pop() {
  var component8 = (
    /** @type {Component} */
    current_component
  );
  var ondestroy = component8.d;
  if (ondestroy) {
    on_destroy.push(...ondestroy);
  }
  current_component = component8.p;
}
function get_parent_context(component_context2) {
  let parent = component_context2.p;
  while (parent !== null) {
    const context_map = parent.c;
    if (context_map !== null) {
      return context_map;
    }
    parent = parent.p;
  }
  return null;
}
function element(payload, tag, attributes_fn = noop, children_fn = noop) {
  payload.out += "<!---->";
  if (tag) {
    payload.out += `<${tag}`;
    attributes_fn();
    payload.out += `>`;
    if (!is_void(tag)) {
      children_fn();
      if (!is_raw_text_element(tag)) {
        payload.out += EMPTY_COMMENT;
      }
      payload.out += `</${tag}>`;
    }
  }
  payload.out += "<!---->";
}
function props_id_generator(prefix) {
  let uid = 1;
  return () => `${prefix}s${uid++}`;
}
function render(component8, options2 = {}) {
  const uid = props_id_generator(options2.idPrefix ? options2.idPrefix + "-" : "");
  const payload = {
    out: "",
    css: /* @__PURE__ */ new Set(),
    head: { title: "", out: "", css: /* @__PURE__ */ new Set(), uid },
    uid
  };
  const prev_on_destroy = on_destroy;
  on_destroy = [];
  payload.out += BLOCK_OPEN;
  if (options2.context) {
    push();
    current_component.c = options2.context;
  }
  component8(payload, options2.props ?? {}, {}, {});
  if (options2.context) {
    pop();
  }
  payload.out += BLOCK_CLOSE;
  for (const cleanup of on_destroy) cleanup();
  on_destroy = prev_on_destroy;
  let head2 = payload.head.out + payload.head.title;
  for (const { hash: hash2, code } of payload.css) {
    head2 += `<style id="${hash2}">${code}</style>`;
  }
  return {
    head: head2,
    html: payload.out,
    body: payload.out
  };
}
function head(payload, fn) {
  const head_payload = payload.head;
  head_payload.out += BLOCK_OPEN;
  fn(head_payload);
  head_payload.out += BLOCK_CLOSE;
}
function spread_attributes(attrs, css_hash, classes, styles, flags = 0) {
  if (attrs.class) {
    attrs.class = clsx(attrs.class);
  }
  let attr_str = "";
  let name;
  const is_html = (flags & ELEMENT_IS_NAMESPACED) === 0;
  const lowercase = (flags & ELEMENT_PRESERVE_ATTRIBUTE_CASE) === 0;
  for (name in attrs) {
    if (typeof attrs[name] === "function") continue;
    if (name[0] === "$" && name[1] === "$") continue;
    if (INVALID_ATTR_NAME_CHAR_REGEX.test(name)) continue;
    var value = attrs[name];
    if (lowercase) {
      name = name.toLowerCase();
    }
    attr_str += attr(name, value, is_html && is_boolean_attribute(name));
  }
  return attr_str;
}
function spread_props(props) {
  const merged_props = {};
  let key2;
  for (let i = 0; i < props.length; i++) {
    const obj = props[i];
    for (key2 in obj) {
      const desc = Object.getOwnPropertyDescriptor(obj, key2);
      if (desc) {
        Object.defineProperty(merged_props, key2, desc);
      } else {
        merged_props[key2] = obj[key2];
      }
    }
  }
  return merged_props;
}
function stringify(value) {
  return typeof value === "string" ? value : value == null ? "" : value + "";
}
function attr_class(value, hash2, directives) {
  var result = to_class(value, hash2, directives);
  return result ? ` class="${escape_html(result, true)}"` : "";
}
function attr_style(value, directives) {
  var result = to_style(value);
  return result ? ` style="${escape_html(result, true)}"` : "";
}
function bind_props(props_parent, props_now) {
  for (const key2 in props_now) {
    const initial_value = props_parent[key2];
    const value = props_now[key2];
    if (initial_value === void 0 && value !== void 0 && Object.getOwnPropertyDescriptor(props_parent, key2)?.set) {
      props_parent[key2] = value;
    }
  }
}
function ensure_array_like(array_like_or_iterator) {
  if (array_like_or_iterator) {
    return array_like_or_iterator.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }
  return [];
}
var HYDRATION_START, HYDRATION_END, HYDRATION_ERROR, ELEMENT_IS_NAMESPACED, ELEMENT_PRESERVE_ATTRIBUTE_CASE, UNINITIALIZED, VOID_ELEMENT_NAMES, DOM_BOOLEAN_ATTRIBUTES, PASSIVE_EVENTS, RAW_TEXT_ELEMENTS, ATTR_REGEX, CONTENT_REGEX, replacements, whitespace, current_component, BLOCK_OPEN, BLOCK_CLOSE, EMPTY_COMMENT, INVALID_ATTR_NAME_CHAR_REGEX, on_destroy;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    init_utils();
    HYDRATION_START = "[";
    HYDRATION_END = "]";
    HYDRATION_ERROR = {};
    ELEMENT_IS_NAMESPACED = 1;
    ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
    UNINITIALIZED = Symbol();
    VOID_ELEMENT_NAMES = [
      "area",
      "base",
      "br",
      "col",
      "command",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr"
    ];
    DOM_BOOLEAN_ATTRIBUTES = [
      "allowfullscreen",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "disabled",
      "formnovalidate",
      "hidden",
      "indeterminate",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "seamless",
      "selected",
      "webkitdirectory",
      "defer",
      "disablepictureinpicture",
      "disableremoteplayback"
    ];
    PASSIVE_EVENTS = ["touchstart", "touchmove"];
    RAW_TEXT_ELEMENTS = /** @type {const} */
    ["textarea", "script", "style", "title"];
    ATTR_REGEX = /[&"<]/g;
    CONTENT_REGEX = /[&<]/g;
    replacements = {
      translate: /* @__PURE__ */ new Map([
        [true, "yes"],
        [false, "no"]
      ])
    };
    whitespace = [..." 	\n\r\f\xA0\v\uFEFF"];
    current_component = null;
    BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
    BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
    EMPTY_COMMENT = `<!---->`;
    INVALID_ATTR_NAME_CHAR_REGEX = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    on_destroy = [];
  }
});

// .svelte-kit/output/server/chunks/hooks.server.js
var hooks_server_exports = {};
__export(hooks_server_exports, {
  handle: () => handle
});
async function handle({ event, resolve: resolve2 }) {
  const response = await resolve2(event);
  const isDev = true;
  const cspValue = isDev ? `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com static.cloudflareinsights.com www.instagram.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: image.opencover.jp;
      font-src 'self' data:;
      connect-src 'self' ws: wss: cloudflareinsights.com;
      frame-src 'self' www.googletagmanager.com www.instagram.com;
      object-src 'none';
    ` : `
      default-src 'self';
      script-src 'self' www.googletagmanager.com static.cloudflareinsights.com www.instagram.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: image.opencover.jp;
      font-src 'self' data:;
      connect-src 'self' cloudflareinsights.com;
      frame-src 'self' www.googletagmanager.com www.instagram.com;
      object-src 'none';
    `;
  response.headers.set("Content-Security-Policy", cspValue.replace(/\s+/g, " ").trim());
  return response;
}
var init_hooks_server = __esm({
  ".svelte-kit/output/server/chunks/hooks.server.js"() {
  }
});

// .svelte-kit/output/server/chunks/index.js
function error(status, body2) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  throw new HttpError(status, body2);
}
function redirect(status, location) {
  if (isNaN(status) || status < 300 || status > 308) {
    throw new Error("Invalid status code");
  }
  throw new Redirect(
    // @ts-ignore
    status,
    location.toString()
  );
}
function json(data, init3) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init3?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init3,
    headers: headers2
  });
}
function text(body2, init3) {
  const headers2 = new Headers(init3?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init3,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init3,
    headers: headers2
  });
}
var HttpError, Redirect, SvelteKitError, ActionFailure, encoder;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    HttpError = class {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body2) {
        this.status = status;
        if (typeof body2 === "string") {
          this.body = { message: body2 };
        } else if (body2) {
          this.body = body2;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
    SvelteKitError = class extends Error {
      /**
       * @param {number} status
       * @param {string} text
       * @param {string} message
       */
      constructor(status, text2, message) {
        super(message);
        this.status = status;
        this.text = text2;
      }
    };
    ActionFailure = class {
      /**
       * @param {number} status
       * @param {T} data
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    };
    encoder = new TextEncoder();
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/") return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore") return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback, allow_hash = false) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  const tracked_url_properties = ["href", "pathname", "search", "toString", "toJSON"];
  if (allow_hash) tracked_url_properties.push("hash");
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
    tracked.searchParams[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url.searchParams, opts);
    };
  }
  if (!allow_hash) {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function readable(value, start2) {
  return {
    subscribe: writable(value, start2).subscribe
  };
}
function writable(value, start2 = noop) {
  let stop = null;
  const subscribers = /* @__PURE__ */ new Set();
  function set4(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set4(fn(
      /** @type {T} */
      value
    ));
  }
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start2(set4, update) || noop;
    }
    run(
      /** @type {T} */
      value
    );
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set4, update, subscribe };
}
function validator(expected) {
  function validate(module, file) {
    if (!module) return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2)) continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, subscriber_queue, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    init_utils();
    init_equality();
    internal = new URL("sveltekit-internal://");
    subscriber_queue = [];
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// .svelte-kit/output/server/entries/pages/_layout.ts.js
var layout_ts_exports = {};
var init_layout_ts = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.ts.js"() {
  }
});

// .svelte-kit/output/server/chunks/client.js
function get2(key2, parse2 = JSON.parse) {
  try {
    return parse2(sessionStorage[key2]);
  } catch {
  }
}
function create_updated_store() {
  const { set: set4, subscribe } = writable(false);
  {
    return {
      subscribe,
      // eslint-disable-next-line @typescript-eslint/require-await
      check: async () => false
    };
  }
}
var SNAPSHOT_KEY, SCROLL_KEY, is_legacy, stores;
var init_client = __esm({
  ".svelte-kit/output/server/chunks/client.js"() {
    init_exports();
    init_utils();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
    if (is_legacy) {
      ({
        data: {},
        form: null,
        error: null,
        params: {},
        route: { id: null },
        state: {},
        status: -1,
        url: new URL("https://example.com")
      });
    }
    get2(SCROLL_KEY) ?? {};
    get2(SNAPSHOT_KEY) ?? {};
    stores = {
      updated: /* @__PURE__ */ create_updated_store()
    };
  }
});

// .svelte-kit/output/server/chunks/index3.js
function context() {
  return getContext("__request__");
}
var page$1, navigating$1, page, navigating;
var init_index3 = __esm({
  ".svelte-kit/output/server/chunks/index3.js"() {
    init_client();
    init_index2();
    ({
      check: stores.updated.check
    });
    page$1 = {
      get error() {
        return context().page.error;
      },
      get status() {
        return context().page.status;
      }
    };
    navigating$1 = {
      to: null
    };
    page = page$1;
    navigating = navigating$1;
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Header($$payload, $$props) {
  push();
  $$payload.out += `<header class="avenir font-semibold p-4 border-b border-slate-200 bg-white"><div class="container mx-auto flex justify-between items-center relative"><a href="/"><div id="title" class="flex items-center gap-2"><img src="/favicon.png" alt="opencover" class="w-8 h-8 inline"> <span class="hidden sm:inline text-xl tracking-widest">opencover</span></div></a> <div class="flex items-center">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <nav${attr_class(`${"block"} md:block`)}><ul${attr_class(`${"text-sm flex items-center space-x-4"}`)}><li><a href="/how-to-use" class="rounded hover:bg-slate-100 block p-2">\u3064\u304B\u3044\u304B\u305F</a></li> <li><a href="/about" class="rounded hover:bg-slate-100 block p-2">About</a></li></ul></nav></div></div></header>`;
  pop();
}
function Footer($$payload) {
  $$payload.out += `<footer class="avenir mt-8 h-40 p-3 border-t border-slate-200"><div class="max-w-screen-xl mx-auto my-0 py-8"><div class="text-lg font-semibold tracking-widest">opencover</div> <div class="text-sm text-slate-400 mt-4">Developed by opencover project.</div></div></footer>`;
}
function _layout($$payload, $$props) {
  push();
  let { data, children: children2 } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>opencover : \u307F\u3093\u306A\u3067\u3064\u304F\u308B\u66F8\u7C4D\u30AB\u30D0\u30FC\u753B\u50CF</title>`;
    $$payload2.out += `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" class="svelte-bri4i8"> <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" class="svelte-bri4i8"> <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" class="svelte-bri4i8"> <link rel="manifest" href="/site.webmanifest" class="svelte-bri4i8"> ${html(`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MPGLQ8VW');<\/script>`)} ${html(`<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "93b323d9ed184579948095473421a257"}'><\/script>`)}`;
  });
  if (navigating.to) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="loading-indicator svelte-bri4i8"><div class="spinner svelte-bri4i8"></div> <p class="svelte-bri4i8">\u8AAD\u307F\u8FBC\u307F\u4E2D...</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <noscript class="svelte-bri4i8"><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MPGLQ8VW" title="Google Tag Manager" height="0" width="0" style="display:none;visibility:hidden" class="svelte-bri4i8"></iframe></noscript> <div class="flex flex-col min-h-screen justify-between svelte-bri4i8"><div class="fixed top-0 left-0 right-0 z-50 svelte-bri4i8">`;
  Header($$payload);
  $$payload.out += `<!----></div> <main class="flex-grow pt-header svelte-bri4i8"><div class="max-w-screen-xl mx-auto svelte-bri4i8">`;
  children2($$payload);
  $$payload.out += `<!----></div></main> `;
  Footer($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_index2();
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets,
  universal: () => layout_ts_exports,
  universal_id: () => universal_id
});
var index, component_cache, component, universal_id, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_ts();
    index = 0;
    component = async () => component_cache ??= (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    universal_id = "src/routes/+layout.ts";
    imports = ["_app/immutable/nodes/0.wki7hD6R.js", "_app/immutable/chunks/B-Dr2cRb.js", "_app/immutable/chunks/BlTpSGD8.js", "_app/immutable/chunks/DKmXJPfJ.js", "_app/immutable/chunks/Dq12EtSq.js", "_app/immutable/chunks/3BVVdgGk.js", "_app/immutable/chunks/CbsYtiTg.js", "_app/immutable/chunks/DdiJvTiH.js", "_app/immutable/chunks/DOvYsISe.js", "_app/immutable/chunks/ChECSWBu.js", "_app/immutable/chunks/Cta3jvXf.js"];
    stylesheets = ["_app/immutable/assets/0.BhcFeu7h.css", "_app/immutable/assets/app.CovZX8I2.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
function Error2($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`;
  pop();
}
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index2();
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ??= (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    imports2 = ["_app/immutable/nodes/1.RgkJCTKB.js", "_app/immutable/chunks/B-Dr2cRb.js", "_app/immutable/chunks/BlTpSGD8.js", "_app/immutable/chunks/DOvYsISe.js", "_app/immutable/chunks/CLK_dOat.js", "_app/immutable/chunks/ChECSWBu.js", "_app/immutable/chunks/CABO9XDg.js", "_app/immutable/chunks/Cta3jvXf.js", "_app/immutable/chunks/3BVVdgGk.js", "_app/immutable/chunks/CbsYtiTg.js", "_app/immutable/chunks/DdiJvTiH.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/shelf/isbn/_isbn_/_error.svelte.js
var error_svelte_exports2 = {};
__export(error_svelte_exports2, {
  default: () => _error
});
function _error($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}: ${escape_html(page.error.message)}</h1>`;
  pop();
}
var init_error_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/shelf/isbn/_isbn_/_error.svelte.js"() {
    init_index2();
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ??= (await Promise.resolve().then(() => (init_error_svelte2(), error_svelte_exports2))).default;
    imports3 = ["_app/immutable/nodes/2.YhxTlK9L.js", "_app/immutable/chunks/B-Dr2cRb.js", "_app/immutable/chunks/BlTpSGD8.js", "_app/immutable/chunks/DOvYsISe.js", "_app/immutable/chunks/CLK_dOat.js", "_app/immutable/chunks/ChECSWBu.js", "_app/immutable/chunks/CABO9XDg.js", "_app/immutable/chunks/Cta3jvXf.js", "_app/immutable/chunks/3BVVdgGk.js", "_app/immutable/chunks/CbsYtiTg.js", "_app/immutable/chunks/DdiJvTiH.js"];
    stylesheets3 = [];
    fonts3 = [];
  }
});

// node_modules/.pnpm/@pubdate+isbn@0.2.92/node_modules/@pubdate/isbn/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@pubdate+isbn@0.2.92/node_modules/@pubdate/isbn/dist/index.js"(exports, module) {
    !function(e, c) {
      "object" == typeof exports && "object" == typeof module ? module.exports = c() : "function" == typeof define && define.amd ? define([], c) : "object" == typeof exports ? exports.ISBN = c() : e.ISBN = c();
    }(exports, () => (() => {
      "use strict";
      var e = { 229: function(e2, c2, _2) {
        var t = this && this.__importDefault || function(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        };
        Object.defineProperty(c2, "__esModule", { value: true });
        const i = t(_2(633));
        class s2 extends i.default {
        }
        c2.default = s2, s2.REGISTRATION_GROUPS_TREE_BY_EAN_PREFIX = { 978: { 0: { l: "EN", _: { 2: [[0, 19]], 3: [[200, 227], [229, 368], [370, 638], [640, 644], [646, 647], [649, 654], [656, 699]], 4: [[2280, 2289], [3690, 3699], [6390, 6397], [6550, 6559], [7e3, 8499]], 5: [[85e3, 89999]], 6: [[9e5, 900370], [900372, 949999]], 7: [[6398e3, 6399999], [645e4, 6459999], [648e4, 6489999], [9003710, 9003719], [95e5, 9999999]] } }, 1: { l: "EN", _: { 2: [[1, 2], [5, 5]], 3: [[0, 9], [30, 34], [40, 48], [100, 397], [714, 716]], 4: [[350, 399], [490, 499], [700, 999], [3980, 5499], [6500, 6799], [6860, 7139], [7170, 7319], [7620, 7634], [7900, 7999], [8672, 8675], [9730, 9877]], 5: [[55e3, 64999], [68e3, 68599], [74e3, 76199], [76500, 77499], [77540, 77639], [77650, 77699], [77830, 78999], [8e4, 80049], [80050, 80499], [80500, 83799], [83850, 86719], [86760, 86979]], 6: [[869800, 915999], [916506, 916869], [916908, 919599], [919655, 972999], [987800, 991149], [991200, 998989]], 7: [[67e4, 699999], [732e4, 7399999], [7635e3, 7649999], [775e4, 7753999], [7764e3, 7764999], [777e4, 7782999], [838e4, 8384999], [916e4, 9165059], [9168700, 9169079], [9196e3, 9196549], [9911500, 9911999], [9989900, 9999999]] } }, 2: { l: "FR", _: { 2: [[0, 19]], 3: [[200, 349], [400, 486], [495, 495], [497, 527], [530, 699]], 4: [[4960, 4966], [5280, 5299], [7e3, 8399]], 5: [[35e3, 39999], [49670, 49699], [84e3, 89999], [91980, 91980]], 6: [[487e3, 494999], [9e5, 919799], [919810, 919942], [919969, 949999]], 7: [[9199430, 9199689], [95e5, 9999999]] } }, 3: { l: "DE", _: { 2: [[0, 2], [4, 19], [39, 39]], 3: [[30, 33], [200, 389], [400, 688]], 4: [[340, 369], [6950, 8499], [9996, 9999]], 5: [[3700, 3999], [68900, 69499], [85e3, 89999], [95400, 96999], [98500, 99959]], 6: [[9e5, 949999]], 7: [[95e5, 9539999], [97e5, 9849999]] } }, 4: { c: "JP", _: { 2: [[0, 19]], 3: [[200, 699]], 4: [[7e3, 8499]], 5: [[85e3, 89999]], 6: [[9e5, 949999]], 7: [[95e5, 9999999]] } }, 5: { c: "SU", _: { 2: [[1, 19]], 3: [[200, 361], [363, 420], [430, 430], [440, 440], [450, 603], [605, 699]], 4: [[50, 99], [3620, 3623], [4210, 4299], [4310, 4399], [4410, 4499], [7e3, 8499], [9200, 9299], [9501, 9799], [9910, 9999]], 5: [[0, 499], [36240, 36299], [85e3, 89999], [91e3, 91999], [93e3, 94999], [98e3, 98999]], 6: [[9e5, 909999]], 7: [[604e4, 6049999], [95e5, 9500999], [99e5, 9909999]] } }, 6: { 0: { 0: { c: "IR", _: { 2: [[0, 9]], 3: [[100, 499], [993, 995]], 4: [[5e3, 8999], [9868, 9929]], 5: [[9e4, 98679], [99600, 99999]] } }, 1: { c: "KZ", _: { 2: [[0, 19], [85, 99]], 3: [[200, 699]], 4: [[7e3, 7999]], 5: [[8e4, 84999]] } }, 2: { c: "ID", _: { 2: [[0, 6]], 3: [[200, 499]], 4: [[700, 1399], [1500, 1699], [5400, 5999], [6200, 6999], [7500, 9499]], 5: [[14e3, 14999], [17e3, 19999], [5e4, 53999], [6e4, 61999], [7e4, 74999], [95e3, 99999]] } }, 3: { c: "SA", _: { 2: [[0, 4], [5, 49]], 3: [[500, 799]], 4: [[8e3, 8999]], 5: [[9e4, 99999]] } }, 4: { c: "VN", _: { 1: [[0, 2]], 2: [[40, 46], [50, 89]], 3: [[300, 399], [470, 497], [900, 979]], 4: [[4980, 4999], [9800, 9999]] } }, 5: { _: { 2: [[0, 2], [4, 5], [7, 9]], 3: [[30, 39], [100, 199], [240, 399]], 4: [[2e3, 2399], [4e3, 5999], [7500, 7999], [9e3, 9999]], 5: [[6e3, 6999], [6e4, 74999], [8e4, 89999]] } }, 6: { c: "RO", _: { 2: [[10, 49]], 3: [[0, 99], [500, 799], [910, 919], [975, 999]], 4: [[8e3, 9099], [9600, 9749]], 5: [[92e3, 95999]] } }, 7: { c: "MX", _: { 2: [[0, 25], [27, 39]], 3: [[400, 588], [600, 694], [700, 749]], 4: [[2600, 2649], [5890, 5929], [7500, 9499]], 5: [[26500, 26999], [59300, 59999], [69500, 69999], [95e3, 99999]] } }, 8: { c: "MK", _: { 1: [[0, 0], [7, 9]], 2: [[10, 19]], 3: [[200, 449]], 4: [[4500, 6499]], 5: [[65e3, 69999]] } }, 9: { c: "LT", _: { 2: [[0, 39]], 3: [[400, 799]], 4: [[8e3, 9499]], 5: [[95e3, 99999]] } } }, 1: { 1: { c: "TH", _: {} }, 2: { c: "PE", _: { 2: [[0, 29]], 3: [[300, 399]], 4: [[4e3, 4499], [5e3, 5224]], 5: [[45e3, 49999]] } }, 3: { c: "MU", _: { 1: [[0, 9]] } }, 4: { c: "LB", _: { 2: [[0, 39]], 3: [[400, 799]], 4: [[8e3, 9499]], 5: [[95e3, 99999]] } }, 5: { c: "HU", _: { 2: [[0, 9]], 3: [[100, 499]], 4: [[5e3, 7999]], 5: [[8e4, 89999]] } }, 6: { c: "TH", _: { 2: [[0, 19]], 3: [[200, 699]], 4: [[7e3, 8999]], 5: [[9e4, 99999]] } }, 7: { c: "UA", _: { 2: [[0, 49]], 3: [[500, 699]], 4: [[7e3, 8999]], 5: [[9e4, 99999]] } }, 8: { c: "GR", _: { 2: [[0, 19]], 3: [[200, 499]], 4: [[5e3, 7999]], 5: [[8e4, 99999]] } }, 9: { c: "BG", _: { 2: [[0, 14]], 3: [[150, 699]], 4: [[7e3, 8999]], 5: [[9e4, 99999]] } } }, 2: { 0: { c: "MU", _: { 1: [[0, 9]] } }, 1: { c: "PH", _: { 2: [[0, 29]], 3: [[400, 599]], 4: [[8e3, 8999]], 5: [[95e3, 99999]] } }, 2: { c: "IR", _: { 2: [[0, 10]], 3: [[200, 459]], 4: [[4600, 8749]], 5: [[87500, 99999]] } }, 3: { c: "ID", _: { 2: [[0, 10]], 3: [[110, 524]], 4: [[5250, 8799]], 5: [[88e3, 99999]] } }, 4: { c: "LK", _: { 2: [[0, 4]], 3: [[200, 249]], 4: [[5e3, 6899]], 5: [[92e3, 99999]] } }, 5: { _: { 2: [[0, 1]], 3: [[320, 442], [445, 449]], 4: [[5500, 7793], [7795, 8499]], 5: [[44300, 44499], [77940, 77949], [94e3, 99999]] } }, 6: { c: "TW", _: { 2: [[0, 4]], 3: [[300, 499]], 4: [[7e3, 7999]], 5: [[95e3, 99999]] } }, 7: { c: "PK", _: { 2: [[30, 31]], 3: [[500, 529]], 4: [[7400, 7999]], 5: [[94500, 95149]] } }, 8: { c: "CO", _: { 2: [[0, 9]], 3: [[500, 549]], 4: [[7500, 8499]], 5: [[95e3, 99999]] } }, 9: { c: "MY", _: { 2: [[0, 2]], 3: [[460, 499]], 4: [[7500, 7999]], 5: [[95e3, 99999]] } } }, 3: { 0: { c: "RO", _: { 3: [[300, 399]], 4: [[6500, 6849]], 5: [[95e3, 99999]] } }, 1: { c: "AR", _: { 2: [[0, 9]], 3: [[300, 399]], 4: [[6500, 7499]], 5: [[9e4, 99999]] } }, 2: { c: "VN", _: { 2: [[0, 11]], 3: [[600, 679]] } }, 3: { c: "EG", _: { 2: [[0, 1]], 3: [[300, 349]], 4: [[8250, 8999]], 5: [[99500, 99999]] } }, 4: { c: "ID", _: { 2: [[0, 4]], 3: [[200, 349]], 4: [[7e3, 7999]], 5: [[96e3, 99999]] } } }, 5: { c: "BR", _: { 2: [[0, 1]], 3: [[250, 299], [300, 302]], 4: [[5e3, 6149]], 5: [[8e4, 81824], [83e3, 89999]], 6: [[9e5, 902449], [98e4, 999999]] } } }, 7: { c: "CN", _: { 2: [[0, 9]], 3: [[100, 499]], 4: [[5e3, 7999]], 5: [[8e4, 89999]], 6: [[9e5, 999999]] } }, 8: { 0: { c: "CS", _: { 2: [[0, 19]], 3: [[200, 529], [550, 689]], 4: [[7e3, 8499]], 5: [[53e3, 54999], [69e3, 69999], [85e3, 89999], [99900, 99999]], 6: [[9e5, 998999]] } }, 1: { c: "IN", _: { 2: [[0, 18]], 3: [[200, 699]], 4: [[7e3, 8499]], 5: [[19e3, 19999], [85e3, 89999]], 6: [[9e5, 999999]] } }, 2: { c: "NO", _: { 2: [[0, 19]], 3: [[200, 689]], 4: [[7e3, 8999]], 5: [[9e4, 98999]], 6: [[69e4, 699999], [99e4, 999999]] } }, 3: { c: "PL", _: { 2: [[0, 19]], 3: [[200, 599]], 4: [[7e3, 8499]], 5: [[6e4, 69999], [85e3, 89999]], 6: [[9e5, 999999]] } }, 4: { c: "ES", _: { 2: [[0, 9]], 3: [[140, 149], [200, 699]], 4: [[1050, 1199], [1300, 1399], [7e3, 8499], [9e3, 9199], [9700, 9999]], 5: [[1e4, 10499], [15e3, 19999], [85e3, 89999], [92400, 92999], [95e3, 96999]], 6: [[12e4, 129999], [92e4, 923999], [93e4, 949999]] } }, 5: { c: "BR", _: { 2: [[0, 19], [96, 97]], 3: [[200, 454], [456, 528], [534, 539]], 4: [[5320, 5339], [5440, 5479], [5500, 5999], [7e3, 8499], [9450, 9599]], 5: [[45530, 45599], [52900, 53199], [54e3, 54029], [54030, 54039], [54050, 54089], [54100, 54399], [54800, 54999], [6e4, 69999], [85e3, 89999], [92500, 94499], [98e3, 99999]], 6: [[455e3, 455299], [540400, 540499], [540900, 540999], [9e5, 924999]] } }, 6: { c: "YU", _: { 2: [[0, 29]], 3: [[300, 599]], 4: [[6e3, 7999]], 5: [[8e4, 89999]], 6: [[9e5, 999999]] } }, 7: { c: "DK", _: { 2: [[0, 29]], 3: [[400, 649]], 4: [[7e3, 7999]], 5: [[85e3, 94999]], 6: [[97e4, 999999]] } }, 8: { c: "IT", _: { 2: [[0, 19]], 3: [[200, 311], [315, 318], [323, 326], [339, 360], [363, 548], [555, 599], [910, 926]], 4: [[3270, 3389], [3610, 3629], [5490, 5549], [6e3, 8499], [9270, 9399]], 5: [[31200, 31499], [31900, 32299], [85e3, 89999], [94800, 99999]], 6: [[9e5, 909999], [94e4, 947999]] } }, 9: { c: "KR", _: { 2: [[0, 24]], 3: [[250, 549], [990, 999]], 4: [[5500, 8499]], 5: [[85e3, 94999], [97e3, 98999]], 6: [[95e4, 969999]] } } }, 9: { 0: { c: "NL", _: { 2: [[0, 19], [90, 90], [94, 94]], 3: [[200, 499]], 4: [[5e3, 6999], [8500, 8999]], 5: [[7e4, 79999]], 6: [[8e5, 849999]] } }, 1: { c: "SE", _: { 1: [[0, 1]], 2: [[20, 49]], 3: [[500, 649]], 4: [[7e3, 8199]], 5: [[85e3, 94999]], 6: [[97e4, 999999]] } }, 2: { a: "International NGO Publishers and EU Organizations", _: { 1: [[0, 5]], 2: [[60, 79]], 3: [[800, 899]], 4: [[9e3, 9499]], 5: [[95e3, 98999]], 6: [[99e4, 999999]] } }, 3: { c: "IN", _: { 2: [[0, 9]], 3: [[100, 479]], 4: [[5e3, 7999]], 5: [[48e3, 49999], [8e4, 95999]], 6: [[96e4, 999999]] } }, 4: { c: "NL", _: { 3: [[0, 599]], 4: [[6e3, 6387], [6389, 6395], [6397, 6399], [6401, 6406], [6408, 6419], [6421, 6432], [6434, 6435], [6437, 6443], [6445, 6450], [6452, 6458], [6460, 6465], [6467, 6474], [6476, 6476], [6479, 6493], [6495, 6497], [6499, 8999]], 5: [[63881, 63881], [63884, 63885], [63887, 63889], [63961, 63962], [63964, 63964], [63966, 63969], [64001, 64004], [64006, 64006], [64009, 64009], [64074, 64074], [64076, 64077], [64200, 64201], [64203, 64203], [64205, 64206], [64208, 64208], [64330, 64331], [64333, 64333], [64336, 64336], [64338, 64339], [64361, 64363], [64366, 64366], [64368, 64369], [64441, 64441], [64443, 64443], [64445, 64446], [64449, 64449], [64510, 64512], [64514, 64515], [64591, 64592], [64595, 64596], [64599, 64599], [64661, 64662], [64666, 64666], [64669, 64669], [64750, 64751], [64754, 64754], [64756, 64757], [64759, 64759], [64771, 64771], [64773, 64773], [64777, 64779], [64781, 64781], [64783, 64786], [64788, 64789], [64941, 64942], [64945, 64946], [64948, 64948], [64980, 64980], [64983, 64984], [64987, 64987], [9e4, 99999]], 6: [[638800, 638809], [638820, 638839], [638860, 638869], [639600, 639609], [639630, 639639], [639650, 639659], [64e4, 640009], [640050, 640059], [640070, 640089], [640700, 640739], [640750, 640759], [640780, 640799], [642020, 642029], [642040, 642049], [642070, 642079], [642090, 642099], [643320, 643329], [643340, 643359], [643370, 643379], [643600, 643609], [643640, 643659], [643670, 643679], [644400, 644409], [644420, 644429], [644440, 644449], [644470, 644489], [645130, 645139], [645160, 645199], [645900, 645909], [645930, 645949], [645970, 645989], [646600, 646609], [646630, 646659], [646670, 646689], [647520, 647539], [647550, 647559], [647580, 647589], [647700, 647708], [647723, 647729], [647740, 647769], [647800, 647809], [647820, 647829], [647870, 647879], [649400, 649409], [649430, 649449], [649470, 649479], [649490, 649499], [649810, 649829], [649850, 649869], [649880, 649899]] } }, 5: { 0: { c: "AR", _: { 2: [[0, 49]], 3: [[500, 899]], 4: [[9e3, 9899]], 5: [[99e3, 99999]] } }, 1: { c: "FI", _: { 1: [[0, 1]], 2: [[20, 54]], 3: [[550, 889]], 4: [[8900, 9499]], 5: [[95e3, 99999]] } }, 2: { c: "FI", _: { 2: [[0, 19], [60, 64], [80, 94]], 3: [[200, 499]], 4: [[5e3, 5999], [6600, 6699], [7e3, 7999], [9500, 9899]], 5: [[65e3, 65999], [67e3, 69999], [99e3, 99999]] } }, 3: { c: "HR", _: { 1: [[0, 0]], 2: [[10, 14], [51, 54]], 3: [[150, 459], [500, 500]], 4: [[6e3, 9499]], 5: [[46e3, 49999], [50100, 50999], [55e3, 59999], [95e3, 99999]] } }, 4: { c: "BG", _: { 2: [[0, 28]], 3: [[300, 799]], 4: [[2900, 2999], [8e3, 8999], [9300, 9999]], 5: [[9e4, 92999]] } }, 5: { c: "LK", _: { 2: [[20, 33]], 3: [[550, 710]], 4: [[0, 1999], [3400, 3549], [3600, 3799], [3900, 4099], [4500, 4999], [7150, 9499]], 5: [[35500, 35999], [38e3, 38999], [41e3, 44999], [5e4, 54999], [71100, 71499], [95e3, 99999]] } }, 6: { c: "CL", _: { 2: [[0, 7], [10, 19]], 3: [[200, 599]], 4: [[6e3, 6999], [7e3, 9999]], 5: [[8e3, 8499], [9e3, 9999]] } }, 7: { c: "TW", _: { 2: [[0, 2], [5, 19], [21, 27], [31, 43]], 3: [[440, 819]], 4: [[300, 499], [2e3, 2099], [8200, 9699]], 5: [[28e3, 30999], [97e3, 99999]] } }, 8: { c: "CO", _: { 2: [[0, 49]], 3: [[500, 509], [600, 799]], 4: [[5100, 5199], [5400, 5599], [8e3, 9499]], 5: [[52e3, 53999], [56e3, 59999], [95e3, 99999]] } }, 9: { c: "CU", _: { 2: [[0, 19]], 3: [[200, 699]], 4: [[7e3, 8499]], 5: [[85e3, 99999]] } } }, 6: { 0: { c: "GR", _: { 2: [[0, 19], [93, 93]], 3: [[200, 659], [690, 699]], 4: [[6600, 6899], [7e3, 8499], [9400, 9799]], 5: [[85e3, 92999], [98e3, 99999]] } }, 1: { c: "SI", _: { 2: [[0, 19]], 3: [[200, 599]], 4: [[6e3, 8999]], 5: [[9e4, 97999]] } }, 2: { c: "HK", _: { 2: [[0, 19]], 3: [[200, 699], [900, 999]], 4: [[7e3, 8499], [8700, 8999]], 5: [[85e3, 86999]] } }, 3: { c: "HU", _: { 2: [[0, 19]], 3: [[200, 699]], 4: [[7e3, 8499], [9e3, 9999]], 5: [[85e3, 89999]] } }, 4: { c: "IR", _: { 2: [[0, 14]], 3: [[150, 249], [300, 549], [970, 989]], 4: [[2500, 2999], [5500, 8999], [9900, 9999]], 5: [[9e4, 96999]] } }, 5: { c: "IL", _: { 2: [[0, 19]], 3: [[200, 599]], 4: [[7e3, 7999]], 5: [[9e4, 99999]] } }, 6: { c: "UA", _: { 2: [[0, 12], [14, 14]], 3: [[130, 139], [170, 199], [279, 289], [300, 699], [910, 949], [980, 999]], 4: [[1500, 1699], [2e3, 2789], [2900, 2999], [7e3, 8999]], 5: [[9e4, 90999], [95e3, 97999]] } }, 7: { c: "MY", _: { 2: [[60, 89]], 3: [[250, 254], [300, 499], [900, 989]], 4: [[0, 999], [2e3, 2499], [2700, 2799], [2800, 2999], [5e3, 5999], [9900, 9989]], 5: [[1e4, 19999], [25500, 26999], [99900, 99999]] } }, 8: { c: "MX", _: { 2: [[1, 39]], 3: [[400, 499], [800, 899]], 4: [[5e3, 7999], [9e3, 9999]] } }, 9: { c: "PK", _: { 1: [[0, 1]], 2: [[20, 20], [24, 39]], 3: [[210, 219], [400, 749]], 4: [[2200, 2299], [7500, 9999]], 5: [[23e3, 23999]] } } }, 7: { 0: { c: "MX", _: { 2: [[1, 59]], 3: [[600, 899]], 4: [[9e3, 9099], [9700, 9999]], 5: [[91e3, 96999]] } }, 1: { c: "PH", _: { 2: [[2, 2], [6, 49], [97, 98]], 3: [[0, 15], [500, 849]], 4: [[160, 199], [300, 599], [8500, 9099], [9600, 9699], [9900, 9999]], 5: [[91e3, 95999]] } }, 2: { c: "PT", _: { 1: [[0, 1]], 2: [[20, 54]], 3: [[550, 799]], 4: [[8e3, 9499]], 5: [[95e3, 99999]] } }, 3: { c: "RO", _: { 1: [[0, 0]], 2: [[20, 54]], 3: [[100, 169], [550, 759]], 4: [[1700, 1999], [7600, 8499], [8900, 9499]], 5: [[85e3, 88999], [95e3, 99999]] } }, 4: { c: "TH", _: { 2: [[0, 19]], 3: [[200, 699]], 4: [[7e3, 8499], [9500, 9999]], 5: [[85e3, 89999], [9e4, 94999]] } }, 5: { _: { 2: [[2, 23]], 3: [[250, 599], [990, 999]], 4: [[2400, 2499], [6e3, 9199]], 5: [[0, 1999], [92e3, 98999]] } }, 6: { a: "Caribbean Community", _: { 1: [[0, 3]], 2: [[40, 59]], 3: [[600, 799]], 4: [[8e3, 9499]], 5: [[95e3, 99999]] } }, 7: { c: "EG", _: { 2: [[0, 19], [90, 95]], 3: [[200, 499], [700, 849], [890, 894], [970, 999]], 4: [[5e3, 6999], [8740, 8899], [8950, 8999], [9600, 9699]], 5: [[85e3, 87399]] } }, 8: { c: "NG", _: { 3: [[0, 199], [765, 799], [900, 999]], 4: [[2e3, 2999], [8e3, 8999]], 5: [[3e4, 69999]] } }, 9: { c: "ID", _: { 2: [[20, 29]], 3: [[0, 99], [400, 799]], 4: [[1e3, 1499], [3e3, 3999], [8e3, 9499]], 5: [[15e3, 19999], [95e3, 99999]] } } }, 8: { 0: { c: "VE", _: { 2: [[0, 19]], 3: [[200, 599]], 4: [[6e3, 9999]] } }, 1: { c: "SG", _: { 2: [[0, 16], [18, 19], [94, 94], [96, 99]], 3: [[200, 299], [310, 399]], 4: [[3e3, 3099], [4e3, 5999]], 5: [[17e3, 17999]] } }, 2: { a: "South Pacific", _: { 2: [[0, 9], [70, 89]], 3: [[100, 699]], 4: [[9e3, 9799]], 5: [[98e3, 99999]] } }, 3: { c: "MY", _: { 2: [[0, 1], [45, 49], [50, 79]], 3: [[20, 199], [800, 899]], 4: [[2e3, 3999], [9e3, 9899]], 5: [[4e4, 44999], [99e3, 99999]] } }, 4: { c: "BD", _: { 2: [[0, 38]], 3: [[400, 799]], 4: [[3900, 3999], [8e3, 8999]], 5: [[9e4, 99999]] } }, 5: { c: "BY", _: { 2: [[0, 39]], 3: [[400, 599], [880, 899]], 4: [[6e3, 8799]], 5: [[9e4, 99999]] } }, 6: { c: "TW", _: { 2: [[0, 5], [8, 11]], 3: [[120, 539]], 4: [[700, 799], [5400, 7999]], 5: [[6e3, 6999], [8e4, 99999]] } }, 7: { c: "AR", _: { 2: [[0, 9], [30, 35], [42, 43], [85, 88]], 3: [[500, 824]], 4: [[1e3, 1999], [3600, 4199], [4400, 4499], [4900, 4999], [8250, 8279], [8300, 8499], [8900, 9499]], 5: [[2e4, 29999], [45e3, 48999], [82800, 82999], [95e3, 99999]] } }, 8: { c: "HK", _: { 2: [[0, 11]], 3: [[200, 699]], 4: [[8e3, 9699]], 5: [[12e3, 19999], [7e4, 79999], [97e3, 99999]] } }, 9: { c: "PT", _: { 1: [[0, 1]], 2: [[20, 34], [37, 52]], 3: [[550, 799]], 4: [[8e3, 9499]], 5: [[35e3, 36999], [53e3, 54999], [95e3, 99999]] } } }, 9: { 0: { 8: { c: "EE", _: { 1: [[0, 1]], 2: [[50, 69]], 3: [[825, 899]], 4: [[9700, 9999]] } }, 9: { c: "TN", _: { 2: [[0, 19]], 3: [[750, 849]], 4: [[9800, 9999]] } } }, 1: { 0: { c: "UZ", _: { 2: [[1, 9]], 3: [[630, 799]], 4: [[8600, 9999]] } }, 1: { c: "ME", _: { 2: [[20, 24]], 3: [[550, 749]], 4: [[9500, 9999]] } }, 2: { c: "TZ", _: { 2: [[40, 44]], 3: [[750, 799]], 4: [[9800, 9999]] } }, 3: { c: "UG", _: { 2: [[0, 7]], 3: [[600, 699]], 4: [[9550, 9999]] } }, 4: { c: "KE", _: { 2: [[35, 55]], 3: [[700, 774]], 4: [[9450, 9999]] } }, 5: { c: "UY", _: { 2: [[40, 59]], 3: [[650, 799]], 4: [[9300, 9999]] } }, 6: { c: "EE", _: { 1: [[0, 0], [4, 5]], 2: [[10, 39], [79, 91], [94, 94]], 3: [[600, 789]], 4: [[9200, 9399], [9500, 9999]] } }, 7: { c: "BO", _: { 1: [[0, 0]], 2: [[30, 34]], 3: [[600, 699]], 4: [[9625, 9999]] } }, 8: { c: "MT", _: { 1: [[0, 0]], 2: [[20, 29]], 3: [[600, 799]], 4: [[9500, 9999]] } }, 9: { c: "MN", _: { 1: [[0, 0]], 2: [[20, 29]], 3: [[500, 599]], 4: [[9e3, 9999]] } } }, 2: { 0: { c: "MA", _: { 2: [[23, 42]], 3: [[430, 799]], 4: [[8550, 9999]] } }, 1: { c: "KW", _: { 1: [[0, 0]], 2: [[30, 39]], 3: [[700, 899]], 4: [[9700, 9999]] } }, 2: { c: "IQ", _: { 2: [[20, 29]], 3: [[600, 799]], 4: [[8250, 9999]] } }, 3: { c: "JO", _: { 1: [[0, 0]], 2: [[10, 69]], 3: [[700, 899]], 4: [[9400, 9999]] } }, 4: { c: "KH", _: { 2: [[28, 39]], 3: [[500, 659]], 4: [[8950, 9999]] } }, 5: { c: "CY", _: { 1: [[0, 2]], 2: [[30, 54]], 3: [[550, 734]], 4: [[7350, 9999]] } }, 6: { c: "BA", _: { 1: [[0, 1]], 2: [[20, 39]], 3: [[400, 799]], 4: [[8e3, 9999]] } }, 7: { c: "QA", _: { 2: [[0, 9]], 3: [[100, 399]], 4: [[4e3, 4999]] } }, 8: { c: "AL", _: { 2: [[0, 9], [90, 99]], 3: [[100, 399], [800, 899]], 4: [[4e3, 4999]] } }, 9: { c: "GT", _: { 1: [[0, 3]], 2: [[40, 54]], 3: [[550, 799]], 4: [[8e3, 9999]] } } }, 3: { 0: { c: "CR", _: { 2: [[0, 49]], 3: [[500, 939]], 4: [[9400, 9999]] } }, 1: { c: "DZ", _: { 2: [[0, 23]], 3: [[240, 899]], 4: [[9e3, 9999]] } }, 2: { c: "LA", _: { 2: [[0, 39]], 3: [[400, 849]], 4: [[8500, 9999]] } }, 3: { c: "SY", _: { 1: [[0, 0]], 2: [[10, 39], [87, 89]], 3: [[400, 869]], 4: [[9e3, 9999]] } }, 4: { c: "LV", _: { 1: [[0, 0]], 2: [[10, 49]], 3: [[500, 799]], 4: [[8e3, 9999]] } }, 5: { c: "IS", _: { 1: [[0, 0]], 2: [[10, 39]], 3: [[400, 899]], 4: [[9e3, 9999]] } }, 6: { c: "AF", _: { 1: [[0, 1]], 2: [[20, 39]], 3: [[400, 799]], 4: [[8e3, 9999]] } }, 7: { c: "NP", _: { 1: [[0, 2]], 2: [[30, 49]], 3: [[500, 799]], 4: [[8e3, 9999]] } }, 8: { c: "TN", _: { 2: [[0, 79]], 3: [[800, 949], [975, 990]], 4: [[9500, 9749], [9910, 9999]] } }, 9: { c: "AM", _: { 1: [[0, 3]], 2: [[40, 47], [50, 79], [98, 99]], 3: [[480, 499], [800, 899], [960, 979]], 4: [[9e3, 9599]] } } }, 4: { 0: { c: "ME", _: { 1: [[0, 1]], 2: [[20, 49], [84, 86]], 3: [[500, 839]], 4: [[8700, 9999]] } }, 1: { c: "GE", _: { 1: [[0, 0], [8, 8]], 2: [[10, 39]], 3: [[400, 799]], 4: [[9e3, 9999]] } }, 2: { c: "EC", _: { 2: [[0, 55]], 3: [[560, 699], [750, 849], [900, 984]], 4: [[7e3, 7499], [8500, 8999], [9850, 9999]] } }, 3: { c: "UZ", _: { 2: [[0, 29]], 3: [[300, 399], [975, 999]], 4: [[4e3, 9749]] } }, 4: { _: { 2: [[60, 69], [80, 89]], 3: [[100, 499], [700, 799], [900, 999]], 4: [[0, 999], [5e3, 5999]] } }, 5: { c: "DO", _: { 2: [[0, 0], [8, 39], [57, 57], [80, 80]], 3: [[10, 79], [400, 569], [580, 799], [810, 849]], 4: [[8500, 9999]] } }, 6: { c: "KP", _: { 1: [[0, 1]], 2: [[20, 39]], 3: [[400, 899]], 4: [[9e3, 9999]] } }, 7: { c: "DZ", _: { 1: [[0, 1]], 2: [[20, 79]], 3: [[800, 999]] } }, 8: { c: "AE", _: { 2: [[0, 39]], 3: [[400, 849]], 4: [[8500, 9999]] } }, 9: { c: "EE", _: { 2: [[0, 8], [10, 39], [70, 71], [75, 89]], 3: [[90, 99], [400, 699]], 4: [[7200, 7499], [9e3, 9999]] } } }, 5: { 0: { c: "PS", _: { 2: [[0, 29]], 3: [[300, 849]], 4: [[8500, 9999]] } }, 1: { c: "XK", _: { 2: [[0, 38]], 3: [[390, 849], [980, 999]], 4: [[8500, 9799]] } }, 2: { c: "AZ", _: { 1: [[0, 0]], 2: [[15, 39]], 3: [[400, 799]], 4: [[8e3, 9999]] } }, 3: { c: "LB", _: { 1: [[0, 0]], 2: [[10, 39], [60, 89], [93, 96]], 3: [[400, 599], [970, 999]], 4: [[9e3, 9299]] } }, 4: { c: "MA", _: { 1: [[0, 1]], 2: [[20, 39], [99, 99]], 3: [[400, 799]], 4: [[8e3, 9899]] } }, 5: { c: "LT", _: { 2: [[0, 39]], 3: [[400, 929]], 4: [[9300, 9999]] } }, 6: { c: "CM", _: { 1: [[0, 0]], 2: [[10, 39]], 3: [[400, 899]], 4: [[9e3, 9999]] } }, 7: { c: "JO", _: { 2: [[0, 39], [65, 67], [70, 84], [88, 99]], 3: [[400, 649], [680, 699]], 4: [[8500, 8799]] } }, 8: { c: "BA", _: { 2: [[0, 1], [10, 18], [20, 49]], 3: [[20, 29], [40, 89], [500, 899]], 4: [[300, 399], [900, 999], [1900, 1999], [9e3, 9999]] } }, 9: { c: "LY", _: { 1: [[0, 1]], 2: [[20, 79], [98, 99]], 3: [[800, 949], [970, 979]], 4: [[9500, 9699]] } } }, 6: { 0: { c: "SA", _: { 2: [[0, 59]], 3: [[600, 899]], 4: [[9e3, 9999]] } }, 1: { c: "DZ", _: { 1: [[0, 2]], 2: [[30, 69]], 3: [[700, 949]], 4: [[9500, 9999]] } }, 2: { c: "PA", _: { 2: [[0, 54], [56, 59]], 3: [[600, 849]], 4: [[5500, 5599], [8500, 9999]] } }, 3: { c: "CY", _: { 1: [[0, 1]], 2: [[30, 54]], 3: [[250, 279], [550, 734]], 4: [[2e3, 2499], [2800, 2999], [7350, 7499], [7500, 9999]] } }, 4: { c: "GH", _: { 1: [[0, 6]], 2: [[70, 94]], 3: [[950, 999]] } }, 5: { c: "KZ", _: { 2: [[0, 39]], 3: [[400, 899]], 4: [[9e3, 9999]] } }, 6: { c: "KE", _: { 2: [[14, 14], [20, 69]], 3: [[0, 139], [750, 820], [825, 825], [829, 959]], 4: [[1500, 1999], [7e3, 7499], [8210, 8249], [8260, 8289], [9600, 9999]] } }, 7: { c: "KG", _: { 2: [[0, 39]], 3: [[400, 899]], 4: [[9e3, 9999]] } }, 8: { c: "CR", _: { 2: [[0, 49]], 3: [[500, 939]], 4: [[9400, 9999]] } }, 9: { c: "DZ", _: { 2: [[0, 12]], 3: [[500, 649]], 4: [[9700, 9999]] } } }, 7: { 0: { c: "UG", _: { 2: [[0, 39]], 3: [[400, 899]], 4: [[9e3, 9999]] } }, 1: { c: "SG", _: { 1: [[0, 5]], 2: [[60, 89]], 3: [[900, 989]], 4: [[9900, 9999]] } }, 2: { c: "PE", _: { 1: [[1, 1]], 2: [[0, 9], [30, 59]], 3: [[200, 249], [600, 899]], 4: [[2500, 2999], [9e3, 9999]] } }, 3: { c: "TN", _: { 2: [[0, 5], [10, 69]], 3: [[60, 89], [700, 969]], 4: [[900, 999], [9700, 9999]] } }, 4: { c: "UY", _: { 1: [[0, 2]], 2: [[30, 54], [91, 94], [95, 99]], 3: [[550, 749], [880, 909]], 4: [[7500, 8799]] } }, 5: { c: "MD", _: { 1: [[0, 0]], 2: [[45, 89]], 3: [[100, 299], [900, 949]], 4: [[3e3, 3999], [4e3, 4499], [9500, 9999]] } }, 6: { c: "TZ", _: { 1: [[0, 4]], 2: [[59, 89]], 3: [[580, 589], [900, 989]], 4: [[5e3, 5799], [9900, 9999]] } }, 7: { c: "CR", _: { 2: [[0, 89]], 3: [[900, 989]], 4: [[9900, 9999]] } }, 8: { c: "EC", _: { 2: [[0, 29], [40, 94]], 3: [[300, 399], [950, 989]], 4: [[9900, 9999]] } }, 9: { c: "IS", _: { 1: [[0, 4]], 2: [[50, 64], [66, 75]], 3: [[650, 659], [760, 899]], 4: [[9e3, 9999]] } } }, 8: { 0: { c: "PG", _: { 1: [[0, 3]], 2: [[40, 89]], 3: [[900, 989]], 4: [[9900, 9999]] } }, 1: { c: "MA", _: { 2: [[0, 9], [20, 79]], 3: [[100, 159], [800, 949]], 4: [[1600, 1999], [9500, 9999]] } }, 2: { c: "ZM", _: { 2: [[0, 79]], 3: [[800, 989]], 4: [[9900, 9999]] } }, 3: { c: "GM", _: { 2: [[80, 94]], 3: [[950, 989]], 4: [[9900, 9999]] } }, 4: { c: "LV", _: { 2: [[0, 49]], 3: [[500, 899]], 4: [[9e3, 9999]] } }, 5: { c: "EE", _: { 1: [[0, 4]], 2: [[50, 79]], 3: [[800, 899]], 4: [[9e3, 9999]] } }, 6: { c: "LT", _: { 2: [[0, 39], [97, 99]], 3: [[400, 899], [940, 969]], 4: [[9e3, 9399]] } }, 7: { c: "TZ", _: { 2: [[0, 39]], 3: [[400, 879]], 4: [[8800, 9999]] } }, 8: { c: "GH", _: { 1: [[0, 3]], 2: [[40, 54]], 3: [[550, 749]], 4: [[7500, 9999]] } }, 9: { c: "MK", _: { 1: [[0, 0]], 2: [[30, 59]], 3: [[100, 199], [600, 949]], 4: [[2e3, 2999], [9500, 9999]] } } }, 9: { 0: { 1: { c: "BH", _: { 2: [[0, 49], [80, 99]], 3: [[500, 799]] } }, 2: { _: {} }, 3: { c: "MU", _: { 1: [[0, 1]], 2: [[20, 89]], 3: [[900, 999]] } }, 4: { c: "CW", _: { 1: [[0, 5]], 2: [[60, 89]], 3: [[900, 999]] } }, 5: { c: "BO", _: { 1: [[0, 3]], 2: [[40, 79]], 3: [[800, 999]] } }, 6: { c: "KW", _: { 1: [[0, 2]], 2: [[30, 59], [70, 89], [90, 94]], 3: [[600, 699], [950, 999]] } }, 8: { c: "MW", _: { 1: [[0, 0]], 2: [[10, 89]], 3: [[900, 999]] } }, 9: { c: "MT", _: { 1: [[0, 3]], 2: [[40, 94]], 3: [[950, 999]] } } }, 1: { 0: { c: "SL", _: { 1: [[0, 2]], 2: [[30, 89]], 3: [[900, 999]] } }, 1: { c: "LS", _: { 2: [[0, 59]], 3: [[600, 999]] } }, 2: { c: "BW", _: { 1: [[0, 3]], 2: [[60, 89]], 3: [[400, 599], [900, 999]] } }, 3: { c: "AD", _: { 1: [[0, 2]], 2: [[30, 35]], 3: [[600, 604]] } }, 4: { a: "International NGO Publishers", _: { 1: [[0, 4], [7, 7]], 2: [[50, 69], [80, 86], [88, 89]], 3: [[870, 879], [900, 999]] } }, 5: { c: "MV", _: { 1: [[0, 4]], 2: [[50, 79]], 3: [[800, 999]] } }, 6: { c: "NA", _: { 1: [[0, 2]], 2: [[30, 69]], 3: [[700, 999]] } }, 7: { c: "BN", _: { 1: [[0, 2]], 2: [[30, 88]], 3: [[890, 999]] } }, 8: { c: "FO", _: { 1: [[0, 3]], 2: [[40, 79]], 3: [[800, 999]] } }, 9: { c: "BJ", _: { 1: [[0, 2]], 2: [[40, 79]], 3: [[300, 399], [800, 999]] } } }, 2: { 0: { c: "AD", _: { 1: [[0, 4]], 2: [[50, 89]], 3: [[900, 999]] } }, 1: { c: "QA", _: { 1: [[0, 1], [8, 8]], 2: [[20, 69], [90, 99]], 3: [[700, 799]] } }, 2: { c: "GT", _: { 1: [[0, 3]], 2: [[40, 69]], 3: [[700, 999]] } }, 3: { c: "SV", _: { 1: [[0, 1]], 2: [[20, 79]], 3: [[800, 999]] } }, 4: { c: "NI", _: { 1: [[0, 1]], 2: [[20, 79]], 3: [[800, 999]] } }, 5: { c: "PY", _: { 1: [[0, 0], [3, 3]], 2: [[10, 19], [40, 79]], 3: [[200, 299], [800, 999]] } }, 6: { c: "HN", _: { 1: [[0, 0]], 2: [[10, 59], [87, 89], [90, 99]], 3: [[600, 869]] } }, 7: { c: "AL", _: { 1: [[0, 2]], 2: [[30, 59]], 3: [[600, 999]] } }, 8: { c: "GE", _: { 1: [[0, 0]], 2: [[10, 79]], 3: [[800, 999]] } }, 9: { c: "MN", _: { 1: [[0, 4]], 2: [[50, 79]], 3: [[800, 999]] } } }, 3: { 0: { c: "AM", _: { 1: [[0, 4]], 2: [[50, 79]], 3: [[800, 999]] } }, 1: { c: "SC", _: { 1: [[0, 4]], 2: [[50, 79]], 3: [[800, 999]] } }, 2: { c: "MT", _: { 1: [[0, 0], [7, 7]], 2: [[10, 59], [80, 99]], 3: [[600, 699]] } }, 3: { c: "NP", _: { 1: [[0, 2]], 2: [[30, 59]], 3: [[600, 999]] } }, 4: { c: "DO", _: { 1: [[0, 1]], 2: [[20, 79]], 3: [[800, 999]] } }, 5: { c: "HT", _: { 1: [[0, 2], [7, 8]], 2: [[30, 59], [90, 99]], 3: [[600, 699]] } }, 6: { c: "BT", _: { 1: [[0, 0]], 2: [[10, 59]], 3: [[600, 999]] } }, 7: { c: "MO", _: { 1: [[0, 1]], 2: [[20, 59]], 3: [[600, 999]] } }, 8: { c: "BA", _: { 1: [[0, 1]], 2: [[20, 59], [90, 99]], 3: [[600, 899]] } }, 9: { c: "GT", _: { 1: [[0, 2]], 2: [[30, 59], [60, 89]], 3: [[900, 999]] } } }, 4: { 0: { c: "GE", _: { 1: [[0, 0]], 2: [[10, 69]], 3: [[700, 999]] } }, 1: { c: "AM", _: { 1: [[0, 2]], 2: [[30, 79]], 3: [[800, 999]] } }, 2: { c: "SD", _: { 1: [[0, 4]], 2: [[50, 79]], 3: [[800, 999]] } }, 3: { c: "AL", _: { 1: [[0, 2]], 2: [[30, 59]], 3: [[600, 999]] } }, 4: { c: "ET", _: { 1: [[0, 4]], 2: [[50, 79]], 3: [[800, 999]] } }, 5: { c: "NA", _: { 1: [[0, 4]], 2: [[50, 89], [98, 99]], 3: [[900, 979]] } }, 6: { c: "NP", _: { 1: [[0, 2]], 2: [[30, 59]], 3: [[600, 999]] } }, 7: { c: "TJ", _: { 1: [[0, 2]], 2: [[30, 69]], 3: [[700, 999]] } }, 8: { c: "ER", _: { 1: [[0, 4]], 2: [[50, 79]], 3: [[800, 999]] } }, 9: { c: "MU", _: { 1: [[0, 1], [8, 8]], 2: [[20, 79], [99, 99]], 3: [[900, 989]] } } }, 5: { 0: { c: "KH", _: { 1: [[0, 4]], 2: [[50, 79]], 3: [[800, 999]] } }, 1: { _: {} }, 2: { c: "ML", _: { 1: [[0, 4]], 2: [[50, 79]], 3: [[800, 999]] } }, 3: { c: "PY", _: { 1: [[0, 2]], 2: [[30, 79], [94, 99]], 3: [[800, 939]] } }, 4: { c: "BO", _: { 1: [[0, 2]], 2: [[30, 69], [88, 99]], 3: [[700, 879]] } }, 5: { c: "BA", _: { 1: [[0, 1]], 2: [[20, 59], [80, 99]], 3: [[600, 799]] } }, 6: { c: "AL", _: { 2: [[0, 59], [86, 99]], 3: [[600, 859]] } }, 7: { c: "MT", _: { 1: [[0, 1]], 2: [[20, 79], [95, 99]], 3: [[800, 949]] } }, 8: { c: "BH", _: { 1: [[0, 4]], 2: [[50, 93]], 3: [[940, 949], [950, 999]] } }, 9: { c: "LU", _: { 1: [[0, 2]], 2: [[30, 59]], 3: [[600, 999]] } } }, 6: { 0: { c: "MW", _: { 2: [[10, 94]], 3: [[70, 99], [950, 999]] } }, 1: { c: "SV", _: { 1: [[0, 2]], 2: [[37, 89]], 3: [[300, 369], [900, 999]] } }, 2: { c: "MN", _: { 1: [[0, 4]], 2: [[50, 79]], 3: [[800, 999]] } }, 3: { c: "KH", _: { 2: [[0, 49], [92, 99]], 3: [[500, 919]] } }, 4: { c: "NI", _: { 1: [[0, 1]], 2: [[20, 79]], 3: [[800, 999]] } }, 5: { c: "MO", _: { 1: [[0, 2]], 2: [[36, 62]], 3: [[300, 359], [630, 999]] } }, 6: { c: "KW", _: { 1: [[0, 2]], 2: [[30, 69], [80, 96]], 3: [[700, 799], [970, 999]] } }, 7: { c: "PY", _: { 1: [[0, 0]], 2: [[10, 59]], 3: [[600, 999]] } }, 8: { c: "BW", _: { 1: [[0, 3]], 2: [[60, 89]], 3: [[400, 599], [900, 999]] } }, 9: { c: "OM", _: { 1: [[0, 4]], 2: [[50, 79], [95, 99]], 3: [[800, 949]] } } }, 7: { 0: { c: "HT", _: { 1: [[0, 4]], 2: [[50, 89]], 3: [[900, 999]] } }, 1: { c: "MM", _: { 1: [[0, 3]], 2: [[40, 84]], 3: [[850, 999]] } }, 2: { c: "FO", _: { 1: [[0, 4]], 2: [[50, 89]], 3: [[900, 999]] } }, 3: { c: "MN", _: { 1: [[0, 3]], 2: [[40, 79]], 3: [[800, 999]] } }, 4: { c: "BO", _: { 1: [[0, 0]], 2: [[10, 25], [40, 63], [65, 79]], 3: [[260, 399], [640, 649], [800, 999]] } }, 5: { c: "TJ", _: { 1: [[0, 2]], 2: [[40, 79]], 3: [[300, 399], [800, 999]] } }, 6: { c: "BA", _: { 2: [[0, 3], [10, 15], [20, 59], [82, 89]], 3: [[40, 99], [160, 199], [600, 819], [900, 999]] } }, 7: { c: "RW", _: { 1: [[0, 1]], 2: [[40, 69]], 3: [[700, 799], [975, 999]] } }, 8: { c: "MN", _: { 1: [[0, 4]], 2: [[50, 69]], 3: [[700, 999]] } }, 9: { c: "HN", _: { 1: [[0, 3]], 2: [[40, 79]], 3: [[800, 999]] } } }, 8: { 0: { c: "BT", _: { 1: [[0, 0]], 2: [[30, 64]], 3: [[700, 999]] } }, 1: { c: "MO", _: { 1: [[0, 0]], 2: [[10, 10], [15, 19], [22, 74]], 3: [[110, 149], [200, 219], [750, 999]] } }, 2: { c: "BJ", _: { 1: [[0, 2]], 2: [[50, 71]], 3: [[885, 999]] } }, 3: { c: "SV", _: { 1: [[0, 0]], 2: [[35, 69]], 3: [[900, 999]] } }, 4: { c: "BN", _: { 1: [[0, 0]], 2: [[50, 69]], 3: [[950, 999]] } }, 5: { c: "TJ", _: { 1: [[0, 1]], 2: [[23, 79]], 3: [[200, 219], [800, 999]] } }, 6: { c: "MM", _: { 1: [[0, 0]], 2: [[50, 69]], 3: [[950, 999]] } }, 7: { c: "LU", _: { 3: [[700, 999]] } }, 8: { c: "SD", _: { 1: [[0, 0]], 2: [[50, 54]], 3: [[800, 824]] } }, 9: { c: "PY", _: { 1: [[0, 1]], 2: [[50, 79]], 3: [[900, 999]] } } }, 9: { 0: { c: "ET", _: { 1: [[0, 0]], 2: [[50, 57]], 3: [[960, 999]] } }, 2: { c: "OM", _: { 1: [[0, 1]], 2: [[50, 64]], 3: [[950, 999]] } }, 3: { c: "MU", _: { 1: [[0, 2]], 2: [[50, 54]], 3: [[980, 999]] } }, 4: { c: "HT", _: { 1: [[0, 0]], 2: [[50, 52]], 3: [[985, 999]] } }, 5: { c: "SC", _: { 2: [[50, 55]], 3: [[975, 999]] } }, 6: { c: "MO", _: { 1: [[0, 1]], 2: [[40, 59]], 3: [[900, 999]] } }, 7: { c: "BA", _: { 1: [[0, 0]], 2: [[40, 54]], 3: [[950, 999]] } } } } } } }, 979: { 1: { 0: { c: "FR", _: { 2: [[0, 19]], 3: [[200, 699]], 4: [[7e3, 8999]], 5: [[9e4, 97599]], 6: [[976e3, 999999]] } }, 1: { c: "KR", _: { 2: [[0, 24]], 3: [[250, 549]], 4: [[5500, 8499]], 5: [[85e3, 94999]], 6: [[95e4, 999999]] } }, 2: { c: "IT", _: { 3: [[200, 299]], 4: [[5450, 5999]], 5: [[8e4, 84999]], 6: [[985e3, 999999]] } }, 3: { c: "ES", _: { 2: [[0, 0]], 3: [[600, 604]], 4: [[7e3, 7349]], 5: [[87500, 89999]], 6: [[99e4, 999999]] } } }, 8: { c: "US", _: { 3: [[200, 229], [230, 239]], 4: [[2800, 2999], [3e3, 3199], [3200, 3499], [3500, 8849]], 5: [[88500, 89999], [9e4, 90999]], 7: [[985e4, 9899999], [99e5, 9929999], [9985e3, 9999999]] } } } };
      }, 633: function(e2, c2) {
        var _2, t, i, s2, n, r2, o, a, h = this && this.__classPrivateFieldGet || function(e3, c3, _3, t2) {
          if ("a" === _3 && !t2) throw new TypeError("Private accessor was defined without a getter");
          if ("function" == typeof c3 ? e3 !== c3 || !t2 : !c3.has(e3)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
          return "m" === _3 ? t2 : "a" === _3 ? t2.call(e3) : t2 ? t2.value : c3.get(e3);
        }, l = this && this.__classPrivateFieldSet || function(e3, c3, _3, t2, i2) {
          if ("m" === t2) throw new TypeError("Private method is not writable");
          if ("a" === t2 && !i2) throw new TypeError("Private accessor was defined without a setter");
          if ("function" == typeof c3 ? e3 !== c3 || !i2 : !c3.has(e3)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
          return "a" === t2 ? i2.call(e3, _3) : i2 ? i2.value = _3 : c3.set(e3, _3), _3;
        };
        Object.defineProperty(c2, "__esModule", { value: true });
        const u = /97[89]-?(\d+-?){3}\d|(\d+-?){3}[\dX]/, f = new RegExp(`^(${u.source})$`);
        class d extends Error {
          constructor(e3, c3) {
            let _3 = `[@pubdate/isbn] ${e3}`;
            null != c3 && (_3 = `${_3} (${c3})`), super(_3), this.code = e3, this.solution = c3;
          }
          get package() {
            return "@pubdate/isbn";
          }
        }
        class p {
          constructor(e3) {
            this.source = e3, _2.add(this), t.set(this, void 0), i.set(this, void 0), s2.set(this, void 0), o.set(this, void 0), a.set(this, void 0), e3 = e3.replace(/-/g, ""), this.version = 10 === e3.length ? "isbn10" : "isbn13", "isbn13" === this.version && (this.eanPrefix = e3.slice(0, 3)), this.code = e3.slice("isbn10" === this.version ? 0 : 3, -1), this.checksum = e3.slice(-1);
          }
          static parse(e3) {
            return new this(e3);
          }
          static search(e3) {
            return this.searchAll(e3, { limit: 1 })[0];
          }
          static searchAll(e3, { limit: c3 = 1 / 0 } = {}) {
            const _3 = [];
            let t2;
            const i2 = new RegExp(`(?<![\\d-])${u.source}(?![\\d-])`, u.flags + "g");
            for (; null !== (t2 = i2.exec(e3)); ) {
              const e4 = this.parse(t2[0]);
              if (e4.isValid && _3.push(e4), c3 === _3.length) break;
            }
            return _3;
          }
          get isValid() {
            return null == this.error;
          }
          get error() {
            return void 0 === h(this, t, "f") && ([void 0, "978", "979"].includes(this.eanPrefix) ? f.test(this.source.replace("?", "0")) ? 9 !== this.code.length ? l(this, t, "invalid_format", "f") : "?" !== this.checksum && this.checksum !== this.generateChecksum({ version: this.version }) ? l(this, t, "invalid_checksum", "f") : l(this, t, null, "f") : l(this, t, "invalid_format", "f") : l(this, t, "invalid_ean_prefix", "f")), h(this, t, "f");
          }
          get agency() {
            return null == h(this, _2, "a", n) ? null : null != h(this, _2, "a", n).a ? { name: h(this, _2, "a", n).a } : null != h(this, _2, "a", n).c ? { countryCode: h(this, _2, "a", n).c } : null != h(this, _2, "a", n).l ? { langCode: h(this, _2, "a", n).l } : {};
          }
          get codeParts() {
            if (null === h(this, _2, "a", n) && l(this, o, null, "f"), void 0 === h(this, o, "f")) {
              for (const e3 in h(this, _2, "a", n)._) {
                const c3 = h(this, _2, "a", r2).length + parseInt(e3), t2 = this.code.substring(h(this, _2, "a", r2).length, c3), i2 = parseInt(t2);
                for (const s3 of h(this, _2, "a", n)._[e3]) if (i2 >= s3[0] && i2 <= s3[1]) return l(this, o, [h(this, _2, "a", r2), t2, this.code.substring(c3)], "f");
              }
              l(this, o, null, "f");
            }
            return h(this, o, "f");
          }
          get sourceCodeParts() {
            if (void 0 === h(this, a, "f")) {
              const e3 = this.source.split("-");
              "isbn13" === this.version && e3.shift(), e3.pop(), l(this, a, 3 === e3.length ? e3 : null, "f");
            }
            return h(this, a, "f");
          }
          generateChecksum({ version: e3 }) {
            var c3;
            if ("isbn13" === e3) return ((10 - ((null !== (c3 = this.eanPrefix) && void 0 !== c3 ? c3 : "978") + this.code).split("").reduce((e4, c4, _3) => e4 + parseInt(c4) * (_3 % 2 == 0 ? 1 : 3), 0) % 10) % 10).toString();
            {
              const e4 = (11 - this.code.split("").reduce((e5, c4, _3) => e5 + parseInt(c4) * (10 - _3), 0) % 11) % 11;
              return 10 === e4 ? "X" : e4.toString();
            }
          }
          isCompatible({ version: e3 = "isbn13", hyphens: c3 = false }) {
            return !("isbn10" === e3 && ![void 0, "978"].includes(this.eanPrefix) || true === c3 && null == this.codeParts || "source" === c3 && null == this.sourceCodeParts);
          }
          toString({ version: e3 = "isbn13", hyphens: c3 = false } = {}) {
            var _3;
            if (!this.isValid) throw new d("invalid_source", `check isValid before stringifying; error: ${this.error}; source: ${JSON.stringify(this.source)}`);
            const t2 = (e3 = [e3].flat()).find((e4) => this.isCompatible({ version: e4 }));
            if (null == t2) throw new d("incompatible_version", "use version 'isbn13'; or chain version flags");
            const i2 = (c3 = [c3].flat()).find((e4) => this.isCompatible({ hyphens: e4 }));
            if (null == i2) {
              if ("source" === c3[c3.length - 1]) throw new d("missing_or_invalid_hyphens", "disable hyphens; or chain hyphens flags");
              throw new d("registration_group_not_found", "disable hyphens; or chain hyphens flags; or update @pubdate/isbn");
            }
            let s3;
            switch (i2) {
              case true:
                s3 = this.codeParts;
                break;
              case false:
                s3 = [this.code];
                break;
              case "source":
                s3 = this.sourceCodeParts;
            }
            return ["isbn13" === t2 ? null !== (_3 = this.eanPrefix) && void 0 !== _3 ? _3 : "978" : "", ...s3, this.generateChecksum({ version: t2 })].filter((e4) => e4).join(false === i2 ? "" : "-");
          }
        }
        c2.default = p, t = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), s2 = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap(), _2 = /* @__PURE__ */ new WeakSet(), n = function() {
          var e3, c3;
          if (void 0 === h(this, s2, "f")) {
            let _3 = null !== (c3 = this.constructor.REGISTRATION_GROUPS_TREE_BY_EAN_PREFIX[null !== (e3 = this.eanPrefix) && void 0 !== e3 ? e3 : "978"]) && void 0 !== c3 ? c3 : {};
            l(this, i, "", "f");
            for (const e4 of this.code) {
              if (l(this, i, h(this, i, "f") + e4, "f"), _3 = _3[e4], null == _3) break;
              if (null != _3._) return l(this, s2, _3, "f");
            }
            l(this, i, null, "f"), l(this, s2, null, "f");
          }
          return h(this, s2, "f");
        }, r2 = function() {
          return null == h(this, _2, "a", n) ? null : h(this, i, "f");
        }, p.REGISTRATION_GROUPS_TREE_BY_EAN_PREFIX = {};
      } }, c = {}, _ = function _2(t) {
        var i = c[t];
        if (void 0 !== i) return i.exports;
        var s2 = c[t] = { exports: {} };
        return e[t].call(s2.exports, s2, s2.exports, _2), s2.exports;
      }(229);
      return _.default;
    })());
  }
});

// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/index.js
var init_src = __esm({
  "node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-axis@3.0.0/node_modules/d3-axis/src/index.js
var init_src2 = __esm({
  "node_modules/.pnpm/d3-axis@3.0.0/node_modules/d3-axis/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-dispatch@3.0.1/node_modules/d3-dispatch/src/dispatch.js
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
function get3(type2, name) {
  for (var i = 0, n = type2.length, c; i < n; ++i) {
    if ((c = type2[i]).name === name) {
      return c.value;
    }
  }
}
function set2(type2, name, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name) {
      type2[i] = noop2, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null) type2.push({ name, value: callback });
  return type2;
}
var noop2, dispatch_default;
var init_dispatch = __esm({
  "node_modules/.pnpm/d3-dispatch@3.0.1/node_modules/d3-dispatch/src/dispatch.js"() {
    noop2 = { value: () => {
    } };
    Dispatch.prototype = dispatch.prototype = {
      constructor: Dispatch,
      on: function(typename, callback) {
        var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
        if (arguments.length < 2) {
          while (++i < n) if ((t = (typename = T[i]).type) && (t = get3(_[t], typename.name))) return t;
          return;
        }
        if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
        while (++i < n) {
          if (t = (typename = T[i]).type) _[t] = set2(_[t], typename.name, callback);
          else if (callback == null) for (t in _) _[t] = set2(_[t], typename.name, null);
        }
        return this;
      },
      copy: function() {
        var copy = {}, _ = this._;
        for (var t in _) copy[t] = _[t].slice();
        return new Dispatch(copy);
      },
      call: function(type2, that) {
        if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
        for (t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      },
      apply: function(type2, that, args) {
        if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
        for (var t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      }
    };
    dispatch_default = dispatch;
  }
});

// node_modules/.pnpm/d3-dispatch@3.0.1/node_modules/d3-dispatch/src/index.js
var init_src3 = __esm({
  "node_modules/.pnpm/d3-dispatch@3.0.1/node_modules/d3-dispatch/src/index.js"() {
    init_dispatch();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespaces.js
var xhtml, namespaces_default;
var init_namespaces = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespaces.js"() {
    xhtml = "http://www.w3.org/1999/xhtml";
    namespaces_default = {
      svg: "http://www.w3.org/2000/svg",
      xhtml,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}
var init_namespace = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespace.js"() {
    init_namespaces();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
var init_creator = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/creator.js"() {
    init_namespace();
    init_namespaces();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}
var init_selector = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selector.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function") select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}
var init_select = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/select.js"() {
    init_selection();
    init_selector();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/array.js
function array2(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
var init_array = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/array.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}
var init_selectorAll = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectorAll.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array2(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}
var init_selectAll = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectAll.js"() {
    init_selection();
    init_array();
    init_selectorAll();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}
var init_matcher = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/matcher.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChild.js
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
var find;
var init_selectChild = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChild.js"() {
    init_matcher();
    find = Array.prototype.find;
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChildren.js
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
var filter;
var init_selectChildren = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChildren.js"() {
    init_matcher();
    filter = Array.prototype.filter;
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}
var init_filter = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/filter.js"() {
    init_selection();
    init_matcher();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}
var init_sparse = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sparse.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
var init_enter = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/enter.js"() {
    init_sparse();
    init_selection();
    EnterNode.prototype = {
      constructor: EnterNode,
      appendChild: function(child) {
        return this._parent.insertBefore(child, this._next);
      },
      insertBefore: function(child, next) {
        return this._parent.insertBefore(child, next);
      },
      querySelector: function(selector) {
        return this._parent.querySelector(selector);
      },
      querySelectorAll: function(selector) {
        return this._parent.querySelectorAll(selector);
      }
    };
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/constant.js
function constant_default(x) {
  return function() {
    return x;
  };
}
var init_constant = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/constant.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key2) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key2.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key2.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key2) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key2 ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant_default(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key2);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}
var init_data = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/data.js"() {
    init_selection();
    init_enter();
    init_constant();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}
var init_exit = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/exit.js"() {
    init_sparse();
    init_selection();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
var init_join = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/join.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/merge.js
function merge_default(context2) {
  var selection2 = context2.selection ? context2.selection() : context2;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}
var init_merge = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/merge.js"() {
    init_selection();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
var init_order = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/order.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
var init_sort = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sort.js"() {
    init_selection();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
var init_call = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/call.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}
var init_nodes = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/nodes.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}
var init_node = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/node.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size = 0;
  for (const node of this) ++size;
  return size;
}
var init_size = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/size.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}
var init_empty = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/empty.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
var init_each = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/each.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name, value) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
var init_attr = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/attr.js"() {
    init_namespace();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
var init_window = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/window.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}
function style_default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}
var init_style = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/style.js"() {
    init_window();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}
function property_default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
var init_property = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/property.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
var init_classed = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/classed.js"() {
    ClassList.prototype = {
      add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
          this._names.push(name);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
          this._names.splice(i, 1);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      contains: function(name) {
        return this._names.indexOf(name) >= 0;
      }
    };
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
var init_text = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/text.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
var init_html = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/html.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}
var init_raise = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/raise.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}
var init_lower = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/lower.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create2 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}
var init_append = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/append.js"() {
    init_creator();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
var init_insert = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/insert.js"() {
    init_creator();
    init_selector();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}
var init_remove = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/remove.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
var init_clone = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/clone.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
var init_datum = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/datum.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}
function onAdd(typename, value, options2) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options2);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options2);
    o = { type: typename.type, name: typename.name, value, listener, options: options2 };
    if (!on) this.__on = [o];
    else on.push(o);
  };
}
function on_default(typename, value, options2) {
  var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options2));
  return this;
}
var init_on = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/on.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params) event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}
var init_dispatch2 = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/dispatch.js"() {
    init_window();
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}
var init_iterator = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/iterator.js"() {
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/index.js
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root2);
}
function selection_selection() {
  return this;
}
var root2, selection_default;
var init_selection = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/index.js"() {
    init_select();
    init_selectAll();
    init_selectChild();
    init_selectChildren();
    init_filter();
    init_data();
    init_enter();
    init_exit();
    init_join();
    init_merge();
    init_order();
    init_sort();
    init_call();
    init_nodes();
    init_node();
    init_size();
    init_empty();
    init_each();
    init_attr();
    init_style();
    init_property();
    init_classed();
    init_text();
    init_html();
    init_raise();
    init_lower();
    init_append();
    init_insert();
    init_remove();
    init_clone();
    init_datum();
    init_on();
    init_dispatch2();
    init_iterator();
    root2 = [null];
    Selection.prototype = selection.prototype = {
      constructor: Selection,
      select: select_default,
      selectAll: selectAll_default,
      selectChild: selectChild_default,
      selectChildren: selectChildren_default,
      filter: filter_default,
      data: data_default,
      enter: enter_default,
      exit: exit_default,
      join: join_default,
      merge: merge_default,
      selection: selection_selection,
      order: order_default,
      sort: sort_default,
      call: call_default,
      nodes: nodes_default,
      node: node_default,
      size: size_default,
      empty: empty_default,
      each: each_default,
      attr: attr_default,
      style: style_default,
      property: property_default,
      classed: classed_default,
      text: text_default,
      html: html_default,
      raise: raise_default,
      lower: lower_default,
      append: append_default,
      insert: insert_default,
      remove: remove_default,
      clone: clone_default,
      datum: datum_default,
      on: on_default,
      dispatch: dispatch_default2,
      [Symbol.iterator]: iterator_default
    };
    selection_default = selection;
  }
});

// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/index.js
var init_src4 = __esm({
  "node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/index.js"() {
    init_matcher();
    init_namespace();
    init_selection();
    init_selector();
    init_selectorAll();
    init_style();
  }
});

// node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/index.js
var init_src5 = __esm({
  "node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key2 in definition) prototype[key2] = definition[key2];
  return prototype;
}
var init_define = __esm({
  "node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/define.js"() {
  }
});

// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/color.js
function Color() {
}
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r2, g, b, a) {
  if (a <= 0) r2 = g = b = NaN;
  return new Rgb(r2, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r2, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r2) : new Rgb(r2, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r2, g, b, opacity) {
  this.r = +r2;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s2, l, a) {
  if (a <= 0) h = s2 = l = NaN;
  else if (l <= 0 || l >= 1) h = s2 = NaN;
  else if (s2 <= 0) h = NaN;
  return new Hsl(h, s2, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r2 = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r2, g, b), max2 = Math.max(r2, g, b), h = NaN, s2 = max2 - min2, l = (max2 + min2) / 2;
  if (s2) {
    if (r2 === max2) h = (g - b) / s2 + (g < b) * 6;
    else if (g === max2) h = (b - r2) / s2 + 2;
    else h = (r2 - g) / s2 + 4;
    s2 /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s2 = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s2, l, o.opacity);
}
function hsl(h, s2, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s2, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s2, l, opacity) {
  this.h = +h;
  this.s = +s2;
  this.l = +l;
  this.opacity = +opacity;
}
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
var darker, brighter, reI, reN, reP, reHex, reRgbInteger, reRgbPercent, reRgbaInteger, reRgbaPercent, reHslPercent, reHslaPercent, named;
var init_color = __esm({
  "node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/color.js"() {
    init_define();
    darker = 0.7;
    brighter = 1 / darker;
    reI = "\\s*([+-]?\\d+)\\s*";
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
    reHex = /^#([0-9a-f]{3,8})$/;
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
    named = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074
    };
    define_default(Color, color, {
      copy(channels) {
        return Object.assign(new this.constructor(), this, channels);
      },
      displayable() {
        return this.rgb().displayable();
      },
      hex: color_formatHex,
      // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHex8: color_formatHex8,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });
    define_default(Rgb, rgb, extend(Color, {
      brighter(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb() {
        return this;
      },
      clamp() {
        return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
      },
      displayable() {
        return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex,
      // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatHex8: rgb_formatHex8,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));
    define_default(Hsl, hsl, extend(Color, {
      brighter(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb() {
        var h = this.h % 360 + (this.h < 0) * 360, s2 = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s2, m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      clamp() {
        return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
      },
      displayable() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl() {
        const a = clampa(this.opacity);
        return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
      }
    }));
  }
});

// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/index.js
var init_src6 = __esm({
  "node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/index.js"() {
    init_color();
  }
});

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/basis.js
function basis(t12, v0, v1, v2, v3) {
  var t2 = t12 * t12, t3 = t2 * t12;
  return ((1 - 3 * t12 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t12 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
var init_basis = __esm({
  "node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/basis.js"() {
  }
});

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
var init_basisClosed = __esm({
  "node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/basisClosed.js"() {
    init_basis();
  }
});

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/constant.js
var constant_default2;
var init_constant2 = __esm({
  "node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/constant.js"() {
    constant_default2 = (x) => () => x;
  }
});

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant_default2(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default2(isNaN(a) ? b : a);
}
var init_color2 = __esm({
  "node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/color.js"() {
    init_constant2();
  }
});

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/rgb.js
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r2 = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r2[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r2 = spline(r2);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r2(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgb_default, rgbBasis, rgbBasisClosed;
var init_rgb = __esm({
  "node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/rgb.js"() {
    init_src6();
    init_basis();
    init_basisClosed();
    init_color2();
    rgb_default = function rgbGamma(y) {
      var color2 = gamma(y);
      function rgb2(start2, end) {
        var r2 = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
        return function(t) {
          start2.r = r2(t);
          start2.g = g(t);
          start2.b = b(t);
          start2.opacity = opacity(t);
          return start2 + "";
        };
      }
      rgb2.gamma = rgbGamma;
      return rgb2;
    }(1);
    rgbBasis = rgbSpline(basis_default);
    rgbBasisClosed = rgbSpline(basisClosed_default);
  }
});

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}
var init_number = __esm({
  "node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/number.js"() {
  }
});

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/string.js
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s2 = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s2[i]) s2[i] += bs;
      else s2[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s2[i]) s2[i] += bm;
      else s2[++i] = bm;
    } else {
      s2[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s2[i]) s2[i] += bs;
    else s2[++i] = bs;
  }
  return s2.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s2[(o = q[i2]).i] = o.x(t);
    return s2.join("");
  });
}
var reA, reB;
var init_string = __esm({
  "node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/string.js"() {
    init_number();
    reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    reB = new RegExp(reA.source, "g");
  }
});

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/decompose.js
function decompose_default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}
var degrees, identity;
var init_decompose = __esm({
  "node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/decompose.js"() {
    degrees = 180 / Math.PI;
    identity = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };
  }
});

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/parse.js
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}
var svgNode;
var init_parse = __esm({
  "node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/parse.js"() {
    init_decompose();
  }
});

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse2, pxComma, pxParen, degParen) {
  function pop3(s2) {
    return s2.length ? s2.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s2, q) {
    if (xa !== xb || ya !== yb) {
      var i = s2.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s2.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s2, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({ i: s2.push(pop3(s2) + "rotate(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s2.push(pop3(s2) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s2, q) {
    if (a !== b) {
      q.push({ i: s2.push(pop3(s2) + "skewX(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s2.push(pop3(s2) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s2, q) {
    if (xa !== xb || ya !== yb) {
      var i = s2.push(pop3(s2) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s2.push(pop3(s2) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s2 = [], q = [];
    a = parse2(a), b = parse2(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s2, q);
    rotate(a.rotate, b.rotate, s2, q);
    skewX(a.skewX, b.skewX, s2, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s2, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s2[(o = q[i]).i] = o.x(t);
      return s2.join("");
    };
  };
}
var interpolateTransformCss, interpolateTransformSvg;
var init_transform = __esm({
  "node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/index.js"() {
    init_number();
    init_parse();
    interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
  }
});

// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/index.js
var init_src7 = __esm({
  "node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/index.js"() {
    init_number();
    init_string();
    init_transform();
    init_rgb();
  }
});

// node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timer.js
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t02, t12 = taskHead, t2, time = Infinity;
  while (t12) {
    if (t12._call) {
      if (time > t12._time) time = t12._time;
      t02 = t12, t12 = t12._next;
    } else {
      t2 = t12._next, t12._next = null;
      t12 = t02 ? t02._next = t2 : taskHead = t2;
    }
  }
  taskTail = t02;
  sleep(time);
}
function sleep(time) {
  if (frame) return;
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
var frame, timeout, interval, pokeDelay, taskHead, taskTail, clockLast, clockNow, clockSkew, clock, setFrame;
var init_timer = __esm({
  "node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timer.js"() {
    frame = 0;
    timeout = 0;
    interval = 0;
    pokeDelay = 1e3;
    clockLast = 0;
    clockNow = 0;
    clockSkew = 0;
    clock = typeof performance === "object" && performance.now ? performance : Date;
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
      setTimeout(f, 17);
    };
    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
          if (taskTail) taskTail._next = this;
          else taskHead = this;
          taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
      },
      stop: function() {
        if (this._call) {
          this._call = null;
          this._time = Infinity;
          sleep();
        }
      }
    };
  }
});

// node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
var init_timeout = __esm({
  "node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timeout.js"() {
    init_timer();
  }
});

// node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/index.js
var init_src8 = __esm({
  "node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/index.js"() {
    init_timer();
    init_timeout();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/schedule.js
function schedule_default(node, name, id2, index9, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id2 in schedules) return;
  create(node, id2, {
    name,
    index: index9,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init2(node, id2) {
  var schedule = get4(node, id2);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}
function set3(node, id2) {
  var schedule = get4(node, id2);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}
function get4(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2])) throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self) {
  var schedules = node.__transition, tween;
  schedules[id2] = self;
  self.timer = timer(schedule, 0, self.time);
  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start2, self.delay, self.time);
    if (self.delay <= elapsed) start2(elapsed - self.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self.state !== SCHEDULED) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;
      if (o.state === STARTED) return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return;
    self.state = STARTED;
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id2];
    for (var i in schedules) return;
    delete node.__transition;
  }
}
var emptyOn, emptyTween, CREATED, SCHEDULED, STARTING, STARTED, RUNNING, ENDING, ENDED;
var init_schedule = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/schedule.js"() {
    init_src3();
    init_src8();
    emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
    emptyTween = [];
    CREATED = 0;
    SCHEDULED = 1;
    STARTING = 2;
    STARTED = 3;
    RUNNING = 4;
    ENDING = 5;
    ENDED = 6;
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty2 = true, i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty2) delete node.__transition;
}
var init_interrupt = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/interrupt.js"() {
    init_schedule();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}
var init_interrupt2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/interrupt.js"() {
    init_interrupt();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule = set3(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule = set3(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get4(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition2, name, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set3(this, id2);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get4(node, id2).value[name];
  };
}
var init_tween = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/tween.js"() {
    init_schedule();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a, b) {
  var c;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}
var init_interpolate = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/interpolate.js"() {
    init_src6();
    init_src7();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value) {
  var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}
var init_attr2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attr.js"() {
    init_src7();
    init_src4();
    init_tween();
    init_interpolate();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t02 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t02 = (i0 = i) && attrInterpolate(name, i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name, value) {
  var key2 = "attr." + name;
  if (arguments.length < 2) return (key2 = this.tween(key2)) && key2._value;
  if (value == null) return this.tween(key2, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key2, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
var init_attrTween = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attrTween.js"() {
    init_src4();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value) {
  return function() {
    init2(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init2(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get4(this.node(), id2).delay;
}
var init_delay = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/delay.js"() {
    init_schedule();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value) {
  return function() {
    set3(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set3(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get4(this.node(), id2).duration;
}
var init_duration = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/duration.js"() {
    init_schedule();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set3(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get4(this.node(), id2).ease;
}
var init_ease = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/ease.js"() {
    init_schedule();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    set3(this, id2).ease = v;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}
var init_easeVarying = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/easeVarying.js"() {
    init_schedule();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}
var init_filter2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/filter.js"() {
    init_src4();
    init_transition2();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}
var init_merge2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/merge.js"() {
    init_transition2();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init2 : set3;
  return function() {
    var schedule = sit(this, id2), on = schedule.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get4(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}
var init_on2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/on.js"() {
    init_schedule();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id2) return;
    if (parent) parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}
var init_remove2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/remove.js"() {
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/select.js
function select_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function") select = selector_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name, id2, i, subgroup, get4(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}
var init_select2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/select.js"() {
    init_src4();
    init_transition2();
    init_schedule();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default2(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function") select = selectorAll_default(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select.call(node, node.__data__, i, group), child, inherit2 = get4(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}
var init_selectAll2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selectAll.js"() {
    init_src4();
    init_transition2();
    init_schedule();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selection.js
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}
var Selection2;
var init_selection2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selection.js"() {
    init_src4();
    Selection2 = selection_default.prototype.constructor;
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key2 = "style." + name, event = "end." + key2, remove2;
  return function() {
    var schedule = set3(this, id2), on = schedule.on, listener = schedule.value[key2] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
}
var init_style2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/style.js"() {
    init_src7();
    init_src4();
    init_schedule();
    init_tween();
    init_interpolate();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name, value, priority) {
  var key2 = "style." + (name += "");
  if (arguments.length < 2) return (key2 = this.tween(key2)) && key2._value;
  if (value == null) return this.tween(key2, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key2, styleTween(name, value, priority == null ? "" : priority));
}
var init_styleTween = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/styleTween.js"() {
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}
var init_text2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/text.js"() {
    init_tween();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t02, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t02 = (i0 = i) && textInterpolate(i);
    return t02;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key2 = "text";
  if (arguments.length < 1) return (key2 = this.tween(key2)) && key2._value;
  if (value == null) return this.tween(key2, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key2, textTween(value));
}
var init_textTween = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/textTween.js"() {
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit2 = get4(node, id0);
        schedule_default(node, name, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}
var init_transition = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/transition.js"() {
    init_transition2();
    init_schedule();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve2, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0) resolve2();
    } };
    that.each(function() {
      var schedule = set3(this, id2), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0) resolve2();
  });
}
var init_end = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/end.js"() {
    init_schedule();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/index.js
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function transition(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var id, selection_prototype;
var init_transition2 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/index.js"() {
    init_src4();
    init_attr2();
    init_attrTween();
    init_delay();
    init_duration();
    init_ease();
    init_easeVarying();
    init_filter2();
    init_merge2();
    init_on2();
    init_remove2();
    init_select2();
    init_selectAll2();
    init_selection2();
    init_style2();
    init_styleTween();
    init_text2();
    init_textTween();
    init_transition();
    init_tween();
    init_end();
    id = 0;
    selection_prototype = selection_default.prototype;
    Transition.prototype = transition.prototype = {
      constructor: Transition,
      select: select_default2,
      selectAll: selectAll_default2,
      selectChild: selection_prototype.selectChild,
      selectChildren: selection_prototype.selectChildren,
      filter: filter_default2,
      merge: merge_default2,
      selection: selection_default2,
      transition: transition_default,
      call: selection_prototype.call,
      nodes: selection_prototype.nodes,
      node: selection_prototype.node,
      size: selection_prototype.size,
      empty: selection_prototype.empty,
      each: selection_prototype.each,
      on: on_default2,
      attr: attr_default2,
      attrTween: attrTween_default,
      style: style_default2,
      styleTween: styleTween_default,
      text: text_default2,
      textTween: textTween_default,
      remove: remove_default2,
      tween: tween_default,
      delay: delay_default,
      duration: duration_default,
      ease: ease_default,
      easeVarying: easeVarying_default,
      end: end_default,
      [Symbol.iterator]: selection_prototype[Symbol.iterator]
    };
  }
});

// node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var init_cubic = __esm({
  "node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/cubic.js"() {
  }
});

// node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/index.js
var init_src9 = __esm({
  "node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/index.js"() {
    init_cubic();
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/transition.js
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default(node, name, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}
var defaultTiming;
var init_transition3 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/transition.js"() {
    init_transition2();
    init_schedule();
    init_src9();
    init_src8();
    defaultTiming = {
      time: null,
      // Set on use.
      delay: 0,
      duration: 250,
      ease: cubicInOut
    };
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/index.js
var init_selection3 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/index.js"() {
    init_src4();
    init_interrupt2();
    init_transition3();
    selection_default.prototype.interrupt = interrupt_default2;
    selection_default.prototype.transition = transition_default2;
  }
});

// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/index.js
var init_src10 = __esm({
  "node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/index.js"() {
    init_selection3();
  }
});

// node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/constant.js
var init_constant3 = __esm({
  "node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/constant.js"() {
  }
});

// node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/event.js
var init_event = __esm({
  "node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/event.js"() {
  }
});

// node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/noevent.js
var init_noevent = __esm({
  "node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/noevent.js"() {
  }
});

// node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/brush.js
function number1(e) {
  return [+e[0], +e[1]];
}
function number2(e) {
  return [number1(e[0]), number1(e[1])];
}
function type(t) {
  return { type: t };
}
var abs, max, min, X, Y, XY;
var init_brush = __esm({
  "node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/brush.js"() {
    init_src10();
    init_constant3();
    init_event();
    init_noevent();
    ({ abs, max, min } = Math);
    X = {
      name: "x",
      handles: ["w", "e"].map(type),
      input: function(x, e) {
        return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]];
      },
      output: function(xy) {
        return xy && [xy[0][0], xy[1][0]];
      }
    };
    Y = {
      name: "y",
      handles: ["n", "s"].map(type),
      input: function(y, e) {
        return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]];
      },
      output: function(xy) {
        return xy && [xy[0][1], xy[1][1]];
      }
    };
    XY = {
      name: "xy",
      handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
      input: function(xy) {
        return xy == null ? null : number2(xy);
      },
      output: function(xy) {
        return xy;
      }
    };
  }
});

// node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/index.js
var init_src11 = __esm({
  "node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/index.js"() {
    init_brush();
  }
});

// node_modules/.pnpm/d3-path@3.1.0/node_modules/d3-path/src/index.js
var init_src12 = __esm({
  "node_modules/.pnpm/d3-path@3.1.0/node_modules/d3-path/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-chord@3.0.1/node_modules/d3-chord/src/index.js
var init_src13 = __esm({
  "node_modules/.pnpm/d3-chord@3.0.1/node_modules/d3-chord/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-contour@4.0.2/node_modules/d3-contour/src/index.js
var init_src14 = __esm({
  "node_modules/.pnpm/d3-contour@4.0.2/node_modules/d3-contour/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-delaunay@6.0.4/node_modules/d3-delaunay/src/index.js
var init_src15 = __esm({
  "node_modules/.pnpm/d3-delaunay@6.0.4/node_modules/d3-delaunay/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-dsv@3.0.1/node_modules/d3-dsv/src/dsv.js
function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + '] || ""';
  }).join(",") + "}");
}
function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}
function inferColumns(rows) {
  var columnSet = /* @__PURE__ */ Object.create(null), columns = [];
  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });
  return columns;
}
function pad(value, width) {
  var s2 = value + "", length = s2.length;
  return length < width ? new Array(width - length + 1).join(0) + s2 : s2;
}
function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6) : year > 9999 ? "+" + pad(year, 6) : pad(year, 4);
}
function formatDate(date) {
  var hours = date.getUTCHours(), minutes = date.getUTCMinutes(), seconds = date.getUTCSeconds(), milliseconds = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date" : formatYear(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2) + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z" : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z" : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z" : "");
}
function dsv_default(delimiter) {
  var reFormat = new RegExp('["' + delimiter + "\n\r]"), DELIMITER = delimiter.charCodeAt(0);
  function parse2(text2, f) {
    var convert, columns, rows = parseRows(text2, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }
  function parseRows(text2, f) {
    var rows = [], N = text2.length, I = 0, n = 0, t, eof = N <= 0, eol = false;
    if (text2.charCodeAt(N - 1) === NEWLINE) --N;
    if (text2.charCodeAt(N - 1) === RETURN) --N;
    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;
      var i, j = I, c;
      if (text2.charCodeAt(j) === QUOTE) {
        while (I++ < N && text2.charCodeAt(I) !== QUOTE || text2.charCodeAt(++I) === QUOTE) ;
        if ((i = I) >= N) eof = true;
        else if ((c = text2.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) {
          eol = true;
          if (text2.charCodeAt(I) === NEWLINE) ++I;
        }
        return text2.slice(j + 1, i - 1).replace(/""/g, '"');
      }
      while (I < N) {
        if ((c = text2.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) {
          eol = true;
          if (text2.charCodeAt(I) === NEWLINE) ++I;
        } else if (c !== DELIMITER) continue;
        return text2.slice(j, i);
      }
      return eof = true, text2.slice(j, N);
    }
    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }
    return rows;
  }
  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }
  function format2(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }
  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }
  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }
  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }
  function formatValue(value) {
    return value == null ? "" : value instanceof Date ? formatDate(value) : reFormat.test(value += "") ? '"' + value.replace(/"/g, '""') + '"' : value;
  }
  return {
    parse: parse2,
    parseRows,
    format: format2,
    formatBody,
    formatRows,
    formatRow,
    formatValue
  };
}
var EOL, EOF, QUOTE, NEWLINE, RETURN;
var init_dsv = __esm({
  "node_modules/.pnpm/d3-dsv@3.0.1/node_modules/d3-dsv/src/dsv.js"() {
    EOL = {};
    EOF = {};
    QUOTE = 34;
    NEWLINE = 10;
    RETURN = 13;
  }
});

// node_modules/.pnpm/d3-dsv@3.0.1/node_modules/d3-dsv/src/tsv.js
var tsv, tsvParse, tsvParseRows, tsvFormat, tsvFormatBody, tsvFormatRows, tsvFormatRow, tsvFormatValue;
var init_tsv = __esm({
  "node_modules/.pnpm/d3-dsv@3.0.1/node_modules/d3-dsv/src/tsv.js"() {
    init_dsv();
    tsv = dsv_default("	");
    tsvParse = tsv.parse;
    tsvParseRows = tsv.parseRows;
    tsvFormat = tsv.format;
    tsvFormatBody = tsv.formatBody;
    tsvFormatRows = tsv.formatRows;
    tsvFormatRow = tsv.formatRow;
    tsvFormatValue = tsv.formatValue;
  }
});

// node_modules/.pnpm/d3-dsv@3.0.1/node_modules/d3-dsv/src/index.js
var init_src16 = __esm({
  "node_modules/.pnpm/d3-dsv@3.0.1/node_modules/d3-dsv/src/index.js"() {
    init_tsv();
  }
});

// node_modules/.pnpm/d3-fetch@3.0.1/node_modules/d3-fetch/src/index.js
var init_src17 = __esm({
  "node_modules/.pnpm/d3-fetch@3.0.1/node_modules/d3-fetch/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/index.js
var init_src18 = __esm({
  "node_modules/.pnpm/d3-quadtree@3.0.1/node_modules/d3-quadtree/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-force@3.0.0/node_modules/d3-force/src/index.js
var init_src19 = __esm({
  "node_modules/.pnpm/d3-force@3.0.0/node_modules/d3-force/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null;
  var i, coefficient = x.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}
var init_formatDecimal = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatDecimal.js"() {
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/exponent.js
function exponent_default(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}
var init_exponent = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/exponent.js"() {
    init_formatDecimal();
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}
var init_formatGroup = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatGroup.js"() {
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}
var init_formatNumerals = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatNumerals.js"() {
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatSpecifier.js
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
var re;
var init_formatSpecifier = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatSpecifier.js"() {
    re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
    formatSpecifier.prototype = FormatSpecifier.prototype;
    FormatSpecifier.prototype.toString = function() {
      return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
    };
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s2) {
  out: for (var n = s2.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s2[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s2[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s2.slice(0, i0) + s2.slice(i1 + 1) : s2;
}
var init_formatTrim = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatTrim.js"() {
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatPrefixAuto.js
function formatPrefixAuto_default(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0];
}
var prefixExponent;
var init_formatPrefixAuto = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatPrefixAuto.js"() {
    init_formatDecimal();
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}
var init_formatRounded = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatRounded.js"() {
    init_formatDecimal();
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatTypes.js
var formatTypes_default;
var init_formatTypes = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/formatTypes.js"() {
    init_formatDecimal();
    init_formatPrefixAuto();
    init_formatRounded();
    formatTypes_default = {
      "%": (x, p) => (x * 100).toFixed(p),
      "b": (x) => Math.round(x).toString(2),
      "c": (x) => x + "",
      "d": formatDecimal_default,
      "e": (x, p) => x.toExponential(p),
      "f": (x, p) => x.toFixed(p),
      "g": (x, p) => x.toPrecision(p),
      "o": (x) => Math.round(x).toString(8),
      "p": (x, p) => formatRounded_default(x * 100, p),
      "r": formatRounded_default,
      "s": formatPrefixAuto_default,
      "X": (x) => Math.round(x).toString(16).toUpperCase(),
      "x": (x) => Math.round(x).toString(16)
    };
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/identity.js
function identity_default(x) {
  return x;
}
var init_identity = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/identity.js"() {
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/locale.js
function locale_default(locale3) {
  var group = locale3.grouping === void 0 || locale3.thousands === void 0 ? identity_default : formatGroup_default(map.call(locale3.grouping, Number), locale3.thousands + ""), currencyPrefix = locale3.currency === void 0 ? "" : locale3.currency[0] + "", currencySuffix = locale3.currency === void 0 ? "" : locale3.currency[1] + "", decimal = locale3.decimal === void 0 ? "." : locale3.decimal + "", numerals = locale3.numerals === void 0 ? identity_default : formatNumerals_default(map.call(locale3.numerals, String)), percent = locale3.percent === void 0 ? "%" : locale3.percent + "", minus = locale3.minus === void 0 ? "\u2212" : locale3.minus + "", nan = locale3.nan === void 0 ? "NaN" : locale3.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type2 = specifier.type;
    if (type2 === "n") comma = true, type2 = "g";
    else if (!formatTypes_default[type2]) precision === void 0 && (precision = 12), trim = true, type2 = "g";
    if (zero2 || fill === "0" && align === "=") zero2 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type2) ? "0" + type2.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type2) ? percent : "";
    var formatType = formatTypes_default[type2], maybeSuffix = /[defgprs%]/.test(type2);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type2) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
      if (type2 === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim) value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type2 === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero2) value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero2) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
    return function(value2) {
      return f(k * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}
var map, prefixes;
var init_locale = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/locale.js"() {
    init_exponent();
    init_formatGroup();
    init_formatNumerals();
    init_formatSpecifier();
    init_formatTrim();
    init_formatTypes();
    init_formatPrefixAuto();
    init_identity();
    map = Array.prototype.map;
    prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/defaultLocale.js
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}
var locale, format, formatPrefix;
var init_defaultLocale = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/defaultLocale.js"() {
    init_locale();
    defaultLocale({
      thousands: ",",
      grouping: [3],
      currency: ["$", ""]
    });
  }
});

// node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/index.js
var init_src20 = __esm({
  "node_modules/.pnpm/d3-format@3.1.0/node_modules/d3-format/src/index.js"() {
    init_defaultLocale();
  }
});

// node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/index.js
var init_src21 = __esm({
  "node_modules/.pnpm/d3-geo@3.1.1/node_modules/d3-geo/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/index.js
var init_src22 = __esm({
  "node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-polygon@3.0.1/node_modules/d3-polygon/src/index.js
var init_src23 = __esm({
  "node_modules/.pnpm/d3-polygon@3.0.1/node_modules/d3-polygon/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/index.js
var init_src24 = __esm({
  "node_modules/.pnpm/d3-random@3.0.1/node_modules/d3-random/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/interval.js
function timeInterval(floori, offseti, count, field) {
  function interval2(date) {
    return floori(date = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date)), date;
  }
  interval2.floor = (date) => {
    return floori(date = /* @__PURE__ */ new Date(+date)), date;
  };
  interval2.ceil = (date) => {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };
  interval2.round = (date) => {
    const d0 = interval2(date), d1 = interval2.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };
  interval2.offset = (date, step) => {
    return offseti(date = /* @__PURE__ */ new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };
  interval2.range = (start2, stop, step) => {
    const range = [];
    start2 = interval2.ceil(start2);
    step = step == null ? 1 : Math.floor(step);
    if (!(start2 < stop) || !(step > 0)) return range;
    let previous;
    do
      range.push(previous = /* @__PURE__ */ new Date(+start2)), offseti(start2, step), floori(start2);
    while (previous < start2 && start2 < stop);
    return range;
  };
  interval2.filter = (test) => {
    return timeInterval((date) => {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, (date, step) => {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {
          }
        }
        else while (--step >= 0) {
          while (offseti(date, 1), !test(date)) {
          }
        }
      }
    });
  };
  if (count) {
    interval2.count = (start2, end) => {
      t0.setTime(+start2), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };
    interval2.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval2 : interval2.filter(field ? (d) => field(d) % step === 0 : (d) => interval2.count(0, d) % step === 0);
    };
  }
  return interval2;
}
var t0, t1;
var init_interval = __esm({
  "node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/interval.js"() {
    t0 = /* @__PURE__ */ new Date();
    t1 = /* @__PURE__ */ new Date();
  }
});

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/duration.js
var durationSecond, durationMinute, durationHour, durationDay, durationWeek, durationMonth, durationYear;
var init_duration2 = __esm({
  "node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/duration.js"() {
    durationSecond = 1e3;
    durationMinute = durationSecond * 60;
    durationHour = durationMinute * 60;
    durationDay = durationHour * 24;
    durationWeek = durationDay * 7;
    durationMonth = durationDay * 30;
    durationYear = durationDay * 365;
  }
});

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/day.js
var timeDay, timeDays, utcDay, utcDays, unixDay, unixDays;
var init_day = __esm({
  "node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/day.js"() {
    init_interval();
    init_duration2();
    timeDay = timeInterval(
      (date) => date.setHours(0, 0, 0, 0),
      (date, step) => date.setDate(date.getDate() + step),
      (start2, end) => (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationDay,
      (date) => date.getDate() - 1
    );
    timeDays = timeDay.range;
    utcDay = timeInterval((date) => {
      date.setUTCHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setUTCDate(date.getUTCDate() + step);
    }, (start2, end) => {
      return (end - start2) / durationDay;
    }, (date) => {
      return date.getUTCDate() - 1;
    });
    utcDays = utcDay.range;
    unixDay = timeInterval((date) => {
      date.setUTCHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setUTCDate(date.getUTCDate() + step);
    }, (start2, end) => {
      return (end - start2) / durationDay;
    }, (date) => {
      return Math.floor(date / durationDay);
    });
    unixDays = unixDay.range;
  }
});

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/week.js
function timeWeekday(i) {
  return timeInterval((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start2, end) => {
    return (end - start2 - (end.getTimezoneOffset() - start2.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
function utcWeekday(i) {
  return timeInterval((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start2, end) => {
    return (end - start2) / durationWeek;
  });
}
var timeSunday, timeMonday, timeTuesday, timeWednesday, timeThursday, timeFriday, timeSaturday, timeSundays, timeMondays, timeTuesdays, timeWednesdays, timeThursdays, timeFridays, timeSaturdays, utcSunday, utcMonday, utcTuesday, utcWednesday, utcThursday, utcFriday, utcSaturday, utcSundays, utcMondays, utcTuesdays, utcWednesdays, utcThursdays, utcFridays, utcSaturdays;
var init_week = __esm({
  "node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/week.js"() {
    init_interval();
    init_duration2();
    timeSunday = timeWeekday(0);
    timeMonday = timeWeekday(1);
    timeTuesday = timeWeekday(2);
    timeWednesday = timeWeekday(3);
    timeThursday = timeWeekday(4);
    timeFriday = timeWeekday(5);
    timeSaturday = timeWeekday(6);
    timeSundays = timeSunday.range;
    timeMondays = timeMonday.range;
    timeTuesdays = timeTuesday.range;
    timeWednesdays = timeWednesday.range;
    timeThursdays = timeThursday.range;
    timeFridays = timeFriday.range;
    timeSaturdays = timeSaturday.range;
    utcSunday = utcWeekday(0);
    utcMonday = utcWeekday(1);
    utcTuesday = utcWeekday(2);
    utcWednesday = utcWeekday(3);
    utcThursday = utcWeekday(4);
    utcFriday = utcWeekday(5);
    utcSaturday = utcWeekday(6);
    utcSundays = utcSunday.range;
    utcMondays = utcMonday.range;
    utcTuesdays = utcTuesday.range;
    utcWednesdays = utcWednesday.range;
    utcThursdays = utcThursday.range;
    utcFridays = utcFriday.range;
    utcSaturdays = utcSaturday.range;
  }
});

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/year.js
var timeYear, timeYears, utcYear, utcYears;
var init_year = __esm({
  "node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/year.js"() {
    init_interval();
    timeYear = timeInterval((date) => {
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setFullYear(date.getFullYear() + step);
    }, (start2, end) => {
      return end.getFullYear() - start2.getFullYear();
    }, (date) => {
      return date.getFullYear();
    });
    timeYear.every = (k) => {
      return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
        date.setFullYear(Math.floor(date.getFullYear() / k) * k);
        date.setMonth(0, 1);
        date.setHours(0, 0, 0, 0);
      }, (date, step) => {
        date.setFullYear(date.getFullYear() + step * k);
      });
    };
    timeYears = timeYear.range;
    utcYear = timeInterval((date) => {
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setUTCFullYear(date.getUTCFullYear() + step);
    }, (start2, end) => {
      return end.getUTCFullYear() - start2.getUTCFullYear();
    }, (date) => {
      return date.getUTCFullYear();
    });
    utcYear.every = (k) => {
      return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
        date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
        date.setUTCMonth(0, 1);
        date.setUTCHours(0, 0, 0, 0);
      }, (date, step) => {
        date.setUTCFullYear(date.getUTCFullYear() + step * k);
      });
    };
    utcYears = utcYear.range;
  }
});

// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/index.js
var init_src25 = __esm({
  "node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/index.js"() {
    init_day();
    init_week();
    init_year();
  }
});

// node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/locale.js
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y, m, d) {
  return { y, m, d, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale3) {
  var locale_dateTime = locale3.dateTime, locale_date = locale3.date, locale_time = locale3.time, locale_periods = locale3.periods, locale_weekdays = locale3.days, locale_shortWeekdays = locale3.shortDays, locale_months = locale3.months, locale_shortMonths = locale3.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear2,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date) {
      var string = [], i = -1, j = 0, n = specifier.length, c, pad3, format2;
      if (!(date instanceof Date)) date = /* @__PURE__ */ new Date(+date);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad3 = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad3 = c === "e" ? " " : "0";
          if (format2 = formats2[c]) c = format2(date, pad3);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, void 0, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
      if (i != string.length) return null;
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z && !("Z" in d)) d.Z = 0;
      if ("p" in d) d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0) d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j) {
    var i = 0, n = specifier.length, m = string.length, c, parse2;
    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse2 = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse2 || (j = parse2(d, string, j)) < 0) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }
  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }
  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() {
        return specifier;
      };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() {
        return specifier;
      };
      return p;
    }
  };
}
function pad2(value, fill, width) {
  var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s2) {
  return s2.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad2(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad2(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad2(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad2(1 + timeDay.count(timeYear(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad2(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad2(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad2(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad2(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
  return pad2(timeSunday.count(timeYear(d) - 1, d), p, 2);
}
function dISO(d) {
  var day = d.getDay();
  return day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
}
function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad2(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad2(timeMonday.count(timeYear(d) - 1, d), p, 2);
}
function formatYear2(d, p) {
  return pad2(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
  d = dISO(d);
  return pad2(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad2(d.getFullYear() % 1e4, p, 4);
}
function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? timeThursday(d) : timeThursday.ceil(d);
  return pad2(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad2(z / 60 | 0, "0", 2) + pad2(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad2(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad2(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad2(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad2(1 + utcDay.count(utcYear(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad2(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad2(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad2(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad2(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad2(utcSunday.count(utcYear(d) - 1, d), p, 2);
}
function UTCdISO(d) {
  var day = d.getUTCDay();
  return day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad2(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad2(utcMonday.count(utcYear(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
  return pad2(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad2(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad2(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad2(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}
var pads, numberRe, percentRe, requoteRe;
var init_locale2 = __esm({
  "node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/locale.js"() {
    init_src25();
    pads = { "-": "", "_": " ", "0": "0" };
    numberRe = /^\s*\d+/;
    percentRe = /^%/;
    requoteRe = /[\\^$*+?|[\]().{}]/g;
  }
});

// node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/defaultLocale.js
function defaultLocale2(definition) {
  locale2 = formatLocale(definition);
  timeFormat = locale2.format;
  timeParse = locale2.parse;
  utcFormat = locale2.utcFormat;
  utcParse = locale2.utcParse;
  return locale2;
}
var locale2, timeFormat, timeParse, utcFormat, utcParse;
var init_defaultLocale2 = __esm({
  "node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/defaultLocale.js"() {
    init_locale2();
    defaultLocale2({
      dateTime: "%x, %X",
      date: "%-m/%-d/%Y",
      time: "%-I:%M:%S %p",
      periods: ["AM", "PM"],
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
  }
});

// node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/index.js
var init_src26 = __esm({
  "node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/index.js"() {
    init_defaultLocale2();
  }
});

// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/index.js
var init_src27 = __esm({
  "node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/index.js
var init_src28 = __esm({
  "node_modules/.pnpm/d3-scale-chromatic@3.1.0/node_modules/d3-scale-chromatic/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/index.js
var init_src29 = __esm({
  "node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/index.js"() {
  }
});

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/constant.js
var init_constant4 = __esm({
  "node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/constant.js"() {
  }
});

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/event.js
var init_event2 = __esm({
  "node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/event.js"() {
  }
});

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/transform.js
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}
function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity2;
  return node.__zoom;
}
var identity2;
var init_transform2 = __esm({
  "node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/transform.js"() {
    Transform.prototype = {
      constructor: Transform,
      scale: function(k) {
        return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
      },
      translate: function(x, y) {
        return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
      },
      apply: function(point) {
        return [point[0] * this.k + this.x, point[1] * this.k + this.y];
      },
      applyX: function(x) {
        return x * this.k + this.x;
      },
      applyY: function(y) {
        return y * this.k + this.y;
      },
      invert: function(location) {
        return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
      },
      invertX: function(x) {
        return (x - this.x) / this.k;
      },
      invertY: function(y) {
        return (y - this.y) / this.k;
      },
      rescaleX: function(x) {
        return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
      },
      rescaleY: function(y) {
        return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
      },
      toString: function() {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
      }
    };
    identity2 = new Transform(1, 0, 0);
    transform.prototype = Transform.prototype;
  }
});

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/noevent.js
var init_noevent2 = __esm({
  "node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/noevent.js"() {
  }
});

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/zoom.js
var init_zoom = __esm({
  "node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/zoom.js"() {
    init_src10();
    init_constant4();
    init_event2();
    init_transform2();
    init_noevent2();
  }
});

// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/index.js
var init_src30 = __esm({
  "node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/index.js"() {
    init_zoom();
    init_transform2();
  }
});

// node_modules/.pnpm/d3@7.9.0/node_modules/d3/src/index.js
var init_src31 = __esm({
  "node_modules/.pnpm/d3@7.9.0/node_modules/d3/src/index.js"() {
    init_src();
    init_src2();
    init_src11();
    init_src13();
    init_src6();
    init_src14();
    init_src15();
    init_src3();
    init_src5();
    init_src16();
    init_src9();
    init_src17();
    init_src19();
    init_src20();
    init_src21();
    init_src22();
    init_src7();
    init_src12();
    init_src23();
    init_src18();
    init_src24();
    init_src27();
    init_src28();
    init_src4();
    init_src29();
    init_src25();
    init_src26();
    init_src8();
    init_src10();
    init_src30();
  }
});

// .svelte-kit/output/server/chunks/Icon.js
function Icon($$payload, $$props) {
  push();
  const {
    name,
    color: color2 = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth = false,
    iconNode = [],
    children: children2,
    $$slots,
    $$events,
    ...props
  } = $$props;
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...props,
      width: size,
      height: size,
      stroke: color2,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      class: clsx([
        "lucide-icon lucide",
        name && `lucide-${name}`,
        props.class
      ])
    },
    null,
    void 0,
    void 0,
    3
  )}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [tag, attrs] = each_array[$$index];
    element($$payload, tag, () => {
      $$payload.out += `${spread_attributes({ ...attrs }, null, void 0, void 0, 3)}`;
    });
  }
  $$payload.out += `<!--]-->`;
  children2?.($$payload);
  $$payload.out += `<!----></svg>`;
  pop();
}
var defaultAttributes;
var init_Icon = __esm({
  ".svelte-kit/output/server/chunks/Icon.js"() {
    init_index2();
    defaultAttributes = {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 2,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    };
  }
});

// .svelte-kit/output/server/chunks/PreviewBook.js
function Circle_alert($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "10" }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "8",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12.01",
        "y1": "16",
        "y2": "16"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "circle-alert" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function BookFront($$payload, $$props) {
  let placeholderImageSrc, notFoundImageSrc;
  let isbn = $$props["isbn"];
  let width = fallback($$props["width"], 174);
  let height = fallback($$props["height"], 285);
  function generatePlaceholderSvg(w, h, color2) {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="${color2}"><rect width="${w}" height="${h}"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }
  let imageLoaded = false;
  let imageError = false;
  let imageSrc = "";
  placeholderImageSrc = generatePlaceholderSvg(width, height, "#f0f0f0");
  notFoundImageSrc = generatePlaceholderSvg(width, height, "#f8d7da");
  {
    if (isbn) {
      imageSrc = `https://image.opencover.jp/v1/cover/front/${isbn}.jpg`;
      imageLoaded = false;
      imageError = false;
    }
  }
  $$payload.out += `<div class="book-front relative flex justify-end h-full svelte-3eft5x">`;
  if (!imageLoaded && !imageError) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img${attr("src", placeholderImageSrc)} alt="\u8AAD\u307F\u8FBC\u307F\u4E2D" class="h-full w-auto">`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <img${attr("src", imageSrc)} alt="\u8868\u7D19\u753B\u50CF"${attr_class(`h-full object-cover ${stringify(!imageLoaded || imageError ? "hidden" : "")}`)}> `;
  if (imageError) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img${attr("src", notFoundImageSrc)} alt="\u753B\u50CF\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093" class="h-full w-auto">`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { isbn, width, height });
}
function BookSpine($$payload, $$props) {
  const { isbn } = $$props;
  const scale = 0.5;
  let width = 65 * scale;
  let height = 865 * scale;
  let containerStyle = "";
  let placeholderImageSrc = generatePlaceholderSvg(width, height, "#f0f0f0");
  function generatePlaceholderSvg(w, h, color2) {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="${color2}"><rect width="${w}" height="${h}"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }
  let imageSrc = `https://image.opencover.jp/v1/cover/spine/${isbn}.webp`;
  $$payload.out += `<div class="h-full relative inline-block"${attr_style(containerStyle)}>`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img${attr("src", placeholderImageSrc)} alt="\u8AAD\u307F\u8FBC\u307F\u4E2D" class="h-full w-auto">`;
  }
  $$payload.out += `<!--]--> <img${attr("src", imageSrc)} alt="\u80CC\u8868\u7D19\u753B\u50CF"${attr_class(`h-full w-auto ${"hidden"}`)} onload="this.__e=event" onerror="this.__e=event">  `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
}
function Book($$payload, $$props) {
  push();
  const { book, tabindex } = $$props;
  `https://image.opencover.jp/v1/cover/spine/${book.isbn}.webp`;
  const scale = 2.5;
  let height = 173 * scale;
  $$payload.out += `<div class="flex items-end gap-0.5 transition-all duration-300 ease-in-out"${attr_style(`height: ${stringify(height)}px;`)}><button class="h-full flex items-end shadow-lg hover:ring hover:ring-slate-400 hover:-translate-y-2 hover:brightness-105 transition-transform cursor-pointer"${attr("tabindex", tabindex)}>`;
  if (book.displaySides?.find((d) => d === "front")) {
    $$payload.out += "<!--[-->";
    BookFront($$payload, { isbn: book.isbn });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (book.displaySides?.find((d) => d === "spine")) {
    $$payload.out += "<!--[-->";
    BookSpine($$payload, { isbn: book.isbn });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></button></div>`;
  pop();
}
function PreviewBook($$payload, $$props) {
  push();
  let { books = [], bgColor = "#cccccc", link = "" } = $$props;
  let validIsbn = books.every((book) => import_isbn.default.parse(book?.isbn).isValid);
  let isHovering = false;
  $$payload.out += `<a${attr("href", link)}${attr("target", link?.startsWith("/") && !link?.startsWith("/goto") ? "_self" : "_blank")}><div${attr_class("book-frame flex-1 flex justify-center rounded-lg inset-shadow-sm inset-shadow-slate-500/50 min-h-[500px] svelte-5dr03a", void 0, {
    "hovering": isHovering,
    "items-end": validIsbn && books.length > 0,
    "items-center": !validIsbn
  })} role="button" tabindex="0">`;
  if (!validIsbn) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-slate-800 text-sm flex items-center gap-2">`;
    Circle_alert($$payload, { class: "inline-block" });
    $$payload.out += `<!---->ISBN\u304C\u6B63\u3057\u304F\u306A\u3044\u3088\u3046\u3067\u3059</div>`;
  } else if (books.length > 0) {
    $$payload.out += "<!--[1-->";
    const each_array = ensure_array_like(books);
    $$payload.out += `<div class="relative w-full h-full pt-4 md:pt-8 flex flex-col items-center justify-end"><div class="flex items-end gap-0.5"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let book = each_array[i];
      Book($$payload, { book, tabindex: i + 1 });
    }
    $$payload.out += `<!--]--></div> <div class="w-full h-[32px] bg-slate-900/10">\xA0</div> <div class="w-full flex justify-end"><button class="flex text-slate-600 text-sm justify-end items-center gap-1 hidden">`;
    Circle_alert($$payload, { size: 16, class: "inline-block" });
    $$payload.out += `<!---->\u5831\u544A</button></div> <div class="feedback-popup absolute bottom-4 right-0 p-4 bg-white shadow-lg rounded-lg hidden"><div class="text-slate-800 text-sm font-semibold">\u30D5\u30A3\u30FC\u30C9\u30D0\u30C3\u30AF\u3092\u304A\u5BC4\u305B\u304F\u3060\u3055\u3044</div> <input type="radio" id="feedback1" name="feedback" value="good" class="mr-2"> <label for="feedback1" class="mr-4">\u826F\u3044</label> <input type="radio" id="feedback2" name="feedback" value="bad" class="mr-2"> <label for="feedback2" class="mr-4">\u60AA\u3044</label> <input type="radio" id="feedback3" name="feedback" value="other" class="mr-2"> <label for="feedback3" class="mr-4">\u305D\u306E\u4ED6</label> <textarea class="w-full p-2 border border-slate-400 rounded-lg" placeholder="\u30D5\u30A3\u30FC\u30C9\u30D0\u30C3\u30AF\u3092\u304A\u5BC4\u305B\u304F\u3060\u3055\u3044"></textarea> <button class="bg-slate-800 text-white px-4 py-2 rounded-lg mt-4">\u9001\u4FE1</button></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="text-slate-800 text-sm flex items-center gap-2">`;
    Circle_alert($$payload, { class: "inline-block" });
    $$payload.out += `<!---->ISBN\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044</div>`;
  }
  $$payload.out += `<!--]--></div></a>`;
  pop();
}
var import_isbn;
var init_PreviewBook = __esm({
  ".svelte-kit/output/server/chunks/PreviewBook.js"() {
    init_index2();
    init_src31();
    import_isbn = __toESM(require_dist(), 1);
    init_client();
    init_utils();
    init_Icon();
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => _page
});
function onDestroy(fn) {
  var context2 = (
    /** @type {Component} */
    current_component
  );
  (context2.d ??= []).push(fn);
}
function Library_big($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "rect",
      {
        "width": "8",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "1"
      }
    ],
    ["path", { "d": "M7 3v18" }],
    [
      "path",
      {
        "d": "M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "library-big" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Message_square_warning($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      }
    ],
    ["path", { "d": "M12 7v2" }],
    ["path", { "d": "M12 13h.01" }]
  ];
  Icon($$payload, spread_props([
    { name: "message-square-warning" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Pause($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "rect",
      {
        "x": "14",
        "y": "4",
        "width": "4",
        "height": "16",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "x": "6",
        "y": "4",
        "width": "4",
        "height": "16",
        "rx": "1"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "pause" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Refresh_ccw($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
      }
    ],
    ["path", { "d": "M3 3v5h5" }],
    [
      "path",
      {
        "d": "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"
      }
    ],
    ["path", { "d": "M16 16h5v5" }]
  ];
  Icon($$payload, spread_props([
    { name: "refresh-ccw" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function SingleDemo($$payload, $$props) {
  push();
  const isbns = [
    "9784087213126",
    "9784480076403",
    "9784004320340",
    "9784121028440"
  ];
  const bgColors = ["#EEE3B4", "#D9BD90", "#CE8282", "#689997"];
  const playButtonId = `play-button-${Math.random().toString(36).substring(2, 11)}`;
  let isbn = isbns[0];
  let bgColor = bgColors[0];
  let intervalId;
  let isPlaying = true;
  let showFront = false;
  let books = isbn ? [
    {
      isbn,
      displaySides: ["spine", ...[]]
    }
  ] : [];
  let trimmedIsbn = isbn.trim().replace(/[^0-9Xx]/g, "");
  let validIsbn = import_isbn2.default.parse(trimmedIsbn).isValid;
  let isbn13 = validIsbn ? import_isbn2.default.parse(trimmedIsbn)?.toString({ version: "isbn13" }) : "";
  validIsbn ? import_isbn2.default.parse(trimmedIsbn)?.toString({ version: "isbn10" }) : "";
  validIsbn ? import_isbn2.default.parse(isbn13)?.toString({ hyphens: true }) : "";
  function stopInterval() {
    clearInterval(intervalId);
    intervalId = null;
    isbn = "";
    bgColor = "#C0CDD9";
  }
  onDestroy(() => {
    stopInterval();
  });
  $$payload.out += `<div class="flex items-center justify-center p-4"><div class="w-full max-w-6xl bg-slate-100 rounded-3xl p-4 md:p-8 shadow-lg"><div class="flex flex-col lg:flex-row gap-6"><div class="flex flex-col p-4 gap-2 flex-1"><div class="flex items-center justify-start gap-4 hover:text-amber-800"><div class="isbn-controls"><button${attr("id", playButtonId)} class="w-12 h-12 md:w-16 md:h-16 border border-slate-400 bg-slate-50 hover:bg-amber-50 hover:ring hover:ring-slate-400 rounded-full flex items-center justify-center transition-colors"${attr("aria-label", "Stop")}>`;
  {
    $$payload.out += "<!--[-->";
    Pause($$payload, { size: 28, fill: "currentColor" });
  }
  $$payload.out += `<!--]--></button></div> <div><label${attr("for", playButtonId)} class="cursor-pointer">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-lg md:text-xl font-semibold">\u4E00\u6642\u505C\u6B62\u30DC\u30BF\u30F3\u3092\u62BC\u3059\u3068ISBN\u3092\u5165\u529B\u3067\u304D\u307E\u3059</div>`;
  }
  $$payload.out += `<!--]--></label></div></div> <div class="my-4"><input id="isbn"${attr("value", isbn)}${attr_class("border border-slate-500 p-2 md:p-4 text-lg md:text-2xl font-mono font-semibold bg-white rounded-lg svelte-pfjyyb", void 0, { "disabled-input": isPlaying })}${attr("disabled", isPlaying, true)} placeholder="ISBN\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"> <div${attr_class("my-4", void 0, { "hidden": isPlaying })}><button class="px-4 py-2 flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-500 rounded cursor-pointer">`;
  Refresh_ccw($$payload, { size: 16, class: "inline-block" });
  $$payload.out += `<!----> \u30E9\u30F3\u30C0\u30E0\u5165\u529B</button></div> <div class="my-4 flex items-center gap-2"><input id="showFront" type="checkbox"${attr("checked", showFront, true)} class="inline-block"> <label for="showFront" class="text-slate-800 font-semibold cursor-pointer">\u8868\u7D19\u3082\u8868\u793A\u3059\u308B</label></div> `;
  if (validIsbn) {
    $$payload.out += "<!--[-->";
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <button class="text-sm px-4 py-2 flex items-center gap-2 size-fit border border-slate-500 bg-bg-slate-50 hover:bg-white rounded cursor-pointer">`;
  Message_square_warning($$payload, {});
  $$payload.out += `<!----> \u4E0D\u5177\u5408\u3092\u5831\u544A</button></div> <div class="flex-1 transform scale-75 md:scale-100">`;
  PreviewBook($$payload, { books, bgColor, link: `/shelf/isbn/${isbn}` });
  $$payload.out += `<!----></div></div></div></div>`;
  pop();
}
function MultiDemo($$payload, $$props) {
  push();
  const isbns = [
    "9784087213126",
    "9784480076403",
    "9784004320340",
    "9784121028440"
  ];
  const bgColors = ["#D9BD90"];
  let isbnsString = isbns.join("\n");
  let isbnsArray = isbnsString.trim().split(/[\s,;]+/).map((isbn) => isbn.trim().replace(/[^0-9Xx]/g, "")).map((isbn) => isbn.trim()).filter((isbn) => isbn.length > 0).slice(0, 10);
  isbnsArray.length === 0;
  let validIsbn = isbnsArray.every((isbn) => import_isbn2.default.parse(isbn).isValid);
  let books = isbnsArray.length === 0 ? [] : isbnsArray.map((isbn) => ({ isbn, displaySides: ["spine"] }));
  let bgColor = bgColors[0];
  let intervalId;
  let isPlaying = true;
  function stopInterval() {
    clearInterval(intervalId);
    intervalId = null;
    isbnsString = "";
    bgColor = "#C0CDD9";
  }
  onDestroy(() => {
    stopInterval();
  });
  $$payload.out += `<div class="flex items-center justify-center p-4"><div class="w-full max-w-6xl bg-slate-100 rounded-3xl p-4 md:p-8 shadow-lg"><div class="flex flex-col lg:flex-row gap-6"><div class="flex flex-col p-4 gap-2 flex-1"><div class="flex items-center justify-start gap-4"><div class="isbn-controls"><button id="playPause" class="w-12 h-12 md:w-16 md:h-16 border border-slate-400 bg-slate-50 hover:bg-slate-200 hover:ring hover:ring-slate-400 rounded-full flex items-center justify-center transition-colors text-slate-800"${attr("aria-label", "Stop")}>`;
  {
    $$payload.out += "<!--[-->";
    Pause($$payload, { size: 28, fill: "currentColor" });
  }
  $$payload.out += `<!--]--></button></div> <div><label for="playPause" class="cursor-pointer">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="text-lg md:text-xl font-semibold">\u4E00\u6642\u505C\u6B62\u30DC\u30BF\u30F3\u3092\u62BC\u3059\u3068ISBN\u306E\u30EA\u30B9\u30C8\u3092\u5165\u529B\u3067\u304D\u307E\u3059</div>`;
  }
  $$payload.out += `<!--]--></label></div></div> <div class="my-4"><textarea id="isbns" rows="5"${attr_class("border border-slate-500 p-2 md:p-4 text-lg md:text-2xl font-mono font-semibold bg-white rounded-lg svelte-pfjyyb", void 0, { "disabled-input": isPlaying })}${attr("disabled", isPlaying, true)} placeholder="ISBN\u306E\u30EA\u30B9\u30C8\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044">`;
  const $$body = escape_html(isbnsString);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea> `;
  if (validIsbn) {
    $$payload.out += "<!--[-->";
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div class="flex-1">`;
  PreviewBook($$payload, {
    books,
    bgColor,
    link: `/shelf/isbn/${isbnsArray.join(",")}`
  });
  $$payload.out += `<!----></div></div></div></div>`;
  pop();
}
function InstagramEmbed($$payload, $$props) {
  push();
  const { postUrl } = $$props;
  $$payload.out += `<div class="instagram-embed-container"><blockquote class="instagram-media"${attr("data-instgrm-permalink", postUrl)} data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:calc(100% - 2px);"></blockquote></div>`;
  pop();
}
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.out += `<meta property="og:title" content="opencover : \u307F\u3093\u306A\u3067\u3064\u304F\u308B\u66F8\u7C4D\u30AB\u30D0\u30FC\u753B\u50CF"> <meta property="og:type" content="website"> <meta property="og:description" content="opencover\u306F\u3001\u672C\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u3092\u751F\u6210\u3057\u914D\u4FE1\u3059\u308B\u30A6\u30A7\u30D6API\u3067\u3059\u3002"> <meta property="og:image" content="https://opencover.jp/ogp.png"> <meta property="og:site_name" content="opencover : \u307F\u3093\u306A\u3067\u3064\u304F\u308B\u66F8\u7C4D\u30AB\u30D0\u30FC\u753B\u50CF"> <meta property="og:url" content="https://opencover.jp/"> <meta name="description" content="opencover\u306F\u3001\u672C\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u3092\u751F\u6210\u3057\u914D\u4FE1\u3059\u308B\u30A6\u30A7\u30D6API\u3067\u3059\u3002"> <meta name="twitter:card" content="summary_large_image">`;
  });
  $$payload.out += `<div class="relative overflow-hidden bg-no-repeat bg-cover h-[300px] md:h-[500px]" style="background-image: url('/bookshelf-bg.jpg'); background-repeat: repeat-y; background-size: 100%; background-attachment: fixed;"><div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-linear-to-b from-orange-300/50 to-orange-900/60"><div class="flex justify-center items-center h-full"><div class="flex flex-col items-center text-center text-white px-6 md:px-12"><h1 class="text-4xl md:text-6xl font-bold drop-shadow-[0_12px_12px_rgba(0,0,0,1)] md:drop-shadow-[0_16px_16px_rgba(0,0,0,1)] mt-0 mb-6 tracking-widest">opencover</h1> <h2 class="text-lg md:text-2xl font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,1)] md:drop-shadow-[0_8px_8px_rgba(0,0,0,1)] mb-8">\u307F\u3093\u306A\u3067\u3064\u304F\u308B\u66F8\u7C4D\u30AB\u30D0\u30FC</h2> <div class="text-sm md:text-base font-semibold bg-orange-900/10 border border-white rounded px-4 py-2 size-fit">\u30D7\u30EC\u30D3\u30E5\u30FC\u7248</div></div></div></div> <div class="absolute right-2 bottom-2 bg-black text-gray-200 opacity-70 text-xs px-2 py-1 rounded">opencover\u80CC\u8868\u7D19\u3067\u4F5C\u6210\u3057\u305F\u672C\u68DA\u753B\u50CF</div></div> <div class="container mx-auto p-4"><h3 class="text-xl font-bold my-8">opencover\u3068\u306F</h3> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">opencover\u306F\u3001\u672C\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u3092\u751F\u6210\u3057\u914D\u4FE1\u3059\u308B\u30A6\u30A7\u30D6API\u3067\u3059\u3002
    \u975E\u55B6\u5229\u306E\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3067\u3059\u3002\u3069\u306A\u305F\u3067\u3082\u3054\u81EA\u7531\u306B\u304A\u4F7F\u3044\u3044\u305F\u3060\u3051\u307E\u3059\u3002
    ISBN\u3092\u6307\u5B9A\u3057\u305FURL\u3092\u547C\u3073\u51FA\u3059\u3053\u3068\u3067\u3001\u304B\u3093\u305F\u3093\u306B\u80CC\u8868\u7D19\u753B\u50CF\u3092\u53D6\u5F97\u3067\u304D\u307E\u3059\u3002
    \u5BFE\u5FDC\u3057\u3066\u3044\u308B\u66F8\u7C4D\u306F\u3001\u65B0\u66F8\u3092\u4E2D\u5FC3\u306B\u7D0470,000\u518A\u3067\u3059\u3002 <a href="how-to-use" class="p-2 px-4 text-sm border border-slate-300 rounded-full hover:bg-slate-100">\u3082\u3063\u3068\u304F\u308F\u3057\u304F\u2026</a></div> <h3 class="text-xl font-bold my-8">\u4F7F\u7528\u4F8B</h3> <h3 class="text-xl font-bold my-8 flex items-center gap-2"><img src="/favicon.svg" alt="Book" class="w-6 h-6"> 1\u518A\u306E\u672C\u306E\u80CC\u8868\u7D19\u3092\u898B\u308B\u30B5\u30F3\u30D7\u30EB</h3> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">ISBN\u304B\u3089\u672C\u306E\u80CC\u8868\u7D19\u753B\u50CF\u3092\u751F\u6210\u3057\u3066\u3044\u307E\u3059\u3002</div> `;
  SingleDemo($$payload);
  $$payload.out += `<!----> <h3 class="text-xl font-bold my-8 flex items-center gap-2">`;
  Library_big($$payload, {});
  $$payload.out += `<!----> \u8907\u6570\u518A\u306E\u672C\u68DA\u3092\u898B\u308B\u30B5\u30F3\u30D7\u30EB</h3> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u8907\u6570\u518A\u306E\u80CC\u8868\u7D19\u3092\u4E26\u3079\u3066\u914D\u7F6E\u3059\u308B\u3068\u3001\u672C\u68DA\u306E\u3088\u3046\u306A\u30A4\u30E1\u30FC\u30B8\u3092\u4F5C\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002
    \u3053\u3053\u3067\u306F\u3001ISBN\u306E\u30EA\u30B9\u30C8\u304B\u3089\u6700\u592710\u518A\u307E\u3067\u306E\u672C\u68DA\u3092\u8868\u793A\u3057\u3066\u3044\u307E\u3059\u3002</div> `;
  MultiDemo($$payload);
  $$payload.out += `<!----> <h3 class="text-xl font-bold my-8">\u6D3B\u7528\u4F8B</h3> <h4 class="text-lg font-bold my-8">Biblisist</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">opencover\u306E\u753B\u50CF\u3092\u6D3B\u7528\u3057\u305F\u3001\u30E6\u30FC\u30B6\u304C\u672C\u68DA\u3092\u4F5C\u6210\u3057\u5171\u6709\u3067\u304D\u308B\u30B5\u30FC\u30D3\u30B9\u3092\u958B\u767A\u4E2D\u3067\u3059\u3002
    2025\u5E74\u30EA\u30EA\u30FC\u30B9\u4E88\u5B9A\u3067\u3059\u3002</div> `;
  InstagramEmbed($$payload, {
    postUrl: "https://www.instagram.com/reel/DG0P1tFMy5O/"
  });
  $$payload.out += `<!----></div>`;
}
var import_isbn2;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_index2();
    import_isbn2 = __toESM(require_dist(), 1);
    init_PreviewBook();
    init_Icon();
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => component_cache4 ??= (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    imports4 = ["_app/immutable/nodes/3.tms4LAhQ.js", "_app/immutable/chunks/B-Dr2cRb.js", "_app/immutable/chunks/BlTpSGD8.js", "_app/immutable/chunks/DOvYsISe.js", "_app/immutable/chunks/ChECSWBu.js", "_app/immutable/chunks/DKmXJPfJ.js", "_app/immutable/chunks/Btw6_rf5.js", "_app/immutable/chunks/Dq12EtSq.js", "_app/immutable/chunks/CABO9XDg.js", "_app/immutable/chunks/_BQvoK0b.js", "_app/immutable/chunks/DdiJvTiH.js", "_app/immutable/chunks/l_1nHkG4.js", "_app/immutable/chunks/CbsYtiTg.js"];
    stylesheets4 = ["_app/immutable/assets/PreviewBook.71W-6VSR.css", "_app/immutable/assets/3.Cq5S_FJB.css", "_app/immutable/assets/app.CovZX8I2.css"];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/about/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => _page2
});
function _page2($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.out += `<meta property="og:title" content="opencover : \u307F\u3093\u306A\u3067\u3064\u304F\u308B\u66F8\u7C4D\u30AB\u30D0\u30FC\u753B\u50CF"> <meta property="og:type" content="website"> <meta property="og:description" content="opencover\u306F\u3001\u672C\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u3092\u751F\u6210\u3057\u914D\u4FE1\u3059\u308B\u30A6\u30A7\u30D6API\u3067\u3059\u3002"> <meta property="og:image" content="https://opencover.jp/ogp.png"> <meta property="og:site_name" content="opencover : \u307F\u3093\u306A\u3067\u3064\u304F\u308B\u66F8\u7C4D\u30AB\u30D0\u30FC\u753B\u50CF"> <meta property="og:url" content="https://opencover.jp/"> <meta name="description" content="opencover\u306F\u3001\u672C\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u3092\u751F\u6210\u3057\u914D\u4FE1\u3059\u308B\u30A6\u30A7\u30D6API\u3067\u3059\u3002"> <meta name="twitter:card" content="summary_large_image">`;
  });
  $$payload.out += `<div class="bg-slate-50 flex items-center justify-center !p-16"><h1 class="text-xl font-semibold">About</h1></div> <div class="md:w-8/12 p-4 mx-auto"><section><h3 class="svelte-1goykhc"><img src="/favicon.svg" alt="Book" class="w-6 h-6"> opencover\u3068\u306F</h3> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">opencover\u306F\u3001\u672C\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u3092\u914D\u4FE1\u3059\u308BAPI\u3067\u3059\u3002
    \u30A4\u30F3\u30BF\u30FC\u30CD\u30C3\u30C8\u3067\u66F8\u7C4D\u3092\u30D3\u30B8\u30E5\u30A2\u30EB\u3067\u7D39\u4ECB\u3059\u308B\u306B\u306F\u3001\u8868\u7D19\u306E\u753B\u50CF\u3057\u304B\u306A\u304F\u3001\u80CC\u8868\u7D19\u306E\u753B\u50CF\u304C\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002</div> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u66F8\u7C4D\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u306F\u3001\u6587\u5316\u3092\u4F1D\u3048\u308B\u516C\u76CA\u6027\u306E\u9AD8\u3044\u5171\u6709\u8CA1\u7523\u3067\u3059\u3002
    \u305D\u3053\u3067\u3001\u975E\u55B6\u5229\u3067\u81EA\u7531\u306B\u4F7F\u3048\u308B\u753B\u50CF\u751F\u6210\u30FB\u914D\u4FE1API\u3068\u3057\u3066\u958B\u767A\u3057\u307E\u3057\u305F\u3002</div> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u3053\u306EAPI\u3092\u6D3B\u7528\u3059\u308B\u3053\u3068\u3067\u3001\u66F8\u7C4D\u7D39\u4ECB\u3084\u8535\u66F8\u7BA1\u7406\u306A\u3069\u306E\u30A2\u30D7\u30EA\u3084\u30B5\u30FC\u30D3\u30B9\u3092\u958B\u767A\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002</div></section> <section><h3 class="svelte-1goykhc"><img src="/favicon.svg" alt="Book" class="w-6 h-6"> \u300C\u307F\u3093\u306A\u3067\u3064\u304F\u308B\u300D\u3068\u306F</h3> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">opencover\u306F\u3001\u307F\u306A\u3055\u3093\u306E\u5354\u529B\u3067\u5BFE\u5FDC\u66F8\u7C4D\u3092\u5897\u3084\u3057\u3066\u3044\u304D\u307E\u3059\u3002
    \u66F8\u7C4D\u30AB\u30D0\u30FC\u306E\u30EC\u30A4\u30A2\u30A6\u30C8\u3092\u6307\u5B9A\u3059\u308B\u30B9\u30BF\u30A4\u30EB\u30B7\u30FC\u30C8\u3092\u5171\u540C\u7DE8\u96C6\u3059\u308B\u3053\u3068\u3067\u3001\u3088\u308A\u591A\u304F\u306E\u66F8\u7C4D\u306B\u5BFE\u5FDC\u3067\u304D\u308B\u3088\u3046\u306B\u306A\u308A\u307E\u3059\u3002
    \u305D\u306E\u4ED5\u7D44\u307F\u3092\u73FE\u5728\u958B\u767A\u4E2D\u3067\u3059\u3002</div></section> <section><h3 class="svelte-1goykhc"><img src="/favicon.svg" alt="Book" class="w-6 h-6"> \u51FA\u7248\u793E\u306E\u307F\u306A\u3055\u307E\u3078</h3> <h4 class="font-semibold">\u3054\u7406\u89E3\u3068\u3054\u5354\u529B\u306E\u304A\u9858\u3044</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">opencover\u304C\u751F\u6210\u3057\u3066\u3044\u308B\u30AB\u30D0\u30FC\u753B\u50CF\u306F\u3001\u5B9F\u7269\u306E\u66F8\u7C4D\u3092\u53C2\u8003\u306B\u3042\u304F\u307E\u3067\u7C21\u6613\u7684\u306B\u518D\u73FE\u3057\u305F\u3082\u306E\u3067\u3059\u3002
    \u5B9F\u969B\u306E\u66F8\u7C4D\u30AB\u30D0\u30FC\u306E\u8457\u4F5C\u6A29\u3092\u4FB5\u5BB3\u3059\u308B\u610F\u56F3\u306F\u3042\u308A\u307E\u305B\u3093\u3002
    opencover\u3067\u306F\u751F\u6210\u753B\u50CF\u306B\u305F\u3088\u3089\u305A\u3001\u672C\u6765\u306E\u753B\u50CF\u3092\u914D\u4FE1\u3059\u308B\u3053\u3068\u3092\u76EE\u6307\u3057\u3066\u3044\u307E\u3059\u3002
    \u3054\u5354\u529B\u3044\u305F\u3060\u3051\u308B\u51FA\u7248\u793E\u306E\u65B9\u306F\u3001\u305C\u3072\u304A\u554F\u3044\u5408\u308F\u305B\u304F\u3060\u3055\u3044\u3002</div></section> <section><h3 class="svelte-1goykhc"><img src="/favicon.svg" alt="Book" class="w-6 h-6"> \u30EA\u30EA\u30FC\u30B9\u5C65\u6B74</h3> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">2025-03-31: \u30D7\u30EC\u30D3\u30E5\u30FC\u7248\u516C\u958B</div></section> <section><h3 class="svelte-1goykhc"><img src="/favicon.svg" alt="Book" class="w-6 h-6"> \u304A\u554F\u3044\u5408\u308F\u305B</h3> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">opencover\u3078\u306E\u304A\u554F\u3044\u5408\u308F\u305B\u306F\u4E0B\u8A18\u307E\u3067\u304A\u9858\u3044\u3044\u305F\u3057\u307E\u3059\u3002</div> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">191-0065<br> \u6771\u4EAC\u90FD\u65E5\u91CE\u5E02\u65ED\u304C\u4E186-6<br> \u6771\u4EAC\u90FD\u7ACB\u5927\u5B66\u30B7\u30B9\u30C6\u30E0\u30C7\u30B6\u30A4\u30F3\u5B66\u90E8\u30A4\u30F3\u30C0\u30B9\u30C8\u30EA\u30A2\u30EB\u30A2\u30FC\u30C8\u5B66\u79D1<br> \u6749\u672C\u9054\u61C9\u7814\u7A76\u5BA4<br></div> <div class="font-mono text-sm my-9">info <em>(at mark)</em> opencover.jp</div> <div class="text-slate-500 text-sm my-9">opencover\u306F\u3001Amazon\u306E\u30A2\u30BD\u30B7\u30A8\u30A4\u30C8\u3068\u3057\u3066\u9069\u683C\u8CA9\u58F2\u306B\u3088\u308A\u53CE\u5165\u3092\u5F97\u308B\u3053\u3068\u304C\u3042\u308A\u307E\u3059\u3002</div></section></div>`;
}
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/about/_page.svelte.js"() {
    init_index2();
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index5 = 4;
    component5 = async () => component_cache5 ??= (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    imports5 = ["_app/immutable/nodes/4.CdrfLPDn.js", "_app/immutable/chunks/B-Dr2cRb.js", "_app/immutable/chunks/BlTpSGD8.js", "_app/immutable/chunks/DOvYsISe.js"];
    stylesheets5 = ["_app/immutable/assets/4.DqM4rUaE.css"];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/goto/_service_/_isbn_/_page.server.ts.js
var page_server_ts_exports = {};
__export(page_server_ts_exports, {
  load: () => load
});
var import_isbn3, load;
var init_page_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/goto/_service_/_isbn_/_page.server.ts.js"() {
    init_chunks();
    import_isbn3 = __toESM(require_dist(), 1);
    load = async ({ params }) => {
      if (params.isbn) {
        const isbn = params.isbn.split(",").at(0);
        const isbn10 = import_isbn3.default.parse(isbn).toString({ version: "isbn10" });
        const service = params.service;
        let linkUrl = `https://opencover.jp/`;
        if (import_isbn3.default.parse(isbn).isValid) {
          switch (service) {
            case "amazon":
              linkUrl = `https://www.amazon.co.jp/dp/${isbn10}?tag=opencoverjp-22`;
              break;
            case "rakuten":
              const affiliateId = "06f792e1.d28000ea.06f792e2.e995fb0d";
              const searchUrl = `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&isbn=${isbn}&booksGenreId=001&applicationId=1066876234771011272`;
              const response = await fetch(searchUrl);
              const data = await response.json();
              const rakutenUrl = data.Items[0].Item.itemUrl;
              linkUrl = `https://hb.afl.rakuten.co.jp/hgc/${affiliateId}/?pc=${encodeURIComponent(rakutenUrl)}&m=${encodeURIComponent(rakutenUrl)}`;
              break;
            case "kinokuniya":
              const kinokuniyaUrl = `https://www.kinokuniya.co.jp/f/dsg-01-${isbn}`;
              linkUrl = `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3459152&pid=891514999&vc_url=${encodeURIComponent(kinokuniyaUrl)}`;
              break;
            case "maruzenjunkudo":
              linkUrl = `https://www.maruzenjunkudo.co.jp/products/${isbn}`;
              break;
            case "honto":
              const hontoUrl = `https://honto.jp/isbn/${isbn}`;
              linkUrl = `http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3459152&pid=891515139&vc_url=${encodeURIComponent(hontoUrl)}`;
              break;
            case "openbs":
              linkUrl = `https://demo.openbs.jp/${isbn}`;
              break;
            case "calil":
              linkUrl = `https://calil.jp/book/${isbn10}`;
              break;
            case "booklog":
              linkUrl = `https://booklog.jp/item/1/${isbn10}`;
              break;
            case "bookmeter":
              linkUrl = `https://bookmeter.com/b/${isbn10}`;
              break;
            case "googlebooks":
              linkUrl = `https://books.google.co.jp/books?vid=${isbn}`;
              break;
            case "cinii":
              linkUrl = `https://ci.nii.ac.jp/books/openurl/query?isbn=${isbn}`;
              break;
          }
        }
        redirect(302, linkUrl);
      }
      error(404, "Not found");
    };
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  server: () => page_server_ts_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets6
});
var index6, server_id, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_page_server_ts();
    index6 = 5;
    server_id = "src/routes/goto/[service]/[isbn]/+page.server.ts";
    imports6 = [];
    stylesheets6 = [];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/how-to-use/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => _page3
});
function Barcode($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M3 5v14" }],
    ["path", { "d": "M8 5v14" }],
    ["path", { "d": "M12 5v14" }],
    ["path", { "d": "M17 5v14" }],
    ["path", { "d": "M21 5v14" }]
  ];
  Icon($$payload, spread_props([
    { name: "barcode" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Book_image($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      { "d": "m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17" }
    ],
    [
      "path",
      {
        "d": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["circle", { "cx": "10", "cy": "8", "r": "2" }]
  ];
  Icon($$payload, spread_props([
    { name: "book-image" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Book_text($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { "d": "M8 11h8" }],
    ["path", { "d": "M8 7h6" }]
  ];
  Icon($$payload, spread_props([
    { name: "book-text" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Circle_help($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "10" }
    ],
    [
      "path",
      { "d": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }
    ],
    ["path", { "d": "M12 17h.01" }]
  ];
  Icon($$payload, spread_props([
    { name: "circle-help" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function External_link($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M15 3h6v6" }],
    ["path", { "d": "M10 14 21 3" }],
    [
      "path",
      {
        "d": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "external-link" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Octagon_alert($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M12 16h.01" }],
    ["path", { "d": "M12 8v4" }],
    [
      "path",
      {
        "d": "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "octagon-alert" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Palette($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "circle",
      {
        "cx": "13.5",
        "cy": "6.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "circle",
      {
        "cx": "17.5",
        "cy": "10.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "circle",
      {
        "cx": "8.5",
        "cy": "7.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "circle",
      {
        "cx": "6.5",
        "cy": "12.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "path",
      {
        "d": "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "palette" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function _page3($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.out += `<meta property="og:title" content="opencover : \u307F\u3093\u306A\u3067\u3064\u304F\u308B\u66F8\u7C4D\u30AB\u30D0\u30FC\u753B\u50CF"> <meta property="og:type" content="website"> <meta property="og:description" content="opencover\u306F\u3001\u672C\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u3092\u751F\u6210\u3057\u914D\u4FE1\u3059\u308B\u30A6\u30A7\u30D6API\u3067\u3059\u3002"> <meta property="og:image" content="https://opencover.jp/ogp.png"> <meta property="og:site_name" content="opencover : \u307F\u3093\u306A\u3067\u3064\u304F\u308B\u66F8\u7C4D\u30AB\u30D0\u30FC\u753B\u50CF"> <meta property="og:url" content="https://opencover.jp/"> <meta name="description" content="opencover\u306F\u3001\u672C\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u3092\u751F\u6210\u3057\u914D\u4FE1\u3059\u308B\u30A6\u30A7\u30D6API\u3067\u3059\u3002"> <meta name="twitter:card" content="summary_large_image">`;
  });
  $$payload.out += `<div class="bg-slate-50 flex items-center justify-center !p-16"><h1 class="text-xl font-semibold">\u3064\u304B\u3044\u304B\u305F</h1></div> <div class="md:w-8/12 p-4 mx-auto"><section class="my-9"><h3 class="svelte-105wwcy"><img src="/favicon.svg" alt="Book" class="w-6 h-6"> \u3064\u304B\u3044\u304B\u305F</h3> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">opencover\u306F\u3001\u66F8\u7C4D\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u3092\u914D\u4FE1\u3059\u308BAPI\u3067\u3059\u3002
      ISBN\u3092\u6307\u5B9A\u3057\u305FURL\u3092\u547C\u3073\u51FA\u3059\u3053\u3068\u3067\u3001\u66F8\u7C4D\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u3092\u53D6\u5F97\u3067\u304D\u307E\u3059\u3002</div> <div class="text-sm md:text-base leading-[2] my-9 border border-slate-300 p-4 rounded"><div class="flex items-center gap-2">`;
  Barcode($$payload, { class: "inline-block" });
  $$payload.out += `<!----><strong>ISBN\u3068\u306F</strong></div> \u66F8\u7C4D\u51FA\u7248\u7269\u3092\u8B58\u5225\u3059\u308B\u56FD\u969B\u6A19\u6E96\u306E\u30B3\u30FC\u30C9\u3067\u3059\u3002\u672C\u306E\u88CF\u8868\u7D19\u3084\u5965\u4ED8\u306B\u8A18\u8F09\u3055\u308C\u3066\u3044\u307E\u3059\u3002</div> <div class="!p-8 bg-slate-50 max-w-full"><div class="bg-white md:text-lg font-mono !p-4 !px-8 border border-slate-500 rounded overflow-x-auto md:overflow-x-visible break-word">https://image.opencover.jp/v1/cover/spine/<span class="text-amber-600">${escape_html(`{isbn}`)}</span>.webp</div></div> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">URL\u306E<span class="text-amber-600 font-mono">${escape_html(` {isbn} `)}</span>\u306B13\u6841\u306EISBN\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002 URL\u306E <span class="font-mono">${escape_html(`spine`)}</span> \u3068\u306F\u3001\u80CC\u8868\u7D19\u3092\u793A\u3057\u307E\u3059\u3002
      \u4ECA\u5F8C\u3001\u8868\u7D19\u3084\u88CF\u8868\u7D19\u306E\u81EA\u52D5\u751F\u6210\u306B\u3082\u53D6\u308A\u7D44\u307F\u307E\u3059\u3002</div> <h4 class="svelte-105wwcy">\u4F8B</h4> <div>ISBN\u304C<span class="font-mono">9784087213126</span>\u306E\u5834\u5408\u306F\u3001\u3053\u3061\u3089\u306EURL\u306B\u306A\u308A\u307E\u3059\u3002</div> <a href="https://image.opencover.jp/v1/cover/spine/9784087213126.webp" target="_blank" class="font-mono text-orange-800 underline underline-offset-4 decoration-orange-800 hover:bg-yellow-50 max-w-full p-2 rounded flex items-center gap-1 overflow-x-auto md:overflow-x-visible break-word">https://image.opencover.jp/v1/cover/spine/9784087213126.webp `;
  External_link($$payload, { size: 16, class: "inline-block" });
  $$payload.out += `<!----></a></section> <section><h3 class="svelte-105wwcy"><img src="/favicon.svg" alt="Book" class="w-6 h-6"> \u3057\u304F\u307F</h3> <div class="flex flex-col md:flex-row items-center gap-4 !p-8 bg-slate-50 size-fit"><div class="bg-white text-lg md:text-lg font-mono !p-4 !px-8 size-fit border border-slate-500 rounded">`;
  Book_text($$payload, { class: "inline-block" });
  $$payload.out += `<!----> \u66F8\u8A8C\u60C5\u5831</div> <div class="text-lg font-bold">+</div> <div class="bg-white text-lg md:text-lg font-mono !p-4 !px-8 size-fit border border-slate-500 rounded">`;
  Palette($$payload, { class: "inline-block" });
  $$payload.out += `<!----> \u30B9\u30BF\u30A4\u30EB</div> <div class="text-lg font-bold"><span class="sm:hidden">\u2193</span> <span class="hidden sm:inline md:hidden">\u2193</span> <span class="hidden md:inline">\u2192</span></div> <div class="bg-white text-lg md:text-lg font-mono !p-4 !px-8 size-fit border border-slate-500 rounded">`;
  Book_image($$payload, { class: "inline-block" });
  $$payload.out += `<!----> \u30AB\u30D0\u30FC\u753B\u50CF</div></div> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">ISBN\u304B\u3089\u66F8\u8A8C\u60C5\u5831\u3092\u53D6\u5F97\u3057\u3001\u66F8\u7C4D\u306E\u7A2E\u985E\u306B\u5FDC\u3058\u305F\u30B9\u30BF\u30A4\u30EB\u3092\u9069\u7528\u3059\u308B\u3053\u3068\u3067\u3001\u66F8\u7C4D\u306E\u30AB\u30D0\u30FC\u753B\u50CF\u3092\u751F\u6210\u3057\u3066\u3044\u307E\u3059\u3002</div></section> <section><h3 class="svelte-105wwcy"><img src="/favicon.svg" alt="Book" class="w-6 h-6"> \u5BFE\u5FDC\u3057\u3066\u3044\u308B\u66F8\u7C4D</h3> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9"><strong>\u4E3B\u8981\u306A\u65B0\u66F8\u3068\u4E00\u90E8\u306E\u6587\u5EAB\u306E\u307F</strong>\u5BFE\u5FDC\u3057\u3066\u3044\u307E\u3059\u3002
      \u6587\u5EAB\u306F\u30CE\u30F3\u30D5\u30A3\u30AF\u30B7\u30E7\u30F3\u306E\u30EC\u30FC\u30D9\u30EB\u304C\u4E2D\u5FC3\u3067\u3059\u3002</div> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u305D\u306E\u4ED6\u306E\u66F8\u7C4D\u306B\u3064\u3044\u3066\u306F\u3001\u9806\u6B21\u5BFE\u5FDC\u4E88\u5B9A\u3067\u3059\u3002
      \u5BFE\u5FDC\u3059\u308B\u66F8\u7C4D\u3092\u5897\u3084\u3059\u305F\u3081\u3001\u5354\u529B\u3044\u305F\u3060\u3051\u308B\u65B9\u3067\u30B9\u30BF\u30A4\u30EB\u3092\u4F5C\u6210\u3057\u3066\u3044\u304F\u4E88\u5B9A\u3067\u3059\u3002</div></section> <section><h3 class="svelte-105wwcy"><img src="/favicon.svg" alt="Book" class="w-6 h-6"> \u308F\u304B\u3063\u3066\u3044\u308B\u554F\u984C</h3> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Octagon_alert($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->\u80CC\u8868\u7D19\u753B\u50CF\u304C\u51FA\u306A\u3044\uFF0F\u6B63\u3057\u304F\u306A\u3044\u3053\u3068\u304C\u3042\u308A\u307E\u3059</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u672A\u5BFE\u5FDC\u306E\u66F8\u7C4D\u306E\u307B\u3046\u304C\u591A\u3044\u305F\u3081\u3001\u8868\u793A\u3055\u308C\u306A\u304B\u3063\u305F\u308A\u3001\u30EC\u30A4\u30A2\u30A6\u30C8\u304C\u5D29\u308C\u308B\u3053\u3068\u304C\u3042\u308A\u307E\u3059\u3002
      \u51FA\u7248\u6642\u671F\u306B\u3088\u3063\u3066\u88C5\u4E01\u304C\u30EA\u30CB\u30E5\u30FC\u30A2\u30EB\u3055\u308C\u3066\u3044\u308B\u5834\u5408\u306F\u5BFE\u5FDC\u3067\u304D\u3066\u3044\u307E\u305B\u3093\u3002</div> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Octagon_alert($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->\u30EC\u30A4\u30A2\u30A6\u30C8\u304C\u5D29\u308C\u3066\u3044\u308B\u3053\u3068\u304C\u3042\u308A\u307E\u3059</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u5BFE\u5FDC\u3057\u3066\u3044\u308B\u66F8\u7C4D\u3067\u3042\u3063\u3066\u3082\u3001\u30BF\u30A4\u30C8\u30EB\u3084\u8457\u8005\u540D\u304C\u9577\u3044\u3068\u5207\u308C\u3066\u3044\u305F\u308A\u91CD\u306A\u3063\u3066\u3044\u305F\u308A\u3057\u307E\u3059\u3002
      \u3053\u306E\u554F\u984C\u306B\u306F\u5BFE\u51E6\u3059\u308B\u4E88\u5B9A\u3067\u3059\u3002</div> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Octagon_alert($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->\u80CC\u8868\u7D19\u306E\u5927\u304D\u3055\u304C\u304A\u304B\u3057\u3044\u3067\u3059</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u306F\u3044\u3001\u8A8D\u8B58\u3057\u3066\u3044\u307E\u3059\u3002\u3053\u306E\u554F\u984C\u306B\u306F\u5BFE\u51E6\u3059\u308B\u4E88\u5B9A\u3067\u3059\u3002</div> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Octagon_alert($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->\u8868\u7D19\u306E\u753B\u50CF\u304C\u307C\u3084\u3051\u3066\u3044\u307E\u3059</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u8868\u7D19\u306E\u753B\u50CF\u306F\u3001Google Books API\u3068<a href="https://openbd.jp/" target="_blank" class="underline underline-offset-4 hover:text-amber-600">openBD</a>\u3092\u4F7F\u7528\u3057\u3066\u3044\u307E\u3059\u3002
      \u3053\u308C\u3089\u306E\u753B\u50CF\u306E\u89E3\u50CF\u5EA6\u304C\u4F4E\u3044\u305F\u3081\u307C\u3084\u3051\u3066\u3044\u307E\u3059\u3002</div></section> <section><h3 class="svelte-105wwcy"><img src="/favicon.svg" alt="Book" class="w-6 h-6"> \u8CEA\u554F</h3> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u3044\u305F\u3060\u304D\u305D\u3046\u306A\u8CEA\u554F\u3092\u3042\u3089\u304B\u3058\u3081\u307E\u3068\u3081\u307E\u3057\u305F\u3002</div> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Circle_help($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->\u753B\u50CF\u304C\u8868\u793A\u3055\u308C\u308B\u307E\u3067\u306B\u6642\u9593\u304C\u304B\u304B\u308A\u307E\u3059</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u30EA\u30AF\u30A8\u30B9\u30C8\u3059\u308B\u66F8\u7C4D\u304C\u521D\u3081\u3066\u30A2\u30AF\u30BB\u30B9\u3055\u308C\u308B\u3068\u304D\u306F\u3001\u753B\u50CF\u304C\u8868\u793A\u3055\u308C\u308B\u307E\u3067\u306B\u6570\u79D2\u306E\u6642\u9593\u304C\u304B\u304B\u308A\u307E\u3059\u3002
      2\u56DE\u76EE\u4EE5\u964D\u306F\u306F\u3084\u304F\u306A\u308A\u307E\u3059\u3002</div> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Circle_help($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->ISBN\u3092\u5165\u529B\u3059\u308B\u306E\u304C\u9762\u5012\u306A\u306E\u3067\u30AD\u30FC\u30EF\u30FC\u30C9\u691C\u7D22\u3057\u305F\u3044</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">opencover\u306B\u306F\u672C\u3092\u691C\u7D22\u3059\u308B\u6A5F\u80FD\u304C\u3042\u308A\u307E\u305B\u3093\u3002
      \u5225\u9014\u516C\u958B\u4E88\u5B9A\u306EWeb\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u3067\u306F\u3001\u30AD\u30FC\u30EF\u30FC\u30C9\u3067\u691C\u7D22\u3067\u304D\u308B\u3088\u3046\u306B\u3057\u307E\u3059\u3002</div> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Circle_help($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->\u80CC\u8868\u7D19\u306E\u4E0B\u90E8\u306B\u300C\u3059\u304B\u3057\u300D\u306E\u3088\u3046\u306A\u3082\u306E\u304C\u898B\u3048\u307E\u3059</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">opencover\u304C\u81EA\u52D5\u751F\u6210\u3057\u305F\u753B\u50CF\u3067\u3042\u308B\u3053\u3068\u3092\u793A\u3059\u305F\u3081\u3001\u753B\u50CF\u306E\u4E0B\u90E8\u306B\u300COC\u300D\u3068\u3044\u3046\u30DE\u30FC\u30AF\u3092\u4ED8\u3051\u3066\u3044\u307E\u3059\u3002</div> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Circle_help($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->\u62E1\u5F35\u5B50\u306E<span class="font-mono">.webp</span>\u3068\u306F\u4F55\u3067\u3059\u304B</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">WebP\uFF08\u30A6\u30A7\u30C3\u30D4\u30FC\uFF09\u306F\u3001JPEG\u3084PNG\u3088\u308A\u3082\u8EFD\u91CF\u3067\u9AD8\u753B\u8CEA\u306E\u753B\u50CF\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8\u3067\u3059\u3002</div> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Circle_help($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->\u4ED6\u306E\u89E3\u50CF\u5EA6\u3084\u753B\u50CF\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8\u306F\u3042\u308A\u307E\u305B\u3093\u304B</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u958B\u767A\u30EA\u30BD\u30FC\u30B9\u304C\u9650\u3089\u308C\u3066\u3044\u308B\u305F\u3081\u3001\u73FE\u5728\u306E\u4ED5\u69D8\u306E\u753B\u50CF\u306E\u307F\u3092\u63D0\u4F9B\u3057\u3066\u3044\u307E\u3059\u3002</div> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Circle_help($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->\u5546\u7528\u5229\u7528\u3067\u304D\u307E\u3059\u304B</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u5229\u7528\u898F\u7D04\u3084\u30E9\u30A4\u30BB\u30F3\u30B9\u3092\u307E\u3060\u5B9A\u3081\u3066\u3044\u307E\u305B\u3093\u304C\u3001opencover\u304C\u751F\u6210\u3057\u305F\u753B\u50CF\u306F\u3001\u66F8\u7C4D\u306E\u7D39\u4ECB\u3084\u8CA9\u58F2\u4FC3\u9032\u306E\u76EE\u7684\u306B\u9650\u308A\u3054\u81EA\u7531\u306B\u304A\u4F7F\u3044\u3044\u305F\u3060\u3051\u307E\u3059\u3002
      \u305D\u308C\u4EE5\u5916\u306E\u8868\u7D19\u306E\u753B\u50CF\u306A\u3069\u306F\u5404\u51FA\u7248\u793E\u306E\u5229\u7528\u898F\u7D04\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002</div> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Circle_help($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->\u8868\u7D19\u3068\u80CC\u8868\u7D19\u306E\u4F4D\u7F6E\u95A2\u4FC2\u304C\u307E\u3061\u304C\u3063\u3066\u3044\u307E\u3059</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u7E26\u66F8\u304D\u306E\u672C\u3092\u60F3\u5B9A\u3057\u3066\u3001\u80CC\u8868\u7D19\u306E\u5DE6\u5074\u306B\u8868\u7D19\u3092\u914D\u7F6E\u3057\u3066\u3044\u307E\u3059\u3002
      \u672C\u306E\u66F8\u5B57\u65B9\u5411\u306E\u60C5\u5831\u3092\u8FFD\u52A0\u3067\u304D\u308C\u3070\u3001\u3053\u306E\u554F\u984C\u3092\u89E3\u6C7A\u3067\u304D\u308B\u304B\u3082\u3057\u308C\u307E\u305B\u3093\u3002</div> <h4 class="flex items-center gap-2 svelte-105wwcy">`;
  Circle_help($$payload, { size: 24, class: "inline-block" });
  $$payload.out += `<!---->\u958B\u767A\u306B\u5354\u529B\u3057\u305F\u3044\u3067\u3059\u3000\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u652F\u63F4\u3057\u305F\u3044\u3067\u3059</h4> <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\u3002
      \u30B9\u30BF\u30A4\u30EB\u306E\u4F5C\u6210\u306F\u3001\u3069\u306A\u305F\u3067\u3082\u3054\u53C2\u52A0\u3044\u305F\u3060\u3051\u308B\u3088\u3046\u306B\u3059\u308B\u4E88\u5B9A\u3067\u3059\u3002
      \u30B5\u30FC\u30D3\u30B9\u306E\u7DAD\u6301\u306B\u8CBB\u7528\u304C\u304B\u304B\u3063\u3066\u3044\u307E\u3059\u306E\u3067\u3001\u3054\u5BC4\u4ED8\u3082\u53D7\u3051\u4ED8\u3051\u308B\u4E88\u5B9A\u3067\u3059\u3002
      \u3054\u5354\u529B\u3044\u305F\u3060\u3051\u308B\u65B9\u306F\u3001\u305C\u3072\u304A\u554F\u3044\u5408\u308F\u305B\u304F\u3060\u3055\u3044\u3002</div></section></div>`;
}
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/how-to-use/_page.svelte.js"() {
    init_index2();
    init_Icon();
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component6,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7
});
var index7, component_cache6, component6, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    index7 = 6;
    component6 = async () => component_cache6 ??= (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    imports7 = ["_app/immutable/nodes/6.B0e4eheB.js", "_app/immutable/chunks/B-Dr2cRb.js", "_app/immutable/chunks/BlTpSGD8.js", "_app/immutable/chunks/DOvYsISe.js", "_app/immutable/chunks/Dq12EtSq.js", "_app/immutable/chunks/_BQvoK0b.js", "_app/immutable/chunks/Btw6_rf5.js", "_app/immutable/chunks/CABO9XDg.js", "_app/immutable/chunks/ChECSWBu.js"];
    stylesheets7 = ["_app/immutable/assets/6.ZMlI4n5w.css"];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/shelf/isbn/_isbn_/_page.server.ts.js
var page_server_ts_exports2 = {};
__export(page_server_ts_exports2, {
  load: () => load2
});
var load2;
var init_page_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/shelf/isbn/_isbn_/_page.server.ts.js"() {
    init_chunks();
    load2 = async ({ fetch: fetch2, params }) => {
      if (params.isbn) {
        const isbns = params.isbn.split(",");
        const promises = isbns.map((isbn) => fetch2(`/api/bib/${isbn}`).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        }));
        let books = await Promise.all(promises);
        books = books.map((book) => ({
          book,
          isbn: book.isbn,
          displaySides: ["spine"]
        }));
        const isSingleBook = books.length === 1;
        const title = isSingleBook ? `\u300E${books.at(0).book?.title}\u300F\u306E\u672C\u68DA` : `\u300E${books.at(0).book?.title}\u300F\u306A\u3069${books.length}\u518A\u306E\u672C\u68DA`;
        return {
          books,
          bgColor: "#f0f0f0",
          isSingleBook,
          title,
          meta: {
            title: `${title} \u2013 opencover`,
            description: `opencover\u306E${title}\u3067\u3059\u3002\u3042\u306A\u305F\u306E\u672C\u68DA\u3092\u4F5C\u308A\u307E\u3057\u3087\u3046\u3002`,
            image: `https://opencover.jp/api/og/${params.isbn}`,
            // image: `https://opencover.jp/api/og.png?isbn=${params.isbn}`,
            url: `https://opencover.jp/shelf/isbn/${params.isbn}`,
            type: "website"
          }
        };
      }
      error(404, "Not found");
    };
  }
});

// .svelte-kit/output/server/entries/pages/shelf/isbn/_isbn_/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => _page4
});
function BookCard($$payload, $$props) {
  push();
  const links = [
    {
      name: "buy",
      label: "\u8CB7\u3046",
      sites: [
        { name: "amazon", label: "Amazon" },
        { name: "rakuten", label: "\u697D\u5929\u30D6\u30C3\u30AF\u30B9" },
        { name: "kinokuniya", label: "\u7D00\u4F0A\u56FD\u5C4B\u66F8\u5E97" },
        { name: "maruzenjunkudo", label: "\u4E38\u5584\u30B8\u30E5\u30F3\u30AF\u5802" },
        { name: "honto", label: "honto" },
        { name: "openbs", label: "\u8FD1\u304F\u306E\u66F8\u5E97\u5728\u5EAB" }
      ]
    },
    {
      name: "search",
      label: "\u63A2\u3059",
      sites: [
        { name: "calil", label: "\u56F3\u66F8\u9928 (\u30AB\u30FC\u30EA\u30EB)" },
        { name: "cinii", label: "\u5927\u5B66\u56F3\u66F8\u9928 (CiNii Books)" }
      ]
    },
    {
      name: "record",
      label: "\u8A18\u9332\u3059\u308B",
      sites: [
        { name: "bookmeter", label: "\u8AAD\u66F8\u30E1\u30FC\u30BF\u30FC" },
        { name: "booklog", label: "\u30D6\u30AF\u30ED\u30B0" },
        { name: "googlebooks", label: "Google \u30D6\u30C3\u30AF\u30B9" }
      ]
    }
  ];
  const { book, index: index9 } = $$props;
  const hyphenedIsbn = import_isbn4.default.parse(book.book?.isbn).isValid ? import_isbn4.default.parse(book.book?.isbn).toString({ version: "isbn13", hyphens: [true] }) : "";
  const each_array = ensure_array_like(links);
  $$payload.out += `<section class="mb-4 border border-slate-200 p-6 rounded">`;
  if (index9 > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="px-4 py-2 text-sm bg-slate-100 size-fit rounded">${escape_html(index9)}\u518A\u76EE</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <h3 class="book-title flex items-center gap-2 text-xl font-bold mt-4"><span>${escape_html(book.book?.title)}${escape_html(book.book?.subtitle ? `\u2500\u2500${book.book?.subtitle}` : "")}</span></h3> <div class="my-3">${escape_html(book.book?.author)}</div> <div class="my-3">${escape_html(book.book?.label)}\u3000${escape_html(book.book?.publisher)}</div> <div class="my-3 text-xs md:text-sm font-mono">ISBN: ${escape_html(hyphenedIsbn)}</div> <div class="my-4"><div class="flex flex-col gap-3"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let { name, label, sites } = each_array[$$index_1];
    const each_array_1 = ensure_array_like(sites);
    $$payload.out += `<div class="flex items-center gap-2"><div class="text-sm font-semibold text-slate-800">${escape_html(label)}</div> <div class="flex flex-wrap gap-2"><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let { name: name2, label: label2 } = each_array_1[$$index];
      $$payload.out += `<a${attr("href", `/goto/${name2}/${book.book?.isbn}`)} target="_blank" class="px-2 py-1 text-xs md:text-sm border border-gray-300 rounded hover:bg-slate-100">${escape_html(label2)}</a>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div></section>`;
  pop();
}
function _page4($$payload, $$props) {
  push();
  let data = $$props["data"];
  let { books, bgColor, title, isSingleBook, meta } = data;
  const each_array = ensure_array_like(books);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>opencover : ${escape_html(title)}</title>`;
    $$payload2.out += `<meta property="og:url"${attr("content", meta.url)}> <meta property="og:title"${attr("content", meta.title)}> <meta property="og:description"${attr("content", meta.description)}> <meta property="og:image"${attr("content", meta.image)}> <meta property="og:type" content="article"> <meta property="og:site_name" content="opencover : \u307F\u3093\u306A\u3067\u3064\u304F\u308B\u66F8\u7C4D\u30AB\u30D0\u30FC\u753B\u50CF"> <meta name="description"${attr("content", meta.description)}> <meta name="twitter:card" content="summary_large_image">`;
  });
  $$payload.out += `<div class="md:w-8/12 p-4 mx-auto"><h3 class="title text-xl font-bold my-8 svelte-zbf2kb">${escape_html(title)}</h3> <div class="my-8">`;
  PreviewBook($$payload, {
    books,
    bgColor,
    link: `/goto/amazon/${books.at(0).book?.isbn}`
  });
  $$payload.out += `<!----></div> <!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let book = each_array[i];
    BookCard($$payload, { book, index: books.length > 1 ? i + 1 : 0 });
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { data });
  pop();
}
var import_isbn4;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/shelf/isbn/_isbn_/_page.svelte.js"() {
    init_index2();
    init_PreviewBook();
    import_isbn4 = __toESM(require_dist(), 1);
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component7,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  server: () => page_server_ts_exports2,
  server_id: () => server_id2,
  stylesheets: () => stylesheets8
});
var index8, component_cache7, component7, server_id2, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    init_page_server_ts2();
    index8 = 7;
    component7 = async () => component_cache7 ??= (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default;
    server_id2 = "src/routes/shelf/isbn/[isbn]/+page.server.ts";
    imports8 = ["_app/immutable/nodes/7.CmCcDpPN.js", "_app/immutable/chunks/B-Dr2cRb.js", "_app/immutable/chunks/BlTpSGD8.js", "_app/immutable/chunks/DOvYsISe.js", "_app/immutable/chunks/Btw6_rf5.js", "_app/immutable/chunks/Dq12EtSq.js", "_app/immutable/chunks/CABO9XDg.js", "_app/immutable/chunks/ChECSWBu.js", "_app/immutable/chunks/_BQvoK0b.js", "_app/immutable/chunks/Cta3jvXf.js", "_app/immutable/chunks/l_1nHkG4.js", "_app/immutable/chunks/DKmXJPfJ.js", "_app/immutable/chunks/CbsYtiTg.js", "_app/immutable/chunks/DdiJvTiH.js", "_app/immutable/chunks/CLK_dOat.js"];
    stylesheets8 = ["_app/immutable/assets/PreviewBook.71W-6VSR.css", "_app/immutable/assets/7.C_D1Cpey.css"];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/entries/endpoints/api/bib/_isbn_/_server.ts.js
var server_ts_exports = {};
__export(server_ts_exports, {
  GET: () => GET
});
async function GET({ params }) {
  const isbn = params.isbn;
  if (!isbn) {
    return new Response("ISBN not provided", { status: 400 });
  }
  const response = await fetch(`https://oc-bib.sugi2000.workers.dev/${isbn}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch book data for ISBN: ${isbn}`);
  }
  const responseJson = await response.json();
  return json(responseJson);
}
var init_server_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/bib/_isbn_/_server.ts.js"() {
    init_chunks();
  }
});

// .svelte-kit/output/server/entries/endpoints/api/og.png/_server.ts.js
var server_ts_exports2 = {};
__export(server_ts_exports2, {
  GET: () => GET2
});
var GET2;
var init_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/og.png/_server.ts.js"() {
    GET2 = async ({ url }) => {
      const { searchParams } = url;
      const isbn = searchParams.get("isbn");
      const endpoint = "https://oc-image.sugi2000.workers.dev/v1/og";
      const response = await fetch(`${endpoint}/${isbn}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });
      if (!response.ok) {
        return new Response("Failed to generate image", { status: 500 });
      }
      const imageBuffer = await response.arrayBuffer();
      return new Response(imageBuffer, {
        status: response.status,
        headers: {
          "Content-Type": "image/png"
          // 'Cache-Control': 'public, max-age=86400'
        }
      });
    };
  }
});

// .svelte-kit/output/server/entries/endpoints/api/og/_isbn_/_server.ts.js
var server_ts_exports3 = {};
__export(server_ts_exports3, {
  GET: () => GET3
});
async function GET3({ params }) {
  const isbn = params.isbn;
  const endpoint = "https://oc-image.sugi2000.workers.dev/v1/og";
  const response = await fetch(`${endpoint}/${isbn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  });
  if (!response.ok) {
    return new Response("Failed to generate image", { status: 500 });
  }
  const imageBuffer = await response.arrayBuffer();
  return new Response(imageBuffer, {
    status: response.status,
    headers: {
      "Content-Type": "image/png"
      // 'Cache-Control': 'public, max-age=86400'
    }
  });
}
var import_isbn5;
var init_server_ts3 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/og/_isbn_/_server.ts.js"() {
    init_src31();
    import_isbn5 = __toESM(require_dist(), 1);
    init_client();
  }
});

// .svelte-kit/output/server/entries/endpoints/api/publisher/_isbn_/_server.ts.js
var server_ts_exports4 = {};
__export(server_ts_exports4, {
  GET: () => GET4
});
async function GET4({ params }) {
  const isbn = params.isbn;
  if (!import_isbn6.default.parse(isbn).isValid) {
    return json({ error: "Invalid ISBN" }, { status: 400 });
  }
  const hyphenedISBN = import_isbn6.default.parse(isbn).toString({ version: "isbn13", hyphens: true });
  if (hyphenedISBN.substring(0, 5) !== "978-4") {
    return json({ error: "Not Found" }, { status: 404 });
  }
  const publisherCode = hyphenedISBN.split("-").at(2);
  const publisher = publishers.find((d) => d.code === publisherCode);
  if (!publisher) {
    return json({ error: "Not Found" }, { status: 404 });
  }
  return json(publisher, { status: 200 });
}
var import_isbn6, publishersStr, publishers;
var init_server_ts4 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/publisher/_isbn_/_server.ts.js"() {
    import_isbn6 = __toESM(require_dist(), 1);
    init_chunks();
    init_src31();
    publishersStr = `code	name	url
00	\u5CA9\u6CE2\u66F8\u5E97	http://www.iwanami.co.jp/
01	\u65FA\u6587\u793E	http://www.obunsha.co.jp/
02	\u671D\u65E5\u65B0\u805E\u51FA\u7248	http://publications.asahi.com/index.shtml
03	\u5055\u6210\u793E	http://www.kaiseisha.co.jp/
04	KADOKAWA	http://www.kadokawa.co.jp/
05	\u5B66\u7814\u30DE\u30FC\u30B1\u30C6\u30A3\u30F3\u30B0	http://gakken-marketing.co.jp/
06	\u8B1B\u8AC7\u793E	http://www.kodansha.co.jp/
07	\u4E3B\u5A66\u306E\u53CB\u793E	http://www.shufunotomo.co.jp/
08	\u96C6\u82F1\u793E	http://www.shueisha.co.jp/
09	\u5C0F\u5B66\u9928	http://www.shogakukan.co.jp/
10	\u65B0\u6F6E\u793E	http://www.shinchosha.co.jp/
11	\u5168\u97F3\u697D\u8B5C\u51FA\u7248\u793E	http://www.zen-on.co.jp/top/CSfTop.jsp
12	\u4E2D\u592E\u516C\u8AD6\u65B0\u793E	http://www.chuko.co.jp/
13	\u6771\u4EAC\u5927\u5B66\u51FA\u7248\u4F1A	http://www.utp.or.jp/
14	\uFF2E\uFF28\uFF2B\u51FA\u7248	https://www.nhk-book.co.jp/shop/main.jsp?trxID=C0010101
15	\u65E9\u5DDD\u66F8\u623F	http://www.hayakawa-online.co.jp/
16	\u6587\u85DD\u6625\u79CB	http://www.bunshun.co.jp/
17	\u56FD\u7ACB\u5370\u5237\u5C40	http://www.npb.go.jp/
18	\u660E\u6CBB\u56F3\u66F8\u51FA\u7248	http://www.meijitosho.co.jp/
19	\u5FB3\u9593\u66F8\u5E97	http://www.tokuma.jp/
250	\u9752\u6728\u66F8\u5E97	http://www.aokishoten.co.jp/contents/list/index.html
251	\u3042\u304B\u306D\u66F8\u623F	http://akaneshobo.co.jp/
252	\u6681\u6559\u80B2\u56F3\u66F8	
253	\u79CB\u7530\u66F8\u5E97	http://www.akitashoten.co.jp/index2.html
254	\u671D\u5009\u66F8\u5E97	http://www.asakura.co.jp/
255	\u671D\u65E5\u51FA\u7248\u793E	http://www.asahipress.com/
256	\u5E73\u51E1\u793E	http://www.heibonsha.co.jp/
258	\u30A2\u30B8\u30A2\u7D4C\u6E08\u7814\u7A76\u6240	http://www.ide.go.jp/Japanese/index.html
259	\u5BB6\u306E\u5149\u5354\u4F1A	http://www.ienohikari.net/
260	\u533B\u5B66\u66F8\u9662	http://www.igaku-shoin.co.jp/top.do
261	\u90C1\u6587\u5802	http://www.ikubundo.com/
262	\u6C60\u7530\u66F8\u5E97	http://www.ikedashoten.co.jp/
263	\u533B\u6B6F\u85AC\u51FA\u7248	http://www.ishiyaku.co.jp/
264	\u3044\u306E\u3061\u306E\u3053\u3068\u3070\u793E	http://www.wlpm.or.jp/index.htm
265	\u5CA9\u5D0E\u66F8\u5E97	http://www.iwasakishoten.co.jp/
266	\u3044\u3093\u306A\u3042\u3068\u308A\u3063\u3077\u793E	http://www.bukkyomanga.jp/
267	\u6F6E\u51FA\u7248\u793E	http://www.usio.co.jp/
268	\u82F1\u6F6E\u793E\u30D5\u30A7\u30CB\u30C3\u30AF\u30B9	http://www.onephe.com/
269	\u82F1\u5B9D\u793E	http://www.eihosha.co.jp/
271	\u5927\u962A\u6559\u80B2\u56F3\u66F8	http://www2.osk.3web.ne.jp/~daikyopb/
272	\u5927\u6708\u66F8\u5E97	http://www.otsukishoten.co.jp/
273	\u304A\u3046\u3075\u3046	http://www.ohfu.co.jp/index.html
274	\u30AA\u30FC\u30E0\u793E	http://www.ohmsha.co.jp/
275	\u5FA1\u8336\u306E\u6C34\u66F8\u623F	http://www.ochanomizushobo.co.jp/contents/list/index.html
276	\u97F3\u697D\u4E4B\u53CB\u793E	http://www.ongakunotomo.co.jp/
278	\u5927\u6CC9\u66F8\u5E97	http://www.oizumishoten.co.jp/
281	\u533B\u6B6F\u85AC\u51FA\u7248	http://www.ishiyaku.co.jp/
283	\u5927\u7A7A\u793E	http://www.ozorasha.co.jp/
284	\u65E5\u672C\u56F3\u66F8\u30BB\u30F3\u30BF\u30FC	http://www.nihontosho.co.jp/
285	\u30C9\u30EC\u30DF\u697D\u8B5C\u51FA\u7248\u793E	http://www.doremi.co.jp/Doremi/ATC01.do
286	\u6587\u82B8\u793E	http://www.bungeisha.co.jp/
287	\u533B\u5B66\u51FA\u7248	http://www.igaku.co.jp/
288	\u30A4\u30FC\u30D6\u30C3\u30AF\u30A4\u30CB\u30B7\u30A2\u30C6\u30A3\u30D6\u30B8\u30E3\u30D1\u30F3	http://www.ebookjapan.jp/ebj/
290	\u6559\u82F1\u51FA\u7248	http://kyoei-syuppan.net/
291	\u30AB\u30FC\u30B5\u30FB\u30D5\u30A7\u30DF\u30CB\u30CA\u6559\u80B2\u7814\u7A76\u6240	http://www.casa-feminina.com/
303	\u6D77\u6587\u5802\u51FA\u7248	http://www.kaibundo.jp/
304	\u958B\u9686\u5802\u51FA\u7248	http://www.kairyudo.co.jp/index.htm
305	\u7B20\u9593\u66F8\u9662	http://kasamashoin.jp/index.html
306	\u9E7F\u5CF6\u51FA\u7248\u4F1A	http://www.kajima-publishing.co.jp/
307	\u91D1\u539F\u51FA\u7248	http://www.kanehara-shuppan.co.jp/index.html
309	\u6CB3\u51FA\u66F8\u623F\u65B0\u793E	http://www.kawade.co.jp/np/index.html
311	\u5B66\u751F\u793E	http://www.gakusei.co.jp/
312	\u5B78\u71C8\u793E	http://www.gakutousya.co.jp/contents/list/index.html
313	\u5B66\u967D\u66F8\u623F	http://gakuyo.co.jp/
314	\u7D00\u4F0A\u570B\u5C4B\u66F8\u5E97\u51FA\u7248\u90E8	http://www.kinokuniya.co.jp/
315	\u30CB\u30E5\u30FC\u30C8\u30F3\u30D7\u30EC\u30B9	http://www.newtonpress.co.jp/
316	\u6559\u80B2\u51FA\u7248	http://www.kyoiku-shuppan.co.jp/
318	\u6559\u5B66\u7814\u7A76\u793E	http://www.kyougaku-kenkyuusha.co.jp/
319	\u5354\u540C\u51FA\u7248	http://www.kyodo-s.jp/
320	\u5171\u7ACB\u51FA\u7248	http://www.kyoritsu-pub.co.jp/
321	\u91D1\u5712\u793E	http://www.kin-en-sha.co.jp/
322	\u304D\u3093\u3056\u3044	http://store.kinzai.jp/book/
323	\u91D1\u306E\u661F\u793E	http://www.kinnohoshi.co.jp/
324	\u304E\u3087\u3046\u305B\u3044	http://gyosei.jp/
325	\u6559\u5B66\u793E	http://www.kyogakusha.co.jp/
326	\u52C1\u8349\u66F8\u623F	http://www.keisoshobo.co.jp/
327	\u7814\u7A76\u793E	http://www.kenkyusha.co.jp/modules/00_top/index.php?content_id=1
328	\u82B8\u8853\u751F\u6D3B\u793E	http://www.lifeisart.co.jp/
329	\u73FE\u4EE3\u601D\u6F6E\u65B0\u793E	http://www.gendaishicho.co.jp/
330	\u4EA4\u901A\u65B0\u805E\u793E	http://www.kotsu.co.jp/
331	\u5EE3\u6E08\u5802\u51FA\u7248	http://www.kosaido-pub.co.jp/
332	\u5149\u751F\u9928	http://www.koseikan.co.jp/
333	\u4F7C\u6210\u51FA\u7248\u793E	http://www.kosei-shuppan.co.jp/
334	\u5149\u6587\u793E	http://www.kobunsha.com/
335	\u5F18\u6587\u5802	http://www.koubundou.co.jp/
336	\u56FD\u66F8\u520A\u884C\u4F1A	http://www.kokusho.co.jp/np/index.html
337	\u56FD\u571F\u793E	http://www.kokudosha.co.jp/
338	\u5C0F\u5CF0\u66F8\u5E97	http://www.komineshoten.co.jp/
339	\u30B3\u30ED\u30CA\u793E	http://www.coronasha.co.jp/np/index.html
340	\u68A7\u6850\u66F8\u9662	http://www.gotoshoin.com/
341	\u3054\u307E\u66F8\u623F\u65B0\u793E	http://gomashobo.com/
342	\u6850\u539F\u66F8\u5E97	http://www.kirihara.co.jp/
343	\u795E\u6238\u65B0\u805E\u7DCF\u5408\u51FA\u7248\u30BB\u30F3\u30BF\u30FC	http://ec.kobe-np.co.jp/syuppan/html/
344	\u5E7B\u51AC\u820E	http://www.gentosha.co.jp/
378	\u3055\u30FB\u3048\u30FB\u3089\u66F8\u623F	http://www.saela.co.jp/
380	\u4E09\u4E00\u66F8\u623F	http://31shobo.com/
382	\u7523\u696D\u80FD\u7387\u5927\u5B66\u51FA\u7248\u90E8	http://www.sannopub.co.jp/
384	\u4E09\u4FEE\u793E	http://www.sanshusha.co.jp/np/index.do
385	\u4E09\u7701\u5802	http://www.sanseido-publ.co.jp/
387	\u30B5\u30F3\u30EA\u30AA	http://www.sanrio.co.jp/
388	\u67F4\u7530\u66F8\u5E97	http://www.shibatashoten.co.jp/
389	\u6E05\u6C34\u66F8\u9662	http://www.shimizushoin.co.jp/
391	\u4E3B\u5A66\u3068\u751F\u6D3B\u793E	http://www.shufu.co.jp/
393	\u6625\u79CB\u793E	http://www.shunjusha.co.jp/index.html
394	\u6625\u967D\u5802\u66F8\u5E97	http://www.shun-yo-do.co.jp/
395	\u5F70\u56FD\u793E	http://www.shokokusha.co.jp/
396	\u7965\u4F1D\u793E	http://www.shodensha.co.jp/
398	\u662D\u6587\u793E	http://www.mapple.co.jp/
399	\u6607\u9F8D\u5802\u51FA\u7248	http://www.shoryudo.co.jp/index.html
400	\u65B0\u6559\u51FA\u7248\u793E	http://www.shinkyo-pb.com/
401	\u30B7\u30F3\u30B3\u30FC\u30DF\u30E5\u30FC\u30B8\u30C3\u30AF\u30FB\u30A8\u30F3\u30BF\u30C6\u30A4\u30E1\u30F3\u30C8	http://www.shinko-music.co.jp/main/Top.do
402	\u65B0\u8208\u51FA\u7248\u793E\u5553\u6797\u9928	http://www.shinko-keirin.co.jp/
403	\u65B0\u66F8\u9928	http://www.shinshokan.co.jp/
405	\u65B0\u661F\u51FA\u7248\u793E	http://www.shin-sei.co.jp/np/index.html
406	\u65B0\u65E5\u672C\u51FA\u7248\u793E	http://www.shinnihon-net.co.jp/
407	\u5B9F\u6559\u51FA\u7248	http://www.jikkyo.co.jp/
408	\u5B9F\u696D\u4E4B\u65E5\u672C\u793E	http://www.j-n.co.jp/
409	\u4EBA\u6587\u66F8\u9662	http://www.jimbunshoin.co.jp/
410	\u6570\u7814\u51FA\u7248	http://www.chart.co.jp/
411	\u99FF\u6CB3\u53F0\u51FA\u7248\u793E	http://www.e-surugadai.com/
412	\u8056\u6559\u65B0\u805E\u793E	http://www.seikyoonline.jp/
413	\u9752\u6625\u51FA\u7248\u793E	http://seishun.co.jp/
414	\u8AA0\u4FE1\u66F8\u623F	http://www.seishinshobo.co.jp/
415	\u6210\u7F8E\u5802\u51FA\u7248	http://www.seibidoshuppan.co.jp/
416	\u8AA0\u6587\u5802\u65B0\u5149\u793E	http://www.seibundo-shinkosha.net/
417	\u9752\u6797\u66F8\u9662	http://www.seirin.co.jp/
418	\u4E16\u754C\u6587\u5316\u793E	http://www.sekaibunka.com/
419	\u7A0E\u52D9\u7D4C\u7406\u5354\u4F1A	http://www.zeikei.co.jp/
420	\u5275\u7F8E\u793E	http://sobisha.shueisha.co.jp/
421	\u8FD1\u4EE3\u6D88\u9632\u793E	http://www.ff-inc.co.jp/
422	\u5275\u5143\u793E	http://www.sogensha.co.jp/
423	\u5275\u6587\u793E	http://www.sobunsha.co.jp/
424	\u5897\u9032\u5802\u30FB\u53D7\u9A13\u7814\u7A76\u793E	http://www.zoshindo.co.jp/
425	\u6210\u5C71\u5802\u66F8\u5E97	http://www.seizando.co.jp/
426	\u81EA\u7531\u56FD\u6C11\u793E	http://www.jiyu.co.jp/
431	\u30B7\u30E5\u30D7\u30EA\u30F3\u30AC\u30FC\u30FB\u30B8\u30E3\u30D1\u30F3	http://www.springer.jp/
432	\u30BC\u30F3\u30EA\u30F3	http://www.zenrin.co.jp/
433	\u6E05\u6587\u793E	http://www.skattsei.co.jp/
434	\u661F\u96F2\u793E	
469	\u5927\u4FEE\u9928\u66F8\u5E97	http://www.taishukan.co.jp/
471	\u9AD8\u6A4B\u66F8\u5E97	http://www.takahashishoten.co.jp/
472	\u7389\u5DDD\u5927\u5B66\u51FA\u7248\u90E8	http://tamagawa.hondana.jp/
473	\u6DE1\u4EA4\u793E	http://www.tankosha.co.jp/
474	\u7B2C\u4E00\u6CD5\u898F	http://www.daiichihoki.co.jp/dh/
475	\u5927\u5B66\u66F8\u6797	http://www.daigakusyorin.co.jp/
476	\u7B2C\u4E09\u6587\u660E\u793E	http://www.daisanbunmei.co.jp/
477	\u5927\u65E5\u672C\u56F3\u66F8	http://www.dainippon-tosho.co.jp/
478	\u30C0\u30A4\u30E4\u30E2\u30F3\u30C9\u793E	http://www.diamond.co.jp/
479	\u5927\u548C\u66F8\u623F	http://www.daiwashobo.co.jp/
480	\u7B51\u6469\u66F8\u623F	http://www.chikumashobo.co.jp/
481	\u4E2D\u592E\u7D4C\u6E08\u793E	http://www.chuokeizai.co.jp/
482	\u4E2D\u592E\u56F3\u66F8\u51FA\u7248\u793E	http://www.chuotosho.com/
484	\u962A\u6025\u30B3\u30DF\u30E5\u30CB\u30B1\u30FC\u30B7\u30E7\u30F3\u30BA	http://www.hankyu-com.co.jp/
485	\u96FB\u6C17\u66F8\u9662	http://www.denkishoin.co.jp/denkishoin/info/
486	\u6771\u6D77\u5927\u5B66\u51FA\u7248\u4F1A	http://www.press.tokai.ac.jp/top.jsp
487	\u6771\u4EAC\u66F8\u7C4D	http://www.tokyo-shoseki.co.jp/
488	\u6771\u4EAC\u5275\u5143\u793E	http://www.tsogen.co.jp/np/index.html
489	\u6771\u4EAC\u56F3\u66F8	http://www.tokyo-tosho.co.jp/
490	\u6771\u4EAC\u5802\u51FA\u7248	http://www.tokyodoshuppan.com/
491	\u6771\u6D0B\u9928\u51FA\u7248\u793E	http://www.toyokan.co.jp/
492	\u6771\u6D0B\u7D4C\u6E08\u65B0\u5831\u793E	http://toyokeizai.net/
494	\u7AE5\u5FC3\u793E	http://www.doshinsha.co.jp/
495	\u540C\u6587\u8218\u51FA\u7248	http://www.dobunkan.co.jp/pub/
496	\u540C\u53CB\u9928	http://www.doyukan.co.jp/
497	\u6771\u65B9\u66F8\u5E97	http://www.toho-shoten.co.jp/
498	\u4E2D\u5916\u533B\u5B66\u793E	https://www.chugaiigaku.jp/modules/shop/
499	\u5927\u65E5\u672C\u7D75\u753B	http://www.kaiga.co.jp/emp-bin/pro1.cgi/www/default.html
500	\u5927\u6771\u51FA\u7248\u793E	http://www.daitopb.co.jp/
501	\u6771\u4EAC\u96FB\u6A5F\u5927\u5B66\u51FA\u7248\u5C40	http://www.tdupress.jp/
502	\u4E2D\u592E\u7D4C\u6E08\u793E	http://www.chuokeizai.co.jp/
503	\u5730\u65B9\u30FB\u5C0F\u51FA\u7248\u6D41\u901A\u30BB\u30F3\u30BF\u30FC	http://neil.chips.jp/chihosho/
521	\u4E2D\u5C71\u66F8\u5E97	http://www.nakayamashoten.co.jp/contents/list/index.html
522	\u6C38\u5CA1\u66F8\u5E97	http://www.nagaokashoten.co.jp/
523	\u5357\u96F2\u5802	http://www.nanun-do.co.jp/
524	\u5357\u6C5F\u5802	http://www.nankodo.co.jp/wasyo/main/top.asp
525	\u5357\u5C71\u5802	http://www.nanzando.com/
526	\u65E5\u520A\u5DE5\u696D\u65B0\u805E\u793E	http://www.nikkan.co.jp/
529	\u65E5\u672C\u30F4\u30A9\u30FC\u30B0\u793E	http://www.nihonvogue.co.jp/
530	\u65E5\u672C\u5171\u7523\u515A\u4E2D\u592E\u59D4\u54E1\u4F1A\u51FA\u7248\u5C40	http://www.jcp.or.jp/web_book/
531	\u65E5\u672C\u6559\u6587\u793E	http://www.kyobunsha.jp/
532	\u65E5\u672C\u7D4C\u6E08\u65B0\u805E\u51FA\u7248\u793E	http://www.nikkeibook.com/
533	JTB\u30D1\u30D6\u30EA\u30C3\u30B7\u30F3\u30B0	http://www.jtbpublishing.com/index.html
534	\u65E5\u672C\u5B9F\u696D\u51FA\u7248\u793E	http://www.njg.co.jp/
535	\u65E5\u672C\u8A55\u8AD6\u793E	http://www.nippyo.co.jp/
536	\u65E5\u672C\u6587\u6559\u51FA\u7248	http://www.nichibun-g.co.jp/
537	\u65E5\u672C\u6587\u82B8\u793E	http://www.nihonbungeisha.co.jp/
538	\u52B4\u50CD\u653F\u7B56\u7814\u7A76\u30FB\u7814\u4FEE\u6A5F\u69CB	http://www.jil.go.jp/
539	\u65E5\u672C\u6CD5\u4EE4	http://www.horei.co.jp/
540	\u8FB2\u5C71\u6F01\u6751\u6587\u5316\u5354\u4F1A	http://www.ruralnet.or.jp/
541	\u8FB2\u6797\u7D71\u8A08\u5354\u4F1A	http://www.aafs.or.jp/
542	\u65E5\u672C\u898F\u683C\u5354\u4F1A	http://www.jsa.or.jp/default.asp
544	\u4E8C\u7384\u793E	http://nigensha.co.jp/
560	\u767D\u6C34\u793E	http://www.hakusuisha.co.jp/
561	\u767D\u6843\u66F8\u623F	http://www.hakutou.co.jp/
562	\u539F\u66F8\u623F	http://www.harashobo.co.jp/
563	\u57F9\u98A8\u9928	http://www.baifukan.co.jp/
564	\u3072\u304B\u308A\u306E\u304F\u306B	http://www.hikarinokuni.co.jp/
565	\u4E00\u30C4\u6A4B\u66F8\u5E97	http://www.one-bridge.jp/
566	\u8A55\u8AD6\u793E	http://www.hyoronsha.co.jp/
567	\u5EE3\u5DDD\u66F8\u5E97	http://www.hirokawa-shoten.co.jp/
568	\u7F8E\u8853\u51FA\u7248\u793E	http://www.bijutsu.co.jp/bss/
569	\uFF30\uFF28\uFF30\u7814\u7A76\u6240	http://www.php.co.jp/
571	\u798F\u6751\u51FA\u7248	http://www.fukumura.co.jp/
572	\u51A8\u5C71\u623F	http://fuzambo.net/
573	\u30CF\u30FC\u30B9\u30C8\u5A66\u4EBA\u753B\u5831\u793E	http://www.hearst.co.jp/
575	\u53CC\u8449\u793E	http://www.futabasha.co.jp/
576	\u4E8C\u898B\u66F8\u623F	http://www.futami.co.jp/index.php
577	\u30D5\u30EC\u30FC\u30D9\u30EB\u9928	http://www.froebel-kan.co.jp/
578	\u6587\u82F1\u5802	http://www.bun-eido.co.jp/
579	\u6587\u5316\u51FA\u7248\u5C40	http://books.bunka.ac.jp/np/index.do
580	\u6587\u7814\u51FA\u7248	http://www.shinko-bunken.com/bunken/
581	\u6587\u7406	http://www.bunri.co.jp/
583	\u30D9\u30FC\u30B9\u30DC\u30FC\u30EB\u30DE\u30AC\u30B8\u30F3\u793E	http://www.bbm-japan.com./
584	\u30D9\u30B9\u30C8\u30BB\u30E9\u30FC\u30BA	http://www.kk-bestsellers.com/
585	\u52C9\u8AA0\u51FA\u7248	http://bensei.jp/
586	\u4FDD\u80B2\u793E	http://www.hoikusha.co.jp/
587	\u6CD5\u5B66\u66F8\u9662	http://www.hougakushoin.co.jp/
588	\u6CD5\u653F\u5927\u5B66\u51FA\u7248\u5C40	http://www.h-up.com/
589	\u6CD5\u5F8B\u6587\u5316\u793E	http://www.hou-bun.com/index.html
590	\u5317\u661F\u5802\u51FA\u7248	http://www.hokuseido.com/
591	\u30DD\u30D7\u30E9\u793E	http://www.poplar.co.jp/
592	\u767D\u6CC9\u793E	http://www.hakusensha.co.jp/index.shtml
593	\u307B\u308B\u3077\u51FA\u7248	http://www.holp-pub.co.jp/
594	\u6276\u6851\u793E	http://www.fusosha.co.jp/
595	\u653E\u9001\u5927\u5B66\u6559\u80B2\u632F\u8208\u4F1A	http://www.ua-book.or.jp/
596	\u30CF\u30FC\u30EC\u30AF\u30A4\u30F3	http://www.harlequin.co.jp/
620	\u6BCE\u65E5\u65B0\u805E\u793E	http://www.mainichi.co.jp/
621	\u4E38\u5584\u51FA\u7248	http://pub.maruzen.co.jp/
622	\u307F\u3059\u305A\u66F8\u623F	http://www.msz.co.jp/
623	\u30DF\u30CD\u30EB\u30F4\u30A1\u66F8\u623F	http://www.minervashobo.co.jp/
624	\u672A\u6765\u793E	http://http://www.miraisha.co.jp/np/index.html
625	\u660E\u6CBB\u66F8\u9662	http://www.meijishoin.co.jp/
626	\u540D\u8457\u51FA\u7248	http://www.meicho.co.jp/
627	\u68EE\u5317\u51FA\u7248	http://www.morikita.co.jp/
634	\u5C71\u5DDD\u51FA\u7248\u793E	http://www.yamakawa.co.jp/
635	\u5C71\u3068\u6EAA\u8C37\u793E	http://www.yamakei.co.jp/
636	\u30E4\u30DE\u30CF\u30DF\u30E5\u30FC\u30B8\u30C3\u30AF\u30E1\u30C7\u30A3\u30A2	http://www.ymm.co.jp/
638	\u6709\u7D00\u66F8\u623F	http://www.yukishobo.co.jp/
639	\u96C4\u5C71\u95A3	http://www.yuzankaku.co.jp/index.html
641	\u6709\u6590\u95A3	http://www.yuhikaku.co.jp/
642	\u5409\u5DDD\u5F18\u6587\u9928	http://www.yoshikawa-k.co.jp/
643	\u8AAD\u58F2\u65B0\u805E	http://info.yomiuri.co.jp/
650	\u7406\u60F3\u793E	
652	\u7406\u8AD6\u793E	http://www.rironsha.com/
653	\u81E8\u5DDD\u66F8\u5E97	http://www.rinsen.com/
654	\u9ECE\u660E\u66F8\u623F	http://www.reimei-shobo.com/
656	\u6CB3\u4E2D\u81EA\u6CBB\u632F\u8208\u8CA1\u56E3	
657	\u65E9\u7A32\u7530\u5927\u5B66\u51FA\u7248\u90E8	http://www.waseda-up.co.jp/`;
    publishers = tsvParse(publishersStr);
  }
});

// .svelte-kit/output/server/entries/endpoints/api/random-isbn/_server.ts.js
var server_ts_exports5 = {};
__export(server_ts_exports5, {
  GET: () => GET5
});
async function GET5() {
  try {
    const timestamp = Date.now();
    const response = await fetch(`https://oc-image.sugi2000.workers.dev/v1/random-isbn?${timestamp}`);
    if (!response.ok) {
      return json({ error: "Failed to fetch ISBN", status: response.status }, { status: 500 });
    }
    const responseJson = await response.json();
    return json(responseJson);
  } catch (error2) {
    return json({ error: "An error occurred", message: error2.message }, { status: 500 });
  }
}
var init_server_ts5 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/random-isbn/_server.ts.js"() {
    init_chunks();
  }
});

// .svelte-kit/output/server/entries/endpoints/api/style/isbn/_isbn_/_server.ts.js
var server_ts_exports6 = {};
__export(server_ts_exports6, {
  GET: () => GET6
});
async function GET6({ params, platform }) {
  const isbn = params.isbn;
  try {
    let response = await fetch(`https://oc-bib.sugi2000.workers.dev/${isbn}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch book data for ISBN: ${isbn}`);
    }
    const book = await response.json();
    if (!book) {
      return new Response("Book data not found", { status: 404 });
    }
    response = await fetch(`https://oc-style.sugi2000.workers.dev/api/resolve/${book.seriesTitle || book.label || ""}`);
    if (!response.ok) {
      throw new Error(`Failed to resolve style name for book: ${book.title}`);
    }
    const { name } = await response.json();
    if (!name) {
      return new Response("Style name not found", { status: 404 });
    }
    response = await fetch(`https://oc-style.sugi2000.workers.dev/api/style/${name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch style data for book: ${book.title}`);
    }
    const result = await response.json();
    if (!result) {
      return new Response("Style data not found", { status: 404 });
    }
    return json(result);
  } catch (error2) {
    console.error("Service binding error:", error2);
    return json({ success: false, error: error2.message }, { status: 500 });
  }
}
var init_server_ts6 = __esm({
  ".svelte-kit/output/server/entries/endpoints/api/style/isbn/_isbn_/_server.ts.js"() {
    init_chunks();
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/Mime.js
var require_Mime = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    Mime.prototype.define = function(typeMap, force) {
      for (let type2 in typeMap) {
        let extensions = typeMap[type2].map(function(t) {
          return t.toLowerCase();
        });
        type2 = type2.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type2 + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type2 + '".'
            );
          }
          this._types[ext] = type2;
        }
        if (force || !this._extensions[type2]) {
          const ext = extensions[0];
          this._extensions[type2] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type2) {
      type2 = /^\s*([^;\s]*)/.test(type2) && RegExp.$1;
      return type2 && this._extensions[type2.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/standard.js
var require_standard = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/standard.js"(exports, module) {
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/other.js
var require_other = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/types/other.js"(exports, module) {
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/mime/index.js
var require_mime = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/mime/index.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/types.js
var require_types = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
    var KVError = class _KVError extends Error {
      constructor(message, status = 500) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = _KVError.name;
        this.status = status;
      }
    };
    exports.KVError = KVError;
    var MethodNotAllowedError = class extends KVError {
      constructor(message = `Not a valid request method`, status = 405) {
        super(message, status);
      }
    };
    exports.MethodNotAllowedError = MethodNotAllowedError;
    var NotFoundError = class extends KVError {
      constructor(message = `Not Found`, status = 404) {
        super(message, status);
      }
    };
    exports.NotFoundError = NotFoundError;
    var InternalError = class extends KVError {
      constructor(message = `Internal Error in KV Asset Handler`, status = 500) {
        super(message, status);
      }
    };
    exports.InternalError = InternalError;
  }
});

// .svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/index.js
var require_dist2 = __commonJS({
  ".svelte-kit/cloudflare-workers-tmp/node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
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
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
    var mime = require_mime();
    var types_1 = require_types();
    Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function() {
      return types_1.MethodNotAllowedError;
    } });
    Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
      return types_1.NotFoundError;
    } });
    Object.defineProperty(exports, "InternalError", { enumerable: true, get: function() {
      return types_1.InternalError;
    } });
    var defaultCacheControl = {
      browserTTL: null,
      edgeTTL: 2 * 60 * 60 * 24,
      bypassCache: false
      // do not bypass Cloudflare's cache
    };
    var parseStringAsObject = (maybeString) => typeof maybeString === "string" ? JSON.parse(maybeString) : maybeString;
    var getAssetFromKVDefaultOptions = {
      ASSET_NAMESPACE: typeof __STATIC_CONTENT !== "undefined" ? __STATIC_CONTENT : void 0,
      ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== "undefined" ? parseStringAsObject(__STATIC_CONTENT_MANIFEST) : void 0,
      cacheControl: defaultCacheControl,
      defaultMimeType: "text/plain",
      defaultDocument: "index.html"
    };
    function assignOptions(options2) {
      return Object.assign({}, getAssetFromKVDefaultOptions, options2);
    }
    var mapRequestToAsset2 = (request, options2) => {
      options2 = assignOptions(options2);
      const parsedUrl = new URL(request.url);
      let pathname = parsedUrl.pathname;
      if (pathname.endsWith("/")) {
        pathname = pathname.concat(options2.defaultDocument);
      } else if (!mime.getType(pathname)) {
        pathname = pathname.concat("/" + options2.defaultDocument);
      }
      parsedUrl.pathname = pathname;
      return new Request(parsedUrl.toString(), request);
    };
    exports.mapRequestToAsset = mapRequestToAsset2;
    function serveSinglePageApp(request, options2) {
      options2 = assignOptions(options2);
      request = mapRequestToAsset2(request, options2);
      const parsedUrl = new URL(request.url);
      if (parsedUrl.pathname.endsWith(".html")) {
        return new Request(`${parsedUrl.origin}/${options2.defaultDocument}`, request);
      } else {
        return request;
      }
    }
    exports.serveSinglePageApp = serveSinglePageApp;
    var getAssetFromKV2 = (event, options2) => __awaiter(void 0, void 0, void 0, function* () {
      options2 = assignOptions(options2);
      const request = event.request;
      const ASSET_NAMESPACE = options2.ASSET_NAMESPACE;
      const ASSET_MANIFEST = parseStringAsObject(options2.ASSET_MANIFEST);
      if (typeof ASSET_NAMESPACE === "undefined") {
        throw new types_1.InternalError(`there is no KV namespace bound to the script`);
      }
      const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
      let pathIsEncoded = false;
      let requestKey;
      if (options2.mapRequestToAsset) {
        requestKey = options2.mapRequestToAsset(request);
      } else if (ASSET_MANIFEST[rawPathKey]) {
        requestKey = request;
      } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
        pathIsEncoded = true;
        requestKey = request;
      } else {
        const mappedRequest = mapRequestToAsset2(request);
        const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, "");
        if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
          pathIsEncoded = true;
          requestKey = mappedRequest;
        } else {
          requestKey = mapRequestToAsset2(request, options2);
        }
      }
      const SUPPORTED_METHODS = ["GET", "HEAD"];
      if (!SUPPORTED_METHODS.includes(requestKey.method)) {
        throw new types_1.MethodNotAllowedError(`${requestKey.method} is not a valid request method`);
      }
      const parsedUrl = new URL(requestKey.url);
      const pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
      let pathKey = pathname.replace(/^\/+/, "");
      const cache = caches.default;
      let mimeType = mime.getType(pathKey) || options2.defaultMimeType;
      if (mimeType.startsWith("text") || mimeType === "application/javascript") {
        mimeType += "; charset=utf-8";
      }
      let shouldEdgeCache = false;
      if (typeof ASSET_MANIFEST !== "undefined") {
        if (ASSET_MANIFEST[pathKey]) {
          pathKey = ASSET_MANIFEST[pathKey];
          shouldEdgeCache = true;
        }
      }
      let cacheKey = new Request(`${parsedUrl.origin}/${pathKey}`, request);
      const evalCacheOpts = (() => {
        switch (typeof options2.cacheControl) {
          case "function":
            return options2.cacheControl(request);
          case "object":
            return options2.cacheControl;
          default:
            return defaultCacheControl;
        }
      })();
      const formatETag = (entityId = pathKey, validatorType = "strong") => {
        if (!entityId) {
          return "";
        }
        switch (validatorType) {
          case "weak":
            if (!entityId.startsWith("W/")) {
              return `W/${entityId}`;
            }
            return entityId;
          case "strong":
            if (entityId.startsWith(`W/"`)) {
              entityId = entityId.replace("W/", "");
            }
            if (!entityId.endsWith(`"`)) {
              entityId = `"${entityId}"`;
            }
            return entityId;
          default:
            return "";
        }
      };
      options2.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
      if (options2.cacheControl.bypassCache || options2.cacheControl.edgeTTL === null || request.method == "HEAD") {
        shouldEdgeCache = false;
      }
      const shouldSetBrowserCache = typeof options2.cacheControl.browserTTL === "number";
      let response = null;
      if (shouldEdgeCache) {
        response = yield cache.match(cacheKey);
      }
      if (response) {
        if (response.status > 300 && response.status < 400) {
          if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
            response.body.cancel();
            console.log("Body exists and environment supports readable streams. Body cancelled");
          } else {
            console.log("Environment doesnt support readable streams");
          }
          response = new Response(null, response);
        } else {
          let opts = {
            headers: new Headers(response.headers),
            status: 0,
            statusText: ""
          };
          opts.headers.set("cf-cache-status", "HIT");
          if (response.status) {
            opts.status = response.status;
            opts.statusText = response.statusText;
          } else if (opts.headers.has("Content-Range")) {
            opts.status = 206;
            opts.statusText = "Partial Content";
          } else {
            opts.status = 200;
            opts.statusText = "OK";
          }
          response = new Response(response.body, opts);
        }
      } else {
        const body2 = yield ASSET_NAMESPACE.get(pathKey, "arrayBuffer");
        if (body2 === null) {
          throw new types_1.NotFoundError(`could not find ${pathKey} in your content namespace`);
        }
        response = new Response(body2);
        if (shouldEdgeCache) {
          response.headers.set("Accept-Ranges", "bytes");
          response.headers.set("Content-Length", body2.length);
          if (!response.headers.has("etag")) {
            response.headers.set("etag", formatETag(pathKey, "strong"));
          }
          response.headers.set("Cache-Control", `max-age=${options2.cacheControl.edgeTTL}`);
          event.waitUntil(cache.put(cacheKey, response.clone()));
          response.headers.set("CF-Cache-Status", "MISS");
        }
      }
      response.headers.set("Content-Type", mimeType);
      if (response.status === 304) {
        let etag2 = formatETag(response.headers.get("etag"), "strong");
        let ifNoneMatch = cacheKey.headers.get("if-none-match");
        let proxyCacheStatus = response.headers.get("CF-Cache-Status");
        if (etag2) {
          if (ifNoneMatch && ifNoneMatch === etag2 && proxyCacheStatus === "MISS") {
            response.headers.set("CF-Cache-Status", "EXPIRED");
          } else {
            response.headers.set("CF-Cache-Status", "REVALIDATED");
          }
          response.headers.set("etag", formatETag(etag2, "weak"));
        }
      }
      if (shouldSetBrowserCache) {
        response.headers.set("Cache-Control", `max-age=${options2.cacheControl.browserTTL}`);
      } else {
        response.headers.delete("Cache-Control");
      }
      return response;
    });
    exports.getAssetFromKV = getAssetFromKV2;
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_utils();
init_equality();
init_index2();
var BROWSER = false;
var base = "";
var assets = base;
var app_dir = "_app";
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
var DERIVED = 1 << 1;
var EFFECT = 1 << 2;
var RENDER_EFFECT = 1 << 3;
var BLOCK_EFFECT = 1 << 4;
var BRANCH_EFFECT = 1 << 5;
var ROOT_EFFECT = 1 << 6;
var BOUNDARY_EFFECT = 1 << 7;
var UNOWNED = 1 << 8;
var DISCONNECTED = 1 << 9;
var CLEAN = 1 << 10;
var DIRTY = 1 << 11;
var MAYBE_DIRTY = 1 << 12;
var INERT = 1 << 13;
var DESTROYED = 1 << 14;
var EFFECT_RAN = 1 << 15;
var EFFECT_TRANSPARENT = 1 << 16;
var HEAD_EFFECT = 1 << 19;
var EFFECT_HAS_DERIVED = 1 << 20;
var EFFECT_IS_UPDATING = 1 << 21;
var STATE_SYMBOL = Symbol("$state");
var LEGACY_PROPS = Symbol("legacy props");
function effect_update_depth_exceeded() {
  {
    throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
  }
}
function hydration_failed() {
  {
    throw new Error(`https://svelte.dev/e/hydration_failed`);
  }
}
function state_descriptors_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
  }
}
function state_prototype_fixed() {
  {
    throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
  }
}
function state_unsafe_mutation() {
  {
    throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
  }
}
var tracing_mode_flag = false;
function hydration_mismatch(location) {
  {
    console.warn(`https://svelte.dev/e/hydration_mismatch`);
  }
}
var component_context = null;
function set_component_context(context2) {
  component_context = context2;
}
function push2(props, runes = false, fn) {
  var ctx = component_context = {
    p: component_context,
    c: null,
    d: false,
    e: null,
    m: false,
    s: props,
    x: null,
    l: null
  };
  teardown(() => {
    ctx.d = true;
  });
}
function pop2(component8) {
  const context_stack_item = component_context;
  if (context_stack_item !== null) {
    const component_effects = context_stack_item.e;
    if (component_effects !== null) {
      var previous_effect = active_effect;
      var previous_reaction = active_reaction;
      context_stack_item.e = null;
      try {
        for (var i = 0; i < component_effects.length; i++) {
          var component_effect = component_effects[i];
          set_active_effect(component_effect.effect);
          set_active_reaction(component_effect.reaction);
          effect(component_effect.fn);
        }
      } finally {
        set_active_effect(previous_effect);
        set_active_reaction(previous_reaction);
      }
    }
    component_context = context_stack_item.p;
    context_stack_item.m = true;
  }
  return (
    /** @type {T} */
    {}
  );
}
function is_runes() {
  return true;
}
function proxy(value, prev) {
  if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
    return value;
  }
  const prototype = get_prototype_of(value);
  if (prototype !== object_prototype && prototype !== array_prototype) {
    return value;
  }
  var sources = /* @__PURE__ */ new Map();
  var is_proxied_array = is_array(value);
  var version = state(0);
  var reaction = active_reaction;
  var with_parent = (fn) => {
    var previous_reaction = active_reaction;
    set_active_reaction(reaction);
    var result;
    {
      result = fn();
    }
    set_active_reaction(previous_reaction);
    return result;
  };
  if (is_proxied_array) {
    sources.set("length", state(
      /** @type {any[]} */
      value.length
    ));
  }
  return new Proxy(
    /** @type {any} */
    value,
    {
      defineProperty(_, prop, descriptor) {
        if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
          state_descriptors_fixed();
        }
        var s2 = sources.get(prop);
        if (s2 === void 0) {
          s2 = with_parent(() => state(descriptor.value));
          sources.set(prop, s2);
        } else {
          set(
            s2,
            with_parent(() => proxy(descriptor.value))
          );
        }
        return true;
      },
      deleteProperty(target, prop) {
        var s2 = sources.get(prop);
        if (s2 === void 0) {
          if (prop in target) {
            sources.set(
              prop,
              with_parent(() => state(UNINITIALIZED))
            );
          }
        } else {
          if (is_proxied_array && typeof prop === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop);
            if (Number.isInteger(n) && n < ls.v) {
              set(ls, n);
            }
          }
          set(s2, UNINITIALIZED);
          update_version(version);
        }
        return true;
      },
      get(target, prop, receiver) {
        if (prop === STATE_SYMBOL) {
          return value;
        }
        var s2 = sources.get(prop);
        var exists = prop in target;
        if (s2 === void 0 && (!exists || get_descriptor(target, prop)?.writable)) {
          s2 = with_parent(() => state(proxy(exists ? target[prop] : UNINITIALIZED)));
          sources.set(prop, s2);
        }
        if (s2 !== void 0) {
          var v = get(s2);
          return v === UNINITIALIZED ? void 0 : v;
        }
        return Reflect.get(target, prop, receiver);
      },
      getOwnPropertyDescriptor(target, prop) {
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
        if (descriptor && "value" in descriptor) {
          var s2 = sources.get(prop);
          if (s2) descriptor.value = get(s2);
        } else if (descriptor === void 0) {
          var source2 = sources.get(prop);
          var value2 = source2?.v;
          if (source2 !== void 0 && value2 !== UNINITIALIZED) {
            return {
              enumerable: true,
              configurable: true,
              value: value2,
              writable: true
            };
          }
        }
        return descriptor;
      },
      has(target, prop) {
        if (prop === STATE_SYMBOL) {
          return true;
        }
        var s2 = sources.get(prop);
        var has = s2 !== void 0 && s2.v !== UNINITIALIZED || Reflect.has(target, prop);
        if (s2 !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop)?.writable)) {
          if (s2 === void 0) {
            s2 = with_parent(() => state(has ? proxy(target[prop]) : UNINITIALIZED));
            sources.set(prop, s2);
          }
          var value2 = get(s2);
          if (value2 === UNINITIALIZED) {
            return false;
          }
        }
        return has;
      },
      set(target, prop, value2, receiver) {
        var s2 = sources.get(prop);
        var has = prop in target;
        if (is_proxied_array && prop === "length") {
          for (var i = value2; i < /** @type {Source<number>} */
          s2.v; i += 1) {
            var other_s = sources.get(i + "");
            if (other_s !== void 0) {
              set(other_s, UNINITIALIZED);
            } else if (i in target) {
              other_s = with_parent(() => state(UNINITIALIZED));
              sources.set(i + "", other_s);
            }
          }
        }
        if (s2 === void 0) {
          if (!has || get_descriptor(target, prop)?.writable) {
            s2 = with_parent(() => state(void 0));
            set(
              s2,
              with_parent(() => proxy(value2))
            );
            sources.set(prop, s2);
          }
        } else {
          has = s2.v !== UNINITIALIZED;
          set(
            s2,
            with_parent(() => proxy(value2))
          );
        }
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
        if (descriptor?.set) {
          descriptor.set.call(receiver, value2);
        }
        if (!has) {
          if (is_proxied_array && typeof prop === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop);
            if (Number.isInteger(n) && n >= ls.v) {
              set(ls, n + 1);
            }
          }
          update_version(version);
        }
        return true;
      },
      ownKeys(target) {
        get(version);
        var own_keys = Reflect.ownKeys(target).filter((key22) => {
          var source3 = sources.get(key22);
          return source3 === void 0 || source3.v !== UNINITIALIZED;
        });
        for (var [key2, source2] of sources) {
          if (source2.v !== UNINITIALIZED && !(key2 in target)) {
            own_keys.push(key2);
          }
        }
        return own_keys;
      },
      setPrototypeOf() {
        state_prototype_fixed();
      }
    }
  );
}
function update_version(signal, d = 1) {
  set(signal, signal.v + d);
}
var old_values = /* @__PURE__ */ new Map();
function source(v, stack) {
  var signal = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v,
    reactions: null,
    equals,
    rv: 0,
    wv: 0
  };
  return signal;
}
function state(v, stack) {
  const s2 = source(v);
  push_reaction_value(s2);
  return s2;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value, immutable2 = false) {
  const s2 = source(initial_value);
  if (!immutable2) {
    s2.equals = safe_equals;
  }
  return s2;
}
function set(source2, value, should_proxy = false) {
  if (active_reaction !== null && !untracking && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT)) !== 0 && !reaction_sources?.includes(source2)) {
    state_unsafe_mutation();
  }
  let new_value = should_proxy ? proxy(value) : value;
  return internal_set(source2, new_value);
}
function internal_set(source2, value) {
  if (!source2.equals(value)) {
    var old_value = source2.v;
    if (is_destroying_effect) {
      old_values.set(source2, value);
    } else {
      old_values.set(source2, old_value);
    }
    source2.v = value;
    source2.wv = increment_write_version();
    mark_reactions(source2, DIRTY);
    if (active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
      if (untracked_writes === null) {
        set_untracked_writes([source2]);
      } else {
        untracked_writes.push(source2);
      }
    }
  }
  return value;
}
function mark_reactions(signal, status) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  var length = reactions.length;
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) continue;
    set_signal_status(reaction, status);
    if ((flags & (CLEAN | UNOWNED)) !== 0) {
      if ((flags & DERIVED) !== 0) {
        mark_reactions(
          /** @type {Derived} */
          reaction,
          MAYBE_DIRTY
        );
      } else {
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
}
var hydrating = false;
function set_hydrating(value) {
  hydrating = value;
}
var hydrate_node;
function set_hydrate_node(node) {
  if (node === null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return hydrate_node = node;
}
function hydrate_next() {
  return set_hydrate_node(
    /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(hydrate_node)
  );
}
var $window;
var first_child_getter;
var next_sibling_getter;
function init_operations() {
  if ($window !== void 0) {
    return;
  }
  $window = window;
  var element_prototype = Element.prototype;
  var node_prototype = Node.prototype;
  var text_prototype = Text.prototype;
  first_child_getter = get_descriptor(node_prototype, "firstChild").get;
  next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
  if (is_extensible(element_prototype)) {
    element_prototype.__click = void 0;
    element_prototype.__className = void 0;
    element_prototype.__attributes = null;
    element_prototype.__style = void 0;
    element_prototype.__e = void 0;
  }
  if (is_extensible(text_prototype)) {
    text_prototype.__t = void 0;
  }
}
function create_text(value = "") {
  return document.createTextNode(value);
}
// @__NO_SIDE_EFFECTS__
function get_first_child(node) {
  return first_child_getter.call(node);
}
// @__NO_SIDE_EFFECTS__
function get_next_sibling(node) {
  return next_sibling_getter.call(node);
}
function clear_text_content(node) {
  node.textContent = "";
}
function destroy_derived_effects(derived) {
  var effects = derived.effects;
  if (effects !== null) {
    derived.effects = null;
    for (var i = 0; i < effects.length; i += 1) {
      destroy_effect(
        /** @type {Effect} */
        effects[i]
      );
    }
  }
}
function get_derived_parent_effect(derived) {
  var parent = derived.parent;
  while (parent !== null) {
    if ((parent.f & DERIVED) === 0) {
      return (
        /** @type {Effect} */
        parent
      );
    }
    parent = parent.parent;
  }
  return null;
}
function execute_derived(derived) {
  var value;
  var prev_active_effect = active_effect;
  set_active_effect(get_derived_parent_effect(derived));
  {
    try {
      destroy_derived_effects(derived);
      value = update_reaction(derived);
    } finally {
      set_active_effect(prev_active_effect);
    }
  }
  return value;
}
function update_derived(derived) {
  var value = execute_derived(derived);
  var status = (skip_reaction || (derived.f & UNOWNED) !== 0) && derived.deps !== null ? MAYBE_DIRTY : CLEAN;
  set_signal_status(derived, status);
  if (!derived.equals(value)) {
    derived.v = value;
    derived.wv = increment_write_version();
  }
}
function push_effect(effect2, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect2;
  } else {
    parent_last.next = effect2;
    effect2.prev = parent_last;
    parent_effect.last = effect2;
  }
}
function create_effect(type2, fn, sync, push22 = true) {
  var parent = active_effect;
  var effect2 = {
    ctx: component_context,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: type2 | DIRTY,
    first: null,
    fn,
    last: null,
    next: null,
    parent,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0
  };
  if (sync) {
    try {
      update_effect(effect2);
      effect2.f |= EFFECT_RAN;
    } catch (e) {
      destroy_effect(effect2);
      throw e;
    }
  } else if (fn !== null) {
    schedule_effect(effect2);
  }
  var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes_start === null && effect2.teardown === null && (effect2.f & (EFFECT_HAS_DERIVED | BOUNDARY_EFFECT)) === 0;
  if (!inert && push22) {
    if (parent !== null) {
      push_effect(effect2, parent);
    }
    if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
      var derived = (
        /** @type {Derived} */
        active_reaction
      );
      (derived.effects ??= []).push(effect2);
    }
  }
  return effect2;
}
function teardown(fn) {
  const effect2 = create_effect(RENDER_EFFECT, null, false);
  set_signal_status(effect2, CLEAN);
  effect2.teardown = fn;
  return effect2;
}
function component_root(fn) {
  const effect2 = create_effect(ROOT_EFFECT, fn, true);
  return (options2 = {}) => {
    return new Promise((fulfil) => {
      if (options2.outro) {
        pause_effect(effect2, () => {
          destroy_effect(effect2);
          fulfil(void 0);
        });
      } else {
        destroy_effect(effect2);
        fulfil(void 0);
      }
    });
  };
}
function effect(fn) {
  return create_effect(EFFECT, fn, false);
}
function branch(fn, push22 = true) {
  return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push22);
}
function execute_effect_teardown(effect2) {
  var teardown2 = effect2.teardown;
  if (teardown2 !== null) {
    const previously_destroying_effect = is_destroying_effect;
    const previous_reaction = active_reaction;
    set_is_destroying_effect(true);
    set_active_reaction(null);
    try {
      teardown2.call(null);
    } finally {
      set_is_destroying_effect(previously_destroying_effect);
      set_active_reaction(previous_reaction);
    }
  }
}
function destroy_effect_children(signal, remove_dom = false) {
  var effect2 = signal.first;
  signal.first = signal.last = null;
  while (effect2 !== null) {
    var next = effect2.next;
    if ((effect2.f & ROOT_EFFECT) !== 0) {
      effect2.parent = null;
    } else {
      destroy_effect(effect2, remove_dom);
    }
    effect2 = next;
  }
}
function destroy_block_effect_children(signal) {
  var effect2 = signal.first;
  while (effect2 !== null) {
    var next = effect2.next;
    if ((effect2.f & BRANCH_EFFECT) === 0) {
      destroy_effect(effect2);
    }
    effect2 = next;
  }
}
function destroy_effect(effect2, remove_dom = true) {
  var removed = false;
  if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null) {
    var node = effect2.nodes_start;
    var end = effect2.nodes_end;
    while (node !== null) {
      var next = node === end ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      node.remove();
      node = next;
    }
    removed = true;
  }
  destroy_effect_children(effect2, remove_dom && !removed);
  remove_reactions(effect2, 0);
  set_signal_status(effect2, DESTROYED);
  var transitions = effect2.transitions;
  if (transitions !== null) {
    for (const transition2 of transitions) {
      transition2.stop();
    }
  }
  execute_effect_teardown(effect2);
  var parent = effect2.parent;
  if (parent !== null && parent.first !== null) {
    unlink_effect(effect2);
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes_start = effect2.nodes_end = null;
}
function unlink_effect(effect2) {
  var parent = effect2.parent;
  var prev = effect2.prev;
  var next = effect2.next;
  if (prev !== null) prev.next = next;
  if (next !== null) next.prev = prev;
  if (parent !== null) {
    if (parent.first === effect2) parent.first = next;
    if (parent.last === effect2) parent.last = prev;
  }
}
function pause_effect(effect2, callback) {
  var transitions = [];
  pause_children(effect2, transitions, true);
  run_out_transitions(transitions, () => {
    destroy_effect(effect2);
    if (callback) callback();
  });
}
function run_out_transitions(transitions, fn) {
  var remaining = transitions.length;
  if (remaining > 0) {
    var check = () => --remaining || fn();
    for (var transition2 of transitions) {
      transition2.out(check);
    }
  } else {
    fn();
  }
}
function pause_children(effect2, transitions, local) {
  if ((effect2.f & INERT) !== 0) return;
  effect2.f ^= INERT;
  if (effect2.transitions !== null) {
    for (const transition2 of effect2.transitions) {
      if (transition2.is_global || local) {
        transitions.push(transition2);
      }
    }
  }
  var child = effect2.first;
  while (child !== null) {
    var sibling = child.next;
    var transparent = (child.f & EFFECT_TRANSPARENT) !== 0 || (child.f & BRANCH_EFFECT) !== 0;
    pause_children(child, transitions, transparent ? local : false);
    child = sibling;
  }
}
var micro_tasks = [];
var idle_tasks = [];
function run_micro_tasks() {
  var tasks = micro_tasks;
  micro_tasks = [];
  run_all(tasks);
}
function run_idle_tasks() {
  var tasks = idle_tasks;
  idle_tasks = [];
  run_all(tasks);
}
function flush_tasks() {
  if (micro_tasks.length > 0) {
    run_micro_tasks();
  }
  if (idle_tasks.length > 0) {
    run_idle_tasks();
  }
}
var is_throwing_error = false;
var is_flushing = false;
var last_scheduled_effect = null;
var is_updating_effect = false;
var is_destroying_effect = false;
function set_is_destroying_effect(value) {
  is_destroying_effect = value;
}
var queued_root_effects = [];
var active_reaction = null;
var untracking = false;
function set_active_reaction(reaction) {
  active_reaction = reaction;
}
var active_effect = null;
function set_active_effect(effect2) {
  active_effect = effect2;
}
var reaction_sources = null;
function set_reaction_sources(sources) {
  reaction_sources = sources;
}
function push_reaction_value(value) {
  if (active_reaction !== null && active_reaction.f & EFFECT_IS_UPDATING) {
    if (reaction_sources === null) {
      set_reaction_sources([value]);
    } else {
      reaction_sources.push(value);
    }
  }
}
var new_deps = null;
var skipped_deps = 0;
var untracked_writes = null;
function set_untracked_writes(value) {
  untracked_writes = value;
}
var write_version = 1;
var read_version = 0;
var skip_reaction = false;
function increment_write_version() {
  return ++write_version;
}
function check_dirtiness(reaction) {
  var flags = reaction.f;
  if ((flags & DIRTY) !== 0) {
    return true;
  }
  if ((flags & MAYBE_DIRTY) !== 0) {
    var dependencies = reaction.deps;
    var is_unowned = (flags & UNOWNED) !== 0;
    if (dependencies !== null) {
      var i;
      var dependency;
      var is_disconnected = (flags & DISCONNECTED) !== 0;
      var is_unowned_connected = is_unowned && active_effect !== null && !skip_reaction;
      var length = dependencies.length;
      if (is_disconnected || is_unowned_connected) {
        var derived = (
          /** @type {Derived} */
          reaction
        );
        var parent = derived.parent;
        for (i = 0; i < length; i++) {
          dependency = dependencies[i];
          if (is_disconnected || !dependency?.reactions?.includes(derived)) {
            (dependency.reactions ??= []).push(derived);
          }
        }
        if (is_disconnected) {
          derived.f ^= DISCONNECTED;
        }
        if (is_unowned_connected && parent !== null && (parent.f & UNOWNED) === 0) {
          derived.f ^= UNOWNED;
        }
      }
      for (i = 0; i < length; i++) {
        dependency = dependencies[i];
        if (check_dirtiness(
          /** @type {Derived} */
          dependency
        )) {
          update_derived(
            /** @type {Derived} */
            dependency
          );
        }
        if (dependency.wv > reaction.wv) {
          return true;
        }
      }
    }
    if (!is_unowned || active_effect !== null && !skip_reaction) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
function propagate_error(error2, effect2) {
  var current = effect2;
  while (current !== null) {
    if ((current.f & BOUNDARY_EFFECT) !== 0) {
      try {
        current.fn(error2);
        return;
      } catch {
        current.f ^= BOUNDARY_EFFECT;
      }
    }
    current = current.parent;
  }
  is_throwing_error = false;
  throw error2;
}
function should_rethrow_error(effect2) {
  return (effect2.f & DESTROYED) === 0 && (effect2.parent === null || (effect2.parent.f & BOUNDARY_EFFECT) === 0);
}
function handle_error(error2, effect2, previous_effect, component_context2) {
  if (is_throwing_error) {
    if (previous_effect === null) {
      is_throwing_error = false;
    }
    if (should_rethrow_error(effect2)) {
      throw error2;
    }
    return;
  }
  if (previous_effect !== null) {
    is_throwing_error = true;
  }
  {
    propagate_error(error2, effect2);
    return;
  }
}
function schedule_possible_effect_self_invalidation(signal, effect2, root22 = true) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  for (var i = 0; i < reactions.length; i++) {
    var reaction = reactions[i];
    if (reaction_sources?.includes(signal)) continue;
    if ((reaction.f & DERIVED) !== 0) {
      schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        reaction,
        effect2,
        false
      );
    } else if (effect2 === reaction) {
      if (root22) {
        set_signal_status(reaction, DIRTY);
      } else if ((reaction.f & CLEAN) !== 0) {
        set_signal_status(reaction, MAYBE_DIRTY);
      }
      schedule_effect(
        /** @type {Effect} */
        reaction
      );
    }
  }
}
function update_reaction(reaction) {
  var previous_deps = new_deps;
  var previous_skipped_deps = skipped_deps;
  var previous_untracked_writes = untracked_writes;
  var previous_reaction = active_reaction;
  var previous_skip_reaction = skip_reaction;
  var previous_reaction_sources = reaction_sources;
  var previous_component_context = component_context;
  var previous_untracking = untracking;
  var flags = reaction.f;
  new_deps = /** @type {null | Value[]} */
  null;
  skipped_deps = 0;
  untracked_writes = null;
  skip_reaction = (flags & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null);
  active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
  reaction_sources = null;
  set_component_context(reaction.ctx);
  untracking = false;
  read_version++;
  reaction.f |= EFFECT_IS_UPDATING;
  try {
    var result = (
      /** @type {Function} */
      (0, reaction.fn)()
    );
    var deps = reaction.deps;
    if (new_deps !== null) {
      var i;
      remove_reactions(reaction, skipped_deps);
      if (deps !== null && skipped_deps > 0) {
        deps.length = skipped_deps + new_deps.length;
        for (i = 0; i < new_deps.length; i++) {
          deps[skipped_deps + i] = new_deps[i];
        }
      } else {
        reaction.deps = deps = new_deps;
      }
      if (!skip_reaction) {
        for (i = skipped_deps; i < deps.length; i++) {
          (deps[i].reactions ??= []).push(reaction);
        }
      }
    } else if (deps !== null && skipped_deps < deps.length) {
      remove_reactions(reaction, skipped_deps);
      deps.length = skipped_deps;
    }
    if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
      for (i = 0; i < /** @type {Source[]} */
      untracked_writes.length; i++) {
        schedule_possible_effect_self_invalidation(
          untracked_writes[i],
          /** @type {Effect} */
          reaction
        );
      }
    }
    if (previous_reaction !== null) {
      read_version++;
      if (untracked_writes !== null) {
        if (previous_untracked_writes === null) {
          previous_untracked_writes = untracked_writes;
        } else {
          previous_untracked_writes.push(.../** @type {Source[]} */
          untracked_writes);
        }
      }
    }
    return result;
  } finally {
    new_deps = previous_deps;
    skipped_deps = previous_skipped_deps;
    untracked_writes = previous_untracked_writes;
    active_reaction = previous_reaction;
    skip_reaction = previous_skip_reaction;
    reaction_sources = previous_reaction_sources;
    set_component_context(previous_component_context);
    untracking = previous_untracking;
    reaction.f ^= EFFECT_IS_UPDATING;
  }
}
function remove_reaction(signal, dependency) {
  let reactions = dependency.reactions;
  if (reactions !== null) {
    var index9 = index_of.call(reactions, signal);
    if (index9 !== -1) {
      var new_length = reactions.length - 1;
      if (new_length === 0) {
        reactions = dependency.reactions = null;
      } else {
        reactions[index9] = reactions[new_length];
        reactions.pop();
      }
    }
  }
  if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (new_deps === null || !new_deps.includes(dependency))) {
    set_signal_status(dependency, MAYBE_DIRTY);
    if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
      dependency.f ^= DISCONNECTED;
    }
    destroy_derived_effects(
      /** @type {Derived} **/
      dependency
    );
    remove_reactions(
      /** @type {Derived} **/
      dependency,
      0
    );
  }
}
function remove_reactions(signal, start_index) {
  var dependencies = signal.deps;
  if (dependencies === null) return;
  for (var i = start_index; i < dependencies.length; i++) {
    remove_reaction(signal, dependencies[i]);
  }
}
function update_effect(effect2) {
  var flags = effect2.f;
  if ((flags & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var previous_effect = active_effect;
  var previous_component_context = component_context;
  var was_updating_effect = is_updating_effect;
  active_effect = effect2;
  is_updating_effect = true;
  try {
    if ((flags & BLOCK_EFFECT) !== 0) {
      destroy_block_effect_children(effect2);
    } else {
      destroy_effect_children(effect2);
    }
    execute_effect_teardown(effect2);
    var teardown2 = update_reaction(effect2);
    effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
    effect2.wv = write_version;
    var deps = effect2.deps;
    var dep;
    if (BROWSER && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && deps !== null) ;
    if (BROWSER) ;
  } catch (error2) {
    handle_error(error2, effect2, previous_effect, previous_component_context || effect2.ctx);
  } finally {
    is_updating_effect = was_updating_effect;
    active_effect = previous_effect;
  }
}
function infinite_loop_guard() {
  try {
    effect_update_depth_exceeded();
  } catch (error2) {
    if (last_scheduled_effect !== null) {
      {
        handle_error(error2, last_scheduled_effect, null);
      }
    } else {
      throw error2;
    }
  }
}
function flush_queued_root_effects() {
  var was_updating_effect = is_updating_effect;
  try {
    var flush_count = 0;
    is_updating_effect = true;
    while (queued_root_effects.length > 0) {
      if (flush_count++ > 1e3) {
        infinite_loop_guard();
      }
      var root_effects = queued_root_effects;
      var length = root_effects.length;
      queued_root_effects = [];
      for (var i = 0; i < length; i++) {
        var collected_effects = process_effects(root_effects[i]);
        flush_queued_effects(collected_effects);
      }
    }
  } finally {
    is_flushing = false;
    is_updating_effect = was_updating_effect;
    last_scheduled_effect = null;
    old_values.clear();
  }
}
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0) return;
  for (var i = 0; i < length; i++) {
    var effect2 = effects[i];
    if ((effect2.f & (DESTROYED | INERT)) === 0) {
      try {
        if (check_dirtiness(effect2)) {
          update_effect(effect2);
          if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
            if (effect2.teardown === null) {
              unlink_effect(effect2);
            } else {
              effect2.fn = null;
            }
          }
        }
      } catch (error2) {
        handle_error(error2, effect2, null, effect2.ctx);
      }
    }
  }
}
function schedule_effect(signal) {
  if (!is_flushing) {
    is_flushing = true;
    queueMicrotask(flush_queued_root_effects);
  }
  var effect2 = last_scheduled_effect = signal;
  while (effect2.parent !== null) {
    effect2 = effect2.parent;
    var flags = effect2.f;
    if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
      if ((flags & CLEAN) === 0) return;
      effect2.f ^= CLEAN;
    }
  }
  queued_root_effects.push(effect2);
}
function process_effects(root22) {
  var effects = [];
  var effect2 = root22;
  while (effect2 !== null) {
    var flags = effect2.f;
    var is_branch = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
    var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
    if (!is_skippable_branch && (flags & INERT) === 0) {
      if ((flags & EFFECT) !== 0) {
        effects.push(effect2);
      } else if (is_branch) {
        effect2.f ^= CLEAN;
      } else {
        var previous_active_reaction = active_reaction;
        try {
          active_reaction = effect2;
          if (check_dirtiness(effect2)) {
            update_effect(effect2);
          }
        } catch (error2) {
          handle_error(error2, effect2, null, effect2.ctx);
        } finally {
          active_reaction = previous_active_reaction;
        }
      }
      var child = effect2.first;
      if (child !== null) {
        effect2 = child;
        continue;
      }
    }
    var parent = effect2.parent;
    effect2 = effect2.next;
    while (effect2 === null && parent !== null) {
      effect2 = parent.next;
      parent = parent.parent;
    }
  }
  return effects;
}
function flushSync(fn) {
  var result;
  flush_tasks();
  while (queued_root_effects.length > 0) {
    is_flushing = true;
    flush_queued_root_effects();
    flush_tasks();
  }
  return (
    /** @type {T} */
    result
  );
}
function get(signal) {
  var flags = signal.f;
  var is_derived = (flags & DERIVED) !== 0;
  if (active_reaction !== null && !untracking) {
    if (!reaction_sources?.includes(signal)) {
      var deps = active_reaction.deps;
      if (signal.rv < read_version) {
        signal.rv = read_version;
        if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
          skipped_deps++;
        } else if (new_deps === null) {
          new_deps = [signal];
        } else if (!skip_reaction || !new_deps.includes(signal)) {
          new_deps.push(signal);
        }
      }
    }
  } else if (is_derived && /** @type {Derived} */
  signal.deps === null && /** @type {Derived} */
  signal.effects === null) {
    var derived = (
      /** @type {Derived} */
      signal
    );
    var parent = derived.parent;
    if (parent !== null && (parent.f & UNOWNED) === 0) {
      derived.f ^= UNOWNED;
    }
  }
  if (is_derived) {
    derived = /** @type {Derived} */
    signal;
    if (check_dirtiness(derived)) {
      update_derived(derived);
    }
  }
  if (is_destroying_effect && old_values.has(signal)) {
    return old_values.get(signal);
  }
  return signal.v;
}
var STATUS_MASK = -7169;
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
var all_registered_events = /* @__PURE__ */ new Set();
var root_event_handles = /* @__PURE__ */ new Set();
function handle_event_propagation(event) {
  var handler_element = this;
  var owner_document = (
    /** @type {Node} */
    handler_element.ownerDocument
  );
  var event_name = event.type;
  var path = event.composedPath?.() || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event.target
  );
  var path_idx = 0;
  var handled_at = event.__root;
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event.__root = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event.target;
  if (current_target === handler_element) return;
  define_property(event, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    var throw_error;
    var other_errors = [];
    while (current_target !== null) {
      var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
      current_target.host || null;
      try {
        var delegated = current_target["__" + event_name];
        if (delegated != null && (!/** @type {any} */
        current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
        // -> the target could not have been disabled because it emits the event in the first place
        event.target === current_target)) {
          if (is_array(delegated)) {
            var [fn, ...data] = delegated;
            fn.apply(current_target, [event, ...data]);
          } else {
            delegated.call(current_target, event);
          }
        }
      } catch (error2) {
        if (throw_error) {
          other_errors.push(error2);
        } else {
          throw_error = error2;
        }
      }
      if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
        break;
      }
      current_target = parent_element;
    }
    if (throw_error) {
      for (let error2 of other_errors) {
        queueMicrotask(() => {
          throw error2;
        });
      }
      throw throw_error;
    }
  } finally {
    event.__root = handler_element;
    delete event.currentTarget;
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
function assign_nodes(start2, end) {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  if (effect2.nodes_start === null) {
    effect2.nodes_start = start2;
    effect2.nodes_end = end;
  }
}
function mount(component8, options2) {
  return _mount(component8, options2);
}
function hydrate(component8, options2) {
  init_operations();
  options2.intro = options2.intro ?? false;
  const target = options2.target;
  const was_hydrating = hydrating;
  const previous_hydrate_node = hydrate_node;
  try {
    var anchor = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(target)
    );
    while (anchor && (anchor.nodeType !== 8 || /** @type {Comment} */
    anchor.data !== HYDRATION_START)) {
      anchor = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(anchor);
    }
    if (!anchor) {
      throw HYDRATION_ERROR;
    }
    set_hydrating(true);
    set_hydrate_node(
      /** @type {Comment} */
      anchor
    );
    hydrate_next();
    const instance = _mount(component8, { ...options2, anchor });
    if (hydrate_node === null || hydrate_node.nodeType !== 8 || /** @type {Comment} */
    hydrate_node.data !== HYDRATION_END) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    set_hydrating(false);
    return (
      /**  @type {Exports} */
      instance
    );
  } catch (error2) {
    if (error2 === HYDRATION_ERROR) {
      if (options2.recover === false) {
        hydration_failed();
      }
      init_operations();
      clear_text_content(target);
      set_hydrating(false);
      return mount(component8, options2);
    }
    throw error2;
  } finally {
    set_hydrating(was_hydrating);
    set_hydrate_node(previous_hydrate_node);
  }
}
var document_listeners = /* @__PURE__ */ new Map();
function _mount(Component, { target, anchor, props = {}, events, context: context2, intro = true }) {
  init_operations();
  var registered_events = /* @__PURE__ */ new Set();
  var event_handle = (events2) => {
    for (var i = 0; i < events2.length; i++) {
      var event_name = events2[i];
      if (registered_events.has(event_name)) continue;
      registered_events.add(event_name);
      var passive = is_passive_event(event_name);
      target.addEventListener(event_name, handle_event_propagation, { passive });
      var n = document_listeners.get(event_name);
      if (n === void 0) {
        document.addEventListener(event_name, handle_event_propagation, { passive });
        document_listeners.set(event_name, 1);
      } else {
        document_listeners.set(event_name, n + 1);
      }
    }
  };
  event_handle(array_from(all_registered_events));
  root_event_handles.add(event_handle);
  var component8 = void 0;
  var unmount2 = component_root(() => {
    var anchor_node = anchor ?? target.appendChild(create_text());
    branch(() => {
      if (context2) {
        push2({});
        var ctx = (
          /** @type {ComponentContext} */
          component_context
        );
        ctx.c = context2;
      }
      if (events) {
        props.$$events = events;
      }
      if (hydrating) {
        assign_nodes(
          /** @type {TemplateNode} */
          anchor_node,
          null
        );
      }
      component8 = Component(anchor_node, props) || {};
      if (hydrating) {
        active_effect.nodes_end = hydrate_node;
      }
      if (context2) {
        pop2();
      }
    });
    return () => {
      for (var event_name of registered_events) {
        target.removeEventListener(event_name, handle_event_propagation);
        var n = (
          /** @type {number} */
          document_listeners.get(event_name)
        );
        if (--n === 0) {
          document.removeEventListener(event_name, handle_event_propagation);
          document_listeners.delete(event_name);
        } else {
          document_listeners.set(event_name, n);
        }
      }
      root_event_handles.delete(event_handle);
      if (anchor_node !== anchor) {
        anchor_node.parentNode?.removeChild(anchor_node);
      }
    };
  });
  mounted_components.set(component8, unmount2);
  return component8;
}
var mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component8, options2) {
  const fn = mounted_components.get(component8);
  if (fn) {
    mounted_components.delete(component8);
    return fn(options2);
  }
  return Promise.resolve();
}
function asClassComponent$1(component8) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options2) {
      super({
        component: component8,
        ...options2
      });
    }
  };
}
var Svelte4Component = class {
  /** @type {any} */
  #events;
  /** @type {Record<string, any>} */
  #instance;
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(options2) {
    var sources = /* @__PURE__ */ new Map();
    var add_source = (key2, value) => {
      var s2 = /* @__PURE__ */ mutable_source(value);
      sources.set(key2, s2);
      return s2;
    };
    const props = new Proxy(
      { ...options2.props || {}, $$events: {} },
      {
        get(target, prop) {
          return get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
        },
        has(target, prop) {
          if (prop === LEGACY_PROPS) return true;
          get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
          return Reflect.has(target, prop);
        },
        set(target, prop, value) {
          set(sources.get(prop) ?? add_source(prop, value), value);
          return Reflect.set(target, prop, value);
        }
      }
    );
    this.#instance = (options2.hydrate ? hydrate : mount)(options2.component, {
      target: options2.target,
      anchor: options2.anchor,
      props,
      context: options2.context,
      intro: options2.intro ?? false,
      recover: options2.recover
    });
    if (!options2?.props?.$$host || options2.sync === false) {
      flushSync();
    }
    this.#events = props.$$events;
    for (const key2 of Object.keys(this.#instance)) {
      if (key2 === "$set" || key2 === "$destroy" || key2 === "$on") continue;
      define_property(this, key2, {
        get() {
          return this.#instance[key2];
        },
        /** @param {any} value */
        set(value) {
          this.#instance[key2] = value;
        },
        enumerable: true
      });
    }
    this.#instance.$set = /** @param {Record<string, any>} next */
    (next) => {
      Object.assign(props, next);
    };
    this.#instance.$destroy = () => {
      unmount(this.#instance);
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    this.#instance.$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event, callback) {
    this.#events[event] = this.#events[event] || [];
    const cb = (...args) => callback.call(this, ...args);
    this.#events[event].push(cb);
    return () => {
      this.#events[event] = this.#events[event].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    this.#instance.$destroy();
  }
};
var read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
function asClassComponent(component8) {
  const component_constructor = asClassComponent$1(component8);
  const _render = (props, { context: context2 } = {}) => {
    const result = render(component8, { props, context: context2 });
    return {
      css: { code: "", map: null },
      head: result.head,
      html: result.body
    };
  };
  component_constructor.render = _render;
  return component_constructor;
}
var prerendering = false;
function Root($$payload, $$props) {
  push();
  let {
    stores: stores2,
    page: page2,
    constructors,
    components = [],
    form,
    data_0 = null,
    data_1 = null
  } = $$props;
  {
    setContext("__svelte__", stores2);
  }
  {
    stores2.page.set(page2);
  }
  const Pyramid_1 = constructors[1];
  if (constructors[1]) {
    $$payload.out += "<!--[-->";
    const Pyramid_0 = constructors[0];
    $$payload.out += `<!---->`;
    Pyramid_0($$payload, {
      data: data_0,
      form,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        Pyramid_1($$payload2, { data: data_1, form });
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    const Pyramid_0 = constructors[0];
    $$payload.out += `<!---->`;
    Pyramid_0($$payload, { data: data_0, form });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
var root = asClassComponent(Root);
var options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: false,
  templates: {
    app: ({ head: head2, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="ja">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head2 + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body2 + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1qinzw6"
};
async function get_hooks() {
  let handle2;
  let handleFetch;
  let handleError;
  let init3;
  ({ handle: handle2, handleFetch, handleError, init: init3 } = await Promise.resolve().then(() => (init_hooks_server(), hooks_server_exports)));
  let reroute;
  let transport;
  return {
    handle: handle2,
    handleFetch,
    handleError,
    init: init3,
    reroute,
    transport
  };
}

// .svelte-kit/output/server/index.js
init_chunks();
init_exports();
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type2, subtype, q = "1"] = match;
      parts.push({ type: type2, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type2, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type2 || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type2 = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type2.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var request_event = null;
var als;
import("node:async_hooks").then((hooks) => als = new hooks.AsyncLocalStorage()).catch(() => {
});
function with_event(event, fn) {
  try {
    request_event = event;
    return als ? als.run(event, fn) : fn();
  } finally {
    request_event = null;
  }
}
var DATA_SUFFIX = "/__data.json";
var HTML_DATA_SUFFIX = ".html__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
var ROUTE_SUFFIX = "/__route.js";
function has_resolution_suffix(pathname) {
  return pathname.endsWith(ROUTE_SUFFIX);
}
function add_resolution_suffix(pathname) {
  return pathname.replace(/\/$/, "") + ROUTE_SUFFIX;
}
function strip_resolution_suffix(pathname) {
  return pathname.slice(0, -ROUTE_SUFFIX.length);
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error2
  );
}
function get_status(error2) {
  return error2 instanceof HttpError || error2 instanceof SvelteKitError ? error2.status : 500;
}
function get_message(error2) {
  return error2 instanceof SvelteKitError ? error2.text : "Internal Error";
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
  // Svelte also escapes < because the escape function could be called inside a `noscript` there
  // https://github.com/sveltejs/svelte/security/advisories/GHSA-8266-84wp-wv5c
  // However, that doesn't apply in SvelteKit
};
var escape_html_dict = {
  "&": "&amp;",
  "<": "&lt;"
};
var surrogates = (
  // high surrogate without paired low surrogate
  "[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]"
);
var escape_html_attr_regex = new RegExp(
  `[${Object.keys(escape_html_attr_dict).join("")}]|` + surrogates,
  "g"
);
var escape_html_regex = new RegExp(
  `[${Object.keys(escape_html_dict).join("")}]|` + surrogates,
  "g"
);
function escape_html2(str, is_attr) {
  const dict = is_attr ? escape_html_attr_dict : escape_html_dict;
  const escaped_str = str.replace(is_attr ? escape_html_attr_regex : escape_html_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return escaped_str;
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod) allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message: escape_html2(message) });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = get_status(error2);
  const body2 = await handle_error_and_jsonify(event, options2, error2);
  const type2 = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type2 === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  }
  const status = get_status(error2);
  const message = get_message(error2);
  return await options2.hooks.handleError({ error: error2, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent) uses.push('"parent":1');
  if (node.uses?.route) uses.push('"route":1');
  if (node.uses?.url) uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
function has_prerendered_path(manifest2, pathname) {
  return manifest2._.prerendered_routes.has(pathname) || pathname.at(-1) === "/" && manifest2._.prerendered_routes.has(pathname.slice(0, -1));
}
async function render_endpoint(event, mod, state2) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state2.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state2.prerendering && !state2.prerendering.inside_reroute && !prerender) {
    if (state2.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    const response = await with_event(
      event,
      () => handler(
        /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
        event
      )
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state2.prerendering && (!state2.prerendering.inside_reroute || prerender)) {
      const cloned = new Response(response.clone().body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      cloned.headers.set("x-sveltekit-prerender", String(prerender));
      if (state2.prerendering.inside_reroute && prerender) {
        cloned.headers.set(
          "x-sveltekit-routeid",
          encodeURI(
            /** @type {string} */
            event.route.id
          )
        );
        state2.prerendering.dependencies.set(event.url.pathname, { response: cloned, body: null });
      } else {
        return cloned;
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true") return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function stringify_key(key2) {
  return is_identifier.test(key2) ? "." + key2 : "[" + JSON.stringify(key2) + "]";
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive$1(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
          return;
        case "ArrayBuffer":
          return;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(stringify_key(key2));
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify22(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive$1(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type2 = get_type(thing);
    switch (type2) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify22(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify22(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type2}([${Array.from(thing).map(stringify22).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        const typedArray = thing;
        return `new ${type2}([${typedArray.toString()}])`;
      }
      case "ArrayBuffer": {
        const ui8 = new Uint8Array(thing);
        return `new Uint8Array([${ui8.toString()}]).buffer`;
      }
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify22(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify22(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive$1(thing));
        return;
      }
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify22(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify22(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify22(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify22(k)}, ${stringify22(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify22(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive$1(thing) {
  if (typeof thing === "string") return stringify_string(thing);
  if (thing === void 0) return "void 0";
  if (thing === 0 && 1 / thing < 0) return "-0";
  const str = String(thing);
  if (typeof thing === "number") return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint") return thing + "n";
  return str;
}
function encode64(arraybuffer) {
  const dv = new DataView(arraybuffer);
  let binaryString = "";
  for (let i = 0; i < arraybuffer.byteLength; i++) {
    binaryString += String.fromCharCode(dv.getUint8(i));
  }
  return binaryToAscii(binaryString);
}
var KEY_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function binaryToAscii(str) {
  let out = "";
  for (let i = 0; i < str.length; i += 3) {
    const groupsOfSix = [void 0, void 0, void 0, void 0];
    groupsOfSix[0] = str.charCodeAt(i) >> 2;
    groupsOfSix[1] = (str.charCodeAt(i) & 3) << 4;
    if (str.length > i + 1) {
      groupsOfSix[1] |= str.charCodeAt(i + 1) >> 4;
      groupsOfSix[2] = (str.charCodeAt(i + 1) & 15) << 2;
    }
    if (str.length > i + 2) {
      groupsOfSix[2] |= str.charCodeAt(i + 2) >> 6;
      groupsOfSix[3] = str.charCodeAt(i + 2) & 63;
    }
    for (let j = 0; j < groupsOfSix.length; j++) {
      if (typeof groupsOfSix[j] === "undefined") {
        out += "=";
      } else {
        out += KEY_STRING[groupsOfSix[j]];
      }
    }
  }
  return out;
}
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;
function stringify2(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  if (reducers) {
    for (const key2 of Object.getOwnPropertyNames(reducers)) {
      custom.push({ key: key2, fn: reducers[key2] });
    }
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing)) return indexes.get(thing);
    if (thing === void 0) return UNDEFINED;
    if (Number.isNaN(thing)) return NAN;
    if (thing === Infinity) return POSITIVE_INFINITY;
    if (thing === -Infinity) return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO;
    const index22 = p++;
    indexes.set(thing, index22);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index22] = `["${key2}",${flatten(value2)}]`;
        return index22;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive(thing);
    } else {
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          const valid = !isNaN(thing.getDate());
          str = `["Date","${valid ? thing.toISOString() : ""}"]`;
          break;
        case "RegExp":
          const { source: source2, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source2)},"${flags}"]` : `["RegExp",${stringify_string(source2)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0) str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          const typedArray = thing;
          const base642 = encode64(typedArray.buffer);
          str = '["' + type2 + '","' + base642 + '"]';
          break;
        }
        case "ArrayBuffer": {
          const arraybuffer = thing;
          const base642 = encode64(arraybuffer);
          str = `["ArrayBuffer","${base642}"]`;
          break;
        }
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(stringify_key(key2));
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started) str += ",";
              started = true;
              keys.push(stringify_key(key2));
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index22] = str;
    return index22;
  }
  const index9 = flatten(value);
  if (index9 < 0) return `${index9}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive(thing) {
  const type2 = typeof thing;
  if (type2 === "string") return stringify_string(thing);
  if (thing instanceof String) return stringify_string(thing.toString());
  if (thing === void 0) return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO.toString();
  if (type2 === "bigint") return `["BigInt","${thing}"]`;
  return String(thing);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      `POST method not allowed. No form actions exist for ${"this page"}`
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect2) {
  return action_json({
    type: "redirect",
    status: redirect2.status,
    location: redirect2.location
  });
}
function action_json(data, init22) {
  return json(data, init22);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        `POST method not allowed. No form actions exist for ${"this page"}`
      )
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://svelte.dev/docs/kit/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return with_event(event, () => action(event));
}
function uneval_action_response(data, route_id, transport) {
  const replacer = (thing) => {
    for (const key2 in transport) {
      const encoded = transport[key2].encode(thing);
      if (encoded) {
        return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
      }
    }
  };
  return try_serialize(data, (value) => uneval(value, replacer), route_id);
}
function stringify_action_response(data, route_id, transport) {
  const encoders = Object.fromEntries(
    Object.entries(transport).map(([key2, value]) => [key2, value.encode])
  );
  return try_serialize(data, (value) => stringify2(value, encoders), route_id);
}
function try_serialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if (data instanceof Response) {
      throw new Error(
        `Data returned from action inside ${route_id} is not serializable. Form actions need to return plain objects or fail(). E.g. return { success: true } or return fail(400, { message: "invalid" });`
      );
    }
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "") message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
function get_relative_path(from, to) {
  const from_parts = from.split(/[/\\]/);
  const to_parts = to.split(/[/\\]/);
  from_parts.pop();
  while (from_parts[0] === to_parts[0]) {
    from_parts.shift();
    to_parts.shift();
  }
  let i = from_parts.length;
  while (i--) from_parts[i] = "..";
  return from_parts.concat(to_parts).join("/");
}
async function load_server_data({ event, state: state2, node, parent }) {
  if (!node?.server) return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const load3 = node.server.load;
  const slash = node.server.trailingSlash;
  if (!load3) {
    return { type: "data", data: null, uses, slash };
  }
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state2.prerendering) {
    disable_search(url);
  }
  let done = false;
  const result = await with_event(
    event,
    () => load3.call(null, {
      ...event,
      fetch: (info, init22) => {
        const url2 = new URL(info instanceof Request ? info.url : info, event.url);
        if (BROWSER && done && !uses.dependencies.has(url2.href)) ;
        return event.fetch(info, init22);
      },
      /** @param {string[]} deps */
      depends: (...deps) => {
        for (const dep of deps) {
          const { href } = new URL(dep, event.url);
          if (BROWSER) ;
          uses.dependencies.add(href);
        }
      },
      params: new Proxy(event.params, {
        get: (target, key2) => {
          if (BROWSER && done && typeof key2 === "string" && !uses.params.has(key2)) ;
          if (is_tracking) {
            uses.params.add(key2);
          }
          return target[
            /** @type {string} */
            key2
          ];
        }
      }),
      parent: async () => {
        if (BROWSER && done && !uses.parent) ;
        if (is_tracking) {
          uses.parent = true;
        }
        return parent();
      },
      route: new Proxy(event.route, {
        get: (target, key2) => {
          if (BROWSER && done && typeof key2 === "string" && !uses.route) ;
          if (is_tracking) {
            uses.route = true;
          }
          return target[
            /** @type {'id'} */
            key2
          ];
        }
      }),
      url,
      untrack(fn) {
        is_tracking = false;
        try {
          return fn();
        } finally {
          is_tracking = true;
        }
      }
    })
  );
  done = true;
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state: state2,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state2, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state2, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init22) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init22?.headers;
    let response = await event.fetch(input, init22);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state2.prerendering) {
        dependency = { response, body: null };
        state2.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else if (url.protocol === "https:" || url.protocol === "http:") {
      const mode = input instanceof Request ? input.mode : init22?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy2 = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init22?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get5 = response.headers.get;
      response.headers.get = (key2) => {
        const lower2 = key2.toLowerCase();
        const value = get5.call(response.headers, lower2);
        if (value && !lower2.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower2, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower2}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://svelte.dev/docs/kit/hooks#Server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy2;
  };
  return (input, init22) => {
    const response = universal_fetch(input, init22);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i) hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i) hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var replacements2 = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements2).join("")}]`, "g");
function serialize_data(fetched, filter2, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter2(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control") cache_control = value;
    else if (key2 === "age") age = value;
    else if (key2 === "vary" && value.trim() === "*") varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements2[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url="${escape_html2(fetched.url, true)}"`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0]) precompute();
  const out = init.slice(0);
  const array22 = encode$1(data);
  for (let i = 0; i < array22.length; i += 16) {
    const w = array22.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var BaseProvider = class {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #script_src_needs_csp;
  /** @type {boolean} */
  #script_src_elem_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {boolean} */
  #style_src_needs_csp;
  /** @type {boolean} */
  #style_src_attr_needs_csp;
  /** @type {boolean} */
  #style_src_elem_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #script_src_elem;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src_attr;
  /** @type {import('types').Csp.Source[]} */
  #style_src_elem;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = [];
    this.#script_src_elem = [];
    this.#style_src = [];
    this.#style_src_attr = [];
    this.#style_src_elem = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    const needs_csp = (directive) => !!directive && !directive.some((value) => value === "unsafe-inline");
    this.#script_src_needs_csp = needs_csp(effective_script_src);
    this.#script_src_elem_needs_csp = needs_csp(script_src_elem);
    this.#style_src_needs_csp = needs_csp(effective_style_src);
    this.#style_src_attr_needs_csp = needs_csp(style_src_attr);
    this.#style_src_elem_needs_csp = needs_csp(style_src_elem);
    this.#script_needs_csp = this.#script_src_needs_csp || this.#script_src_elem_needs_csp;
    this.#style_needs_csp = this.#style_src_needs_csp || this.#style_src_attr_needs_csp || this.#style_src_elem_needs_csp;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (!this.#script_needs_csp) return;
    const source2 = this.#use_hashes ? `sha256-${sha256(content)}` : `nonce-${this.#nonce}`;
    if (this.#script_src_needs_csp) {
      this.#script_src.push(source2);
    }
    if (this.#script_src_elem_needs_csp) {
      this.#script_src_elem.push(source2);
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (!this.#style_needs_csp) return;
    const source2 = this.#use_hashes ? `sha256-${sha256(content)}` : `nonce-${this.#nonce}`;
    if (this.#style_src_needs_csp) {
      this.#style_src.push(source2);
    }
    if (this.#style_src_attr_needs_csp) {
      this.#style_src_attr.push(source2);
    }
    if (this.#style_src_elem_needs_csp) {
      const sha256_empty_comment_hash = "sha256-9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = this.#directives;
      if (d["style-src-elem"] && !d["style-src-elem"].includes(sha256_empty_comment_hash) && !this.#style_src_elem.includes(sha256_empty_comment_hash)) {
        this.#style_src_elem.push(sha256_empty_comment_hash);
      }
      if (source2 !== sha256_empty_comment_hash) {
        this.#style_src_elem.push(source2);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#style_src_attr.length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...this.#style_src_attr
      ];
    }
    if (this.#style_src_elem.length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...this.#style_src_elem
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    if (this.#script_src_elem.length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...this.#script_src_elem
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value) continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content="${escape_html2(content, true)}">`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r2) => {
    fulfil = f;
    reject = r2;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done) deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest) result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered) return;
  return result;
}
function generate_route_object(route, url, manifest2) {
  const { errors, layouts, leaf } = route;
  const nodes = [...errors, ...layouts.map((l) => l?.[1]), leaf[1]].filter((n) => typeof n === "number").map((n) => `'${n}': () => ${create_client_import(manifest2._.client.nodes?.[n], url)}`).join(",\n		");
  return [
    `{
	id: ${s(route.id)}`,
    `errors: ${s(route.errors)}`,
    `layouts: ${s(route.layouts)}`,
    `leaf: ${s(route.leaf)}`,
    `nodes: {
		${nodes}
	}
}`
  ].join(",\n	");
}
function create_client_import(import_path, url) {
  if (!import_path) return "Promise.resolve({})";
  if (import_path[0] === "/") {
    return `import('${import_path}')`;
  }
  if (assets !== "") {
    return `import('${assets}/${import_path}')`;
  }
  let path = get_relative_path(url.pathname, `${base}/${import_path}`);
  if (path[0] !== ".") path = `./${path}`;
  return `import('${path}')`;
}
async function resolve_route(resolved_path, url, manifest2) {
  if (!manifest2._.client.routes) {
    return text("Server-side route resolution disabled", { status: 400 });
  }
  let route = null;
  let params = {};
  const matchers = await manifest2._.matchers();
  for (const candidate of manifest2._.client.routes) {
    const match = candidate.pattern.exec(resolved_path);
    if (!match) continue;
    const matched = exec(match, candidate.params, matchers);
    if (matched) {
      route = candidate;
      params = decode_params(matched);
      break;
    }
  }
  return create_server_routing_response(route, params, url, manifest2).response;
}
function create_server_routing_response(route, params, url, manifest2) {
  const headers2 = new Headers({
    "content-type": "application/javascript; charset=utf-8"
  });
  if (route) {
    const csr_route = generate_route_object(route, url, manifest2);
    const body2 = `${create_css_import(route, url, manifest2)}
export const route = ${csr_route}; export const params = ${JSON.stringify(params)};`;
    return { response: text(body2, { headers: headers2 }), body: body2 };
  } else {
    return { response: text("", { headers: headers2 }), body: "" };
  }
}
function create_css_import(route, url, manifest2) {
  const { errors, layouts, leaf } = route;
  let css = "";
  for (const node of [...errors, ...layouts.map((l) => l?.[1]), leaf[1]]) {
    if (typeof node !== "number") continue;
    const node_css = manifest2._.client.css?.[node];
    for (const css_path of node_css ?? []) {
      css += `'${assets || base}/${css_path}',`;
    }
  }
  if (!css) return "";
  return `${create_client_import(
    /** @type {string} */
    manifest2._.client.start,
    url
  )}.then(x => x.load_css([${css}]));`;
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch: branch2,
  fetched,
  options: options2,
  manifest: manifest2,
  state: state2,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state2.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets9 = new Set(client.stylesheets);
  const fonts9 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  {
    if (!state2.prerendering?.fallback) {
      const segments = event.url.pathname.slice(base.length).split("/").slice(2);
      base$1 = segments.map(() => "..").join("/") || ".";
      base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
      if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
        assets$1 = base$1;
      }
    } else if (options2.hash_routing) {
      base_expression = "new URL('.', location).pathname.slice(0, -1)";
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(
        branch2.map(({ node }) => {
          if (!node.component) {
            throw new Error(`Missing +page.svelte component for route ${event.route.id}`);
          }
          return node.component();
        })
      ),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch2.length; i += 1) {
      data2 = { ...data2, ...branch2[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    const render_opts = {
      context: /* @__PURE__ */ new Map([
        [
          "__request__",
          {
            page: props.page
          }
        ]
      ])
    };
    {
      try {
        rendered = options2.root.render(props, render_opts);
      } finally {
        reset();
      }
    }
    for (const { node } of branch2) {
      for (const url of node.imports) modulepreloads.add(url);
      for (const url of node.stylesheets) stylesheets9.add(url);
      for (const url of node.fonts) fonts9.add(url);
      if (node.inline_styles && !client.inline) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head2 = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state2.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  const style = client.inline ? client.inline?.style : Array.from(inline_styles.values()).join("\n");
  if (style) {
    const attributes = [];
    if (csp.style_needs_nonce) attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(style);
    head2 += `
	<style${attributes.join("")}>${style}</style>`;
  }
  for (const dep of stylesheets9) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head2 += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts9) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head2 += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch2.map((b) => b.server_data),
    csp,
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state2.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const route = manifest2._.client.routes?.find((r2) => r2.id === event.route.id) ?? null;
    if (client.uses_env_dynamic_public && state2.prerendering) {
      modulepreloads.add(`${app_dir}/env.js`);
    }
    if (!client.inline) {
      const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
        (path) => resolve_opts.preload({ type: "js", path })
      );
      for (const path of included_modulepreloads) {
        link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
        if (options2.preload_strategy !== "modulepreload") {
          head2 += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
        } else if (state2.prerendering) {
          head2 += `
		<link rel="modulepreload" href="${path}">`;
        }
      }
    }
    if (manifest2._.client.routes && state2.prerendering && !state2.prerendering.fallback) {
      const pathname = add_resolution_suffix(event.url.pathname);
      state2.prerendering.dependencies.set(
        pathname,
        create_server_routing_response(route, event.params, new URL(pathname, event.url), manifest2)
      );
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state2.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const try_to_resolve = () => {
								if (!deferred.has(id)) {
									setTimeout(try_to_resolve, 0);
									return;
								}
								const { fulfil, reject } = deferred.get(id);
								deferred.delete(id);
								if (error) reject(error);
								else fulfil(data);
							}
							try_to_resolve();
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        );
      }
      if (error2) {
        serialized.error = uneval(error2);
      }
      const hydrate2 = [
        `node_ids: [${branch2.map(({ node }) => node.index).join(", ")}]`,
        `data: ${data}`,
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate2.push(`status: ${status}`);
      }
      if (manifest2._.client.routes) {
        if (route) {
          const stringified = generate_route_object(route, event.url, manifest2).replaceAll(
            "\n",
            "\n							"
          );
          hydrate2.push(`params: ${uneval(event.params)}`, `server_route: ${stringified}`);
        }
      } else if (options2.embedded) {
        hydrate2.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate2.join(`,
${indent}	`)}
${indent}}`);
    }
    const boot = client.inline ? `${client.inline.script}

					__sveltekit_${options2.version_hash}.app.start(${args.join(", ")});` : client.app ? `Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(app, ${args.join(", ")});
					});` : `import(${s(prefixed(client.start))}).then((app) => {
						app.start(${args.join(", ")})
					});`;
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						${boot.replace(/\n/g, "\n	")}
					});`);
    } else {
      blocks.push(boot);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state2.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state2.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state2.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head2 = http_equiv.join("\n") + head2;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head2 += rendered.head;
  const html2 = options2.templates.app({
    head: head2,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html: html2,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: headers2
    }
  );
}
function get_data(event, options2, nodes, csp, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push: push3, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id2 = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id: id2, data, error: error2 }, replacer);
          } catch {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id: id2, data, error: error2 }, replacer);
          }
          const nonce = csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : "";
          push3(`<script${nonce}>${global}.resolve(${str})<\/script>
`);
          if (count === 0) done();
        }
      );
      return `${global}.defer(${id2})`;
    } else {
      for (const key2 in options2.hooks.transport) {
        const encoded = options2.hooks.transport[key2].encode(thing);
        if (encoded) {
          return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
        }
      }
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var PageNodes = class {
  data;
  /**
   * @param {Array<import('types').SSRNode | undefined>} nodes
   */
  constructor(nodes) {
    this.data = nodes;
  }
  layouts() {
    return this.data.slice(0, -1);
  }
  page() {
    return this.data.at(-1);
  }
  validate() {
    for (const layout of this.layouts()) {
      if (layout) {
        validate_layout_server_exports(
          layout.server,
          /** @type {string} */
          layout.server_id
        );
        validate_layout_exports(
          layout.universal,
          /** @type {string} */
          layout.universal_id
        );
      }
    }
    const page2 = this.page();
    if (page2) {
      validate_page_server_exports(
        page2.server,
        /** @type {string} */
        page2.server_id
      );
      validate_page_exports(
        page2.universal,
        /** @type {string} */
        page2.universal_id
      );
    }
  }
  /**
   * @template {'prerender' | 'ssr' | 'csr' | 'trailingSlash' | 'entries'} Option
   * @template {(import('types').UniversalNode | import('types').ServerNode)[Option]} Value
   * @param {Option} option
   * @returns {Value | undefined}
   */
  #get_option(option) {
    return this.data.reduce(
      (value, node) => {
        return (
          /** @type {Value} TypeScript's too dumb to understand this */
          node?.universal?.[option] ?? node?.server?.[option] ?? value
        );
      },
      /** @type {Value | undefined} */
      void 0
    );
  }
  csr() {
    return this.#get_option("csr") ?? true;
  }
  ssr() {
    return this.#get_option("ssr") ?? true;
  }
  prerender() {
    return this.#get_option("prerender") ?? false;
  }
  trailing_slash() {
    return this.#get_option("trailingSlash") ?? "never";
  }
  get_config() {
    let current = {};
    for (const node of this.data) {
      if (!node?.universal?.config && !node?.server?.config) continue;
      current = {
        ...current,
        ...node?.universal?.config,
        ...node?.server?.config
      };
    }
    return Object.keys(current).length ? current : void 0;
  }
  should_prerender_data() {
    return this.data.some(
      // prerender in case of trailingSlash because the client retrieves that value from the server
      (node) => node?.server?.load || node?.server?.trailingSlash !== void 0
    );
  }
};
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state: state2,
  status,
  error: error2,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error2.message
    );
  }
  const fetched = [];
  try {
    const branch2 = [];
    const default_layout = await manifest2._.nodes[0]();
    const nodes = new PageNodes([default_layout]);
    const ssr = nodes.ssr();
    const csr = nodes.csr();
    if (ssr) {
      state2.error = true;
      const server_data_promise = load_server_data({
        event,
        state: state2,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state: state2,
        csr
      });
      branch2.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state: state2,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch: branch2,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done) return result;
    done = true;
    return result = fn();
  };
}
var encoder2 = new TextEncoder();
async function render_data(event, route, options2, manifest2, state2, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state: state2,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError || error2 instanceof SvelteKitError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder2.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder2.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect2) {
  return json_response({
    type: "redirect",
    location: redirect2.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push: push3, done } = create_async_iterator();
  const reducers = {
    ...Object.fromEntries(
      Object.entries(options2.hooks.transport).map(([key2, value]) => [key2, value.encode])
    ),
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id2 = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify2(value, reducers);
            } catch {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify2(error2, reducers);
            }
            count -= 1;
            push3(`{"type":"chunk","id":${id2},"${key2}":${str}}
`);
            if (count === 0) done();
          }
        );
        return id2;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify2(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state2, nodes, resolve_opts) {
  if (state2.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.page()
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender = nodes.prerender();
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state2.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state2.prerender_default = should_prerender;
    const should_prerender_data = nodes.should_prerender_data();
    const data_pathname = add_data_suffix(event.url.pathname);
    const fetched = [];
    if (nodes.ssr() === false && !(state2.prerendering && should_prerender_data)) {
      if (BROWSER && action_result && !event.request.headers.has("x-sveltekit-action")) ;
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: nodes.csr()
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state: state2,
        resolve_opts
      });
    }
    const branch2 = [];
    let load_error = null;
    const server_promises = nodes.data.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state: state2,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent) Object.assign(data, parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = nodes.csr();
    const load_promises = nodes.data.map((node, i) => {
      if (load_error) throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state: state2,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises) p.catch(() => {
    });
    for (const p of load_promises) p.catch(() => {
    });
    for (let i = 0; i < nodes.data.length; i += 1) {
      const node = nodes.data[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch2.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state2.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state2.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index9 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index9]();
              let j = i;
              while (!branch2[j]) j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state: state2,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch2.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch2.push(null);
      }
    }
    if (state2.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch2.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state2.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = nodes.ssr();
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state: state2,
      resolve_opts,
      page_config: {
        csr: nodes.csr(),
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch2),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state: state2,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options2) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options2 || {};
  var dec = opt.decode || decode;
  var index9 = 0;
  while (index9 < str.length) {
    var eqIdx = str.indexOf("=", index9);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index9);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index9 = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index9, eqIdx).trim();
    if (void 0 === obj[key2]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index9 = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options2) {
  var opt = options2 || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e) {
    return str;
  }
}
var INVALID_COOKIE_CHARACTER_REGEX = /[\x00-\x1F\x7F()<>@,;:"/[\]?={} \t]/;
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = parse_1(header, { decode: (value) => value });
  let normalized_url;
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const req_cookies = parse_1(header, { decode: opts?.decode });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    getAll(opts) {
      const cookies2 = parse_1(header, { decode: opts?.decode });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      const illegal_characters = name.match(INVALID_COOKIE_CHARACTER_REGEX);
      if (illegal_characters) {
        console.warn(
          `The cookie name "${name}" will be invalid in SvelteKit 3.0 as it contains ${illegal_characters.join(
            " and "
          )}. See RFC 2616 for more details https://datatracker.ietf.org/doc/html/rfc2616#section-2.2`
        );
      }
      validate_options(options2);
      set_internal(name, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        if (!normalized_url) {
          throw new Error("Cannot serialize cookies until after the route is determined");
        }
        path = resolve(normalized_url, path);
      }
      return serialize_1(name, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain)) continue;
      if (!path_matches(destination.pathname, cookie.options.path)) continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = parse_1(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  const internal_queue = [];
  function set_internal(name, value, options2) {
    if (!normalized_url) {
      internal_queue.push(() => set_internal(name, value, options2));
      return;
    }
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  function set_trailing_slash(trailing_slash) {
    normalized_url = normalize_path(url.pathname, trailing_slash);
    internal_queue.forEach((fn) => fn());
  }
  return { cookies, new_cookies, get_cookie_header, set_internal, set_trailing_slash };
}
function domain_matches(hostname, constraint) {
  if (!constraint) return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized) return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint) return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized) return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", serialize_1(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", serialize_1(name, value, { ...options2, path }));
    }
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options2) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  try {
    value = options2.decodeValues ? decodeURIComponent(value) : value;
  } catch (e) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
      e
    );
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else if (key2 === "partitioned") {
      cookie.partitioned = true;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parseNameValuePair(nameValuePairStr) {
  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}
function parse(input, options2) {
  options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
  if (!input) {
    if (!options2.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      input = input.headers["set-cookie"];
    } else {
      var sch = input.headers[Object.keys(input.headers).find(function(key2) {
        return key2.toLowerCase() === "set-cookie";
      })];
      if (!sch && input.headers.cookie && !options2.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  if (!options2.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options2);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options2);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start2;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start2 = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start2, lastComma));
          start2 = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start2, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function create_fetch({ event, options: options2, manifest: manifest2, state: state2, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init22) => {
    const original_request = normalize_fetch_input(info, init22, event.url);
    let mode = (info instanceof Request ? info.mode : init22?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init22?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie) request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename) || filename in manifest2._.server_assets;
        const is_asset_html = manifest2.assets.has(filename_html) || filename_html in manifest2._.server_assets;
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state2.read) {
            const type2 = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state2.read(file), {
              headers: type2 ? { "content-type": type2 } : {}
            });
          } else if (read_implementation && file in manifest2._.server_assets) {
            const length = manifest2._.server_assets[file];
            const type2 = manifest2.mimeTypes[file.slice(file.lastIndexOf("."))];
            return new Response(read_implementation(file), {
              headers: {
                "Content-Length": "" + length,
                "Content-Type": type2
              }
            });
          }
          return await fetch(request);
        }
        if (has_prerendered_path(manifest2, base + decoded)) {
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state2,
          depth: state2.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of splitCookiesString_1(set_cookie)) {
            const { name, value, ...options3 } = parseString_1(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init22) => {
    const response = server_fetch(input, init22);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init22, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init22);
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ??= `export const env=${JSON.stringify(public_env)}`;
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
var default_transform = ({ html: html2 }) => html2;
var default_filter = () => false;
var default_preload = ({ type: type2 }) => type2 === "js" || type2 === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state2) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  if (options2.hash_routing && url.pathname !== base + "/" && url.pathname !== "/[fallback]") {
    return text("Not found", { status: 404 });
  }
  let invalidated_data_nodes;
  const is_route_resolution_request = has_resolution_suffix(url.pathname);
  const is_data_request = has_data_suffix(url.pathname);
  if (is_route_resolution_request) {
    url.pathname = strip_resolution_suffix(url.pathname);
  } else if (is_data_request) {
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  const headers2 = {};
  const { cookies, new_cookies, get_cookie_header, set_internal, set_trailing_slash } = get_cookies(
    request,
    url
  );
  const event = {
    cookies,
    // @ts-expect-error `fetch` needs to be created after the `event` itself
    fetch: null,
    getClientAddress: state2.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-cloudflare-workers"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params: {},
    platform: state2.platform,
    request,
    route: { id: null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower2 = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower2 === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower2 in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower2] = value;
          if (state2.prerendering && lower2 === "cache-control") {
            state2.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state2.depth > 0
  };
  event.fetch = create_fetch({
    event,
    options: options2,
    manifest: manifest2,
    state: state2,
    get_cookie_header,
    set_internal
  });
  if (state2.emulator?.platform) {
    event.platform = await state2.emulator.platform({
      config: {},
      prerender: !!state2.prerendering?.fallback
    });
  }
  let resolved_path;
  const prerendering_reroute_state = state2.prerendering?.inside_reroute;
  try {
    if (state2.prerendering) state2.prerendering.inside_reroute = true;
    resolved_path = await options2.hooks.reroute({ url: new URL(url), fetch: event.fetch }) ?? url.pathname;
  } catch {
    return text("Internal Server Error", {
      status: 500
    });
  } finally {
    if (state2.prerendering) state2.prerendering.inside_reroute = prerendering_reroute_state;
  }
  try {
    resolved_path = decode_pathname(resolved_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  if (resolved_path !== url.pathname && !state2.prerendering?.fallback && has_prerendered_path(manifest2, resolved_path)) {
    const url2 = new URL(request.url);
    url2.pathname = is_data_request ? add_data_suffix(resolved_path) : is_route_resolution_request ? add_resolution_suffix(resolved_path) : resolved_path;
    const response = await fetch(url2, request);
    const headers22 = new Headers(response.headers);
    if (headers22.has("content-encoding")) {
      headers22.delete("content-encoding");
      headers22.delete("content-length");
    }
    return new Response(response.body, {
      headers: headers22,
      status: response.status,
      statusText: response.statusText
    });
  }
  let route = null;
  if (base && !state2.prerendering?.fallback) {
    if (!resolved_path.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    resolved_path = resolved_path.slice(base.length) || "/";
  }
  if (is_route_resolution_request) {
    return resolve_route(resolved_path, new URL(request.url), manifest2);
  }
  if (resolved_path === `/${app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (resolved_path.startsWith(`/${app_dir}`)) {
    const headers22 = new Headers();
    headers22.set("cache-control", "public, max-age=0, must-revalidate");
    return text("Not found", { status: 404, headers: headers22 });
  }
  if (!state2.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(resolved_path);
      if (!match) continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        event.route = { id: route.id };
        event.params = decode_params(matched);
        break;
      }
    }
  }
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  let trailing_slash = "never";
  try {
    const page_nodes = route?.page ? new PageNodes(await load_page_nodes(route.page, manifest2)) : void 0;
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (page_nodes) {
        if (BROWSER) ;
        trailing_slash = page_nodes.trailing_slash();
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash ?? "never";
        if (BROWSER) ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash);
        if (normalized !== url.pathname && !state2.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state2.before_handle || state2.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (page_nodes) {
          config = page_nodes.get_config() ?? config;
          prerender = page_nodes.prerender();
        }
        if (state2.before_handle) {
          state2.before_handle(event, config, prerender);
        }
        if (state2.emulator?.platform) {
          event.platform = await state2.emulator.platform({ config, prerender });
        }
      }
    }
    set_trailing_slash(trailing_slash);
    if (state2.prerendering && !state2.prerendering.fallback && !state2.prerendering.inside_reroute) {
      disable_search(url);
    }
    const response = await with_event(
      event,
      () => options2.hooks.handle({
        event,
        resolve: (event2, opts) => (
          // counter-intuitively, we need to clear the event, so that it's not
          // e.g. accessible when loading modules needed to handle the request
          with_event(
            null,
            () => resolve2(event2, page_nodes, opts).then((response2) => {
              for (const key2 in headers2) {
                const value = headers2[key2];
                response2.headers.set(
                  key2,
                  /** @type {string} */
                  value
                );
              }
              add_cookies_to_headers(response2.headers, Object.values(new_cookies));
              if (state2.prerendering && event2.route.id !== null) {
                response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
              }
              return response2;
            })
          )
        )
      })
    );
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value) headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(new_cookies));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, page_nodes, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (options2.hash_routing || state2.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state: state2,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state2,
            invalidated_data_nodes,
            trailing_slash
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state2);
        } else if (route.page) {
          if (!page_nodes) {
            throw new Error("page_nodes not found. This should never happen");
          } else if (page_methods.has(method)) {
            response = await render_page(
              event2,
              route.page,
              options2,
              manifest2,
              state2,
              page_nodes,
              resolve_opts
            );
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("Route is neither page nor endpoint. This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state2.error && event2.isSubRequest) {
        const headers22 = new Headers(request.headers);
        headers22.set("x-sveltekit-error", "true");
        return await fetch(request, { headers: headers22 });
      }
      if (state2.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state2.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state: state2,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state2.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var prerender_env_handler = {
  get({ type: type2 }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type2} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type2} instead`
    );
  }
};
var init_promise;
var Server = class {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    this.#options = options;
    this.#manifest = manifest2;
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes2 = {
      public_prefix: this.#options.env_public_prefix,
      private_prefix: this.#options.env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes2);
    const public_env2 = filter_public_env(env, prefixes2);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (read) {
      set_read_implementation(read);
    }
    await (init_promise ??= (async () => {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          }),
          transport: module.transport || {}
        };
        if (module.init) {
          await module.init();
        }
      } catch (error2) {
        {
          throw error2;
        }
      }
    })());
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
};

// .svelte-kit/cloudflare-workers-tmp/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ??= value = fn();
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set([".DS_Store", "android-chrome-192x192.png", "android-chrome-512x512.png", "apple-touch-icon.png", "bookshelf-bg.jpg", "bookshelf-bg.png", "favicon-16x16.png", "favicon-32x32.png", "favicon.ico", "favicon.png", "favicon.svg", "front-placeholder.png", "og-shelf-bg.png", "ogp.png", "opencover-logo.svg", "site.webmanifest"]),
    mimeTypes: { ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json" },
    _: {
      client: { start: "_app/immutable/entry/start.BEKRpitw.js", app: "_app/immutable/entry/app.CXmqn33D.js", imports: ["_app/immutable/entry/start.BEKRpitw.js", "_app/immutable/chunks/CbsYtiTg.js", "_app/immutable/chunks/BlTpSGD8.js", "_app/immutable/chunks/DdiJvTiH.js", "_app/immutable/entry/app.CXmqn33D.js", "_app/immutable/chunks/BlTpSGD8.js", "_app/immutable/chunks/CLK_dOat.js", "_app/immutable/chunks/ChECSWBu.js", "_app/immutable/chunks/B-Dr2cRb.js", "_app/immutable/chunks/CABO9XDg.js", "_app/immutable/chunks/DKmXJPfJ.js", "_app/immutable/chunks/_BQvoK0b.js", "_app/immutable/chunks/DdiJvTiH.js"], stylesheets: [], fonts: [], uses_env_dynamic_public: false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        },
        {
          id: "/about",
          pattern: /^\/about\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null
        },
        {
          id: "/api/bib/[isbn]",
          pattern: /^\/api\/bib\/([^/]+?)\/?$/,
          params: [{ "name": "isbn", "optional": false, "rest": false, "chained": false }],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts(), server_ts_exports)))
        },
        {
          id: "/api/og.png",
          pattern: /^\/api\/og\.png\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts2(), server_ts_exports2)))
        },
        {
          id: "/api/og/[isbn]",
          pattern: /^\/api\/og\/([^/]+?)\/?$/,
          params: [{ "name": "isbn", "optional": false, "rest": false, "chained": false }],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts3(), server_ts_exports3)))
        },
        {
          id: "/api/publisher/[isbn]",
          pattern: /^\/api\/publisher\/([^/]+?)\/?$/,
          params: [{ "name": "isbn", "optional": false, "rest": false, "chained": false }],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts4(), server_ts_exports4)))
        },
        {
          id: "/api/random-isbn",
          pattern: /^\/api\/random-isbn\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts5(), server_ts_exports5)))
        },
        {
          id: "/api/style/isbn/[isbn]",
          pattern: /^\/api\/style\/isbn\/([^/]+?)\/?$/,
          params: [{ "name": "isbn", "optional": false, "rest": false, "chained": false }],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts6(), server_ts_exports6)))
        },
        {
          id: "/goto/[service]/[isbn]",
          pattern: /^\/goto\/([^/]+?)\/([^/]+?)\/?$/,
          params: [{ "name": "service", "optional": false, "rest": false, "chained": false }, { "name": "isbn", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null
        },
        {
          id: "/how-to-use",
          pattern: /^\/how-to-use\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 6 },
          endpoint: null
        },
        {
          id: "/shelf/isbn/[isbn]",
          pattern: /^\/shelf\/isbn\/([^/]+?)\/?$/,
          params: [{ "name": "isbn", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, ,], errors: [1, 2], leaf: 7 },
          endpoint: null
        }
      ],
      prerendered_routes: /* @__PURE__ */ new Set([]),
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();
var prerendered = /* @__PURE__ */ new Map([]);
var base_path = "";

// .svelte-kit/cloudflare-workers-tmp/entry.js
var import_kv_asset_handler = __toESM(require_dist2());
import static_asset_manifest_json from "__STATIC_CONTENT_MANIFEST";
var static_asset_manifest = JSON.parse(static_asset_manifest_json);
var server = new Server(manifest);
var app_path = `/${manifest.appPath}`;
var immutable = `${app_path}/immutable/`;
var version_file = `${app_path}/version.json`;
var entry_default = {
  /**
   * @param {Request} req
   * @param {any} env
   * @param {any} context
   */
  async fetch(req, env, context2) {
    await server.init({ env });
    const url = new URL(req.url);
    if (url.pathname.startsWith(app_path)) {
      const res = await get_asset_from_kv(req, env, context2);
      if (is_error(res.status)) return res;
      const cache_control = url.pathname.startsWith(immutable) ? "public, immutable, max-age=31536000" : "no-cache";
      return new Response(res.body, {
        headers: {
          // include original headers, minus cache-control which
          // is overridden, and etag which is no longer useful
          "cache-control": cache_control,
          "content-type": res.headers.get("content-type"),
          "x-robots-tag": "noindex"
        }
      });
    }
    let { pathname, search } = url;
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
    }
    const stripped_pathname = pathname.replace(/\/$/, "");
    let is_static_asset = false;
    const filename = stripped_pathname.slice(base_path.length + 1);
    if (filename) {
      is_static_asset = manifest.assets.has(filename) || manifest.assets.has(filename + "/index.html") || filename in manifest._.server_assets || filename + "/index.html" in manifest._.server_assets;
    }
    let location = pathname.at(-1) === "/" ? stripped_pathname : pathname + "/";
    if (is_static_asset || prerendered.has(pathname) || pathname === version_file || pathname.startsWith(immutable)) {
      return get_asset_from_kv(req, env, context2, (request, options2) => {
        if (prerendered.has(pathname)) {
          url.pathname = "/" + prerendered.get(pathname).file;
          return new Request(url.toString(), request);
        }
        return (0, import_kv_asset_handler.mapRequestToAsset)(request, options2);
      });
    } else if (location && prerendered.has(location)) {
      if (search) location += search;
      return new Response("", {
        status: 308,
        headers: {
          location
        }
      });
    }
    return await server.respond(req, {
      platform: {
        env,
        context: context2,
        // @ts-expect-error lib.dom is interfering with workers-types
        caches,
        // @ts-expect-error req is actually a Cloudflare request not a standard request
        cf: req.cf
      },
      getClientAddress() {
        return req.headers.get("cf-connecting-ip");
      }
    });
  }
};
async function get_asset_from_kv(req, env, context2, map2 = import_kv_asset_handler.mapRequestToAsset) {
  return await (0, import_kv_asset_handler.getAssetFromKV)(
    {
      request: req,
      waitUntil(promise) {
        return context2.waitUntil(promise);
      }
    },
    {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: static_asset_manifest,
      mapRequestToAsset: map2
    }
  );
}
function is_error(status) {
  return status > 399;
}
export {
  entry_default as default
};
/**
 * @license @lucide/svelte v0.483.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 */
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=worker.js.map
