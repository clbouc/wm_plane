define('planeDT', ['jquery', 'echarts', 'bootstrap', 'commonHelper', 'appConfig','bootstrapValidator'], function () {
    "use strict";

    var module = null;

    var calendarYearChart = null;
    var echarts = require('echarts');

    if (document.getElementById('calenderYearDiv') != null){
        calendarYearChart = echarts.init(document.getElementById('calenderYearDiv'));
        calendarYearChart.on('click', function (params) {
            if (curSelectDay != "") {
                //打开新页面?date=curSelectDay
            }
        });
    }

    window.onresize = function () {
        if (calendarYearChart) {
            calendarYearChart.resize();
        }
    }

    var curSelectDay = '';
    var elementChartArray = [];

    var optionYearCalendar = {
        tooltip: {
            position: 'top',
            formatter: function (obj) {
                var value = obj.value;
                curSelectDay = value[0];

                var dateS = echarts.format.formatTime('yyyy-MM-dd', value[0]);
                var destS = "";
                if (value[1] == 0) {
                    destS += '地面测试';
                }
                else if (value[1] > 0) {
                    destS += '飞机作业';
                }
                destS += "<Br/> ID：" + value[2]
                    + "<Br/> 起：" + value[3]
                    + "<Br/> 止：" + value[4];
                return dateS + ': ' + destS;
            }
        },

        visualMap: {
            calculable: false,//拖拽手柄
            orient: 'horizontal',
            left: 'center',
            top: 'top',
            type: "piecewise",
            pieces: [
                //{ gte: 0, lte: 0, label: "地面测试", color: '#947B06' },
                //{ gte: 1, lte: 1 },
                //{ gte: 2, lte: 2 },
                //{ gte: 3, lte: 3 },
                { value: 0, label: "地面测试", color: '#947B06' },
                { value: 1, label: "飞机作业", color: '#11F3F6' }
            ]


        },
        calendar: {},
        series: {}
    }

    var optionElementChart = {
        backgroundColor: '#fff',// '#21202D',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            //data: ['Altitude', selectElements[i]],
            inactiveColor: "#777",
            textStyle: {
                color: "#000"
            }
        },
        xAxis: {
            type: 'category',
            //data: cdates,
            axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: [
            {
                scale: true,
                name: 'Altitude(m)',
                axisLine: { lineStyle: { color: '#8392A5' } },
                splitLine: { show: false },
                min: 0,
                max: 7000,
                position: 'right'
            },
            {
                //name: selectElements[i],
                type: 'value',
                //min: 'dataMin',
                //max: 'datMax',
                position: 'left'
            }
        ],
        grid: {
            bottom: 80
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                realtime: true,
                start: 65,
                end: 85
            }
        ],
        series: [
            {
                name: 'Altitude',
                type: 'line',
                //data: alt,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                yAxisIndex: 0
            },
            {
                //name: selectElements[i],
                type: 'line',// 'scatter',//
                //data: curDataArray,
                smooth: true,
                showSymbol: true,
                markPoint: {
                    symbol: 'pin',
                    symbolSize: 0.01
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                yAxisIndex: 1
            }

        ]
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

    /**
     * @description 按时间获取作业信息
     * @param {any} startTime 起始时间
     * @param {any} endTime 结束时间
     */
    function getPlaneWorkByTime(startTime, endTime) {
        if (calendarYearChart != null) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlaneCalendarDataByTime",
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                data: "{'startDateStr':'" + startTime + "','endDateStr':'" + endTime + "'}",
                success: function (response) {
                    var rawData2 = jQuery.parseJSON(response);
                    var dataArray = rawData2.d.split('.');

                    var yearSeries = [];

                    optionYearCalendar.calendar = function () {
                        var calend = [];
                        for (var i = 0; i < dataArray.length; i++) {
                            var curYear = dataArray[i].split('|');
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
                            var curYear = dataArray[i].split('|');
                            var dataYear = curYear[1].split(';');
                            var item = {
                                type: 'heatmap',
                                calendarIndex: i,
                                coordinateSystem: 'calendar',
                                data: dataYear.map(function (item) {
                                    var subArray = item.split(',');
                                    if (subArray[2] > 0) {
                                        return [subArray[1], 1, subArray[0], subArray[3], subArray[4]];
                                    }
                                    else {
                                        return [subArray[1], 0, subArray[0], subArray[3], subArray[4]];
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
     * 初始化空表
     * @param {number} startYear 起始年
     */
    function initNullCalendarFromYear(startYear) {
        if (calendarYearChart != null) {
            var curDate = new Date();
            var yearCount = curDate.getFullYear() - startYear + 1;
            optionYearCalendar.calendar = function () {
                var calend = [];
                for (var i = 0; i < yearCount; i++) {
                    
                    var item = {
                        top: 70 + 190 * i,
                        range: startYear+i,
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
     * 按要素查询探测数据
     * @param {string} dateStr
     * @param {string} selectElemts
     * @param {string} chartID
     */
    function getSingleWorkInfo(dateStr, selectElements, chartID) {
        var options = {
            type: "POST",
            url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlaneDataTxtByDateID",
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            data: "{'dateStr':'" + dateStr + "','columns':'" + selectElements + "'}",
            success: function (response) {
                var rawData2 = jQuery.parseJSON(response);
                var dataArray = rawData2.d.split(';');

                //必带字段 时间+经度、纬度、海拔
                var cdates = dataArray.map(function (item) {
                    var subArray = item.split(',');
                    return subArray[1];
                });
                var lon = dataArray.map(function (item) {
                    var subArray = item.split(',');
                    return subArray[2];
                });
                var lat = dataArray.map(function (item) {
                    var subArray = item.split(',');
                    return subArray[3];
                });

                var pointStr = "";
                routeData = [];
                var interP = 50;
                var numP = Math.round(dataArray.length / interP);

                var alt = dataArray.map(function (item) {
                    var subArray = item.split(',');
                    return subArray[4];
                });

                for (var i = 0; i < selectElements.length; i++) {
                    var curDataArray = dataArray.map(function (item) {
                        var subArray = item.split(',');
                        if (subArray[5 + i] != '-999999' && subArray[5 + i] != '0') {
                            return subArray[5 + i];
                        }
                        else {
                            return '';
                        }
                    }
                    );


                    var curOptionEle = optionElementChart;
                    curOptionEle.legend.data = ['Altitude', selectElements[i]];
                    curOptionEle.xAxis.data = cdates;
                    curOptionEle.yAxis[1].name = selectElements[i];
                    curOptionEle.series[0].data = alt;
                    curOptionEle.series[1].name = selectElements[i];
                    curOptionEle.series[1].data = curDataArray;
                    elementChartArray[i].setOption(curOptionEle);
                }

                if (elementChartArray.length > 0) {
                    //设置dataZoom事件 获取选中范围
                    elementChartArray[0].on("dataZoom", function (params) {

                        sel_strart = Math.round(params.start * dataArray.length * 0.01);
                        sel_end = Math.round(params.end * dataArray.length * 0.01);


                    });

                    window.onresize = function () {
                        for (var i = 0; i < elementChartArray.length; i++) {
                            elementChartArray[i].resize();
                        }
                    };
                }
            },
            error: function (err) {
                var data = JSON.parse(err.responseText);
            }
        }
        $.ajax(options);
    }

    module = {
        initNullCalendarFromYear: initNullCalendarFromYear,
        refreshCalendarByTime: getPlaneWorkByTime
        //,
        //getSingleWorkInfo: getSingleWorkInfo,
        //elementChartArray: elementChartArray
    };

    return module;
});