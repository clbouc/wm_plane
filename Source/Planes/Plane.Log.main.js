require(['../../../Source/Planes/requirejs.plane.config.js'], function () {
    "use strict";

    require(['jquery', 'bootstrap', 'echarts', 'planeLog','commonHelper'], function () {
        "use strict";
        var echarts = require('echarts');
        var planeLog = require('planeLog');
        planeLog.InitNullCalendar(2005);
        planeLog.RefreshCalenderYear(2005);

        planeLog.InitNullTable();

    });
});