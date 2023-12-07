const table = document.getElementById('bagua-table');

let isEditable = false;
let currentElem = null;
let prevValueHTML = null;

table.onclick = (e) => {

  // если click по кнопке ok
  if ( e.target.closest('.edit-ok') ) {
    if ( !currentElem ) return;
    
    handleClick('ok');
    return;
  }

  // если click по кнопке cancel
  if ( e.target.closest('.edit-cancel') ) {
    if ( !currentElem ) return;

    handleClick('cancel');
    return;
  }

  // click по ячейке таблицы
  if (isEditable) return;

  currentElem = e.target.closest('td');
  
  if (!table.contains(currentElem)) return;

  handleClick('td');
}

function editStart() {
  isEditable = true;
  
  prevValueHTML = currentElem.innerHTML;

  textEditor(currentElem);
}

function editEnd() {
  isEditable = false;

  if (currentElem.classList.contains('editable-td')) currentElem.classList.remove('editable-td');

  currentElem = null;

  prevValueHTML = null;
}

function handleClick(str) {
  switch(str) {
    case 'td':

      editStart();
      break;

    case 'ok': 
      currentElem.innerHTML = currentElem.firstChild.value;

      editEnd();
      break;

    case 'cancel': 
      currentElem.innerHTML = prevValueHTML;

      editEnd();
      break;
  }
}

function textEditor(elem) {
  elem.classList.add('editable-td');

  elem.innerHTML = '<textarea class="editable-area"></textarea><div class="btns controls"><button class="btn edit-ok">ОК</button><button class="btn edit-cancel">ОТМЕНА</button></div>';

  const areaElem = document.querySelector('.editable-area');
  
  const elemWidth = elem.getBoundingClientRect().width;
  const elemHeight = elem.getBoundingClientRect().height;
  
  // растянуть textarea на всю ячейку td 
  areaElem.style.width = elemWidth + "px";
  areaElem.style.height = elemHeight + "px";
  
  areaElem.value = prevValueHTML;
  areaElem.focus();
}