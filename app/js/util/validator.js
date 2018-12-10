import regexs from './regexs.js';

export function checkRequired(elements) {
  clearElements(elements);

  let correct = true;
  Object.values(elements).forEach((element) => {
    if (element.selectedIndex !== undefined) {
      return;
    }
    if (element.required && element.value.length === 0) {
      markElement(element);
      correct = false;
    } else if (element.value.length !== 0) {
      if (!checkText(element)) {
        markElement(element);
        correct = false;
      }
    }
  });
  return correct;
}

export function clearElements(elements) {
  Object.values(elements).forEach((element) => {
    clearElement(element);
  });
}

export function checkText(element) {
  return regexs[`${element.dataset.regexp}`].test(element.value);
}

export function markElement(element) {
  element.style.borderColor = 'red';
}

export function clearElement(element) {
  element.style.borderColor = '#C7C7C7';
}
