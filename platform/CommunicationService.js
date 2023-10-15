import {HTTPService} from "./HTTPService";
import {CoreLib} from "../corelib/core/CoreLib";

export class CommunicationService {
	constructor(ref) {
		this.app = ref;
		this.requestId = {};
		this.connectToServer();
	}

	connectToServer () {
		this.connector = new HTTPService(this);
	}

    openGame (data) {
		this.connector.openGame(data);
	}

    onServerConnected () {
		this.app.onServerConnected();
	}
	onNoResponse (msgName) {
		clearTimeout(this.requestId[msgName]);
		this.app.onServerTimeout(msgName);
	}

    getServerResponse (msgName, reqObj, url, methodType = "POST", errorcallback = true) {
		if (errorcallback) {
			this.requestId[msgName] = setTimeout(this.onNoResponse.bind(this, msgName), 8000);
		}
		//methodType = "POST";
		this.connector.getServerResponse(msgName, reqObj, url, methodType)
	}

	getAjaxServerResponse (msgName, reqObj, url, methodType = "POST") {
		this.requestId[msgName] = setTimeout(this.onNoResponse.bind(this, msgName), 8000);
		this.connector.getAjaxServerResponse(msgName, reqObj, url, methodType)
	}

    handleServerResponse (msgName, data) {
		clearTimeout(this.requestId[msgName]);
		this.app.onServerResponse(msgName, data);
	}
}
