/**
 * planeSummary 首页汇总统计
 * @model planeSummary
 */
define('planeSummary', ['jquery', 'appConfig','bootstrap','echarts','commonHelper'], function ($) {

    var defaultStr = "请选择";
    var echarts = require("echarts");
    var CommonHelper = require('commonHelper');

    var mapChart = echarts.init(document.getElementById('echartMapContainer'));
    var yearChartObj = echarts.init(document.getElementById('yearChart'));
    var monthChartObj = echarts.init(document.getElementById('monthChart'));
    var yearCalendarObj = echarts.init(document.getElementById('calendarChart'));
    var elementChartObj = echarts.init(document.getElementById('chart_element'));
    var yearSeries = [];
    var logSeries = [];
    var logNum = 6;


    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    var optionMapChart = null;

    var defaultElemets = "Temp,PIP_Num,CAS_Num";//,T1_O3,T2_So2,T3_No2,T4_Co,CIP_Numb,,VertWind

    //网站链接
    var webUrl = [
        {
            Type: "北京市气象局业务内网",
            Mark: "内",
            Color:"#FFAACC",
            Data: [
                {
                    Name: "北京市气象局导航页",
                    WebSite: "http://172.18.3.17/"
                },
                {
                    Name: "北京市气象局办公系统",
                    WebSite: "http://10.224.8.26/"
                },
                {
                    Name: "国家局NOTES邮箱",
                    WebSite: "http://172.18.3.17/notes_index.htm"
                }
            ]
        },
        {
            Type: "中国气象局业务内网",
            Mark: "CN",
            Color: "#DDFFCC",
            Data: [
                {
                    Name: "国家气象业务内网",
                    WebSite: "http://10.1.64.154/idata/"
                },
                {
                    Name: "人工影响天气",
                    WebSite: "http://10.1.64.154/idata/web/jump/to?urlId=5"
                }
            ]
        },
        {
            Type: "气象外网",
            Mark: "外",
            Color: "#00FFCC",
            Data: [
                {
                    Name: "中国气象局",
                    WebSite: "http://www.cma.gov.cn/"
                },
                {
                    Name: "北京市气象局",
                    WebSite: "http://www.bjmb.gov.cn/"
                }
            ]
        }
    ];

    /**
     * 网站列表
     */
    function InitWeb() {

        var cNum = 0;

        var leftHtml = "";
        var rightHtml = "";

        for (var i = 0; i < webUrl.length; i++) {

            for (var j = 0; j < webUrl[i].Data.length; j++) {
                cNum += 1;

                if (cNum > 6 && cNum <= 12) {
                    rightHtml += '<a href="' + webUrl[i].Data[j].WebSite + '" class="list-group-item" target="_blank"><span class="badge" style="background-color:' + webUrl[i].Color + ';">' + webUrl[i].Mark + '</span>' + webUrl[i].Data[j].Name + '</a>';
                }
                else {
                    leftHtml += '<a href="' + webUrl[i].Data[j].WebSite + '" class="list-group-item" target="_blank"><span class="badge" style="background-color:' + webUrl[i].Color + ';">' + webUrl[i].Mark + '</span>' + webUrl[i].Data[j].Name + '</a>';
                }
            }
        }

        $('#div_web_left').html(leftHtml);
        $('#div_web_right').html(rightHtml);
    }

    /**
    * 年柱状图 点击事件
    */
    yearChartObj.on('click', function (param) {
        if (yearSeries) {
            for (var i = 0; i < yearSeries.length; i++) {
                if (yearSeries[i].Year == param.name)
                {
                    RefreshMonthChart(yearSeries[i]);
                    RefreshYearCalendarChart(yearSeries[i]);
                    break;
                }
            }
        }
    });

    /**
    * 日历图 点击事件
    */
    yearCalendarObj.on('dbclick', function (param) {
        console.log(param.data);

        if (param) {
            var idArray = param.data[2].split('|');
            if (idArray.length > 0) {
                window.open(appConfig.webPageUrl + "/Pages/PlaneManager/PlaneSingleInfo.html?dateStr=" + idArray[0]); 
            }           
        }
    });

    /**
     * 初始化地图
     */
    function InitMap() {
        $.getJSON(appConfig.webPageUrl + '/Assets/Geojson/sheng_JJJ_geo.json', function (data) {
            echarts.registerMap('JJJ', data);
            //sheng_JJJ_geo JJJ
            optionMapChart = {
                geo: {
                    map: 'JJJ'
                },
                title: {
                    text: '',
                    x: 'center',
                    textStyle: {
                        fontSize: 15,
                        color: '#FFF'
                    }

                },

                color: ['rgba(30,144,255,1)', 'lime'],
                roam: true,
                label: {
                    emphasis: {
                        color: '#16F1F8'
                    }
                },
                itemStyle: {					// 定义样式
                    normal: {					// 普通状态下的样式
                        areaColor: '#2a333d',// '#323c48',
                        borderColor: '#404a59',
                        color: '#FFF'
                    },
                    emphasis: {					// 高亮状态下的样式
                        areaColor: '#2a333d',
                        //borderColor: '#0000FF',
                        color: '#16F1F8'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                //backgroundColor: '#FFFFFF',//#404a59
                backgroundColor: '#404a59',
                textStyle: {
                    color: '#fff'	// 值域控件的文本颜色
                }
            }
            mapChart.setOption(optionMapChart);

            window.onresize = mapChart.resize();
        });
    }    

    
    /**
     * 按起止时间获取飞机作业信息
     * @param {any} startTime
     * @param {any} endTime
     */
    function GetInfoByTime(startTime, endTime) {

        var options = {
            type: "POST",
            url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlaneCalendarDataByTime",
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            data: "{'startDateStr':'" + startTime + "','endDateStr':'" + endTime + "'}",
            success: function (response) {
                var rawData2 = jQuery.parseJSON(response);
                var dataArray = rawData2.d.split('.');
                yearSeries = [];

                for (var i = 0; i < dataArray.length; i++) {
                    var curYear = dataArray[i].split('|');
                    var yearObj ={
                            Year: curYear[0],
                            Count: 0,
                            MonthCount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            DayWork:[]
                    };
                    
                    var dataYear = curYear[1].split(';');
                    yearObj.Count = dataYear.length;

                    for (var j = 0; j < dataYear.length; j++) {
                        var subArray = dataYear[j].split(',');
                        if (subArray[2] > 0) {
                            var cMon = parseInt(subArray[0].substr(4, 2));
                            yearObj.MonthCount[cMon - 1] += 1;

                            if (yearObj.DayWork.length>0 && yearObj.DayWork[yearObj.DayWork.length - 1][0] == subArray[1])
                            {
                                yearObj.DayWork[yearObj.DayWork.length - 1][1] += 1;
                                yearObj.DayWork[yearObj.DayWork.length - 1][2] += "|"+subArray[0];
                                yearObj.DayWork[yearObj.DayWork.length - 1][3] += "|" + subArray[3];
                                yearObj.DayWork[yearObj.DayWork.length - 1][4] += "|" + subArray[4];
                                //yearObj.DayWork.push([subArray[1], 1, subArray[0], subArray[3], subArray[4]]);
                            }
                            else
                            {
                                yearObj.DayWork.push([subArray[1], 1, subArray[0], subArray[3], subArray[4]]);
                            }
                        }
                        else
                        {
                            yearObj.DayWork.push([subArray[1], 0, subArray[0], subArray[3], subArray[4]]);
                        }
                    }

                    yearSeries.push(yearObj);
                }

                var startYear = parseInt(startTime.substr(0, 4));
                var endYear = parseInt(endTime.substr(0, 4));
                var yearDatas = {
                    years: [],
                    count: []
                };
                
                for (var i = startYear; i <= endYear; i++) {

                    yearDatas.years.push(i);
                    yearDatas.count.push(0);

                    for (var j = 0; j < yearSeries.length; j++) {
                        if (i == yearSeries[j].Year) {
                            yearDatas.count[i - startYear] = yearSeries[j].Count;
                        }
                    }
                }

                RefreshYearChart(yearDatas);
                RefreshMonthChart(yearSeries[yearSeries.length - 1]);
                RefreshYearCalendarChart(yearSeries[yearSeries.length - 1]);
            },
            error: function (err) {
                console.log(JSON.parse(err.responseText));
            }
        }
        $.ajax(options);
    }


    function GetMainInfo() {
        var options = {
            type: "POST",
            url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetMainInfo",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: "{'startDateStr':'" + startTime + "','endDateStr':'" + endTime + "'}",
            success: function (response) {
                var resultObj = jQuery.parseJSON(response.d);
                var minYear = parseInt(resultObj[0].WorkDate.substring(0, 4));
                var maxYear = parseInt(resultObj[resultObj.length - 1].WorkDate.substring(0, 4));

                yearSeries = [];

                for (var i = minYear; i <=maxYear; i++) {
                    var yearObj = {
                        Year: i,
                        Count: 0,
                        MonthCount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        DayWork: []
                    };
                    yearSeries.push(yearObj);
                }

                for (var i = 0; i < resultObj.length; i++) {
                    var curYear = parseInt(resultObj[i].WorkDate.substring(0, 4));
                    var curMonth = parseInt(resultObj[i].WorkDate.substring(5, 2));
                    var yearIndex = curYear - minYear;

                    if (resultObj[i].Purpose > 0 || resultObj[i].Log!="") {
                        //日期  次数  ID  起始时间 结束时间 
                        yearSeries[yearIndex].DayWork.push([
                                resultObj[i].WorkDate,
                                resultObj[i].Purpose,
                                resultObj[i].PlaneWorkInfoID,
                                resultObj[i].StartTime,
                                resultObj[i].EndTime
                        ]);

                        yearSeries[yearIndex].Count += 1;
                        yearSeries[yearIndex].MonthCount[curMonth - 1] += 1;
                    }

                  
                }

                var logItem = '';
                var curNum = 0;
                for (var i = 0; i < resultObj.length; i++) {
                    if (resultObj[resultObj.length - 1 - i].Log != "") {
                        curNum += 1;
                        var fileurl = appConfig.dataServerUrl + "/WebPlaneData/" + resultObj[resultObj.length - 1 - i].PlaneWorkInfoID.substring(0, 4) + "/" + resultObj[resultObj.length - 1 - i].PlaneWorkInfoID + "/Log/";
                        logItem += '<a href="' + appConfig.webUrl + "?file=" + fileurl + resultObj[resultObj.length - 1 - i].Log.replace(".docx", ".pdf").replace(".doc", ".pdf") + '"  target="_blank" class="list-group-item"><span class="badge">预览</span>' + resultObj[resultObj.length - 1 - i].Log + '</a>';
                    }
                    if (curNum >= logNum)
                        break;
                }

                $('#logContainer').html(logItem);

                var startYear = minYear;
                var endYear = maxYear;
                var yearDatas = {
                    years: [],
                    count: []
                };

                for (var i = startYear; i <= endYear; i++) {
                    yearDatas.years.push(i);
                    yearDatas.count.push(0);
                    for (var j = 0; j < yearSeries.length; j++) {
                        if (i == yearSeries[j].Year) {
                            yearDatas.count[i - startYear] = yearSeries[j].Count;
                        }
                    }
                }
                RefreshYearChart(yearDatas);
                RefreshMonthChart(yearSeries[yearSeries.length - 1]);
                RefreshYearCalendarChart(yearSeries[yearSeries.length - 1]);
            },
            error: function (err) {
                console.log(JSON.parse(err.responseText));
            }
        }
        $.ajax(options);
    }

    /**
     * 年统计图 参数设置
     */
    var optionYear = {
        title: {
            show: true,
            text: '历史飞机作业年统计',
            left: 'center',
            top:'2%'
        },
        legend: {
            show: false
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (data) {
                return data[0].name + "年:" + data[0].value+"次";
            }
        },
        grid: {
            left: '8%',
            right: '8%',
            bottom: '5%',
            containLabel: true
        },
        yAxis: [
            {
                name: '次',
                type: 'value'
            }
        ],
        xAxis: [
            {
                name: '年',
                nameLocation: 'end',
                nameGap:'5',
                type: 'category',
                boundaryGap:'1%'
                //data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]//['1', '2', '3', '4', '5', '6', '7']
            }
        ],
        color: ['#ca8622']
        //,backgroundColor:[]
    }

    /**
     * 月统计图 参数设置
     */
    var optionMonth = {
        title: {
            show: true,
            text: '飞机作业月统计',
            left: 'center',
            top: '2%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (data) {
                return data[0].name + "月:" + data[0].value + "次";
            }
        },
        grid: {
            left: '8%',
            right: '8%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [
            {
                name: '月',
                nameLocation:'end',
                type: 'category',
                data: [1,2,3,4,5,6,7,8,9,10,11,12]
            }
        ],
        yAxis: [
            {
                name:'次',
                type: 'value'
            }
        ],
        color: ['#61a0a8']
    }

    /**
     * 年作业日历图 参数设置
     */
    var optionYearCalendar = {
        title: {
            show: true,
            text: '飞机作业日历图',
            left: '5%',
            top: '0'
        },
        tooltip: {
            position: 'top',
            formatter: function (obj) {
                var value = obj.value;
                curSelectDay = value[0];

                var dateS = echarts.format.formatTime('yyyy-MM-dd', value[0]);
                var destS = "";
                if (value[1] == 0) {
                    dateS += '地面测试' + value[1] + "次<Br/> ";
                }
                else if (value[1] > 0) {
                    dateS += '飞机作业' + value[1] + "次<Br/> ";
                }

                var idArr = value[2].split('|');
                var stArr = value[3].split('|');
                var enArr = value[4].split('|');

                if (idArr.length > 1) {
                    var str = "<table class='table' style='border: 1px solid #fff;'><tr><th>ID</th><th>起</th><th>止</th></tr>";
                    for (var i = 0; i < idArr.length; i++) {
                        str += "<tr><td>" + idArr[i] + "</td><td>" + stArr[i] + "</td><td>" + enArr[i] + "</td></tr>"
                    }
                    str += "</table>";
                    return dateS + str;
                }
                else {

                    destS +="ID：" + value[2]
                        + "<Br/> 起：" + value[3]
                        + "<Br/> 止：" + value[4];
                    return dateS + destS;
                }
            }
        },

        visualMap: {
            calculable: false,//拖拽手柄
            orient: 'horizontal',
            right:'5%',
            top: 'top',
            type: "piecewise",
            min: 0,
            max: 2,
            splitNumber: 3,
            pieces: [
                { value: 0, label: '地面测试' },
                { value: 1, label: '飞机作业1次' },
                { value: 2, label: '飞机作业2次' }
            ],
            show: true,
            formatter: function (value, value2) {
                if (value2 == 0) {
                    return '地面测试';
                }
                else if (value2 == 1) {
                    return '飞机作业1次';
                }
                else if (value2 == 2) {
                    return '飞机作业2次';
                }
            }
        }
    }

    /**
     * 数据图 参数设置
     */
    var optionElementChart = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#0D4286'
                }
            }
        },
        legend: {
            show: true,
            right: '15%',
            top:'2%',
            inactiveColor: "#777",
            textStyle: {
                color: "#000"
            },
            data:[]
        },
        dataZoom: [
            {
                show: true,
                type: 'slider',
                xAxisIndex: [0],
                filterMode:'filter'
            }
        ],
        grid: {
            top: '15%',
            left: '8%',
            right: '2%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            axisLine: {
                textStyle: {
                    color:'#000000'
                }
            },
            data: []
        },
        yAxis: [

        ],
        series: [
        ]

    }

    /**
     * 初始化年柱状图统计表
     * @param {Array} yearArray
     */
    function RefreshYearChart(yearArray) {
        optionYear.xAxis[0].data = yearArray.years;
        optionYear.series = [
            {
                name: '飞机作业次数',
                type: 'bar',
                data: yearArray.count,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
            }
        ];
        optionYear.title.text = yearArray.years[0] + "年-" + yearArray.years[yearArray.years.length - 1] + "年 飞机作业统计";
        yearChartObj.setOption(optionYear);
    }

    /**
     * 初始化月统计柱状图
     * @param {any} yearObj
     */
    function RefreshMonthChart(yearObj) {
        optionMonth.series = [
            {
                name: yearObj.year+"年",
                type: 'bar',
                data: yearObj.MonthCount,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
            }
        ];
        optionMonth.title.text = yearObj.Year + "年各月作业统计";
        monthChartObj.setOption(optionMonth);
    }

    /**
     * 初始化年日历图
     * @param {any} year
     */
    function RefreshYearCalendarChart(yearObj) {

        optionYearCalendar.title.text = yearObj.Year + "年飞机作业日历图";
        optionYearCalendar.calendar = [
            {
                top: 70,
                range: yearObj.Year,
                cellSize: ['auto', 20],
                right: 5,
                monthLabel: { nameMap: 'cn' },
                dayLabel: { firstDat: 1, nameMap: 'cn' }
            }
        ];

        optionYearCalendar.series = [
            {
                type: 'heatmap',
                calendarIndex: 0,
                coordinateSystem: 'calendar',
                data: yearObj.DayWork
            }
        ];
        yearCalendarObj.setOption(optionYearCalendar);
    }

    /**
     * 获取最近照片
     * @param {Number} count 搜索范围
     * @param {Number} outcount 输出个数
     */
    function GetLastPic(count,outcount) {
        var options = {
            type: "POST",
            //url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlanePicByCount",
            url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlanePicByDateID",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: "{'count':" + count + ",'outcount':" + outcount+ "}",
            data: "{'dateStr':'" + '20120809' + "'}",
            success: function (response) {
                
                var result = jQuery.parseJSON(response.d);
                if (result.length > 0) {
                    //滚动 导航添加
                    //     内容添加
                    //     事件绑定
                    var ulHtml = "";
                    var itemHtml = "";
                    for (var i = 0; i < Math.min(result.length,6); i++) {
                        if (i == 0) {
                            ulHtml += '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>';
                            itemHtml += '<div class="item active" ><img src="' + appConfig.fileServerUrl + result[i].Path + result[i].FileName + '" alt= "' + result[i].Time + '" class="img-responsive center-block" style="max-height:280px;"/></div>';
                        }
                        else {
                            ulHtml += '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>';
                            itemHtml += '<div class="item"><img src="' + appConfig.fileServerUrl + result[i].Path + result[i].FileName + '" alt= "' + result[i].Time + '" class="img-responsive center-block" style="max-height:280px;"/></div>';
                        }
                    }

                    $('#ul_carousel').html(ulHtml);
                    $('#item_carousel').html(itemHtml);
                    $("#myCarousel").carousel({
                        interval: 2500
                    });
                }
            },
            error: function (err) {
                console.log(JSON.parse(err.responseText));
            }
        }
        $.ajax(options);
    }


    /**
     *  获取最近宏观记录  弃用
     * @param {Number} count 个数
     */
    function GetLastLog(count) {
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
                    logItem += '<a href="'+appConfig.webUrl + "?file=" + fileurl + logObj[i].FileName.replace(".docx", ".pdf").replace(".doc", ".pdf") + '"  target="_blank" class="list-group-item"><span class="badge">预览</span>'+logObj[i].FileName+'</a>';

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

    /**
     *  获取最近航迹+数据
     */
    function GetLastGPS() {

        //获取最近ID

        //航迹+温压湿等

        var options = {
            type: "POST",
            url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlaneLastSummary",
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            data: "{'elements':'" + defaultElemets + "'}",
            success: function (response) {
                var rawData2 = jQuery.parseJSON(response);
                var dataArray = rawData2.d.replace('"','').split(';');
                var curWorkID = dataArray[0].split(',')[0];

                //必带字段 时间+经度、纬度、海拔
                cdates = dataArray.map(function (item) {
                    var subArray = item.split(',');
                    return subArray[1];
                });

                var pointStr = "";
                routeData = [];
                var interP = 50;
                var numP = Math.round(dataArray.length / interP);
                for (var i = 0; i < numP; i++) {
                    var subArray = dataArray[i * interP].split(',');
                    if (i < numP - 1) {
                        routeData.push([parseFloat(subArray[2]), parseFloat(subArray[3])]);
                    }
                }

                optionMapChart.title.text = curWorkID + "航迹图";
                optionMapChart.series = [
                    {
                        type: 'lines',
                        coordinateSystem: 'geo',
                        polyline: true,
                        data: [
                            {
                                name: curWorkID,
                                coords: routeData // [[110, 34], [121, 38], [119, 23],[123,45]]
                            }
                        ],
                        silent: true,
                        animation: true,
                        lineStyle: {
                            normal: {
                                color: '#D7F442',//'#3FA7DC',
                                opacity: 0.4,
                                width: 2
                            }
                        },
                        effect: {
                            constantSpeed: 10,
                            show: true,
                            trailLength: 5,
                            symbol: planePath,
                            symbolSize: 20,
                            color: '#2E7CD7'//'#A6C84C'
                        }
                    },
                    {
                        type: 'lines',
                        coordinateSystem: 'geo',
                        polyline: true,
                        data: [
                            //{
                            //    name: dateStr,
                            //    coords: routeData // [[110, 34], [121, 38], [119, 23],[123,45]]
                            //}
                        ],
                        silent: true,
                        animation: true,
                        lineStyle: {
                            normal: {
                                color: '#3FA7DC',//'#3FA7DC',
                                opacity: 0.4,
                                width: 4
                            }
                        }
                        //,
                        //effect: {
                        //    constantSpeed: 10,
                        //    show: true,
                        //    trailLength: 5,
                        //    symbol: planePath,
                        //    symbolSize: 20,
                        //    color: '#2E7CD7'//'#A6C84C'
                        //}
                    }
                ];

                mapChart.setOption(optionMapChart);

                var alt = dataArray.map(function (item) {
                    var subArray = item.split(',');
                    return subArray[4];
                });

                optionElementChart.xAxis.data = cdates;
                optionElementChart.yAxis.push(
                    {
                        name: 'altitude',
                        type: 'value',
                        position: 'right',
                        axisTick: {
                            inside: 'false',
                            length:10
                        }
                    }
                );

                optionElementChart.series.push(
                    {
                        name: 'altitude',
                        type: 'line',
                        data: alt,
                        yAxisIndex:0
                    }
                );

                optionElementChart.legend.data.push(
                    {
                        name: 'altitude'
                    }
                );

                var selectElements = defaultElemets.split(',');
                for (var i = 0; i < selectElements.length; i++) {
                    var curDataArray = dataArray.map(function (item) {
                        var subArray = item.split(',');
                        if (subArray[5 + i] != '-999999' && subArray[5 + i] != '0') {
                            return subArray[5 + i];
                        }
                        else {
                            return '';
                        }
                    });

                    optionElementChart.yAxis.push(
                        {
                            name: selectElements[i],
                            type: 'value',
                            position: 'left',
                            offset:55*i,
                            axisTick: {
                                inside: 'false',
                                length: 10
                            }
                        }
                    );

                    optionElementChart.series.push(
                        {
                            name: selectElements[i],
                            type: 'line',
                            data: curDataArray,
                            yAxisIndex: i+1
                        }
                    );

                    optionElementChart.legend.data.push(
                        {
                            name: selectElements[i]
                        }
                    );

                   
                }

                //optionElementChart.legend.data = ['Altitude', selectElements];
                optionElementChart.title = {
                    show: true,
                    text: curWorkID+"探测数据",
                    left: '200px',
                    top: '0'
                };
                elementChartObj.setOption(optionElementChart);

            },
            error: function (err) {
                var data = JSON.parse(err.responseText);
            }
        }
        $.ajax(options);
    }

    /**
     * @namespace Plane.Data
     * @exports Plane.Data.Search
     */
    var myModule = {

        /**
        * @name Init
        * @constructor
        */
        Init: function () {
            InitMap();
            InitWeb();

            var staDate = new Date(2015, 0, 1);
            var endDate = new Date();
            
            GetMainInfo();

            //GetInfoByTime(CommonHelper.formatDate(staDate, 1).substr(0, 8), CommonHelper.formatDate(endDate, 1).substr(0, 8));
            //GetLastLog(6);

            GetLastPic(500,6);            
            GetLastGPS();

            window.onresize = function () {
                yearCalendarObj.resize();
                yearChartObj.resize();
                monthChartObj.resize();
                elementChartObj.resize();
            }
        },

        /**
        * 按时间读取数据
        * 
        */
        GetInfoByTime: function (startTime,endTime) {
            GetInfoByTime(startTime, endTime);
        }
    }

    return myModule;
});
