 (function(t, e, n) {
        "use strict";
        var s = i(2)
          , o = function(t, e) {
            var i = this;
            this.options = n.extend({}, o.DEFAULTS, e),
            this.$element = n(t),
            this.sticked = null ,
            this.inited = null ,
            this.$holder = void 0,
            this.$window = n(window).on("scroll.sticky.amui", s.utils.debounce(n.proxy(this.checkPosition, this), 10)).on("resize.sticky.amui orientationchange.sticky.amui", s.utils.debounce(function() {
                i.reset(!0, function() {
                    i.checkPosition()
                })
            }, 50)).on("load.sticky.amui", n.proxy(this.checkPosition, this)),
            this.offset = this.$element.offset(),
            this.init()
        }
        ;
        o.DEFAULTS = {
            top: 0,
            bottom: 0,
            animation: "",
            className: {
                sticky: "am-sticky",
                resetting: "am-sticky-resetting",
                stickyBtm: "am-sticky-bottom",
                animationRev: "am-animation-reverse"
            }
        },
        o.prototype.init = function() {
            var t = this.check();
            if (!t)
                return !1;
            var e = this.$element
              , i = "";
            n.each(e.css(["marginTop", "marginRight", "marginBottom", "marginLeft"]), function(t, e) {
                return i += " " + e
            });
            var s = n('<div class="am-sticky-placeholder"></div>').css({
                height: "absolute" !== e.css("position") ? e.outerHeight() : "",
                "float": "none" != e.css("float") ? e.css("float") : "",
                margin: i
            });
            return this.$holder = e.css("margin", 0).wrap(s).parent(),
            this.inited = 1,
            !0
        }
        ,
        o.prototype.reset = function(t, e) {
            var i = this.options
              , n = this.$element
              , o = i.animation ? " am-animation-" + i.animation : ""
              , a = function() {
                n.css({
                    position: "",
                    top: "",
                    width: "",
                    left: "",
                    margin: 0
                }),
                n.removeClass([o, i.className.animationRev, i.className.sticky, i.className.resetting].join(" ")),
                this.animating = !1,
                this.sticked = !1,
                this.offset = n.offset(),
                e && e()
            }
            .bind(this);
            n.addClass(i.className.resetting),
            !t && i.animation && s.support.animation ? (this.animating = !0,
            n.removeClass(o).one(s.support.animation.end, function() {
                a()
            }).width(),
            n.addClass(o + " " + i.className.animationRev)) : a()
        }
        ,
        o.prototype.check = function() {
            if (!this.$element.is(":visible"))
                return !1;
            var t = this.options.media;
            if (t)
                switch (typeof t) {
                case "number":
                    if (window.innerWidth < t)
                        return !1;
                    break;
                case "string":
                    if (window.matchMedia && !window.matchMedia(t).matches)
                        return !1
                }
            return !0
        }
        ,
        o.prototype.checkPosition = function() {
            if (!this.inited) {
                var t = this.init();
                if (!t)
                    return
            }
            var e = this.options
              , i = this.$window.scrollTop()
              , n = e.top
              , s = e.bottom
              , o = this.$element
              , a = e.animation ? " am-animation-" + e.animation : ""
              , r = [e.className.sticky, a].join(" ");
            "function" == typeof s && (s = s(this.$element));
            var l = i > this.$holder.offset().top;
            !this.sticked && l ? o.addClass(r) : this.sticked && !l && this.reset(),
            this.$holder.css({
                height: o.is(":visible") && "absolute" !== o.css("position") ? o.outerHeight() : ""
            }),
            l && o.css({
                top: n,
                left: this.$holder.offset().left,
                width: this.$holder.width()
            }),
            this.sticked = l
        }
        ,
        s.plugin("sticky", o),
        n(window).on("load", function() {
            n("[data-am-sticky]").sticky()
        });
})()