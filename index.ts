type System = string;

type UniqueId = string | number;

type UniqueIdGenerator = () => UniqueId;

interface UniqueIdGeneratorOption {
  sessionIdInjector?: () => UniqueId;
  idGenerator?: UniqueIdGenerator;
  randSize?: number;
};

function correlationId(system: System = '', uniqueIdGeneratorOrOption: UniqueIdGeneratorOption | UniqueIdGenerator = timestamp) {
  let uniqueIdGenerator: UniqueIdGenerator;

  // advance options
  if (typeof uniqueIdGeneratorOrOption === 'object' ) {
    const option = uniqueIdGeneratorOrOption as UniqueIdGeneratorOption;
    uniqueIdGenerator = advanceIdGenerator(option);
  } else {
    uniqueIdGenerator = uniqueIdGeneratorOrOption;
  }

  const ci = `${system}-${uniqueIdGenerator()}`;

  return removeEmptyDashPrefix(ci);
};

function advanceIdGenerator(option : UniqueIdGeneratorOption): () => UniqueId {
  const { sessionIdInjector = empty, randSize = 4 } = option;

  const defaultIdGenerator = () => {
    return `${timestamp()}-${fixedSizeRandom(randSize)}`;
  };
  const { idGenerator = defaultIdGenerator } = option;
  
  return () => {
    const id = `${sessionIdInjector()}-${idGenerator()}`;
    return removeEmptyDashPrefix(id);
  };
  
}

function fixedSizeRandom(randSize: number) {
  const firstRand = Math.random();
  const secondRand = firstRand + Math.pow(10, -randSize);
  const thirdRand = secondRand < 0.1 ? secondRand + 0.1 : secondRand;
  const fourthRand = thirdRand * Math.pow(10, randSize);

  const finalRand = Math.floor(fourthRand);
  return finalRand;
}

function empty() {
  return '';
}

function timestamp() {
  return Date.now();
}

function removeEmptyDashPrefix(ci: string) {
  return ci.replace(/^-/, '');  // remove prefix - caused by empty system
}

// export = correlationId;
export default correlationId;
