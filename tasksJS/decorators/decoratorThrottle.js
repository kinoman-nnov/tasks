function f(a) {
  console.log(a)
}

function throttle(update, ms) {
  let isThrottle = false;
  let currentArg = null;
  let currentThis = null;

  function wrapper() {
    if (isThrottle) {
      currentArg = arguments;
      currentThis = this;
      return;
    }

    update.apply(this, arguments);

    isThrottle = true;

    setTimeout(() => {
      isThrottle = false;

      if (currentArg) wrapper.apply(currentThis, currentArg);

      currentArg = currentThis = null;
    }, ms);
  }
  return wrapper;
}

let f1000 = throttle(f, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)