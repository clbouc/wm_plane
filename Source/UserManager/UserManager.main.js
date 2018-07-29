
require([
    'jquery',
    'appConfig',
    'bootstrap',
    'bootstrapValidator',
    'bootstrapTable',
    'bootstrapSelect',
    'bootstrapCustomMsg',
    'toastr',
    'echarts',
    'commonHelper'
],
    function () {

        "use strict";

        var toastr = require('toastr');
        var appConfig = require('appConfig');
        toastr.options.positionClass = 'toast-bottom-right';

        var curEditID = null;

        //初始化表样式
        function Init() {

            //添加
            $('#btn_add').bind('click', function () {
                curEditID = null;
                $('#register_title').html('添加');
                $('#sel_unit').selectpicker('val', "");
                $('#sel_department').selectpicker('val', "");
                $('#sel_gender').selectpicker('val', "");
                $('#sel_position').selectpicker('val', "");
                $('#txt_name').val("");
                $('#txt_useid').val("");
                $('#txt_birthday').val("");
                $('#txt_qq').val("");
                $('#txt_email').val("");
                $('#txt_telphone').val("");

                $('#register').modal('show');
            });

            //编辑
            $('#btn_edit').bind('click', function () {
                var selUser = $('#tb_user').bootstrapTable('getSelections');
                if (selUser.length == 1) {

                    $('#register_title').html('编辑');
                    curEditID = selUser[0].ID;
                    $('#sel_unit').selectpicker('val', selUser[0].Unit);
                    $('#sel_department').selectpicker('val', selUser[0].Department);
                    $('#sel_gender').selectpicker('val', selUser[0].Gender);
                    $('#sel_position').selectpicker('val', selUser[0].Position);
                    $('#txt_name').val(selUser[0].Name);
                    $('#txt_useid').val(selUser[0].UserID);
                    $('#txt_birthday').val(selUser[0].Birthday.substring(0, 10));//'2018-03-01');//.replace('-','/'));selUser[0].Birthday.substring(0,9)
                    $('#txt_qq').val(selUser[0].QQ);
                    $('#txt_email').val(selUser[0].Email);
                    $('#txt_telphone').val(selUser[0].Telephone);

                    $('#register').modal('show');
                }
                else {
                    toastr.warning('只能选择一行进行编辑');
                }
            });

            //删除
            $('#btn_delete').bind('click', function () {
                var ids = $.map($('#tb_user').bootstrapTable('getSelections'), function (row) {
                    return row.ID;
                });

                if (ids.length > 0) {
                    Ewin.confirm({ message: "确认要删除选择的数据吗？" }).on(function (e) {
                        if (!e) {
                            return;
                        }
                        else {
                            //后台删除ID
                            var options = {
                                type: "POST",
                                url: appConfig.dataServerUrl + "/UserManager/UserManager.asmx/DeleteUserByID",
                                contentType: "application/json; charset=utf-8",
                                dataType: "text",
                                data: "{'idstr':" + ids + "}",
                                success: function (response) {
                                    $('#tb_user').bootstrapTable('remove', { field: 'ID', values: ids });
                                },
                                error: function (err) {
                                    toastr.warning(err.responseText);
                                }
                            }
                            $.ajax(options);
                        }
                    }
                    );

                }
                else {
                    toastr.warning('请选择要删除的人员！');
                }
            });

            //提交
            $('#btn_submit').bind('click', function () {

                $('#form_register').data('bootstrapValidator').validate();
                var flag = $('#form_register').data('bootstrapValidator').isValid();

                if (flag) {

                    //获取字段信息
                    var unit = $('#sel_unit').val();
                    var department = $('#sel_department').val();
                    var name = $('#txt_name').val();
                    var position = $('#sel_position').val();
                    var gender = $('#sel_gender').val();
                    var birthday = $('#txt_birthday').val();
                    var qq = $('#txt_qq').val();
                    var email = $('#txt_email').val();
                    var telephone = $('#txt_telphone').val();

                    var userInfo = 'unit:' + unit;

                    if (department) {
                        userInfo += '&department:' + department;
                    }
                    if (name) {
                        userInfo += '&name:' + name;
                    }
                    if (position) {
                        userInfo += '&position:' + position;
                    }
                    if (gender) {
                        userInfo += '&gender:' + gender;
                    }
                    if (birthday) {
                        userInfo += '&birthday:' + birthday;
                    }
                    if (qq) {
                        userInfo += '&qq:' + qq;
                    }
                    if (email) {
                        userInfo += '&email:' + email;
                    }
                    if (telephone) {
                        userInfo += '&telephone:' + telephone;
                    }

                    var backUrl = appConfig.dataServerUrl + "/UserManager/UserManager.asmx/AddNewUser";
                    if (curEditID != null) {
                        userInfo += '&ID:' + curEditID;
                        backUrl = appConfig.dataServerUrl + "/UserManager/UserManager.asmx/UpdateUserInfo";
                    }

                    var options = {
                        type: "POST",
                        url: backUrl,
                        contentType: "application/json; charset=utf-8",
                        dataType: "text",
                        data: "{'userInfo':'" + userInfo + "'}",
                        success: function (response) {
                            var resData = jQuery.parseJSON(response);
                            if (resData.d == 'success') {
                                $('#register').modal('hide');
                                curEditID = null;
                                toastr.success('保存成功！');
                                //刷新用户列表
                                RefreshTable();
                            }
                            else if (resData.d == 'fail') {
                                toastr.success('保存失败！');
                            }
                            else {
                                toastr.success(resData.d);
                            }
                        },
                        error: function (err) {
                            var data = JSON.parse(err.responseText);
                        }
                    }
                    $.ajax(options);
                }
            });

            //表格样式设置
            $('#tb_user').bootstrapTable({

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
                search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                showColumns: true,                  //是否显示所有的列
                showRefresh: false,                  //是否显示刷新按钮
                minimumCountColumns: 2,             //最少允许的列数
                clickToSelect: true,                //是否启用点击选中行
                height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
                showToggle: false,                   //是否显示详细视图和列表视图的切换按钮
                cardView: false,                    //是否显示详细视图
                detailView: false,                  //是否显示父子表
                columns: [
                    {
                        checkbox: true
                    },
                    {
                        field: 'ID',
                        title: 'ID',
                        sortable: true,
                        visible: false
                    },
                    {
                        field: 'Name',
                        title: '姓名',
                        sortable: true
                    },
                    {
                        field: 'UserID',
                        title: '用户名',
                        sortable: true
                    },
                    {
                        field: 'Birthday',
                        title: '出生日期',
                        sortable: true
                    },
                    {
                        field: 'Gender',
                        title: '性别',
                        sortable: true
                    },
                    {
                        field: 'Unit',
                        title: '单位',
                        sortable: true,
                        visible: false
                    },
                    {
                        field: 'Department',
                        title: '科室',
                        sortable: true
                    },
                    {
                        field: 'Position',
                        title: '职位',
                        sortable: true
                    },
                    {
                        field: 'Email',
                        title: '邮箱'
                    },
                    {
                        field: 'Telephone',
                        title: '电话'
                    },
                    {
                        field: 'QQ',
                        title: 'QQ',
                        visible: false
                    },
                    {
                        field: 'Remark',
                        title: '备注',
                        visible: false
                    }
                    //,
                    //{
                    //    field: 'Button',
                    //    title: '操作',
                    //    enents: operateEvents1,
                    //    formatter:AddFunctionAlty
                    //}
                ],
                sortName: 'Department'
            });

            //表单验证
            $('#form_register').bootstrapValidator({
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                //submitHandler:function(validator,$('#form_register'),){
                
                //},
                fields: {
                    sel_unit:{
                        message: '用户单位',
                        validators: {
                            notEmpty: {
                                message:'用户单位不能为空！'
                            }
                        }
                    },
                    sel_department:{
                        message: '科室部门',
                        validators: {
                            notEmpty: {
                                message:'科室部门不能为空！'
                            }
                        }
                    },
                    txt_name: {
                        message: '姓名验证失败',
                        validators: {
                            notEmpty: {
                                message: '姓名不能为空'
                            },
                            stringLength: {
                                min: 2,
                                max: 10,
                                message: '姓名长度于2-8个字'
                            }
                            //regexp: {
                            //    regexp: /^[a-zA-Z0-9_]+$/,
                            //    message: '用户名只能包含大写、小写、数字和下划线'
                            //}
                        }
                    },
                    txt_email: {
                        validators: {
                            notEmpty: {
                                message: '邮箱地址不能为空'
                            },
                            emailAddress: {
                                message: '邮箱地址格式有误'
                            }
                        }
                    }
                }
            });

            RefreshTable();
        }

        //刷新表
        function RefreshTable() {

            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/UserManager/UserManager.asmx/GetUserByCondation",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'condation':'Unit=\"北京市人工影响天气办公室\"'}",
                success: function (response) {
                    var userArray = eval(response.d);

                    $('#tb_user').bootstrapTable('load', userArray);
                    $('#tb_user').bootstrapTable('refresh');
                },
                error: function (err) {
                    console.log(err.responseText);
                }
            }
            $.ajax(options);
        }

        //操作
        function AddFunctionAlty(value, row, index) {
            return [
                '<button id="TableEditor" type="button" class= "btn btn-default">编辑</button>',//&nbsp;&nbsp;
                '<button id="TableDelete" type="button" class= "btn btn-default">删除</button>'
            ].join("")
        }

        window.operateEvents1 = {
            "click #TableEditor": function (e, value, row, index) {

                $('#register').modal('show');

            },
            "click #TableDelete": function () {
                $(this).parent().parent().remove();
            }
        }

       
        Init();
    },

    function (err) {
        console.log(err);
    }

);
