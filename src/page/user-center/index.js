/*
 * @Author: chencong
 * @Date: 2018-04-24 22:04:31
 * @Last Modified by: chencong
 * @Last Modified time: 2018-05-03 10:36:45
 */
require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");
var navSide = require("page/common/nav-side/index.js");
var _mm = require("util/mm.js");
var _user = require("service/user-service.js");
var templateIndex = require("./index.string");

// page 逻辑部分
var page = {
    init: function() {
        this.onLoad();
    },
    // 绑定事件
    onLoad: function() {
        // 这是初始化左侧菜单
        navSide.init({
            name: "user-center"
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo: function() {
        var userHtml = "";
        _user.getUserInfo(
            function(res) {
                userHtml = _mm.renderHtml(templateIndex, res);
                $(".panel-body").html(userHtml);
            },
            function(errMsg) {
                // _mm.errorTips(errMsg);
                console.log(errMsg);
                $(".panel-body").html(
                    '<p class="err-tip">您还未登录，' + errMsg + "</p>"
                );
            }
        );
    }
};
// 页面加载时候处理业务
$(function() {
    page.init();
});
