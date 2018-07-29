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

        //var planePic = require('planePic');
        //var planeCob = require('planeCob');
        //var planeMap = require('planeMap');
        //var planeLog = require('planeLog');
        //var planeDT = require('planeDT');
       
        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

        /**
         * 数据字段名
         */
        var elemntArray = [
            'Temp', 'Ambient_temp', 'RH1', 'RH2', 'Dewpoint', 'Bar_Pres', 'WindN', 'WindE', 'VertWind', 'LWC_DAT_Calc',
            //'PIP_BinCon_0', 'PIP_BinCon_1', 'PIP_BinCon_2', 'PIP_BinCon_3', 'PIP_BinCon_4', 'PIP_BinCon_5', 'PIP_BinCon_6', 'PIP_BinCon_7', 'PIP_BinCon_8', 'PIP_BinCon_9', 'PIP_BinCon_10',
            //'PIP_BinCon_11', 'PIP_BinCon_12', 'PIP_BinCon_13', 'PIP_BinCon_14', 'PIP_BinCon_15', 'PIP_BinCon_16', 'PIP_BinCon_17', 'PIP_BinCon_18', 'PIP_BinCon_19', 'PIP_BinCon_20',
            //'PIP_BinCon_21', 'PIP_BinCon_22', 'PIP_BinCon_23', 'PIP_BinCon_24', 'PIP_BinCon_25', 'PIP_BinCon_26', 'PIP_BinCon_27', 'PIP_BinCon_28', 'PIP_BinCon_29', 'PIP_BinCon_30',
            //'PIP_BinCon_31', 'PIP_BinCon_32', 'PIP_BinCon_33', 'PIP_BinCon_34', 'PIP_BinCon_35', 'PIP_BinCon_36', 'PIP_BinCon_37', 'PIP_BinCon_38', 'PIP_BinCon_39', 'PIP_BinCon_40',
            //'PIP_BinCon_41', 'PIP_BinCon_42', 'PIP_BinCon_43', 'PIP_BinCon_44', 'PIP_BinCon_45', 'PIP_BinCon_46', 'PIP_BinCon_47', 'PIP_BinCon_48', 'PIP_BinCon_49', 'PIP_BinCon_50',
            //'PIP_BinCon_51', 'PIP_BinCon_52', 'PIP_BinCon_53', 'PIP_BinCon_54', 'PIP_BinCon_55', 'PIP_BinCon_56', 'PIP_BinCon_57', 'PIP_BinCon_58', 'PIP_BinCon_59', 'PIP_BinCon_60',
            //'PIP_BinCon_61',
            'PIP_Num', 'PIP_Area', 'PIP_Vol', 'PIP_MD', 'PIP_ED', 'PIP_MVD',
            //'CIP_BinCon_0', 'CIP_BinCon_1', 'CIP_BinCon_2', 'CIP_BinCon_3', 'CIP_BinCon_4', 'CIP_BinCon_5', 'CIP_BinCon_6', 'CIP_BinCon_7', 'CIP_BinCon_8', 'CIP_BinCon_9', 'CIP_BinCon_10',
            //'CIP_BinCon_11', 'CIP_BinCon_12', 'CIP_BinCon_13', 'CIP_BinCon_14', 'CIP_BinCon_15', 'CIP_BinCon_16', 'CIP_BinCon_17', 'CIP_BinCon_18', 'CIP_BinCon_19', 'CIP_BinCon_20',
            //'CIP_BinCon_21', 'CIP_BinCon_22', 'CIP_BinCon_23', 'CIP_BinCon_24', 'CIP_BinCon_25', 'CIP_BinCon_26', 'CIP_BinCon_27', 'CIP_BinCon_28', 'CIP_BinCon_29', 'CIP_BinCon_30',
            //'CIP_BinCon_31', 'CIP_BinCon_32', 'CIP_BinCon_33', 'CIP_BinCon_34', 'CIP_BinCon_35', 'CIP_BinCon_36', 'CIP_BinCon_37', 'CIP_BinCon_38', 'CIP_BinCon_39', 'CIP_BinCon_40',
            //'CIP_BinCon_41', 'CIP_BinCon_42', 'CIP_BinCon_43', 'CIP_BinCon_44', 'CIP_BinCon_45', 'CIP_BinCon_46', 'CIP_BinCon_47', 'CIP_BinCon_48', 'CIP_BinCon_49', 'CIP_BinCon_50',
            //'CIP_BinCon_51', 'CIP_BinCon_52', 'CIP_BinCon_53', 'CIP_BinCon_54', 'CIP_BinCon_55', 'CIP_BinCon_56', 'CIP_BinCon_57', 'CIP_BinCon_58', 'CIP_BinCon_59', 'CIP_BinCon_60',
            //'CIP_BinCon_61',
            'CIP_Numb', 'CIP_Area', 'CIP_Vol', 'CIP_MD', 'CIP_ED', 'CIP_MVD',
            //'CAS_ForwBins_0', 'CAS_ForwBins_1', 'CAS_ForwBins_2', 'CAS_ForwBins_3', 'CAS_ForwBins_4', 'CAS_ForwBins_5', 'CAS_ForwBins_6', 'CAS_ForwBins_7', 'CAS_ForwBins_8', 'CAS_ForwBins_9', 'CAS_ForwBins_10',
            //'CAS_ForwBins_11', 'CAS_ForwBins_12', 'CAS_ForwBins_13', 'CAS_ForwBins_14', 'CAS_ForwBins_15', 'CAS_ForwBins_16', 'CAS_ForwBins_17', 'CAS_ForwBins_18', 'CAS_ForwBins_19', 'CAS_ForwBins_20',
            //'CAS_ForwBins_21', 'CAS_ForwBins_22', 'CAS_ForwBins_23', 'CAS_ForwBins_24', 'CAS_ForwBins_25', 'CAS_ForwBins_26', 'CAS_ForwBins_27', 'CAS_ForwBins_28', 'CAS_ForwBins_29',
            'CAS_Num0', 'CAS_Area0', 'CAS_Vol0', 'CAS_LWC0', 'CAS_MD0', 'CAS_ED0', 'CAS_MVD0', 'CAS_Num', 'CAS_Area', 'CAS_Vol', 'CAS_LWC', 'CAS_MD', 'CAS_ED', 'CAS_MVD',
            'CCN_CurrentSS', 'CCN_Num',
            //'CCN_Bin_Con_0', 'CCN_Bin_Con_1', 'CCN_Bin_Con_2', 'CCN_Bin_Con_3', 'CCN_Bin_Con_4', 'CCN_Bin_Con_5', 'CCN_Bin_Con_6', 'CCN_Bin_Con_7', 'CCN_Bin_Con_8', 'CCN_Bin_Con_9', 'CCN_Bin_Con_10',
            //'CCN_Bin_Con_11', 'CCN_Bin_Con_12', 'CCN_Bin_Con_13', 'CCN_Bin_Con_14', 'CCN_Bin_Con_15', 'CCN_Bin_Con_16', 'CCN_Bin_Con_17', 'CCN_Bin_Con_18', 'CCN_Bin_Con_19',
            //'SPP_Bin_Con_0', 'SPP_Bin_Con_1', 'SPP_Bin_Con_2', 'SPP_Bin_Con_3', 'SPP_Bin_Con_4', 'SPP_Bin_Con_5', 'SPP_Bin_Con_6', 'SPP_Bin_Con_7', 'SPP_Bin_Con_8', 'SPP_Bin_Con_9', 'SPP_Bin_Con_10',
            //'SPP_Bin_Con_11', 'SPP_Bin_Con_12', 'SPP_Bin_Con_13', 'SPP_Bin_Con_14', 'SPP_Bin_Con_15', 'SPP_Bin_Con_16', 'SPP_Bin_Con_17', 'SPP_Bin_Con_18', 'SPP_Bin_Con_19', 'SPP_Bin_Con_20',
            //'SPP_Bin_Con_21', 'SPP_Bin_Con_22', 'SPP_Bin_Con_23', 'SPP_Bin_Con_24', 'SPP_Bin_Con_25', 'SPP_Bin_Con_26', 'SPP_Bin_Con_27', 'SPP_Bin_Con_28', 'SPP_Bin_Con_29',
            'SPP_Num', 'SPP_Area', 'SPP_Vol', 'SPP_MD', 'SPP_ED', 'SPP_MVD',
            'T1_Str', 'T1_O3', 'T1_Flowa', 'T1_Flowb', 'T1_Pres', 'T1_Bncht', 'T1_Lmpt',
            'T2_Str', 'T2_So2', 'T2_Smplfl', 'T2_Pmtv', 'T2_Pres', 'T2_Rctt', 'T2_Lmpv', 'T2_Intt',
            'T3_Str', 'T3_No', 'T3_No2', 'T3_Nox', 'T3_Pre', 'T3_Intt', 'T3_Pres', 'T3_Smplf',
            'T4_Str', 'T4_Co', 'T4_Intt', 'T4_Cht', 'T4_Pres', 'T4_Smplfl', 'T4_Intensity', 'T4_Speed', 'T4_Biasv'
        ];

        var selectElements;
        var selectElemtStr = '';
        var chartDivInner = '';
        var elementChartArray = [];
        var routeData = null;
        var curPlaneLog = null;

        var sel_strart = 0;//记录选择区域起始位置索引
        var sel_end = 0;   //记录选择区域结束位置索引

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

        var effect = {
            show: true,
            //scaleSize: require('zrender/tool/env').canvasSupported ? 1 : 2,
            period: 30,             // 运动周期，无单位，值越大越慢
            color: '#fff',
            shadowColor: 'rgba(220,220,220,0.4)',
            shadowBlur: 5
        };

        var defaultStr = "请选择";
        
        var workIDObj = null;
        var mapChart = echarts.init(document.getElementById('echartMapContainer'));
        var optionMapChart = {
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

        Init();

        function itemStyle(idx) {
            return {
                normal: {
                    color: '#fff',
                    borderWidth: 1,
                    borderColor: ['rgba(30,144,255,1)', 'lime'][idx],
                    lineStyle: {
                        //shadowColor : ['rgba(30,144,255,1)','lime'][idx], //默认透明
                        //shadowBlur: 10,
                        //shadowOffsetX: 0,
                        //shadowOffsetY: 0,
                        type: 'solid'
                    }
                }
            }
        };


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
        * 
        */
        function GetIdByYearAndMonth(selYear, selMonth) {
            if (workIDObj) {

                var yearMon = commonHelper.Num2Str(selYear, 4) + commonHelper.Num2Str(selMonth, 2);

                if ($('#cobCode') != null) {
                    $('#cobCode').html("");
                    var opstr = "<option>" + defaultStr + "</option>";
                    for (var i = 0; i < workIDObj.length - 1; i++) {
                        if (workIDObj[i].indexOf(yearMon)==0)
                            opstr += "<option value=" + workIDObj[i] + ">" + workIDObj[i] + "</option>";
                    }
                    $('#cobCode').html(opstr);
                }
            }
        }


        /**
        * 初始化地图
        */
        function InitMap() {
            if (mapChart != null) {
                $.getJSON(appConfig.webPageUrl + '/Assets/Geojson/sheng_JJJ_geo.json', function (data) {
                    echarts.registerMap('JJJ', data);
                    //sheng_JJJ_geo JJJ
                    mapChart.setOption(optionMapChart);
                });
            }
        }


        function Init() {
            var checkStr = '';
            for (var i = 0; i < elemntArray.length; i++) {
                checkStr += '<div class="checkbox col-md-2 col-sm-3 col-xs-6"><label><input name="checkboxElemet" type="checkbox" value="' + elemntArray[i] + '">' + elemntArray[i] + '</label></div>';
            }
            $('#plane_data_element').html(checkStr);

            BindYear();
            BindMonth();
            BindSelectChange();
            InitMap();

            planeDataMain.GetMainInfo(GetWorkID);

            //planeCob.Init();
            //planeMap.InitMap();

            /**
            * 作业信息查询
            */
            $('#btn_query').click(function () {
                var selID = $("#cobCode").children('option:selected').val();
                if (selID != "请选择") {
                    console.log(selID);

                    //getPlaneLogInfo("20060421"); //selID 测试
                    //getPlaneGpsInfo(selID);
                    //getPlanePicInfo("20120809");

                    //planeDataMain.GetLogInfoByID("20060421", setLogInfo);
                    //planeDataMain.GetPicByID("20120809", setCarouselPic);
                    //planeDataMain.GetGpsByID("20170827am", setMapGps);

                    planeDataMain.GetLogInfoByID(selID, setLogInfo);
                    planeDataMain.GetPicByID(selID, setCarouselPic);
                    planeDataMain.GetGpsByID(selID, setMapGps);

                    //planeLog.GetLogInfoByID("20060421");
                    //planePic.GetCarouselPicByID('20120809');
                    //planeMap.SetGpsByID(selID);

                }
                else {
                    alert('请选择作业编号');
                }
            });

            /**
            * 查询要素事件
            */
            $('#btn_view').click(function () {
                var selID = $("#cobCode").children('option:selected').val();
                if (selID != "请选择") {
                    console.log(selID);

                    chartDivInner = '';
                    //选中要素
                    selectElements = new Array();
                    $('input[name="checkboxElemet"]:checked').each(function () {
                        selectElements.push($(this).val());//向数组中添加元素  
                        chartDivInner += getNewChartDiv($(this).val());
                    });
                    selectElemtStr = selectElements.join(',');

                    if (selectElements.length > 0) {

                        //创建表
                        elementChartArray = [];
                        $('#chartContainer').attr('height', selectElements.length * 300);
                        $('#chartContainer').html(chartDivInner);
                        for (var i = 0; i < selectElements.length; i++) {
                            elementChartArray.push(echarts.init(document.getElementById('plane-data-' + selectElements[i])));
                        }
                        echarts.connect(elementChartArray);
                        
                        planeDataMain.GetPlaneDataTxtByIDAndElement(selID, selectElemtStr, setLineChart);//"20170827am"

                        //getSingleWorkInfo(selID, selectElemtStr, 'plane-data-chart');
                    }
                    else {
                        removeChart();
                        $('#chartContainer').attr('height', 0);

                    }
                    //getPlaneLogInfo("20060421"); //selID 测试
                    //getPlanePicInfo("20120809");
                }
                else {

                    //alert('请选择作业编号');
                }
            });

            /**
            * 打包下载压缩包
            * 
            */
            $('#btn_down').click(function () {
                var selID = $("#cobCode").children('option:selected').val();
                if (selID != "请选择") {
                    console.log(selID);

                    selectElements = new Array();
                    $('input[name="checkboxElemet"]:checked').each(function () {
                        selectElements.push($(this).val());//向数组中添加元素  
                        chartDivInner += getNewChartDiv($(this).val());
                    });
                    selectElemtStr = selectElements.join(',');

                    planeDataMain.GetPlaneDataTxtByIDAndElement(selID, selectElemtStr, ExportToExcel);

                }
                else {
                    alert('请选择作业编号');
                }
            });

            var selID = commonHelper.getUrlParms('workid');
            if (selID) {
                //$('#curID').html("作业ID：" + workid);
                //planeDataMain.GetPicByID(workid, setPicList);
                $("#cobCode").text(selID);

                planeDataMain.GetLogInfoByID(selID, setLogInfo);
                planeDataMain.GetPicByID(selID, setCarouselPic);
                planeDataMain.GetGpsByID(selID, setMapGps);

            }
        }


        function removeChart() {
            if (selectElements != null && selectElements.length > 0) {
                for (var i = 0; i < length; i++) {
                    $('#plane-data-' + selectElements[i]).remove();
                }
            }
        }


        function getNewChartDiv(chartName) {
            return '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="plane-data-' + chartName + '" style="height:300px;"></div>';
        }


        function GetWorkID(resultObj) {

            if (resultObj.length == 0)
                return;
            var minYear = parseInt(resultObj[0].WorkDate.substring(0, 4));
            var maxYear = parseInt(resultObj[resultObj.length - 1].WorkDate.substring(0, 4));

            workIDObj = [];

            for (var i = 0; i < resultObj.length; i++) {
                //var curYear = parseInt(resultObj[i].WorkDate.substring(0, 4));
                //var curMonth = parseInt(resultObj[i].WorkDate.substring(5, 2));
                //var yearIndex = curYear - minYear;

                //if (resultObj[i].Purpose > 0 || resultObj[i].Log != "") {
                    //日期  次数  ID  起始时间 结束时间 
                    
                    workIDObj.push(resultObj[i].PlaneWorkInfoID);

                //}
            }

        }
        
        /*
        * 设置折线图数据
        */
        function setLineChart(resultObj) {

            var dataArray = resultObj.split(';');

            //必带字段 时间+经度、纬度、海拔
            cdates = dataArray.map(function (item) {
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
        }

        /*
        * 设置日志信息
        */
        function setLogInfo(result){
            if (result.length > 0) {
                var curPlaneLog = result[0];

                var fileurl = appConfig.dataServerUrl + "/WebPlaneData/" + curPlaneLog.PlaneWorkInfoID.substring(0, 4) + "/" + curPlaneLog.PlaneWorkInfoID + "/Log/";
                curPlaneLog.Doc = fileurl + curPlaneLog.FileName;//'<a href="' + fileurl + curPlaneLog.FileName + '">' + curPlaneLog.FileName + '</a>';
                curPlaneLog.Pdf = appConfig.pdfUrl + "?file=" + fileurl + curPlaneLog.FileName.replace(".doc", ".pdf");// '<a href="' + appConfig.webUrl + "?file=" + fileurl + curPlaneLog.FileName.replace(".doc", ".pdf") + '"  target="_blank">预览</a>';

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
        }
       
        /*
        * 设置滚动图片内容
        */
        function setCarouselPic(result) {
            if (result.length > 0) {
                //滚动 导航添加
                //     内容添加
                //     事件绑定
                var ulHtml = "";
                var itemHtml = "";
                for (var i = 0; i < result.length; i++) {
                    if (i == 0) {
                        ulHtml += '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>';
                        itemHtml += '<div class="item active" ><img src="' + appConfig.fileServerUrl + result[i].Path + result[i].FileName + '" alt= "' + result[i].Time + '" class="img-responsive center-block" style="max-height:400px;"/></div>';
                    }
                    else {
                        ulHtml += '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>';
                        itemHtml += '<div class="item"><img src="' + appConfig.fileServerUrl + result[i].Path + result[i].FileName + '" alt= "' + result[i].Time + '" class="img-responsive center-block" style="max-height:400px;"/></div>';
                    }
                }

                $('#ul_carousel').html(ulHtml);
                $('#item_carousel').html(itemHtml);
                $("#myCarousel").carousel({
                    interval: 2000
                });

                $('.carousel-control').css('line-height', $('.carousel-innerimg').height() + 'px');
                $(window).resize(function () {
                    var $height = $('.carousel-inner img').eq(0).height() || $('.carousel-inner img').eq(1).height() || $('.carousel-inner img').eq(2).height();
                    $('.carousel-control').css('line-height', $height + 'px');
                });
            }
        }

        /*
        * 设置航迹
        */
        function setMapGps(result) {
            var dataArray = result.split(';');
            if (dataArray.length == 0)
                return;

            var routeData = [];
            var interP = 50;
            var numP = Math.round(dataArray.length / interP);
            for (var i = 0; i < numP; i++) {
                var subArray = dataArray[i * interP].split(',');
                if (i < numP - 1) {
                    routeData.push([parseFloat(subArray[0]), parseFloat(subArray[1])]);
                }
            }

            if (mapChart) {
                //optionMapChart.title.text = workID + "航迹图";
                optionMapChart.series = [
                    {
                        type: 'lines',
                        coordinateSystem: 'geo',
                        polyline: true,
                        data: [
                            {
                                //name: workID,
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

        /**
        * 导出为excel
        */
        function JSONToExcelConvertor(JSONData, FileName, ShowLabel) {

            //先转化json
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            var excel = '<table>';

            //设置表头
            var row = "<tr>";
            for (var i = 0, l = ShowLabel.length; i < l; i++) {
                row += "<td>" + ShowLabel[i].value + '</td>';
            }

            //换行
            excel += row + "</tr>";

            //设置数据
            for (var i = 0; i < arrData.length; i++) {
                var row = "<tr>";
                for (var index in arrData[i]) {
                    var value = arrData[i][index].value === "." ? "" : arrData[i][index].value;
                    row += '<td>' + value + '</td>';
                }
                excel += row + "</tr>";
            }

            excel += "</table>";

            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
            excelFile += '; charset=UTF-8">';
            excelFile += "<head>";
            excelFile += "<!--[if gte mso 9]>";
            excelFile += "<xml>";
            excelFile += "<x:ExcelWorkbook>";
            excelFile += "<x:ExcelWorksheets>";
            excelFile += "<x:ExcelWorksheet>";
            excelFile += "<x:Name>";
            excelFile += "{worksheet}";
            excelFile += "</x:Name>";
            excelFile += "<x:WorksheetOptions>";
            excelFile += "<x:DisplayGridlines/>";
            excelFile += "</x:WorksheetOptions>";
            excelFile += "</x:ExcelWorksheet>";
            excelFile += "</x:ExcelWorksheets>";
            excelFile += "</x:ExcelWorkbook>";
            excelFile += "</xml>";
            excelFile += "<![endif]-->";
            excelFile += "</head>";
            excelFile += "<body>";
            excelFile += excel;
            excelFile += "</body>";
            excelFile += "</html>";

            var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

            var link = document.createElement("a");
            link.href = uri;


            link.style = "visibility:hidden";
            link.download = FileName + ".xls";


            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        //$('#btn_down').click(function () {

        //    Extport();

        //});

        function Extport() {

            var data = {
                "title": [
                    { "value": "集团", "type": "ROW_HEADER_HEADER", "datatype": "string" },
                    { "value": "创始人", "type": "ROW_HEADER_HEADER", "datatype": "string" }
                ],
                "data": [
                    [
                     { "value": "阿里巴巴", "type": "ROW_HEADER" },
                     { "value": "马云", "type": "ROW_HEADER" }
                    ]
                ]
            };
            if (data == '')
                return;
            JSONToExcelConvertor(data.data, "Report", data.title);

        }

        /**
        * 选中项导出到excel
        */
        function ExportToExcel(obj){
            var excel = '<table>';
            var eleArray = selectElemtStr.split(',');

            var rowTitle = "<tr><td>ID</td><td>Time</td><td>Lon</td><td>Lat</td><td>Alt</td>";
            for (var i = 0; i < eleArray.length; i++) {
                rowTitle += "<td>" + eleArray[i] + "</td>";
            }
            rowTitle += "</tr>";
            excel += rowTitle;

            var dataArray = obj.split(';');
            for (var i = 0; i < dataArray.length; i++) {
                var curData = dataArray[i].split(',');
                var curRow = "<tr>";
                for (var j = 0; j < curData.length; j++) {
                    curRow += "<td>" + curData[j] + "</td>";
                }
                curRow += "</tr>";
                excel += curRow;
            }
         

            excel += "</table>";

            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
            excelFile += '; charset=UTF-8">';
            excelFile += "<head>";
            excelFile += "<!--[if gte mso 9]>";
            excelFile += "<xml>";
            excelFile += "<x:ExcelWorkbook>";
            excelFile += "<x:ExcelWorksheets>";
            excelFile += "<x:ExcelWorksheet>";
            excelFile += "<x:Name>";
            excelFile += "{worksheet}";
            excelFile += "</x:Name>";
            excelFile += "<x:WorksheetOptions>";
            excelFile += "<x:DisplayGridlines/>";
            excelFile += "</x:WorksheetOptions>";
            excelFile += "</x:ExcelWorksheet>";
            excelFile += "</x:ExcelWorksheets>";
            excelFile += "</x:ExcelWorkbook>";
            excelFile += "</xml>";
            excelFile += "<![endif]-->";
            excelFile += "</head>";
            excelFile += "<body>";
            excelFile += excel;
            excelFile += "</body>";
            excelFile += "</html>";

            var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

            var link = document.createElement("a");
            link.href = uri;


            link.style = "visibility:hidden";
            link.download =  + "数据导出.xls";


            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);


        }

});