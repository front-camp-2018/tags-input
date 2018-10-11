'use strict';

const $tagsInput = document.getElementById('tags-input');
const $tagsList = document.getElementById('tags-list');
const $defTagsInput = document.getElementById('default-tags-input');
const $defTagsList = document.getElementById('default-tags-list');
const tagsArr = [];
const defTagsArr = ['tag1', 'some awesome tag'];

const inputListenerFunc = function(key, target, arr, list){
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = arr.includes(target.value);

    if (!isElementExist) {
      list.appendChild($el);
      arr.push(target.value);
      target.value = '';
    }
  }
};

$tagsInput.addEventListener('keyup', ({key, target}) => {
  inputListenerFunc(key, target, tagsArr, $tagsList);
});

$defTagsInput.addEventListener('keyup', ({key, target}) => {
  inputListenerFunc(key, target, defTagsArr, $defTagsList);
});

const listListenerFunc = function(event, arr){
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);
    const text = $tag.innerText.trim().substr(0, $tag.innerText.trim().length-1).trim();
    arr.splice(arr.indexOf(text), 1);
  }
};

$tagsList.addEventListener('click', event => {
  listListenerFunc(event, tagsArr);
});

$defTagsList.addEventListener('click', event => {
  listListenerFunc(event, defTagsArr);
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
  defTagsArr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $defTagsList.appendChild($el);

  });
};

init();
