// Awesomplete - Lea Verou - MIT license
!function () { function t(t) { var e = Array.isArray(t) ? { label: t[0], value: t[1] } : "object" == typeof t && "label" in t && "value" in t ? t : { label: t, value: t }; this.label = e.label || e.value, this.value = e.value } function e(t, e, i) { for (var n in e) { var s = e[n], r = t.input.getAttribute("data-" + n.toLowerCase()); "number" == typeof s ? t[n] = parseInt(r) : !1 === s ? t[n] = null !== r : s instanceof Function ? t[n] = null : t[n] = r, t[n] || 0 === t[n] || (t[n] = n in i ? i[n] : s) } } function i(t, e) { return "string" == typeof t ? (e || document).querySelector(t) : t || null } function n(t, e) { return o.call((e || document).querySelectorAll(t)) } function s() { n("input.awesomplete").forEach(function (t) { new r(t) }) } var r = function (t, n) { var s = this; this.isOpened = !1, this.input = i(t), this.input.setAttribute("autocomplete", "off"), this.input.setAttribute("aria-autocomplete", "list"), n = n || {}, e(this, { minChars: 2, maxItems: 10, autoFirst: !1, data: r.DATA, filter: r.FILTER_CONTAINS, sort: !1 !== n.sort && r.SORT_BYLENGTH, item: r.ITEM, replace: r.REPLACE }, n), this.index = -1, this.container = i.create("div", { className: "awesomplete", around: t }), this.ul = i.create("ul", { hidden: "hidden", inside: this.container }), this.status = i.create("span", { className: "visually-hidden", role: "status", "aria-live": "assertive", "aria-relevant": "additions", inside: this.container }), this._events = { input: { input: this.evaluate.bind(this), blur: this.close.bind(this, { reason: "blur" }), keydown: function (t) { var e = t.keyCode; s.opened && (13 === e && s.selected ? (t.preventDefault(), s.select()) : 27 === e ? s.close({ reason: "esc" }) : 38 !== e && 40 !== e || (t.preventDefault(), s[38 === e ? "previous" : "next"]())) } }, form: { submit: this.close.bind(this, { reason: "submit" }) }, ul: { mousedown: function (t) { var e = t.target; if (e !== this) { for (; e && !/li/i.test(e.nodeName) ;) e = e.parentNode; e && 0 === t.button && (t.preventDefault(), s.select(e, t.target)) } } } }, i.bind(this.input, this._events.input), i.bind(this.input.form, this._events.form), i.bind(this.ul, this._events.ul), this.input.hasAttribute("list") ? (this.list = "#" + this.input.getAttribute("list"), this.input.removeAttribute("list")) : this.list = this.input.getAttribute("data-list") || n.list || [], r.all.push(this) }; r.prototype = { set list(t) { if (Array.isArray(t)) this._list = t; else if ("string" == typeof t && t.indexOf(",") > -1) this._list = t.split(/\s*,\s*/); else if ((t = i(t)) && t.children) { var e = []; o.apply(t.children).forEach(function (t) { if (!t.disabled) { var i = t.textContent.trim(), n = t.value || i, s = t.label || i; "" !== n && e.push({ label: s, value: n }) } }), this._list = e } document.activeElement === this.input && this.evaluate() }, get selected() { return this.index > -1 }, get opened() { return this.isOpened }, close: function (t) { this.opened && (this.ul.setAttribute("hidden", ""), this.isOpened = !1, this.index = -1, i.fire(this.input, "awesomplete-close", t || {})) }, open: function () { this.ul.removeAttribute("hidden"), this.isOpened = !0, this.autoFirst && -1 === this.index && this.goto(0), i.fire(this.input, "awesomplete-open") }, destroy: function () { i.unbind(this.input, this._events.input), i.unbind(this.input.form, this._events.form); var t = this.container.parentNode; t.insertBefore(this.input, this.container), t.removeChild(this.container), this.input.removeAttribute("autocomplete"), this.input.removeAttribute("aria-autocomplete"); var e = r.all.indexOf(this); -1 !== e && r.all.splice(e, 1) }, next: function () { var t = this.ul.children.length; this.goto(this.index < t - 1 ? this.index + 1 : t ? 0 : -1) }, previous: function () { var t = this.ul.children.length, e = this.index - 1; this.goto(this.selected && -1 !== e ? e : t - 1) }, goto: function (t) { var e = this.ul.children; this.selected && e[this.index].setAttribute("aria-selected", "false"), this.index = t, t > -1 && e.length > 0 && (e[t].setAttribute("aria-selected", "true"), this.status.textContent = e[t].textContent, this.ul.scrollTop = e[t].offsetTop - this.ul.clientHeight + e[t].clientHeight, i.fire(this.input, "awesomplete-highlight", { text: this.suggestions[this.index] })) }, select: function (t, e) { if (t ? this.index = i.siblingIndex(t) : t = this.ul.children[this.index], t) { var n = this.suggestions[this.index]; i.fire(this.input, "awesomplete-select", { text: n, origin: e || t }) && (this.replace(n), this.close({ reason: "select" }), i.fire(this.input, "awesomplete-selectcomplete", { text: n })) } }, evaluate: function () { var e = this, i = this.input.value; i.length >= this.minChars && this._list.length > 0 ? (this.index = -1, this.ul.innerHTML = "", this.suggestions = this._list.map(function (n) { return new t(e.data(n, i)) }).filter(function (t) { return e.filter(t, i) }), !1 !== this.sort && (this.suggestions = this.suggestions.sort(this.sort)), this.suggestions = this.suggestions.slice(0, this.maxItems), this.suggestions.forEach(function (t) { e.ul.appendChild(e.item(t, i)) }), 0 === this.ul.children.length ? this.close({ reason: "nomatches" }) : this.open()) : this.close({ reason: "nomatches" }) } }, r.all = [], r.FILTER_CONTAINS = function (t, e) { return RegExp(i.regExpEscape(e.trim()), "i").test(t) }, r.FILTER_STARTSWITH = function (t, e) { return RegExp("^" + i.regExpEscape(e.trim()), "i").test(t) }, r.SORT_BYLENGTH = function (t, e) { return t.length !== e.length ? t.length - e.length : t < e ? -1 : 1 }, r.ITEM = function (t, e) { return i.create("li", { innerHTML: "" === e.trim() ? t : t.replace(RegExp(i.regExpEscape(e.trim()), "gi"), "<mark>$&</mark>"), "aria-selected": "false" }) }, r.REPLACE = function (t) { this.input.value = t.value }, r.DATA = function (t) { return t }, Object.defineProperty(t.prototype = Object.create(String.prototype), "length", { get: function () { return this.label.length } }), t.prototype.toString = t.prototype.valueOf = function () { return "" + this.label }; var o = Array.prototype.slice; i.create = function (t, e) { var n = document.createElement(t); for (var s in e) { var r = e[s]; if ("inside" === s) i(r).appendChild(n); else if ("around" === s) { var o = i(r); o.parentNode.insertBefore(n, o), n.appendChild(o) } else s in n ? n[s] = r : n.setAttribute(s, r) } return n }, i.bind = function (t, e) { if (t) for (var i in e) { var n = e[i]; i.split(/\s+/).forEach(function (e) { t.addEventListener(e, n) }) } }, i.unbind = function (t, e) { if (t) for (var i in e) { var n = e[i]; i.split(/\s+/).forEach(function (e) { t.removeEventListener(e, n) }) } }, i.fire = function (t, e, i) { var n = document.createEvent("HTMLEvents"); n.initEvent(e, !0, !0); for (var s in i) n[s] = i[s]; return t.dispatchEvent(n) }, i.regExpEscape = function (t) { return t.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&") }, i.siblingIndex = function (t) { for (var e = 0; t = t.previousElementSibling; e++); return e }, "undefined" != typeof Document && ("loading" !== document.readyState ? s() : document.addEventListener("DOMContentLoaded", s)), r.$ = i, r.$$ = n, "undefined" != typeof self && (self.Awesomplete = r), "object" == typeof module && module.exports && (module.exports = r) }();

/*!
  * Reqwest! A general purpose XHR connection manager
  * license MIT (c) Dustin Diaz 2015
  * https://github.com/ded/reqwest
  */
!function (e, t, n) { typeof module != "undefined" && module.exports ? module.exports = n() : typeof define == "function" && define.amd ? define(n) : t[e] = n() }("reqwest", this, function () { function succeed(e) { var t = protocolRe.exec(e.url); return t = t && t[1] || context.location.protocol, httpsRe.test(t) ? twoHundo.test(e.request.status) : !!e.request.response } function handleReadyState(e, t, n) { return function () { if (e._aborted) return n(e.request); if (e._timedOut) return n(e.request, "Request is aborted: timeout"); e.request && e.request[readyState] == 4 && (e.request.onreadystatechange = noop, succeed(e) ? t(e.request) : n(e.request)) } } function setHeaders(e, t) { var n = t.headers || {}, r; n.Accept = n.Accept || defaultHeaders.accept[t.type] || defaultHeaders.accept["*"]; var i = typeof FormData != "undefined" && t.data instanceof FormData; !t.crossOrigin && !n[requestedWith] && (n[requestedWith] = defaultHeaders.requestedWith), !n[contentType] && !i && (n[contentType] = t.contentType || defaultHeaders.contentType); for (r in n) n.hasOwnProperty(r) && "setRequestHeader" in e && e.setRequestHeader(r, n[r]) } function setCredentials(e, t) { typeof t.withCredentials != "undefined" && typeof e.withCredentials != "undefined" && (e.withCredentials = !!t.withCredentials) } function generalCallback(e) { lastValue = e } function urlappend(e, t) { return e + (/\?/.test(e) ? "&" : "?") + t } function handleJsonp(e, t, n, r) { var i = uniqid++, s = e.jsonpCallback || "callback", o = e.jsonpCallbackName || reqwest.getcallbackPrefix(i), u = new RegExp("((^|\\?|&)" + s + ")=([^&]+)"), a = r.match(u), f = doc.createElement("script"), l = 0, c = navigator.userAgent.indexOf("MSIE 10.0") !== -1; return a ? a[3] === "?" ? r = r.replace(u, "$1=" + o) : o = a[3] : r = urlappend(r, s + "=" + o), context[o] = generalCallback, f.type = "text/javascript", f.src = r, f.async = !0, typeof f.onreadystatechange != "undefined" && !c && (f.htmlFor = f.id = "_reqwest_" + i), f.onload = f.onreadystatechange = function () { if (f[readyState] && f[readyState] !== "complete" && f[readyState] !== "loaded" || l) return !1; f.onload = f.onreadystatechange = null, f.onclick && f.onclick(), t(lastValue), lastValue = undefined, head.removeChild(f), l = 1 }, head.appendChild(f), { abort: function () { f.onload = f.onreadystatechange = null, n({}, "Request is aborted: timeout", {}), lastValue = undefined, head.removeChild(f), l = 1 } } } function getRequest(e, t) { var n = this.o, r = (n.method || "GET").toUpperCase(), i = typeof n == "string" ? n : n.url, s = n.processData !== !1 && n.data && typeof n.data != "string" ? reqwest.toQueryString(n.data) : n.data || null, o, u = !1; return (n["type"] == "jsonp" || r == "GET") && s && (i = urlappend(i, s), s = null), n["type"] == "jsonp" ? handleJsonp(n, e, t, i) : (o = n.xhr && n.xhr(n) || xhr(n), o.open(r, i, n.async === !1 ? !1 : !0), setHeaders(o, n), setCredentials(o, n), context[xDomainRequest] && o instanceof context[xDomainRequest] ? (o.onload = e, o.onerror = t, o.onprogress = function () { }, u = !0) : o.onreadystatechange = handleReadyState(this, e, t), n.before && n.before(o), u ? setTimeout(function () { o.send(s) }, 200) : o.send(s), o) } function Reqwest(e, t) { this.o = e, this.fn = t, init.apply(this, arguments) } function setType(e) { if (e === null) return undefined; if (e.match("json")) return "json"; if (e.match("javascript")) return "js"; if (e.match("text")) return "html"; if (e.match("xml")) return "xml" } function init(o, fn) { function complete(e) { o.timeout && clearTimeout(self.timeout), self.timeout = null; while (self._completeHandlers.length > 0) self._completeHandlers.shift()(e) } function success(resp) { var type = o.type || resp && setType(resp.getResponseHeader("Content-Type")); resp = type !== "jsonp" ? self.request : resp; var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type), r = filteredResponse; try { resp.responseText = r } catch (e) { } if (r) switch (type) { case "json": try { resp = context.JSON ? context.JSON.parse(r) : eval("(" + r + ")") } catch (err) { return error(resp, "Could not parse JSON in response", err) } break; case "js": resp = eval(r); break; case "html": resp = r; break; case "xml": resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML } self._responseArgs.resp = resp, self._fulfilled = !0, fn(resp), self._successHandler(resp); while (self._fulfillmentHandlers.length > 0) resp = self._fulfillmentHandlers.shift()(resp); complete(resp) } function timedOut() { self._timedOut = !0, self.request.abort() } function error(e, t, n) { e = self.request, self._responseArgs.resp = e, self._responseArgs.msg = t, self._responseArgs.t = n, self._erred = !0; while (self._errorHandlers.length > 0) self._errorHandlers.shift()(e, t, n); complete(e) } this.url = typeof o == "string" ? o : o.url, this.timeout = null, this._fulfilled = !1, this._successHandler = function () { }, this._fulfillmentHandlers = [], this._errorHandlers = [], this._completeHandlers = [], this._erred = !1, this._responseArgs = {}; var self = this; fn = fn || function () { }, o.timeout && (this.timeout = setTimeout(function () { timedOut() }, o.timeout)), o.success && (this._successHandler = function () { o.success.apply(o, arguments) }), o.error && this._errorHandlers.push(function () { o.error.apply(o, arguments) }), o.complete && this._completeHandlers.push(function () { o.complete.apply(o, arguments) }), this.request = getRequest.call(this, success, error) } function reqwest(e, t) { return new Reqwest(e, t) } function normalize(e) { return e ? e.replace(/\r?\n/g, "\r\n") : "" } function serial(e, t) { var n = e.name, r = e.tagName.toLowerCase(), i = function (e) { e && !e.disabled && t(n, normalize(e.attributes.value && e.attributes.value.specified ? e.value : e.text)) }, s, o, u, a; if (e.disabled || !n) return; switch (r) { case "input": /reset|button|image|file/i.test(e.type) || (s = /checkbox/i.test(e.type), o = /radio/i.test(e.type), u = e.value, (!s && !o || e.checked) && t(n, normalize(s && u === "" ? "on" : u))); break; case "textarea": t(n, normalize(e.value)); break; case "select": if (e.type.toLowerCase() === "select-one") i(e.selectedIndex >= 0 ? e.options[e.selectedIndex] : null); else for (a = 0; e.length && a < e.length; a++) e.options[a].selected && i(e.options[a]) } } function eachFormElement() { var e = this, t, n, r = function (t, n) { var r, i, s; for (r = 0; r < n.length; r++) { s = t[byTag](n[r]); for (i = 0; i < s.length; i++) serial(s[i], e) } }; for (n = 0; n < arguments.length; n++) t = arguments[n], /input|select|textarea/i.test(t.tagName) && serial(t, e), r(t, ["input", "select", "textarea"]) } function serializeQueryString() { return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments)) } function serializeHash() { var e = {}; return eachFormElement.apply(function (t, n) { t in e ? (e[t] && !isArray(e[t]) && (e[t] = [e[t]]), e[t].push(n)) : e[t] = n }, arguments), e } function buildParams(e, t, n, r) { var i, s, o, u = /\[\]$/; if (isArray(t)) for (s = 0; t && s < t.length; s++) o = t[s], n || u.test(e) ? r(e, o) : buildParams(e + "[" + (typeof o == "object" ? s : "") + "]", o, n, r); else if (t && t.toString() === "[object Object]") for (i in t) buildParams(e + "[" + i + "]", t[i], n, r); else r(e, t) } var context = this; if ("window" in context) var doc = document, byTag = "getElementsByTagName", head = doc[byTag]("head")[0]; else { var XHR2; try { XHR2 = require("xhr2") } catch (ex) { throw new Error("Peer dependency `xhr2` required! Please npm install xhr2") } } var httpsRe = /^http/, protocolRe = /(^\w+):\/\//, twoHundo = /^(20\d|1223)$/, readyState = "readyState", contentType = "Content-Type", requestedWith = "X-Requested-With", uniqid = 0, callbackPrefix = "reqwest_" + +(new Date), lastValue, xmlHttpRequest = "XMLHttpRequest", xDomainRequest = "XDomainRequest", noop = function () { }, isArray = typeof Array.isArray == "function" ? Array.isArray : function (e) { return e instanceof Array }, defaultHeaders = { contentType: "application/x-www-form-urlencoded", requestedWith: xmlHttpRequest, accept: { "*": "text/javascript, text/html, application/xml, text/xml, */*", xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", js: "application/javascript, text/javascript" } }, xhr = function (e) { if (e.crossOrigin === !0) { var t = context[xmlHttpRequest] ? new XMLHttpRequest : null; if (t && "withCredentials" in t) return t; if (context[xDomainRequest]) return new XDomainRequest; throw new Error("Browser does not support cross-origin requests") } return context[xmlHttpRequest] ? new XMLHttpRequest : XHR2 ? new XHR2 : new ActiveXObject("Microsoft.XMLHTTP") }, globalSetupOptions = { dataFilter: function (e) { return e } }; return Reqwest.prototype = { abort: function () { this._aborted = !0, this.request.abort() }, retry: function () { init.call(this, this.o, this.fn) }, then: function (e, t) { return e = e || function () { }, t = t || function () { }, this._fulfilled ? this._responseArgs.resp = e(this._responseArgs.resp) : this._erred ? t(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : (this._fulfillmentHandlers.push(e), this._errorHandlers.push(t)), this }, always: function (e) { return this._fulfilled || this._erred ? e(this._responseArgs.resp) : this._completeHandlers.push(e), this }, fail: function (e) { return this._erred ? e(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : this._errorHandlers.push(e), this }, "catch": function (e) { return this.fail(e) } }, reqwest.serializeArray = function () { var e = []; return eachFormElement.apply(function (t, n) { e.push({ name: t, value: n }) }, arguments), e }, reqwest.serialize = function () { if (arguments.length === 0) return ""; var e, t, n = Array.prototype.slice.call(arguments, 0); return e = n.pop(), e && e.nodeType && n.push(e) && (e = null), e && (e = e.type), e == "map" ? t = serializeHash : e == "array" ? t = reqwest.serializeArray : t = serializeQueryString, t.apply(null, n) }, reqwest.toQueryString = function (e, t) { var n, r, i = t || !1, s = [], o = encodeURIComponent, u = function (e, t) { t = "function" == typeof t ? t() : t == null ? "" : t, s[s.length] = o(e) + "=" + o(t) }; if (isArray(e)) for (r = 0; e && r < e.length; r++) u(e[r].name, e[r].value); else for (n in e) e.hasOwnProperty(n) && buildParams(n, e[n], i, u); return s.join("&").replace(/%20/g, "+") }, reqwest.getcallbackPrefix = function () { return callbackPrefix }, reqwest.compat = function (e, t) { return e && (e.type && (e.method = e.type) && delete e.type, e.dataType && (e.type = e.dataType), e.jsonpCallback && (e.jsonpCallbackName = e.jsonpCallback) && delete e.jsonpCallback, e.jsonp && (e.jsonpCallback = e.jsonp)), new Reqwest(e, t) }, reqwest.ajaxSetup = function (e) { e = e || {}; for (var t in e) globalSetupOptions[t] = e[t] }, reqwest })

// AddyComplete v2.1.2 - https://www.addy.co.nz

// Settings factory to retrieve options from scripts src URL
function AddyUrlSettingFactory(scriptName) {
    function getParameterByName(name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(src);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function getScriptSrc() {
        var scripts = document.getElementsByTagName("script");
        scriptName = scriptName.toLowerCase();

        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src && scripts[i].src.toLowerCase().indexOf(scriptName) !== -1) {
                return scripts[i].src;
            }
        }
        console.warn("Script source not found. Name: ", scriptName);
        return "";
    }

    // Create the options that be modified per control
    this.createOptions = function () {
        var options = {};

        // Set default options
        options.ignoreKeys = [38, 40, 13]; // up & down arrows, enter
        options.excludePostBox = getParameterByName("excludePostBox") || false;
        options.nzCountryValue = getParameterByName("nzCountryValue") || "NZL";
        return options;
    }

    // Create the initial configuration variables
    this.createConfig = function () {
        var config = {};
        config.key = getParameterByName("key");
        if (!config.key || config.key == "") console.warn("The API key is missing");

        config.maxItems = getParameterByName("maxItems") || 10;
        config.debounceMs = getParameterByName("debounceMs") || 250;
        return config;
    }

    // Create the callback variable
    this.createCallback = function () {
        var callback = getParameterByName("callback");
        if (callback && typeof window[callback] === 'function') return callback;
        return null;
    }

    var src = getScriptSrc(scriptName);
}

