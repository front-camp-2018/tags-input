'use strict';

const $simpleTagsInput = document.getElementById('simple-tags-input');
const $defaultTagsInput = document.getElementById('default-tags-input');
const $simpleTagsList = document.getElementById('simple-tags-list');
const $defaultTagsList = document.getElementById('default-tags-list');
const $autoAddBtn = document.getElementById('auto-add-btn');
const simpleTagsArr = [];
const addTagsArr = ['shortOne', 'mediumRare', 'hardly toooo looong yeeeeeeeeeeeeeeaaaaaaah'];
const defaultTagsArr = ['1', 'super tag'];

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
 
$simpleTagsList.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);
    const $rmIndex = simpleTagsArr.indexOf(target.value);
    simpleTagsArr.splice(rmIndex, 1);
  }
});

$defaultTagsList.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);
    const $rmIndex = defaultTagsArr.indexOf(target.value);
    defaultTagsArr.splice(rmIndex, 1);
  }
});

$autoAddBtn.addEventListener('click', event => {
  addTagsArr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $defaultTagsList.appendChild($el);
  });
})

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
    const $el = createTagElement(tagValue);

    $defaultTagsList.appendChild($el);
  });
};

init();
