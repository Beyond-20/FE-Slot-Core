import {CoreLib} from '../corelib/core/CoreLib'
import { Logger } from '../corelib/utils/LoggerService'

let stompClient;
export class SocketService {
    constructor(app) {
        this.app = app;
        this.clientId = CoreLib.Util.getRandomRange(1,9999).toString();
        this.model = {};
        this.model.connectionAttempt = 0;

    }

    connectToServer (url, gameType) {
        let that = this;
        this.model.url = url;
        let socket = new WebSocket(url);
        socket.onopen = function(e) {
            that.setConnected();
        };

        socket.onmessage = function(event) {
            let data = event.data;
            that.onSocketMessage(data);
        };

        socket.onclose = function(event) {
            if (event.wasClean) {
                Logger.logDev(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                that.onDisconnected();
            } else {
                Logger.logDev("disconnected == ", event)
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                that.onDisconnected();
            }
        };

        socket.onerror = function(error) {
            Logger.logDev(`[error] ${error.message}`);
            that.onDisconnected();
        };

    }
    onSocketMessage(data) {
        this.app.onSocketMessage(JSON.parse(data));
    }


    setConnected(flag) {
        Logger.logDev("socket connected")

        CoreLib.EventHandler.dispatchEvent("SOCKET_CONNECTED");
        this.app.onSocketConnected();
    }
    onDisconnected () {
        Logger.logDev("on disconnect socket");
        this.model.connectionAttempt++;
        if (this.model.connectionAttempt < 10) {
            //CoreLib.EventHandler.dispatchEvent("SOCKET_DISCONNECTED");
            this.connectToServer(this.model.url);
        }

    }

    onEventMessage (data) {

    }

    callBackFunction (msgName, data) {

    }


    getSocketId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 10; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

}

