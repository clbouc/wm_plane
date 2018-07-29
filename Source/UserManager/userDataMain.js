define('userDataMain',
    [
        'jquery',
        'appConfig'
    ],
    function () {
        "use strict";

        /*
        * 登录
        */
        function LogIn(userid, pwd, callBack) {

            callBack();
        }

        /*
        * 退出
        */
        function LogOut(callBack) {

            callBack();
        }

        /*
        * 添加用户
        */
        function AddUser(userobj,callBack) {

            callBack();
        }

        /**
        * 删除用户
        */
        function DeleteUser(userid,callBack) {

            callBack();
        }

        /*
        * 用户信息更新
        */
        function UpdateUser(userinfo, callBack) {

            callBack();
        }

        /*
        * 重置用户密码
        */
        function ResetPwd(userid, callBack) {

            callBack();
        }

        /*
        * 按条件查询
        */
        function SearchUserBy(element,value,callBack) {

            if (element == 'unit') {

            }
            else if (element == 'department') {

            }
            else if (element == 'role') {

            }

            callBack();

        }


        /*
        * 添加单位
        */
        function AddUnit(unit,callBack) {

            callBack();
        }

        /*
       * 删除单位
       */
        function DeleteUnit(unit, callBack) {

            callBack();
        }

        /*
       * 更新单位信息
       */
        function UpdateUnit(unit, callBack) {

            callBack();
        }

        /*
        * 查询单位信息
        */
        function SearchUnit(unit, callBack) {

            callBack();
        }

        var model = {
            LogIn: LogIn,
            LogOut: LogOut,

            AddUser: AddUser,
            UpdateUser: UpdateUser,
            DeleteUser: DeleteUser,
            SearchUserBy:SearchUserBy,
            ResetPwd: ResetPwd,

            AddUnit: AddUnit,
            UpdateUnit: UpdateUnit,
            DeleteUnit: DeleteUnit,
            SearchUnit:SearchUnit
        }


        return model;

});