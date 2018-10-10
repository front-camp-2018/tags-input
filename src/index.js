'use strict';

const $tagsInput = document.getElementById('tag-input-1');
const $tagsList = document.getElementById('tag-list-1');
const tagsArr = [];

const $tagsInput2 = document.getElementById('tag-input-2');
const $tagsList2 = document.getElementById('tag-list-2');
const tagsArr2 = ['tag1', 'some awesome tag'];

const createTagElement = content => {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">x</span>
  `;

  return $li;
};

const init = (arr, input, list) => {

  input.addEventListener('keyup', ({key, target}) => {
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = arr.includes(target.value);

      if (!isElementExist) {
        list.appendChild($el);
        arr.push(target.value);
        target.value = '';
      }
    }
  });

  list.addEventListener('click', event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $foo = target.parentElement.parentElement;
    const $tag = target.parentElement;

    if (isRemoveBtn) {
      $foo.removeChild($tag);

      const $element = target.parentElement.childNodes[1].textContent;
      const index = arr.indexOf($element);
      arr.splice(index, 1);
    }
  });

  arr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    list.appendChild($el);
  });
};

const arr =  tagsArr;
const input = $tagsInput;
const list = $tagsList;

const arr2 =  tagsArr2;
const input2 = $tagsInput2;
const list2 = $tagsList2;

init(arr, input, list);
init(arr2, input2, list2);


