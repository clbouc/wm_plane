require(['../../../Source/Planes/requirejs.plane.config.js'], function () {
    "use strict";

    require(['jquery', 'bootstrap', 'echarts', 'planeDT', 'commonHelper', 'bootstrapValidator','bootstrapTable'], function () {

        var planeDT = require('planeDT');

        planeDT.initNullCalendarFromYear(2007);
        planeDT.refreshCalendarByTime('20070101', '20180101');
        planeDT.cas();
    });
});