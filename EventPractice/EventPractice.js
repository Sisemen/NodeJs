var events = require('events');

class Person{
  constructor(name){
    this.personName = name;
  }

  personName = '';

  introduceYourself = function(name){
    console.log(`My name is ${name}.`);
  };

  eventEmitter = new events.EventEmitter();
}

var ali = new Person('Ali');
var gholi = new Person('Gholi');
var hamurabi = new Person('Hamurabi');

var people = [ali, gholi, hamurabi];

people.forEach(person => {
  person.eventEmitter.on('introduceYourself', person.introduceYourself);
});

people.forEach(person => {
  person.eventEmitter.emit('introduceYourself', person.personName);
});