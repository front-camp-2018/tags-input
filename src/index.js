'use strict';

const $tagsInputs = document.getElementsByClassName('tags-input');
const $tagsLists = document.getElementsByClassName('tags-list');
const tagsArr = ['1', 'super tag'];

for (let i = 0; i < $tagsInputs.length; i++) {
  $tagsInputs[i].addEventListener('keyup', ({key, target}) => {
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = tagsArr.includes(target.value);
  
      if (!isElementExist) {
        $tagsLists[0].appendChild($el);
        tagsArr.push(target.value);
        target.value = '';
      }
    }
  });
};

for (let i = 0; i < $tagsLists.length; i++) {
  $tagsLists[i].addEventListener('click', event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $foo = target.parentElement.parentElement;
    const $tag = target.parentElement;
    const removedTagName = target.parentElement.firstElementChild.innerHTML;
    const removedTagIndex = tagsArr.indexOf(removedTagName);
  
    if (isRemoveBtn) {
          
      $foo.removeChild($tag);
      tagsArr.splice(removedTagIndex, 1);    
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
  tagsArr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsLists[0].appendChild($el);
  });
};

init();
