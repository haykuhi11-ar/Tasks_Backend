export class CustomEventEmitter {
    listeners = {};

    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    emit(event, ...args) {
        if (!this.listeners[event]) return;

        for (const listener of this.listeners[event]) {
            listener(...args);
        }
    }

    off(event, listener) {
        if (!this.listeners[event]) return;

        this.listeners[event] = this.listeners[event].filter(
            l => l !== listener
        );
    }
}