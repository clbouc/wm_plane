require(['../../../Source/Planes/requirejs.plane.config.js'], function () {

    "use strict";

    require(['jquery', 'bootstrap', 'echarts', 'planeCob','planePic','planeLog','planeMap','planeDT','planeSingleInfo', 'commonHelper', 'baguetteBox'], function () {

        "use strict";

        var planeSingleInfo = require('planeSingleInfo');
        planeSingleInfo.Init();

    });
});