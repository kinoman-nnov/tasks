let f = debounce(alert, 1000);

function debounce(func, ms) {
  let functionCalled = false;

  return function () {
    if (functionCalled) return;
    func.apply(this, arguments);
    functionCalled = true;
    setTimeout(() => functionCalled = false, ms);
  }
}

f(1); // выполняется немедленно
f(2); // проигнорирован

setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout(() => f(4), 1100); // выполняется
setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)