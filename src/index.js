'use strict';

const $tagsInputSimple = document.getElementById('tags-input-simple');
const $tagsListSimple = document.getElementById('tags-list-simple');
const $tagsInputDefault = document.getElementById('tags-input-default');
const $tagsListDefault = document.getElementById('tags-list-default');
const tagsArrSimple = [];
const tagsArrDefault = ['1', 'super tag'];

$tagsInputSimple.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArrSimple.includes(target.value);

    if (!isElementExist) {
      $tagsListSimple.appendChild($el);
      tagsArrSimple.push(target.value);
      target.value = '';
    }
  }
});

$tagsInputDefault.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    const isElementExist = tagsArrDefault.includes(target.value);

    if (!isElementExist) {
      $tagsListDefault.appendChild($el);
      tagsArrDefault.push(target.value);
      target.value = '';
    }
  }
});

$tagsListSimple.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);
  }
});

$tagsListDefault.addEventListener('click', event => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $foo = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    $foo.removeChild($tag);

    var removeValue = $tag.textContent.split('\n');
    var removeElement = tagsArrDefault.indexOf(removeValue[1].trim());
    $foo.removeChild($tag);
    tagsArrDefault.splice(removeElement, 1);

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
  tagsArrDefault.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsListDefault.appendChild($el);
  });
};

init();

