This is a simple correlation id generator with the goal of simplifying the generation of correlation id

A correlation id should have the following format: `<source system>-<pretty-unique-id>` so that we can tell immediately:
- What it is e.g. a correlation id, not some UUID
- Where it originated

In my opinion, the following are good candidates to the `<pretty-unique-id>` part
- [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier): should be pretty unique
- A timestamp e.g. 1666797049350 from `Date.now()`: so that we knows when did the request happened, pretty good for low concurrency website
- A combination of session id with, says, a timestamp: so that we know from which session the request was triggered. A user Id can be a good session id, hence `<user id>-<timestamp>` is a valid example, e.g. `johndoe-1666797049350`
- A combination of session id with a timestamp and a random number: so that even with high concurrency, the chance of colision is low, e.g. `johndoe-1666797049350-2514`

Examples:
- `ui-123e4567-e89b-12d3-a456-426614174000`
- `ui-1666797049350`
- `storefront-johndoe-1666797049350`
- `shop-johndoe-1666797049350-2514`


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

Supporting Typescript
