export function getKeyValues(elements) {
  const aux = [];

  Object.keys(elements).forEach((key) => {
    if (elements.hasOwnProperty(key)) {
      if (elements[key].selectedIndex !== undefined) {
        aux[key] = elements[key].selectedIndex;
        return;
      }
      aux[key] = elements[key].value;
    }
  });

  return aux;
}

export function clearUndefined(elements) {
  const aux = [];
  Object.keys(elements).forEach((key) => {
    if (elements[key] !== undefined) {
      aux[key] = elements[key];
    }
  });
  return aux;
}
