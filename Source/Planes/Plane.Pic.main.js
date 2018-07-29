require(['../../../Source/Planes/requirejs.plane.config.js'], function () {
    "use strict";

    require(['jquery', 'bootstrap','bootstrapTable', 'echarts', 'planePic','bootstrapValidator', 'commonHelper','baguetteBox'], function () {

        "use strict";
        var planePic = require('planePic');

        planePic.InitTable();
        planePic.InitNullCalendar(2005);
        planePic.RefreshCalendar(2005);

    });
});