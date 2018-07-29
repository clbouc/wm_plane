define('planeSingleInfo', ['jquery','echarts','bootstrap','commonHelper','planePic','planeDT','planeLog','planeCob','planeMap'], function () {

    var module = null;

    var echarts = require('echarts');
    var planePic = require('planePic');
    var planeCob = require('planeCob');
    var planeMap = require('planeMap');
    var planeLog = require('planeLog');
    var planeDT = require('planeDT');
    var commonHelper = require("commonHelper");

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

    function Init() {
        var checkStr = '';
        for (var i = 0; i < elemntArray.length; i++) {
            checkStr += '<div class="checkbox col-md-2 col-sm-3 col-xs-6"><label><input name="checkboxElemet" type="checkbox" value="' + elemntArray[i] + '">' + elemntArray[i] + '</label></div>';
        }
        $('#plane_data_element').html(checkStr);

        planeCob.Init();
        planeMap.InitMap();

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

                planeLog.GetLogInfoByID("20060421");
                planePic.GetCarouselPicByID('20120809');
                planeMap.SetGpsByID(selID);

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

                    //planeDT.cas();

                    getSingleWorkInfo(selID, selectElemtStr, 'plane-data-chart');
                }
                else {
                    removeChart();
                    $('#chartContainer').attr('height', 0);
                    
                }
                //getPlaneLogInfo("20060421"); //selID 测试
                //getPlanePicInfo("20120809");
            }
            else {
                alert('请选择作业编号');
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

            }
            else {
                alert('请选择作业编号');
            }
        });
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

    /**
     * 按要素查询探测数据
     * @param {string} dateStr
     * @param {string} selectElemts
     * @param {string} chartID
     */
    function getSingleWorkInfo(dateStr, selectElemts, chartID) {
        var options = {
            type: "POST",
            url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlaneDataTxtByDateID",
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            data: "{'dateStr':'" + dateStr + "','columns':'" + selectElemts + "'}",
            success: function (response) {
                var rawData2 = jQuery.parseJSON(response);
                var dataArray = rawData2.d.split(';');

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
            },
            error: function (err) {
                var data = JSON.parse(err.responseText);
            }
        }
        $.ajax(options);
    }

    module = {
        Init: Init
    };

    return module;


});