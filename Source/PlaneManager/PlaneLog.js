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
        var planeDataMain = require('planeDataMain');
        var toastr = require('toastr');

        var planeTable = null;
        var curSelectDay = '';
       
        var itemStyle = {
            normal: {
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        };

        var logTable = function () {
            "use strict";

            planeTable = document.getElementById('tab_PlaneLog');
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
                            field: 'PlaneWorkInfoID',
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

                        }
                        else {
                          
                            planeDataMain.GetLogByTime(begintime_, endtime_, setTableContent);

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


        InitNullTable();

        //填充表格
        function setTableContent(result) {

            var fileArray = eval(result);
            for (var i = 0; i < fileArray.length; i++) {
                var fileurl = appConfig.dataServerFileUrl + "/" + fileArray[i].PlaneWorkInfoID.substring(0, 4) + "/" + fileArray[i].PlaneWorkInfoID + "/Log/";
                fileArray[i].Doc = '<a href="' + fileurl + fileArray[i].FileName + '">' + fileArray[i].FileName + '</a>';
                fileArray[i].Pdf = '<a href="' + appConfig.pdfUrl + "?file=" + fileurl + fileArray[i].FileName.replace(".docx", ".pdf").replace(".doc", ".pdf") + '"  target="_blank">预览</a>';
            }

            $('#tab_PlaneLog').bootstrapTable('load', fileArray);
        }
       
        /**
         * 初始化查询表格
         */
        function InitNullTable() {
            var logTab = new logTable();
            logTab.Init();
        }


    }
);