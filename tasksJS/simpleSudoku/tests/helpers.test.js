function deepEqualWrapped(origin, arr) {
  return function () {

    const match = arguments[0].every((num) => arr.includes(num));
    if (match) arguments[0] = arr;

    return origin.apply(this, arguments);
  }
}

export { deepEqualWrapped }