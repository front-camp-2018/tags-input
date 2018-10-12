'use strict';

const $tagsInput = document.getElementById('tags-input');
const $tagsList = document.getElementById('tags-list');
const tagsArr = ['1', 'super tag'];
const main = document.getElementById('app');

$tagsInput.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArr.includes(target.value);

    if (!isElementExist) {
      $tagsList.appendChild($el);
      tagsArr.push(target.value);
      target.value = '';
    }
  }
});

$tagsList.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);

    // TODO: remove element from array
    // tagsArr.splice();
  }
});

const createTagElement = content => {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">x</span>
  `;

  return $li;
};

const init = () => {
  tagsArr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsList.appendChild($el);
  });
};

init();

class customInput{
  constructor(title){
    this.cont = document.createElement('div');// wrapper for input and buttons
    this.name = document.createElement('h2');// title for input
    this.input = document.createElement('input');// input element
    this.tags = document.createElement('ul');// list for tags
    this.name.textContent = title;
    this.name.className = 'title-level-2';
    this.input.placeholder = 'Type tag';
    this.input.className = 'tags-input';
    this.tags.className = 'tags-list';
    this.cont.className = 'cont';
    this.tagsArr = [];
    this.tagsEnable = true;
    this.cont.append(this.input);
    main.append(this.name, this.cont, this.tags);
    addEvents(this);
  }
  defaultTags(){
    const tagsList = ['hi', 'hello', 'bye'];
    this.tagsArr = [...tagsList];
    for(let value of this.tagsArr) this.tags.append(createTagElement(value));
  }
  addButton(name){
    let btn = document.createElement('button');
    let btnTypes = ['Block', 'DeleteAll', 'Sort'];
    if(btnTypes.includes(name)){
      btn.name =`${name}`;
      btn.textContent = `${name}`;
      btn.className = 'option-btn';
      this.cont.append(btn);
    }
  }
}
function addEvents(elem){
  elem.input.addEventListener('keyup', ({key, target}) => {// Event for enter key to input
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = elem.tagsArr.includes(target.value);

      if(elem.tagsEnable){
        if(!isElementExist){
          elem.tagsArr.push(target.value);
          elem.tags.append($el);
          target.value = '';
        }
        else {

        }
      }
      else{
        console.log('blocked');
      }
    }
  });
  elem.tags.addEventListener('click', event => {// Event for remove tags button
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $foo = target.parentElement.parentElement;
    const $tag = target.parentElement;
    const $prevElem = target.previousElementSibling;

    if (isRemoveBtn) {
      elem.tagsArr.splice(elem.tagsArr.indexOf($prevElem.textContent), 1);
      $foo.removeChild($tag);
    }
  });
  elem.cont.addEventListener('click', event => {// Event for click on buttons
    const {target} = event;

    switch(target.name){
      case 'Block': {
        if(elem.tagsEnable){
          elem.tagsEnable = false;
          target.textContent = 'Unblock';
        }
        else{
          elem.tagsEnable = true;
          target.textContent = 'Block';
        }
        console.log(target.textContent);
        break;
      }
      case 'DeleteAll':{
        elem.tagsArr = [];
        elem.tags.innerHTML = '';
        break;
      }
      case 'Sort':{
        let arr = [...elem.tags.children];
        console.log(elem.tags.children);
        elem.tagsArr.sort((a, b) => a > b);
        arr.sort((a, b) =>{
          let elemA = a.firstElementChild.textContent;
          let elemB = b.firstElementChild.textContent;
          return elemA > elemB;
        });
        elem.tags.innerHTML = '';
        for(let value of arr) elem.tags.append(value);
      }
    }
  });
}

let input2 = new customInput('New Input');
input2.defaultTags();
input2.addButton('Block');
input2.addButton('DeleteAll');
input2.addButton('Sort');
