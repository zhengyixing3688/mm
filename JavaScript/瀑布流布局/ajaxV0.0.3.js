// 1.0 定义一个对象 $
var $ = {}
// 2.0 添加 $ 方法
// 2.0.1 请求数据的地址
// 2.0.2 请求数据的方式
// 2.0.3 提交的参数
// 2.0.4 如果请求数据成功  执行成功的回调函数
// 2.0.5 如果请求数据失败  执行失败的回调函数

$.ajax = function (option) {
    var url = option.url;
    var type = option.type || "get";//默认就是get
    var data = option.data;
    var dataStr = "";
    for (var key in data) {
        dataStr += key + "=" + data[key] + "&";
    }
    if (dataStr.length != 0) {
        dataStr = dataStr.slice(0, -1);
    }
    // 判断
    if (option.dataType == "jsonp") {
        // jsonp 跨域的逻辑
        var jsonpCallback = "";//响应的数据 foo   定义函数名称
        // 如果服务端可以接受前端传递的函数名
        if (option.jsonp) {
            // 那么这个函数名可以自定义 就是不用 foo
            dataStr += "&jsonp=" + option.jsonp;
            // 设置脚本中自定义函数名
            jsonpCallback = option.jsonp;
        } else {
            if (option.jsonpCallback) {
                // 如果服务端把脚本中的函数名固定 那么直接传递 指定函数名 foo
                jsonpCallback = option.jsonpCallback;
            } else {
                // 生成一个随机的函数名
                // 数学对象  Math.random()
                // 日期对象  new Date()   getTime()  时间戳
                var str = (Math.random()).toString();
                // 设置回调函数名随机的
                dataStr += "&jsonp=" + "jsonp" + str.slice(2, 5);
                // 设置脚本中自定义函数名
                jsonpCallback = "jsonp" + str.slice(2, 5);
            }
        }
        // console.log(jsonpCallback)
        // jsonp实现步骤
        // 1.0 请求数据
        // 动态创建script标签
        var script = document.createElement('script');
        // 请求数据 （脚本）
        script.src = url + "?" + dataStr;
        // 把script标签添加到head标签
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
        // 2.0 处理数据
        // foo([{title:"今天任务"},{title:"明天任务"},{title:"后天任务"}])
        window[jsonpCallback] = function (res) {
            // 有一个函数 专门处理脚本中的数据
            if (option.success) {
                option.success(res)
            }
            // 没有数据
            if (res == null || res == this.undefined) {
                if (option.error) {
                    option.error();
                }
            }
        }
    } else {
        // XMLHttpRequest 同源策略的逻辑
        // ajax  编码
        // 创建实例对象  XMLHttpRequest 
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP'); // ie5 6
        }
        // 监听请求和响应的变化
        xhr.onreadystatechange = function () {
            // 监听请求是否完成
            if (xhr.readyState == 4) {
                // 监听响应是否成功
                if (xhr.status == 200) {
                    // 获取响应头部信息
                    var contentType = xhr.getResponseHeader('Content-Type');
                    // console.log("contentType:",contentType)
                    // 定义变量接收响应的数据
                    var res;
                    // 判断响应的数据格式 json  xml  str
                    if (contentType.indexOf("json") > -1) {
                        var jsonstr = xhr.responseText;
                        res = JSON.parse(jsonstr);
                    } else if (contentType.indexOf("xml") > -1) {
                        res = xhr.responseXML;
                    } else {
                        res = xhr.responseText;
                    }
                    // 判断是否存在success回调函数
                    if (option.success) {
                        // 执行请求成功的回调函数
                        option.success(res);
                    }
                } else {
                    // 判断是否存在 error 回调函数
                    if (option.error) {
                        // 执行请求失败的回调函数
                        option.error("请求数据失败！")
                    }
                }
            } else {
                // 请求未完成之前执行回调函数
                if (option.beforeSend) {
                    // 执行请求未完成之前的回调函数
                    option.beforeSend();
                }
            }
        }
        // 建立与服务端的链接
        if (type == "get") {
            url = url + "?" + dataStr;
        }
        xhr.open(type, url, true);
        // 发送请求
        if (type == "post") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(dataStr);
        } else {
            xhr.send(null);
        }
    }

}

