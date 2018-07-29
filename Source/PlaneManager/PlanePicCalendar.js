require(
    [
    'jquery',
    'echarts',
    'bootstrap',
    'commonHelper',
    'planeDataMain'
    ],
    function () {

        var echarts = require('echarts');
        var commonHelper = require("commonHelper");
        var planeDataMain = require("planeDataMain");

        var optionYearCalendar = {
            title: {
                top: 30,
                text: '历史照片记录',
                subtext: '日期排序',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                position: 'top',

                formatter: function (obj) {
                    var value = obj.value;
                    curSelectDay = value[0];
                    var dateS = echarts.format.formatTime('yyyy-MM-dd', value[0]);
                    return dateS + ': ' + value[1];

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
            //,
            //backgroundColor: '#404a59',

            visualMap: {
                min: 0,
                max: 1000,
                calculable: true,//拖拽手柄
                orient: 'horizontal',
                color: ['orangered', 'yellow', 'lightskyblue'],
                left: 'center',
                top: 'top',
                type: "continuous",
                formatter: function (value, value2) {
                    return value2;

                }
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
                shadowColor: 'rgba(0, 0, 0, 0.8)'
            }
        };

        var calendarYearChart;

        /**
         * 按年获取照片信息
         * @param {number} startYear 起始年
         * @constructor
         */
        function GetPicCalenderYearInfoFromYear(startYear) {

            //var startYear = 2005;
            var curDate = new Date();
            var yearStr = "";
            var yearCount = curDate.getFullYear() - startYear + 1;
            for (var i = 0; i < yearCount; i++) {
                yearStr += (startYear + i).toString() + ",";
            }
            if (yearStr.length > 0) {
                yearStr = yearStr.substr(0, yearStr.length - 1);
            }

            planeDataMain.GetPicByYears(yearStr, fillyearCalnedar);

            //var options = {
            //    type: "POST",
            //    url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlanePicByYear",
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "text",
            //    //data:"{'year':'2008'}",
            //    data: "{'yearstr':'" + yearStr + "'}",
            //    success: function (response) {
            //        var rawData2 = jQuery.parseJSON(response);

            //        var dataArray = rawData2.d.split('.');
            //        var yearSeries = [];

            //        optionYearCalendar.calendar = function () {
            //            var calend = [];
            //            for (var i = 0; i < dataArray.length; i++) {
            //                var curYear = dataArray[i].split(':');
            //                var item = {
            //                    top: 70 + 190 * i,
            //                    range: curYear[0],
            //                    cellSize: ['auto', 20],
            //                    right: 5,
            //                    monthLabel: { nameMap: 'cn' },
            //                    dayLabel: { firstDat: 1, nameMap: 'cn' }
            //                }
            //                calend.push(item);
            //            };
            //            return calend;
            //        }();

            //        optionYearCalendar.series = function () {
            //            var seri = [];
            //            for (var i = 0; i < dataArray.length; i++) {
            //                var curYear = dataArray[i].split(':');

            //                var dataYear = curYear[1].split(';');
            //                var item = {
            //                    type: 'heatmap',
            //                    calendarIndex: i,
            //                    coordinateSystem: 'calendar',
            //                    //itemStyle: itemStyle,
            //                    data: dataYear.map(function (item) {
            //                        var subArray = item.split(',');
            //                        return [subArray[0], subArray[1]];
            //                    }),
            //                    symbolSize: function (val) {
            //                        return val[1] / 10;
            //                    },
            //                    itemStyle: {
            //                        normal: { color: '#ddb926' }
            //                    }
            //                }
            //                seri.push(item);
            //            }
            //            return seri;
            //        }();

            //        calendarYearChart.setOption(optionYearCalendar);

            //    },
            //    error: function (err) {
            //        var data = JSON.parse(err.responseText);
            //    }
            //}
            //$.ajax(options);
        }

        /**
         * 按起始年初始化日历图
         * @param {number} startYear
         */
        function InitNullCalendar(startYear) {

            var chratDiv = document.getElementById('picCalendarYearDiv');
            if (chratDiv) {

                calendarYearChart = echarts.init(document.getElementById('picCalendarYearDiv'));
                var curDate = new Date();
                var yearCount = curDate.getFullYear() - startYear + 1;

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
                            //itemStyle: itemStyle,
                            data: [],
                            symbolSize: function (val) {
                                return val[1] / 10;
                            },
                            itemStyle: {
                                normal: { color: '#ddb926' }
                            }
                        }
                        seri.push(item);
                    }
                    return seri;
                }();

                calendarYearChart.setOption(optionYearCalendar);

                calendarYearChart.on('click', function (params) {

                    var curDay = params.value;

                    if (curDay[2]) {
                        window.open(appConfig.webPageUrl + "/Pages/Plane/PlanePicInfo.html?dateStr=" + curDay[2]); 
                    }

                });
            }
        }



        /**
         * 填充照片日历图
         * @param {obj} resObj
         */
        function fillyearCalnedar(resObj) {

            var dataArray = resObj.split('.');
            var yearSeries = [];

            optionYearCalendar.calendar = function () {
                var calend = [];
                for (var i = 0; i < dataArray.length; i++) {
                    var curYear = dataArray[i].split(':');
                    var item = {
                        top: 70 + 190 * i,
                        range: curYear[0],
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
                            return [subArray[0], subArray[1], subArray[2]];
                        }),
                        symbolSize: function (val) {
                            return val[1] / 10;
                        },
                        itemStyle: {
                            normal: { color: '#ddb926' }
                        }
                    }
                    seri.push(item);
                }
                return seri;
            }();

            calendarYearChart.setOption(optionYearCalendar);

        }

       


        InitNullCalendar(2005);
        GetPicCalenderYearInfoFromYear(2005);



    }
);