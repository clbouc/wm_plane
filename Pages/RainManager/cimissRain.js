
//获取所有站点
//http://10.20.76.31:8008/cimiss-web/api?userId=BEPK_QXT_bjryb&pwd=bjryb&interfaceId=getStaInfoByRegionCode&dataCode=STA_INFO_SURF_GLB&elements=Station_Id_C,Station_Name,Admin_Code_CHN,Town_code,NetCode,Country,Province,City,Cnty,Town,Station_levl,Lat,Lon,Alti&adminCodes=110117&limitCnt=30&dataFormat=json
var rainChart;
window.onload = function () {
    //GetStationsByRegionCodeFromCimiss(110117);
    GetStationByRegionCodeFromDb(110117);
    rainChart = echarts.init(document.getElementById('rainDiv'));
    var cTime = new Date(2017,3,1,1,0,0);
    cTime.DateAdd('n', 1);
}

function GetStationsByRegionCodeFromCimiss(regionCode) {
    var options = {
        type: "POST",
        url: appConfig.cimissUrl + "&interfaceId=getStaInfoByRegionCode&dataCode=STA_INFO_SURF_GLB&elements=Station_Id_C,Station_Name,Admin_Code_CHN,Town_code,NetCode,Country,Province,City,Cnty,Town,Station_levl,Lat,Lon,Alti&adminCodes=" + regionCode + "&limitCnt=30&dataFormat=json",
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        //data: "{'year':'" + yearStr + "'}",
        success: function (response) {
            var rawData2 = jQuery.parseJSON(response.d);
            var dataArray = rawData2.d.split('.');
            var yearSeries = [];

            //显示站点名 设置rainStationDiv内表格内容

            //rainStationDiv 


        },
        error: function (err) {
            var data = JSON.parse(err.responseText);
        }
    }
    $.ajax(options);
}

var stationArray = [];
var minuteRainArray = [];
var minutrTimeArray = [];

function GetStationByRegionCodeFromDb(regionCode) {
    var options = {
        type: "POST",
        url: appConfig.dataServerUrl + "/WebService/WM_Rain_Info.asmx/GetStationByRegionCode",
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        data: "{'regionCode':'" + regionCode + "'}",
        success: function (response) {
            var rawData2 = jQuery.parseJSON(response);
            stationArray = jQuery.parseJSON(rawData2.d);

            var tableHtml = "<table><thead><td>站点名</td><td>站点编号</td></thead><tbody>";
            var selStr = "";
            for (var i = 0; i < stationArray.length; i++) {
                tableHtml += "<tr><td>" + stationArray[i].Station_Name + "</td><td>" + stationArray[i].Station_Id_C + "</td></tr>";
                selStr += "<option value='" + stationArray[i].Station_Id_C + "'>" + stationArray[i].Station_Name + "</option>";
            }
            tableHtml += "</tbody></table>";

            //var selStr = "<option value='" + stationArray[i].Station_Id_C+"'></option>"

            //$("#rainStationDiv").html(tableHtml);
            //selStation
            $("#selStation").html(selStr);
            //var dataArray = rawData2.d.split('.');
            //var yearSeries = [];

        },
        error: function (err) {
            var data = JSON.parse(err.responseText);
        }
    }
    $.ajax(options);


}

function SearchRain() {
    var selStation = $("#selStation").val();
    
    GetMinitueRainByIDAndTime(selStation, "2017-10-09 00:00:00", "2017-10-11 00:00:00");
}
$("#btn_query").click = function () {
    var selStation = $("#selStation").val();
    GetMinitueRainByIDAndTime(selStation, startTime, endTime)
}

//按站点编号、时间段获取数据
//http://10.20.76.31:8008/cimiss-web/api?userId=BEPK_QXT_bjryb&pwd=bjryb&interfaceId=getSurfEleByTimeRangeAndStaID&dataCode=SURF_CHN_PRE_MIN&elements=Station_Name,Station_Id_C,Station_Id_d,Admin_Code_CHN,Year,Mon,Day,Hour,Min,PRE&timeRange=[20171009000000,20171010010000]&staIds=A1526&dataFormat=json

function GetMinitueRainByIDAndTime(staionID, startTime, endTime) {
    var options = {
        type: "POST",
        url: appConfig.dataServerUrl + "/WebService/WM_Rain_Info.asmx/GetMinutRainByStationIDAndTime",
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        data: "{'ID':'" + staionID + "','startTime':'" + startTime + "','endTime':'" + endTime+"'}",
        success: function (response) {
            var rawData2 = jQuery.parseJSON(response);
            var rainArray = jQuery.parseJSON(rawData2.d);

            minuteRainArray = [];
            minutrTimeArray = [];
            for (var i = 0; i < rainArray.length; i++) {
                var subArray = rainArray[i].Pre_Min.split(',');//2017-10-09T00:00:00
                //var cTime = formatTime(rainArray[i].Time.replace("T"," "));
                var cTime = Date.parse(rainArray[i].Time);
                var cTime = new Date(cTime);
                //var cTime = new Date(Date.parse(rainArray[i].Time.replace("T", " ").replace("-","-").replace(/-/g, "/"))); 
                for (var j = 0; j < subArray.length; j++) {
                    minuteRainArray.push(subArray[j]);

                    minutrTimeArray.push(new Date(cTime.getTime() + 1000 * 60 * (j + 1)));//.DateAdd('n', j + 1));//addMinutes(j + 1));
                }
            }

            rainChart.setOption(option2 = {
                backgroundColor: '#fff',// '#21202D',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }

                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['MinuteRain'],
                    inactiveColor: "#777",
                    textStyle: {
                        color: "#000"
                    }
                },
                xAxis: {
                    type: 'category',
                    data: minutrTimeArray,
                    
                    axisLine: { lineStyle: { color: '#8392A5' } }
                },
                yAxis: {
                    scale: true,
                    axisLine: { lineStyle: { color: '#8392A5' } },
                    splitLine: { show: false },
                    min: 0,
                    max: 5
                },
                grid: {
                    bottom: 80
                },
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 100
                    },
                    {
                        type: 'inside',
                        realtime: true,
                        start: 65,
                        end: 85
                    }
                ],
                series: [
                    {
                        name: 'MinuteRain',
                        type: 'line',
                        data: minuteRainArray,
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    }
                ]
            });
                
        },
        error: function (err) {
            var data = JSON.parse(err.responseText);
        }
    }
    $.ajax(options);

}

//显示

