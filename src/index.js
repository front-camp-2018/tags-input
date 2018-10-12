'use strict';

const $tagsInput = document.getElementById('tags-input-1');
const $tagsList = document.getElementById('tags-list');
const $tagsInputDefault = document.getElementById('tags-input-2');
const $tagsListDefault = document.getElementById('tags-list-default');
const tagsArr = [];
const tagsArrDefault = ['1', 'super tag', 'some defaul tag', 'lol'];


$tagsInput.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArr.includes(target.value);

    if (!isElementExist) {
      $tagsList.appendChild($el);
      tagsArr.push(target.value);
      target.value = '';
    }
  }
});

$tagsInputDefault.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $def = createTagElement(target.value);
    const isElementExist = tagsArrDefault.includes(target.value);

    if (!isElementExist) {
      $tagsListDefault.appendChild($def);
      tagsArrDefault.push(target.value);
      target.value = '';
    }
  }
});

$tagsList.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);

    // TODO: remove element from array
    tagsArr.splice(tagsArr.indexOf($tag.firstElementChild.textContent), 1);
  }
});

$tagsListDefault.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);

    // TODO: remove element from array
    tagsArrDefault.splice(tagsArrDefault.indexOf($tag.firstElementChild.textContent), 1);
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
  tagsArr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsList.appendChild($el);
  });
  tagsArrDefault.forEach(tagValue => {
    const $def = createTagElement(tagValue);

    $tagsListDefault.appendChild($def);
  });
};

init();
