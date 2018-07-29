require(
    [
    'jquery',
    'echarts',
    'bootstrap',
    'commonHelper',
    'baguetteBox',
    'planeDataMain'
    ],
    function () {

        var echarts = require('echarts');
        var commonHelper = require("commonHelper");
        var planeDataMain = require("planeDataMain");
        var baguetteBox = require('baguetteBox');
        //获取datestr
        var workid = commonHelper.getUrlParms('dateStr');
        if (workid) {
            $('#curID').html("作业ID：" + workid);
            planeDataMain.GetPicByID(workid, setPicList);
        }

        function setPicList(picArray) {
            if (picArray.length > 0) {
                ////滚动 导航添加
                ////     内容添加
                ////     事件绑定
                //var ulHtml = "";
                //var itemHtml = "";
                //for (var i = 0; i < result.length; i++) {
                //    if (i == 0) {
                //        ulHtml += '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>';
                //        itemHtml += '<div class="item active" ><img src="' + appConfig.fileServerUrl + result[i].Path + result[i].FileName + '" alt= "' + result[i].Time + '" class="img-responsive center-block" style="max-height:400px;"/></div>';
                //    }
                //    else {
                //        ulHtml += '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>';
                //        itemHtml += '<div class="item"><img src="' + appConfig.fileServerUrl + result[i].Path + result[i].FileName + '" alt= "' + result[i].Time + '" class="img-responsive center-block" style="max-height:400px;"/></div>';
                //    }
                //}

                //$('#ul_carousel').html(ulHtml);
                //$('#item_carousel').html(itemHtml);
                //$("#myCarousel").carousel({
                //    interval: 2000
                //});

                //$('.carousel-control').css('line-height', $('.carousel-innerimg').height() + 'px');
                //$(window).resize(function () {
                //    var $height = $('.carousel-inner img').eq(0).height() || $('.carousel-inner img').eq(1).height() || $('.carousel-inner img').eq(2).height();
                //    $('.carousel-control').css('line-height', $height + 'px');
                //});


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
        }

    }
);