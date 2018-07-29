// JavaScript source code
/**
 * Created by Administrator on 2017/3/27.
 */
var appConfig={
    dataServerUrl: "http://localhost:8014",
    dataServerFileUrl: "http://localhost:8014/WebPlaneDataF",
    webPageUrl: "http://localhost:8013",

    mapServerUrl: "http://localhost:8014",
    fileServerUrl: "http://localhost:8014/WebPlaneDataF",
    pdfUrl: "http://localhost:8013/ThirdParty/pdf/viewer.html",
    cimissUrl:"http://10.20.76.31:8008/cimiss-web/api?userId=BEPK_QXT_bjryb&pwd=bjryb"
}
if (typeof define === "function") {
    define(function () {
        return appConfig;
    });
} else if (typeof module === "undefined") {

} else {
    module.exports = appConfig;
}
window.appConfig = appConfig;
