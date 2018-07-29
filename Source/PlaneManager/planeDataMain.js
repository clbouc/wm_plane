define('planeDataMain',
    [
        'jquery',
        'appConfig'
    ],
    function () {

        "use strict";
        var planeIcoPath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';


        /*
        * 
        */
        function GetMainInfo(callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetMainInfo",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //data: "{'startTime':'" + startTime + "','endTime':'" + endTime + "'}",
                success: function (response) {
                    var resultObj = jQuery.parseJSON(response.d);
                    callBack(resultObj);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }

        /*
        *按起止时间获取飞机作业信息
        *@param {any} startTime
        *@param {any} endTime
        */
        function GetInfoByTime(startTime, endTime,callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetMainInfoByTime",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'startTime':'" + startTime + "','endTime':'" + endTime + "'}",
                success: function (response) {
                    var resultObj = jQuery.parseJSON(response.d);
                    callBack(resultObj);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }
       
        /*
        * 按时间获取日志
        */
        function GetLogByTime(startTime, endTime,callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlaneLogByTime",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'startTime':'" + startTime + "','endTime':'" + endTime + "'}",
                success: function (response) {
                    var resultObj = jQuery.parseJSON(response.d);
                    callBack(resultObj);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }

      
        /*
        *按时间获取照片
        */
        function GetPicByTime(startTime, endTime, callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPicInfoByTime",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'startTime':'" + startTime + "','endTime':'" + endTime + "'}",
                success: function (response) {
                    var resultObj = jQuery.parseJSON(response.d);
                    callBack(resultObj);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }

        /**
         * [GetLogInfoByID 按ID获取日志]
         * @param {[string]} workID   [logid]
         * @param {[function]} callBack [回调函数]
         */
        function GetLogInfoByID(workID, callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlaneLogByID",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'workID':'" + workID + "'}",
                success: function (response) {
                    var resultObj = jQuery.parseJSON(response.d);
                    callBack(resultObj);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }

       
       /**
        * [GetPicByID 按ID获取照片]
        * @param {[string]} workID   [作业编号]
        * @param {[function]} callBack [回调函数]
        */
        function GetPicByID(workID, callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlanePicByDateID",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'workID':'" + workID + "'}",
                success: function (response) {
                    var resultObj = jQuery.parseJSON(response.d);
                    callBack(resultObj);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }

        /*
        *按ID获取飞机航迹
        */
        function GetGpsByID(workID, callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlaneGPSDataByDateID",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'workID':'" + workID + "','isHaveTime':0}",
                success: function (response) {
                    //var resultObj = jQuery.parseJSON(response.d);
                    callBack(response.d);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }

        /*
        *按ID获取航迹图
        */
        function GetFlightRouteByID(workID, callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlaneRouteByDateID",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'workID':'" + workID + "'}",
                success: function (response) {
                    var resultObj = jQuery.parseJSON(response.d);
                    callBack(resultObj);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }

        /*
        * 按ID和字段获取数据
        */
        function GetPlaneDataByIDAndElement(workID, columns, callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlaneDataJsonByIDAndElement",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'workID':'" + workID + "','columns':'" + columns + "'}",
                success: function (response) {
                    var resultObj = jQuery.parseJSON(response.d);
                    callBack(resultObj);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }

        /**
        *获取最近的图片
        */
        function GetLastPic(count,outcount,callBack) {
            var options = {
                type: "POST",
                //url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlanePicByCount",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlanePicByDateID",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //data: "{'count':" + count + ",'outcount':" + outcount+ "}",
                data: "{'workID':'" + '20120809' + "'}",
                success: function (response) {
                    var result = jQuery.parseJSON(response.d);
                    callBack(result);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }

        /**
        * 按要素获取最新数据
        */
        function GetLastSummary(elements,callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlaneLastSummary",
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                data: "{'elements':'" + elements + "'}",
                success: function (response) {
                    var rawData2 = jQuery.parseJSON(response);
                    callBack(rawData2.d);
                },
                error: function (err) {
                    var data = JSON.parse(err.responseText);
                }
            }
            $.ajax(options);

        }

        /**
        * 获取最新的几个日志
        */
        function GetLastLog(count,callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlaneLogByCount",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: "{'count':" + count + "}",
                success: function (response) {
                    var logObj = jQuery.parseJSON(response.d);
                    callBack(logObj);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }

        /**
         * 按年字符串获取日志信息
         */
        function GetLogByYears(yearStr, callBack) {
          
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlaneLogInfoByYear",
                contentType: "application/json; charset=utf-8",
                //dataType: "json",
                //data: "{'count':" + count + "}",
                dataType: "text",
                data: "{'year':'" + yearStr + "'}",
                success: function (response) {
                    var logObj = jQuery.parseJSON(response);
                    callBack(logObj.d);
                },
                error: function (err) {
                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(options);
        }

        /**
         * 按年字符串获取照片信息
         */
        function GetPicByYears(yearStr, callBack) {
            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlanePicByYear",
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                //data:"{'year':'2008'}",
                data: "{'yearstr':'" + yearStr + "'}",
                success: function (response) {
                    var rawData2 = jQuery.parseJSON(response);
                    callBack(rawData2.d);
                },
                error: function (err) {
                    var data = JSON.parse(err.responseText);
                }
            }
            $.ajax(options);
        }


        /*
        * 按ID和所选要素获取数据信息
        */
        function GetPlaneDataTxtByIDAndElement(workID, selectElemts, callBack) {

            var options = {
                type: "POST",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/GetPlaneDataTxtByIDAndElement",
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                data: "{'workID':'" + workID + "','columns':'" + selectElemts + "'}",
                success: function (response) {
                    var resultObj = jQuery.parseJSON(response);
                    callBack(resultObj.d);
                }
            };

            $.ajax(options);
        }


        /*
         * 添加新的作业信息
         * */
        function UpNewRecord(recordjson, callBack) {

            var option = {
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: appConfig.dataServerUrl + "/PlaneManager/PlaneWorkInfoManager.asmx/AddNewRecord",//GetBaseInfoByPage
                data: "{'recordstr':'" + recordjson + "'}",//JSON.stringify({Word72h:obj}), // '{Word72h: '+obj +'}',

                success: function (response) {

                    var result = response.d;
                    if (typeof result === "string") {
                        result = eval("(" + response.d + ")");
                    }
                    callBack(result);
                },
                error: function (err) {

                    var data = JSON.parse(err.responseText);
                    if (data.d) {
                        Promise.reject(data.d);
                    }
                    else if (data.Message) {
                        Promise.reject(data.Message);
                    }

                    console.log(JSON.parse(err.responseText));
                }
            }
            $.ajax(option);

        }


        /*
         * 上传文件
         * 
         */
        function UploadFile(workID, type, files,callBack) {

            var fd = new FormData();
            fd.append('upfile', files);
            fd.append('type', type);
            fd.append('folder', workID.substr(0,4)+"/"+workID+"/"+type);
          
            var option = {

                type: "POST",
                url: appConfig.dataServerUrl + "/FileManager/FileUpLoad.ashx",// "server.php",  //同目录下的php文件  

                data: fd,
                dataType: "text", //声明成功使用json数据类型回调  

                //如果传递的是FormData数据类型，那么下来的三个参数是必须的，否则会报错  
                cache: false,  //默认是true，但是一般不做缓存  
                processData: false, //用于对data参数进行序列化处理，这里必须false；如果是true，就会将FormData转换为String类型  
                contentType: false,  //一些文件上传http协议的关系，自行百度，如果上传的有文件，那么只能设置为false  

                success: function (msg) {  //请求成功后的回调函数  

                    callBack(msg);
                }
            };

            $.ajax(option);
        }

        /*
         * 上传多个文件
         */
        function UploadMultiFile(workID, type, files,callBack) {

            var fd = new FormData();
            fd.append('upfile', files);
            fd.append('type', type);
            fd.append('folder', workID.substr(0, 4) + "/" + workID + "/" + type);

            var option = {

                type: "POST",
                url: appConfig.dataServerUrl + "/FileManager/FileUpLoad.ashx",// "server.php",  //同目录下的php文件  

                data: fd,
                dataType: "text", //声明成功使用json数据类型回调  

                //如果传递的是FormData数据类型，那么下来的三个参数是必须的，否则会报错  
                cache: false,  //默认是true，但是一般不做缓存  
                processData: false, //用于对data参数进行序列化处理，这里必须false；如果是true，就会将FormData转换为String类型  
                contentType: false,  //一些文件上传http协议的关系，自行百度，如果上传的有文件，那么只能设置为false  

                success: function (msg) {  //请求成功后的回调函数  

                    callBack(msg);
                }
            };

            $.ajax(option);
        }



        /*
         * 上传文件夹
         * */
        function UploadFolder(workID, type, folder,relativePath,callBack) {

            var fd = new FormData();
            fd.append('upfile', files);
            fd.append('type', type);
            fd.append('folder', workID.substr(0, 4) + "/" + workID + "/" + type);

            var relativePath = new Array();

            for (var i = 0; i < files.count; i++) {
                relativePath.push(files[i].webkitRelativePath);
            }

            fd.append('path', relativePath);

            var option = {

                type: "POST",
                url: appConfig.dataServerUrl + "/FileManager/FileUpLoad.ashx",// "server.php",  //同目录下的php文件  

                data: fd,
                dataType: "text", //声明成功使用json数据类型回调  

                //如果传递的是FormData数据类型，那么下来的三个参数是必须的，否则会报错  
                cache: false,  //默认是true，但是一般不做缓存  
                processData: false, //用于对data参数进行序列化处理，这里必须false；如果是true，就会将FormData转换为String类型  
                contentType: false,  //一些文件上传http协议的关系，自行百度，如果上传的有文件，那么只能设置为false  

                success: function (msg) {  //请求成功后的回调函数  

                    callBack(msg);
                }
            };

            $.ajax(option);
        }


        var model = {
            planeIcoPath: planeIcoPath,

            GetMainInfo:GetMainInfo,
            GetInfoByTime: GetInfoByTime,
            GetLogByTime: GetLogByTime,
            GetPicByTime: GetPicByTime,
            GetLogInfoByID: GetLogInfoByID,
            GetPicByID: GetPicByID,
            GetGpsByID: GetGpsByID,
            GetFlightRouteByID: GetFlightRouteByID,
            GetPlaneDataByIDAndElement: GetPlaneDataByIDAndElement,
            GetLastPic:GetLastPic,
            GetLastSummary: GetLastSummary,
            GetLastLog: GetLastLog,
            GetPlaneDataTxtByIDAndElement: GetPlaneDataTxtByIDAndElement,

            GetLogByYears: GetLogByYears,
            GetPicByYears: GetPicByYears,

            UpNewRecord: UpNewRecord,
            UploadFile: UploadFile,
            UploadFolder: UploadFolder
        }

        return model;
});