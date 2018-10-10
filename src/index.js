'use strict';

const $tagsInputs = document.getElementsByClassName('tags-input');
const $tagsLists = document.getElementsByClassName('tags-list');
const $errorList = document.getElementsByClassName('error-message');
const tagsArrs = [[], ['1', 'super tag']];        // you may change default tags here

for (let i = 0; i < $tagsInputs.length; i++) {    // adding input event listener
  $tagsInputs[i].addEventListener('keyup', ({key, target}) => {
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = tagsArrs[i].includes(target.value);
  
      if (!isElementExist) {
        $tagsLists[i].appendChild($el);
        tagsArrs[i].push(target.value);
        target.value = '';        
      } else {                                    // if you try to add existed tag
        $errorList[i].classList.remove("no-visible");
      }
    } else {
      $errorList[i].classList.add("no-visible")   // if you continue typing
    }
  });
};

for (let i = 0; i < $tagsLists.length; i++) {     // adding romoving event listener
  $tagsLists[i].addEventListener('click', event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $foo = target.parentElement.parentElement;
    const $tag = target.parentElement;
    const removedTagName = target.parentElement.firstElementChild.innerHTML;
    const removedTagIndex = tagsArrs[i].indexOf(removedTagName);
  
    if (isRemoveBtn) {
      $foo.removeChild($tag);
      tagsArrs[i].splice(removedTagIndex, 1);    
    }
  });
};

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
  for (let i = 0; i < tagsArrs.length; i++) {
    tagsArrs[i].forEach(tagValue => {
      const $el = createTagElement(tagValue);
  
      $tagsLists[i].appendChild($el);    
    });    
  };
};

init();
