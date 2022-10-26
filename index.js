const correlationId = function (system, prettyUniqueIdGenerator) {
  // default to empty string
  system = system || '';

  // default to timestamp
  prettyUniqueIdGenerator = prettyUniqueIdGenerator || timestamp;

  let ci = `${system}-${prettyUniqueIdGenerator()}`;

  return ci.replace(/^-/, '');    // remove prefix - caused by empty system
};



function timestamp() {
  return Date.now();
}

module.exports = correlationId;

// todo: add session id, add random, random() with 4 number