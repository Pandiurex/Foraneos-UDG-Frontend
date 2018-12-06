import regexs from './regexs.js';

export function checkRequired(elements) {
  clearElements(elements);

  let correct = true;
  Object.values(elements).forEach((element) => {
    if (element.selectedIndex !== undefined) {
      if (element.selectedIndex === 0 && element.required) {
        markElement(element);
        correct = false;
      }
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
    element.style.borderColor = '#C7C7C7';
  });
}

export function checkText(element) {
  return regexs[`${element.dataset.regexp}`].test(element.value);
}

export function markElement(element) {
  element.style.borderColor = 'red';
}
