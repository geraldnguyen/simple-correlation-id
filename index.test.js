const correlationId = require('./index');

test('generating timestamp by default', () => {
  const beforeTs = Date.now();

  const generated = correlationId(); 

  const afterTs = Date.now();

  expect(parseInt(generated)).toBeGreaterThanOrEqual(beforeTs);
  expect(parseInt(generated)).toBeLessThanOrEqual(afterTs);
});

test('prefix source system if supply', () => {
  const beforeTs = Date.now();

  const sourceSystem = 'test';
  const generated = correlationId(sourceSystem); 
  const timestampPart = generated.replace(`${sourceSystem}-`, '');

  const afterTs = Date.now();

  expect(parseInt(timestampPart)).toBeGreaterThanOrEqual(beforeTs);
  expect(parseInt(timestampPart)).toBeLessThanOrEqual(afterTs);  
});

test('use the id generator', () => {
  expect(correlationId('test', () => 'id')).toBe('test-id');
});