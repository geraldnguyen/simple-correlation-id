This is a simple correlation id generator where the purpose is to simply the generation of correlation id

A correlation id has the following format: `<source system>-<pretty-unique-id>`

My gut feeling tells me that the following are good candidates to the `<pretty-unique-id>` part
- [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier): should be pretty unique
- A timestamp e.g. 1666797049350 from `Date.now()`: pretty good for low concurrency website
- A combination of session id with, says, a timestamp. Personally I consider user Id to be a good session id, hence `<user id>-<timestamp>` is a valid example e.g. `johndoe-1666797049350`
- A combination of session id with a timestamp and a random number e.g. `johndoe-1666797049350-2514`

Introducing this **simple-correlation-id** package

Sample Usage:

```javascript

const correlationId = require('./index');

const defaultFormat = correlationId();

const withSourceSystemPrefix = correlationId(sourceSystem); 

const withIdGenerator = correlationId('test', () => 'id')

```

TODO:
- Suppport session id
- Support random suffix with X number of digit