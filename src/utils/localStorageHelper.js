export const findKey = (key) => {
  return localStorage.getItem(key);
}

export const setKey = (key, value) => {
  localStorage.setItem(key, value);
}

export const removeKey = (key) => {
  localStorage.removeItem(key);
}

export const clearStorage = () => {
  localStorage.clear();
}
