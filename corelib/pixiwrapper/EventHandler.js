
class EventHandler  {
    constructor() {
        this.scope = null;
        //super();

    }

    setScope (scope) {
        this.scope = scope;
    }

    dispatchEvent (funcName, params) {
        if (this.scope) {
            this.scope.emit(funcName, params);
        }

    }

    addEventListener (eventName, callback) {
        if (this.scope) {
            this.scope.on(eventName, callback);
        }

    }
    removeEventListener(eventName, callback) {
        if (this.scope) {
            this.scope.off(eventName, callback);
        }

    }


}

export const eventHandler = new EventHandler();
