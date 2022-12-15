module.exports = class {
    constructor(cb) {
        this.callback = cb;
        this.observers = [];
        this.isStarted = false;
    }

    start(msg) {
        this.isStarted = true;
        console.log(msg)
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        let index = this.observers.findIndex(item => item === observer);

        this.observers.splice(index, 1);
        this.isCompleted();
    }

    isCompleted() {
        if (this.isStarted && !this.observers.length) {
            this.callback();
        }
    }
}