define("uploadManager",
    [
        'jquery',
         'appConfig'
    ],

    function () {
        "use strict";

        //var fileName = document.getElementById('file').files[0].name;
        //var fileSize = document.getElementById('file').files[0].size;
        //var fileType = document.getElementById('file').files[0].type;


        var searerUrl = appConfig.dataServerUrl + "/FileManager/FileUpLoad.ashx";

        function uploadFile(upfile, callBack) {

            var fd = new FormData();
            var ajax = new XMLHttpRequest();

            fd.append('upfile', upfile);

            ajax.open("post", appConfig.dataServerUrl + "/FileManager/FileUpLoad.ashx", true);

            ajax.onload = function () {

                callBack();
                console.log(ajax.responseText);


                //var d = eval("(" + ajax.responseText + ")"); //把数据转成json    
                //d.fileVal 后台返回的存储路径    
                //存储到进度条（data-picUrl）自定的属性里  

                //console.log(d.fileVal);
                //$("#progress").attr("data-picUrl", d.fileVal)

                //$('#pro_up').css('width', 90+'%');
                //$('#pro_up').css('style', 'width:50%;');
            };
            ajax.upload.addEventListener("progress", uploadProgress, false);

            function uploadProgress(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    $('#pro_up').css('width', percentComplete + '%');
                }
            };

            ajax.send(fd);

        }

        function uploadFile2(upfile, dataType, folder, callBack) {

            var fd = new FormData();
            fd.append('upfile', upfile);
            fd.append('type', dataType);
            fd.append('folder', folder);
            //fd.append('relativepath', path);

            $.ajax({
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

                    //$("#result").append("你的名字是" + msg.name + "，性别：" + msg.sex + "，年龄：" + msg.age + "，上传的文件名1：" + msg.file1 + "，上传的文件名2：" + msg.file2);

                }
            });
        }

        /*
        * 上传文件
        * 
        */
        function UploadFile(workID, type, files, callBack) {

        }

        /*
         * 上传文件夹
         * */
        function UploadFolder(workID, type, folder, callBack) {

        }
    
        var model = {

            searerUrl:searerUrl,

            uploadFile: uploadFile,

            uploadFile2: uploadFile2,

            UploadFile: UploadFile,
            UploadFolder: UploadFolder

        };

        return model;

});