// Найти все числа

let regexpNum = /-?\d+(\.\d+)?/g;

let strNums = "-1.5 0 2 -123.4.";

console.log( strNums.match(regexpNum) ); // -1.5, 0, 2, -123.4


// Проверьте MAC-адрес

let regexpMAC = /^([0-9a-f]{2}:){5}[a-f]{2}$/ig;

console.log(regexpMAC.test('01:32:54:67:89:AB')); // true
console.log(regexpMAC.test('0132546789AB')); // false (нет двоеточий)
console.log(regexpMAC.test('01:32:54:67:89')); // false (5 чисел, должно быть 6)
console.log(regexpMAC.test('01:32:54:67:89:ZZ')) // false (ZZ в конце строки)


// date

let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let strDate = "2019-10-30 2020-01-01";

let resultsDates = strDate.matchAll(dateRegexp);

for (let result of resultsDates) {
  let { year, month, day } = result.groups;

  console.log(`${day}.${month}.${year}`);
  // первый вывод: 30.10.2019
  // второй: 01.01.2020
}

// либо
console.log(strDate.replace(dateRegexp, '$<day>.$<month>.$<year>')); // 30.10.2019, 01.01.2020


// email

let regexpMail = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

let strMail = "my@mail.com @ his@site.com.uk --@-d.--.ru";

console.log(strMail.match(regexpMail)); // my@mail.com, his@site.com.uk --@-d.--.ru


// домен

let regexpDomen = /([\w-]+\.)+\w+/g;

let strDomen = "site.com my.site.com";

console.log(strDomen.match(regexpDomen)); // site.com,my.site.com


// HTML - цвета

let regexpCol = /#[0-9a-f]{6}\b/gi;

let strCol = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

console.log(strCol.match(regexpCol));  // #121212,#AA00ef

// в формате #abc или #abcdef
let regexpColor = /#([a-f0-9]{3}){1,2}\b/gi;

let strColor = "color: #3f3; background-color: #AA00ef; and: #abcd";

console.log(strColor.match(regexpColor)); // #3f3 #AA00ef

// либо
// let regexpColor = /#[a-f0-9]{3}([a-f0-9]{3}\b)?\b/ig;

// let strColor = "color: #3f3; background-color: #AA00ef; and: #abcd";

// console.log( strColor.match(regexpColor) ); // #3f3 #AA00ef


// HTML-комментарии

let regexpCom = /<!--.*?-->/gs;

let strCom = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

console.log(strCom.match(regexpCom)); // '<!-- My -- comment \n test -->', '<!---->'


// HTML-теги

let regexpTag = /<[^<>]+>/g;

let strTag = '<> <a href="/"> <input type="radio" checked> <b>';

console.log(strTag.match(regexpTag)); // '<a href="/">', '<input type="radio" checked>', '<b>'

// вложенные группы
regexpTag = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
console.log(result[0]); // <a href="/">
console.log(result[1]); // a href="/"
console.log(result[2]); // a
console.log(result[3]); // href="/"