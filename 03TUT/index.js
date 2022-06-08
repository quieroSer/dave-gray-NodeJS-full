const logEvents = require('./logEvents');

const EventEmitter = require('events')

class MyEmmiter extends EventEmitter {}

//initialize object
const myEmmiter = new MyEmmiter()
//add listener for the log event
myEmmiter.on('log', (msg) => logEvents(msg))

setTimeout(() => {
    //Emit events 
    myEmmiter.emit('log', 'Log event emitted!!')
}, 2000)
