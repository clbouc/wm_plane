requirejs.config({
    baseUrl: '../../../',
    paths: {
        "jquery": 'ThirdParty/JQuery/jquery-1.10.2',
        "bootstrap": 'ThirdParty/Bootstrap/js/bootstrap.min',
        "bootstrapValidator": 'ThirdParty/Bootstrap/js/bootstrapValidator.min',
        "bootstrapTable": 'ThirdParty/Bootstrap/js/bootstrap-table.min',
        "bootstrapTableLocaleAll": 'ThirdParty/Bootstrap/js/bootstrap-table-locale-all.min',
        "bootstrapTableZhCN": 'ThirdParty/Bootstrap/js/language/bootstrap-table-zh-CN.min',
        "baguetteBox": 'ThirdParty/imageShow/js/baguetteBox.min',
        "echarts": 'ThirdParty/chart/echarts.min',
        "metisMenu": 'ThirdParty/JQuery/jquery.metisMenu',
        "appConfig": 'Source/appconfig',
        "commonHelper": 'Source/CommonHelper',

        "planePic": 'Source/Planes/Plane.Pic',
        "planeLog": 'Source/Planes/Plane.Log',
        "planeDT": 'Source/Planes/Plane.DT',
        "planeSummary": 'Source/Planes/Plane.Summary',
        "planeSingleInfo":'Source/Planes/Plane.SingleInfo',
        "planeCob": 'Source/Planes/Plane.Cob',
        "planeMap":'Source/Planes/Plane.Map'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'bootstrapTable': {
            deps:['jquery','bootstrap']
        },
        'echarts': {
            deps:['jquery']
        },
        'bootstrapValidator': {
            deps:['jquery','bootstrap']
        },
        'bootstrap-table.min': {
            deps: ['jquery','bootstrap']
        },
        'metisMenu': {
            deps: ['jquery', 'bootstrap'],
            exports: 'metisMenu'
        },
        'baguetteBox': {
            deps: ['jquery','bootstrap']
        },
        'bootstrapTableLocaleAll': {
            deps: ['jquery', 'bootstrap','bootstrapTable']
        },
        'bootstrapTableZhCN': {
            deps: ['jquery', 'bootstrap', 'bootstrapTable']
        }
    }
});