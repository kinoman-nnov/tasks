let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], { type: 'text/plain' });

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);


// пример загрузки Blob при помощи base64

// let link = document.createElement('a');
// link.download = 'hello.txt';

// let blob = new Blob(['Hello, world!'], { type: 'text/plain' });

// let reader = new FileReader();
// reader.readAsDataURL(blob); // конвертирует Blob в base64 и вызывает onload

// reader.onload = function () {
//   link.href = reader.result; // url с данными
//   link.click();
// };