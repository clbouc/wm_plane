jQuery.extend({
    /** createUploadIframe 创建上传的iframe
     * @param id 传递当前系统的时间字符串
     * @param uri 传入的json对象的一个参数
     * */
    createUploadIframe: function (id, uri) {
        //iframe添加一个id
        var frameId = 'jUploadFrame' + id;
        //创建iframe元素
        var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
        if (window.ActiveXObject) {//判断浏览器是否支持ActiveX控件
            if (typeof uri == 'boolean') {
                //阻止提交数据
                iframeHtml += ' src="' + 'javascript:false' + '"';
            }
            else if (typeof uri == 'string') {
                iframeHtml += ' src="' + uri + '"';
            }
        }
        iframeHtml += ' />';
        //将动态iframe追加到body中
        jQuery(iframeHtml).appendTo(document.body);
        //返回iframe对象
        return jQuery('#' + frameId).get(0);
    },

    /** createUploadForm 创建form
     * @param id 当前系统时间字符串
     * @param fileElementId 为页面input type='file'的id
     * @param data 向服务器传递的值 如 data:{key1:value1,key2:value2}
     * */
    createUploadForm: function (id, fileElementId, data) {
        //给form添加id
        var formId = 'jUploadForm' + id;
        //给type为file的上传按钮添加id
        var fileId = 'jUploadFile' + id;
        //创建form元素
        var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data" ></form>');
        if (data) {
            for (var i in data) {
                //根据data提交的数据，创建隐藏域
                jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
            }
        }
        //得到页面中的<input type='file' />对象
        var oldElement = jQuery('#' + fileElementId);
        //克隆页面中的<input type='file' />对象
        var newElement = jQuery(oldElement).clone(true);
        //修改原对象的id
        jQuery(oldElement).attr('id', fileId);
        //在原对象前插入克隆对象
        jQuery(oldElement).before(newElement);
        //把原对象插入到动态form的结尾处
        jQuery(oldElement).appendTo(form);

        //给动态form添加样式
        jQuery(form).css('position', 'absolute');
        jQuery(form).css('top', '-1200px');
        jQuery(form).css('left', '-1200px');
        jQuery(form).appendTo('body');
        return form;
    },

    /** ajaxFileUpload ajax上传请求
     * @param s 传入一些ajax的参数
     * */
    ajaxFileUpload: function (s) {
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime();
        //创建动态form
        var form = jQuery.createUploadForm(id, s.fileElementId, (typeof (s.data) == 'undefined' ? false : s.data));
        //创建动态iframe s.secureuri 是否需要安全协议，一般置为false
        var io = jQuery.createUploadIframe(id, s.secureuri);
        //动态iframe的id
        var frameId = 'jUploadFrame' + id;
        //动态form的id
        var formId = 'jUploadForm' + id;

        //当jQuery开始一个ajax请求时发生，global表示是否触发全局ajax事件，默认是true；
        if (s.global && !jQuery.active++) {
            //触发ajaxStart方法
            jQuery.event.trigger("ajaxStart");
        }
        //请求完成标志
        var requestDone = false;
        // 创建请求对象
        var xml = {};
        if (s.global) {
            //触发ajaxSend方法
            jQuery.event.trigger("ajaxSend", [xml, s]);
        }

        //回调函数
        var uploadCallback = function (isTimeout) {
            //得到iframe对象
            var io = document.getElementById(frameId);
            try {
                //动态iframe所在窗口对象是否存在
                if (io.contentWindow) {
                    if (s.dataType == 'text') {
                        xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.textContent : null;
                    } else {
                        xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                    }

                    xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;
                }
                    //动态iframe的文档对象是否存在
                else if (io.contentDocument) {
                    if (s.dataType == 'text') {
                        xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.textContent : null;
                    } else {
                        xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                    }
                    xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                    xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                }
            } catch (e) {
                jQuery.handleError(s, xml, null, e);
            }

            //xml变量被赋值或者isTimeout == "timeout"都表示请求发出，并且有响应
            if (xml || isTimeout == "timeout") {
                //请求完成
                requestDone = true;
                var status;
                try {
                    //如果不是“超时”，表示请求成功
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                    if (status != "error") {
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData(xml, s.dataType);
                        // If a local callback was specified, fire it and pass it the data
                        if (s.success) {
                            //执行上传成功的操作
                            s.success(data, status);
                        }
                        // Fire the global callback
                        if (s.global) {
                            jQuery.event.trigger("ajaxSuccess", [xml, s]);
                        }

                    } else {
                        jQuery.handleError(s, xml, status);
                    }
                }
                catch (e) {
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }
                if (s.global) {
                    // The request was completed
                    jQuery.event.trigger("ajaxComplete", [xml, s]);
                }
                if (s.global && ! --jQuery.active) {
                    jQuery.event.trigger("ajaxStop");
                }
                if (s.complete) {
                    s.complete(xml, status);
                }
                //移除iframe的事件处理程序
                jQuery(io).unbind();
                setTimeout(function () {//设置超时时间
                    try {
                        //移除动态iframe与动态form
                        jQuery(io).remove();
                        jQuery(form).remove();
                    } catch (e) {
                        jQuery.handleError(s, xml, null, e);
                    }
                }, 100)
                xml = null
            }
        }

        //超时检测
        if (s.timeout > 0) {
            setTimeout(function () {
                //如果请求仍未完成，就发送超时信号
                if (!requestDone) uploadCallback("timeout");
            }, s.timeout);
        }
        try {
            var form = jQuery('#' + formId);
            jQuery(form).attr('action', s.url);//传入的ajax页面导向url
            jQuery(form).attr('method', 'POST');//设置提交表单方式
            jQuery(form).attr('target', frameId);//返回的目标iframe，就是创建的动态iframe
            if (form.encoding) {
                //选择编码方式
                jQuery(form).attr('encoding', 'multipart/form-data');
            } else {
                jQuery(form).attr('enctype', 'multipart/form-data');
            }

            jQuery(form).submit();//提交form表单

        } catch (e) {
            jQuery.handleError(s, xml, null, e);
        }
        jQuery('#' + frameId).load(uploadCallback); //ajax 请求从服务器加载数据，同时传入回调函数
        return { abort: function () { } };
    },

    uploadHttpData: function (r, type) {
        var data = !type;
        // If the type is "script", eval it in global context
        data = type == "xml" || data ? r.responseXML : r.responseText;
        if (type == "script") {
            jQuery.globalEval(data);
        }
        // Get the JavaScript object, if JSON is used.
        if (type == "json") {
            ////////////以下为新增代码///////////////   
            data = r.responseText;
            var start = data.indexOf(">");
            if (start != -1) {
                var end = data.indexOf("<", start + 1);
                if (end != -1) {
                    data = data.substring(start + 1, end);
                }
            }
            ///////////以上为新增代码///////////////   
            eval("data = " + data);
        }
        if (type == "html") {
            jQuery("<div>").html(data).evalScripts();
        }
        return data;
    },
    handleError: function (s, xhr, status, e) {
        // If a local callback was specified, fire it
        if (s.error) {
            s.error.call(s.context || s, xhr, status, e);
        }
        // Fire the global callback
        if (s.global) {
            (s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [xhr, s, e]);
        }
    }
})