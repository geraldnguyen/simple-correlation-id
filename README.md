This is a simple correlation id generator where the purpose is to simplify the generation of correlation id

A correlation id has the following format: `<source system>-<pretty-unique-id>`

My gut feeling tells me that the following are good candidates to the `<pretty-unique-id>` part
- [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier): should be pretty unique
- A timestamp e.g. 1666797049350 from `Date.now()`: pretty good for low concurrency website
- A combination of session id with, says, a timestamp. Personally I consider user Id to be a good session id, hence `<user id>-<timestamp>` is a valid example e.g. `johndoe-1666797049350`
- A combination of session id with a timestamp and a random number e.g. `johndoe-1666797049350-2514`

Introducing this **simple-correlation-id** package

Sample Usages (adapted from unit tests):

```javascript
const correlationId = require('simple-correlation-id');

it('generating timestamp by default', () => {
  const generated = correlationId(); 
});

it('prefix source system if supply', () => {
  const sourceSystem = 'test';
  const generated = correlationId(sourceSystem); 
});

it('pass the id generator as a function', () => {
  const generated = correlationId('test', () => 'id')
});

it('pass the id generator an option', () => {
  const options = {
    idGenerator: () => 'id'
  };
  const generated = correlationId('test', options);
});

it('advance options: default values', () => {
  const options = { };
  const generated = correlationId('test', options);
});

it('advance options: override randSize', () => {
  const options = { randSize: 5 };
  const generated = correlationId('test', options);
});

it('advance options: override sessionId', () => {
  const options = { sessionIdInjector: () => 'session' };
  const generated = correlationId('test', options);
});

```

NOTICE: The API and implementation may change frequently until a major version is achieved.