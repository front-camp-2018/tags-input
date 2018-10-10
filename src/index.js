'use strict';

const $tagsInputDefault = document.getElementById('tags-input-1');
const $tagsListDefault = document.getElementById('tags-list-1');
const tagsArrDefault = ['1', 'super tag'];

const $tagsInput = document.getElementById('tags-input-2');
const $tagsList = document.getElementById('tags-list-2');
const tagsArr = [];


const addTagToList = (input, list, arr) => {
  input.addEventListener('keyup', ({key, target}) => {
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = arr.includes(target.value);

      if (!isElementExist) {
        list.appendChild($el);
        arr.push(target.value);
        target.value = '';
      }
      else {
        alert('Такий тег вже існує');
        target.value = '';
      }
    }
  });
};

addTagToList($tagsInputDefault, $tagsListDefault,tagsArrDefault);
addTagToList($tagsInput,$tagsList,tagsArr);

const removeEventListener =(tag, arr) => {
  tag.addEventListener('click', event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $doubleParent = target.parentElement.parentElement;
    const $tag = target.parentElement;

    if (isRemoveBtn) {
      $doubleParent.removeChild($tag);
      arr.splice(arr.indexOf($tag.firstElementChild.innerHTML));
    }
  });
};

removeEventListener($tagsList,tagsArr);
removeEventListener($tagsListDefault,tagsArrDefault);

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
  tagsArrDefault.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsListDefault.appendChild($el);
  });
};

init();
