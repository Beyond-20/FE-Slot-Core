export class HTTPService {
    constructor(app) {
        this.app = app;
        this.connectToServer();
    }

    connectToServer () {

    }


    setConnected () {
        this.app.onServerConnected();
    }

    callBackFunction (msgName, data) {
        this.app.handleServerResponse(msgName, data);
    }

    formatParams( params ){
        return "?" + Object
            .keys(params)
            .map(function(key){
                return key+"="+encodeURIComponent(params[key])
            })
            .join("&")
    }

    getServerResponse (messageName, request, url, methodType = "POST") {
        let refObj = this;
        if (methodType == "GET") {
            $.get(url, request, function(data, status){
                refObj.callBackFunction(messageName, data);
            });
            return;
        }
        $.post(url, request, function(data, status){
            refObj.callBackFunction(messageName, data);
        });
    }

    getAjaxServerResponse (messageName, request, url, methodType = "POST") {
        let refObj = this;
        $.ajax({
            url: url,
            contentType: "application/json",
            dataType: "json",
            type: methodType,
            data: (request),
            success: function(data) {
                refObj.callBackFunction(messageName, data);
            }
        });
    }
    getServerResponse1 (messageName, request, url) {

        return;
        var refObj = this;
        let xhr = new XMLHttpRequest();
        xhr.crossDomain = true;

        let str = "";
        for (let p in request) {
            str += p + "=" + request[p] + "&";
        }
        url += "?" + str;
        xhr.open("GET" , url, true);
        //xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;
                refObj.callBackFunction(messageName, response);
            }
        }
        xhr.send();

    }
}

