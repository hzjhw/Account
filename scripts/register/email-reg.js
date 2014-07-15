/**
     * @description email-reg.js
     * @namespace email-reg.js
     * @author Administrator on 14-7-14
     */
    /*! umpp 2014-05-04 */
    KISSY.add("tbc/umpp/1.4.13/mods/messenger", function (a) {
        function b(a, b) {
            return t.push([a, b]) - 1
        }

    function c(a) {
        return t[a] = null
    }

    function d(b, c, d) {
        var e = {type: b, content: c}, f = d;
        if (a.isString(d) ? (f = m.get("#" + d), d = f.contentWindow) : d.contentWindow && (d = d.contentWindow), i())try {
            return d.KISSY.TBC.Messenger.fire(b, c)
        } catch (g) {
        }
        o ? j && (j.callSWF ? j.callSWF("send", [e, h(f)]) : j.send(e, h(f))) : d.postMessage(n.stringify(e), "*")
    }

    function e(b, c) {
        a.each(t, function (a) {
            a && a[0] === b && a[1](c)
        })
    }

    function f(b, c) {
        var d, e = (o ? "parentFlash=" + w + "&childFlash=_MessengerChildFlash_" + a.now() + "&" : "") + "domain=taobao.org";
        a.isString(b) ? (d = b, b = {}) : d = b.src, b.src = d + (d.indexOf("?") > -1 ? "&" : "?") + e;
        var f = m.create("<iframe>", b);
        return f.setAttribute("width", 1), f.setAttribute("height", 1), f.style.position = "absolute", m.get(c || "body").appendChild(f)
    }

    function g(a, b) {
        u ? f(a, b) : v.push([a, b])
    }

    function h(a) {
        var b = a.src, c = /childFlash=([^&]+)/;
        if (b) {
            var d = b.match(c);
            if (d && d[1])return d[1];
            throw"iframe has no flashName param"
        }
    }

    function i() {
        return!1
    }

    var j, k = window, l = a.namespace("TBC.Messenger"), m = a.DOM, n = (a.Event, a.UA, a.JSON), o = (document.domain, "undefined" == typeof postMessage || !k.addEventListener), p = -1 === location.host.indexOf("daily") && -1 === location.host.indexOf("net"), q = "http://" + (p ? "g.tbcdn.cn" : "g.assets.daily.taobao.net"), r = "1.4.13", s = parseFloat(r) ? q + "/tbc/umpp/" + r + "/flash-post-message.swf" : "flash-post-message.swf", t = [], u = !o, v = [], w = "_MessengerFlash_" + a.now();
    if (!i() || o)if (o) {
        var x = !(a.version <= 1.2 || a.version >= 1.4);
        a.use(x ? "swf" : "flash", function (a, b) {
            window._Messenger_Flash_PostMessage = function (a, b) {
                var c = b.type, d = b.msg;
                if ("swfReady" === c) {
                    u = !0;
                    for (var g; g = v.pop();)f.apply(null, g)
                } else"message" == c && d && e(d.type, d.content)
            };
            var c = {src: s, attrs: {width: 1, height: 1, style: "position:absolute;top:0"}, params: {flashVars: {jsentry: "_Messenger_Flash_PostMessage", swfid: "J_MessengerFlashPostMessage", name: w}, allowscriptaccess: "always"}};
            b && x ? j = new b(c) : a.Flash && a.Flash.add && a.Flash.add("#J_FlashPostMessageContainer", c, function (a) {
                j = a.swf
            })
        })
    } else k.addEventListener("message", function (b) {
        var c = b.data;
        if (c && a.isString(c))try {
            var d = n.parse(c);
            e(d.type, d.content)
        } catch (f) {
        }
    }, !1); else u = !0;
    return a.mix(l, {register: b, unregister: c, send: d, createIframe: g, fire: e, flashName: w})
}, {requires: ["core"]}), KISSY.add("tbc/umpp/1.4.13/mods/getNick", function (a) {
    var b = a.namespace("TBC.umpp");
    return b.getNick = function (b) {
        var c = a.Cookie.get("_nk_") || a.Cookie.get("lgc");
        return b ? encodeURIComponent(unescape(c.replace(/\\u/g, "%u"))) : c
    }
}, {requires: ["cookie"]}), KISSY.add("tbc/umpp/1.4.13/mods/trinity", function (a) {
    function b(a, b, c) {
        this.nick = a || "umpp-guest", this.swfurl = b, this.evs = c, this._init()
    }

    var c = a.DOM, d = (a.JSON, a.namespace("TBC.umpp")), e = "UM_", f = window, g = "J_UmppUserContainer", h = "_umpp_trinity_", i = b.prototype;
    return i._init = function () {
        var b = this, d = {src: b.swfurl, attrs: {width: 1, height: 1}, params: {flashVars: {jsentry: h, swfid: e + b.nick + a.now(), group: b.nick}, allowscriptaccess: "always"}};
        f[h] = function (a, c) {
            var d = c.type, e = c.data, f = b.evs, g = f[d];
            g && g.call(b, "message" === d ? e : null)
        };
        var i = !(a.version <= 1.2 || a.version >= 1.4);
        a.use(i ? "swf" : "flash", function (a, e) {
            i && e ? b.swf = new e(d) : a.Flash && a.Flash.add && (c.get("#" + g) || document.body.appendChild(c.create('<div id="' + g + '" style="height:1px;width:1px;overflow:hidden;position:absolute;bottom:1px"></div>')), a.Flash.add("#" + g, d, function (a) {
                b.swf = a.swf
            }))
        })
    }, i.fire = function (a, b) {
        return this.swf.callSWF ? this.swf.callSWF("fire", [a, b]) : (this.swf.fire(a, b), void 0)
    }, i.destroy = function () {
        var a = this;
        try {
            a.swf.destroy ? a.swf.destroy() : c.remove("#" + g), delete f[h]
        } catch (b) {
        }
    }, d.Trinity = b
}, {requires: ["dom", "json"]}), KISSY.add("tbc/umpp/1.4.13/mods/initGuest", function (a) {
    function b(b, f, g) {
        return e._guestTimer = setTimeout(function () {
            a.getScript(parseFloat(c) ? f + "/tbc/umpp/" + c + "/guest-min.js" : "guest.js", function () {
                parseFloat(a.version, 10) > 1.1 && a.use(parseFloat(c) ? "tbc/umpp/" + c + "/guest" : "tbc/umpp/guest")
            })
        }, d), a.mix(e, {isOnline: b, cdnPath: f, Trinity: g}), e
    }

    var c = "1.4.13", d = 18e4, e = a.namespace("TBC.umpp");
    return a.mix(e, {register: function () {
    }, send: function () {
    }, destroy: function () {
        this.trinity && (this.trinity.destroy(), delete this.trinity), this._guestTimer && (clearTimeout(this._guestTimer), this._guestTimer = null)
    }}), e.initGuest = b
}), KISSY.add("tbc/umpp/1.4.13/mods/initUser", function (a) {
    function b(a) {
        n.get("#" + p) || o.createIframe({src: a, id: p, frameborder: 0, scrolling: "no"})
    }

    function c(b) {
        a.isArray(b) && b.length && a.each(b, function (a) {
            "1063" == a.t1 && t.trinity.fire({content: [a], identity: [t.nick, a.t1, "1"].join("-")})
        })
    }

    function d() {
        o.register("umppready", function () {
            l = !0, f("master"), f("join")
        }), o.register("umppdata", function (a) {
            t.notify(a, !0), c(a)
        })
    }

    function e(b, c) {
        if (!c)return!1;
        var d = c.body, e = d.content;
        if (a.isObject(d))if ("-" === d.identity)a.each(e, function (b) {
            a.each(t._Events, function (a) {
                a && b.t1 == a[0] && a[1](b)
            })
        }); else if (q === d.type)if (j) {
            var g = e[0], h = e[1];
            "umpp-store-get" === g ? t.getItem(h, function (a) {
                b.fire.call(b, {type: q, content: [h, a]}, c.from)
            }) : "umpp-store-remove" === g ? t.removeItem.call(t, h) : "umpp-store-set" === g && t.setItem.apply(t, h)
        } else {
            var e = d.content;
            o.fire("umpp-store-get-" + e[0], e[1])
        } else if (r === d.type) {
            if (!d.includeSelf && c.from === c.to)return!1;
            f("message", d.content)
        }
    }

    function f(b, c) {
        a.each(t._SwfEvents, function (a) {
            a && b === a[0] && (a[1](c), "message" !== b && (a[0] = b + "_ed"))
        })
    }

    function g(a) {
        b("http://mpp." + (a ? "taobao.com" : "daily.taobao.net:8080") + "/ajaxconn2.html?appId=" + s), l && f("master")
    }

    function h(c, h, i, m) {
        t.trinity = new c(h, i, {master: function () {
            j = !0, d(), new a.IO({url: "http://allot.mpp." + (m ? "taobao.com" : "daily.taobao.net") + "/allot.do?appId=" + s, dataType: "jsonp", timeout: 3, success: function (a) {
                if (a && 0 == a.code) {
                    var c = a.token || "";
                    c && (c = "&token=" + c), b("http://" + a.host + "/ajaxconn2.html?appId=" + s + c), l && f("master")
                } else a && 1111 == a.status && g(m)
            }, error: function () {
                g(m)
            }})
        }, join: function () {
            k = !0, (j && l || !j) && f("join")
        }, message: function (a) {
            e(this, a)
        }})
    }

    function i(a, b, c, d) {
        var e = parseFloat(m) ? b + "/tbc/umpp/1.4.2/trinity.swf" : "trinity.swf";
        return t.nick = c, h(d, c, e, a), t
    }

    var j, k, l, m = "1.4.13", n = a.DOM, o = a.TBC.Messenger, p = "J_Um_Iframe", q = "_trinity_notify_private", r = "_trinity_notify_public", s = -1 === location.host.indexOf("meeting.wangwang") ? 1064 : 1065, t = a.namespace("TBC.umpp");
    return a.mix(t, {_Events: [], _SwfEvents: [], _StoreCache: {}, _storeData: function (a, b) {
        j && (this._StoreCache[a] = b)
    }, _removeData: function (a) {
        j && this._StoreCache[a] && delete this._StoreCache[a]
    }, on: function (a, b) {
        return(j && l || !j && k) && ("master" === a && j || "join" === a && k) ? (b(), !0) : this._SwfEvents.push([a, b]) - 1
    }, off: function (b) {
        return a.isNumber(b) ? this._SwfEvents[b] = null : void 0
    }, register: function (b, c, d) {
        var e = this, f = function (f, g) {
            c(f, g), d ? (a.log("store"), e._storeData(b, f)) : e.removeItem(b)
        };
        return e.getItem(b, function (a) {
            a && f(a, !0)
        }), e._Events.push([b, f]) - 1
    }, unregister: function (a) {
        return this._Events[a] = null
    }, send: function (a, b) {
        return j ? o.send.call(null, a, b, p) : (this.trinity && this.trinity.fire({type: q, content: [a, b]}, "_" + this.nick), void 0)
    }, notify: function (a, b) {
        return this.trinity.fire({type: r, content: a, includeSelf: b, identity: "-"})
    }, setItem: function (a, b) {
        var c = this;
        c.on("join", function () {
            c._storeData(a, b), c.send("umpp-store-set", [a, b])
        })
    }, getItem: function (a, b) {
        var c = this, d = this._StoreCache[a];
        j && d ? b(d) : c.on("join", function () {
            var d = o.register("umpp-store-get-" + a, function (e) {
                o.unregister(d), c._storeData(a, e), b(e)
            });
            c.send("umpp-store-get", a)
        })
    }, removeItem: function (a) {
        var b = this;
        b.on("join", function () {
            b._removeData(a), b.send("umpp-store-remove", a)
        })
    }, clear: function (a) {
        return this.send("clearTMsg", a)
    }, destroy: function () {
        this.trinity && (this.trinity.destroy(), delete this.trinity), n.remove("#" + p), j = void 0, k = void 0, l = void 0, this._StoreCache = {}
    }}), t.initUser = i
}, {requires: ["core"]}), KISSY.add("tbc/umpp/1.4.13/index", function (a) {
    function b() {
        var b, d = a.Cookie, e = -1 === location.host.indexOf("daily"), f = d.get("_l_g_") || d.get("lgc"), g = "http://g." + (e ? "tbcdn.cn" : "assets.daily.taobao.net"), h = c._Events, i = c._SwfEvents;
        return b = f ? c.initUser(e, g, c.getNick(!0), c.Trinity) : c.initGuest(e, g, c.Trinity), h && a.mix(b, {_Events: h}), i && a.mix(b, {_SwfEvents: i}), a.mix(c, b)
    }

    a.version >= 1.4 && a.config({modules: {ajax: {alias: ["io"]}, flash: {alias: ["gallery/flash/1.0/"]}}});
    var c = a.namespace("TBC.umpp");
    return c.init = b, b()
}, {requires: ["core", "tbc/umpp/1.4.13/mods/messenger", "tbc/umpp/1.4.13/mods/getNick", "tbc/umpp/1.4.13/mods/trinity", "tbc/umpp/1.4.13/mods/initGuest", "tbc/umpp/1.4.13/mods/initUser"]});