define('planeCob', ['jquery', 'commonHelper', 'appConfig'],function(){

    var defaultStr = "请选择";
    var CommonHelper = require('commonHelper');

    /**
     * @constructor BindYear
     * @description 绑定年 2000至今
     */
    function BindYear() {
        $("#cobYear").html("");
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var str = "<option>请选择</option>";
        for (var i = 2005; i <= curYear; i++) {
            str += "<option value=" + i + ">" + i + "</option>";
        }
        $("#cobYear").append(str);
    };

    /**
     * @constructor BindMonth
     * @description 绑定月 1-12
     */
    function BindMonth() {
        $("#cobMonth").html("");
        var str = "<option>请选择</option>";
        for (var i = 1; i <= 12; i++) {
            str += "<option value=" + i + ">" + i + "</option>";
        }
        $("#cobMonth").append(str);
    };

    /**
     * @description 绑定下拉菜单事件
     */
    function BindSelectChange() {
        $("#cobMonth").change(function () {
            var selMonth = $("#cobMonth").children('option:selected').val();
            var selYear = $("#cobYear").children('option:selected').val();

            if (selMonth != defaultStr && selYear != defaultStr) {

                console.log(selYear + "-" + selMonth);
                GetIdByYearAndMonth(selYear, selMonth);
            }
            else if (selYear != defaultStr && selMonth == defaultStr) {

            }
            else {
                $('#cobCode').html("<option>" + defaultStr + "</option>");
            }
        });
        $("#cobYear").change(function () {
            var selMonth = $("#cobMonth").children('option:selected').val();
            var selYear = $("#cobYear").children('option:selected').val();

            if (selMonth != defaultStr && selYear != defaultStr) {

                console.log(selYear + "-" + selMonth);
                GetIdByYearAndMonth(selYear, selMonth);
            }
            else {
                $('#cobCode').html("<option>" + defaultStr + "</option>");
            }
        }
        );
    };

    /**
     * @description 获取某年、某月的运12飞机作业ID,绑定到下拉菜单
     * @param {any} year  年
     * @param {any} month 月
     */
    function GetIdByYearAndMonth(year, month) {

        var curDayCount = CommonHelper.getDayCount(year, month);
        var startD = year.toString() + CommonHelper.Num2Str(month, 2) + CommonHelper.Num2Str(1, 2);
        var endD = year.toString() + CommonHelper.Num2Str(month, 2) + CommonHelper.Num2Str(curDayCount, 2);

        var options = {
            type: "POST",
            url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlaneCalendarDataByTime",
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            data: "{'startDateStr':'" + startD + "','endDateStr':'" + endD + "'}",
            success: function (response) {
                var rawData2 = jQuery.parseJSON(response);
                var dataArray = rawData2.d.split('.');

                var curYear = dataArray[0].split('|');
                var dataYear = curYear[1].split(';');

                var dataMonth = dataYear.map(function (item) {
                    var subArray = item.split(',');
                    if (subArray[2] > 0) {
                        return [subArray[1], 1, subArray[0], subArray[3], subArray[4]];
                    }
                    else {
                        return [subArray[1], 0, subArray[0], subArray[3], subArray[4]];
                    }
                });

                
                if ($('#cobCode') != null) {

                    $('#cobCode').html("");
                    var opstr = "<option>" + defaultStr + "</option>";
                    for (var i = 0; i < dataMonth.length - 1; i++) {
                        opstr += "<option value=" + dataMonth[i][2] + ">" + dataMonth[i][2] + "</option>";
                    }
                    $('#cobCode').html(opstr);
                }
            },
            error: function (err) {
                console.log(JSON.parse(err.responseText));
            }
        }
        $.ajax(options);
    };

    var cob = {
        Init: function () {
            BindYear();
            BindMonth();
            BindSelectChange();
        }
    }

    return cob;

});