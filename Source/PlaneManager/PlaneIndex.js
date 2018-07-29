require(
    [

    'jquery',
    'appConfig',
    'bootstrap',
    'bootstrapCustomMsg',
    'bootstrapTable',
    'bootstrapValidator',
     'metisMenu',
    'toastr',
    'echarts',
    'commonHelper',
    'planeDataMain'

    ],

    function () {

        /**
       * 飞机页面导航
       */
        var targetArray = ['_blank', '_self', '_parent', '_top', '_iframeContent'];
        var ul_classArray = ['nav', 'nav nav-second-level', 'nav nav-third-level'];
        var planeBaseUrl = appConfig.webPageUrl + '/Pages/Plane';

        var planeNav = [
            {
                href: planeBaseUrl + '/PlaneManagerIndex.html',
                name: '首页',
                target: targetArray[1],
                i_class: 'fa fa-dashboard'
            },
            {
                href: '',
                name: '作业信息查询统计',
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
                                href: planeBaseUrl + '/Pages/PlaneLogCalender.html',
                                name: '日历图',
                                target: targetArray[4],
                                i_class: ''
                            },
                            {
                                href: planeBaseUrl + '/Pages/PlaneLog.html',
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
                                href: planeBaseUrl + '/Pages/PlanePicCalendar.html',
                                name: '日历图',
                                target: targetArray[4],
                                i_class: ''
                            },
                            {
                                href: planeBaseUrl + '/Pages/PlanePicSearch.html',
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
                                href: planeBaseUrl + '/Pages/PlaneDTCalendar.html',
                                name: '日历图',
                                target: targetArray[4],
                                i_class: ''
                            },
                            {
                                href: planeBaseUrl + '/Pages/PlaneDTSearch.html',
                                name: '信息查询',
                                target: targetArray[4],
                                i_class: ''
                            }
                        ]
                    }

                ]
            },
            {
                href: planeBaseUrl + '/Pages/PlaneSingleInfo.html',
                name: '个例查看',
                target: targetArray[4],
                i_class: 'fa fa-qrcode'
            },
            {
                href: '',// planeBaseUrl + '/Pages/PlaneCesium.html',
                name: '航行模拟',
                target: targetArray[4],
                i_class: 'fa fa-table'
            },
        ];

        var navId = 'main-menu';

        if (planeNav) {
            var navStr = '<ul class="nav" id="' + navId + '" >' + createNav(planeNav) + '</ul>';
            $('#' + navId).html(navStr);
            $('#main-menu').metisMenu();
        }

        //$('#page-wrapper').html('<iframe name="_iframeContent" id="_iframeMy" class="embed- responsive - item" src="' + planeBaseUrl+'/Pages/PlaneMain.html' + '" scrolling="no" ></iframe>');

        iframe_add_loadEvent();

        function iframe_add_loadEvent() {
            var myframe = document.getElementById('_iframeMy');

            if (myframe.attachEvent) {
                myframe.attachEvent("onload", function () {
                    myframe.height = myframe.contentWindow.document.documentElement.scrollHeight;
                    console.log(myframe.height);
                })
            }
            else {
                myframe.onload = function () {
                    myframe.height = myframe.contentWindow.document.documentElement.scrollHeight;
                    console.log(myframe.height);
                }
            }
        }

        window.onresize = function () {
            var myframe = document.getElementById('_iframeMy');
            myframe.height = myframe.contentWindow.document.documentElement.scrollHeight;
        };

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
        }

    }
);