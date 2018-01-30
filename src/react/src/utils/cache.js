import config from '../config';


const dataLifetime = config.localDataLifetime;

const isLocalUpdated = (data, lifetime) => {
  if (data === null || data.lastUpdated === undefined) {
    return false;
  }
  return (new Date().valueOf() - data.lastUpdated) < lifetime;
};

const getLocal = key => JSON.parse(localStorage.getItem(key));

const saveLocal = (data, key) => {
  localStorage.setItem(key, JSON.stringify({
    lastUpdated: new Date().valueOf(),
    data,
  }));
  return data;
};

const isErrorReturned = d => (d.error !== undefined);

export function hit(keySuffix) {
  const storageKey = `${config.localStorageKeyPrefix}:${keySuffix}`;
  const localData = getLocal(storageKey);
  if (isLocalUpdated(localData, dataLifetime)) {
    return localData.data;
  }
  // TODO: garbageCollector
  return null;
}

export function miss(keySuffix, data) {
  const storageKey = `${config.localStorageKeyPrefix}:${keySuffix}`;
  if (!isErrorReturned(data)) {
    return saveLocal(data, storageKey);
  }
  return false;
}
