define('planeMap', ['jquery', 'appConfig', 'echarts', 'commonHelper'], function ($) {

    "user strict";
    var module = null;
    var echarts = require("echarts");
    var commonHelper = require('commonHelper');

    var mapChart = null;
    if (document.getElementById('echartMapContainer') != null) {
        mapChart = echarts.init(document.getElementById('echartMapContainer'));
    }

    window.onresize = function () {
        if (mapChart) {
            mapChart.resize();
        }
    }

    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    var optionMapChart = null;

    /**
     * 初始化地图
     */
    function InitMap() {
        if (mapChart != null) {
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
            });
        }
    }    

    /**
    *  获取最近航迹+数据
    */
    function SetLastGPS() {
        if (mapChart) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlaneLastSummary",
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                data: "{'elements':'" + defaultElemets + "'}",
                success: function (response) {
                    var rawData2 = jQuery.parseJSON(response);
                    var dataArray = rawData2.d.replace('"', '').split(';');

                    var curWorkID = dataArray[0].split(',')[0];

                    //必带字段 时间+经度、纬度、海拔
                    cdates = dataArray.map(function (item) {
                        var subArray = item.split(',');
                        return subArray[1];
                    });
                   
                    routeData = [];
                    var interP = 50;
                    var numP = Math.round(dataArray.length / interP);
                    for (var i = 0; i < numP; i++) {
                        var subArray = dataArray[i * interP].split(',');
                        if (i < numP - 1) {
                            routeData.push([parseFloat(subArray[2]), parseFloat(subArray[3])]);
                        }
                    }

                    SetGpsData(dateStr, routeData);

                },
                error: function (err) {
                    var data = JSON.parse(err.responseText);
                }
            }
            $.ajax(options);
        }
    }

    /**
    * 按作业编号获取航迹信息
    * @param {string} dateStr
    */
    function SetGpsByID(dateStr) {
        var options = {
            type: "POST",
            url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlaneDataTxtByDateID",
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            data: "{'dateStr':'" + dateStr + "','columns':''}",
            success: function (response) {
                var rawData2 = jQuery.parseJSON(response);

                var dataArray = rawData2.d.split(';');

                if (dataArray.length == 0)
                    return;

                routeData = [];
                var interP = 50;
                var numP = Math.round(dataArray.length / interP);
                for (var i = 0; i < numP; i++) {
                    var subArray = dataArray[i * interP].split(',');
                    if (i < numP - 1) {
                        routeData.push([parseFloat(subArray[2]), parseFloat(subArray[3])]);
                    }
                }

                SetGpsData(dateStr, routeData)
            },
            error: function (err) {
                var data = JSON.parse(err.responseText);
            }
        }
        $.ajax(options);
    }

    /**
     * @description 设置航迹
     * @param {string} workID  作业编号
     * @param {Array} routeData 航迹
     */
    function SetGpsData(workID, routeData) {

        if (mapChart) {
            optionMapChart.title.text = workID + "航迹图";
            optionMapChart.series = [
                {
                    type: 'lines',
                    coordinateSystem: 'geo',
                    polyline: true,
                    data: [
                        {
                            name: workID,
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
        }
    }

    module = {
        InitMap: InitMap,
        SetLastGPS: SetLastGPS,
        SetGpsData: SetGpsData,
        SetGpsByID: SetGpsByID
    };

    return module;

});
