require(['../../../Source/Planes/requirejs.plane.config.js'], function () {

    "use strict";

    require(['jquery', 'bootstrap', 'echarts', 'planeSearch','bootstrapTable', 'bootstrapValidator','commonHelper', 'baguetteBox'], function () {

        "use strict";
        var planeSearch = require('planeSearch');
        planeSearch.Init();

    });
});