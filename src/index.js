'use strict';

const $mainElement = document.getElementsByTagName('main')[0];
const $defaultInputTitle = document.createElement('H2');
$defaultInputTitle.className = 'title-level-2';
$defaultInputTitle.innerText = 'Input with default tags: ';
$mainElement.appendChild($defaultInputTitle);

const $defaultTagsInput = document.createElement('INPUT');
$defaultTagsInput.setAttribute('type','text');
$defaultTagsInput.className = 'tags-input';
$defaultTagsInput.id = 'tags-input-2';
$defaultTagsInput.placeholder = 'put your tags...';
$mainElement.appendChild($defaultTagsInput);

const $defaultTagsList = document.createElement('UL');
$defaultTagsList.id = 'tags-list-2';
$defaultTagsList.className = 'tags-list';
$mainElement.appendChild($defaultTagsList);
const defaultTagsArr = ['tag1','some awesome tag'];

const $simpleTagsInput = document.getElementById('tags-input');
const $simpleTagsList = document.getElementById('tags-list');
const simpleTagsArr = [];

const initListeners = (input, list, tagArray, id) => {

  input.addEventListener('keyup', ({key, target}) => {
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = tagArray.includes(target.value);

      if (!isElementExist) {
        list.appendChild($el);
        tagArray.push(target.value);
        localStorage.setItem(id,JSON.stringify(tagArray));
        target.value = '';
      }
    }
  });

  list.addEventListener('click', event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $tag = target.parentElement;
    const tagsList = $tag.parentElement;

    if (isRemoveBtn) {
      const tagIndex = tagArray.indexOf($tag.querySelector('.tag-name').innerText);
      tagsList.removeChild($tag);
      tagArray.splice(tagIndex, 1);
      localStorage.setItem(id,JSON.stringify(tagArray));
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

const initTags = (array, target,id) => {
  let tagsArray;
  const localArray = JSON.parse(localStorage.getItem(id));
  if(localArray && localArray.length){
    tagsArray = localArray;
  } else {
    tagsArray = array;
  }
  tagsArray.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    target.appendChild($el);
  });
};

const init = () => {
  initListeners($simpleTagsInput, $simpleTagsList, simpleTagsArr, 'simple');
  initListeners($defaultTagsInput, $defaultTagsList, defaultTagsArr, 'default');
  initTags(simpleTagsArr, $simpleTagsList, 'simple');
  initTags(defaultTagsArr, $defaultTagsList, 'default');
};

init();
