'use strict';

class HoverIntent {

  constructor({
    sensitivity = 0.1, // скорость ниже 0.1px/ms значит "курсор на элементе"
    interval = 100, // измеряем скорость каждые 100ms: определяем дистанцию между предыдущей и новой позицией.
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // убедитесь, что "this" сохраняет своё значение для обработчиков.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // функция рассчета скорости
    this.trackSpeed = this.trackSpeed.bind(this);

    // функция-дроссель возвращает обёртку, передавая вызов f не более одного раза в ms миллисекунд
    this.throttle = this.throttle.bind(this);

    // функция возврата к начальным условиям после остановки мыши и вывод подсказки
    this.mouseMoveStopped = this.mouseMoveStopped.bind(this);

    // декоратор-обертка
    this.mouseVelocity = this.throttle(this.trackSpeed, this.interval);

    // назначаем обработчики
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);
    elem.addEventListener("mousemove", this.onMouseMove);

    this.currentElem = null;
  }

  onMouseOver(event) {
    if (this.currentElem) return;

    const target = event.target.closest(this.elem.tagName);

    this.currentElem = target;

    this.prevMouseX = event.pageX;
    this.prevMouseY = event.pageY;
    this.prevTime = Date.now();
    // курсор над элементом, начальные коор-ты записаны, старт измерения скорости
    this.mouseVelocity();
  }

  onMouseOut(event) {
    if (!this.currentElem) return;

    let relatedTarget = event.relatedTarget;
    while (relatedTarget) {
      if (relatedTarget == this.currentElem) return;

      relatedTarget = relatedTarget.parentNode;
    }

    this.mouseIsStopped = false;

    this.out.call(this.elem);

    this.currentElem = null;
  }

  onMouseMove(event) {
    this.currentTime = Date.now();
    this.currentMouseX = event.pageX;
    this.currentMouseY = event.pageY;

    if (!this.currentElem) return;

    // если мышь остановилась завершить измерение скорости
    if (this.mouseIsStopped) return;

    this.mouseVelocity();
  }

  trackSpeed() {
    if (this.mouseIsStopped) return;

    let velocity;
    // начало движения, запоминаем начальные коор-ты и начинаем измерять скорость
    // выполняется один раз при первом вызове ф-ции
    if (!this.lastMouseX) {
      this.lastMouseX = this.prevMouseX;
      this.lastMouseY = this.prevMouseY;
      this.lastTime = this.prevTime;
      return;
    }

    velocity = Math.sqrt(
      Math.pow(this.currentMouseX - this.lastMouseX, 2) +
      Math.pow(this.currentMouseY - this.lastMouseY, 2)
    ) / (this.currentTime - this.lastTime);

    // если скорость ниже "this.sensitivity" остановить движение, вычисление скорости и показать подсказку
    if (velocity < this.sensitivity) {

      this.mouseIsStopped = true;
    }

    this.lastMouseX = this.currentMouseX;
    this.lastMouseY = this.currentMouseY;
    this.lastTime = this.currentTime;
  }


  mouseMoveStopped() {

    // сбросить координаты мыши
    this.lastMouseX = null;

    if (this.currentElem) {
      this.mouseIsStopped = true;

      this.over.call(this.elem);
    }
  }

  throttle(update, ms) {
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

        // движение мыши прекращено, сбросить коор-ты, показать подсказку
        if (!currentArg) this.mouseMoveStopped();

        if (currentArg) wrapper.apply(currentThis, currentArg);
        currentArg = currentThis = null;
      }, ms);
    }

    return wrapper;
  }

  destroy() {
    elem.removeEventListener('mousemove', this.onMouseMove);
    elem.removeEventListener('mouseover', this.onMouseOver);
    elem.removeEventListener('mouseout', this.onMouseOut);
  }
}

// вариант из LearnJs

// 'use strict';

// class HoverIntent {

//   constructor({
//     sensitivity = 0.1, // скорость ниже 0.1px/ms значит "курсор на элементе"
//     interval = 100,    // измеряем скорость каждые 100ms
//     elem,
//     over,
//     out
//   }) {
//     this.sensitivity = sensitivity;
//     this.interval = interval;
//     this.elem = elem;
//     this.over = over;
//     this.out = out;

//     // убедитесь, что "this" сохраняет своё значение для обработчиков.
//     this.onMouseMove = this.onMouseMove.bind(this);
//     this.onMouseOver = this.onMouseOver.bind(this);
//     this.onMouseOut = this.onMouseOut.bind(this);

//     // и в функции, измеряющей время (вызываемой из setInterval)
//     this.trackSpeed = this.trackSpeed.bind(this);

//     elem.addEventListener("mouseover", this.onMouseOver);

//     elem.addEventListener("mouseout", this.onMouseOut);

//   }

//   onMouseOver(event) {

//     if (this.isOverElement) {
//       // Игнорируем событие над элементом,
//       // так как мы уже измеряем скорость
//       return;
//     }

//     this.isOverElement = true;

//     // после каждого движения измеряем дистанцию
//     // между предыдущими и текущими координатами курсора
//     // если скорость меньше sensivity, то она считается медленной

//     this.prevX = event.pageX;
//     this.prevY = event.pageY;
//     this.prevTime = Date.now();

//     elem.addEventListener('mousemove', this.onMouseMove);
//     this.checkSpeedInterval = setInterval(this.trackSpeed, this.interval);
//   }

//   onMouseOut(event) {
//     // если ушли с элемента
//     if (!event.relatedTarget || !elem.contains(event.relatedTarget)) {
//       this.isOverElement = false;
//       this.elem.removeEventListener('mousemove', this.onMouseMove);
//       clearInterval(this.checkSpeedInterval);
//       if (this.isHover) {
//         // если была остановка движения на элементе
//         this.out.call(this.elem, event);
//         this.isHover = false;
//       }
//     }
//   }

//   onMouseMove(event) {
//     this.lastX = event.pageX;
//     this.lastY = event.pageY;
//     this.lastTime = Date.now();
//   }

//   trackSpeed() {

//     let speed;

//     if (!this.lastTime || this.lastTime == this.prevTime) {
//       // курсор не двигался
//       speed = 0;
//     } else {
//       speed = Math.sqrt(
//         Math.pow(this.prevX - this.lastX, 2) +
//         Math.pow(this.prevY - this.lastY, 2)
//       ) / (this.lastTime - this.prevTime);
//     }

//     if (speed < this.sensitivity) {
//       clearInterval(this.checkSpeedInterval);
//       this.isHover = true;
//       this.over.call(this.elem);
//     } else {
//       // скорость высокая, запоминаем новые координаты
//       this.prevX = this.lastX;
//       this.prevY = this.lastY;
//       this.prevTime = this.lastTime;
//     }
//   }

//   destroy() {
//     elem.removeEventListener('mousemove', this.onMouseMove);
//     elem.removeEventListener('mouseover', this.onMouseOver);
//     elem.removeEventListener('mouseout', this.onMouseOut);
//   }

// }