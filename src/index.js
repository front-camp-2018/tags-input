'use strict';

const $simpletTagsInput = document.getElementById('tags-input-simple');
const $simpleTagsList = document.getElementById('tags-list-simple');
const $defaultTagsInput = document.getElementById('tags-input-default');
const $defaultTagsList = document.getElementById('tags-list-default');
const defaultTags = ['1', 'super tag'];
let simpleTags;

const createTagElement = content => {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">x</span>
  `;

  return $li;
};

const addTagElement = (event, tagsArray, tagsList) => {
  const {key, target} = event;
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArray.includes(target.value);

    if (!isElementExist) {
      tagsList.appendChild($el);
      tagsArray.push(target.value);
      target.value = '';
    }
  }
};

const removeTagElement = (event, tagsArray) => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $listItem = target.parentElement.parentElement;
  const $tag = target.parentElement;
  const titleTag = $tag.querySelector('.tag-name').innerText;
  const titleTagIndex = tagsArray.indexOf(titleTag);

  if (isRemoveBtn) {
    $listItem.removeChild($tag);

    tagsArray.splice(titleTagIndex, 1);
  }
};

$simpletTagsInput.addEventListener('keyup', event => {
  addTagElement(event, simpleTags, $simpleTagsList);
});

$simpleTagsList.addEventListener('click', event => {
  removeTagElement(event, simpleTags);
});

$defaultTagsInput.addEventListener('keyup', event => {
  addTagElement(event, defaultTags, $defaultTagsList);
});

$defaultTagsList.addEventListener('click', event => {
  removeTagElement(event, defaultTags);
});

const init = () => {
  initSimple();
  initDefault();
};

const initSimple = () => {
  simpleTags = [];
};

const initDefault = () => {
  defaultTags.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $defaultTagsList.appendChild($el);
  });
};

init();
