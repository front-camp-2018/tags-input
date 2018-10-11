'use strict';

const $simpleTagsInput = document.getElementById('tags-input-simple');
const $defaultTagsInput = document.getElementById('tags-input-default');
const $simpleTagsList = document.getElementById('tags-list-simple');
const $defaultTagsList = document.getElementById('tags-list-default');
const simpleTagsArr = [];
const defaultTagsArr = ['1', 'some'];

$simpleTagsInput.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = simpleTagsArr.includes(target.value);

    if (!isElementExist) {
      $simpleTagsList.appendChild($el);
      simpleTagsArr.push(target.value);
      target.value = '';
    }
  }
});

$defaultTagsInput.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = defaultTagsArr.includes(target.value);

    if (!isElementExist) {
      $defaultTagsList.appendChild($el);
      defaultTagsArr.push(target.value);
      target.value = '';
    }
  }
});

$defaultTagsList.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);

    // TODO: remove element from array
    defaultTagsArr.splice(defaultTagsArr.indexOf($tag.children[0].textContent), 1);
  }
});

$simpleTagsList.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;  

  if (isRemoveBtn) {
    $foo.removeChild($tag);

    // TODO: remove element from array

    simpleTagsArr.splice(simpleTagsArr.indexOf($tag.children[0].textContent), 1);
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
  defaultTagsArr.forEach(tagValue => {
    console.log(tagValue);
    const $el = createTagElement(tagValue);

    $defaultTagsList.appendChild($el);
  });
};

init();
