require(['../../../Source/Planes/requirejs.plane.config.js'], function () {

    "use strict";

    require(['jquery', 'bootstrap', 'echarts','planeSummary', 'commonHelper', 'baguetteBox'], function () {

        "use strict";
        var planeSummary = require('planeSummary');
        planeSummary.Init();

    });
});