// Create a global / singleton settings factory by looking for a script with the name addycomplete
var addySettingsFactory = new AddyUrlSettingFactory("addycomplete");

// AddyComplete is responsible for adding autocomplete functionality to the input field
function AddyComplete(input, fields) {
    if (!input) {
        console.warn("Input field is missing");
        return;
    }
    var me = this;
    me.urlBase = "https://www.addy.co.nz/";
    me.fields = fields ? fields : {};

    me.options = addySettingsFactory.createOptions();
    me.config = addySettingsFactory.createConfig();

    me.awesomplete = new Awesomplete(input,
        {
            maxItems: me.config.maxItems,
            minChars: 3,
            autoFirst: true,
            sort: false
        });

    // disable the filter, results will be filtered by the API
    me.awesomplete.filter = function () {
        return true;
    }

    function debounce(func, wait) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var call = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(call, wait);
            if (!timeout) func.apply(context, args);
        };
    };

    this.setAddress = function(address) {
        if (me.fields.address) me.fields.address.value = address.displayline;
        if (me.fields.suburb) me.fields.suburb.value = address.suburb;
        if (me.fields.city) me.fields.city.value = address.city;
        if (me.fields.postcode) me.fields.postcode.value = address.postcode;
        if (me.fields.line1) me.fields.line1.value = address.address1;
        if (me.fields.line2) me.fields.line2.value = address.address2;
        if (me.fields.line3) me.fields.line3.value = address.address3;
        if (me.fields.line4) me.fields.line4.value = address.address4;

        if (!me.fields.city && me.fields.suburb && address.suburb === "" && address.city !== "") {
            me.fields.suburb.value = address.city;
        }

        if (me.fields.address1 && me.fields.address2) {
            if (address.address4 || address.address2.indexOf("RD ") === 0) {
                me.fields.address1.value = address.address1;
                me.fields.address2.value = address.address2;
            } else {
                me.fields.address1.value = address.displayline;
                me.fields.address2.value = '';
            }

            // Combine address 1 with address 2 and use address 2 as the suburb
            if (!me.fields.suburb && address.suburb && address.suburb !== "") {
                if (me.fields.address2.value !== "") {
                    me.fields.address1.value += ", " + me.fields.address2.value;
                }
                me.fields.address2.value = address.suburb;
            }
        } else if (me.fields.address1 && !me.fields.address2) {
            me.fields.address1.value = address.displayline;
        }

        var region = me.fields.region;
        if (region) {
            if (region.options) {
                address.region = address.region.toUpperCase();
                var regions = [address.region, address.region.replace("'", ""), address.region.replace("-", " - "), address.region.replace("-", " / "), address.region.replace("-", "/")];
                console.log(regions);

                for (var i = 0; i < region.options.length; i++) {
                    if (regions.indexOf(region.options[i].text.toUpperCase()) > -1 ||
                        regions.indexOf(region.options[i].value.toUpperCase()) > -1) {
                        region.selectedIndex = i;
                        break;
                    }
                }
            } else {
                region.value = address.region;
            }
        }
    }
    
    var createGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    var sessionId = createGuid();

    function makeRequest(url, callback) {
        reqwest({
            url: url,
            type: 'jsonp',
            success: function (data) {
                callback(data);
            }
        });
    }

    function jsonp(url, callback) {
        var callbackName = 'addyJsonp' + Math.round(100000 * Math.random());
        window[callbackName] = function (data) {
            delete window[callbackName];
            document.body.removeChild(script);
            callback(data);
        };

        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
        document.body.appendChild(script);
    }

    input.onkeyup = debounce(function (e) {
        if (me.options.ignoreKeys.indexOf(e.keyCode) !== -1 || this.value.length < me.awesomplete.minChars) return;
        if (me.fields.country && this.fields.country.options[me.fields.country.selectedIndex].value !== me.options.nzCountryValue) {
            me.awesomplete.list = [];
            return;
        }
        makeRequest(me.urlBase + "api/search?key=" + me.config.key + "&session=" + sessionId + "&expostbox=" + me.options.excludePostBox + "&max=" + me.awesomplete.maxItems + "&s=" + this.value, function (result) {
            me.awesomplete.list = result.addresses.map(function (a) { return { label: a.a, value: a.id } });
        });
    }, me.config.debounceMs);

    input.addEventListener("awesomplete-selectcomplete", function (e) {
        makeRequest(me.urlBase + "api/address/" + e.text.value + "?key=" + me.config.key + "&session=" + sessionId, function (address) {
            this.setAddress(address);
        }.bind(this));
    }.bind(this), false);
}

// Execute the callback function if it defined
var addyInitCallback = addySettingsFactory.createCallback();
if (addyInitCallback) window[addyInitCallback]();