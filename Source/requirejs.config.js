requirejs.config({
    baseUrl: 'http://localhost:8013',//'../../',
    paths: {
        "jquery": 'ThirdParty/JQuery/jquery-1.10.2',
        "bootstrap": 'ThirdParty/Bootstrap/js/bootstrap.min',
        "bootstrapValidator": 'ThirdParty/Bootstrap/js/bootstrapValidator.min',
        "bootstrapTable": 'ThirdParty/Bootstrap/js/bootstrap-table.min',
        "bootstrapTableLocaleAll": 'ThirdParty/Bootstrap/js/bootstrap-table-locale-all.min',
        "bootstrapTableZhCN": 'ThirdParty/Bootstrap/js/language/bootstrap-table-zh-CN.min',
        "bootstrapSelect": 'ThirdParty/Bootstrap/js/bootstrap-select.min',
        "bootstrapSelect_CN": 'ThirdParty/Bootstrap/js/language/bootstrap.select-zh_CN.min',
        "bootstrapFileInput": 'ThirdParty/Bootstrap/js/bootstrap-fileinput.min',
        "bootstrapFileInput_zh": "ThirdParty/Bootstrap/js/language/bootstrap.fileinput-zh",
        "bootstrapCustomMsg": 'ThirdParty/Bootstrap/js/bootstrap-custom-msg',
        "bootstrapDatetimepicker": "ThirdParty/Bootstrap/js/bootstrap-datetimepicker.min",
        "bootstrapDatetimepicker_CN": "ThirdParty/Bootstrap/js/language/bootstrap-datetimepicker.zh-CN",
        "moment": 'ThirdParty/Bootstrap/js/moment',

        "select2": 'ThirdParty/select/js/select2.full.min',
        "ajaxfileupload": 'ThirdParty/JQuery/ajaxfileupload',
        "baguetteBox": 'ThirdParty/imageShow/js/baguetteBox.min',
        "echarts": 'ThirdParty/chart/echarts.min',
        "metisMenu": 'ThirdParty/JQuery/jquery.metisMenu',
        "toastr": 'ThirdParty/toastr/toastr.min',
        "appConfig": 'Source/appConfig',
        "commonHelper": 'Source/CommonHelper',
        "planeDataMain": 'Source/PlaneManager/planeDataMain',
        "userDataMain": 'Source/UserManager/userDataMain',
        "uploadManager":'Source/uploadManager'
    },
    shim:{
        'bootstrap': {
            deps: ['jquery']
        },
        'bootstrapTable': {
            deps: ['jquery', 'bootstrap']
        },
        'echarts': {
            deps: ['jquery']
        },
        'bootstrapValidator': {
            deps: ['jquery', 'bootstrap']
        },
        'bootstrap-table.min': {
            deps: ['jquery', 'bootstrap']
        },
        'bootstrapCustomMsg':{
            deps:['jquery', 'bootstrap']
        },
        'metisMenu': {
            deps: ['jquery', 'bootstrap'],
            exports: 'metisMenu'
        },
        'baguetteBox': {
            deps: ['jquery', 'bootstrap']
        },
        'bootstrapTableLocaleAll': {
            deps: ['jquery', 'bootstrap', 'bootstrapTable']
        },
        'bootstrapTableZhCN': {
            deps: ['jquery', 'bootstrap', 'bootstrapTable']
        },
        'bootstrapSelect': {
            deps:['bootstrap']
        },
        'bootstrapSelect_CN': {
            deps: ['bootstrapSelect']
        },
        'bootstrapFileInput_zh': {
            deps: ['jquery', 'bootstrapFileInput']
        },
        'bootstrapDatetimepicker': {
            deps: ['jquery', 'bootstrap', 'moment']
        },
        'bootstrapDatetimepicker_CN': {
            deps: ['jquery', 'bootstrap', 'moment', 'bootstrapDatetimepicker']
        },

        'ajaxfileupload': {
            deps: ['jquery']
        },
        'uploadManager': {
            deps: ['jquery']
        }
    },
    waitSeconds: 0
});