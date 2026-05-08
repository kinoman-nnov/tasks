module.exports = class FakeString {
  constructor(seed = Date.now()) {
    this.seed = seed;
  }

  // Псевдослучайное число [0, 1) с фиксированным seed
  random() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  // Выбор случайного символа из строки
  pick(chars) {
    return chars[Math.floor(this.random() * chars.length)];
  }

  // Генерация случайной строки
  string(options = {}) {

    const { length = 8 } = options;

    let chars = 'abcdefghijklmnopqrstuvwxyz';
    chars += chars.toUpperCase();
    chars += '0123456789';
    chars += '!@#$%^&*()';

    let result = '';

    for (let i = 0; i < length; i++) {
      result += this.pick(chars);
    }

    return result;
  }

  // Генерация случайного булева значения
  bool(options = {}) {
    const { likelihood = 50 } = options; // вероятность в процентах
    if (likelihood <= 0) return false;
    if (likelihood >= 100) return true;
    return this.random() * 100 < likelihood;
  }
}