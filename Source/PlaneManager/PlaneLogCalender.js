require(
    [
        'jquery',
        'appConfig',
        'bootstrap',
        'echarts',
        'commonHelper',
        'planeDataMain',
        'bootstrapTable',
        'planeDataMain',
        'toastr'
    ],
    function () {

        var echarts = require('echarts');
        var planeDataMain = require('planeDataMain');
        var calendarYearChart = null;
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

        /**
        * 初始化空日历图
        * @param {number} startYear 起始年
        */
        function InitNullCalendar(startYear) {
            //$('#calendarContainer').attr('height', ht+'px');
            //$('#calendarContainer').html('<div id="calenderYearDiv" style="height:"' + ht + 'px"></div>');

            var calendarYear = document.getElementById('calenderYearDiv');

            if (calendarYear) {
                calendarYearChart = echarts.init(document.getElementById('calenderYearDiv'));

                var curDate = new Date();
                var curYear = curDate.getFullYear();
                var yearCount = curYear - startYear + 1;
                var ht = 70 + 190 * yearCount;
                //$('#calendarContainer').height = 70 + 190 * yearCount + 'px';
          

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

                calendarYearChart.on('click', function (params) {
                    var curDay = params.value;
                });

            }
        }


        /**
        * 填充日历图数据
        * @param {number} startYear 起始年
        */
        function GetCalenderYearInfo(startYear) {
            if (calendarYearChart) {
                var yearStr = getYearStr(startYear);
                planeDataMain.GetLogByYears(yearStr, fillYearCalendar);
            }
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
         * 填充日历图
         * 
         */
        function fillYearCalendar(resObj) {
            var dataArray = resObj.split('.');
            var yearSeries = [];
            
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
        }


      

        InitNullCalendar(2007);
        GetCalenderYearInfo(2007);

    }
);