require([
    'jquery',
    'appConfig',
    'bootstrap',
    'bootstrapCustomMsg',
    'toastr',
],
function () {
    "use strict";
    var toastr = require('toastr');
    toastr.options.positionClass = 'toast-bottom-right';

    var useridStr = "wm_userid";
    var usernameStr = "wm_username";
    var userroleStr = "wm_userole";

    function init() {
        if ($('#btn_load') != null) {
            $('#btn_load').click(function () {
                var user = $("input[name='username']").val();
                var pwd = $("input[name='password']").val();
                var option = {
                    type: "POST",
                    data: "{'userid':'" + user + "','pwd':'" + pwd + "'}",
                    contentType: "application/json; charset=utf-8",
                    //url: appConfig.dataServerUrl + "/UserManager/Login.ashx",
                    url: appConfig.dataServerUrl + "/UserManager/LogManager.asmx/LogIn",
                    dataType: "text",
                    success: function (response) {
                        var result = jQuery.parseJSON(response);

                        if (result.d != "") {
                            var infoArray =result.d.split(";");
                            for (var i = 0; i < infoArray.length; i++) {
                                var curInfo = infoArray[i].split('=');
                                if (curInfo[0] == 'UserID') {
                                    setCookie(useridStr, curInfo[1], 20);
                                    $("#log_userid").html('<a href="' + appConfig.webPageUrl + "/PlaneManager/UserInfoManager.html" + '"><i class="fa fa-user fa-fw"></i>' + curInfo[1] + '</a>');
                                }
                                else if (curInfo[0] == 'UserName') {
                                    setCookie(usernameStr, curInfo[1], 20);
                                }
                                else if (curInfo[0] == 'Role') {
                                    setCookie(userroleStr, curInfo[1], 20);
                                }
                            }

                            window.location.href = appConfig.webPageUrl + "/Pages/PlaneManager/PlaneManagerIndex.html";
                        }
                        else{
                            toastr.warning('用户名或密码错误!');
                        }
                    },
                    error: function (err) {
                        console.log(JSON.parse(err.responseText));
                    }
                }
                $.ajax(option);
            });
        }

        if ($('#log_out') != null) {
            $('#log_out').click(function () {
                Ewin.confirm({ message: "确认要退出系统？" }).on(function (e) {
                    if (!e) {
                        return;
                    }
                    else {
                        var option = {
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            //url: appConfig.dataServerUrl + "/UserManager/Logout.ashx",
                            url: appConfig.dataServerUrl + "/PlaneManager/LogManager.asmx/LogOut",
                            dataType: "text",
                            success: function (response) {
                                var result = jQuery.parseJSON(response);
                                if (result.d == 1) {
                                    exitLogin();
                                }
                            },
                            error: function (err) {
                                console.log(JSON.parse(err.responseText));
                            }
                        }
                        $.ajax(option);
                    }
                });
            });
        }

        //exitLogin();

        checkCookie(useridStr, usernameStr, userroleStr);
    }

    /**
      *  字段
      *  值
      *  保存时间（分）
      */
    function setCookie(name, value, timeout) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 1000 * 60 * timeout);
        document.cookie = name + '=' + value + ';expires=' + exp + ';path=/';
    }


    function getCookie(name) {
        var arr = document.cookie.split('; ');
        //for (var i = 0; i < arr.length; i++) {
        //    var arr2 = arr[i].split('='); //['abc','cba']  
        //    if (arr2[0] == name) {
        //        console.log(arr2[1]);
        //        return arr2[1];
        //    }
        //}
        //return '';

        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    }


    function delCookie(name) {//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
        var date = new Date();
        date.setTime(date.getTime() - 10000 * 60 * 5);
        document.cookie = name + "=''; expires=" + date.toGMTString()+";path=/";
    }

    /* 退出登录刷新页面,删除cookie状态 */
    function exitLogin() {

        setCookie(useridStr, "", -10);
        setCookie(usernameStr, "", -10);
        setCookie(userroleStr, "", -10);

        //delCookie(usernameStr);
        //delCookie(userroleStr);
        //delCookie(useridStr);

        if (window.location.href != appConfig.webPageUrl + "/Login.html") {
            window.location.href = appConfig.webPageUrl + "/Login.html";
        }

        //console.log(getCookie(usernameStr));
        //console.log(getCookie(userroleStr));
        //console.log(getCookie(useridStr));
    }


    function checkCookie(usrid, role, name) {

        console.log(getCookie(usrid));
        console.log(getCookie(role));
        console.log(getCookie(name));

        if (getCookie(usrid)==null || getCookie(usrid) == "") {
            if (window.location.href != appConfig.webPageUrl + "/Login.html") {
                window.location.href = appConfig.webPageUrl + "/Login.html";
            }
        }
        else if (getCookie(role)==null|| getCookie(role) == "") {
            if (window.location.href != appConfig.webPageUrl + "/Login.html") {
                window.location.href = appConfig.webPageUrl + "/Login.html";
            }
        }
        else if (getCookie(name) == null || getCookie(name) == "") {
            if (window.location.href != appConfig.webPageUrl + "/Login.html") {
                window.location.href = appConfig.webPageUrl + "/Login.html";
            }
        }
        else {
            $("#log_userid").html('<a href="' + appConfig.webPageUrl + "/Pages/PlaneManager/UserInfoManager.html" + '"><i class="fa fa-user fa-fw"></i>' + getCookie(usrid) + '</a>');
        }
    }
    init();


});