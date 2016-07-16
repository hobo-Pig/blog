(function(a) {
    var f = a.M = a.M || {};
    var c = {
        decodeHtml: function(l) {
            var m = {
                "&lt;": "<",
                "&gt;": ">",
                "&amp;": "&",
                "&nbsp;": " ",
                "&quot;": '"',
                "&copy;": "",
                "&apos;": "'"
            };
            return (typeof l != "string") ? l : l.replace(/&\w+;|&#(\d+);/g, function(o, n) {
                var p = m[o];
                if (p === undefined) {
                    if (!isNaN(n)) {
                        p = String.fromCharCode((n == 160) ? 32 : n)
                    } else {
                        p = o
                    }
                }
                return p
            })
        },
        isUnsignedNumeric: function(l) {
            if (g.isEmpty(l)) {
                return false
            }
            var m = /^\d+(\.\d+)?$/;
            return m.test(l)
        },
        isInteger: function h(l) {
            if (g.isEmpty(phone)) {
                return false
            }
            var m = /^(-     |\+)?\d+$/;
            return m.test(l)
        },
        isUnsignedInteger: function(l) {
            var m = /^\d+$/;
            return m.test(l)
        },
        isFloat: function(l) {
            if (g.isEmpty(l)) {
                return false
            }
            var m = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
            return m.test(l)
        },
        isPhoneNum: function(l) {
            if (g.isEmpty(l)) {
                return false
            }
            var m = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            return m.test(l)
        },
        isEmail: function(l) {
            if (g.isEmpty(l)) {
                return false
            }
            var m = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            return m.test(l)
        },
        hasSpace: function(l) {
            if (val == undefined || val == null  || val == "null" || val == "undefined") {
                return true
            }
            return l.indexOf("") > -1
        }
    };
    var g = {
        $mObj: {},
        merge: function(n, m, l) {//合并对象
            if (!n || !m || typeof m != "object") {
                return n
            }
            if (!l) {
                for (var r in m) {//可继承原型上属性
                    n[r] = m[r]
                }
            } else {
                var q, o;
                for (q in m) {
                    if (m.hasOwnProperty(q)) {//剔除原型上属性
                        o = m[q];
                        if (o && o.constructor === Object) {
                            if (n[q] && n[q].constructor === Object) {
                                g.merge(n[q], o)
                            } else {
                                n[q] = o
                            }
                        } else {
                            n[q] = o
                        }
                    }
                }
            }
            return n
        },
        clone: function(m, l) {
            return g.merge({}, m, l)
        },
        namespace: function() {
            var m = a, r, o, p, n, q, s;
            for (p = 0,
            q = arguments.length; p < q; p++) {
                var l = arguments[p];
                if (g.$mObj.namespace[l]) {
                    continue
                }
                r = l.split(".");
                for (n = 0,
                s = r.length; n < s; n++) {
                    o = r[n];
                    if (!m[o]) {
                        m[o] = {}
                    }
                    m = m[o]
                }
                g.$mObj.namespace[l] = true
            }
        },
        extend: function() {
            var l = function(p) {
                for (var n in p) {
                    if (!p.hasOwnProperty(n)) {
                        continue
                    }
                    this[n] = p[n]
                }
            }
            ;
            return function(p, o) {
                (typeof p == "function") || (p = function() {}
                );
                var m = function() {
                    p.apply(this, arguments)
                }
                ;
                var n = function() {}
                ;
                n.prototype = p.prototype;
                m.prototype = new n();
                m.prototype.constructor = m;
                m.superclass = p.prototype;
                if (p.prototype.constructor === Object.prototype.constructor) {
                    p.prototype.constructor = p
                }
                m.override = function(r) {
                    if (m.prototype && r && typeof r == "object") {
                        for (var q in r) {
                            m.prototype[q] = r[q]
                        }
                    }
                }
                ;
                m.prototype.override = l;
                m.override(o);
                return m
            }
        }(),
        each: function(n, r, q) {
            if (g.isEmpty(n) || !r) {
                return
            }
            if (g.isArray(n)) {
                for (var p = 0, m = n.length; p < m; p++) {
                    try {
                        if (r.call(q, n[p], p, n) === false) {
                            return
                        }
                    } catch (s) {
                        f.log(s, "error")
                    }
                }
            } else {
                for (var o in n) {
                    if (!n.hasOwnProperty(o)) {
                        continue
                    }
                    try {
                        if (r.call(q, n[o], o, n) === false) {
                            return
                        }
                    } catch (s) {
                        f.log(s, "error")
                    }
                }
            }
        },
        contains: function(o, n) {
            if (g.isArray(o)) {
                if ("indexOf" in Array.prototype) {
                    return o.indexOf(n) !== -1
                }
                var l, m;
                for (l = 0,
                m = o.length; l < m; l++) {
                    if (o[l] === n) {
                        return true
                    }
                }
                return false
            } else {
                return !g.isEmpty(o) && n in o
            }
        },
        isEmpty: function(l, n) {
            if ((typeof l === "undefined") || (l === null ) || (!n ? l === "" : false) || (g.isArray(l) && l.length === 0)) {
                return true
            } else {
                if (g.isObject(l)) {
                    for (var m in l) {
                        if (Object.prototype.hasOwnProperty.call(l, m)) {
                            return false
                        }
                    }
                    return true
                }
            }
            return false
        },
        isBlank: function(l) {
            return g.isEmpty(l) ? true : g.isEmpty(String(l).replace(/^\s+|\s+$/g, ""))
        },
        isDefined: function(l) {
            return typeof l === "undefined"
        },
        isObject: function(l) {
            if (Object.prototype.toString.call(null ) === "[object Object]") {
                return l !== null  && l !== undefined && Object.prototype.toString.call(l) === "[object Object]" && l.ownerDocument === undefined
            } else {
                return Object.prototype.toString.call(l) === "[object Object]"
            }
        },
        isFunction: function(l) {
            return Object.prototype.toString.apply(l) === "[object Function]"
        },
        isArray: function(l) {
            return Object.prototype.toString.apply(l) === "[object Array]"
        },
        isDate: function(l) {
            return Object.prototype.toString.apply(l) === "[object Date]"
        },
        isNumber: function(l) {
            return typeof l === "number" && isFinite(l)
        },
        isString: function(l) {
            return typeof l === "string"
        },
        isBoolean: function(l) {
            return typeof l === "boolean"
        }
    };
    var j = {
        toString: function(l, t) {
            var s = undefined;
            var q = l.getFullYear();
            var p = l.getMonth() + 1;
            var r = l.getDate();
            var m = l.getHours();
            var n = l.getMinutes();
            var o = l.getSeconds();
            p = (parseInt(p) < 10) ? ("0" + p) : (p);
            r = (parseInt(r) < 10) ? ("0" + r) : (r);
            m = (parseInt(m) < 10) ? ("0" + m) : (m);
            n = (parseInt(n) < 10) ? ("0" + n) : (n);
            o = (parseInt(o) < 10) ? ("0" + o) : (o);
            if ("yyyy-MM-dd HH:mm:ss" == t) {
                s = q + "-" + p + "-" + r + " " + m + ":" + n + ":" + o
            } else {
                if ("yyyy-MM-dd" == t) {
                    s = q + "-" + p + "-" + r
                } else {
                    if ("yyyy-MM" == t) {
                        s = q + "-" + p
                    } else {
                        if ("yyyy" == t) {
                            s = q
                        }
                    }
                }
            }
            return s
        },
        toDate: function(q) {
            if (q.length == 19) {
                var p = q.substring(0, 4);
                var r = q.substring(5, 7);
                var m = q.substring(8, 10);
                var l = q.substring(11, 13);
                var n = q.substring(14, 16);
                var o = q.substring(17, 19);
                return new Date(p,r - 1,m,l,n,o)
            } else {
                if (q.length == 10) {
                    var p = q.substring(0, 4);
                    var r = q.substring(5, 7);
                    var m = q.substring(8, 10);
                    return new Date(p,r - 1,m)
                } else {
                    if (q.length == 7) {
                        var p = q.substring(0, 4);
                        var r = q.substring(5, 7);
                        return new Date(p,r - 1)
                    } else {
                        if (q.length == 4) {
                            var p = q.substring(0, 4);
                            return new Date(p)
                        } else {
                            return undefined
                        }
                    }
                }
            }
        },
        getMonthDays: function(l, o) {
            var m = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
            var n = l.getFullYear();
            if (typeof o == "undefined") {
                o = l.getMonth()
            }
            if (((0 == (n % 4)) && ((0 != (n % 100)) || (0 == (n % 400)))) && o == 1) {
                return 29
            } else {
                return m[o]
            }
        },
        addDays: function(l, n) {
            var m = (arguments.length == 1) ? j.toDate(j.today()) : j.toDate(n);
            m = new Date(m.getTime() + parseInt(l) * 24 * 3600 * 1000);
            return j.toString(new Date(m), "yyyy-MM-dd HH:mm:ss")
        },
        addMonths: function(p, o) {
            var l = (arguments.length == 1) ? j.toDate(j.today()) : j.toDate(o);
            var m = l.getMonth();
            var n = l.getDate();
            var q = j.getMonthDays(l, l.getMonth() + parseInt(p));
            if (n > q) {
                l.setDate(q)
            }
            l.setMonth(l.getMonth() + parseInt(p));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        addMonthsForStart: function(n, m) {
            var l = (arguments.length == 1) ? j.today() : m;
            l = j.addMonths(n, l);
            return j.firstDayOfMonth(l)
        },
        addMonthsForEnd: function(n, m) {
            var l = (arguments.length == 1) ? j.today() : m;
            l = j.addMonths(n, l);
            return j.addDays(-1, j.firstDayOfMonth(l))
        },
        addYears: function(m, n) {
            var l = (arguments.length == 1) ? j.toDate(j.today()) : j.toDate(n);
            l.setYear(l.getYear() + parseInt(m));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        addYearsForStart: function(l, n) {
            var m = (arguments.length == 1) ? j.today() : n;
            m = j.addYears(l, m);
            return j.firstDayOfYear(m)
        },
        addYearsForEnd: function(l, n) {
            var m = (arguments.length == 1) ? j.today() : n;
            m = j.addYears(l, m);
            return j.firstDayOfYear(m)
        },
        sunOfWeek: function(m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay()) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        monOfWeek: function(m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 1) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        tueOfWeek: function(m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 2) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        wedOfWeek: function(m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 3) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        turOfWeek: function(m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 4) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        friOfWeek: function(m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 5) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        satOfWeek: function(m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l = new Date(l - (l.getDay() - 6) * (24 * 3600 * 1000));
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        firstDayOfMonth: function(m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l.setDate(1);
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        lastDayOfMonth: function(l) {
            l = (arguments.length == 0) ? j.today() : (l);
            l = j.addMonths(1, l);
            l = j.firstDayOfMonth(l);
            l = j.addDays(-1, l);
            return l
        },
        firstDayOfYear: function(m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l.setMonth(0);
            l.setDate(1);
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        lastDayOfYear: function(m) {
            var l = (arguments.length == 0) ? j.toDate(j.today()) : j.toDate(m);
            l.setMonth(11);
            l.setDate(31);
            return j.toString(l, "yyyy-MM-dd HH:mm:ss")
        },
        today: function(l) {
            if (arguments.length == 0) {
                return j.toString(new Date(), "yyyy-MM-dd")
            } else {
                return j.toString(new Date(), l)
            }
        }
    };
    var k = {
        getCookie: function(m) {
            var l, n = new RegExp("(^| )" + m + "=([^;]*)(;|$)");
            l = document.cookie.match(n);
            if (l) {
                return unescape(l[2])
            } else {
                return null 
            }
        },
        setCookie: function(n, p, l, q, o) {
            var r = n + "=" + escape(p);
            if (l != "") {
                var m = new Date();
                m.setTime(m.getTime() + l * 24 * 3600 * 1000);
                r += ";expires=" + m.toGMTString()
            }
            if (q != "") {
                r += ";path=" + q
            }
            if (o != "") {
                r += ";domain=" + o
            }
            document.cookie = r
        },
        delCookie: function(m) {
            var l = new Date();
            l.setTime(l.getTime() - 1);
            document.cookie = m + "=; expires=" + l.toGMTString()
        }
    };
    var b = {
        getParam: function(l) {
            var m = new RegExp("(^|&)" + l + "=([^&]*)(&|$)","i");
            var n = window.location.search.substr(1).match(m);
            if (n != null ) {
                return unescape(n[2])
            }
            return null 
        },
        setParams: function(n) {
            var m = window.location.search;
            var r = "";
            var l = new Array();
            var o = {};
            if (g.isObject(n)) {
                if (m.indexOf("?") != -1) {
                    r = m.substr(m.indexOf("?") + 1)
                }
                if (r.length > 0) {
                    var q = r.split("&");
                    for (i in q) {
                        var p = q[i].split("=");
                        if (p.length > 1) {
                            o[p[0]] = p[1]
                        } else {
                            o[p[0]] = ""
                        }
                    }
                    g.merge(o, n)
                } else {
                    o = n
                }
            } else {
                throw new Error("arguments is not a jsonobject")
            }
            for (key in o) {
                l.push(key);
                l.push("=");
                l.push(n[key]);
                l.push("&")
            }
            l.pop();
            window.location.search = l.jion()
        },
        getHash: function() {
            var l = window.location.hash;
            if (!l) {
                return undefined
            } else {
                return l.replace("#", "")
            }
        },
        setHash: function(l) {
            if (l) {
                window.location.hash = "#" + l
            } else {
                window.location.hash = ""
            }
        }
    };
    var d = {
        ajax: function(l) {
            if (!l || !l.url) {
                return false
            }
            $.ajax({
                url: l.url,
                type: l.type || "post",
                dataType: l.dataType || "json",
                async: l.async === false ? false : true,
                data: l.data || {},
                timeout: (l.timeout && l.timeout > 0 ? l.timeout : 0),
                success: function(m) {
                    if (!l.success) {
                        return
                    }
                    l.success.call(l.scope, m)
                },
                error: function(m) {
                    if (!l.error) {
                        return
                    }
                    l.error.call(l.scope, m)
                }
            });
            return true
        }
    };
    BrowserUtil = function() {
        var o = null ;
        var m = null ;
        function p() {
            var I = navigator.userAgent;
            o = {},
            m = {};
            var r = I.match(/Web[kK]it[\/]{0,1}([\d.]+)/)
              , J = I.match(/(Android);?[\s\/]+([\d.]+)?/)
              , K = !!I.match(/\(Macintosh\; Intel /)
              , C = I.match(/(iPad).*OS\s([\d_]+)/)
              , w = I.match(/(iPod)(.*OS\s([\d_]+))?/)
              , u = !C && I.match(/(iPhone\sOS)\s([\d_]+)/)
              , q = I.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)
              , E = q && I.match(/TouchPad/)
              , v = I.match(/Kindle\/([\d.]+)/)
              , H = I.match(/Silk\/([\d._]+)/)
              , D = I.match(/(BlackBerry).*Version\/([\d.]+)/)
              , A = I.match(/(BB10).*Version\/([\d.]+)/)
              , s = I.match(/(RIM\sTablet\sOS)\s([\d.]+)/)
              , B = I.match(/PlayBook/)
              , G = I.match(/Chrome\/([\d.]+)/) || I.match(/CriOS\/([\d.]+)/)
              , x = I.match(/Firefox\/([\d.]+)/)
              , F = I.match(/MSIE\s([\d.]+)/) || I.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/)
              , t = !G && I.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/)
              , z = t || I.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)
              , y = I.indexOf("MicroMessenger") >= 0;
            if (r) {
                m.browser = "webkit";
                m.version = r[1]
            }
            if (J) {
                o.os = "android";
                o.version = J[2]
            }
            if (u && !w) {
                o.os = "ios";
                o.cline = "iphone"
            }
            if (C) {
                o.os = "ios";
                o.cline = "ipad"
            }
            if (w) {
                o.os = "ios";
                o.cline = "ipod";
                o.version = w[3] ? w[3].replace(/_/g, ".") : null 
            }
            if (q) {
                o.os = "webos";
                o.version = q[2]
            }
            if (E) {
                o.os = "touchpad"
            }
            if (D) {
                o.os = "blackberry";
                o.version = D[2]
            }
            if (A) {
                o.os = "bb10";
                o.version = A[2]
            }
            if (s) {
                o.os = "rimtabletos";
                o.version = s[2]
            }
            if (B) {
                o.os = "playbook"
            }
            if (v) {
                o.kindle = "kindle";
                o.version = v[1]
            }
            if (H) {
                o.silk = "silk";
                o.version = H[1]
            }
            if (!H && o.android && I.match(/Kindle Fire/)) {
                m.browser = "silk"
            }
            if (G) {
                m.browser = "chrome";
                m.version = G[1]
            }
            if (x) {
                m.browser = "firefox";
                m.version = x[1]
            }
            if (F) {
                m.browser = "ie";
                m.version = F[1]
            }
            if (z && (K || o.ios)) {
                m.browser = "safari";
                if (K) {
                    m.version = z[1]
                }
            }
            if (t) {
                m.browser = "webview"
            }
            if (y) {
                m.browser = "weixin"
            }
            o.tablet = !!(C || B || (J && !I.match(/Mobile/)) || (x && I.match(/Tablet/)) || (F && !I.match(/Phone/) && I.match(/Touch/)));
            o.phone = !!(!o.tablet && !o.ipod && (J || u || q || D || A || (G && I.match(/Android/)) || (G && I.match(/CriOS\/([\d.]+)/)) || (x && I.match(/Mobile/)) || (F && I.match(/Touch/))));
            o.os = o.os || null ;
            o.version = o.version || null ;
            o.cline = o.cline || null ;
            o.kindle = o.kindle || false;
            o.tablet = o.tablet || null ;
            o.phone = o.phone || false;
            o.silk = o.silk || null ;
            m.browser = m.browser || null ;
            m.version = m.version || null 
        }
        function l() {
            if (!o || !m) {
                p()
            }
            return o
        }
        function n() {
            if (!o || !m) {
                p()
            }
            return m
        }
        return {
            getOs: l,
            getBrowser: n
        }
    }
    ;
    LocalStorageUtil = function() {
        var o = window.localStorage ? true : false;
        if (o) {
            try {
                window.localStorage.setItem("M_test", 1)
            } catch (p) {
                o = false;
                f.log("localStorage�޷�set", "error")
            }
            try {
                window.localStorage.getItem("M_test")
            } catch (p) {
                o = false;
                f.log("localStorage�޷�get", "error")
            }
            try {
                window.localStorage.removeItem("M_test")
            } catch (p) {
                o = false;
                f.log("localStorage�޷�remove", "error")
            }
        }
        function m(s) {
            var r = null ;
            if (o && s) {
                r = window.localStorage.getItem(s)
            }
            return r
        }
        function q(r, s) {
            if (o && r) {
                try {
                    window.localStorage.setItem(r, s)
                } catch (t) {
                    LocalStorageUtil.removeAll();
                    window.localStorage.setItem(r, s)
                }
            }
        }
        function l(r) {
            if (o && r) {
                window.localStorage.removeItem(r)
            }
        }
        function n() {
            if (o) {
                g.each(window.localStorage, function(t, u, s, r) {
                    window.localStorage.removeItem(s)
                })
            }
        }
        return {
            get: m,
            set: q,
            remove: l,
            removeAll: n
        }
    }
    ;
    f.modules = {};
    f.runMod = [];
    f.config = {
        debug: 0
    };
    f.log = function(m, l) {
        f.config && f.config.debug && (typeof console !== "undefined" && console !== null ) && (console[l || (l = "log")]) && console[l](m)
    }
    ;
    var e = {
        require: function(l, m) {
            !g.isArray(l) && (l = Array(l));
            e.loadJs(l, m)
        },
        loadJs: function(l, m) {
            $LAB.setOptions({
                AlwaysPreserveOrder: true
            }).script(l).wait(function() {
                if (m) {
                    m.call(null )
                }
            })
        },
        exports: function(l) {
            if (f.modules[l] && f.modules[l].exports) {
                return f.modules[l].exports
            }
            return null 
        },
        define: function(l, m) {
            if (arguments.length == 1) {
                m = l
            }
            if (g.isEmpty(l) && f.isFunction(m)) {
                m.call(null );
                return
            }
            !f.modules[l] && (f.modules[l] = {});
            f.modules[l]["factory"] = m
        },
        defineModule: function() {
            g.each(f.modules, function(o, m) {
                var n = f.modules[m];
                if (!n.exports && n.factory) {
                    n.exports = {};

                    var l = n.factory.call(null , n.exports);
                    console.log(l)
                    l && (n.exports = l)
                }
            })
        },
        setRunMod: function(l, m) {
            if (g.isArray(l)) {
                if (m) {
                    f.runMod = l
                } else {
                    f.runMod = f.runMod.concat(l)
                }
            } else {
                if (g.isString(l) && !g.isBlank(l)) {
                    if (m) {
                        f.runMod = [l]
                    } else {
                        f.runMod.push(l)
                    }
                }
            }
        },
        setConfig: function(l, m) {
            e.setGlobalProp("config", l, m)
        },
        setGlobalProp: function(p, l, n) {
            var m = f[p];
            if (g.isString(l)) {
                m[l] = n;
                return
            }
            if (g.isObject(l)) {
                var o = l;
                g.each(o, function(r, q) {
                    setGlobalProp(p, q, r)
                })
            }
        },
        idSeed: 0,
        genId: function(l) {
            var m = (l || "mGen") + (++e.idSeed);
            return m
        },
        runner: function(l) {
            e.defineModule();
            // var m = false;
            // if (g.isObject(l)) {
            //     m = true
            // }
            // g.each(f.runMod, function(o) {
            //     var p = m && l[o] ? l[o] : null ;
            //     if (e.exports(o)) {
            //         var n = e.exports(o);
            //         var r = n.clazz ? new n.clazz(p) : n;
            //         if (g.isFunction(r.run)) {
            //             try {
            //                 r.run()
            //             } catch (q) {
            //                 f.log(q, "error")
            //             }
            //         }
            //     }
            // })
        }
    };
    f.require = function() {
        return e.require.apply(null , arguments)
    }
    ;
    f.genId = function() {
        return e.genId.apply(null , arguments)
    }
    ;
    f.define = function() {
        return e.define.apply(null , arguments)
    }
    ;
    f.runner = function() {
        return e.runner.apply(null , arguments)
    }
    ;
    f.setConfig = function() {
        return e.setConfig.apply(null , arguments)
    }
    ;
    f.setRunMod = function() {
        return e.setRunMod.apply(null , arguments)
    }
    ;
    f.exports = function() {
        return e.exports.apply(null , arguments)
    }
    ;
    f.http = d;
    f.string = c;
    f.date = j;
    f.object = g;
    f.cookie = k;
    f.url = b;
    f.browser = new BrowserUtil();
    f.localstorage = new LocalStorageUtil()
})(window);