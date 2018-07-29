
loadGeoJson("")

function loadGeoJson(url) {
    var dtd = $.Deferred();//这个Deferred可以看看jquery的资料  
    var dataSource = new Cesium.GeoJsonDataSource();
    viewer.dataSources.add(dataSource);
    dataSource.loadUrl(url).then(function () {
        var entities = dataSource.entities.entities;
        var colorHash = {};
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            var colorstr = entity.properties["color"];

            var ispolygon = entity.polygon;
            var ispolyline = entity.polyline;


            var color = Cesium.Color.BLUE;
            if (colorstr) {
                color = colorHash[colorstr];
                if (!color) {
                    color = Cesium.Color.fromRandom({
                        alpha: 0.6
                    });//这里采用随机，api中颜色用的是rgba的32位  
                    colorHash[name] = color;
                }
            }
            if (ispolygon)//面处理  
            {

                entity.polygon.material = Cesium.ColorMaterialProperty.fromColor(color);
                var height = entity.properties["height"];//要素的属性字段  
                var x = entity.properties["x"];
                var y = entity.properties["y"];
                var name = entity.properties["NAME"];
                if (height) {
                    entity.polygon.extrudedHeight = new Cesium.ConstantProperty(height);//拔高  
                    <span style="white-space:pre">                </span>//深入可以考虑材质贴文理  
                }
                if (x && y) {
                    if (!height)
                    { height = 0; }
                    if (name) {
                        buildlabels.add({//添加面的标注  
                            position: Cesium.Cartesian3.fromDegrees(x, y, height + 5),
                            text: name,
                            scale: 0.8,
                            translucencyByDistance: new Cesium.NearFarScalar(2000, 1, 3000, 0),//代表2000米，透明度1。3000米，文字透明度0  
                            fillColor: new Cesium.Color(0.6, 0.9, 1.0),
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 2,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE
                        });
                    }
                }

            }
            else if (ispolyline)//线处理  
            {
                entity.polyline.material = Cesium.ColorMaterialProperty.fromColor(color);

            }

        }

        dtd.resolve();
    });

    return dtd;
}  