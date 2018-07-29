/**
*  照片查询
*  
*/
define('planePic', ['jquery', 'appConfig', 'bootstrap', 'bootstrapValidator','bootstrapTable', 'echarts', 'commonHelper','baguetteBox'], function () {

    "use strict";
    var module = null;

    var echarts = require('echarts');
    var commonHelper = require('commonHelper');
    var baguetteBox = require('baguetteBox');

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
    var curSelectDay;

    /**
     * 按作业ID获取照片
     * @param {string} dateStr
     */
    function GetPicByDate(dateStr) {
        var options = {
            type: "POST",
            url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlanePicByDateID",
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            data: "{'dateStr':'" + dateStr + "'}",
            success: function (response) {
                var picData = jQuery.parseJSON(response);
                picArray = jQuery.parseJSON(picData.d);
                if (picArray.length > 0) {

                    //var picContent = '';
                    var picContent2 = '';

                    for (var i = 0; i < picArray.length; i++) {

                        //picContent += '<div class="col-sm-6 col-md-4">'
                        //    + '<a class="lightbox" href= "' + appConfig.fileServerUrl + picArray[i].Path + picArray[i].FileName +'"  target="_blank">'
                        //    + '<img src="' + appConfig.fileServerUrl + picArray[i].Path + picArray[i].FileName + '" alt="' + picArray[i].Time+'">'
                        //    + '</a>'
                        //    + '</div >';

                        picContent2 += '<div class="col-sm-6 col-md-4">'
                            + '<div class="thumbnail">'
                            + '<a class="lightbox" href="' + appConfig.fileServerUrl + picArray[i].Path + picArray[i].FileName + '"  target="_blank">'
                            + '<img src="' + appConfig.fileServerUrl + picArray[i].Path + picArray[i].FileName + '" alt="' + picArray[i].FileName + '">'
                            + '</a>'
                            + '<div class="caption">'
                            + '<h3>' + picArray[i].Time + '</h3>'
                            //+ '<p>' + picArray[i].Time+'</p>'
                            + '</div>'
                            + '</div>'
                            + '</div>';
                    }

                    //$("#picContainer").html(picHtml);
                    $("#picContainer").html(picContent2);

                    baguetteBox.run('.tz-gallery');
                }
            },
            error: function (err) {
                var data = JSON.parse(err.responseText);
            }
        }
        $.ajax(options);
    }

    /**
     * 按年获取照片信息
     * @param {number} startYear 起始年
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

        var options = {
            type: "POST",
            url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlanePicByYear",
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            //data:"{'year':'2008'}",
            data: "{'yearstr':'" + yearStr + "'}",
            success: function (response) {
                var rawData2 = jQuery.parseJSON(response);

                var dataArray = rawData2.d.split('.');
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
                                return [subArray[0], subArray[1]];
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

            },
            error: function (err) {
                var data = JSON.parse(err.responseText);
            }
        }
        $.ajax(options);
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
            var yearCount = curDate.getFullYear() - startYear+1;

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
        }
    }

    /**
    * 获取最近照片
    * @param {Number} count 搜索范围
    * @param {Number} outcount 输出个数
    */
    function GetLastPic(count, outcount) {
        var options = {
            type: "POST",
            //url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlanePicByCount",
            url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlanePicByDateID",
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
                    for (var i = 0; i < Math.min(result.length, 6); i++) {
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
     * 获取照片信息
     * @param {string} dateStr
     */
    function GetCarouselPicByID(workID) {
        var options = {
            type: "POST",
            url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlanePicByDateID",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: "{'dateStr':'" + workID + "'}",
            success: function (response) {

                var result = jQuery.parseJSON(response.d);
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
            },
            error: function (err) {
                var data = JSON.parse(err.responseText);
            }
        }
        $.ajax(options);
    }


    var dateStr = commonHelper.getUrlVars();
    if (dateStr['dateStr'] != null) {
        GetPicByDate(dateStr['dateStr'].replace('-', '').replace('-', ''));
        $('#curID').html("作业编号:" + dateStr['dateStr']);
    }

    var echarts = require('echarts');
    var bootstrapValidator = require('bootstrapValidator');
    var module = null;


    $(function () {
        $('form').bootstrapValidator({
            message: '值不能为空',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                txtStartTime: {
                    validators: {
                        notEmpty: {
                            message: '起始时间不能为空'
                        }
                    }
                },
                txtEndTime: {
                    validators: {
                        notEmpty: {
                            message: '结束时间不能为空'
                        }
                    }
                }
            }
        });
    });

    var TableInit = function () {
        var oTableInit = new Object();
        //初始化Table
        oTableInit.Init = function () {
            if (document.getElementById('tab_PlanePic') != null) {
                $('#tab_PlanePic').bootstrapTable({

                    toolbar: '#toolbar',                //工具按钮用哪个容器
                    striped: true,                      //是否显示行间隔色
                    cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true,                   //是否显示分页（*）
                    sortable: true,                     //是否启用排序
                    sortOrder: "asc",                   //排序方式
                    sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                    pageNumber: 1,                       //初始化加载第一页，默认第一页
                    pageSize: 10,                       //每页的记录行数（*）
                    pageList: [5, 10, 25, 50, 100],        //可供选择的每页的行数（*）
                    search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                    strictSearch: true,
                    showColumns: true,                  //是否显示所有的列
                    showRefresh: true,                  //是否显示刷新按钮
                    minimumCountColumns: 2,             //最少允许的列数
                    clickToSelect: true,                //是否启用点击选中行
                    height: 600,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                    uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
                    showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
                    cardView: false,                    //是否显示详细视图
                    detailView: false,                   //是否显示父子表

                    columns: [{
                        field: 'PlaneWorkInfoID',
                        title: '作业编号',
                        sortable: true,
                        visible: true
                    }, {
                        field: 'date',
                        title: '日期',
                        sortable: true
                    }, {
                        field: 'count',
                        title: '照片数量（张）',
                        sortable: true
                    }, {
                        field: 'down',
                        title: '资源',
                        sortable: true
                    }],
                    sortName: 'date',
                    sortOrder: 'desc'
                });
            }
        };
        //得到查询的参数
        oTableInit.queryParams = function (params) {
            var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                limit: params.limit,   //页面大小
                offset: params.offset,  //页码
                departmentname: $("#txt_search_departmentname").val(),
                statu: $("#txt_search_statu").val()
            };
            return temp;
        };
        return oTableInit;
    }

    function InitTable() {

        $('#btn_query').click(function () {
            var bootstrapValidator = $("#form_time").data('bootstrapValidator');
            bootstrapValidator.validate();

            if (bootstrapValidator.isValid()) {
                var startT = $('#txtStartTime').val();
                var endT = $('#txtEndTime').val();

                console.log(startT + " " + endT);

                var option = {
                    type: "POST",
                    url: appConfig.dataServerUrl + "/WebService/Plane/WM_Plane_WorkInfo.asmx/GetPlanePicByTime",
                    contentType: "application/json; charset=utf-8",
                    dataType: "text",
                    data: "{'startTime':'" + startT + "','endTime':'" + endT + "'}",
                    success: function (response) {
                        var rawData2 = jQuery.parseJSON(response);
                        var dataArray = jQuery.parseJSON(rawData2.d);

                        for (var i = 0; i < dataArray.length; i++) {
                            dataArray[i].down = '<a href="' + appConfig.webPageUrl + '/Pages/Plane/Pages/PlanePicInfo.html?dateStr=' + dataArray[i].PlaneWorkInfoID + '" target="_blank">查看</a>';
                        }

                        $('#tab_PlanePic').bootstrapTable('load', dataArray);
                    },
                    error: function (err) {
                        console.log(JSON.parse(err.responseText));
                    }
                }

                $.ajax(option);
            }
        });

        var tableOption = new TableInit();
        tableOption.Init();

    }

    module = {
        GetPicByID: GetPicByDate,
        InitNullCalendar: InitNullCalendar,
        InitTable: InitTable,

        /**
        * 刷新日历
        */
        RefreshCalendar: GetPicCalenderYearInfoFromYear,

        /**
        * 获取最近的几张图片
        */
        GetLastPic: GetLastPic,
        /**
        * 按作业编号获取滚动图片
        */
        GetCarouselPicByID: GetCarouselPicByID
    };

    return module;
});