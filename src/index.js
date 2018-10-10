'use strict';

const $tagsInputFirst = document.getElementById('tags-input-1');
const $tagsInputSecond = document.getElementById('tags-input-2');
const $tagsList = document.getElementsByClassName('tags-list');
const tagsArrFirst = [];
const tagsArrSecond = ['tag1', 'some awesome tag'];

$tagsInputFirst.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArrFirst.includes(target.value);

    if (!isElementExist) {
      $tagsList[0].appendChild($el);
      tagsArrFirst.push(target.value);
      target.value = '';
    }
  }
});

$tagsInputSecond.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArrSecond.includes(target.value);

    if (!isElementExist) {
      $tagsList[1].appendChild($el);
      tagsArrSecond.push(target.value);
      target.value = '';
    }
  }
});



$tagsList[0].addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;
  const indexOfItem = tagsArrFirst.indexOf(target.value);

  if (isRemoveBtn) {
    $foo.removeChild($tag);
    tagsArrFirst.splice(indexOfItem,1);
  }
});

$tagsList[1].addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;
  const indexOfItem = tagsArrSecond.indexOf(target.value);

  if (isRemoveBtn) {
    $foo.removeChild($tag);
    tagsArrSecond.splice(indexOfItem,1);
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

const init = ($tag, arr) => {
  arr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tag.appendChild($el);
  });
};

init($tagsList[0], tagsArrFirst);
init($tagsList[1], tagsArrSecond);
