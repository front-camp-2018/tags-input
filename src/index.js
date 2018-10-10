'use strict';

const $tagsInputFirst = document.getElementById('tags-input-1');
const $tagsInputSecond = document.getElementById('tags-input-2');
const $tagsList = document.getElementById('tags-list');
const $tagsListDefault = document.getElementById('tags-list-default');
const tagsArr = [];
const tagsArrDefault = ['tag1', 'some awesome tag'];

const handleAddEventListener = (tag, ul, array) => {
  tag.addEventListener('keyup', ({ key, target }) => {
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = array.includes(target.value);

      if (!isElementExist) {
        ul.appendChild($el);
        array.push(target.value);
        target.value = '';
      }
    }
  });
};

handleAddEventListener($tagsInputFirst, $tagsList, tagsArr);
handleAddEventListener($tagsInputSecond, $tagsListDefault, tagsArrDefault);

const handleRemoveEventListener = (tag, array) => {
  tag.addEventListener('click', event => {
    const { target } = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $tagsList = target.parentElement.parentElement;
    const $tag = target.parentElement;
    const $tagValue = $tag.firstElementChild.textContent;

    if (isRemoveBtn) {
      $tagsList.removeChild($tag);
      array.splice(array.indexOf($tagValue), 1);
    }
  });
};

handleRemoveEventListener($tagsList, tagsArr);
handleRemoveEventListener($tagsListDefault, tagsArrDefault);

const createTagElement = content => {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn" onmouseover="color(this)" onmouseout="normalColor(this)">x</span>
  `;

  return $li;
};

const color = x => {
  x.style.color = '#ff4d4d';
};

const normalColor = x => {
  x.style.color = '#cedff2';
};

const init = array => {
  array.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsListDefault.appendChild($el);
  });
};

init(tagsArrDefault);
