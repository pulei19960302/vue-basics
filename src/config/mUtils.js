
/**
 * @param key
 * @param value
 */

export const setStore = (key , value) =>{
  if(!key) return;
  if (typeof value !== 'string'){
    value = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key ,value)
};


/**
 * @param key
 */

export const getStore = key =>{
  if(!key) return;
  return window.sessionStorage.getItem(key)
};

/**
 * @param key
 */
export const removeStore = key =>{
  if(!key) return;
  window.sessionStorage.removeItem(key)
};


/**
 * 简单加密
 */
export const encryption = obj =>{
    return obj;
};


/**
 * 解密
 */
export const decrypt = obj =>{
  return obj;
};
