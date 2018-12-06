export function hideElements(type) {
  const elementsAdmin = document.getElementsByTagName('admin');
  const elementsOwner = document.getElementsByTagName('owner');
  const elementsTenant = document.getElementsByTagName('tenant');

  if (type === '0') {
    hide(elementsOwner);
    hide(elementsTenant);
  } else if (type === '1') {
    hide(elementsAdmin);
    hide(elementsTenant);
  } else if (type === '2') {
    hide(elementsAdmin);
    hide(elementsOwner);
  } else {
    hide(elementsAdmin);
    hide(elementsOwner);
    hide(elementsTenant);
  }
}

export function hide(elements) {
  Object.values(elements).forEach((element) => {
    element.style.display = 'none';
  });
}
