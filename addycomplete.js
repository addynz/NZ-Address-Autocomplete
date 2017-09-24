// Awesomplete - Lea Verou - MIT license
!function () { function t(t) { var e = Array.isArray(t) ? { label: t[0], value: t[1] } : "object" == typeof t && "label" in t && "value" in t ? t : { label: t, value: t }; this.label = e.label || e.value, this.value = e.value } function e(t, e, i) { for (var n in e) { var s = e[n], r = t.input.getAttribute("data-" + n.toLowerCase()); "number" == typeof s ? t[n] = parseInt(r) : !1 === s ? t[n] = null !== r : s instanceof Function ? t[n] = null : t[n] = r, t[n] || 0 === t[n] || (t[n] = n in i ? i[n] : s) } } function i(t, e) { return "string" == typeof t ? (e || document).querySelector(t) : t || null } function n(t, e) { return o.call((e || document).querySelectorAll(t)) } function s() { n("input.awesomplete").forEach(function (t) { new r(t) }) } var r = function (t, n) { var s = this; this.isOpened = !1, this.input = i(t), this.input.setAttribute("autocomplete", "off"), this.input.setAttribute("aria-autocomplete", "list"), n = n || {}, e(this, { minChars: 2, maxItems: 10, autoFirst: !1, data: r.DATA, filter: r.FILTER_CONTAINS, sort: !1 !== n.sort && r.SORT_BYLENGTH, item: r.ITEM, replace: r.REPLACE }, n), this.index = -1, this.container = i.create("div", { className: "awesomplete", around: t }), this.ul = i.create("ul", { hidden: "hidden", inside: this.container }), this.status = i.create("span", { className: "visually-hidden", role: "status", "aria-live": "assertive", "aria-relevant": "additions", inside: this.container }), this._events = { input: { input: this.evaluate.bind(this), blur: this.close.bind(this, { reason: "blur" }), keydown: function (t) { var e = t.keyCode; s.opened && (13 === e && s.selected ? (t.preventDefault(), s.select()) : 27 === e ? s.close({ reason: "esc" }) : 38 !== e && 40 !== e || (t.preventDefault(), s[38 === e ? "previous" : "next"]())) } }, form: { submit: this.close.bind(this, { reason: "submit" }) }, ul: { mousedown: function (t) { var e = t.target; if (e !== this) { for (; e && !/li/i.test(e.nodeName) ;) e = e.parentNode; e && 0 === t.button && (t.preventDefault(), s.select(e, t.target)) } } } }, i.bind(this.input, this._events.input), i.bind(this.input.form, this._events.form), i.bind(this.ul, this._events.ul), this.input.hasAttribute("list") ? (this.list = "#" + this.input.getAttribute("list"), this.input.removeAttribute("list")) : this.list = this.input.getAttribute("data-list") || n.list || [], r.all.push(this) }; r.prototype = { set list(t) { if (Array.isArray(t)) this._list = t; else if ("string" == typeof t && t.indexOf(",") > -1) this._list = t.split(/\s*,\s*/); else if ((t = i(t)) && t.children) { var e = []; o.apply(t.children).forEach(function (t) { if (!t.disabled) { var i = t.textContent.trim(), n = t.value || i, s = t.label || i; "" !== n && e.push({ label: s, value: n }) } }), this._list = e } document.activeElement === this.input && this.evaluate() }, get selected() { return this.index > -1 }, get opened() { return this.isOpened }, close: function (t) { this.opened && (this.ul.setAttribute("hidden", ""), this.isOpened = !1, this.index = -1, i.fire(this.input, "awesomplete-close", t || {})) }, open: function () { this.ul.removeAttribute("hidden"), this.isOpened = !0, this.autoFirst && -1 === this.index && this.goto(0), i.fire(this.input, "awesomplete-open") }, destroy: function () { i.unbind(this.input, this._events.input), i.unbind(this.input.form, this._events.form); var t = this.container.parentNode; t.insertBefore(this.input, this.container), t.removeChild(this.container), this.input.removeAttribute("autocomplete"), this.input.removeAttribute("aria-autocomplete"); var e = r.all.indexOf(this); -1 !== e && r.all.splice(e, 1) }, next: function () { var t = this.ul.children.length; this.goto(this.index < t - 1 ? this.index + 1 : t ? 0 : -1) }, previous: function () { var t = this.ul.children.length, e = this.index - 1; this.goto(this.selected && -1 !== e ? e : t - 1) }, goto: function (t) { var e = this.ul.children; this.selected && e[this.index].setAttribute("aria-selected", "false"), this.index = t, t > -1 && e.length > 0 && (e[t].setAttribute("aria-selected", "true"), this.status.textContent = e[t].textContent, this.ul.scrollTop = e[t].offsetTop - this.ul.clientHeight + e[t].clientHeight, i.fire(this.input, "awesomplete-highlight", { text: this.suggestions[this.index] })) }, select: function (t, e) { if (t ? this.index = i.siblingIndex(t) : t = this.ul.children[this.index], t) { var n = this.suggestions[this.index]; i.fire(this.input, "awesomplete-select", { text: n, origin: e || t }) && (this.replace(n), this.close({ reason: "select" }), i.fire(this.input, "awesomplete-selectcomplete", { text: n })) } }, evaluate: function () { var e = this, i = this.input.value; i.length >= this.minChars && this._list.length > 0 ? (this.index = -1, this.ul.innerHTML = "", this.suggestions = this._list.map(function (n) { return new t(e.data(n, i)) }).filter(function (t) { return e.filter(t, i) }), !1 !== this.sort && (this.suggestions = this.suggestions.sort(this.sort)), this.suggestions = this.suggestions.slice(0, this.maxItems), this.suggestions.forEach(function (t) { e.ul.appendChild(e.item(t, i)) }), 0 === this.ul.children.length ? this.close({ reason: "nomatches" }) : this.open()) : this.close({ reason: "nomatches" }) } }, r.all = [], r.FILTER_CONTAINS = function (t, e) { return RegExp(i.regExpEscape(e.trim()), "i").test(t) }, r.FILTER_STARTSWITH = function (t, e) { return RegExp("^" + i.regExpEscape(e.trim()), "i").test(t) }, r.SORT_BYLENGTH = function (t, e) { return t.length !== e.length ? t.length - e.length : t < e ? -1 : 1 }, r.ITEM = function (t, e) { return i.create("li", { innerHTML: "" === e.trim() ? t : t.replace(RegExp(i.regExpEscape(e.trim()), "gi"), "<mark>$&</mark>"), "aria-selected": "false" }) }, r.REPLACE = function (t) { this.input.value = t.value }, r.DATA = function (t) { return t }, Object.defineProperty(t.prototype = Object.create(String.prototype), "length", { get: function () { return this.label.length } }), t.prototype.toString = t.prototype.valueOf = function () { return "" + this.label }; var o = Array.prototype.slice; i.create = function (t, e) { var n = document.createElement(t); for (var s in e) { var r = e[s]; if ("inside" === s) i(r).appendChild(n); else if ("around" === s) { var o = i(r); o.parentNode.insertBefore(n, o), n.appendChild(o) } else s in n ? n[s] = r : n.setAttribute(s, r) } return n }, i.bind = function (t, e) { if (t) for (var i in e) { var n = e[i]; i.split(/\s+/).forEach(function (e) { t.addEventListener(e, n) }) } }, i.unbind = function (t, e) { if (t) for (var i in e) { var n = e[i]; i.split(/\s+/).forEach(function (e) { t.removeEventListener(e, n) }) } }, i.fire = function (t, e, i) { var n = document.createEvent("HTMLEvents"); n.initEvent(e, !0, !0); for (var s in i) n[s] = i[s]; return t.dispatchEvent(n) }, i.regExpEscape = function (t) { return t.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&") }, i.siblingIndex = function (t) { for (var e = 0; t = t.previousElementSibling; e++); return e }, "undefined" != typeof Document && ("loading" !== document.readyState ? s() : document.addEventListener("DOMContentLoaded", s)), r.$ = i, r.$$ = n, "undefined" != typeof self && (self.Awesomplete = r), "object" == typeof module && module.exports && (module.exports = r) }();

// AddyComplete - https://www.addy.co.nz

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
    var config = addySettingsFactory.createConfig();

    me.awesomplete = new Awesomplete(input,
        {
            maxItems: config.maxItems,
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

    function setAddress(address) {
        if (me.fields.address) me.fields.address.value = address.displayline;
        if (me.fields.suburb) me.fields.suburb.value = address.suburb;
        if (me.fields.city) me.fields.city.value = address.city;
        if (me.fields.region) me.fields.region.value = address.region;
        if (me.fields.postcode) me.fields.postcode.value = address.postcode;
        if (me.fields.line1) me.fields.line1.value = address.address1;
        if (me.fields.line2) me.fields.line2.value = address.address2;
        if (me.fields.line3) me.fields.line3.value = address.address3;
        if (me.fields.line4) me.fields.line4.value = address.address4;

        if (me.fields.address1 && me.fields.address2) {
            if (address.address4 || address.address2.indexOf("RD ") === 0) {
                me.fields.address1.value = address.address1;
                me.fields.address2.value = address.address2;
            } else {
                me.fields.address1.value = address.displayline;
                me.fields.address2.value = '';
            }
        }
    }

    function sendRequest(url, func) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.onload = function () {
            var result = JSON.parse(request.responseText);
            func(result);
        }
        request.setRequestHeader("addy-api-key", config.key);
        request.send();
    }

    input.onkeyup = debounce(function (e) {
        if (me.options.ignoreKeys.indexOf(e.keyCode) !== -1 || this.value.length < me.awesomplete.minChars) return;
        if (me.fields.country && this.fields.country.options[me.fields.country.selectedIndex].value !== me.options.nzCountryValue) {
            me.awesomplete.list = [];
            return;
        }
        sendRequest(me.urlBase + "api/search?expostbox=" + me.options.excludePostBox + "&max=" + me.awesomplete.maxItems + "&s=" + this.value, function (result) {
            me.awesomplete.list = result.addresses.map(function (a) { return { label: a.a, value: a.id } });
        });
    }, config.debounceMs);

    input.addEventListener("awesomplete-selectcomplete", function (e) {
        sendRequest(me.urlBase + "api/address/" + e.text.value, function (address) {
            setAddress(address);
        });
    }, false);
}

// Execute the callback function if it defined
var addyInitCallback = addySettingsFactory.createCallback();
if (addyInitCallback) window[addyInitCallback]();
