'use strict';

const $tagsInputFirst = document.getElementById('tags-input-1'),
  $tagsInputSecond = document.getElementById('tags-input-2'),
  $tagsList = document.getElementById('tags-list'),
  $tagsListDefault = document.getElementById('tags-list-default'),
  $colorInputFirst = document.getElementById('color'),
  $colorInputSecond = document.getElementById('color-second'),
  tagsArr = [],
  tagsArrDefault = ['tag1', 'some awesome tag'],
  ENTER = 'Enter',
  KEY_UP = 'keyup',
  CLICK = 'click',
  INPUT = 'input',
  EMPTY_VALUE = '';
let $tagColor = EMPTY_VALUE;

const init = array => {
  array.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsListDefault.appendChild($el);
  });
};

const handleAddEventListener = (tag, ul, array) => {
  tag.addEventListener(KEY_UP, ({ key, target }) => {
    if (key === ENTER && target.value.trim()) {
      const $el = createTagElement(target.value),
        isElementExist = array.includes(target.value);

      if (!isElementExist) {
        ul.appendChild($el);
        array.push(target.value);
        target.value = EMPTY_VALUE;
      }
    }
  });
};

const handleRemoveEventListener = (tag, array) => {
  tag.addEventListener(CLICK, event => {
    const { target } = event,
      isRemoveBtn = target.classList.contains('remove-btn'),
      $tagsList = target.parentElement.parentElement,
      $tag = target.parentElement,
      $tagValue = $tag.firstElementChild.textContent;

    if (isRemoveBtn) {
      $tagsList.removeChild($tag);
      array.splice(array.indexOf($tagValue), 1);
    }
  });
};

const createTagElement = content => {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.style = `background-color: ${$tagColor}`;
  $li.innerHTML = `
  <span class="tag-name">${content}</span>
  <span 
  id="removeBtn" 
  class="remove-btn" 
  onmouseover="redColorChange(this)" 
  onmouseout="defaultColorChange(this)"
  >x</span>
  `;

  return $li;
};

const handleColorPicker = (colorInput, id) => {
  colorInput.addEventListener(INPUT, () => {
    const $colorInputValue = document.getElementById(id).value;

    $tagColor = $colorInputValue;
  });
};

const redColorChange = el => {
  el.style.color = '#ff4d4d';
};

const defaultColorChange = el => {
  el.style.color = '#cedff2';
};

init(tagsArrDefault);
handleColorPicker($colorInputFirst, 'color');
handleColorPicker($colorInputSecond, 'color-second');
handleAddEventListener($tagsInputFirst, $tagsList, tagsArr);
handleAddEventListener($tagsInputSecond, $tagsListDefault, tagsArrDefault);
handleRemoveEventListener($tagsList, tagsArr);
handleRemoveEventListener($tagsListDefault, tagsArrDefault);
