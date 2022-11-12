// const correlationId = require('./index');
import correlationId from './index';

it('generating timestamp by default', () => {
  const beforeTs = Date.now();

  const generated = correlationId(); 

  const afterTs = Date.now();

  expect(parseInt(generated)).toBeGreaterThanOrEqual(beforeTs);
  expect(parseInt(generated)).toBeLessThanOrEqual(afterTs);
});

it('prefix source system if supply', () => {
  const beforeTs = Date.now();

  const sourceSystem = 'test';
  const generated = correlationId(sourceSystem); 
  const timestampPart = generated.replace(`${sourceSystem}-`, '');

  const afterTs = Date.now();

  expect(parseInt(timestampPart)).toBeGreaterThanOrEqual(beforeTs);
  expect(parseInt(timestampPart)).toBeLessThanOrEqual(afterTs);  
});

it('pass the id generator as a function', () => {
  expect(correlationId('test', () => 'id')).toBe('test-id');
});

it('pass the id generator an option', () => {
  const options = {
    idGenerator: () => 'id'
  };
  expect(correlationId('test', options)).toBe('test-id');
});

it('advance options: default values', () => {
  const options = { };
  expect(correlationId('test', options)).toEqual(expect.stringMatching(/^test-\d+-\d{4}$/));
});

it('advance options: override randSize', () => {
  const options = { randSize: 5 };
  expect(correlationId('test', options)).toEqual(expect.stringMatching(/^test-\d+-\d{5}$/));
});

it('advance options: override sessionId', () => {
  const options = { sessionIdInjector: () => 'session' };
  expect(correlationId('test', options)).toEqual(expect.stringMatching(/^test-session-\d+-\d{4}$/));
});