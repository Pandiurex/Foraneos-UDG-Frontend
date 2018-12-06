export function hideElements(type) {
  const elementsAdmin = document.getElementsByTagName('admin');
  const elementsOwner = document.getElementsByTagName('owner');
  const elementsTenant = document.getElementsByTagName('tenant');
  const elementsVisitant = document.getElementsByTagName('visitant');

  if (type === '0') {
    hide(elementsOwner);
    hide(elementsTenant);
    hide(elementsVisitant);
  } else if (type === '1') {
    hide(elementsAdmin);
    hide(elementsTenant);
    hide(elementsVisitant);
  } else if (type === '2') {
    hide(elementsAdmin);
    hide(elementsOwner);
    hide(elementsVisitant);
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
