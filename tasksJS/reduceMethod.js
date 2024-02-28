// одинаковые заголовки перезаписывают друг друга

const str = 'Cache-Control: max-age=31536000\r\nContent-Length: 4260\r\nContent-Length: 4260\r\nContent-Type: image/png\r\nDate: Sat, 08 Sep 2012 16:53:16 GMT';

const res = str.split('\r\n').reduce((result, current) => {
  let [name, value] = current.split(': ');
  result[name] = value;
  return result;
}, {});

console.log(res)