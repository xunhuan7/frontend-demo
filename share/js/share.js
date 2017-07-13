/**
 * Created by dengqiyao on 2017/7/7.
 */
;(function (window, document, $) {

    var Share = function (option) {
        var self = this,
            ua = window.navigator.userAgent.toLowerCase();
        self.cb_function = option.callback || function (res) {
                return;
            };
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            self.wechat_config = {
                title: option.title || "",
                desc: option.desc || "",
                link: option.link || window.location.href,
                imgUrl: option.imgUrl || "",
                type: option.type || "link",
                dataUrl: option.dataUrl || "",
            };
            self.bindWechat();
        } else if (ua.match(/iting/i) == "iting") {
            self.app_channels = ["qq", "qzone", "tSina", "weixin", "weixinGroup", "message"];
            self.channel = option.channel || ["qq", "qzone", "tSina", "weixin", "weixinGroup", "message"];
            self.app_config = {
                channel: "",
                title: option.title || "",
                desc: option.desc || "",
                link: option.link || "",
                imgUrl: option.imgUrl || "",
                type: option.type || "link",
                dataUrl: option.dataUrl || ""
            };
            self.bindAPP();
        } else {
            return;
        }
    };

    Share.prototype = {
        bindWechat: function () {
            var self = this;
            $.get("/x-thirdparty-web/weixinJssdk/config", {
                    signatureUrl: window.location.href,
                    thirdpartyId: 14,
                    _: new Date().getTime()
                },
                function (res) {
                    var data = JSON.parse(res);
                    wx.config({
                        debug: false,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: [
                            "checkJsApi",
                            "onMenuShareAppMessage",
                            "onMenuShareTimeline",
                            "onMenuShareQQ",
                            "onMenuShareQZone",
                            "onMenuShareWeibo",
                            "hideMenuItems",
                            "showMenuItems",
                            "hideAllNonBaseMenuItem",
                            "showAllNonBaseMenuItem"
                        ]
                    });
                    wx.ready(function () {
                        if (!self.wechat_config.dataUrl) {
                            wx.onMenuShareAppMessage({
                                title: self.wechat_config.title,
                                desc: self.wechat_config.desc,
                                link: self.wechat_config.link,
                                imgUrl: self.wechat_config.imgUrl,
                                type: self.wechat_config.type,
                                success: function (res) {
                                    self.cb_function(res);
                                }
                            });
                        } else {
                            wx.onMenuShareAppMessage({
                                title: self.wechat_config.title,
                                desc: self.wechat_config.desc,
                                link: self.wechat_config.link,
                                imgUrl: self.wechat_config.imgUrl,
                                type: self.wechat_config.type,
                                dataUrl: self.wechat_config.dataUrl,
                                success: function (res) {
                                    self.cb_function(res);
                                }
                            });
                        }
                        wx.onMenuShareTimeline({
                            title: self.wechat_config.title,
                            link: self.wechat_config.link,
                            imgUrl: self.wechat_config.imgUrl,
                            success: function (res) {
                                self.cb_function(res);
                            }
                        });
                        wx.onMenuShareQQ({
                            title: self.wechat_config.title,
                            desc: self.wechat_config.desc,
                            link: self.wechat_config.link,
                            imgUrl: self.wechat_config.imgUrl,
                            success: function (res) {
                                self.cb_function(res);
                            }
                        });
                        wx.onMenuShareQZone({
                            title: self.wechat_config.title,
                            desc: self.wechat_config.desc,
                            link: self.wechat_config.link,
                            imgUrl: self.wechat_config.imgUrl,
                            success: function (res) {
                                self.cb_function(res);
                            }
                        });
                        wx.onMenuShareWeibo({
                            title: self.wechat_config.title,
                            desc: self.wechat_config.desc,
                            link: self.wechat_config.link,
                            imgUrl: self.wechat_config.imgUrl,
                            success: function (res) {
                                self.cb_function(res);
                            }
                        });
                    });
                });
        },
        bindAPP: function () {
            this.setShare();
            this.adaptShare();
            this.bindClick();
            this.bindDrag();
        },
        setShare: function () {
            var self = this;
            $("body").append('<img class="share_button" src="http://s1.xmcdn.com/lib/common/last/share/img/share.png"></img>' +
                '<div class="share_mask"><div class="share_panel">' +
                '<div id="weixin"><img src="http://s1.xmcdn.com/lib/common/last/share/img/weixin.png"><p>微信</p></div>' +
                '<div id="weixinGroup"><img src="http://s1.xmcdn.com/lib/common/last/share/img/weixin_circle.png"><p>朋友圈</p></div>' +
                '<div id="qq"><img src="http://s1.xmcdn.com/lib/common/last/share/img/qq_friend.png"><p>QQ好友</p></div>' +
                '<div id="qzone"><img src="http://s1.xmcdn.com/lib/common/last/share/img/qq_zone.png"><p>QQ空间</p></div>' +
                '<div id="tSina"><img src="http://s1.xmcdn.com/lib/common/last/share/img/weibo.png"><p>微博</p></div>' +
                '<div id="message"><img src="http://s1.xmcdn.com/lib/common/last/share/img/message.png"><p>消息</p></div>' +
                '</div>' +
                '</div>');
        },
        bindClick: function () {
            var self = this;
            $(".share_mask").on("click", function (e) {
                if (e.target == this) {
                    $(this).hide(function () {
                        $(".share_button").show();
                    });
                }
            });
            $("#weixin,#weixinGroup,#qq,#qzone,#tSina，#message").on("click", function () {
                var channel = $(this).attr("id");
                self.app_config.channel = channel;
                if (!self.app_config.dataUrl) {
                    delete self.app_config.dataUrl;
                }
                ya.multiShare(self.app_config, function (res) {
                    self.cb_function(res);
                });
            });
        },
        adaptShare: function () {
            var result = this.arrayDiff(this.channel, this.app_channels);
            if (result[0]) {
                for (var i = 0; i < result.length; i++) {
                    var id = result[i];
                    $("#" + id).remove();
                }
            }
        },
        bindDrag: function () {
            $(".share_button").on("touchstart", function (event) {
                var start_a = event.originalEvent.touches[0].clientX,
                    start_b = event.originalEvent.touches[0].clientY,
                    start_left = $(".share_button").css("left"),
                    start_top = $(".share_button").css("top");
                $(".share_button").on("touchmove", function (e) {
                    var move_x = e.originalEvent.touches[0].clientX,
                        move_y = e.originalEvent.touches[0].clientY;
                    $(this).css({
                        "left": move_x + "px",
                        "top": move_y + "px"
                    });
                    return false;
                });
                $(".share_button").on("touchend", function (e) {
                    var screen_width = $(window).width(),
                        screen_height = $(window).height(),
                        end_x = e.originalEvent.changedTouches[0].clientX,
                        end_y,
                        temp_y = e.originalEvent.changedTouches[0].clientY;
                    var distance = Math.sqrt((start_a - end_x) * (start_a - end_x) + (start_b - temp_y) * (start_b - temp_y));
                    if (distance < 10) {
                        $(this).hide();
                        $(".share_panel").css("top", $(this).css("top"));
                        $(".share_mask").fadeIn();
                        if (start_left === "0px") {
                            $(".share_button").css({"left": "0px", "top": start_top});
                        } else {
                            $(".share_button").css({"right": "0px", "top": start_top});
                        }
                    } else {
                        if (temp_y < 30) {
                            end_y = 30;
                        } else if (temp_y < screen_height - 220) {
                            end_y = temp_y;
                        } else {
                            end_y = screen_height - 220;
                        }
                        if (screen_width > 2 * end_x) {
                            $(this).css({
                                "left": "0px",
                                "top": end_y + "px"
                            });
                        } else {
                            $(this).css({
                                "left": "",
                                "right": "0px",
                                "top": end_y + "px"
                            });
                        }
                    }
                });
            });
        },
        arrayDiff: function (small, big) {
            var result = [];
            for (var i = 0; i < big.length; i++) {
                var flag = true;
                for (var j = 0; j < small.length; j++) {
                    if (big[i] == small[j])
                        flag = false;
                }
                if (flag) {
                    result.push(big[i]);
                }
            }
            return result;
        }
    };

    window.Share = Share;

}(window, document, jQuery));

