'use strict';

const $simpleTagsInput = document.getElementById('simple-tags-input');
const $simpleTagsList = document.getElementById('simple-tags-list');
const $defaultTagsInput = document.getElementById('default-tags-input');
const $defaultTagsList = document.getElementById('default-tags-list');
const defaultTagsArr = ['1', 'super tag'];
const tagsArr = [];
const sec = 3000;

function createTag({ key, target }, arr, tagList) {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = arr.includes(target.value);

    if (!isElementExist) {
      tagList.appendChild($el);
      arr.push(target.value);
      target.value = '';
    } else {
      const $snackBar = document.getElementById('snackbar');
      $snackBar.className = 'show';
      setTimeout(() => { $snackBar.className = $snackBar.classList.remove('show'); }, sec);
    }
  }
}

function removeTag(event, arr) {
  const { target } = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;
  const text = $tag.getElementsByClassName('tag-name')[0].innerHTML;

  if (isRemoveBtn) {
    $foo.removeChild($tag);
    const index = arr.indexOf(text);
    arr.splice(index, 1);
  }
}

$defaultTagsInput.addEventListener('keyup', () => createTag(event, defaultTagsArr, $defaultTagsList));
$defaultTagsList.addEventListener('click', () => removeTag(event, defaultTagsArr));

$simpleTagsInput.addEventListener('keyup', () => createTag(event, tagsArr, $simpleTagsList));
$simpleTagsList.addEventListener('click', () => removeTag(event, tagsArr));

const createTagElement = content => {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class='tag-name'>${content}</span>
    <span class='remove-btn'>x</span>
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
