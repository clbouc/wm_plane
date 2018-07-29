define('planeSearch', ['jquery', 'echarts', 'bootstrap','bootstrapValidator','appConfig'], function () {

    "use strict";

    var echarts = require('echarts');
    var bootstrapValidator = require('bootstrapValidator');
    var module = null;

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
                        dataArray[i].down = '<a href="' + appConfig.webPageUrl + '/Pages/PlaneManager/Pages/PlanePic.html?dateStr=' + dataArray[i].PlaneWorkInfoID + '" target="_blank">查看</a>';
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

    function Init() {
        var tableOption = new TableInit();
        tableOption.Init();
    }

    module = {
        Init: Init
    }

    return module;

});