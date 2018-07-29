require([
   'jquery',
    'appConfig',
    'bootstrap',
    'bootstrapCustomMsg',
    'toastr',
    'metisMenu'
], function () {
    
    function initMenu() {
        var targetArray = ['_blank', '_self', '_parent', '_top', '_iframeContent'];
        var ul_classArray = ['nav', 'nav nav-second-level', 'nav nav-third-level'];
        var planeBaseUrl = appConfig.webPageUrl + '/Pages/Plane/';

        var planeNav = [
            {
                href: planeBaseUrl + 'PlaneMain.html',
                name: '首页',
                target: targetArray[4],
                i_class: 'fa fa-dashboard'
            },
            {
                href: planeBaseUrl + 'DataManager.html',
                name: '数据管理',
                target: targetArray[4],
                i_class: 'fa fa-table',
                ul_class: ul_classArray[1],
                children: [
                    {
                        href: '#',
                        name: '宏观记录',
                        target: '',
                        i_class: '',
                        ul_class: ul_classArray[2],
                        children: [
                            {
                                href: planeBaseUrl + 'PlaneLogCalender.html',
                                name: '日历图',
                                target: targetArray[4],
                                i_class: ''
                            },
                            {
                                href: planeBaseUrl + 'PlaneLog.html',
                                name: '信息查询',
                                target: targetArray[4],
                                i_class: ''
                            }
                        ]
                    },
                    {
                        href: '#',
                        name: '照片',
                        target: '',
                        i_class: '',
                        ul_class: ul_classArray[2],
                        children: [
                            {
                                href: planeBaseUrl + 'PlanePicCalendar.html',
                                name: '日历图',
                                target: targetArray[4],
                                i_class: ''
                            },
                            {
                                href: planeBaseUrl + 'PlanePicSearch.html',
                                name: '信息查询',
                                target: targetArray[4],
                                i_class: ''
                            }
                        ]
                    },
                    {
                        href: '#',
                        name: '探测数据',
                        target: '',
                        i_class: '',
                        ul_class: ul_classArray[2],
                        children: [
                            {
                                href: planeBaseUrl + 'PlaneDTCalendar.html',
                                name: '日历图',
                                target: targetArray[4],
                                i_class: ''
                            },
                            {
                                href: planeBaseUrl + 'PlaneDTSearch.html',
                                name: '信息查询',
                                target: targetArray[4],
                                i_class: ''
                            }
                        ]
                    }

                ]
            },
            {
                href: appConfig.webPageUrl  + '/Pages/PlaneManager/DataManager.html',
                name: '行政管理',
                target: targetArray[4],
                i_class: 'fa fa-table',
                ul_class: ul_classArray[1],
                children: [
                    {
                        href: '#',
                        name: '单位管理',
                        target: '',
                        i_class: '',
                        ul_class: ul_classArray[2]
                    },
                    {
                        href: '#',
                        name: '科室管理',
                        target: '',
                        i_class: '',
                        ul_class: ul_classArray[2]
                    }
                ]
            },
            {
                href: appConfig.webPageUrl + '/Pages/PlaneManager/UserManager.html',
                name: '用户管理',
                target: targetArray[4],
                i_class: 'fa fa-qrcode'
            },
            {
                href: appConfig.webPageUrl + '/Pages/PlaneManager/LogManager.html',
                name: '日志管理',
                target: targetArray[4],
                i_class: 'fa fa-table'
            },
            {
                href: appConfig.webPageUrl + '/Pages/PlaneManager/SelfInfoManager.html',
                name: '个人资料',
                target: targetArray[4],
                i_class: 'fa fa-table'
            }
        ];

        var navId = 'main-menu';

        if (planeNav) {
            var navStr = '<ul class="nav" id="' + navId + '" >' + createNav(planeNav) + '</ul>';
            $('#' + navId).html(navStr);
            $('#main-menu').metisMenu();
        }
    }


    /**
   * 构建菜单html
   * @param {Object} obj
   * @param {string} ulID
   */
    function createNav(obj) {
        if (obj) {
            var str = '';

            if (obj.length > 0) {

                for (var i = 0; i < obj.length; i++) {
                    str += '<li><a ';
                    if (obj[i].href) {
                        str += 'href="' + obj[i].href + '" ';
                    }

                    if (obj[i].target) {
                        str += 'target="' + obj[i].target + '"> ';
                    }
                    else {
                        str += '>';
                    }

                    if (obj[i].i_class) {
                        str += '<i class="' + obj[i].i_class + '"></i> ';
                    }

                    if (obj[i].name) {
                        str += obj[i].name;
                    }

                    if (obj[i].children) {
                        if (obj[i].children.length > 0) {
                            str += '<span class="fa arrow"></span></a>';
                        }
                    }
                    else {
                        str += '</a>';
                    }

                    if (obj[i].ul_class) {
                        str += '<ul class="' + obj[i].ul_class + '">'
                        if (obj[i].children) {
                            if (obj[i].children.length > 0) {
                                str += createNav(obj[i].children);
                            }
                        }
                        str += '</ul>';
                    }
                    str += '</li>';
                }
            }
            return str;
        }
        else {
            return "";
        }
    };

    
    function iframe_add_loadEvent() {
        var myframe = document.getElementById('_iframeMy');

        if (myframe.attachEvent) {
            myframe.attachEvent("onload", function () {
                //myframe.clientHeight = myframe.contentWindow.document.documentElement.scrollHeight;
                myframe.height = myframe.contentWindow.document.documentElement.scrollHeight;
                //document.getElementById('page-wrapper').height = myframe.contentWindow.document.documentElement.scrollHeight + 100;
                console.log(myframe.height);
            })
        }
        else {
            myframe.onload = function () {

                document.getElementById('page-wrapper').height = myframe.contentWindow.document.documentElement.scrollHeight + 100;

                //myframe.height = myframe.contentWindow.document.documentElement.scrollHeight;
                //console.log(myframe.height);
                //myframe.clientHeight = myframe.contentWindow.document.documentElement.scrollHeight;
            }
        }
    }

    //var oFrm = document.getElementById('_iframeMy');
    //oFrm.onload = oFrm.onreadystatechange = function () {
    //    var subWeb = document.frames ? document.frames["_iframeMy"].document : oFrm.contentDocument;
    //    if (oFrm != null && subWeb != null) {
    //        oFrm.height = subWeb.body.scrollHeight;
    //    }   
    //} 


    ////动态执行setIframeHeight(),即动态更改iframe高度（频率是每秒执行5次）  
    //$.fn.setinframeH = function() {
    //    var objDOM = document.getElementById('_iframeMy');
    //    var url = objDOM.contentWindow.location.href.split("/");
    //    url = url[url.length - 1];
    //    var int = setInterval(function() {
    //        setIframeHeight(objDOM)
    //    }, 200);

    //    //if (url != "editQuest.html") {
    //    //    window.clearInterval(int);
    //    //}
    //}  

    //控制内联框架iframe的窗体高度
    function setIframeHeight(iframe) {
        if (iframe) {
            var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
            if (iframeWin.document.body) {
                //iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
                $("#_iframeMy").css("height", iframeWin.document.body.scrollHeight);
            }
        }
    };
    

    var iframe = document.getElementById("_iframeMy");
   
    function setIframeHeight(iframe) {
        if (iframe) {
            var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
            if (iframeWin.document.body) {
                iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
            }
        }
    };

    //window.onload = function () {
    //    setIframeHeight(document.getElementById('external-frame'));
    //};
   
    initMenu();

    $('#page-wrapper').val('<iframe name="_iframeMy" id="_iframeMy" style="width: 100 %; height: 100 %; min - height: 700px; " class="embed - responsive - item" src=" / Pages / Plane / PlaneMain.html" scrolling="no" ></iframe>');

    //iframe_add_loadEvent();
    window.onresize = function () {
        var myframe = document.getElementById('_iframeMy');
        myframe.height = myframe.contentWindow.document.documentElement.scrollHeight;
    };
    


});