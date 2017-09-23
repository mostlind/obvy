const callEach = (fns, arg) =>
  fns.forEach(({ fn, ctxt }) => fn.call(ctxt || null, arg));

const removeItem = (arr, item) => arr.filter(i => i !== item);

function createObservable(obj, observers = [], topLevelObj = obj) {
  const convertIfObject = value =>
    typeof value === "object" && value !== null && !Array.isArray(value)
      ? createObservable(value, observers, topLevelObj)
      : value;

  const removeObserver = observer => {
    observers.splice(observers.indexOf(observer), 1);
  };

  Object.defineProperty(obj, "sub", {
    value: (fn, ctxt) => ({
      unsub: removeObserver.bind(null, observers.push({ fn, ctxt }))
    }),
    enumerable: false
  });

  Object.keys(obj).forEach(key => {
    obj[key] = convertIfObject(obj[key]);
  });

  return new Proxy(obj, {
    set: (target, key, value) => {
      target[key] = convertIfObject(value);
      callEach(observers, topLevelObj);
      return true;
    }
  });
}

//module.exports = (obj = {}) => createObservable(obj);
export default (obj = {}) => createObservable(obj);
