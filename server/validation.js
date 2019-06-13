'use strict';

export function fieldContentCheck(object) {
  for (let key in object) {
    let value = object[key];
    if (
      value === '' ||
      value === undefined ||
      value.length < 1 ||
      value instanceof Object ||
      value instanceof Array
    ) {
      return false;
    } else {
      return true;
    }
  }
}

export function checkString(object, key) {
  let value = object[key];
  if (!key in object || value === '' || !value instanceof String) {
    return false;
  }
  return true;
}

export function checkInt(object, key) {
  if (!key in object || object[key] === '') {
    return false;
  }
  return true;
}

export function checkFloat(object, key) {
  if (!key in object  || object[key] === '') {
    return false;
  }
  return true;
}