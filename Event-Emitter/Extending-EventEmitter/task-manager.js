import {EventEmitter} from 'events'

export class TaskManager extends EventEmitter {
    #tasksCount = 0;
    constructor() {
        super();
    }

    addTask(taskName) {
        this.emit('taskAdded', taskName);
        console.log(`Task ${taskName} added`)
    }

    completeTask(taskName) {
        this.#tasksCount++;
        this.emit('taskCompleted', taskName, this.#tasksCount);
    }
}