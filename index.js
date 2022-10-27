const correlationId = function (system, prettyUniqueIdGenerator) {
  // default to empty string
  system = system || '';

  // default to timestamp
  prettyUniqueIdGenerator = prettyUniqueIdGenerator || timestamp;

  // advance options
  if (typeof prettyUniqueIdGenerator === 'object' ) {
    prettyUniqueIdGenerator = advanceIdGenerator(prettyUniqueIdGenerator);
  }

  const ci = `${system}-${prettyUniqueIdGenerator()}`;

  return removeEmptyDashPrefix(ci);
};

const advanceIdGenerator = (advanceOptions) => {
  let { sessionIdInjector = empty, idGenerator, randSize = 4 } = advanceOptions;
  
  if (idGenerator == null) {
    idGenerator = () => {
      const random = Math.random() * Math.pow(10, randSize);
      return `${timestamp()}-${Math.floor(random)}`;
    }
  }

  return () => {
    const id = `${sessionIdInjector()}-${idGenerator()}`;

    return removeEmptyDashPrefix(id);
  };
  
}

function empty() {
  return '';
}

function timestamp() {
  return Date.now();
}

function removeEmptyDashPrefix(ci) {
  return ci.replace(/^-/, '');  // remove prefix - caused by empty system
}

module.exports = correlationId;
