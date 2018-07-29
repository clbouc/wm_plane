require(
    [
        'jquery',
        'echarts',
        'bootstrap',
        'commonHelper',
        'bootstrapSelect',
        'bootstrapSelect_CN',
        'bootstrapFileInput',
        'bootstrapFileInput_zh',
        'bootstrapDatetimepicker',
        'bootstrapDatetimepicker_CN',
        'bootstrapValidator',
        'toastr',
        'select2',
        'uploadManager',
        'planeDataMain'
    ],
    function () {

        "use strict";

        var toastr = require('toastr');
        toastr.options.positionClass = 'toast-bottom-right';

        //支持手动输入
        $(".js-example-tags").select2({
            placeholder: "请至少选择一项",
            tags: true
        })


        //var echarts = require('echarts');
        var commonHelper = require("commonHelper");
        var planeDataMain = require("planeDataMain");
        var uploadManager = require('uploadManager');

        var imgfileoptions = {
            language: 'zh',
            uploadUrl: uploadManager.serverUrl, //上传的地址
            allowedFileExtensions: ['jpg', 'gif', 'png', 'bmp'],//接收的文件后缀
            showUpload: true, //是否显示上传按钮
            showCaption: false,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式     
            //dropZoneEnabled: false,//是否显示拖拽区域
            //minImageWidth: 50, //图片的最小宽度
            //minImageHeight: 50,//图片的最小高度
            //maxImageWidth: 1000,//图片的最大宽度
            //maxImageHeight: 1000,//图片的最大高度
            //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
            //minFileCount: 0,
            maxFileCount: 200, //表示允许同时上传的最大文件个数
            enctype: 'multipart/form-data',
            validateInitialCount: true,
            previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
            msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",

        }

        var logfileoptions = {
            language: 'zh',
            uploadUrl: uploadManager.serverUrl, //上传的地址
            allowedFileExtensions: ['doc', 'docx'],//接收的文件后缀
            showUpload: true, //是否显示上传按钮
            showCaption: false,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式     
            //dropZoneEnabled: false,//是否显示拖拽区域
            //minImageWidth: 50, //图片的最小宽度
            //minImageHeight: 50,//图片的最小高度
            //maxImageWidth: 1000,//图片的最大宽度
            //maxImageHeight: 1000,//图片的最大高度
            //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
            //minFileCount: 0,
            maxFileCount: 1, //表示允许同时上传的最大文件个数
            //enctype: 'multipart/form-data',
            validateInitialCount: true,
            previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
            msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",

        }

        var thermofileoptions = {
            language: 'zh',
            uploadUrl: uploadManager.serverUrl, //上传的地址
            allowedFileExtensions: ['txt'],//接收的文件后缀
            showUpload: true, //是否显示上传按钮
            showCaption: false,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式     
            //dropZoneEnabled: false,//是否显示拖拽区域
            //minImageWidth: 50, //图片的最小宽度
            //minImageHeight: 50,//图片的最小高度
            //maxImageWidth: 1000,//图片的最大宽度
            //maxImageHeight: 1000,//图片的最大高度
            //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
            //minFileCount: 0,
            maxFileCount: 4, //表示允许同时上传的最大文件个数
            enctype: 'multipart/form-data',
            validateInitialCount: true,
            previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
            msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        }

        var dmtfileoptions = {
            language: 'zh',
            uploadUrl: uploadManager.serverUrl, //上传的地址
            //allowedFileExtensions: ['txt','csv','ini'],//接收的文件后缀
            showUpload: true, //是否显示上传按钮
            showCaption: false,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式     
            //dropZoneEnabled: false,//是否显示拖拽区域
            //minImageWidth: 50, //图片的最小宽度
            //minImageHeight: 50,//图片的最小高度
            //maxImageWidth: 1000,//图片的最大宽度
            //maxImageHeight: 1000,//图片的最大高度
            //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
            //minFileCount: 0,
            maxFileCount: 1000, //表示允许同时上传的最大文件个数
            enctype: 'multipart/form-data',
            validateInitialCount: true,
            previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
            msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        }

        var gpsfileoptions = {
            language: 'zh',
            uploadUrl: uploadManager.serverUrl, //上传的地址
            allowedFileExtensions: ['txt'],//接收的文件后缀
            showUpload: true, //是否显示上传按钮
            showCaption: false,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式     
            //dropZoneEnabled: false,//是否显示拖拽区域
            //minImageWidth: 50, //图片的最小宽度
            //minImageHeight: 50,//图片的最小高度
            //maxImageWidth: 1000,//图片的最大宽度
            //maxImageHeight: 1000,//图片的最大高度
            //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
            //minFileCount: 0,
            maxFileCount: 4, //表示允许同时上传的最大文件个数
            enctype: 'multipart/form-data',
            validateInitialCount: true,
            previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
            msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        }

        function init() {

            //文件选择
            $("#file_log").fileinput(logfileoptions);
            $("#file_thermo").fileinput(thermofileoptions);
            $("#file_pic").fileinput(imgfileoptions);
            $("#file_dmt").fileinput(dmtfileoptions);
            $("#file_gps").fileinput(gpsfileoptions);

            $('.mytimeMinute').datetimepicker({
                format: 'yyyy-mm-dd hh:ii:00',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                showMeridian: 1,
                minuteStep: 1, //最小分钟间隔
                minView: 0
            });
           
            //表单验证
            $('#form_info').bootstrapValidator({
                live: "",
                message: '输入值不合法',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                //submitHandler:function(validator,$('#form_register'),){

                //},
                fields: {
                    in_workid: {
                        message: '',
                        validators: {
                            notEmpty: {
                                message: '作业编号不能为空！'
                            }
                        }
                    },
                    sel_reporter: {
                        message: '录入人员',
                        validators: {
                            notEmpty: {
                                message: '不能为空！'
                            }
                        }
                    },
                    indt_startTime: {
                        message: '',
                        validators: {
                            notEmpty: {
                                message: '不能为空'
                            }
                        }
                    },
                    indt_endTime: {
                        message: '',
                        validators: {
                            notEmpty: {
                                message: '不能为空'
                            }
                        }
                    },
                    indt_startWorkTime: {
                        message: '',
                        validators: {
                            notEmpty: {
                                message: '不能为空'
                            }
                        }
                    },
                    indt_endWorkTime: {
                        message: '',
                        validators: {
                            notEmpty: {
                                message: '不能为空'
                            }
                        }
                    },
                    sel_airport_start: {
                        message: '',
                        validators: {
                            notEmpty: {
                                message: '不能为空'
                            }
                        }
                    },
                    sel_airport_end: {
                        message: '',
                        validators: {
                            notEmpty: {
                                message: '不能为空'
                            }
                        }
                    }
                }
            });

            $('#btn_save').click(function () {

                //$('#form_info').data('bootstrapValidator').validate();
                //var flag = $('#form_info').data('bootstrapValidator').isValid();

                var planeLogFile = document.getElementById('file_log').files;
                var planePicFolder = document.getElementById('file_pic').files;
                var planeThermoFiles = document.getElementById('file_thermo').files;
                var planeDmtFolder = document.getElementById('file_dmt').files;

                //if (flag) {

                    var recordObj = {
                        PlaneWorkInfoID: $('#in_workid').val(),
                        //Purpose: $('#sel_purpose').val(),
                        //StartTime: $('#indt_startTime').val(),
                        //EndTime: $('#indt_endTime').val(),
                        //StartWorkTime: $('#indt_startWorkTime').val(),
                        //EndWorkTime: $('#indt_endWorkTime').val(),
                        //StartAirport: $('#sel_airport_start').val(),
                        //EndAirport: $('#sel_airport_end').val(),
                        //Reporter: $('#sel_reporter').val()
                    }

                    //var recordjson = JSON.stringify(recordObj);

                    //planeDataMain.UpNewRecord(recordjson, uploadCallBack);


                planeDataMain.UploadFile(recordObj.PlaneWorkInfoID, "Log", planeLogFile[0], uploadCallBack);
                planeDataMain.UploadFolder(recordObj.PlaneWorkInfoID, "PIC", planePicFolder, uploadCallBack);
                    //planeDataMain.UploadFile(recordObj.PlaneWorkInfoID, "DMT", planeLogFile, uploadCallBack);
                    //planeDataMain.UploadFile(recordObj.PlaneWorkInfoID, "FlightRoute", planeLogFile, uploadCallBack);
                    //planeDataMain.UploadFile(recordObj.PlaneWorkInfoID, "Thermo", planeLogFile, uploadCallBack);

                planeDataMain.UploadFolder(recordObj.PlaneWorkInfoID, "Thermo", planeThermoFiles, uploadCallBack);
                planeDataMain.UploadFolder(recordObj.PlaneWorkInfoID, "DMT", planeDmtFolder, uploadCallBack);

                //planeDmtFolder[0].webkitRelativePath
                //planeDmtFolder[0].name;

                //}

            });


            $('#file_pic').onchange = function (e) {
                var file = $('#file_pic').val();
                if (file != "") {

                }

                var files = e.target.files;

                for (var i = 0, f; f = files[i]; i++) {
                    
                }
            }

            $('#btn_reset').click(function () {
                


            });

        }

        function uploadCallBack(obj) {


        } 

        init();

      
    }
);