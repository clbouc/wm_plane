define('commonHelper', function () {

    /**
     * @description 数字转换成固定长度的字符串，前面补0
     * @param {any} num 数字
     * @param {any} len 长度
     */
    function Num2Str(num, len) {
        var str = num.toString();
        if (str.length == len) {
            return str;
        }
        else if (str.length < len) {
            for (var i = 0; i < (len - str.length); i++) {
                str = "0" + str;
            }
            return str;
        }
    }


    /**
     * @description 日期格式化函数
     * @param {Date} now 日期
     * @param {num} type 日期格式 0：yyyy-MM-dd HH:mm:ss;1:yyyyMMddHHmmss
     */
    function formatDate(now, type) {
        var year = now.getFullYear();
        var month = Num2Str(now.getMonth() + 1, 2);
        var date = Num2Str(now.getDate(), 2);
        var hour = Num2Str(now.getHours(), 2);
        var minute = Num2Str(now.getMinutes(), 2);
        var second = Num2Str(now.getSeconds(), 2);
        if (arguments.length == 1 || type == 0) {
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        }
        else if (type == 1) {
            return year + month + date + hour + minute + second;
        }
    }   

    /**
    * @constructor getDayCount
    * @description 获取某月天数
    * @param {Num} year 年
    * @param {Num} month 月
    */
    function getDayCount(year, month) {

        var cd = new Date(year, month, 0);//下个月的第一天
        var dayCount = cd.getDate();
        return dayCount;
    }

    /**
    * @description 获取年字符串
    * @param {number} startYear 起始年
    */
    function getYearStr(startYear) {
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var yearStr = '';
        for (var i = startYear; i <= curYear; i++) {
            yearStr = yearStr + i + ",";
        }
        if (yearStr.length > 0) {
            return yearStr.substring(0, yearStr.length - 1);
        }
        else {
            return '';
        }
    }

    /**
     * @description 获取地址栏中参数信息
     */
    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }


    /**
    * 获取地址栏参数，name:参数名称
    */
    function getUrlParms(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }


    /**
     * 通用函数汇总
     */
    var commonHelper = {
        Num2Str: Num2Str,
        formatDate: formatDate,
        getDayCount: getDayCount,
        getUrlVars: getUrlVars,
        getYearStr: getYearStr,
        getUrlParms: getUrlParms
    };

    return commonHelper; 

});