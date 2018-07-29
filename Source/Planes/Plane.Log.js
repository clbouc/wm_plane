/**
*  日志查询
*  
*/
define('planeLog', ['jquery', 'appConfig', 'bootstrap','bootstrapTable', 'echarts', 'commonHelper'], function () {

    "use strict";

    var module = null;

    var echarts = require('echarts');

    var calendarYearChart = null;
    var planeTable = null; 

    var curSelectDay = '';
    var optionYearCalendar = {
        tooltip: {
            position: 'top',
            formatter: function (obj) {
                var value = obj.value;

                curSelectDay = value[0];

                var dateS = echarts.format.formatTime('yyyy-MM-dd', value[0]);
                var destS;
                if (value[1] == 1) {
                    destS = '增雨';
                }
                else if (value[1] == 2) {
                    destS = '大气气溶胶探测';
                }
                else if (value[1] == 3) {
                    destS = '增雨+大气气溶胶探测';
                }
                return dateS + ': ' + destS;
                //'<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                //    + obj.seriesName + ' ' + value[0] + '日：'
                //    + value[7]
                //    + '</div>'
                //    + schema[1].text + '：' + value[1] + '<br>';
                //+ schema[2].text + '：' + value[2] + '<br>'
                //+ schema[3].text + '：' + value[3] + '<br>'
                //+ schema[4].text + '：' + value[4] + '<br>'
                //+ schema[5].text + '：' + value[5] + '<br>'
                //+ schema[6].text + '：' + value[6] + '<br>';

            }
        },

        visualMap: {
            min: 0,
            max: 3,
            calculable: false,//拖拽手柄
            orient: 'horizontal',
            left: 'center',
            top: 'top',
            //type: "piecewise",
            splitNumber: 3,
            //text: ['High', 'Low', 'ss'],
            formatter: function (value, value2) {

                if (value2 == 1) {
                    return '增雨';
                }
                else if (value2 == 2) {
                    return '大气气溶胶探测';
                }
                else if (value2 == 3) {
                    return '增雨+大气气溶胶探测';
                }
                //return 'aaaa' + value + 'bbbb' + value2; // 范围标签显示内容。
            },
            //categories: ['增雨', '大气气溶胶探测', '增雨+大气气溶胶探测'],
            inRange: {
                color: ['#00FF00', 'rgba(0,0,255,0.9)', 'red']//,
                //symbolSize: [10, 10],
                //symbol: {
                //    '增雨': 'rect',
                //    '大气气溶胶探测': 'circle',
                //    '':'diamond'
                //}
            }
            //outOfRange: {
            //    color: '#000',
            //    symnbolSize: {
            //        ''
            //    }
            //}
        },
        calendar: {},
        series: {}
    }

    var itemStyle = {
        normal: {
            opacity: 0.8,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
    };

    window.onresize = function () {
        if (calendarYearChart) {
            calendarYearChart.resize();
        }
    }

    var logTable = function () {
        "use strict";

        planeTable= document.getElementById('tab_PlaneLog');
        var logTable = new Object();

        //初始化Table
        logTable.Init = function () {
            if (planeTable) {
                $('#tab_PlaneLog').bootstrapTable({

                    toolbar: '#toolbar',                //工具按钮用哪个容器
                    striped: true,                      //是否显示行间隔色
                    cache: true,                        //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true,                   //是否显示分页（*）
                    sortable: true,                     //是否启用排序
                    sortOrder: "asc",                   //排序方式
                    sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                    pageNumber: 1,                      //初始化加载第一页，默认第一页
                    pageSize: 10,                       //每页的记录行数（*）
                    pageList: [5, 10, 25, 50, 100],     //可供选择的每页的行数（*）
                    search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                    strictSearch: true,
                    showColumns: true,                  //是否显示所有的列
                    showRefresh: true,                  //是否显示刷新按钮
                    minimumCountColumns: 2,             //最少允许的列数
                    clickToSelect: true,                //是否启用点击选中行
                    height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                    uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
                    showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
                    cardView: false,                    //是否显示详细视图
                    detailView: false,                  //是否显示父子表

                    columns: [{
                        //    checkbox: true
                        //},{
                        field: 'ID',
                        title: '编号',
                        sortable: true,
                        visible: true
                    }, {
                        field: 'TimeQifei',
                        title: '起飞时间',
                        sortable: true
                    }, {
                        field: 'TimeJiangluo',
                        title: '降落时间',
                        sortable: true
                    }, {
                        field: 'Purpose',
                        title: '作业目的',
                        sortable: true
                    }, {
                        field: 'Plane',
                        title: '飞机型号',
                        sortable: true
                    }, {
                        field: 'Doc',
                        title: 'Word',
                        sortable: true
                    }, {
                        field: 'Pdf',
                        title: 'PDF',
                        sortable: true
                    }],
                    sortName: 'CreateTime',
                    sortOrder: 'desc'
                });

                $('#btn_query').click(function () {
                    var begintime_ = $('#txtStartTime').val();
                    var endtime_ = $('#txtEndTime').val();
                    var err = '';

                    if (begintime_ == '' || endtime_ == '') {
                        err = '查询时间不能为空';
                    } else if (Date.parse(endtime_) - Date.parse(begintime_) < 0) {
                        err = '查询时间设置错误';
                    }

                    if (err != '') {
                        //bootbox.alert("查询时间设置错误！")
                    }
                    else {
                        getFileByTypeAndTime(begintime_, endtime_)
                    }
                });
            }
        };

        //得到查询的参数
        logTable.queryParams = function (params) {
            var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                limit: params.limit,   //页面大小
                offset: params.offset,  //页码
                departmentname: $("#txt_search_departmentname").val(),
                statu: $("#txt_search_statu").val()
            };
            return temp;
        };
        return logTable;
    }

    function getFileByTypeAndTime(startTime, endTime) {
        var options = {
            type: "POST",
            usl: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetMainInfo",
            //url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlaneLogByTime",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: "{'startTime':'" + startTime + "','endTime':'" + endTime + "'}",//,'type':'"+ type+"'
            success: function (response) {
                var fileArray = eval(response.d);
                //var aa= response.d;
                //imgFileArray = jQuery.parseJSON(response.d);

                for (var i = 0; i < fileArray.length; i++) {
                    var fileurl = appConfig.dataServerUrl + "/WebPlaneDataF/" + fileArray[i].PlaneWorkInfoID.substring(0, 4) + "/" + fileArray[i].PlaneWorkInfoID + "/Log/";
                    fileArray[i].Doc = '<a href="' + fileurl + fileArray[i].FileName + '">' + fileArray[i].FileName + '</a>';
                    fileArray[i].Pdf = '<a href="' + appConfig.webUrl + "?file=" + fileurl + fileArray[i].FileName.replace(".doc", ".pdf") + '"  target="_blank">预览</a>';
                }

                $('#tab_PlaneLog').bootstrapTable('load', fileArray);
            },
            error: function (err) {

                var data = JSON.parse(err.responseText);
                if (data.d) {
                    promise.reject(data.d);
                }
                else if (data.Message) {
                    promise.reject(data.Message);
                }
            }
        }
        $.ajax(options);
    }

    /**
     * 获取年字符串
     * @param {number} startYear 起始年
     */
    function getYearStr(startYear) {
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var yearStr = '';
        for (var i = startYear; i <= curYear; i++) {
            yearStr = yearStr + i + ",";
        }
        return yearStr.substring(0, yearStr.length - 1);
    }

    /**
     * 填充日历图数据
     * @param {number} startYear 起始年
     */
    function GetCalenderYearInfo(startYear) {
        if (calendarYearChart) {
            var yearStr = getYearStr(startYear)
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlaneLogInfoByYear",
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                data: "{'year':'" + yearStr + "'}",
                success: function (response) {
                    var rawData2 = jQuery.parseJSON(response);
                    var dataArray = rawData2.d.split('.');
                    var yearSeries = [];

                    //optionYearCalendar.calendar = function () {
                    //    var calend = [];
                    //    for (var i = 0; i < dataArray.length; i++) {
                    //        var curYear = dataArray[i].split(':');
                    //        var item = {
                    //            top: 70 + 190 * i,
                    //            range: curYear[0],
                    //            cellSize: ['auto', 20],
                    //            right: 5,
                    //            monthLabel: { nameMap: 'cn' },
                    //            dayLabel: { firstDat: 1, nameMap: 'cn' }
                    //        }
                    //        calend.push(item);
                    //    };
                    //    return calend;
                    //}();

                    optionYearCalendar.series = function () {
                        var seri = [];
                        for (var i = 0; i < dataArray.length; i++) {
                            var curYear = dataArray[i].split(':');

                            var dataYear = curYear[1].split(';');
                            var item = {
                                type: 'heatmap',
                                calendarIndex: i,
                                coordinateSystem: 'calendar',
                                //itemStyle: itemStyle,
                                data: dataYear.map(function (item) {
                                    var subArray = item.split(',');

                                    if (subArray[1] == '增雨') {
                                        return [subArray[0], 1];
                                    }
                                    else if (subArray[1] == '大气气溶胶探测') {
                                        return [subArray[0], 2];
                                    }
                                    else {
                                        return [subArray[0], 3];
                                    }
                                })
                            }
                            seri.push(item);
                        }
                        return seri;
                    }();

                    calendarYearChart.setOption(optionYearCalendar);

                },
                error: function (err) {
                    var data = JSON.parse(err.responseText);
                }
            }
            $.ajax(options);
        }
    }

    /**
     * 初始化空日历图
     * @param {number} startYear 起始年
     */
    function InitNullCalendar(startYear) {
        //$('#calendarContainer').attr('height', ht+'px');
        //$('#calendarContainer').html('<div id="calenderYearDiv" style="height:"' + ht + 'px"></div>');

        var calendarYear = document.getElementById('calenderYearDiv');

        if (calendarYear){
            calendarYearChart = echarts.init(document.getElementById('calenderYearDiv'));

            var curDate = new Date();
            var curYear = curDate.getFullYear();
            var yearCount = curYear - startYear + 1;
            var ht = 70 + 190 * yearCount;
            //$('#calendarContainer').height = 70 + 190 * yearCount + 'px';
            calendarYearChart.on('click', function (params) {
                if (curSelectDay != "") {
                    //打开新页面?date=curSelectDay
                }
            });

            optionYearCalendar.calendar = function () {
                var calend = [];
                for (var i = 0; i < yearCount; i++) {

                    var item = {
                        top: 70 + 190 * i,
                        range: startYear + i,
                        cellSize: ['auto', 20],
                        right: 5,
                        monthLabel: { nameMap: 'cn' },
                        dayLabel: { firstDat: 1, nameMap: 'cn' }
                    }
                    calend.push(item);
                };
                return calend;
            }();

            optionYearCalendar.series = function () {
                var seri = [];
                for (var i = 0; i < yearCount; i++) {
                    var item = {
                        type: 'heatmap',
                        calendarIndex: i,
                        coordinateSystem: 'calendar',
                        data: []
                    }
                    seri.push(item);
                }
                return seri;
            }();

            calendarYearChart.setOption(optionYearCalendar);

        }
    }

    /**
     * 初始化查询表格
     */
    function InitNullTable() {
        var logTab = new logTable();
        logTab.Init();
    }

    /**
     *  获取最近宏观记录
     * @param {Number} count 个数
     */
    function GetLastLog(count) {
        if (document.getElementById('logContainer') != null) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlaneLogByCount",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'count':" + count + "}",
                success: function (response) {
                    var logObj = jQuery.parseJSON(response.d);

                    var logItem = '';
                    for (var i = 0; i < logObj.length; i++) {
                        var fileurl = appConfig.dataServerUrl + "/WebPlaneData/" + logObj[i].PlaneWorkInfoID.substring(0, 4) + "/" + logObj[i].PlaneWorkInfoID + "/Log/";
                        logItem += '<a href="' + appConfig.webUrl + "?file=" + fileurl + logObj[i].FileName.replace(".docx", ".pdf").replace(".doc", ".pdf") + '"  target="_blank" class="list-group-item"><span class="badge">预览</span>' + logObj[i].FileName + '</a>';

                        //<a href="' + fileurl +  logObj[i].FileName + '">下载</a>
                        //logObj[i].Doc = '<a href="' + fileurl + logObj[i].FileName + '">' + logObj[i].FileName + '</a>';
                        //logObj[i].Pdf = '<a href="' + appConfig.webUrl + "?file=" + fileurl + logObj[i].FileName.replace(".docx",".pdf").replace(".doc", ".pdf") + '"  target="_blank">预览</a>';
                    }

                    $('#logContainer').html(logItem);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }
    }

    /**
     * 获取宏观记录信息
     * @param {string} dateStr
     */
    function GetLogInfoByID(workID) {
        var options = {
            type: "POST",
            url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlaneLogByID",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: "{'workID':'" + workID + "'}",
            success: function (response) {

                var result = jQuery.parseJSON(response.d);
                if (result.length > 0) {
                    var curPlaneLog = result[0];

                    var fileurl = appConfig.dataServerUrl + "/WebPlaneData/" + curPlaneLog.PlaneWorkInfoID.substring(0, 4) + "/" + curPlaneLog.PlaneWorkInfoID + "/Log/";
                    curPlaneLog.Doc = fileurl + curPlaneLog.FileName;//'<a href="' + fileurl + curPlaneLog.FileName + '">' + curPlaneLog.FileName + '</a>';
                    curPlaneLog.Pdf = appConfig.webUrl + "?file=" + fileurl + curPlaneLog.FileName.replace(".doc", ".pdf");// '<a href="' + appConfig.webUrl + "?file=" + fileurl + curPlaneLog.FileName.replace(".doc", ".pdf") + '"  target="_blank">预览</a>';

                    $("#tab_log").html("");
                    var logHtml = "";
                    logHtml +=
                        '<tr><th>实施单位：</th>'
                        + '<td>' + curPlaneLog.Unit + '</td>'
                        + '<th>登机人员：</th>'
                        + '<td>' + curPlaneLog.PBoardStaff + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<th>飞机型号：</th>'
                        + '<td>' + curPlaneLog.Plane + '</td>'
                        + '<th>飞行目的：</th>'
                        + '<td>' + curPlaneLog.Purpose + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<th>作业编号：</th>'
                        + '<td>' + curPlaneLog.PlaneWorkInfoID + '</td>'
                        + '<th>飞行方案：</th>'
                        + '<td>' + curPlaneLog.FlyPlan + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<th>滑行时间：</th>'
                        + '<td>' + curPlaneLog.TimeHuaxing + '</td>'
                        + '<th>起飞时间：</th>'
                        + '<td>' + curPlaneLog.TimeQifei + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<th>降落时间：</th>'
                        + '<td>' + curPlaneLog.TimeJiangluo + '</td>'
                        + '<th>到位时间：</th>'
                        + '<td>' + curPlaneLog.TimeDaowei + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<th>起降机场：</th>'
                        + '<td>' + curPlaneLog.Airport + '</td>'
                        + '<th>备降机场：</th>'
                        + '<td>' + curPlaneLog.AirportB + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<th colspan="4" style="text-align:center;">登机作业技术人员</th>'
                        + '</tr>'
                        + '<tr>'
                        + '<th>指挥：</th>'
                        + '<td>' + curPlaneLog.PZhihui + '</td>'
                        + '<th>宏观记录：</th>'
                        + '<td>' + curPlaneLog.PHongguan + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<th>通讯记录：</th>'
                        + '<td>' + curPlaneLog.PTongxunLianluo + '</td>'
                        + '<th>仪器操作：</th>'
                        + '<td>' + curPlaneLog.PYiqi + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<th colspan="4" style="text-align:center;">机组人员</th>'
                        + '</tr>'
                        + '<tr>'
                        + '<th>机长：</th>'
                        + '<td>' + curPlaneLog.PCaptain + '</td>'
                        + '<th>副驾驶：</th>'
                        + '<td>' + curPlaneLog.PCopilot + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<th>机械师：</th>'
                        + '<td>' + curPlaneLog.PMachinist + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<th>原始文件：</th>'
                        + '<td>' + curPlaneLog.FileName + '</td>'
                        + '<td><a href="' + curPlaneLog.Doc + '" target="_blank">下载</a></td>'
                        + '<td><a href="' + curPlaneLog.Pdf + '" target="_blank">预览</a></td>'
                        + '</tr>';

                    $("#tab_log").html(logHtml);
                }
            },
            error: function (err) {
                var data = JSON.parse(err.responseText);
            }
        }
        $.ajax(options);
    }


    module = {
        /**
        * 初始化空日历图
        *
        */
        InitNullCalendar: InitNullCalendar,

        /**
        * 日历图填充数据
        *
        */
        RefreshCalenderYear: GetCalenderYearInfo,

        /**
        * 初始化表格
        *
        */
        InitNullTable: InitNullTable,

        /**
        * 获取最新宏观记录
        */
        GetLastLog: GetLastLog,

        /**
        * 按作业编号获取作业信息
        */
        GetLogInfoByID: GetLogInfoByID
    }

    return module;
});