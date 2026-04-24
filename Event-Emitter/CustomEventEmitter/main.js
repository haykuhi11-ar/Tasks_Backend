import { CustomEventEmitter } from "./eventEmitterImplementation.js";

const service = new CustomEventEmitter();

service.on('start', (user) => {
    console.log(`Service started for ${user}.`);
});

service.on('dataLoaded', (dataCount) => {
    console.log(`Loaded ${dataCount} records.`);
});

service.emit('start', 'Admin');
service.emit('dataLoaded', 42);

service.off('dataLoaded', 42);
service.off('start', 'Admin');