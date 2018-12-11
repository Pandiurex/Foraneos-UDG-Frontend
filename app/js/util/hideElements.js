export function hideElements(type) {
  const admin = document.getElementsByTagName('admin');
  const owner = document.getElementsByTagName('owner');
  const tenant = document.getElementsByTagName('tenant');
  const visitant = document.getElementsByTagName('visitant');

  if (type === '0') {
    hide(owner);
    hide(tenant);
    hide(visitant);
    showElements(admin);
  } else if (type === '1') {
    hide(admin);
    hide(tenant);
    hide(visitant);
    showElements(owner);
  } else if (type === '2') {
    hide(admin);
    hide(owner);
    hide(visitant);
    showElements(tenant);
  } else {
    hide(admin);
    hide(owner);
    hide(tenant);
    showElements(visitant);
  }
}

export function hide(elements) {
  Object.values(elements).forEach((element) => {
    element.style.display = 'none';
  });
}

export function showElements(elements) {
  Object.values(elements).forEach((element) => {
    show(element);
    showParentNode(element);
  });
}

export function showParentNode(element) {
  let aux = element.parentNode;

  if (aux.tagName === 'ADMIN'
    || aux.tagName === 'OWNER'
    || aux.tagName === 'TENANT'
    || aux.tagName === 'VISITANT') {
    show(aux);
    showParentNode(aux);
  }
  
  return;
}

export function show(element) {
  if (element !== null) {
    if (element.style !== undefined) {
      element.style.display = 'block';
    }
    show(element.firstChild);
  }
}
